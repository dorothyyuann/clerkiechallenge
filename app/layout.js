import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Clerkie Challenge</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
