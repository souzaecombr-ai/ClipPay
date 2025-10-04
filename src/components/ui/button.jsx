import * as React from "react"
import { cn } from "@/lib/utils"

export const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default"
          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
          : "bg-white/10 hover:bg-white/20 text-white",
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"
