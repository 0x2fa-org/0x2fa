// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { TOTP_sha1 } from "./lib/OTPSHA1.sol";
import "./interface/IAuthenticator.sol";

contract Authenticator is IAuthenticator {
  mapping(address => AuthenticatorEntry[]) private userAuthenticators;
  mapping(address => uint256) private userAuthenticatorCount;

  bytes32 public constant EIP712_DOMAIN_TYPEHASH =
    keccak256(
      "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );
  bytes32 public constant SIGNIN_TYPEHASH =
    keccak256("SignIn(address user,uint32 time)");
  bytes32 public immutable DOMAIN_SEPARATOR;

  constructor() {
    DOMAIN_SEPARATOR = keccak256(
      abi.encode(
        EIP712_DOMAIN_TYPEHASH,
        keccak256("Authenticator"),
        keccak256("1"),
        block.chainid,
        address(this)
      )
    );
  }

  modifier authenticated(SignIn calldata _auth) {
    if (_auth.time + 1 days <= block.timestamp) revert SignInExpired();
    if (_auth.user != _recoverSigner(_auth)) revert InvalidSignIn();
    _;
  }

  function add(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timeStep
  ) external override authenticated(_auth) {
    if (_timeStep == 0) revert InvalidTimeStep();
    uint256 newId = userAuthenticatorCount[_auth.user];
    userAuthenticators[_auth.user].push(
      AuthenticatorEntry({
        id: newId,
        secret: _secret,
        label: _label,
        issuer: _issuer,
        timeStep: _timeStep
      })
    );
    userAuthenticatorCount[_auth.user]++;
    emit AuthenticatorAdded(_auth.user, newId);
  }

  function remove(
    SignIn calldata _auth,
    uint256 _id
  ) external override authenticated(_auth) {
    AuthenticatorEntry[] storage authenticators = userAuthenticators[
      _auth.user
    ];
    if (_id >= authenticators.length) revert IdOutOfBounds();

    authenticators[_id] = authenticators[authenticators.length - 1];
    authenticators[_id].id = _id;
    authenticators.pop();

    emit AuthenticatorRemoved(_auth.user, _id);
  }

  function generate(
    SignIn calldata _auth,
    uint256 _clientTimestamp
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorCode[] memory)
  {
    return _generateCodes(_auth.user, _clientTimestamp);
  }

  function generate(
    SignIn calldata _auth
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorCode[] memory)
  {
    return _generateCodes(_auth.user, block.timestamp);
  }

  function export(
    SignIn calldata _auth
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorEntry[] memory)
  {
    return userAuthenticators[_auth.user];
  }

  function _recoverSigner(
    SignIn calldata _auth
  ) private view returns (address) {
    bytes32 authdataDigest = keccak256(
      abi.encodePacked(
        "\x19\x01",
        DOMAIN_SEPARATOR,
        keccak256(abi.encode(SIGNIN_TYPEHASH, _auth.user, _auth.time))
      )
    );

    return
      ecrecover(authdataDigest, uint8(_auth.rsv.v), _auth.rsv.r, _auth.rsv.s);
  }

  function _generateCodes(
    address _user,
    uint256 _timestamp
  ) private view returns (AuthenticatorCode[] memory) {
    AuthenticatorEntry[] storage authenticators = userAuthenticators[_user];
    AuthenticatorCode[] memory codes = new AuthenticatorCode[](
      authenticators.length
    );

    for (uint i = 0; i < authenticators.length; i++) {
      codes[i] = AuthenticatorCode({
        id: authenticators[i].id,
        code: TOTP_sha1(
          abi.encodePacked(authenticators[i].secret),
          authenticators[i].timeStep,
          uint32(_timestamp)
        ),
        label: authenticators[i].label,
        issuer: authenticators[i].issuer
      });
    }

    return codes;
  }
}
