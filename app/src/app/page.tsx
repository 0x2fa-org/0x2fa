"use client"

import { NextPage } from "next"
import { useConnect } from "wagmi"

const Home: NextPage = () => {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export default Home
