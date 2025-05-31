"use client";

import { NavbarMinimal } from "@/components/Navbar/minimal/NavbarMinimal";

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMinimal />
      {children}
    </>
  );
}
