"use client";

import { AlertProps, HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import SessionErrorHandler from "../components/SessionErrorHandler";
import { SpeedInsights } from "@vercel/speed-insights/next";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

const appContext = React.createContext<{
  alerts: AlertProps[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertProps[]>>;
}>({
  alerts: [],
  setAlerts: () => {},
});

export default function Providers({ children, themeProps }: ProvidersProps) {
  const [alerts, setAlerts] = React.useState<AlertProps[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        <SessionErrorHandler />
        <HeroUIProvider>
          <NextThemesProvider {...themeProps}>
            <appContext.Provider value={{ alerts, setAlerts }}>
              {children}
            </appContext.Provider>
          </NextThemesProvider>
        </HeroUIProvider>
      </SessionProvider>
      <SpeedInsights /> {/** Collection performance metrics */}
    </QueryClientProvider>
  );
}

export const useAppContext = () => React.useContext(appContext);
