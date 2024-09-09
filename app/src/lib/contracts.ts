import { sapphire, sapphireTestnet } from "wagmi/chains"

import { sapphireLocalnet } from "@oasisprotocol/sapphire-wagmi-v2"
import { Abi } from "viem"
import { ABI } from "./abi"

export const AUTHENTICATOR_CONTRACT: Record<
  number,
  { address: `0x${string}`; abi: Abi }
> = {
  [sapphire.id]: {
    address: "0x1068d3fa14f0AC485406a0E47F999B54687Ec223",
    abi: ABI,
  },
  [sapphireTestnet.id]: {
    address: "0x568682B2F3A09bAA7A3336B389Ac01C15175c9D7",
    abi: ABI,
  },
  [sapphireLocalnet.id]: {
    address: "0x0000000000000000000000000000000000000000",
    abi: ABI,
  },
}
