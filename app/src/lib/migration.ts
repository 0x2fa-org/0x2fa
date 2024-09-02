import { Buffer } from "buffer"
import protobuf from "protobufjs"
import { fromByte20, toBase32 } from "./utils"
import { base32Decode } from "@ctrl/ts-base32"

export const parseMigrationUri = async (
  uri: string
): Promise<ImportParse[] | undefined> => {
  try {
    const url = new URL(uri)
    const data = url.searchParams.get("data")

    if (!data) {
      throw new Error("Invalid URI: missing data parameter")
    }

    const buffer = Buffer.from(decodeURIComponent(data), "base64")

    // Load the protobuf schema
    const root = protobuf.Root.fromJSON(protobuf.parse(googleAuthProto).root)
    const MigrationPayload = root.lookupType("googleauth.MigrationPayload")

    // Decode the protobuf message
    const message = MigrationPayload.decode(buffer)
    const decodedPayload = MigrationPayload.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    })

    // Process and filter the decoded accounts
    return decodedPayload.otpParameters
      .filter(
        (account: any) =>
          account.algorithm === "SHA1" &&
          account.digits === "SIX" &&
          account.type === "TOTP"
      )
      .map((account: any) => ({
        secret: toBase32(account.secret),
        label: account.name,
        issuer: account.issuer,
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

// Define the protobuf message structure
const googleAuthProto = `
syntax = "proto3";
package googleauth;
message MigrationPayload {
  enum Algorithm {
    ALGORITHM_UNSPECIFIED = 0;
    SHA1 = 1;
    SHA256 = 2;
    SHA512 = 3;
    MD5 = 4;
  }
  enum DigitCount {
    DIGIT_COUNT_UNSPECIFIED = 0;
    SIX = 1;
    EIGHT = 2;
    SEVEN = 3;
  }
  enum OtpType {
    OTP_TYPE_UNSPECIFIED = 0;
    HOTP = 1;
    TOTP = 2;
  }
  message OtpParameters {
    bytes secret = 1;
    string name = 2;
    string issuer = 3;
    Algorithm algorithm = 4;
    DigitCount digits = 5;
    OtpType type = 6;
    int64 counter = 7;
    string unique_id = 8;
  }
  repeated OtpParameters otp_parameters = 1;
  int32 version = 2;
  int32 batch_size = 3;
  int32 batch_index = 4;
  int32 batch_id = 5;
}
`
