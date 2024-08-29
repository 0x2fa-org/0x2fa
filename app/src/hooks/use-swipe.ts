import { useState, useRef, useCallback } from "react"

const THRESHOLD = 15
const OPEN_POSITION = 25

export const useSwipe = () => {
  const [swipePosition, setSwipePosition] = useState(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const swipeStartPositionRef = useRef(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const isVerticalScrollRef = useRef(false)

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
      swipeStartPositionRef.current = swipePosition
      isVerticalScrollRef.current = false
    },
    [swipePosition]
  )

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (
      touchStartXRef.current === null ||
      touchStartYRef.current === null ||
      !elementRef.current
    )
      return

    const touchCurrentX = e.touches[0].clientX
    const touchCurrentY = e.touches[0].clientY
    const diffX = touchStartXRef.current - touchCurrentX
    const diffY = touchStartYRef.current - touchCurrentY

    // Check if the movement is more vertical than horizontal
    if (!isVerticalScrollRef.current && Math.abs(diffY) > Math.abs(diffX)) {
      isVerticalScrollRef.current = true
    }

    // Only apply horizontal swipe if it's not a vertical scroll
    if (!isVerticalScrollRef.current) {
      const elementWidth = elementRef.current.offsetWidth
      const swipeDelta = (diffX / elementWidth) * 100
      const newPosition = Math.max(
        0,
        Math.min(
          OPEN_POSITION * 1.4,
          swipeStartPositionRef.current + swipeDelta
        )
      )
      setSwipePosition(newPosition)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    setSwipePosition((prevPosition) =>
      prevPosition > THRESHOLD ? OPEN_POSITION : 0
    )
    touchStartXRef.current = null
    touchStartYRef.current = null
    isVerticalScrollRef.current = false
  }, [])

  const resetSwipe = useCallback(() => {
    setSwipePosition(0)
  }, [])

  return {
    swipePosition,
    elementRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetSwipe,
  }
}
