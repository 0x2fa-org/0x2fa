import { toast } from "sonner"
import { useChainId } from "wagmi"
import { writeContract } from "wagmi/actions"
import { config } from "@/lib/wagmi"
import { useMutation } from "@tanstack/react-query"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"

export function useRemove() {
  const chainId = useChainId()
  const contract = AUTHENTICATOR_CONTRACT[chainId]

  const removeMutation = useMutation({
    mutationFn: async ({ auth, id }: { auth: SignIn; id: bigint }) => {
      const result = await writeContract(config, {
        address: contract.address,
        abi: contract.abi,
        functionName: "remove",
        args: [auth, id],
      })

      if (!result) return

      return result
    },
    onError: (error: Error) => {
      console.error("remove authenticator error:", error)
      if (error.message.includes("User rejected the request"))
        return toast.error("User denied transaction signature.")
      toast.error(error.message)
    },
    onSuccess: (result) => {
      toast.success("Authenticator removed successfully")
      console.log("Authenticator removal successful:", result)
    },
  })

  return removeMutation
}
