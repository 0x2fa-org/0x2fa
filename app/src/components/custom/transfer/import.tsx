import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import ImportIcon from "@/components/icons/import-icon"
import BackIcon from "@/components/icons/back-icon"

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
        <div className="flex flex-col gap-2 mx-6 my-4">
          <h1 className="text-2xl font-semibold">Import Account</h1>
          <p className="text-sm">
            You&apos;ll need to select the accounts that you want to transfer
            from the Ox2fa app on your old device.
          </p>
          <ol className="list-decimal list-inside space-y-6 py-8">
            <li>Tap the profile button at the top right of the app.</li>
            <li>
              Find &apos;Transfer accounts&apos; from the menu, then follow the
              instructions to continue.
            </li>
          </ol>
        </div>
        <DrawerFooter className="mt-auto">
          <Button variant={"default"} className="rounded-full h-14 gap-2">
            Scan QR Code
            <BackIcon className="w-3 h-3 text-primary-foreground rotate-180" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ImportAccount
