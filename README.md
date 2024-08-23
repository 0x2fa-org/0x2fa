# 0x2fa

0x2fa is a two-factor authentication (2FA) system built on Oasis Protocol. It provides a secure, decentralized and user-friendly way to implement 2FA for any application.

## Project Structure

The project is organized as follows:

- `contracts/`: Contains the Solidity smart contracts
- `scripts/`: Deployment and utility scripts
- `test/`: Test files for the smart contracts
- `lib/`: External libraries and dependencies

## Key Components

### Authenticator Contract

The main contract `Authenticator.sol` implements the 2FA functionality. It allows users to:

- Add new authenticator entries
- Remove existing entries
- Generate time-based codes
- Export authenticator entries

### OTPSHA1 Library

The `OTPSHA1.sol` library provides the HOTP and TOTP implementations using SHA1 for generating one-time passwords.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/0x2fa-org/0x2fa.git
   cd 0x2fa
   ```

2. Install dependencies:

   ```bash
   pnpm i
   ```

3. Compile the contracts:

   ```bash
   hh compile
   ```

4. Run tests:

   ```bash
   forge test
   ```

## Deployment

To deploy the Authenticator contract:

`hh deploy --network <network-name>`

Replace `<network-name>` with the desired network (e.g., `localhost`, `sapphire`, `sapphire-testnet`, `sapphire-localhost`).

## Usage

To interact with the deployed contract, you can use Viem in your frontend or backend application. Here are examples of how to use different functions of the Authenticator contract:

### Init

```typescript
import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { authenticatorABI } from './authenticatorABI' 

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
})

const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
})
const contractAddress = '0x...' 
```

### Add

```typescript
async function addAuthenticator(auth: SignIn, secret: string, label: string, issuer: string, timestep: number) {
    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: authenticatorABI,
        functionName: 'add',
        args: [auth, secret, label, issuer, timestep],
    })
    const hash = await walletClient.writeContract(request)
    return hash
}
```

### Remove

```typescript
async function removeAuthenticator(auth: SignIn, id: number) {
    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: authenticatorABI,
        functionName: 'remove',
        args: [auth, id],
    })
    const hash = await walletClient.writeContract(request)
    return hash
}
```

### Generate

```typescript
async function generateCode(auth: SignIn, clientTimestamp: number) {
    const code = await publicClient.readContract({
        address: contractAddress,
        abi: authenticatorABI,
        functionName: 'generate',
        args: [auth, clientTimestamp],
    })
    return code
}
```

### Export

```typescript
async function exportAuthenticators(auth: SignIn) {
    const entries = await publicClient.readContract({
        address: contractAddress,
        abi: authenticatorABI,
        functionName: 'export',
        args: [auth],
    })
    return entries
}
```

## Security Considerations

- Ensure that the secret keys for TOTP are securely stored and transmitted.
- Implement auth validation for all user functions to prevent unauthorized access.
- Relying on the block timestamp for TOTP generation is not secure.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
