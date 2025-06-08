"use client";

import {
  Input,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, memo, useState } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleOnSubmit = (e: FormEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (inputValue)
      router.push(`/search/${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <>
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
              onClick={() => setInputValue("")}
              color="foreground"
            >
              <h1 className="font-bold text-inherit text-4xl select-none">
                GIFty
              </h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Search input */}
        <NavbarContent
          as="form"
          className="max-w-lg"
          onSubmit={handleOnSubmit}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to search..."
            type="search"
            enterKeyHint="search"
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
          <NavbarItem className="hidden md:flex">
            <ThemeSwitch />
          </NavbarItem>

          {status === "authenticated" ? (
            <LoggedInNavbar {...session} />
          ) : (
            <LoggedOutNavbar
              signInModalControl={signInModalControl}
              signUpModalControl={signUpModalControl}
            />
          )}
        </NavbarContent>
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
