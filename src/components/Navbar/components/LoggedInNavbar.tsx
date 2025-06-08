"use client";

import { MoonFilledIcon, SunFilledIcon } from "@/components/Icons";
import { useCustomTheme } from "@/hooks";
import { logout } from "@/services/apiRes/logout";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@heroui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const LoggedInNavbar = (session: Session) => {
  const { isDark, mounted, toggleTheme } = useCustomTheme();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
    await logout(session.tokens.access_token);
  };

  return (
    <NavbarItem>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="cursor-pointer transition-transform"
            color="secondary"
            name={session.user.username}
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
        >
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue={`Signed in as ${session.user.email}`}
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user.email}</p>
          </DropdownItem>

          {mounted && (
            <DropdownItem
              key="theme"
              className="flex md:hidden"
              endContent={
                isDark ? (
                  <SunFilledIcon size="lg" />
                ) : (
                  <MoonFilledIcon size="lg" />
                )
              }
              onClick={toggleTheme}
            >
              Theme
            </DropdownItem>
          )}

          {pathname !== "/" && (
            <DropdownItem
              as="a"
              href="/"
              key="home"
              color="default"
            >
              Home
            </DropdownItem>
          )}

          <DropdownItem
            as="a"
            href="/my/favorites"
            key="favorites"
            color="secondary"
          >
            My Favorites
          </DropdownItem>

          <DropdownItem
            as="a"
            href="/my/settings"
            key="settings"
            color="primary"
          >
            My Settings
          </DropdownItem>

          <DropdownItem
            key="logout"
            color="danger"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  );
};
