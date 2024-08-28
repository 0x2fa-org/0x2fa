// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAuthenticator
/// @notice Interface for managing and generating authenticator codes
interface IAuthenticator {
  /// @notice Represents an authenticator entry
  struct AuthenticatorEntry {
    uint256 id;
    bytes20 secret;
    string label;
    string issuer;
    uint32 timeStep;
  }

  /// @notice Represents a generated authenticator code
  struct AuthenticatorCode {
    uint256 id;
    uint256 code;
    string label;
    string issuer;
  }

  /// @notice Represents an EIP-712 signature
  struct EIP712Signature {
    bytes32 r;
    bytes32 s;
    uint256 v;
  }

  /// @notice Represents a sign-in request
  struct SignIn {
    address user;
    uint32 time;
    EIP712Signature rsv;
  }

  /// @notice Emitted when a new authenticator is added
  /// @param user The address of the user
  /// @param id The ID of the added authenticator
  event AuthenticatorAdded(address indexed user, uint256 indexed id);

  /// @notice Emitted when an authenticator is removed
  /// @param user The address of the user
  /// @param id The ID of the removed authenticator
  event AuthenticatorRemoved(address indexed user, uint256 indexed id);

  /// @notice Thrown when a sign-in request has expired
  error SignInExpired();

  /// @notice Thrown when a sign-in request is invalid
  error InvalidSignIn();

  /// @notice Thrown when an invalid time step is provided
  error InvalidTimeStep();

  /// @notice Thrown when an authenticator ID is out of bounds
  error IdOutOfBounds();

  /// @notice Thrown when an invalid label is provided
  error InvalidLabel();

  /// @notice Thrown when an invalid issuer is provided
  error InvalidIssuer();

  /// @notice Thrown when an invalid secret is provided
  error InvalidSecret();

  /// @notice Thrown when an invalid timestamp is provided
  error InvalidTimestamp();

  /// @notice Thrown when the array lengths are not equal
  error InvalidArrayLengths();

  /// @notice Adds a new authenticator
  /// @param _auth The sign-in request
  /// @param _secret The secret for the authenticator
  /// @param _label The label for the authenticator
  /// @param _issuer The issuer of the authenticator
  /// @param _timeStep The time step for code generation
  function add(
    SignIn calldata _auth,
    bytes20 _secret,
    string calldata _label,
    string calldata _issuer,
    uint32 _timeStep
  ) external;

  /// @notice Removes an authenticator
  /// @param _auth The sign-in request
  /// @param _id The ID of the authenticator to remove
  function remove(SignIn calldata _auth, uint256 _id) external;

  /// @notice Generates authenticator codes using a client-provided timestamp
  /// @param _auth The sign-in request
  /// @param _clientTimestamp The client-provided timestamp
  /// @return codes An array of generated authenticator codes
  function generate(
    SignIn calldata _auth,
    uint256 _clientTimestamp
  ) external view returns (AuthenticatorCode[] memory codes);

  /// @notice Generates authenticator codes using the current block timestamp
  /// @param _auth The sign-in request
  /// @return codes An array of generated authenticator codes
  function generate(
    SignIn calldata _auth
  ) external view returns (AuthenticatorCode[] memory codes);

  /// @notice Exports all authenticator entries for a user
  /// @param _auth The sign-in request
  /// @return An array of authenticator entries
  function export(
    SignIn calldata _auth
  ) external view returns (AuthenticatorEntry[] memory);
}
