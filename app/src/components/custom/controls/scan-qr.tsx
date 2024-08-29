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
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"
import * as OTPAuth from "otpauth"

const ScanQR: FC = () => {
  const [open, setOpen] = useState(false)
  const [otpInfo, setOtpInfo] = useState<OTPAuth.TOTP | null>(null)

  const handleScan = (result: IDetectedBarcode[]) => {
    if (result.length > 0) {
      const rawValue = result[0].rawValue
      try {
        const totp = OTPAuth.URI.parse(rawValue)
        if (totp instanceof OTPAuth.HOTP) {
          console.error("Unsupported Auth type [HOTP]")
          return
        }

        if (totp.algorithm !== "SHA1") {
          console.error("Unsupported algorithm. Only SHA1 is supported.")
          return
        }

        if (totp.digits !== 6) {
          console.error("Invalid number of digits. Must be 6.")
          return
        }

        if (totp.period < 1 || totp.period > 3600) {
          console.error("Invalid period. Must be between 1 and 3600 seconds.")
          return
        }

        setOtpInfo(totp)
        setOpen(false)
        console.log("OTP Info:", {
          issuer: totp.issuer,
          label: totp.label,
          secret: totp.secret.base32,
          algorithm: totp.algorithm,
          digits: totp.digits,
          period: totp.period,
        })
      } catch (error) {
        console.error("Invalid OTP URI:", error)
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
          components={{ finder: false }}
          onScan={handleScan}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default ScanQR
