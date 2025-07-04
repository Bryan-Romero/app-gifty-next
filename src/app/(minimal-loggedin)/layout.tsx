'use client'

import { NavbarMinimalLoggedIn } from '@/components/Navbar/minimal/NavbarMinimalLoggedIn'

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarMinimalLoggedIn />
      {children}
    </>
  )
}
