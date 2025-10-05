'use client'

import { FormEvent, memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Input,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
  useDisclosure,
} from '@heroui/react'
import { useSession } from 'next-auth/react'

import { SearchIcon } from '../Icons'
import { ModalSignin } from '../Modals/ModalSignin'
import { ModalSignup } from '../Modals/ModalSignup'
import { ThemeSwitch } from '../ThemeSwitch'
import { LoggedInNavbar } from './components/LoggedInNavbar'
import { LoggedOutNavbar } from './components/LoggedOutNavbar'
import { TrendingSearches } from './components/TrendingSearches'

const NavbarComponent = () => {
  const signInModalControl = useDisclosure()
  const signUpModalControl = useDisclosure()
  const [inputValue, setInputValue] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleOnSubmit = (e: FormEvent<HTMLUListElement>) => {
    e.preventDefault()
    if (inputValue) router.push(`/search/${encodeURIComponent(inputValue.trim())}`)
  }

  return (
    <>
      <NextUINavbar isBordered maxWidth="2xl">
        {/* Logo */}
        <NavbarContent as="div" justify="center">
          <NavbarBrand>
            <Link className="flex items-center" color="foreground" href="/" onClick={() => setInputValue('')}>
              <h1 className="text-4xl font-bold text-inherit select-none">GIFty</h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Search input */}
        <NavbarContent as="form" className="max-w-lg" onSubmit={handleOnSubmit}>
          <Input
            classNames={{
              input: 'text-lg',
            }}
            enterKeyHint="search"
            placeholder="Type to search..."
            startContent={<SearchIcon size="lg" />}
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </NavbarContent>

        <NavbarContent as="div" justify="center">
          <NavbarItem className="hidden md:flex">
            <ThemeSwitch />
          </NavbarItem>

          {status === 'authenticated' ? (
            <LoggedInNavbar {...session} />
          ) : (
            <LoggedOutNavbar signInModalControl={signInModalControl} signUpModalControl={signUpModalControl} />
          )}
        </NavbarContent>
      </NextUINavbar>

      {/* Trending Searches */}
      <TrendingSearches />

      {/* Modals Sign In/Up */}
      <ModalSignin {...signInModalControl} />
      <ModalSignup {...signUpModalControl} />
    </>
  )
}
NavbarComponent.displayName = 'Navbar'
export const Navbar = memo(NavbarComponent)
