import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function useCustomTheme() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return { isDark, toggleTheme, mounted }
}
