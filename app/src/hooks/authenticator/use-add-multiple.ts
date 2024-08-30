import { toast } from "sonner"
import { useChainId } from "wagmi"
import { writeContract } from "wagmi/actions"
import { config } from "@/lib/wagmi"
import { useMutation } from "@tanstack/react-query"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"

export function useAddMultiple() {
  const chainId = useChainId()
  const contract = AUTHENTICATOR_CONTRACT[chainId]
  
  const addMultipleMutation = useMutation({
    mutationFn: async ({
      auth,
      secrets,
      labels,
      issuers,
      timesteps,
    }: AddMultipleParams) => {
      const result = await writeContract(config, {
        address: contract.address,
        abi: contract.abi,
        functionName: "addMultiple",
        args: [auth, secrets, labels, issuers, timesteps],
      })

      if (!result) throw new Error("Import failed")

      return result
    },
    onError: (error: Error) => {
      console.error("Import failed:", error)
      toast.error(error.message)
    },
    onSuccess: (result) => {
      toast.success("Imported authenticators successfully")
      console.log("Imported authenticators successfully:", result)
    },
  })

  return addMultipleMutation
}
