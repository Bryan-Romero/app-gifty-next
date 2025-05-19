"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "./Icons/ThemeIcons";

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita el "hydration mismatch" en Next.js
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 ease-in-out"
    >
      {isDark ? <SunFilledIcon size="lg" /> : <MoonFilledIcon size="lg" />}
    </button>
  );
};
