import { useState, useEffect } from "react"
import { Hex } from "viem"

interface SignIn {
  user: Hex
  time: number
}

export function useCheckSignIn(address: Hex | undefined) {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const checkSignIn = () => {
      if (!address) return

      const storedSignIn = localStorage.getItem(`lastSignIn_${address}`)
      if (!storedSignIn) return setIsSignedIn(false)

      try {
        const { user, time }: SignIn = JSON.parse(storedSignIn)
        const isValid = user === address && Date.now() / 1000 - time < 86400
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

  return isSignedIn
}
