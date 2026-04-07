'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EpisodeCard } from './episode-card'
import { Episode } from '@/lib/data'

interface EpisodeRowProps {
  title: string
  episodes: Episode[]
}

export function EpisodeRow({ title, episodes }: EpisodeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -700 : 700,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-6">
      {/* Row header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between max-w-7xl mx-auto px-6 mb-5"
      >
        <h2 className="font-righteous text-xl md:text-2xl text-white">{title}</h2>
        <a
          href="#"
          className="text-[#F97316] text-sm font-poppins hover:text-orange-300 transition-colors cursor-pointer flex items-center gap-1"
        >
          Ver todos
          <ChevronRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Scroll container with arrows */}
      <div className="relative group/row">
        {/* Left fade + arrow */}
        <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => scroll('left')}
          className="absolute left-3 top-1/2 -translate-y-6 z-20 w-9 h-9 bg-black/70 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:border-white/20"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </motion.button>

        {/* Right fade + arrow */}
        <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => scroll('right')}
          className="absolute right-3 top-1/2 -translate-y-6 z-20 w-9 h-9 bg-black/70 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:border-white/20"
          aria-label="Próximo"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </motion.button>

        {/* Cards track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2"
        >
          {episodes.map((episode, index) => (
            <EpisodeCard key={episode.id} episode={episode} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
