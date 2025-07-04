'use client'

import { useCustomTheme } from '@/hooks'
import { MoonFilledIcon, SunFilledIcon } from './Icons/ThemeIcons'

export const ThemeSwitch = () => {
  const { isDark, toggleTheme, mounted } = useCustomTheme()

  if (!mounted) return null

  return (
    <button
      aria-label={`switch to mode ${isDark ? 'light' : 'dark'}`}
      onClick={toggleTheme}
      className="cursor-pointer bg-transparent"
    >
      {isDark ? <SunFilledIcon size="lg" /> : <MoonFilledIcon size="lg" />}
    </button>
  )
}
