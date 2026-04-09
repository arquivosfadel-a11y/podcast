'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Trophy,
  Calendar,
  Users,
  Ticket,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

/* ─── Animation helpers ───────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section wrapper ─────────────────────────────── */

function Section({
  id,
  icon: Icon,
  number,
  title,
  children,
  delay = 0,
  accent = false,
}: {
  id?: string
  icon: React.ElementType
  number: string
  title: string
  children: React.ReactNode
  delay?: number
  accent?: boolean
}) {
  return (
    <FadeIn delay={delay}>
      <div
        id={id}
        className={`relative rounded-2xl border p-7 md:p-8 overflow-hidden group ${
          accent
            ? 'bg-gradient-to-br from-[#F97316]/10 to-[#1E1B4B]/60 border-[#F97316]/30'
            : 'bg-white/[0.03] border-white/8 hover:border-white/15'
        } transition-all duration-300`}
      >
        {/* glow spot on hover */}
        {!accent && (
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}

        <div className="flex items-start gap-4 mb-5">
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
              accent
                ? 'bg-[#F97316]/20 border border-[#F97316]/40'
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <Icon className={`w-5 h-5 ${accent ? 'text-[#F97316]' : 'text-white/60'}`} />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] text-white/30 uppercase font-poppins font-medium mb-0.5">
              {number}
            </p>
            <h2 className="text-lg md:text-xl font-righteous text-white leading-tight">{title}</h2>
          </div>
        </div>

        <div className="text-white/65 font-poppins text-sm md:text-[15px] leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

/* ─── Check item ──────────────────────────────────── */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  )
}

/* ─── Warning box ─────────────────────────────────── */

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 mt-3">
      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="text-white/70 text-sm font-poppins">{children}</div>
    </div>
  )
}

/* ─── Info highlight ──────────────────────────────── */

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-violet-600/10 border border-violet-500/25 rounded-xl p-4 mt-3">
      <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
      <div className="text-white/70 text-sm font-poppins">{children}</div>
    </div>
  )
}

/* ─── FAQ item ────────────────────────────────────── */

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/8 rounded-xl p-5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-200">
      <div className="flex items-start gap-3 mb-2">
        <HelpCircle className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
        <p className="font-poppins font-semibold text-white text-sm leading-snug">{q}</p>
      </div>
      <div className="pl-7 text-white/60 font-poppins text-sm leading-relaxed">{children}</div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────── */

