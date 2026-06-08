import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream-paper disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-forest-ink text-cream-paper shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-subtle-2)]",
        outline:
          "border border-forest-ink text-forest-ink bg-transparent hover:bg-forest-ink/5",
        pastel:
          "bg-sticky-note-mint text-forest-ink hover:bg-sticky-note-teal",
        pastelBlush:
          "bg-sticky-note-blush text-forest-ink hover:opacity-90",
        pastelTeal:
          "bg-sticky-note-teal text-forest-ink hover:opacity-90",
        ghost:
          "text-forest-ink hover:bg-whisper-gray",
        secondary:
          "bg-whisper-gray text-forest-ink hover:bg-pencil-gray/30",
      },
      size: {
        default: "h-11 px-5 py-2 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-auto px-10 py-[19px] text-base",
        compact: "h-9 px-4 py-2 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
