// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { TOTP_sha1 } from "./lib/OTPSHA1.sol";
import "./interface/IAuthenticator.sol";

/// @title Authenticator
/// @notice This contract manages TOTP (Time-based One-Time Password) authenticators for users
/// @dev Implements the IAuthenticator interface
contract Authenticator is IAuthenticator {
  mapping(address => AuthenticatorEntry[]) private _userAuthenticators;
  mapping(address => uint256) private _userAuthenticatorCount;

  bytes32 public constant EIP712_DOMAIN_TYPEHASH =
    keccak256(
      "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );
  bytes32 public constant SIGNIN_TYPEHASH =
    keccak256("SignIn(address user,uint32 time)");
  bytes32 public immutable DOMAIN_SEPARATOR;

  /// @notice Initializes the contract and sets the domain separator for EIP-712 signatures
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

  /// @notice Ensures that the caller is authenticated using an EIP-712 signature
  /// @param _auth The SignIn struct containing user address, timestamp, and signature
  modifier authenticated(SignIn calldata _auth) {
    if (_auth.time + 1 days <= block.timestamp) revert SignInExpired();
    if (_auth.user != _recoverSigner(_auth)) revert InvalidSignIn();
    _;
  }

  /// @notice Adds a new authenticator for a user
  /// @param _auth The SignIn struct for authentication
  /// @param _secret The secret key for the authenticator
  /// @param _label A label for the authenticator
  /// @param _issuer The issuer of the authenticator
  /// @param _timestep The time step for TOTP generation
  function add(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timestep
  ) external override authenticated(_auth) {
    _addAuthenticator(_auth, _secret, _label, _issuer, _timestep);
  }

  /// @notice Adds multiple authenticators for a user
  /// @param _auth The SignIn struct for authentication
  /// @param _secrets An array of secret keys for the authenticators
  /// @param _labels An array of labels for the authenticators
  /// @param _issuers An array of issuers for the authenticators
  /// @param _timesteps An array of time steps for TOTP generation
  function addMultiple(
    SignIn calldata _auth,
    bytes20[] calldata _secrets,
    string[] calldata _labels,
    string[] calldata _issuers,
    uint32[] calldata _timesteps
  ) external override authenticated(_auth) {
    if (
      _secrets.length != _labels.length ||
      _labels.length != _issuers.length ||
      _issuers.length != _timesteps.length
    ) revert InvalidArrayLengths();

    for (uint256 i = 0; i < _secrets.length; i++) {
      _addAuthenticator(
        _auth,
        _secrets[i],
        _labels[i],
        _issuers[i],
        _timesteps[i]
      );
    }
  }

  /// @notice Removes an authenticator for a user
  /// @param _auth The SignIn struct for authentication
  /// @param _id The ID of the authenticator to remove
  function remove(
    SignIn calldata _auth,
    uint256 _id
  ) external override authenticated(_auth) {
    AuthenticatorEntry[] storage authenticators = _userAuthenticators[
      _auth.user
    ];
    if (_id >= authenticators.length) revert IdOutOfBounds();

    uint256 lastIndex = authenticators.length - 1;
    if (_id != lastIndex) {
      authenticators[_id] = authenticators[lastIndex];
      authenticators[_id].id = _id;
    }

    authenticators.pop();
    _userAuthenticatorCount[_auth.user]--;

    emit AuthenticatorRemoved(_auth.user, _id);
  }

  /// @notice Generates TOTP codes for all authenticators of a user using a client-provided timestamp
  /// @param _auth The SignIn struct for authentication
  /// @param _clientTimestamp The timestamp to use for code generation
  /// @return An array of AuthenticatorCode structs
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
    if (
      _clientTimestamp > block.timestamp + 5 minutes ||
      _clientTimestamp < block.timestamp - 5 minutes
    ) revert InvalidTimestamp();

    return _generateCodes(_auth.user, _clientTimestamp);
  }

  /// @notice Generates TOTP codes for all authenticators of a user using the current block timestamp
  /// @param _auth The SignIn struct for authentication
  /// @return An array of AuthenticatorCode structs
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

  /// @notice Exports all authenticator entries for a user
  /// @param _auth The SignIn struct for authentication
  /// @return An array of AuthenticatorEntry structs
  function export(
    SignIn calldata _auth
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorEntry[] memory)
  {
    return _userAuthenticators[_auth.user];
  }

  /// @notice Recovers the signer's address from the EIP-712 signature
  /// @param _auth The SignIn struct containing the signature
  /// @return The recovered signer's address
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

  /// @notice Generates TOTP codes for all authenticators of a user
  /// @param _user The address of the user
  /// @param _timestamp The timestamp to use for code generation
  /// @return An array of AuthenticatorCode structs
  function _generateCodes(
    address _user,
    uint256 _timestamp
  ) private view returns (AuthenticatorCode[] memory) {
    AuthenticatorEntry[] storage authenticators = _userAuthenticators[_user];
    uint256 length = authenticators.length;
    AuthenticatorCode[] memory codes = new AuthenticatorCode[](length);

    for (uint256 i = 0; i < length; ) {
      codes[i] = AuthenticatorCode({
        id: authenticators[i].id,
        code: TOTP_sha1(
          abi.encodePacked(authenticators[i].secret),
          authenticators[i].timestep,
          uint32(_timestamp)
        ),
        label: authenticators[i].label,
        issuer: authenticators[i].issuer,
        timestep: authenticators[i].timestep
      });
      unchecked {
        ++i;
      }
    }

    return codes;
  }

  /// @notice Private function to add a single authenticator
  function _addAuthenticator(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timestep
  ) private {
    if (_secret == bytes20(0)) revert InvalidSecret();
    if (bytes(_label).length == 0 || bytes(_label).length > 100)
      revert InvalidLabel();
    if (bytes(_issuer).length == 0 || bytes(_issuer).length > 100)
      revert InvalidIssuer();
    if (_timestep == 0 || _timestep > 3600) revert InvalidTimeStep();

    uint256 newId = _userAuthenticatorCount[_auth.user];
    _userAuthenticators[_auth.user].push(
      AuthenticatorEntry({
        id: newId,
        secret: _secret,
        label: _label,
        issuer: _issuer,
        timestep: _timestep
      })
    );
    _userAuthenticatorCount[_auth.user]++;
    emit AuthenticatorAdded(_auth.user, newId);
  }
}
