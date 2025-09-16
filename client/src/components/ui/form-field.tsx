"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RequiredIndicator } from "@/components/ui/required-indicator"

interface FormFieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  error?: string
  description?: string
  children: React.ReactNode
}

function FormFieldWrapper({
  className,
  label,
  required,
  error,
  description,
  children,
  ...props
}: FormFieldWrapperProps) {
  const id = React.useId()

  return (
    <div data-slot="form-field-wrapper" className={cn("grid gap-2", className)} {...props}>
      {label && (
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          <RequiredIndicator required={required} />
        </Label>
      )}

      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id,
          "aria-invalid": !!error,
          "aria-describedby": description || error ? `${id}-description` : undefined,
        })}
      </div>

      {(description || error) && (
        <div id={`${id}-description`} className="text-sm">
          {error ? (
            <p className="text-destructive">{error}</p>
          ) : description ? (
            <p className="text-muted-foreground">{description}</p>
          ) : null}
        </div>
      )}
    </div>
  )
}

export { FormFieldWrapper }
