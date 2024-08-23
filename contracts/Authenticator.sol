// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Authenticator {
  constructor() {}

  modifier authenticated() {
    _;
  }

  function add() external {}

  function remove() external {}

  function generate() external {}

  function export() external {}
}
