const API_KEY    = process.env.YOUTUBE_API_KEY!
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!
const BASE_URL   = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: string
  viewCountRaw: number
  url: string
  isShort?: boolean
  isLive?: boolean
}

export interface ChannelInfo {
  name: string
  description: string
  thumbnail: string
  subscriberCount: string
  videoCount: string
}

// ── Helpers ───────────────────────────────────────────────────

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0min'
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  if (h > 0) return `${h}h ${m > 0 ? `${m}min` : ''}`.trim()
  if (m > 0) return `${m}min`
  return `${parseInt(match[3] ?? '0')}s`
}

function formatCount(n: string): string {
  const num = parseInt(n)
  if (isNaN(num)) return '0'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000)     return `${(num / 1_000).toFixed(1)}K`
  return String(num)
}

function isDurationShort(iso: string): boolean {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return false
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  const s = parseInt(match[3] ?? '0')
  const totalSeconds = h * 3600 + m * 60 + s
  return totalSeconds <= 60
}

// ── Shared: enrich video IDs with details ────────────────────

async function enrichWithDetails(
  items: any[],
  idExtractor: (i: any) => string
): Promise<YouTubeVideo[]> {
  if (!items.length) return []
  const ids = items.map(idExtractor).filter(Boolean).join(',')

  const detailRes = await fetch(
    `${BASE_URL}/videos?part=contentDetails,statistics&id=${ids}&key=${API_KEY}`,
    { next: { revalidate: 1800 } }
  )
  const detailData = await detailRes.json()
  const details: Record<string, any> = {}
  for (const item of detailData.items ?? []) details[item.id] = item

  return items.map((item: any) => {
    const videoId = idExtractor(item)
    const detail  = details[videoId]
    const rawCount = parseInt(detail?.statistics?.viewCount ?? '0')
    return {
      id:           videoId,
      title:        item.snippet.title,
      description:  item.snippet.description ?? '',
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ??
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ?? '',
      publishedAt:  item.snippet.publishedAt,
      duration:     detail ? formatDuration(detail.contentDetails.duration) : '—',
      viewCount:    formatCount(String(rawCount)),
      viewCountRaw: rawCount,
      url:          `https://www.youtube.com/watch?v=${videoId}`,
    }
  })
}

// ── Channel info ──────────────────────────────────────────────

export async function getChannelInfo(): Promise<ChannelInfo> {
  const res = await fetch(
    `${BASE_URL}/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  const ch   = data.items?.[0]
  if (!ch) throw new Error('Canal não encontrado')
  return {
    name:            ch.snippet.title,
    description:     ch.snippet.description,
    thumbnail:       ch.snippet.thumbnails.high?.url ?? ch.snippet.thumbnails.default.url,
    subscriberCount: formatCount(ch.statistics.subscriberCount ?? '0'),
    videoCount:      formatCount(ch.statistics.videoCount ?? '0'),
  }
}

// ── Últimos episódios: playlist de uploads do canal ───────────
// uploads playlist = "UU" + channelId sem "UC"
function uploadsPlaylistId(): string {
  return 'UU' + CHANNEL_ID.slice(2)
}

export async function getLiveVideos(maxResults = 12): Promise<YouTubeVideo[]> {
  const playlistId = uploadsPlaylistId()
  const res = await fetch(
    `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`,
    { next: { revalidate: 1800 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  return enrichWithDetails(items, (i) => i.snippet.resourceId?.videoId)
}

// ── Episódios mais ouvidos: uploads ordenados por views ───────

export async function getMostViewedLiveVideos(maxResults = 12): Promise<YouTubeVideo[]> {
  const playlistId = uploadsPlaylistId()
  const res = await fetch(
    `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  const videos = await enrichWithDetails(items, (i) => i.snippet.resourceId?.videoId)
  return videos
    .sort((a, b) => b.viewCountRaw - a.viewCountRaw)
    .slice(0, maxResults)
}

// ── Shorts: tab "Shorts" por view count desc ─────────────────

export async function getShorts(maxResults = 12): Promise<YouTubeVideo[]> {
  // Busca vídeos curtos (≤ 60s) do canal
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&videoDuration=short&key=${API_KEY}`,
    { next: { revalidate: 1800 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  const videos = await enrichWithDetails(items, (i) => i.id.videoId)

  return videos
    .filter(v => {
      // Filtra apenas os que são realmente shorts (≤ 60s)
      // Como já filtramos por videoDuration=short (< 4min), aceitamos todos
      return true
    })
    .sort((a, b) => b.viewCountRaw - a.viewCountRaw)
    .slice(0, maxResults)
    .map(v => ({ ...v, isShort: true, url: `https://www.youtube.com/shorts/${v.id}` }))
}

// ── Política: playlist podcafecompoltica por views ────────────

export async function getPlaylistVideosByViews(
  playlistId: string,
  maxResults = 10
): Promise<YouTubeVideo[]> {
  // Busca itens da playlist
  const res = await fetch(
    `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  if (!items.length) return []

  const videos = await enrichWithDetails(
    items,
    (i) => i.snippet.resourceId?.videoId
  )

  return videos
    .sort((a, b) => b.viewCountRaw - a.viewCountRaw)
    .slice(0, maxResults)
}

// ── Legacy: últimos vídeos genéricos ─────────────────────────

export async function getLatestVideos(maxResults = 12): Promise<YouTubeVideo[]> {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${API_KEY}`,
    { next: { revalidate: 1800 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  return enrichWithDetails(items, (i) => i.id.videoId)
}

export async function getPopularVideos(maxResults = 8): Promise<YouTubeVideo[]> {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=viewCount&type=video&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  const items: any[] = data.items ?? []
  return enrichWithDetails(items, (i) => i.id.videoId)
}
