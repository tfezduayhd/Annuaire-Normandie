import { NextResponse } from 'next/server'
import { z } from 'zod/v4'

const newsletterSchema = z.object({
  email: z.email('Adresse email invalide'),
})

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Inscription à la newsletter confirmée',
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
