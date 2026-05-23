import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

import ThemeRegistry from "@/theme/ThemeRegistry"

import "./globals.css"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "SiagaKu",
  description: "Disaster Education Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} min-h-screen flex flex-col bg-gray-50`}>

        <AppRouterCacheProvider>

          <ThemeRegistry>

            <main className="flex-1 flex flex-col">
              {children}
            </main>

          </ThemeRegistry>

        </AppRouterCacheProvider>

      </body>
    </html>
  )
}