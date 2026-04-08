export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { Top10 } from '@/components/top10'
import { EpisodeRow } from '@/components/episode-row'
import { YouTubeSection } from '@/components/youtube-section'
import { SuggestModal } from '@/components/suggest-modal'
import { categories, top10 } from '@/lib/data'
import {
  getLiveVideos,
  getMostViewedLiveVideos,
  getShorts,
  getPlaylistVideosByViews,
  getChannelInfo,
} from '@/lib/youtube'
import Image from 'next/image'

const CHANNEL_ID              = process.env.YOUTUBE_CHANNEL_ID
const PLAYLIST_POLITICA       = process.env.YOUTUBE_PLAYLIST_POLITICA
const PLAYLIST_MULHERPODI     = process.env.YOUTUBE_PLAYLIST_MULHERPODI
const PLAYLIST_ENTRETENIMENTO = process.env.YOUTUBE_PLAYLIST_ENTRETENIMENTO
const PLAYLIST_BUSINESS       = process.env.YOUTUBE_PLAYLIST_BUSINESS
const CHANNEL_URL         = CHANNEL_ID
  ? `https://www.youtube.com/channel/${CHANNEL_ID}`
  : '#'

export default async function Home() {
  const hasChannel = !!CHANNEL_ID

  const [channelInfo, liveVideos, mostViewedLives, shorts, politicaVideos, mulherpodiVideos, entretenimentoVideos, businessVideos] =
    await Promise.all([
      hasChannel                ? getChannelInfo().catch(() => null)                                              : Promise.resolve(null),
      hasChannel                ? getLiveVideos(12).catch(() => [])                                               : Promise.resolve([]),
      hasChannel                ? getMostViewedLiveVideos(12).catch(() => [])                                     : Promise.resolve([]),
      hasChannel                ? getShorts(12).catch(() => [])                                                   : Promise.resolve([]),
      PLAYLIST_POLITICA         ? getPlaylistVideosByViews(PLAYLIST_POLITICA, 10).catch(() => [])                 : Promise.resolve([]),
      PLAYLIST_MULHERPODI       ? getPlaylistVideosByViews(PLAYLIST_MULHERPODI, 12).catch(() => [])               : Promise.resolve([]),
      PLAYLIST_ENTRETENIMENTO   ? getPlaylistVideosByViews(PLAYLIST_ENTRETENIMENTO, 10).catch(() => [])           : Promise.resolve([]),
      PLAYLIST_BUSINESS         ? getPlaylistVideosByViews(PLAYLIST_BUSINESS, 10).catch(() => [])                 : Promise.resolve([]),
    ])

  return (
    <main className="min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      <SuggestModal />
      <Navbar />
      <Hero />

      <div className="relative z-10 -mt-4">
        {/* ── Background layer (below hero only) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* dot grid */}
          <div className="dot-grid absolute inset-0 opacity-100" />
          {/* floating orbs */}
          <div className="content-orb-1 absolute -left-40 top-32 w-[600px] h-[600px] rounded-full bg-violet-600 blur-[120px]" />
          <div className="content-orb-2 absolute right-0 top-[40%] w-[500px] h-[500px] rounded-full bg-orange-500 blur-[140px]" />
          <div className="content-orb-3 absolute left-1/3 top-[65%] w-[700px] h-[700px] rounded-full bg-indigo-700 blur-[160px]" />
          <div className="content-orb-4 absolute -right-20 bottom-32 w-[450px] h-[450px] rounded-full bg-purple-600 blur-[130px]" />
        </div>

        <StatsBar />

        <div className="mt-4 space-y-2">
          {/* Últimos Episódios — Ao Vivo */}
          <div id="ultimos-episodios">
            {liveVideos.length > 0 ? (
              <YouTubeSection
                title="Últimos Episódios"
                videos={liveVideos}
                channel={channelInfo}
                channelUrl={`${CHANNEL_URL}/streams`}
              />
            ) : (
              <EpisodeRow title="Últimos Episódios" episodes={categories[0].episodes as any} />
            )}
          </div>

          {/* Episódios Mais Ouvidos — numerados por views */}
          <div id="mais-ouvidos">
            <Top10
              title="Episódios Mais Ouvidos"
              youtubeVideos={mostViewedLives.length > 0 ? (mostViewedLives as any) : undefined}
              staticEpisodes={mostViewedLives.length === 0 ? (categories[1].episodes as any) : undefined}
            />
          </div>

          {/* Shorts */}
          <div id="shorts">
            {shorts.length > 0 ? (
              <YouTubeSection
                title="Shorts"
                videos={shorts}
                isShorts
                channelUrl={`${CHANNEL_URL}/shorts`}
              />
            ) : (
              <EpisodeRow title="Shorts" episodes={categories[2].episodes as any} />
            )}
          </div>

          {/* MulherPodi Cast — playlist */}
          <div id="mulherpodi">
            {mulherpodiVideos.length > 0 ? (
              <YouTubeSection
                title="MulherPodi Cast"
                videos={mulherpodiVideos as any}
                channelUrl={`https://www.youtube.com/playlist?list=${PLAYLIST_MULHERPODI}`}
              />
            ) : (
              <EpisodeRow title="MulherPodi Cast" episodes={categories[3].episodes as any} />
            )}
          </div>
        </div>

        {/* Política — playlist */}
        <div id="politica" className="mt-2">
          <Top10
            title="Política"
            youtubeVideos={politicaVideos.length > 0 ? (politicaVideos as any) : undefined}
            staticEpisodes={politicaVideos.length === 0 ? (top10 as any) : undefined}
          />
        </div>

        {/* Entretenimento — playlist */}
        <div id="entretenimento" className="mt-2">
          <Top10
            title="Entretenimento"
            youtubeVideos={entretenimentoVideos.length > 0 ? (entretenimentoVideos as any) : undefined}
            staticEpisodes={entretenimentoVideos.length === 0 ? (top10 as any) : undefined}
          />
        </div>

        {/* Business — playlist */}
        <div id="business" className="mt-2">
          <Top10
            title="Business"
            youtubeVideos={businessVideos.length > 0 ? (businessVideos as any) : undefined}
            staticEpisodes={businessVideos.length === 0 ? (top10 as any) : undefined}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <Image src="/logotipo.png" alt="Podcafé" width={100} height={32} className="object-contain" />
              <div className="flex items-center gap-6">
                {['Sobre', 'Privacidade', 'Termos'].map((item) => (
                  <a key={item} href="#" className="text-white/30 text-sm font-poppins hover:text-white/60 transition-colors cursor-pointer">
                    {item}
                  </a>
                ))}
                <a
                  href="https://wa.me/5514997616822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/30 text-sm font-poppins hover:text-green-400 transition-colors cursor-pointer group"
                >
                  <svg className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>(14) 99761-6822</span>
                </a>
              </div>
              <div className="text-right">
                <p className="text-white/20 text-sm font-poppins">© 2023 Podcafé. Todos os direitos reservados.</p>
                <p className="text-white/15 text-xs font-poppins mt-1">Rua Dr. Ataliba Leonel, 826 — Taquarituba/SP</p>
                <p className="text-xs font-poppins mt-1">
                  <span className="text-white/20">By </span>
                  <a
                    href="https://www.in9vi.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F97316] font-semibold hover:text-orange-400 transition-colors"
                  >
                    Agência In9vi
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
