import { useState, useEffect, useCallback } from "react"
import { useAccount } from "wagmi"

const SIGN_IN_EXPIRY = 24 * 60 * 60 // 24 hours in seconds

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] {
  const { address } = useAccount()
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const checkIsSignedIn = useCallback(
    (value: T): boolean => {
      if (!address || !value) return false
      const lastSignIn = value as unknown as SignIn
      const currentTime = Math.floor(Date.now() / 1000)
      return (
        lastSignIn.user === address &&
        currentTime - lastSignIn.time < SIGN_IN_EXPIRY
      )
    },
    [address]
  )

  const [isSignedIn, setIsSignedIn] = useState<boolean>(() =>
    checkIsSignedIn(storedValue)
  )

  useEffect(() => {
    setIsSignedIn(checkIsSignedIn(storedValue))
  }, [storedValue, checkIsSignedIn])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      setIsSignedIn(checkIsSignedIn(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue
        setStoredValue(newValue)
        setIsSignedIn(checkIsSignedIn(newValue))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key, initialValue, checkIsSignedIn])

  return [storedValue, setValue, isSignedIn]
}
