import { FC } from "react"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer"

const Controls: FC = () => {
  return (
    <div className="flex items-center justify-between mx-6 pt-6 pb-3">
      <p>Hide Code</p>
      <Drawer direction="bottom">
        <DrawerTrigger>
          <Button variant={"default"} className="rounded-full gap-2">
            Add
            <PlusIcon className="w-4 h-4 text-primary-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-3xl">
          <DrawerHeader direction="bottom" title="Add" />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Controls
