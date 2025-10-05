'use client'

import * as React from 'react'
import { AlertProps, HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'

import { XMarkIcon } from '@/components/Icons'
import SessionErrorHandler from '@/components/SessionErrorHandler'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

const queryClient = new QueryClient()

const AppContext = React.createContext<{
  alerts: {
    data: AlertProps[]
    set: React.Dispatch<React.SetStateAction<AlertProps[]>>
  }
}>({
  alerts: {
    data: [],
    set: () => {},
  },
})

export function Providers({ children, themeProps }: ProvidersProps) {
  const [alerts, setAlerts] = React.useState<AlertProps[]>([])

  return (
    <QueryClientProvider client={queryClient}>
      <SpeedInsights /> {/** Collection performance metrics */}
      <SessionProvider
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={false}
      >
        <SessionErrorHandler />
        <HeroUIProvider>
          <ToastProvider
            toastProps={{
              classNames: {
                closeButton: 'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
              },
              closeIcon: <XMarkIcon size="2x" />,
            }}
          />
          <NextThemesProvider {...themeProps}>
            <AppContext.Provider
              value={{
                alerts: {
                  data: alerts,
                  set: setAlerts,
                },
              }}
            >
              {children}
            </AppContext.Provider>
          </NextThemesProvider>
        </HeroUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export const useAppContext = () => React.useContext(AppContext)
