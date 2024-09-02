import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { base32Decode } from "@ctrl/ts-base32"
import { Hex } from "viem"
import { base32Encode } from "@ctrl/ts-base32"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toByte20 = (pk: string): Hex => {
  const bytes = base32Decode(pk)

  const result = new Uint8Array(20)
  result.set(bytes.slice(0, 20))

  return `0x${Buffer.from(result).toString("hex")}` as Hex
}

export const fromByte20 = (hex: Hex): string => {
  const hexString = hex.startsWith("0x") ? hex.slice(2) : hex

  // Convert the hex string to a Uint8Array
  const bytes = new Uint8Array(
    hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  )

  // Encode the byte array to a base32 string and remove any padding characters
  return base32Encode(bytes).replace(/=/g, "")
}

export const toBase32 = (base64String: string): string => {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
  const raw = Buffer.from(base64String, "base64")
  let bits = 0
  let value = 0
  let output = ""

  for (let i = 0; i < raw.length; i++) {
    value = (value << 8) | raw[i]
    bits += 8
    while (bits >= 5) {
      output += base32Chars[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += base32Chars[(value << (5 - bits)) & 31]
  }

  return output
}

export const formatCode = (code: bigint, isHidden: boolean): string => {
  const paddedCode = code.toString().padStart(6, "0")
  return isHidden
    ? "●●● ●●●"
    : `${paddedCode.slice(0, 3)} ${paddedCode.slice(3)}`
}

export const copyToClipboard = (str: string) => {
  const clipboard = window.navigator.clipboard
  /*
   * fallback to older browsers (including Safari)
   * if clipboard API not supported
   */
  if (!clipboard || typeof clipboard.writeText !== `function`) {
    const textarea = document.createElement(`textarea`)
    textarea.value = str
    textarea.readOnly = true
    textarea.contentEditable = "true"
    textarea.style.position = `absolute`
    textarea.style.left = `-9999px`

    document.body.appendChild(textarea)
    textarea.select()

    const range = document.createRange()
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    textarea.setSelectionRange(0, textarea.value.length)

    document.execCommand(`copy`)
    document.body.removeChild(textarea)

    return Promise.resolve(true)
  }

  return clipboard.writeText(str)
}
