'use client'

import { Button } from '@heroui/react'

import { ModalControl } from '@/types'
import { LoggedOutMenuNavbar } from './LoggedOutMenuNavbar'

interface LoggedOutNavbarProps {
  signInModalControl: ModalControl
  signUpModalControl: ModalControl
}

export const LoggedOutNavbar = ({ signInModalControl, signUpModalControl }: LoggedOutNavbarProps) => {
  return (
    <>
      <Button className="hidden md:flex" color="primary" variant="light" onPress={() => signInModalControl.onOpen()}>
        Sign In
      </Button>

      <Button className="hidden md:flex" color="primary" variant="flat" onPress={() => signUpModalControl.onOpen()}>
        Sign Up
      </Button>

      {/* Mobile Navbar menu */}
      <LoggedOutMenuNavbar
        className="flex md:hidden"
        signInModalControl={signInModalControl}
        signUpModalControl={signUpModalControl}
      />
    </>
  )
}
