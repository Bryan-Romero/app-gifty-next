'use client'

import { Navbar } from '@/components/Navbar/NavbarComponent'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
