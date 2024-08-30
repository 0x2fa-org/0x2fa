import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer"
import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import ImportIcon from "@/components/icons/import-icon"
import BackIcon from "@/components/icons/back-icon"
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"
import { parseOtpMigrationUri, toByte20 } from "@/lib/utils"
import { toast } from "sonner"
import { useAddMultiple } from "@/hooks/authenticator/use-add-multiple"
import { useAccount } from "wagmi"

const ImportAccount: FC = () => {
  const [open, setOpen] = useState(false)
  const { address } = useAccount()
  const addMultipleMutation = useAddMultiple()

  const handleScan = async (result: IDetectedBarcode[]) => {
    if (result.length <= 0 || addMultipleMutation.isPending) return

    const parsedData = parseOtpMigrationUri(result[0].rawValue)
    if (!parsedData || parsedData.length === 0) {
      setOpen(false)
      return toast.error("Invalid QR code")
    }

    const lastSignInData = localStorage.getItem(`lastSignIn_${address}`)
    if (!lastSignInData)
      return toast.error("No sign-in data found. Please sign in first.")

    const auth = JSON.parse(lastSignInData)

    setOpen(false)

    await addMultipleMutation.mutateAsync({
      auth,
      secrets: parsedData.map((entry: ImportParse) => toByte20(entry.secret)),
      labels: parsedData.map((entry: ImportParse) => entry.label),
      issuers: parsedData.map((entry: ImportParse) => entry.issuer),
      timesteps: parsedData.map(() => 30),
    })
  }

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
          <Drawer direction={"right"} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant={"default"} className="rounded-full h-14 gap-2">
                Scan QR Code
                <BackIcon className="w-3 h-3 text-primary-foreground rotate-180" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen">
              <DrawerHeader />
              <Scanner
                allowMultiple={false}
                styles={{
                  container: {
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                  },
                  video: { objectFit: "cover", width: "100%", flex: "1" },
                  finderBorder: 100,
                }}
                components={{ finder: false, tracker: () => false }}
                onScan={handleScan}
              />
            </DrawerContent>
          </Drawer>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ImportAccount