export default function RegulamentoPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      {/* ── Background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-40 top-0 w-[700px] h-[700px] rounded-full bg-violet-700 blur-[160px] opacity-15" />
        <div className="absolute right-0 top-[30%] w-[600px] h-[600px] rounded-full bg-orange-600 blur-[180px] opacity-10" />
        <div className="absolute left-1/3 bottom-0 w-[800px] h-[600px] rounded-full bg-indigo-700 blur-[180px] opacity-10" />
      </div>

      {/* ── Minimal top bar ── */}
      <div className="relative z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-poppins group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar ao site
          </Link>
          <Image src="/logotipo.png" alt="Podcafé" width={110} height={34} className="object-contain" />
          <div className="w-24" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 pb-24 pt-12">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 rounded-full px-5 py-2 mb-6"
          >
            <Trophy className="w-4 h-4 text-[#F97316]" />
            <span className="text-[#F97316] text-xs font-poppins font-semibold tracking-wider uppercase">
              Regulamento Oficial · 2025
            </span>
          </motion.div>

          <h1 className="font-righteous text-4xl md:text-6xl text-white leading-[1.1] mb-4">
            Sorteio{' '}
            <span className="bg-gradient-to-r from-[#F97316] via-orange-300 to-[#F97316] bg-clip-text text-transparent">
              iPhone 17
            </span>
          </h1>
          <p className="text-white/45 font-poppins text-base md:text-lg max-w-xl mx-auto">
            Participe dos episódios, acumule cupons e concorra ao prêmio de{' '}
            <strong className="text-white/70">alto do ano</strong>.
          </p>

          {/* Timeline strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-0"
          >
            {[
              { label: 'Início', value: 'Abril 2025', active: true },
              { label: 'Período', value: 'Abr → Dez', active: false },
              { label: 'Sorteio Final', value: 'Dezembro 2025', active: true },
            ].map((item, i, arr) => (
              <div key={item.label} className="flex flex-col sm:flex-row items-center">
                <div
                  className={`px-6 py-3 rounded-2xl text-center min-w-[130px] border ${
                    item.active
                      ? 'bg-gradient-to-br from-[#F97316]/20 to-[#1E1B4B]/60 border-[#F97316]/40'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <p className="text-[10px] tracking-widest text-white/35 uppercase font-poppins mb-0.5">
                    {item.label}
                  </p>
                  <p className={`font-poppins font-semibold text-sm ${item.active ? 'text-[#F97316]' : 'text-white/60'}`}>
                    {item.value}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-white/15 mx-1 rotate-0 sm:rotate-0 hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* ── Sections grid ── */}
        <div className="space-y-5">

          {/* 1. Objeto */}
          <Section icon={Shield} number="Artigo 1" title="Objeto" delay={0.05}>
            <p>
              O presente regulamento estabelece as regras para participação no sorteio de um{' '}
              <strong className="text-white font-semibold">iPhone 17</strong>, promovido pelo Podcast{' '}
              <strong className="text-white font-semibold">Podcafé</strong>, a ser realizado ao final
              do período descrito neste documento.
            </p>
          </Section>

          {/* 2. Período */}
          <Section icon={Calendar} number="Artigo 2" title="Período da Promoção" delay={0.1} accent>
            <p>
              A promoção terá início no mês de <strong className="text-[#F97316]">abril</strong> e
              término no mês de <strong className="text-[#F97316]">dezembro</strong>, com o sorteio
              final realizado no <strong className="text-white">último episódio do Podcafé no mês de dezembro</strong>.
            </p>
          </Section>

          {/* 3. Mecânica */}
          <Section icon={Users} number="Artigo 3" title="Mecânica de Participação" delay={0.15}>
            <div className="space-y-5">
              <div>
                <h3 className="text-white font-semibold font-poppins text-sm mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white/50 text-[10px] flex items-center justify-center font-bold">3.1</span>
                  Participação nos Episódios
                </h3>
                <p>
                  Durante cada episódio, serão sorteados{' '}
                  <strong className="text-white">10 (dez) participantes</strong> entre aqueles que
                  interagirem no <strong className="text-white">chat ao vivo</strong>.
                </p>
                <p className="mt-2">Serão consideradas interações como:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-white/55 pl-1">
                  <li>Comentários</li>
                  <li>Perguntas direcionadas aos entrevistados</li>
                </ul>
                <WarningBox>
                  Será considerado apenas <strong className="text-white">1 (um) comentário por usuário por episódio</strong>,
                  independentemente da quantidade de mensagens enviadas.
                </WarningBox>
              </div>

              <div className="h-px bg-white/6" />

              <div>
                <h3 className="text-white font-semibold font-poppins text-sm mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white/50 text-[10px] flex items-center justify-center font-bold">3.2</span>
                  Formação dos Cupons
                </h3>
                <p>
                  Cada participante sorteado em um episódio terá seu nome incluído em uma{' '}
                  <strong className="text-white">urna oficial</strong>. Cada inclusão equivale a{' '}
                  <strong className="text-white">1 cupom válido</strong> para o sorteio final.
                </p>
                <InfoBox>
                  Quanto mais episódios o participante for sorteado, <strong className="text-white">maior será sua
                  quantidade de cupons</strong> e, consequentemente, suas chances de ganhar.
                </InfoBox>
              </div>
            </div>
          </Section>

          {/* 4. Sorteio Final */}
          <Section icon={Trophy} number="Artigo 4" title="Sorteio Final" delay={0.2} accent>
            <ul className="space-y-2">
              <CheckItem>O sorteio final será realizado <strong className="text-white">ao vivo</strong> no último episódio de dezembro.</CheckItem>
              <CheckItem>Será sorteado <strong className="text-white">1 (um) participante</strong> dentre todos os cupons acumulados na urna.</CheckItem>
            </ul>
          </Section>

          {/* 5. Condições */}
          <Section icon={CheckCircle2} number="Artigo 5" title="Condições para Recebimento do Prêmio" delay={0.25}>
            <p className="mb-3">Para ter direito ao prêmio, o participante sorteado deverá obrigatoriamente:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '📸', text: 'Seguir o perfil oficial do Podcafé no Instagram' },
                { icon: '▶️', text: 'Estar inscrito no canal do Podcafé no YouTube' },
                { icon: '🎵', text: 'Seguir o perfil do Podcafé no TikTok' },
                { icon: '❤️', text: 'Ter curtido e compartilhado o episódio no qual participou' },
              ].map((c) => (
                <div
                  key={c.text}
                  className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4"
                >
                  <span className="text-lg leading-none mt-0.5">{c.icon}</span>
                  <p className="text-sm text-white/65 font-poppins leading-snug">{c.text}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 6. Desclassificação */}
          <Section icon={AlertTriangle} number="Artigo 6" title="Desclassificação" delay={0.3}>
            <p>
              Caso o participante sorteado <strong className="text-white">não cumpra qualquer uma</strong> das
              exigências descritas no artigo 5, será automaticamente desclassificado.
            </p>
            <WarningBox>
              Neste caso, será realizado um novo sorteio, repetindo-se o processo até que um
              <strong className="text-white"> participante válido</strong> seja identificado.
            </WarningBox>
          </Section>

          {/* 7. Disposições Gerais */}
          <Section icon={Star} number="Artigo 7" title="Disposições Gerais" delay={0.35}>
            <ul className="space-y-2">
              <CheckItem>A participação é <strong className="text-white">voluntária e gratuita</strong>.</CheckItem>
              <CheckItem>O participante poderá concorrer em <strong className="text-white">quantos episódios desejar</strong>, sem limite de participação.</CheckItem>
              <CheckItem>A organização se reserva o direito de <strong className="text-white">verificar o cumprimento</strong> de todas as regras antes da entrega do prêmio.</CheckItem>
              <CheckItem>O prêmio é <strong className="text-white">pessoal e intransferível</strong>.</CheckItem>
              <CheckItem>Eventuais casos omissos serão resolvidos pela <strong className="text-white">organização do Podcafé</strong>.</CheckItem>
            </ul>
          </Section>

          {/* 8. FAQ */}
          <FadeIn delay={0.4}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-white/30 uppercase font-poppins font-medium mb-0.5">
                    Artigo 8
                  </p>
                  <h2 className="text-lg md:text-xl font-righteous text-white">Perguntas Frequentes</h2>
                </div>
              </div>

              <div className="space-y-3">
                <FaqItem q="Quanto mais comentários eu fizer em um único episódio, mais chances tenho?">
                  <strong className="text-white/80">Não.</strong> Será considerado apenas{' '}
                  <strong className="text-white/80">1 comentário por episódio</strong> por participante.
                </FaqItem>

                <FaqItem q="Posso participar de todos os episódios?">
                  <strong className="text-white/80">Sim!</strong> Quanto mais episódios você participar e for
                  sorteado, <strong className="text-white/80">mais cupons você acumula</strong>.
                </FaqItem>

                <FaqItem q="Preciso fazer algo além de comentar para garantir o prêmio?">
                  <strong className="text-white/80">Sim.</strong> É obrigatório:
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Seguir o Podcafé no YouTube, Instagram e TikTok</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Curtir e compartilhar o episódio em que participou</li>
                  </ul>
                </FaqItem>
              </div>
            </div>
          </FadeIn>

          {/* 9. Considerações Finais */}
          <FadeIn delay={0.45}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#1E1B4B]/60 to-[#0A0A0F]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#F97316_0%,_transparent_60%)] opacity-10" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />

              <div className="relative p-8 md:p-10 text-center">
                <Sparkles className="w-8 h-8 text-[#F97316] mx-auto mb-4 opacity-80" />
                <h2 className="font-righteous text-2xl text-white mb-3">Considerações Finais</h2>
                <p className="text-white/55 font-poppins text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  Ao participar da promoção, o usuário declara estar{' '}
                  <strong className="text-white/80">ciente e de acordo</strong> com todos os termos
                  deste regulamento.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-400 text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao Podcafé
                  </Link>
                  <a
                    href="https://wa.me/5514997616822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-poppins font-medium text-sm px-6 py-3 rounded-xl transition-colors"
                  >
                    Fale conosco
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-white/20 text-xs font-poppins mt-12">
          © 2025 Podcafé · Regulamento Oficial do Sorteio iPhone 17
        </p>
      </div>
    </main>
  )
}
