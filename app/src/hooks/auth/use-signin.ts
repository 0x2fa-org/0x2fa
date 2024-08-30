import { toast } from "sonner"
import { parseSignature } from "viem"
import { useAccount, useSignTypedData } from "wagmi"

import { useMutation } from "@tanstack/react-query"
import { useChainId } from "wagmi"
import { AUTHENTICATOR_CONTRACT } from "@/lib/contracts"

const types = {
  SignIn: [
    { name: "user", type: "address" },
    { name: "time", type: "uint32" },
  ],
}

export function useSignIn() {
  const { address } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()
  const chainId = useChainId()
  const contract = AUTHENTICATOR_CONTRACT[chainId]

  const domain = {
    name: "Authenticator",
    version: "1",
    chainId: chainId,
    verifyingContract: contract.address,
  }

  const signInMutation = useMutation({
    mutationFn: async (): Promise<SignIn> => {
      if (!address) throw toast.error("No wallet connected")

      const time = Math.floor(Date.now() / 1000)
      const user = address

      const message = {
        user,
        time,
      }

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "SignIn",
        message,
      })

      const { r, s, v } = parseSignature(signature)
      if (!v) throw toast.error("Invalid signature: 'v' is undefined")

      return { user, time, rsv: { r, s, v: Number(v) } }
    },
    onError: (error: Error) => {
      console.error("Sign-in error:", error)
      toast.error(error.message)
    },
  })

  return signInMutation
}
