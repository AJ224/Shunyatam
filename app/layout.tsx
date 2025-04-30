import type React from "react"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import LoadingScreen from "@/components/loading-screen"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Shunyatam Design Labs",
  description: "Architecture studio with a philosophical approach to design",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
