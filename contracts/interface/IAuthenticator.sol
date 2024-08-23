// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAuthenticator {
  struct AuthenticatorEntry {
    uint256 id;
    bytes20 secret;
    string label;
    string issuer;
    uint32 timeStep;
  }

  struct AuthenticatorCode {
    uint256 id;
    uint256 code;
    string label;
    string issuer;
  }

  struct EIP712Signature {
    bytes32 r;
    bytes32 s;
    uint256 v;
  }

  struct SignIn {
    address user;
    uint32 time;
    EIP712Signature rsv;
  }

  event AuthenticatorAdded(address indexed user, uint256 indexed id);
  event AuthenticatorRemoved(address indexed user, uint256 indexed id);

  error SignInExpired();
  error InvalidSignIn();
  error InvalidTimeStep();
  error IdOutOfBounds();

  function add(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timeStep
  ) external;

  function remove(SignIn calldata _auth, uint256 _id) external;

  function generate(
    SignIn calldata _auth,
    uint256 _clientTimestamp
  ) external view returns (AuthenticatorCode[] memory codes);

  function generate(
    SignIn calldata _auth
  ) external view returns (AuthenticatorCode[] memory codes);

  function export(
    SignIn calldata _auth
  ) external view returns (AuthenticatorEntry[] memory);
}
