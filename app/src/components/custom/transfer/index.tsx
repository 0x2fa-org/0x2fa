import { FC } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import SwitchIcon from "@/components/icons/switch-icon"
import { Button } from "@/components/ui/button"
import ExportAccount from "./export"
import ImportAccount from "./import"

const TransferAccount: FC = () => {
  return (
    <Drawer direction={"right"}>
      <DrawerTrigger>
        <div className="flex items-center gap-3 p-6 border-t border-[#EEEEEE] dark:border-[#002827] cursor-pointer">
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <SwitchIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Transfer</span>
          </Button>
          <p>Transfer Account</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader />
        <div className="flex flex-col gap-2 mx-6 my-4">
          <h1 className="text-2xl font-semibold">Transfer Account</h1>
          <p className="text-sm">
            You can transfer account to a new device that has Ox2fa
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ExportAccount />
          <ImportAccount />
        </div>
        
      </DrawerContent>
    </Drawer>
  )
}

export default TransferAccount
