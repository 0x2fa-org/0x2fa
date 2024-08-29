import { useChainId } from "wagmi"
import { readContract } from "wagmi/actions"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"
import { config } from "@/lib/wagmi"
import { useQuery } from "@tanstack/react-query"

export function useGenerate({ auth, ...options }: UseGenerateOptions) {
  const chainId = useChainId()

  return useQuery<
    unknown,
    Error,
    AuthenticatorCode[],
    readonly [string, SignIn | undefined]
  >({
    queryKey: ["generate", auth],
    queryFn: async () => {
      const clientTimestamp = Math.floor(Date.now() / 1000)
      const contract = AUTHENTICATOR_CONTRACT[chainId]

      const result = await readContract(config, {
        address: contract.address,
        abi: contract.abi,
        functionName: "generate",
        args: [auth, clientTimestamp],
      })

      if (!result) throw new Error("Failed to refresh the generated auth.")
      return result
    },
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    ...options,
  })
}
