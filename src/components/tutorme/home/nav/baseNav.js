"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { usePathname } from 'next/navigation'

export function BaseNav({menuItems, profileItems}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const routerUrl = usePathname();

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" 
        classNames={{
            item: [
              "flex",
              "relative",
              "h-full",
              "items-center",
              "data-[active=true]:after:content-['']",
              "data-[active=true]:after:absolute",
              "data-[active=true]:after:bottom-0",
              "data-[active=true]:after:left-0",
              "data-[active=true]:after:right-0",
              "data-[active=true]:after:h-[2px]",
              "data-[active=true]:after:rounded-[2px]",
              "data-[active=true]:after:bg-primary",
            ],
          }}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <h1 className="text-lg font-semibold text-primary mr-6 whitespace-nowrap">
                    <span className="text-black">NHS</span> TutorMe
                </h1>
                
                <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item.label}-${index}`} isActive={routerUrl === item.link}>
                        <Link 
                            href={item.link} aria-current={routerUrl === item.link ? "page" : undefined}
                            color={routerUrl === item.link ? "" : "foreground"}
                            >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
                </NavbarContent>
            </NavbarContent>

            <NavbarContent justify="end">
                {Array.isArray(profileItems) && profileItems.length > 0 ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src={profileItems[0]}
                        />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" items={profileItems[1]}>
                            {(item) => (
                            <DropdownItem
                                key={item.key}
                                color={item.color ? item.color : "default"}
                                className={item.className ? item.className : ""}
                                href={item.link ? item.link : undefined}
                            >
                                {item.label}
                            </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    {profileItems}
                )}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`} isActive={routerUrl === item.link}>
                        <Link
                            className="w-full"
                            href={item.link}
                            size="lg"
                            color={routerUrl === item.link ? "" : "foreground"}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
