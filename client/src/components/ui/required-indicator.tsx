
import type * as React from "react"
import { cn } from "@/lib/utils"

interface RequiredIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  required?: boolean
}

function RequiredIndicator({ className, required = true, ...props }: RequiredIndicatorProps) {
  if (!required) return null

  return (
    <span
      data-slot="required-indicator"
      className={cn("text-destructive text-sm font-medium", className)}
      aria-label="Required field"
      {...props}
    >
      *
    </span>
  )
}

export { RequiredIndicator }
