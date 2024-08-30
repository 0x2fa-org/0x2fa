import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer"
import { FC, useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import ExportIcon from "@/components/icons/export-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import BackIcon from "@/components/icons/back-icon"
import QRCode from "react-qr-code"
import { useExport } from "@/hooks/authenticator/use-export"
import { generateMigrationUri } from "@/lib/migration"

interface Props {
  auth: SignIn
  authenticators: AuthenticatorCode[] | undefined
}

const ExportAccount: FC<Props> = ({ auth, authenticators }) => {
  const [selectedAuthenticators, setSelectedAuthenticators] = useState<
    Set<number>
  >(new Set())
  const { data: exportData } = useExport({ auth })

  useEffect(() => {
    if (authenticators) {
      setSelectedAuthenticators(
        new Set(authenticators.map((_, index) => index))
      )
    }
  }, [authenticators])

  const exportUri = useMemo(() => {
    if (exportData && authenticators) {
      const selectedData = Array.from(selectedAuthenticators).map(
        (index) => exportData[index]
      )
      return generateMigrationUri(selectedData)
    }
  }, [exportData, authenticators, selectedAuthenticators])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAuthenticators(
        new Set(authenticators?.map((_, index) => index))
      )
    } else {
      setSelectedAuthenticators(new Set())
    }
  }

  const handleAuthenticatorToggle = (index: number) => {
    setSelectedAuthenticators((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }
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
        <div className="flex flex-col gap-2 mx-6 my-4">
          <h1 className="text-2xl font-semibold">Export Account</h1>
          <p className="text-sm">
            To export, we&apos;ll create a QR code that store the accounts that
            you select below
          </p>
        </div>
        {authenticators && authenticators.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="py-5 border-b border-border">
              <div className="mx-6 flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedAuthenticators.size === authenticators.length
                  }
                  onCheckedChange={handleSelectAll}
                />
                <Label
                  className="text-sm text-foreground font-normal"
                  htmlFor="select-all"
                >
                  {selectedAuthenticators.size === authenticators.length
                    ? "Unselect All"
                    : "Select All"}
                </Label>
              </div>
            </div>
            {authenticators.map(
              (authenticator: AuthenticatorCode, index: number) => (
                <div className="flex items-center space-x-3 mx-6" key={index}>
                  <Checkbox
                    id={`authenticator-${index}`}
                    checked={selectedAuthenticators.has(index)}
                    onCheckedChange={() => handleAuthenticatorToggle(index)}
                  />
                  <Label
                    htmlFor={`authenticator-${index}`}
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-foreground font-normal"
                  >
                    {authenticator.issuer
                      ? `${authenticator.issuer}: ${authenticator.label}`
                      : authenticator.label}
                  </Label>
                </div>
              )
            )}
          </div>
        )}
        <Drawer direction={"right"}>
          <DrawerTrigger disabled={selectedAuthenticators.size === 0}>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
              <Button
                className="h-14 rounded-full gap-2 w-full"
                disabled={selectedAuthenticators.size === 0}
              >
                Export
                <BackIcon className="w-3 h-3 text-primary-foreground rotate-180" />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-screen">
            <DrawerHeader />
            <div className="flex flex-col gap-2 mx-6 my-4">
              <h1 className="text-2xl font-semibold">Scan QR Code</h1>
              <p className="text-sm">
                On the new device, can this QR code to import the accounts you
                selected
              </p>
            </div>
            {exportUri && (
              <div className="flex justify-center items-center py-12">
                <QRCode value={exportUri} size={256} />
              </div>
            )}
            <DrawerClose>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
                <Button
                  className="h-14 rounded-full w-full"
                  disabled={selectedAuthenticators.size === 0}
                >
                  Done
                </Button>
              </div>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  )
}

export default ExportAccount
