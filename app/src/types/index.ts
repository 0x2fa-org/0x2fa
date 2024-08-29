import { UseQueryOptions } from "@tanstack/react-query"
import { Hex } from "viem"

declare global {
  type SignIn = {
    user: Hex
    time: number
    rsv: {
      r: Hex
      s: Hex
      v: number
    }
  }

  type AddParams = {
    auth: SignIn
    secret: Hex // bytes20
    label: string
    issuer: string
    timestep: number
  }

  type AuthenticatorCode = {
    code: bigint
    id: bigint
    issuer: string
    label: string
    timestep: bigint
  }

  type UseGenerateOptions = Omit<
    UseQueryOptions<
      unknown,
      Error,
      AuthenticatorCode[],
      readonly [string, SignIn | undefined]
    >,
    "queryKey" | "queryFn"
  > & {
    auth: SignIn | undefined
  }
}

export default global
