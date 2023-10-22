"use client"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@emotion/react'
import theme from '@/theme/appTheme'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
