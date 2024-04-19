"use client";

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";

export function MainNav({
    className,
    ...props
  }) {

    const router = useRouter();

    return (
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/request/create"
          className={"text-sm transition-colors hover:text-primary" + router.pathname == "/request/create" ? "" : "text-muted-foreground"}
        >
          Create Tutor Request
        </Link>
        <Link
          href="/examples/dashboard"
          className={"text-sm transition-colors hover:text-primary" + router.pathname == "/request/create" ? "" : "text-muted-foreground"}
        >
          View Past Requests
        </Link>
      </nav>
    )
  }