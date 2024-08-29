import { FC } from "react"
import Logo from "../icons/logo"

const Loading: FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <div className="absolute w-32 h-32 bg-accent blur-2xl rounded-full opacity-50 dark:opacity-15"></div>
      <Logo className="animate-spin relative z-10" width={52} height={52} />
    </div>
  )
}

export default Loading
