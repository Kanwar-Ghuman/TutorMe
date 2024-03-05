'use client';
import Link from "next/link";


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="">
                    <h1>&#9881;</h1>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <Link
                        href="/examples/dashboard"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                    Dashboard
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link
                    href="/examples/dashboard"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                    Create Tutor Reqest
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link
                    href="/examples/dashboard"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                    View Past Requests
                    </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default UserNav;