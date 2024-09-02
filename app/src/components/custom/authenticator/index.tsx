import { FC, useState, useMemo } from "react"
import Controls from "../controls"
import Header from "./header"
import { Input } from "@/components/ui/input"
import { useGenerate } from "@/hooks/authenticator/use-generate"
import AuthEntry from "./auth-entry"
import EmptyIcon from "@/components/icons/empty-icon"

interface Props {
  auth: SignIn
}

const Authenticator: FC<Props> = ({ auth }) => {
  const [isHidden, setIsHidden] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: authenticators, isLoading } = useGenerate({ auth })

  const filteredAuthenticators = useMemo(() => {
    if (!authenticators) return []
    return authenticators.filter(
      (auth) =>
        auth.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auth.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [authenticators, searchQuery])

  return (
    <div className="max-w-lg mx-auto h-screen flex flex-col">
      <Header authenticators={authenticators} />
      <div className="flex items-center justify-between px-6">
        <Input
          type="text"
          placeholder="Search"
          className="rounded-full bg-muted border-none"
          showSearchIcon
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Controls isHidden={isHidden} setIsHidden={setIsHidden} />
      {filteredAuthenticators.length > 0 ? (
        <div className="flex-grow overflow-y-auto">
          {filteredAuthenticators.map((authenticator, index) => (
            <AuthEntry
              key={index}
              auth={auth}
              isHidden={isHidden}
              authenticator={authenticator}
            />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center justify-center flex-grow gap-4">
            <EmptyIcon />
            <p className="text-muted-foreground">
              {isLoading
                ? "Loading authenticators..."
                : searchQuery
                  ? "No matching authenticators found."
                  : "No authenticators added yet."}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Authenticator
