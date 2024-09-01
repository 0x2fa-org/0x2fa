import { useState, useRef, useCallback, useEffect } from "react"

const THRESHOLD = 15
const OPEN_POSITION = 25

export const useSwipe = () => {
  const [swipePosition, setSwipePosition] = useState(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const swipeStartPositionRef = useRef(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const isVerticalScrollRef = useRef(false)

  const handleStart = useCallback(
    (x: number, y: number) => {
      touchStartXRef.current = x
      touchStartYRef.current = y
      swipeStartPositionRef.current = swipePosition
      isVerticalScrollRef.current = false
    },
    [swipePosition]
  )

  const handleMove = useCallback((x: number, y: number) => {
    if (
      touchStartXRef.current === null ||
      touchStartYRef.current === null ||
      !elementRef.current
    )
      return

    const diffX = touchStartXRef.current - x
    const diffY = touchStartYRef.current - y

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

  const handleEnd = useCallback(() => {
    setSwipePosition((prevPosition) =>
      prevPosition > THRESHOLD ? OPEN_POSITION : 0
    )
    touchStartXRef.current = null
    touchStartYRef.current = null
    isVerticalScrollRef.current = false
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY)
    },
    [handleStart]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY)
    },
    [handleMove]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleStart(e.clientX, e.clientY)
      document.addEventListener("mousemove", handleDocumentMouseMove)
      document.addEventListener("mouseup", handleDocumentMouseUp)
    },
    [handleStart]
  )

  const handleDocumentMouseMove = useCallback(
    (e: MouseEvent) => {
      if (touchStartXRef.current !== null && touchStartYRef.current !== null) {
        handleMove(e.clientX, e.clientY)
      }
    },
    [handleMove]
  )

  const handleDocumentMouseUp = useCallback(() => {
    handleEnd()
    document.removeEventListener("mousemove", handleDocumentMouseMove)
    document.removeEventListener("mouseup", handleDocumentMouseUp)
  }, [handleEnd])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDocumentMouseMove(e.nativeEvent)
    },
    [handleDocumentMouseMove]
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      handleDocumentMouseUp()
    },
    [handleDocumentMouseUp]
  )

  const resetSwipe = useCallback(() => {
    setSwipePosition(0)
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove)
      document.removeEventListener("mouseup", handleDocumentMouseUp)
    }
  }, [handleDocumentMouseMove, handleDocumentMouseUp])

  return {
    swipePosition,
    elementRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: handleEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetSwipe,
  }
}
