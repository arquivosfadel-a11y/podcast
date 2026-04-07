'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Plus, Info, Headphones, Mic2 } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { featuredEpisode } from '@/lib/data'
import { TubesBackground } from './tubes-background'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <TubesBackground />
      {/* Overlay escuro para legibilidade do texto */}
      <div className="absolute inset-0 bg-[#0A0A0F]/45 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* ── Left: Text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-8"
          >
            <Image
              src="/logotipo.png"
              alt="Podcafé"
              width={260}
              height={80}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full font-poppins tracking-widest uppercase">
              ● Em Destaque
            </span>
            <span className="text-white/40 text-sm font-poppins">{featuredEpisode.episode}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="font-righteous text-5xl md:text-6xl lg:text-[60px] text-white leading-[1.1] mb-6"
          >
            {featuredEpisode.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-white/55 text-lg leading-relaxed mb-8 font-poppins font-light max-w-xl"
          >
            {featuredEpisode.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-[#F97316]" />
              <span className="text-white/60 text-sm font-poppins">{featuredEpisode.host}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-white/40" />
              <span className="text-white/60 text-sm font-poppins">{featuredEpisode.duration}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="px-2.5 py-0.5 bg-white/10 text-[#F97316] text-xs font-poppins font-medium rounded-full border border-[#F97316]/20">
              {featuredEpisode.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-[#F97316] hover:bg-[#ea6c0e] text-white font-semibold rounded-xl transition-colors duration-200 cursor-pointer font-poppins shadow-xl shadow-orange-500/30"
            >
              <Play className="w-5 h-5 fill-white" />
              Ouvir Agora
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer font-poppins"
            >
              <Plus className="w-5 h-5" />
              Minha Lista
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-3.5 bg-white/8 hover:bg-white/12 backdrop-blur-sm text-white/70 hover:text-white rounded-xl border border-white/10 transition-all duration-200 cursor-pointer font-poppins text-sm"
            >
              <Info className="w-4 h-4" />
              Detalhes
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right: Animated Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-orange-600/10 rounded-3xl blur-2xl" />

          <div className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${featuredEpisode.gradient} overflow-hidden border border-white/10`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            {/* Pulsing rings + play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.08, 0.35] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-52 h-52 rounded-full border border-white/20" />
              <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0.04, 0.25] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute w-72 h-72 rounded-full border border-orange-400/15" />
              <motion.div animate={{ scale: [1, 1.85, 1], opacity: [0.15, 0.02, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute w-88 h-88 rounded-full border border-purple-400/10" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-20 h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25 cursor-pointer shadow-2xl"
                aria-label="Reproduzir"
              >
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </motion.button>
            </div>

            {/* Animated waveform */}
            <div className="absolute bottom-20 left-0 right-0 flex items-end justify-center gap-0.5 px-6 opacity-25">
              {Array.from({ length: 36 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 1 + ((i * 37) % 20) / 10, 1] }}
                  transition={{ duration: 0.6 + ((i * 17) % 10) / 10, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
                  className="w-1 bg-white rounded-full origin-bottom"
                  style={{ height: `${8 + (i * 13) % 22}px` }}
                />
              ))}
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-xs font-poppins mb-0.5">{featuredEpisode.episode}</p>
                  <p className="text-white font-semibold font-poppins text-sm">{featuredEpisode.host}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[#F97316] text-xs font-poppins font-medium">{featuredEpisode.category}</span>
                  <span className="text-white/40 text-xs font-poppins">{featuredEpisode.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-white/25 text-[10px] font-poppins tracking-[0.2em] uppercase">Explorar</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent origin-top"
        />
      </motion.div>
    </div>
  )
}
