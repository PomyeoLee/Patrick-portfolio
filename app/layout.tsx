import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { getPersonalInfo } from "@/lib/information"

const inter = Inter({ subsets: ["latin"] })

const info = getPersonalInfo()

export const metadata: Metadata = {
  title: `${info.name} | ${info.title}`,
  description: `Portfolio of ${info.name}, ${info.title} specializing in machine learning, deep learning, and data science`,
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
