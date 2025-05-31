"use client";

import { NavbarMinimal } from "@/components/Navbar/minimal/NavbarMinimal";
import { Suspense } from "react";

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <NavbarMinimal />
      {children}
    </Suspense>
  );
}
