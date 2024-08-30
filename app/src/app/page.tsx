"use client"

import { NextPage } from "next"
import { useAccount } from "wagmi"
import Onboarding from "@/components/custom/common/onboarding"
import SignIn from "@/components/custom/common/sign-in"
import { useCheckSignIn } from "@/hooks/auth/use-check-signin"
import { useEffect, useState } from "react"
import Loading from "@/components/custom/common/loading"
import Authenticator from "@/components/custom/authenticator"

const Home: NextPage = () => {
  const { address } = useAccount()
  const { isSignedIn, auth } = useCheckSignIn(address)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return <Loading />
  if (!address) return <Onboarding />
  if (!isSignedIn || !auth) return <SignIn />

  return <Authenticator auth={auth} />
}

export default Home
