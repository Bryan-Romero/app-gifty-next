'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'

import { BarsIcon, MoonFilledIcon, SunFilledIcon } from '@/components/Icons'
import { useCustomTheme } from '@/hooks'
import { ModalControl } from '@/types'

interface NavbarMenuComponentProps {
  signInModalControl: ModalControl
  signUpModalControl: ModalControl
}

export const LoggedOutMenuNavbar = ({ signInModalControl, signUpModalControl }: NavbarMenuComponentProps) => {
  const { isDark, mounted, toggleTheme } = useCustomTheme()

  return (
    <Dropdown placement="bottom-end" backdrop="opaque">
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent">
          <BarsIcon size="2x" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {mounted && (
          <DropdownItem
            key="theme"
            textValue="Theme"
            onClick={toggleTheme}
            endContent={isDark ? <SunFilledIcon size="lg" /> : <MoonFilledIcon size="lg" />}
          >
            Theme
          </DropdownItem>
        )}

        <DropdownItem
          key="sign_in"
          textValue="Sign In"
          onClick={signInModalControl.onOpen}
          variant="light"
          color="primary"
        >
          Sign In
        </DropdownItem>

        <DropdownItem
          key="sign_up"
          textValue="Sign Up"
          onClick={signUpModalControl.onOpen}
          variant="flat"
          color="primary"
        >
          Sign Up
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
