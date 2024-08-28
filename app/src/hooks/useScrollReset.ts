import { useEffect, useCallback, useRef } from "react"

const SCROLL_THRESHOLD = 69

export const useScrollReset = (resetFunction: () => void) => {
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
      resetFunction()
      lastScrollY.current = currentScrollY
    }
  }, [resetFunction])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])
}
