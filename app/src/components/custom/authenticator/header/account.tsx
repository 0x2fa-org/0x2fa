import { FC } from "react"
import { Button } from "../../../ui/button"
import ProfileIcon from "../../../icons/profile-icon"
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import TransferAccount from "../../transfer"
import { useDisconnect } from "wagmi"
import DisconnectIcon from "@/components/icons/disconnect-icon"

const Account: FC = () => {
  const { disconnect } = useDisconnect()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full h-11 w-11 border-none"
          variant="outline"
          size="icon"
        >
          <ProfileIcon className="h-6 w-6 text-[#002D2B] dark:text-white" />
          <span className="sr-only">Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] border-none rounded-3xl sm:rounded-3xl p-0 gap-0">
        <DialogHeader className="py-6 px-6">
          <DialogTitle className="text-[#002220] dark:text-white text-left font-medium">
            Profile
          </DialogTitle>
        </DialogHeader>
        <TransferAccount />
        <div className="flex items-center gap-3 p-6 border-t border-[#EEEEEE] dark:border-[#002827] cursor-pointer" onClick={() => disconnect()}>
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <DisconnectIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Transfer</span>
          </Button>
          <p>Disconnect Wallet</p>
        </div>
        <DialogFooter className="flex flex-row gap-4 items-center justify-center sm:justify-center border-t border-[#EEEEEE] dark:border-[#002827] py-2">
          <Button
            variant={"link"}
            className="w-fit p-0 m-0 text-xs font-normal"
          >
            Privacy policy
          </Button>
          {"•"}
          <Button
            variant={"link"}
            className="w-fit p-0 m-0 text-xs font-normal"
          >
            Term of Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Account
