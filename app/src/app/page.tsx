"use client"

import { NextPage } from "next"
import { useAccount } from "wagmi"
import Header from "@/components/custom/header"
import Search from "@/components/custom/search"
import AuthCodes from "@/components/custom/auth-codes"
import Controls from "@/components/custom/controls"
import Onboarding from "@/components/custom/onboarding"
import SignIn from "@/components/custom/sign-in"
import { useCheckSignIn } from "@/hooks/useCheckSignIn"
import { useEffect, useState } from "react"
import Loading from "@/components/custom/loading"

const Home: NextPage = () => {
  const { address } = useAccount()
  const isSignedIn = useCheckSignIn(address)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return <Loading />
  if (!address) return <Onboarding />
  if (!isSignedIn) return <SignIn />

  return (
    <div className="max-w-lg mx-auto">
      <Header />
      <Search />
      <Controls />
      <AuthCodes />
    </div>
  )
}

export default Home
