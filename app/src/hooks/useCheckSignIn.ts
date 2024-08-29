import { useState, useEffect } from "react"
import { Hex } from "viem"

export function useCheckSignIn(address: Hex | undefined) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [auth, setAuth] = useState<SignIn>()

  useEffect(() => {
    const checkSignIn = () => {
      if (!address) return

      const storedSignIn = localStorage.getItem(`lastSignIn_${address}`)
      if (!storedSignIn) return setIsSignedIn(false)

      try {
        const storedAuth: SignIn = JSON.parse(storedSignIn)
        const isValid =
          storedAuth.user === address &&
          Date.now() / 1000 - storedAuth.time < 86400
        setAuth(storedAuth)
        setIsSignedIn(isValid)
      } catch (error) {
        console.error("Error parsing stored sign-in data:", error)
        setIsSignedIn(false)
      }
    }

    checkSignIn()
    const intervalId = setInterval(checkSignIn, 1000)
    return () => clearInterval(intervalId)
  }, [address])

  return { isSignedIn, auth }
}
