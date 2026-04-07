'use client'

import { motion } from 'framer-motion'
import { Play, Plus, Heart, Clock, Mic2 } from 'lucide-react'
import { Episode } from '@/lib/data'

export function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      className="relative flex-shrink-0 w-48 cursor-pointer group"
    >
      {/* ── Thumbnail ── */}
      <div
        className={`relative w-full aspect-[3/4] rounded-xl bg-gradient-to-br ${episode.gradient} overflow-hidden border border-white/8`}
      >
        {/* Subtle inner light */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />

        {/* Center decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-20 h-20 rounded-full border-2 border-white/40" />
          <div className="absolute w-12 h-12 rounded-full border border-white/30" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#F97316] rounded-full flex items-center justify-center shadow-xl shadow-orange-500/40 cursor-pointer"
            aria-label={`Reproduzir ${episode.title}`}
          >
            <Play className="w-6 h-6 fill-white text-white ml-0.5" />
          </motion.button>
          <div className="flex items-center gap-2">
            <button
              className="p-2 bg-white/15 hover:bg-white/25 rounded-full transition-colors cursor-pointer"
              aria-label="Adicionar à lista"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              className="p-2 bg-white/15 hover:bg-white/25 rounded-full transition-colors cursor-pointer"
              aria-label="Curtir episódio"
            >
              <Heart className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Episode badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/60 text-[10px] rounded font-poppins">
            {episode.episode}
          </span>
        </div>

        {/* Category tag bottom right */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="px-2 py-0.5 bg-[#F97316]/20 text-[#F97316] text-[10px] rounded font-poppins border border-[#F97316]/20">
            {episode.category}
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="mt-3 px-0.5">
        <h3 className="text-white text-xs font-semibold font-poppins leading-snug line-clamp-2 group-hover:text-[#F97316] transition-colors duration-200">
          {episode.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Mic2 className="w-3 h-3 text-white/35 flex-shrink-0" />
          <span className="text-white/35 text-[11px] font-poppins truncate">{episode.host}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3 text-white/25 flex-shrink-0" />
          <span className="text-white/25 text-[11px] font-poppins">{episode.duration}</span>
        </div>
      </div>
    </motion.div>
  )
}
