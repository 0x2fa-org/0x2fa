import "@nomicfoundation/hardhat-toolbox-viem"
import "@nomicfoundation/hardhat-viem"
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
    optimism_sepolia: {
      url:
        process.env.OPTIMISM_SEPOLIA_RPC_URL ||
        "https://rpc.ankr.com/optimism_sepolia",
      accounts,
    },
    base_sepolia: {
      url:
        process.env.BASE_SEPOLIA_RPC_URL || "https://rpc.ankr.com/base_sepolia",
      accounts,
    },
    arbitrum_sepolia: {
      url:
        process.env.ARBITRUM_SEPOLIA_RPC_URL ||
        "https://rpc.ankr.com/arbitrum_sepolia",
      accounts,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc.ankr.com/polygon_mumbai",
      accounts,
    },
    fuji: {
      url: process.env.FUJI_RPC_URL || "https://rpc.ankr.com/avalanche_fuji",
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
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
