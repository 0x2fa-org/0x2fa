"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { useSwipe } from "@/hooks/useSwipe"
import { useScrollReset } from "@/hooks/useScrollReset"
import BinIcon from "@/components/icons/bin-icon"
import CopyIcon from "@/components/icons/copy-icon"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { copyToClipboard, formatCode } from "@/lib/utils"
import { useRemove } from "@/hooks/authenticator/useRemove"
import LoadingIcon from "@/components/icons/loading-icon"

interface AuthEntryProps {
  auth: SignIn
  isHidden: boolean
  authenticator: AuthenticatorCode
}

const AuthEntry: FC<AuthEntryProps> = ({ auth, isHidden, authenticator }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const removeMutation = useRemove()

  const {
    swipePosition,
    elementRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetSwipe,
  } = useSwipe()

  useScrollReset(resetSwipe)

  const handleRemove = useCallback(async () => {
    resetSwipe()
  }, [resetSwipe, auth, authenticator.id, removeMutation])

  const remove = useCallback(async () => {
    await removeMutation.mutateAsync({ auth, id: authenticator.id })
  }, [auth, authenticator.id, removeMutation])

  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTime = Math.floor(Date.now() / 1000)
      const period = Number(authenticator.timestep)
      const elapsed = currentTime % period
      setTimeLeft(period - elapsed)
    }
    updateTimeLeft()

    const intervalId = setInterval(updateTimeLeft, 1000)
    return () => clearInterval(intervalId)
  }, [authenticator])

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden bg-destructive">
      <div
        className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-center bg-destructive cursor-pointer"
        onClick={handleRemove}
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center text-white focus:outline-none">
              <BinIcon className="w-6 h-6" />
              <p>Remove</p>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] border-none rounded-3xl sm:rounded-3xl p-0 gap-0">
            <DialogHeader className="py-6 px-6">
              <DialogTitle className="text-[#002220] dark:text-white text-left font-bold">
                Remove Account?
              </DialogTitle>
            </DialogHeader>
            <p className="mx-6">
              This account will be removed permanently from 0x2fa. This action{" "}
              <strong>CANNOT</strong> be undone.
            </p>
            <div className="flex flex-col gap-2 items-center justify-center sm:justify-center p-6 w-full">
              <Button
                variant={"default"}
                className="w-full rounded-full h-12 gap-2"
                onClick={remove}
                disabled={removeMutation.isPending}
              >
                Confirm
                {removeMutation.isPending ? <LoadingIcon /> : undefined}
              </Button>
              <DialogClose>
                <Button variant={"link"} className="w-fit p-0 m-0 font-normal">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div
        ref={elementRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 flex items-center px-6 py-5 bg-background text-foreground shadow-md border-b border-[#E9E9E9] dark:border-[#002827] w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${swipePosition}%)` }}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-secondary-foreground font-medium">
            {authenticator.issuer
              ? `${authenticator.issuer}: ${authenticator.label}`
              : authenticator.label}
          </p>
          <div className="flex items-center justify-between gap-2 w-full">
            <p className="text-5xl font-medium">
              {formatCode(authenticator.code, isHidden)}
            </p>
            <p className="font-medium">{`${timeLeft}s`}</p>
            <CopyIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                copyToClipboard(authenticator.code.toString().padStart(6, "0"))
                toast.success("Copied to clipboard")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthEntry
