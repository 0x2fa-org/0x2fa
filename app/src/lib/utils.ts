import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { base32Decode } from "@ctrl/ts-base32"
import { Hex } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toByte20(pk: string): Hex {
  const bytes = new Uint8Array(20)
  bytes.set(base32Decode(pk).slice(0, 20))

  return `0x${Buffer.from(bytes).toString("hex")}`
}
