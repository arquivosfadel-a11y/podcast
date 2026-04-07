'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, Clock, X, ExternalLink, ChevronRight } from 'lucide-react'

function YtIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}
import Image from 'next/image'
import type { YouTubeVideo, ChannelInfo } from '@/lib/youtube'

// ── Modal ─────────────────────────────────────────────────────

function VideoModal({ video, onClose }: { video: YouTubeVideo; onClose: () => void }) {
  const embedSrc = video.isShort
    ? `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#111118] rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${
            video.isShort ? 'w-full max-w-sm' : 'w-full max-w-4xl'
          }`}
        >
          <div className={`relative w-full bg-black ${video.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
            <iframe
              src={embedSrc}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-righteous text-base text-white leading-snug mb-1.5 line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-white/40 text-xs font-poppins">
                    <Eye className="w-3 h-3" /> {video.viewCount}
                  </span>
                  <span className="flex items-center gap-1 text-white/40 text-xs font-poppins">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-poppins font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  YouTube
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/8 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Card horizontal (lives / episódios) ───────────────────────

function VideoCard({ video, index, onClick }: { video: YouTubeVideo; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="relative flex-shrink-0 w-64 cursor-pointer group"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/8 bg-[#1a1a2e]">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="256px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </div>
        </div>
        {video.isLive && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-poppins font-semibold rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AO VIVO
          </div>
        )}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/75 text-white text-[10px] font-poppins rounded">
          {video.duration}
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="text-white text-xs font-semibold font-poppins leading-snug line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Eye className="w-3 h-3 text-white/30" />
          <span className="text-white/30 text-[11px] font-poppins">{video.viewCount} views</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Card vertical (Shorts) ────────────────────────────────────

function ShortCard({ video, index, onClick }: { video: YouTubeVideo; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
      className="relative flex-shrink-0 w-36 cursor-pointer group"
    >
      <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden border border-white/8 bg-[#1a1a2e]">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="144px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </div>
        {/* Shorts icon */}
        <div className="absolute top-2 left-2">
          <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
            <YtIcon className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-1">
            <Eye className="w-2.5 h-2.5 text-white/50" />
            <span className="text-white/50 text-[10px] font-poppins">{video.viewCount}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="text-white text-[11px] font-semibold font-poppins leading-snug line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
          {video.title}
        </h3>
      </div>
    </motion.div>
  )
}

// ── Section wrapper ───────────────────────────────────────────

interface SectionProps {
  title: string
  videos: YouTubeVideo[]
  channel?: ChannelInfo | null
  isShorts?: boolean
  channelUrl?: string
}

export function YouTubeSection({ title, videos, channel, isShorts, channelUrl }: SectionProps) {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null)
  if (!videos.length) return null

  return (
    <>
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between max-w-7xl mx-auto px-6 mb-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <YtIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="font-righteous text-xl md:text-2xl text-white">{title}</h2>
              {channel && (
                <p className="text-white/35 text-xs font-poppins mt-0.5">
                  {channel.subscriberCount} inscritos · {channel.videoCount} vídeos
                </p>
              )}
            </div>
          </div>
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#F97316] text-sm font-poppins hover:text-orange-300 transition-colors cursor-pointer"
            >
              Ver todos <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2">
          {videos.map((video, index) =>
            isShorts ? (
              <ShortCard key={video.id} video={video} index={index} onClick={() => setActiveVideo(video)} />
            ) : (
              <VideoCard key={video.id} video={video} index={index} onClick={() => setActiveVideo(video)} />
            )
          )}
        </div>
      </section>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </>
  )
}
