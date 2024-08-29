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
