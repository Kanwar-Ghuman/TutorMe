import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
  }) {
    return (
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/examples/dashboard"
          className="text-sm transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Create Tutor Reqest
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          View Past Requests
        </Link>
      </nav>
    )
  }