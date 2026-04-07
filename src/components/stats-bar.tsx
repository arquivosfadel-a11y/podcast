'use client'

import { motion } from 'framer-motion'
import { Headphones, Mic, MapPin, PlayCircle } from 'lucide-react'

const stats = [
  { icon: Headphones,  value: '121',   label: 'Episódios' },
  { icon: PlayCircle,  value: '+469',  label: 'Vídeos Publicados' },
  { icon: Mic,         value: '2026',  label: '4ª Temporada' },
  { icon: MapPin,      value: '100%',  label: 'Regional' },
]

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto px-6 py-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-white/4 border border-white/8 backdrop-blur-sm hover:border-[#F97316]/25 hover:bg-white/6 transition-all duration-300 group cursor-default"
          >
            <stat.icon className="w-5 h-5 text-[#F97316] mb-3 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-righteous text-3xl text-white">{stat.value}</span>
            <span className="text-white/40 text-sm font-poppins mt-1 text-center">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
