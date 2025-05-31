"use client";

import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@heroui/react";
import { ThemeSwitch } from "../../ThemeSwitch";
import React from "react";
import { useSession } from "next-auth/react";
import { LoggedInNavbar } from "../components/LoggedInNavbar";

export const NavbarMinimalLoggedIn = () => {
  const { data: session } = useSession();
  return (
    <NextUINavbar
      maxWidth="2xl"
      isBordered
    >
      {/* Logo */}
      <NavbarContent
        as="div"
        justify="center"
      >
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center"
            color="foreground"
            // isDisabled
          >
            <h1 className="font-bold text-inherit text-4xl select-none">
              GIFty
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        as="div"
        justify="center"
      >
        <NavbarItem className="hidden md:flex">
          <ThemeSwitch />
        </NavbarItem>

        {session && <LoggedInNavbar {...session} />}
      </NavbarContent>
    </NextUINavbar>
  );
};
