import { FC } from "react"
import Logo from "../../icons/logo"
import LogoHollow from "../../icons/logo-hollow"
import { Button } from "../../ui/button"
import BackIcon from "../../icons/back-icon"
import { useConnect } from "wagmi"
import Loading from "./loading"
import LoadingIcon from "../../icons/loading-icon"

const Onboarding: FC = () => {
  const { connectors, connect, isPending, error } = useConnect()

  if (isPending) <Loading />

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="flex items-center justify-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-move-to-top">
        <Logo className="hover:animate-rotate-360" width={52} height={52} />
        <h1 className="text-5xl font-semibold">0x2fa</h1>
      </div>
      <LogoHollow className="absolute bottom-0 text-primary" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delayed w-full px-6">
        <Button
          className="h-14 rounded-full gap-2 w-full"
          disabled={isPending}
          onClick={() => connect({ connector: connectors[0] })}
        >
          Connect Wallet{" "}
          {isPending ? (
            <LoadingIcon />
          ) : (
            <BackIcon className="w-3 h-3 text-primary-foreground rotate-180" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
