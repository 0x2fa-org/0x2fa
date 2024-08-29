import { FC, useState } from "react"
import Controls from "../controls"
import Header from "./header"
import { Input } from "@/components/ui/input"
import { useGenerate } from "@/hooks/authenticator/useGenerate"
import AuthEntry from "./auth-entry"
import EmptyIcon from "@/components/icons/empty-icon"

interface Props {
  auth: SignIn
}

const Authenticator: FC<Props> = ({ auth }) => {
  const [isHidden, setIsHidden] = useState(false)
  const { data: authenticators, isLoading } = useGenerate({ auth })

  return (
    <div className="max-w-lg mx-auto h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-between px-6">
        <Input
          type="text"
          placeholder="Search"
          className="rounded-full bg-muted border-none"
          showSearchIcon
        />
      </div>
      <Controls isHidden={isHidden} setIsHidden={setIsHidden} />
      {authenticators && authenticators.length > 0 ? (
        authenticators.map((authenticator, index) => (
          <AuthEntry
            key={index}
            auth={auth}
            isHidden={isHidden}
            authenticator={authenticator}
          />
        ))
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center justify-center flex-grow gap-4">
            <EmptyIcon />
            <p className="text-muted-foreground">
              No authenticators added yet.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Authenticator
