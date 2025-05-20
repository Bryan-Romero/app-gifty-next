import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "../components/Navbar/NavbarComponent";
import Providers from "./providers";
import { Alerts } from "@/components/Alerts";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col flex-1">{children}</main>
            <Alerts />
          </div>
        </Providers>
      </body>
    </html>
  );
}
