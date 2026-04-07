'use client'

import { motion } from 'framer-motion'

// Deterministic pseudo-random positions (no hydration mismatch)
const particles = Array.from({ length: 55 }, (_, i) => {
  const types = ['particle-a', 'particle-b', 'particle-c'] as const
  const colors = [
    'bg-purple-400', 'bg-indigo-400', 'bg-violet-400',
    'bg-orange-400', 'bg-blue-400', 'bg-teal-400', 'bg-pink-400',
  ]
  return {
    id: i,
    left: `${(i * 137 + 43) % 97}%`,
    top:  `${(i * 97  + 17) % 92}%`,
    size: `${(i % 3) + 1}px`,
    duration: `${5 + (i % 7)}s`,
    delay:    `${((i * 41) % 60) / 10}s`,
    type:     types[i % 3],
    color:    colors[i % colors.length],
  }
})

const orbs = [
  {
    id: 0,
    tw: 'w-[900px] h-[900px] bg-purple-700/20',
    style: { top: '-20%', left: '-18%' },
    animate: { x: [0, 160, -90, 40, 0], y: [0, -110, 130, -50, 0], scale: [1, 1.12, 0.88, 1.05, 1] },
    duration: 24,
  },
  {
    id: 1,
    tw: 'w-[650px] h-[650px] bg-indigo-600/25',
    style: { top: '15%', right: '-12%' },
    animate: { x: [0, -130, 90, -40, 0], y: [0, 110, -80, 60, 0], scale: [1, 0.92, 1.08, 0.97, 1] },
    duration: 30,
  },
  {
    id: 2,
    tw: 'w-[550px] h-[550px] bg-violet-600/20',
    style: { top: '45%', left: '32%' },
    animate: { x: [0, 100, -70, 50, 0], y: [0, -90, 70, -30, 0], scale: [1, 1.18, 0.82, 1.1, 1] },
    duration: 20,
  },
  {
    id: 3,
    tw: 'w-[480px] h-[480px] bg-orange-500/15',
    style: { bottom: '10%', left: '15%' },
    animate: { x: [0, 80, -100, 30, 0], y: [0, -100, 60, -40, 0], scale: [1, 0.88, 1.12, 0.95, 1] },
    duration: 22,
  },
  {
    id: 4,
    tw: 'w-[520px] h-[520px] bg-blue-600/20',
    style: { bottom: '-8%', right: '22%' },
    animate: { x: [0, -90, 70, -20, 0], y: [0, -70, 50, -80, 0], scale: [1, 1.1, 0.9, 1.05, 1] },
    duration: 26,
  },
  {
    id: 5,
    tw: 'w-[320px] h-[320px] bg-pink-600/15',
    style: { top: '60%', left: '58%' },
    animate: { x: [0, 60, -80, 30, 0], y: [0, 80, -50, 40, 0], scale: [1, 1.22, 0.78, 1.15, 1] },
    duration: 17,
  },
  {
    id: 6,
    tw: 'w-[380px] h-[380px] bg-teal-600/15',
    style: { top: '8%', left: '42%' },
    animate: { x: [0, -70, 100, -30, 0], y: [0, 60, -90, 50, 0], scale: [1, 0.88, 1.18, 0.94, 1] },
    duration: 34,
  },
  {
    id: 7,
    tw: 'w-[290px] h-[290px] bg-green-600/10',
    style: { bottom: '28%', right: '4%' },
    animate: { x: [0, -50, 70, -20, 0], y: [0, -60, 40, -70, 0], scale: [1, 1.12, 0.92, 1.06, 1] },
    duration: 28,
  },
]

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

      {/* ── Base deep gradient ─────────────────────── */}
      <div className="absolute inset-0 bg-gradient-radial from-[#12082a] via-[#0a0a0f] to-[#070710]" />

      {/* ── Aurora bands ──────────────────────────── */}
      <div className="aurora-band-1 absolute w-[200%] h-40 -left-1/2 top-[20%] bg-gradient-to-r from-transparent via-purple-600/18 to-transparent blur-3xl" />
      <div className="aurora-band-2 absolute w-[200%] h-28 -left-1/2 top-[50%] bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent blur-3xl" />
      <div className="aurora-band-3 absolute w-[200%] h-24 -left-1/2 top-[70%] bg-gradient-to-r from-transparent via-violet-600/12 to-transparent blur-2xl" />

      {/* ── Orbs ──────────────────────────────────── */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          style={{ position: 'absolute', ...orb.style }}
          className={`rounded-full blur-3xl ${orb.tw}`}
        />
      ))}

      {/* ── Light sweeps ──────────────────────────── */}
      <div className="light-sweep-1 absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/6 to-transparent blur-sm" style={{ left: '30%' }} />
      <div className="light-sweep-2 absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-300/8 to-transparent blur-sm" style={{ left: '60%' }} />

      {/* ── Particles ─────────────────────────────── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.type} ${p.color}/50 rounded-full`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* ── Noise grain overlay ───────────────────── */}
      <div className="noise-overlay absolute inset-0 opacity-40" />

      {/* ── Vignette ──────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  )
}
