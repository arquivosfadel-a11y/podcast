import type { Metadata } from 'next'
import { Righteous, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const righteous = Righteous({
  subsets: ['latin'],
  variable: '--font-righteous',
  weight: ['400'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Podcafé — Ouça o que importa',
  description: 'O podcast que serve inspiração com açúcar. Um bate-papo descontraído com empresários e políticos da região.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${righteous.variable} ${poppins.variable}`}>
      <body className="antialiased font-poppins bg-[#0A0A0F] text-[#F8FAFC]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
