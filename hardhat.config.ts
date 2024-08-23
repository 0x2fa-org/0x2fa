import "@nomicfoundation/hardhat-toolbox-viem"
import "@nomicfoundation/hardhat-viem"
import "@oasisprotocol/sapphire-hardhat"
import "dotenv/config"
import "hardhat-contract-sizer"
import "./scripts/generate"
import "./scripts/deploy"
import { HardhatUserConfig } from "hardhat/config"
import { HDAccountsUserConfig } from "hardhat/types"

const mnemonic = process.env.MNEMONIC
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file")
}

const accounts: HDAccountsUserConfig = {
  mnemonic,
  count: 100,
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.24" }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.ankr.com/eth_sepolia",
      accounts,
    },
    sapphire: {
      url: process.env.SAPPHIRE_RPC_URL || "https://sapphire.oasis.io",
      chainId: 0x5afe,
      accounts,
    },
    "sapphire-testnet": {
      url:
        process.env.SAPPHIRE_TESTNET_RPC_URL ||
        "https://testnet.sapphire.oasis.io",
      chainId: 0x5aff,
      accounts,
    },
    "sapphire-localnet": {
      url: process.env.SAPPHIRE_LOCALNET_RPC_URL || "http://localhost:8545",
      chainId: 0x5afd,
      accounts,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  mocha: {
    timeout: 20000,
  },
  sourcify: {
    enabled: true,
  },
}

export default config
