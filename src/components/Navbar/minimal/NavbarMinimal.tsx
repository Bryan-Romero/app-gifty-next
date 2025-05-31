"use client";

import {
  Link,
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar,
} from "@heroui/react";
import { ThemeSwitch } from "../../ThemeSwitch";

export const NavbarMinimal = () => {
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
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
