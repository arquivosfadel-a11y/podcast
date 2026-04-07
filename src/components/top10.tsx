'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Eye, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import type { YouTubeVideo } from '@/lib/youtube'
import type { Episode } from '@/lib/data'

// ── Com dados do YouTube ──────────────────────────────────────

function YouTubeTop({ title, videos }: { title: string; videos: YouTubeVideo[] }) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section className="py-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 max-w-7xl mx-auto px-6 mb-5"
      >
        <TrendingUp className="w-5 h-5 text-[#F97316]" />
        <h2 className="font-righteous text-xl md:text-2xl text-white">{title}</h2>
      </motion.div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.07, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => setPlaying(video.id)}
            className="relative flex-shrink-0 w-64 cursor-pointer group"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/8 bg-[#1a1a2e]">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="256px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-11 h-11 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>

              {/* Rank number */}
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 font-righteous text-white/15 select-none leading-none"
                style={{ fontSize: '72px', lineHeight: 1 }}
              >
                {index + 1}
              </span>

              {/* Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-white text-xs font-semibold font-poppins line-clamp-1 group-hover:text-[#F97316] transition-colors duration-200">
                  {video.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Eye className="w-2.5 h-2.5 text-white/40" />
                  <span className="text-white/40 text-[10px] font-poppins">{video.viewCount} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inline player */}
      {playing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="max-w-7xl mx-auto px-6 mt-4"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${playing}?autoplay=1&rel=0`}
              title="Reproduzindo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <button
            onClick={() => setPlaying(null)}
            className="mt-3 text-white/40 text-sm font-poppins hover:text-white/70 transition-colors cursor-pointer"
          >
            Fechar player
          </button>
        </motion.div>
      )}
    </section>
  )
}

// ── Fallback com dados estáticos ──────────────────────────────

function StaticTop({ title, episodes }: { title: string; episodes: Episode[] }) {
  return (
    <section className="py-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 max-w-7xl mx-auto px-6 mb-5"
      >
        <TrendingUp className="w-5 h-5 text-[#F97316]" />
        <h2 className="font-righteous text-xl md:text-2xl text-white">{title}</h2>
      </motion.div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.07, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            className="relative flex-shrink-0 w-64 cursor-pointer group"
          >
            <div className={`relative w-full h-36 rounded-xl bg-gradient-to-br ${episode.gradient} overflow-hidden border border-white/8`}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-11 h-11 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 font-righteous text-white/15 select-none leading-none"
                style={{ fontSize: '72px', lineHeight: 1 }}
              >
                {index + 1}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-white text-xs font-semibold font-poppins line-clamp-1 group-hover:text-[#F97316] transition-colors duration-200">
                  {episode.title}
                </p>
                <p className="text-white/40 text-[10px] font-poppins mt-0.5">{episode.host} · {episode.duration}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Export ────────────────────────────────────────────────────

interface Top10Props {
  title?: string
  youtubeVideos?: YouTubeVideo[]
  staticEpisodes?: Episode[]
}

export function Top10({ title = 'Top 10 Hoje', youtubeVideos, staticEpisodes }: Top10Props) {
  if (youtubeVideos && youtubeVideos.length > 0) {
    return <YouTubeTop title={title} videos={youtubeVideos} />
  }
  if (staticEpisodes && staticEpisodes.length > 0) {
    return <StaticTop title={title} episodes={staticEpisodes} />
  }
  return null
}
