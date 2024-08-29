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
    period: number
  }
}

export default global
