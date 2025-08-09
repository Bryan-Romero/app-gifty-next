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
    <Dropdown backdrop="opaque" placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent">
          <BarsIcon size="2x" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {mounted && (
          <DropdownItem
            key="theme"
            endContent={isDark ? <SunFilledIcon size="lg" /> : <MoonFilledIcon size="lg" />}
            textValue="Theme"
            onClick={toggleTheme}
          >
            Theme
          </DropdownItem>
        )}

        <DropdownItem
          key="sign_in"
          color="primary"
          textValue="Sign In"
          variant="light"
          onClick={signInModalControl.onOpen}
        >
          Sign In
        </DropdownItem>

        <DropdownItem
          key="sign_up"
          color="primary"
          textValue="Sign Up"
          variant="flat"
          onClick={signUpModalControl.onOpen}
        >
          Sign Up
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
