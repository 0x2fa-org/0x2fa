import { sapphire, sapphireTestnet } from "wagmi/chains"

import { sapphireLocalnet } from "@oasisprotocol/sapphire-wagmi-v2"
import { Abi } from "viem"
import { ABI } from "./abi"

export const AUTHENTICATOR_CONTRACT: Record<
  number,
  { address: `0x${string}`; abi: Abi }
> = {
  [sapphire.id]: {
    address: "0x0000000000000000000000000000000000000000",
    abi: ABI,
  },
  [sapphireTestnet.id]: {
    address: "0x98668B1aF5899D2f312E6E728027fe50545130D4",
    abi: ABI,
  },
  [sapphireLocalnet.id]: {
    address: "0x0000000000000000000000000000000000000000",
    abi: ABI,
  },
}
