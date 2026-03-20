import { NextResponse } from 'next/server'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { designerRegistrationSchema } from '@/lib/validations/designer'

export async function GET() {
  return NextResponse.json({
    designers: MOCK_DESIGNERS,
    total: MOCK_DESIGNERS.length,
  })
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const result = designerRegistrationSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', issues: result.error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Designer enregistré avec succès', id: crypto.randomUUID() },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
