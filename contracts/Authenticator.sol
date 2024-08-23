// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interface/IAuthenticator.sol";

contract Authenticator is IAuthenticator {
  constructor() {}

  modifier authenticated(SignIn calldata _auth) {
    _;
  }

  function add(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timeStep
  ) external override authenticated(_auth) {}

  function remove(
    SignIn calldata _auth,
    uint256 _id
  ) external override authenticated(_auth) {}

  function generate(
    SignIn calldata _auth,
    uint256 _clientTimestamp
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorCode[] memory codes)
  {}

  function generate(
    SignIn calldata _auth
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorCode[] memory codes)
  {}

  function export(
    SignIn calldata _auth
  )
    external
    view
    override
    authenticated(_auth)
    returns (AuthenticatorEntry[] memory)
  {}
}
