"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import MoonIcon from "@/components/icons/moon-icon"
import SunIcon from "@/components/icons/sun-icon"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className="rounded-full h-11 w-11 cursor-pointer border-none"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <MoonIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <SunIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
