"use client";

import {
  Input,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { SearchIcon } from "../Icons";
import { ModalSignIn } from "../Modals/ModalSignIn";
import { ModalSignUp } from "../Modals/ModalSignUp";
import { ThemeSwitch } from "../ThemeSwitch";
import { LoggedInNavbar } from "./components/LoggedInNavbar";
import { LoggedOutNavbar } from "./components/LoggedOutNavbar";
import { TrendingSearches } from "./components/TrendingSearches";

const NavbarComponent = () => {
  const signInModalControl = useDisclosure();
  const signUpModalControl = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
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
              onClick={() => setInputValue("")}
            >
              <h1 className="font-bold text-inherit text-xl select-none">
                GIFty
              </h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Search input */}
        <NavbarContent
          as="div"
          className="max-w-lg"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type to search..."
            type="search"
            startContent={<SearchIcon size="lg" />}
            classNames={{
              input: "text-lg",
            }}
          />
        </NavbarContent>

        <NavbarContent
          as="div"
          justify="center"
        >
          <ThemeSwitch />
        </NavbarContent>
        {/* Navbar menu */}
        {/* <NavbarContent
          as="div"
          justify="center"
        >
          <NavbarItem className="hidden md:flex">
            <ThemeSwitch />
          </NavbarItem>

          {session && session.user ? (
            <LoggedInNavbar {...session} />
          ) : (
            <LoggedOutNavbar
              signInModalControl={signInModalControl}
              signUpModalControl={signUpModalControl}
              isMenuOpen={isMenuOpen}
            />
          )}
        </NavbarContent> */}
      </NextUINavbar>

      {/* Trending Searches */}
      <TrendingSearches />

      {/* Modals Sign In/Up */}
      <ModalSignIn {...signInModalControl} />
      <ModalSignUp {...signUpModalControl} />
    </>
  );
};
NavbarComponent.displayName = "Navbar";
export const Navbar = memo(NavbarComponent);
