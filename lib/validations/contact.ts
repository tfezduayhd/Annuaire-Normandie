import { z } from 'zod/v4'

const contactTypeValues = [
  'DESIGNER',
  'ENTREPRISE',
  'PARTENAIRE',
  'PRESSE',
  'AUTRE',
] as const

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  type: z.enum(contactTypeValues),
  subject: z.string().min(5),
  message: z.string().min(20).max(2000),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
