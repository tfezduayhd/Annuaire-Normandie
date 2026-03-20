import { z } from 'zod/v4'

const territoryValues = [
  'SEINE_MARITIME',
  'EURE',
  'CALVADOS',
  'MANCHE',
  'ORNE',
] as const

const disciplineValues = [
  'DESIGN_GRAPHIQUE',
  'DESIGN_PRODUIT',
  'DESIGN_EXPERIENCE',
  'DESIGN_SERVICE',
  'DESIGN_ESPACE',
  'DESIGN_NUMERIQUE',
  'DESIGN_STRATEGIQUE',
  'DESIGN_SOCIAL',
  'ILLUSTRATION',
  'MOTION_DESIGN',
  'DESIGN_TYPOGRAPHIQUE',
  'DESIGN_INDUSTRIEL',
] as const

const seniorityValues = [
  'JUNIOR',
  'CONFIRME',
  'SENIOR',
  'EXPERT',
] as const

const structureValues = [
  'FREELANCE',
  'AGENCE',
  'SALARIE',
  'ENSEIGNANT',
  'ETUDIANT',
] as const

const transitionFocusValues = [
  'ECOLOGIQUE',
  'SOCIALE',
  'NUMERIQUE_RESPONSABLE',
  'ECONOMIE_CIRCULAIRE',
  'INCLUSION',
  'SANTE',
  'ALIMENTATION',
  'MOBILITE',
] as const

export const designerRegistrationSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.email(),
    phone: z.string().optional(),
    city: z.string().min(2),
    territory: z.enum(territoryValues),
    photoUrl: z.string().optional(),
    disciplines: z.array(z.enum(disciplineValues)).min(1).max(5),
    specialties: z.array(z.string()),
    seniority: z.enum(seniorityValues),
    structure: z.enum(structureValues),
    companyName: z.string().optional(),
    bio: z.string().min(100).max(500),
    websiteUrl: z.url().optional(),
    linkedinUrl: z.url().optional(),
    instagramUrl: z.url().optional(),
    behanceUrl: z.url().optional(),
    transitionFocus: z.array(z.enum(transitionFocusValues)),
    isOpenToCollaboration: z.boolean(),
    isOpenToMentoring: z.boolean(),
    isVolunteer: z.boolean(),
  })
  .refine(
    (data) =>
      data.structure === 'FREELANCE' ||
      (data.companyName !== undefined && data.companyName.length > 0),
    {
      message: 'Le nom de la structure est requis',
      path: ['companyName'],
    }
  )

export type DesignerRegistrationInput = z.infer<typeof designerRegistrationSchema>
