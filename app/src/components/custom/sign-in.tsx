import { useSignIn } from "@/hooks/useSignIn"
import { FC } from "react"
import { Button } from "../ui/button"
import { useAccount } from "wagmi"
import WarningIcon from "../icons/warning-icon"
import BackIcon from "../icons/back-icon"
import LoadingIcon from "../icons/loading-icon"

const SignIn: FC = () => {
  const { address } = useAccount()
  const signInMutation = useSignIn()

  const handleSignIn = async () => {
    try {
      const signInData = await signInMutation.mutateAsync()
      localStorage.setItem(`lastSignIn_${address}`, JSON.stringify(signInData))
    } catch (error) {
      console.error("Sign-in failed:", error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <WarningIcon />
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="text-center mx-12">
        Sign-in session expired. Sign this message to prove you own this wallet
        and proceed.
      </p>
      <Button
        className="h-14 rounded-full gap-2 px-8"
        onClick={handleSignIn}
        disabled={signInMutation.isPending}
      >
        Sign In
        {signInMutation.isPending ? <LoadingIcon /> : <BackIcon className="w-3 h-3 rotate-180" />}
      </Button>
    </div>
  )
}

export default SignIn
