'use client'

import { Button, NavbarItem } from '@heroui/react'

import { ModalControl } from '@/types'
import { LoggedOutMenuNavbar } from './LoggedOutMenuNavbar'

interface LoggedOutNavbarProps {
  signInModalControl: ModalControl
  signUpModalControl: ModalControl
}

export const LoggedOutNavbar = ({ signInModalControl, signUpModalControl }: LoggedOutNavbarProps) => {
  return (
    <>
      <NavbarItem className="hidden md:flex">
        <Button color="primary" variant="light" onPress={() => signInModalControl.onOpen()}>
          Sign In
        </Button>
      </NavbarItem>

      <NavbarItem className="hidden md:flex">
        <Button color="primary" variant="flat" onPress={() => signUpModalControl.onOpen()}>
          Sign Up
        </Button>
      </NavbarItem>

      {/* Mobile Navbar menu */}
      <NavbarItem className="flex md:hidden">
        <LoggedOutMenuNavbar signInModalControl={signInModalControl} signUpModalControl={signUpModalControl} />
      </NavbarItem>
    </>
  )
}
