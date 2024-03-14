'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserNav } from './userNav'
import DropDownBtn from './dropDownBtn';



import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}) {

  const [openNav, setNav] = useState(false);

  let maxWidth = window.screen.width * 1 / 2;
  const [width, setWidth] = useState(window.innerWidth);
  const [smallWindow, setSmallWindow] = useState(width < maxWidth);

  function handleResize() {
    setWidth(window.innerWidth);
    setSmallWindow(width < maxWidth);
    if (!smallWindow) {
      setNav(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <div>

      {!smallWindow ? (
        <div
          className="flex items-center justify-center px-4 nav-height"
        >
          <nav

            className={cn("flex items-center space-x-4 lg:space-x-6 h-16", className)}
            {...props}

          >
            <h1 className="text-lg font-semibold tracking-wide text-primary mr-12">
              NHS <span className="text-yellow-500">TutorMe</span>
            </h1>
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
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      ) : (
        <div
          class="flex items-center justify-center m-4"
        >
          <div>
            <DropDownBtn />
          </div>
          <div
            style={{ margin: "auto" }}
          >
            <h1
              className="items-center text-lg font-semibold tracking-wide text-primary"
            >
              NHS <span className="text-yellow-500">TutorMe</span>
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      )}

    </div>

  )
}