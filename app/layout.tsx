import { Poppins } from 'next/font/google';
import { Providers } from '@/providers'
import './globals.css'

const poppins = Poppins({ weight: ['200', '300', '400'], subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
