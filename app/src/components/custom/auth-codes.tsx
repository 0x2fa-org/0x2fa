import { FC } from "react"
import AuthEntry from "./auth-entry"

const AuthCodes: FC = () => {
  const codes = [
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
    "123456",
  ]

  return (
    <div className="flex flex-col">
      {codes.map((code, index) => (
        <AuthEntry key={index} text={code} onRemove={() => {}} />
      ))}
    </div>
  )
}

export default AuthCodes
