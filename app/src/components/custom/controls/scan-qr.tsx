import ScanIcon from "@/components/icons/scan-icon"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FC, useState } from "react"
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"
import * as OTPAuth from "otpauth"
import { useAdd } from "@/hooks/authenticator/use-add"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { toByte20 } from "@/lib/utils"

const ScanQR: FC = () => {
  const [open, setOpen] = useState(false)
  const { address } = useAccount()
  const addMutation = useAdd()

  const handleScan = async (result: IDetectedBarcode[]) => {
    if (result.length > 0 && !addMutation.isPending) {
      const rawValue = result[0].rawValue
      try {
        const totp = OTPAuth.URI.parse(rawValue)
        if (!(totp instanceof OTPAuth.TOTP))
          return toast.error("Unsupported Auth type. Only TOTP is supported.")

        if (totp.algorithm !== "SHA1")
          return toast.error("Unsupported algorithm. Only SHA1 is supported.")

        if (totp.digits !== 6)
          return toast.error("Invalid number of digits. Must be 6.")

        if (totp.period < 1 || totp.period > 3600)
          return toast.error(
            "Invalid period. Must be between 1 and 3600 seconds."
          )

        const lastSignInData = localStorage.getItem(`lastSignIn_${address}`)
        if (!lastSignInData)
          return toast.error("No sign-in data found. Please sign in first.")

        const auth = JSON.parse(lastSignInData)

        setOpen(false)

        await addMutation.mutateAsync({
          auth,
          secret: toByte20(totp.secret.base32),
          label: totp.label,
          issuer: totp.issuer,
          timestep: totp.period,
        })
      } catch (error) {
        toast.error("Failed to add authenticator")
      }
    }
  }
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
          components={{ finder: false, tracker: () => false }}
          onScan={handleScan}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default ScanQR
