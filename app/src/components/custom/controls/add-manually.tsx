import AddIcon from "@/components/icons/add-icon"
import ExportIcon from "@/components/icons/export-icon"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FC } from "react"

const AddManually: FC = () => {
  return (
    <Drawer direction={"right"}>
      <DrawerTrigger>
        <div className="flex items-center gap-3 p-6 border-t border-[#EEEEEE] dark:border-[#002827] cursor-pointer">
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <AddIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Add Manually</span>
          </Button>
          <p>Add Manually</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader />
      </DrawerContent>
    </Drawer>
  )
}

export default AddManually
