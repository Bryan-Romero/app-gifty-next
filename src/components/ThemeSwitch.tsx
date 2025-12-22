'use client'

import { twMerge } from 'tailwind-merge'

import { useCustomTheme } from '@/hooks'
import { MoonFilledIcon, SunFilledIcon } from './Icons/ThemeIcons'

interface Props {
  className?: string
}

export const ThemeSwitch = ({ className }: Props) => {
  const { isDark, toggleTheme, mounted } = useCustomTheme()

  if (!mounted) return null

  return (
    <button
      aria-label={`switch to mode ${isDark ? 'light' : 'dark'}`}
      className={twMerge('cursor-pointer bg-transparent', className)}
      onClick={toggleTheme}
    >
      {isDark ? <SunFilledIcon size="lg" /> : <MoonFilledIcon size="lg" />}
    </button>
  )
}
