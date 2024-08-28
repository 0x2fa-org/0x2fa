import { FC, useState } from "react"
import { Button } from "../../ui/button"
import { PlusIcon } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../../ui/drawer"
import ScanQR from "./scan-qr"
import AddManually from "./add-manually"
import HideIcon from "@/components/icons/hide-icon"
import ViewIcon from "@/components/icons/view-icon"

const Controls: FC = () => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className="flex items-center justify-between mx-6 pt-6 pb-3">
      <div className="flex items-center gap-2">
        <p className="text-sm">Hide Code</p>
        <Button
          className="rounded-full h-8 w-8 border-none"
          variant="outline"
          size="icon"
          onClick={() => setIsHidden(!isHidden)}
        >
          {isHidden ? (
            <ViewIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
          ) : (
            <HideIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
          )}
          <span className="sr-only">Hide/View Icon</span>
        </Button>
      </div>
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <Button variant={"default"} className="rounded-full gap-2">
            Add
            <PlusIcon className="w-4 h-4 text-primary-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-3xl">
          <DrawerHeader direction="bottom" title="Add" />
          <ScanQR />
          <AddManually />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Controls
