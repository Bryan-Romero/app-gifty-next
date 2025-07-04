import { fontMono, fontSans } from '@/config'
import { siteConfig } from '@/config/site'

import '@/styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'

import type { Metadata } from 'next'
import clsx from 'clsx'

import { Providers } from './_lib/context'

config.autoAddCss = false

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        href: '/favicon.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx('bg-background min-h-screen font-sans antialiased', fontSans.variable, fontMono.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
