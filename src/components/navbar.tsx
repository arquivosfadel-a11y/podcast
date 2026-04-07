'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Search, Bell, User } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Início',        href: '#' },
  { label: 'Episódios',     href: '#ultimos-episodios' },
  { label: 'Mais Ouvidos',  href: '#mais-ouvidos' },
  { label: 'Shorts',        href: '#shorts' },
  { label: 'MulherPodi',    href: '#mulherpodi' },
  { label: 'Política',      href: '#politica' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/logotipo.png"
          alt="Podcafé"
          width={130}
          height={40}
          className="object-contain drop-shadow-lg"
          priority
        />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-sm text-white/65 hover:text-white transition-colors duration-200 cursor-pointer font-poppins font-medium"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/65 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/10"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative text-white/65 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/10"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#F97316] rounded-full" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] border border-white/15 flex items-center justify-center hover:border-[#F97316]/60 transition-colors cursor-pointer"
            aria-label="Perfil"
          >
            <User className="w-4 h-4 text-white/70" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
