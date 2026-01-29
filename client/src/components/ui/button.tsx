import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-95",
  {
    variants: {
      variant: {
        default:
          "text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0" +
          " [background-color:hsl(var(--brand-primary))] hover:[background-color:hsl(var(--brand-primary)/0.9)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg active:translate-y-0",
        outline:
          "font-semibold shadow-sm hover:shadow-md hover:text-white hover:-translate-y-0.5 active:translate-y-0 border-2" +
          " [border-color:hsl(var(--brand-primary))] [color:hsl(var(--brand-primary))] hover:[background-color:hsl(var(--brand-primary))]",
        secondary: "font-semibold shadow-sm hover:shadow-md hover:text-white hover:-translate-y-0.5 active:translate-y-0 bg-white border-2" +
          " [color:hsl(var(--brand-primary))] [border-color:hsl(var(--brand-primary))]" +
          " hover:[background-color:hsl(var(--brand-primary))]",
        ghost: "hover:[background-color:hsl(var(--brand-muted))] hover:[color:hsl(var(--brand-text))]",
      },
      // Heights are set as "min" heights, because sometimes Ai will place large amount of content
      // inside buttons. With a min-height they will look appropriate with small amounts of content,
      // but will expand to fit large amounts of content.
      // Mobile-first approach: minimum 44px touch targets on mobile (iOS/Android guidelines)
      size: {
        default: "min-h-11 px-4 py-2 sm:min-h-10 sm:px-4",
        sm: "min-h-10 rounded-md px-3 text-xs sm:min-h-9",
        lg: "min-h-12 rounded-md px-6 sm:min-h-11 sm:px-8",
        icon: "h-11 w-11 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
