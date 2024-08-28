"use client"

import { NextPage } from "next"
import { useConnect } from "wagmi"
import { ThemeToggle } from "@/components/ui/theme"
import Header from "@/components/custom/header"
import Search from "@/components/custom/search"

const Home: NextPage = () => {
  const { connectors, connect } = useConnect()

  return (
    <div className="max-w-lg mx-auto">
      <Header />
      <Search />
    </div>
  )

  // return connectors.map((connector) => (
  //   <button key={connector.uid} onClick={() => connect({ connector })}>
  //     {connector.name}
  //   </button>
  // ))
}

export default Home
