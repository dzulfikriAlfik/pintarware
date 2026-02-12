import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-teal-600 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-500 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        accent:
          "bg-amber-600 text-white shadow-lg shadow-amber-600/25 hover:bg-amber-500 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-teal-600 text-teal-600 bg-transparent hover:bg-teal-50 hover:border-teal-500",
        ghost:
          "text-stone-700 hover:bg-stone-100 hover:text-teal-600",
        secondary:
          "bg-stone-100 text-stone-800 hover:bg-stone-200",
        dark:
          "bg-stone-800 text-white hover:bg-stone-900 shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
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
