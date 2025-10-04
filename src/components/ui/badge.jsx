import * as React from "react"
import { cn } from "@/lib/utils"

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300",
        className
      )}
      {...props}
    />
  )
}
