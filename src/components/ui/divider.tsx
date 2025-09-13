import * as React from "react"

function Divider({ className = "", ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      className={`border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    />
  )
}

export default Divider