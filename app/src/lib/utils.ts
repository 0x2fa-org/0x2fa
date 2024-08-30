import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { base32Decode } from "@ctrl/ts-base32"
import { Hex } from "viem"
import { decode } from "js-base64"
import protobuf from "protobufjs"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// TODO: not fully satisfied with this, re-test
export const toByte20 = (pk: string): Hex => {
  let bytes: Uint8Array

  try {
    bytes = Buffer.from(pk, "base64")
  } catch {
    bytes = base32Decode(pk)
  }

  const result = new Uint8Array(20)
  result.set(bytes.slice(0, 20))

  return `0x${Buffer.from(result).toString("hex")}` as Hex
}

export const formatCode = (code: bigint, isHidden: boolean): string => {
  const paddedCode = code.toString().padStart(6, "0")
  return isHidden
    ? "●●● ●●●"
    : `${paddedCode.slice(0, 3)} ${paddedCode.slice(3)}`
}

export const parseOtpMigrationUri = (
  uri: string
): ImportParse[] | undefined => {
  try {
    const url = new URL(uri)
    const data = url.searchParams.get("data")
    if (!data) return undefined

    const decoded = decode(data)
    const buffer = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; ++i) {
      buffer[i] = decoded.charCodeAt(i)
    }

    // Define the protobuf structure
    const root = protobuf.Root.fromJSON({
      nested: {
        MigrationPayload: {
          fields: {
            otpParameters: {
              rule: "repeated",
              type: "OtpParameters",
              id: 1,
            },
          },
        },
        OtpParameters: {
          fields: {
            secret: { type: "bytes", id: 1 },
            label: { type: "string", id: 2 },
            issuer: { type: "string", id: 3 },
            algorithm: { type: "Algorithm", id: 4 },
            digits: { type: "Digits", id: 5 },
            type: { type: "OtpType", id: 6 },
          },
        },
        Algorithm: {
          values: {
            ALGORITHM_UNSPECIFIED: 0,
            ALGORITHM_SHA1: 1,
            ALGORITHM_SHA256: 2,
            ALGORITHM_SHA512: 3,
          },
        },
        Digits: {
          values: { DIGITS_UNSPECIFIED: 0, DIGITS_SIX: 1, DIGITS_EIGHT: 2 },
        },
        OtpType: {
          values: {
            OTP_TYPE_UNSPECIFIED: 0,
            OTP_TYPE_HOTP: 1,
            OTP_TYPE_TOTP: 2,
          },
        },
      },
    })

    const MigrationPayload = root.lookupType("MigrationPayload")
    const decoded_data = MigrationPayload.decode(buffer)
    const object = MigrationPayload.toObject(decoded_data, {
      enums: String,
      longs: String,
      bytes: String,
      defaults: true,
    })

    return object.otpParameters
      .filter(
        (otp: any) =>
          otp.algorithm === "ALGORITHM_SHA1" &&
          otp.digits === "DIGITS_SIX" &&
          otp.type === "OTP_TYPE_TOTP"
      )
      .map((otp: any) => ({
        secret: otp.secret,
        label: otp.label,
        issuer: otp.issuer,
      }))
  } catch (error) {
    console.error("Error parsing OTP migration URI:", error)
    return undefined
  }
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
