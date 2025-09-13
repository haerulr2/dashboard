import * as React from "react"

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "ghost"
}

function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export { Button }