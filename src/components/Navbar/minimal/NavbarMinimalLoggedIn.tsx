'use client'

import { Link, NavbarBrand, NavbarContent, NavbarItem, Navbar as NextUINavbar } from '@heroui/react'
import { useSession } from 'next-auth/react'

import { ThemeSwitch } from '../../ThemeSwitch'
import { LoggedInNavbar } from '../components/LoggedInNavbar'

export const NavbarMinimalLoggedIn = () => {
  const { data: session } = useSession()
  return (
    <NextUINavbar isBordered maxWidth="2xl">
      {/* Logo */}
      <NavbarContent as="div" justify="center">
        <NavbarBrand>
          <Link className="flex items-center" color="foreground" href="/">
            <h1 className="text-4xl font-bold text-inherit select-none">GIFty</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="center">
        <NavbarItem className="hidden md:flex">
          <ThemeSwitch />
        </NavbarItem>

        {session && <LoggedInNavbar {...session} />}
      </NavbarContent>
    </NextUINavbar>
  )
}
