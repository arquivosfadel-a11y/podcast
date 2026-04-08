import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { suggestion } = await req.json()

  if (!suggestion?.trim()) {
    return NextResponse.json({ error: 'Sugestão vazia.' }, { status: 400 })
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    return NextResponse.json({ error: 'Configuração de e-mail ausente.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  try { await transporter.verify() } catch (e) { console.error('SMTP verify error:', e); return NextResponse.json({ error: String(e) }, { status: 500 }) }

  await transporter.sendMail({
    from: `"Podcafé Site" <${user}>`,
    to: 'contatopodcafe2025@gmail.com',
    subject: '💡 Sugestão de convidado — Podcafé',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #F97316;">Nova sugestão de convidado</h2>
        <p style="font-size: 16px; color: #333;">
          Um visitante do site sugeriu o seguinte convidado para o podcast:
        </p>
        <blockquote style="border-left: 4px solid #F97316; margin: 16px 0; padding: 12px 20px; background: #fff8f0; border-radius: 4px; font-size: 18px; color: #111;">
          ${suggestion.trim()}
        </blockquote>
        <p style="font-size: 12px; color: #999;">Enviado pelo formulário do site Podcafé.</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
