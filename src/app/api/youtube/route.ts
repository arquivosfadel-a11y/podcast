import { NextResponse } from 'next/server'
import { getLatestVideos, getChannelInfo } from '@/lib/youtube'

export async function GET() {
  try {
    const [videos, channel] = await Promise.all([
      getLatestVideos(12),
      getChannelInfo(),
    ])
    return NextResponse.json({ videos, channel })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar dados do YouTube' },
      { status: 500 }
    )
  }
}
