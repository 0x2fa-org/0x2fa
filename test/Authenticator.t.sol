// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/Authenticator.sol";
import "../contracts/lib/OTPSHA1.sol";

contract AuthenticatorTest is Test {
  Authenticator public authenticator;
  address public user;
  uint256 public userPrivateKey;
  bytes20 public constant TEST_SECRET =
    bytes20(0x0102030405060708091011121314151617181920);

  function setUp() public {
    authenticator = new Authenticator();
    userPrivateKey = 0xA11CE;
    user = vm.addr(userPrivateKey);
    vm.label(user, "User");
  }

  function testAddAuthenticator() public {
    vm.prank(user);

    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 30);
    IAuthenticator.AuthenticatorEntry[] memory entries = authenticator.export(
      signIn
    );

    assertEq(entries.length, 1);
    assertEq(entries[0].label, "Test Label");
    assertEq(entries[0].issuer, "Test Issuer");
    assertEq(entries[0].timeStep, 30);
  }

  function testRemoveAuthenticator() public {
    vm.startPrank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 30);
    authenticator.remove(signIn, 0);
    vm.stopPrank();

    IAuthenticator.AuthenticatorEntry[] memory entries = authenticator.export(
      signIn
    );

    assertEq(entries.length, 0);
  }

  function testExportAuthenticators() public {
    vm.startPrank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label 1", "Test Issuer 1", 30);
    authenticator.add(
      signIn,
      bytes20(0x0203040506070809101112131415161718192021),
      "Test Label 2",
      "Test Issuer 2",
      60
    );
    vm.stopPrank();

    IAuthenticator.AuthenticatorEntry[] memory entries = authenticator.export(
      signIn
    );

    assertEq(entries.length, 2, "Should have 2 authenticator entries");
    assertEq(entries[0].id, 0, "First authenticator ID should be 0");
    assertEq(
      entries[0].secret,
      TEST_SECRET,
      "First authenticator secret mismatch"
    );
    assertEq(
      entries[0].label,
      "Test Label 1",
      "First authenticator label mismatch"
    );
    assertEq(
      entries[0].issuer,
      "Test Issuer 1",
      "First authenticator issuer mismatch"
    );
    assertEq(entries[0].timeStep, 30, "First authenticator time step mismatch");

    assertEq(entries[1].id, 1, "Second authenticator ID should be 1");
    assertEq(
      entries[1].secret,
      bytes20(0x0203040506070809101112131415161718192021),
      "Second authenticator secret mismatch"
    );
    assertEq(
      entries[1].label,
      "Test Label 2",
      "Second authenticator label mismatch"
    );
    assertEq(
      entries[1].issuer,
      "Test Issuer 2",
      "Second authenticator issuer mismatch"
    );
    assertEq(
      entries[1].timeStep,
      60,
      "Second authenticator time step mismatch"
    );
  }

  function testGenerate() public {
    vm.prank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 30);

    IAuthenticator.AuthenticatorCode[] memory codes = authenticator.generate(
      signIn
    );

    assertEq(codes.length, 1);
    assertEq(codes[0].label, "Test Label");
    assertEq(codes[0].issuer, "Test Issuer");

    uint256 expectedCode = TOTP_sha1(
      abi.encodePacked(TEST_SECRET),
      30,
      uint32(block.timestamp)
    );
    assertEq(codes[0].code, expectedCode);
  }

  function testAddMultipleAuthenticators() public {
    vm.startPrank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );

    for (uint256 i = 0; i < 5; i++) {
      authenticator.add(
        signIn,
        TEST_SECRET,
        string(abi.encodePacked("Label", i)),
        string(abi.encodePacked("Issuer", i)),
        30
      );
    }

    IAuthenticator.AuthenticatorEntry[] memory entries = authenticator.export(
      signIn
    );

    assertEq(entries.length, 5, "Should have 5 authenticator entries");
    vm.stopPrank();
  }

  function testRemoveNonExistentAuthenticator() public {
    vm.prank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.IdOutOfBounds.selector)
    );
    authenticator.remove(signIn, 0);
  }

  function testGenerateMultipleCodes() public {
    vm.startPrank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );

    authenticator.add(signIn, TEST_SECRET, "Label1", "Issuer1", 30);
    authenticator.add(
      signIn,
      bytes20(0x0203040506070809101112131415161718192021),
      "Label2",
      "Issuer2",
      60
    );

    IAuthenticator.AuthenticatorCode[] memory codes = authenticator.generate(
      signIn
    );

    assertEq(codes.length, 2, "Should generate 2 codes");
    assertEq(codes[0].label, "Label1");
    assertEq(codes[1].label, "Label2");

    uint256 expectedCode1 = TOTP_sha1(
      abi.encodePacked(TEST_SECRET),
      30,
      uint32(block.timestamp)
    );
    uint256 expectedCode2 = TOTP_sha1(
      abi.encodePacked(bytes20(0x0203040506070809101112131415161718192021)),
      60,
      uint32(block.timestamp)
    );

    assertEq(codes[0].code, expectedCode1);
    assertEq(codes[1].code, expectedCode2);
    vm.stopPrank();
  }

  function testInvalidSignature() public {
    address invalidUser = address(0xbaddeed);
    IAuthenticator.SignIn memory invalidSignIn = createSignIn(
      invalidUser,
      uint32(block.timestamp)
    );

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidSignIn.selector)
    );
    authenticator.add(
      invalidSignIn,
      TEST_SECRET,
      "Test Label",
      "Test Issuer",
      30
    );
  }

  function testAddAuthenticatorInvalidTimeStep() public {
    vm.prank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidTimeStep.selector)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 0);

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidTimeStep.selector)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 3601);
  }

  function testAddAuthenticatorEmptyLabelOrIssuer() public {
    vm.startPrank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidLabel.selector)
    );
    authenticator.add(signIn, TEST_SECRET, "", "Test Issuer", 30);

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidIssuer.selector)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "", 30);
    vm.stopPrank();
  }

  function testGenerateCodesInvalidTime() public {
    vm.prank(user);
    IAuthenticator.SignIn memory signIn = createSignIn(
      user,
      uint32(block.timestamp)
    );
    authenticator.add(signIn, TEST_SECRET, "Test Label", "Test Issuer", 30);

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidTimestamp.selector)
    );
    authenticator.generate(signIn, uint32(block.timestamp + 1 hours));
  }

  function testExportAuthenticatorsEmptyUser() public {
    address emptyUser = address(0x0);
    vm.prank(emptyUser);
    IAuthenticator.SignIn memory signIn = createSignIn(
      emptyUser,
      uint32(block.timestamp)
    );

    vm.expectRevert(
      abi.encodeWithSelector(IAuthenticator.InvalidSignIn.selector)
    );

    IAuthenticator.AuthenticatorEntry[] memory entries = authenticator.export(
      signIn
    );
    assertEq(entries.length, 0, "Should have no authenticator entries");
  }

  function createSignIn(
    address _user,
    uint32 _time
  ) internal view returns (IAuthenticator.SignIn memory) {
    bytes32 domainSeparator = authenticator.DOMAIN_SEPARATOR();
    bytes32 typeHash = authenticator.SIGNIN_TYPEHASH();
    bytes32 structHash = keccak256(abi.encode(typeHash, _user, _time));
    bytes32 digest = keccak256(
      abi.encodePacked("\x19\x01", domainSeparator, structHash)
    );

    (uint8 v, bytes32 r, bytes32 s) = vm.sign(userPrivateKey, digest);

    return
      IAuthenticator.SignIn({
        user: _user,
        time: _time,
        rsv: IAuthenticator.EIP712Signature({ r: r, s: s, v: v })
      });
  }
}
