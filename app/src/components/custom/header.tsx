import { FC } from "react"
import Image from "next/image"
import { ThemeToggle } from "../ui/theme"
import Account from "./account"

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-6 w-full">
      <div className="flex items-center gap-2">
        <Image className="hover:animate-rotate-360" src="/icons/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-2xl font-semibold">0x2fa</h1>
      </div>
      <div className="flex items-center gap-3.5">
        <ThemeToggle />
        <Account />
      </div>
    </header>
  )
}

export default Header
