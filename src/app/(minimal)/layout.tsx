'use client'

import { Suspense } from 'react'

import { NavbarMinimal } from '@/components/Navbar/minimal/NavbarMinimal'

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <NavbarMinimal />
      {children}
    </Suspense>
  )
}
