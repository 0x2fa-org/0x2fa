import type { Metadata } from "next"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/sonner"
import Providers from "./providers"

const siteConfig = {
  name: "0x2fa",
  description:
    "0x2fa is a two-factor authentication (2FA) system built on Oasis Protocol.",
  url: "https://0x2fa.com",
  ogImage: "https://0x2fa.com/og.png",
}

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  applicationName: siteConfig.name,
  manifest: "/manifest.json",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="theme-color"
        content="#ffffff"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#001514"
        media="(prefers-color-scheme: dark)"
      />
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
      <Toaster />
    </html>
  )
}

export default RootLayout
