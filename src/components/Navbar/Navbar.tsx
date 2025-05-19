"use client";

import {
  Input,
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { SearchIcon } from "../Icons";
import { AcmeLogoIcon } from "../Icons/AcmeLogoIcon";
import { ThemeSwitch } from "../ThemeSwitch";
import { LoggedInNavbar } from "./navbarContent/LoggedInNavbar";
import { LoggedOutNavbar } from "./navbarContent/LoggedOutNavbar";
import { TrendingSearches } from "./navbarContent/TrendingSearches";

const NavbarComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      router.push(`/search/${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <>
      <NextUINavbar
        maxWidth="2xl"
        isBordered
      >
        <NavbarContent as="div">
          <NavbarBrand>
            <Link
              href="/"
              className="flex items-center "
              onClick={() => setInputValue("")}
            >
              <AcmeLogoIcon size={50} />
              <p className="hidden sm:flex font-bold text-inherit text-xl">
                GIFty
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type to search..."
            type="search"
            classNames={{ input: "text-lg" }}
            startContent={<SearchIcon size="lg" />}
          />
        </NavbarContent>

        <NavbarContent
          as="div"
          justify="end"
        >
          <ThemeSwitch />

          {session && session.user ? (
            <LoggedInNavbar {...session} />
          ) : (
            <LoggedOutNavbar />
          )}
        </NavbarContent>
      </NextUINavbar>

      <TrendingSearches />
    </>
  );
};
NavbarComponent.displayName = "Navbar";
export const Navbar = memo(NavbarComponent);
