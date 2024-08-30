import { useChainId } from "wagmi"
import { readContract } from "wagmi/actions"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"
import { config } from "@/lib/wagmi"
import { useQuery } from "@tanstack/react-query"

export function useExport({ auth, ...options }: UseExportOptions) {
  const chainId = useChainId()

  return useQuery<
    unknown,
    Error,
    AuthenticatorExport[],
    readonly [string, SignIn | undefined]
  >({
    queryKey: ["export", auth],
    queryFn: async () => {
      const contract = AUTHENTICATOR_CONTRACT[chainId]

      const result = await readContract(config, {
        address: contract.address,
        abi: contract.abi,
        functionName: "export",
        args: [auth],
      })

      if (!result) throw new Error("Failed to export authenticators.")
      return result
    },
    ...options,
  })
}
