import * as React from "react"
import { cn } from "@/lib/utils"
import SearchIcon from "../icons/search-icon"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showSearchIcon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showSearchIcon = false, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {showSearchIcon && (
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002D2B] dark:text-white h-5 w-5" />
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            showSearchIcon && "pl-12",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
