import * as React from "react"

function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm ${className}`}
      {...props}
    />
  )
}

function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`font-semibold text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  )
}

function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    />
  )
}

export { Card, CardTitle, CardContent }