import { decode } from "js-base64"
import protobuf from "protobufjs"
import { fromByte20 } from "./utils"
import { base32Decode } from "@ctrl/ts-base32"

export const parseMigrationUri = (uri: string): ImportParse[] | undefined => {
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

export const generateMigrationUri = (data: AuthenticatorExport[]): string => {
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
          name: { type: "string", id: 2 },
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

  const payload = {
    otpParameters: data.map((item) => {
      const base32Secret = fromByte20(item.secret)
      const secretBytes = base32Decode(base32Secret)
      return {
        secret: Buffer.from(secretBytes),
        name: item.label,
        issuer: item.issuer,
        algorithm: 1, // ALGORITHM_SHA1
        digits: 1, // DIGITS_SIX
        type: 2, // OTP_TYPE_TOTP
      }
    }),
  }

  const message = MigrationPayload.create(payload)
  const buffer = MigrationPayload.encode(message).finish()

  const base64Data = Buffer.from(buffer).toString("base64")
  return `otpauth-migration://offline?data=${encodeURIComponent(base64Data)}`
}
