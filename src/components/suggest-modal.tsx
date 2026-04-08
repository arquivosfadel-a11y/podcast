'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic2, CheckCircle } from 'lucide-react'

const STORAGE_KEY = 'podcafe_suggest_sent'

export function SuggestModal() {
  const [open, setOpen]           = useState(false)
  const [text, setText]           = useState('')
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    console.log('[SuggestModal] mounted, storage:', localStorage.getItem(STORAGE_KEY))
    if (localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => {
      console.log('[SuggestModal] opening modal')
      setOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  function close() {
    setOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion: text }),
      })

      if (!res.ok) throw new Error()

      setSuccess(true)
      localStorage.setItem(STORAGE_KEY, '1')
      setTimeout(() => setOpen(false), 2800)
    } catch {
      setError('Não foi possível enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92,  y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md rounded-2xl bg-[#12121A] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">

              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#7c3aed] via-[#F97316] to-[#1e40af]" />

              <div className="p-7">
                {/* Close */}
                <button
                  onClick={close}
                  className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                {!success ? (
                  <>
                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 flex items-center justify-center">
                        <Mic2 className="w-5 h-5 text-[#F97316]" />
                      </div>
                      <h2 className="font-righteous text-white text-xl leading-tight">
                        Quem você quer ver<br />no podcast?
                      </h2>
                    </div>

                    <p className="text-white/40 text-sm font-poppins mb-5">
                      Sugira um convidado e levaremos sua ideia ao time do Podcafé.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Ex: Fulano de Tal, empresário de Taquarituba..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-poppins placeholder-white/25 resize-none focus:outline-none focus:border-[#F97316]/50 focus:bg-white/7 transition-all duration-200"
                      />

                      {error && (
                        <p className="text-red-400 text-xs font-poppins">{error}</p>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={loading || !text.trim()}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F97316] hover:bg-[#ea6c0e] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm font-poppins rounded-xl transition-colors duration-200 cursor-pointer shadow-lg shadow-orange-500/25"
                        >
                          <Send className="w-4 h-4" />
                          {loading ? 'Enviando...' : 'Enviar sugestão'}
                        </button>
                        <button
                          type="button"
                          onClick={close}
                          className="px-4 py-3 text-white/35 hover:text-white/60 text-sm font-poppins transition-colors cursor-pointer"
                        >
                          Agora não
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-4 gap-4"
                  >
                    <CheckCircle className="w-14 h-14 text-[#F97316]" />
                    <div>
                      <h3 className="font-righteous text-white text-xl mb-1">Obrigado pela sugestão!</h3>
                      <p className="text-white/40 text-sm font-poppins">O time do Podcafé vai adorar saber.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
