import ScanIcon from "@/components/icons/scan-icon"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FC, useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"

const ScanQR: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction={"right"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div
          className="flex items-center gap-3 px-6 pb-6 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <ScanIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Scan QR Code</span>
          </Button>
          <p>Scan QR Code</p>
        </div>
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
          components={{ finder: false }}
          onScan={(result) => {
            if (result) {
              console.log(result)
              setOpen(false) // Close the drawer when a result is obtained
            }
          }}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default ScanQR
