import { task } from "hardhat/config"
import { save } from "./utils/save"
import { verify } from "./utils/verify"

task("deploy", "📰 Deploys a contract, saves the artifact and verifies it.")
  .addParam("contract", "Name of the contract to deploy.", "Counter")
  .addOptionalVariadicPositionalParam(
    "args",
    "Constructor arguments for the contract"
  )
  .addFlag("save", "Flag to indicate whether to save the contract or not")
  .addFlag("verify", "Flag to indicate whether to verify the contract or not")
  .setAction(async (args, { viem, network, run }) => {
    const constructorArgs = args.args || []

    console.log(`Deploying ${args.contract} to ${network.name}...`)

    try {
      const Contract = await viem.deployContract(args.contract, constructorArgs)

      console.log(
        `📰 Contract ${args.contract} deployed to ${network.name} at address: ${Contract.address}`
      )

      const chainId = (await viem.getPublicClient()).chain.id

      args.save && (await save(chainId, Contract.address, Contract.abi))
      args.verify && (await verify(run, Contract.address, []))
    } catch (error) {
      console.error("Deployment failed:", error)
    }
  })
