import { task } from "hardhat/config"
import { save } from "./utils/save"
import { verify } from "./utils/verify"

task("deploy", "📰 Deploys a contract, saves the artifact and verifies it.")
  .addParam("contract", "Name of the contract to deploy.", "Authenticator")
  .addOptionalVariadicPositionalParam(
    "args",
    "Constructor arguments for the contract"
  )
  .addFlag("save", "Flag to indicate whether to save the contract or not")
  .addFlag("verify", "Flag to indicate whether to verify the contract or not")
  .setAction(async (args, { viem, network, run }) => {
    await run("compile")

    console.log(
      `🚀 Starting deployment process for ${args.contract} on ${network.name}...`
    )

    try {
      console.log("📚 Deploying SHA1 library...")
      const sha1 = await viem.deployContract("contracts/lib/SHA1.sol:SHA1", [])
      console.log(`✅ SHA1 library deployed at: ${sha1.address}`)

      console.log(`📄 Deploying ${args.contract}...`)
      const Contract = await viem.deployContract(args.contract, args.args, {
        libraries: { SHA1: sha1.address },
      })
      console.log(`✅ ${args.contract} deployed at: ${Contract.address}`)

      const chainId = (await viem.getPublicClient()).chain.id

      args.save && (await save(chainId, Contract.address, Contract.abi))
      args.verify && (await verify(run, Contract.address, args.args))

      console.log("🎉 Deployment process completed successfully!")
    } catch (error) {
      console.error("❌ Deployment failed:", error)
    }
  })
