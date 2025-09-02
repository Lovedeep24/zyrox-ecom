"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MinimalToggle = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-block h-[1.2em] w-[2.5em] text-[18px]">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "group h-0 w-0",
            "[&:checked+span:before]:translate-x-[1.3em]",
            "[&:checked+span:before]:bg-green-500/70",
            "dark:[&:checked+span:before]:bg-green-500",
            "[&:checked+span]:bg-green-300",
            "dark:[&:checked+span]:bg-green-900",
            className
          )}
          {...props}
        />
        <span
          className={cn(
            "absolute inset-0 cursor-pointer rounded-[30px] bg-gray-300 transition ease-in-out",
            "before:absolute before:bottom-[0.15em] before:left-[0.15em] before:h-[0.9em] before:w-[0.9em]",
            "before:rounded-full before:bg-white before:transition before:duration-300 before:content-['']",
            "dark:bg-gray-700 dark:before:bg-white"
          )}
        />
      </label>
    )
  }
)
MinimalToggle.displayName = "MinimalToggle"

const OrangeToggle = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "ease before:ease relative h-3 w-6 appearance-none rounded-full bg-stone-300",
          "transition duration-300",
          "before:absolute before:left-[calc(1.1em_-_1.2em)] before:top-[calc(1.1em_-_1.2em)]",
          "before:block before:h-[1.2em] before:w-[1.2em] before:cursor-pointer",
          "before:rounded-full before:border before:border-solid before:border-stone-400",
          "before:bg-white before:transition-all before:duration-300 before:content-['']",
          "checked:bg-orange-600 checked:before:translate-x-full checked:before:border-orange-500",
          "hover:before:shadow-[0_0_0px_6px_rgba(0,0,0,0.15)]",
          "checked:hover:before:shadow-[0_0_0px_6px_rgba(236,72,72,0.15)]",
          className
        )}
        {...props}
      />
    )
  }
)
OrangeToggle.displayName = "OrangeToggle"

export { MinimalToggle, OrangeToggle }
