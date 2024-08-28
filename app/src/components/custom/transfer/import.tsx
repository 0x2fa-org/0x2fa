import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import ImportIcon from "@/components/icons/import-icon"

const ImportAccount: FC = () => {
  return (
    <Drawer direction={"right"}>
      <DrawerTrigger>
        <div className="flex items-center gap-3 p-6 border-t border-[#EEEEEE] dark:border-[#002827] cursor-pointer">
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <ImportIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Import Account</span>
          </Button>
          <p>Import Account</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader />
      </DrawerContent>
    </Drawer>
  )
}

export default ImportAccount
