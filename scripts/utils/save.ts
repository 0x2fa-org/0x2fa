import fs from "fs"
import path from "path"
import prettier from "prettier"
import { Abi } from "viem"

export const save = async (chainId: number, address: string, abi: Abi) => {
  const contractsDir = path.join(
    __dirname,
    "..",
    "..",
    // "app",
    // "src",
    // "lib"
  )
  const filePath = path.join(contractsDir, "contracts.ts")

  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir)

  let existingContracts = {}
  if (fs.existsSync(filePath)) {
    try {
      const { Contracts } = await import(filePath)
      existingContracts = Contracts
    } catch (error) {
      console.error("Error importing existing contracts:", error)
    }
  }

  const updatedContracts = {
    ...existingContracts,
    [chainId]: { address, abi },
  }

  const fileContent = `import { Abi } from "viem"

interface Artifact {
  [key: string]: {
    address: \`0x\${string}\`
    abi: Abi
  }
}

export const Contracts: Artifact = ${JSON.stringify(updatedContracts, null, 2)}`

  fs.writeFileSync(
    filePath,
    await prettier.format(fileContent, { parser: "typescript" })
  )

  console.log(`💾 Contract artifact has been saved to ${filePath}`)
}
