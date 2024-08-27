import { createConfig } from "wagmi"
import { sapphire, sapphireTestnet } from "wagmi/chains"
import { env } from "@/env.mjs"
import {
  injectedWithSapphire,
  sapphireHttpTransport,
  sapphireLocalnet,
} from "@oasisprotocol/sapphire-wagmi-v2"
import { getDefaultConfig } from "connectkit"

export const config = createConfig(
  getDefaultConfig({
    appName: "0x2fa",
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    multiInjectedProviderDiscovery: false,
    chains: [sapphire, sapphireTestnet, sapphireLocalnet],
    connectors: [injectedWithSapphire()],
    transports: {
      [sapphire.id]: sapphireHttpTransport(),
      [sapphireTestnet.id]: sapphireHttpTransport(),
      [sapphireLocalnet.id]: sapphireHttpTransport(),
    },
  })
)

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
