import { toast } from "sonner"
import { useChainId } from "wagmi"
import { writeContract } from "wagmi/actions"
import { config } from "@/lib/wagmi"
import { useMutation } from "@tanstack/react-query"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"

export function useAdd() {
  const chainId = useChainId()
  const contract = AUTHENTICATOR_CONTRACT[chainId]

  const addMutation = useMutation({
    mutationFn: async ({
      auth,
      secret,
      label,
      issuer,
      timestep,
    }: AddParams) => {
      const result = await writeContract(config, {
        address: contract.address,
        abi: contract.abi,
        functionName: "add",
        args: [auth, secret, label, issuer, timestep],
      })

      if (!result) throw new Error("Failed to set OTP")

      return result
    },
    onError: (error: Error) => {
      console.error("Add error:", error)
      if (error.message.includes("User rejected the request"))
        return toast.error("User denied transaction signature.")
      toast.error(error.message)
    },
    onSuccess: (result) => {
      toast.success("Auth code addeded successfully!")
      console.log("Auth code addeded successfully:", result)
    },
  })

  return addMutation
}
