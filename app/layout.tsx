import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calenda — Create calendars people remember',
  description: 'Choose a design, add your image, and generate a beautiful 12-page calendar.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
