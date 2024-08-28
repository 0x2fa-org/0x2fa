import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import ExportIcon from "@/components/icons/export-icon"

const ExportAccount: FC = () => {
  return (
    <Drawer direction={"right"}>
      <DrawerTrigger>
        <div className="flex items-center gap-3 p-6 cursor-pointer">
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <ExportIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Export Account</span>
          </Button>
          <p>Export Account</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader />
      </DrawerContent>
    </Drawer>
  )
}

export default ExportAccount
