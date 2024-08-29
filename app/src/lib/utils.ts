import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { base32Decode } from "@ctrl/ts-base32"
import { Hex } from "viem"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toByte20 = (pk: string): Hex => {
  const bytes = new Uint8Array(20)
  bytes.set(base32Decode(pk).slice(0, 20))

  return `0x${Buffer.from(bytes).toString("hex")}`
}

export const formatCode = (code: bigint, isHidden: boolean): string => {
  const paddedCode = code.toString().padStart(6, "0")
  return isHidden
    ? "●●● ●●●"
    : `${paddedCode.slice(0, 3)} ${paddedCode.slice(3)}`
}
