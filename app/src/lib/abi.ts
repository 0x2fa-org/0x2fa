import { Abi } from "viem"

export const ABI: Abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "IdOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidArrayLengths",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidIssuer",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidLabel",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSecret",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignIn",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTimeStep",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTimestamp",
    type: "error",
  },
  {
    inputs: [],
    name: "SignInExpired",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AuthenticatorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AuthenticatorRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EIP712_DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SIGNIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
      {
        internalType: "bytes20",
        name: "_secret",
        type: "bytes20",
      },
      {
        internalType: "string",
        name: "_label",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuer",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "_timeStep",
        type: "uint32",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
      {
        internalType: "bytes20[]",
        name: "_secrets",
        type: "bytes20[]",
      },
      {
        internalType: "string[]",
        name: "_labels",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "_issuers",
        type: "string[]",
      },
      {
        internalType: "uint32[]",
        name: "_timeSteps",
        type: "uint32[]",
      },
    ],
    name: "addMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
    ],
    name: "export",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "bytes20",
            name: "secret",
            type: "bytes20",
          },
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "timeStep",
            type: "uint32",
          },
        ],
        internalType: "struct IAuthenticator.AuthenticatorEntry[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_clientTimestamp",
        type: "uint256",
      },
    ],
    name: "generate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "code",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
        ],
        internalType: "struct IAuthenticator.AuthenticatorCode[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
    ],
    name: "generate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "code",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuer",
            type: "string",
          },
        ],
        internalType: "struct IAuthenticator.AuthenticatorCode[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "time",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "v",
                type: "uint256",
              },
            ],
            internalType: "struct IAuthenticator.EIP712Signature",
            name: "rsv",
            type: "tuple",
          },
        ],
        internalType: "struct IAuthenticator.SignIn",
        name: "_auth",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
