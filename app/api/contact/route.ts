import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', issues: result.error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Message envoyé avec succès' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
