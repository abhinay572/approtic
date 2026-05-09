"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent/90 active:scale-[0.98] shadow-lg shadow-accent/20",
        secondary:
          "bg-surface-2 text-text hover:bg-border active:scale-[0.98] border border-border",
        ghost: "text-muted hover:text-text hover:bg-surface-2 active:scale-[0.98]",
        outline:
          "border border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98]",
        gradient:
          "bg-gradient-to-r from-accent to-accent-2 text-white hover:opacity-90 active:scale-[0.98] shadow-lg shadow-accent/25",
      },
      size: {
        sm: "text-sm px-4 py-2 h-9",
        md: "text-sm px-5 py-2.5 h-10",
        lg: "text-base px-6 py-3 h-12",
        xl: "text-lg px-8 py-4 h-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
