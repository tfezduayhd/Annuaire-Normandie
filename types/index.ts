// Local type definitions mirroring the Prisma schema
// (Prisma Client is not generated yet — these serve as stand-ins)

export type Discipline =
  | 'DESIGN_GRAPHIQUE'
  | 'DESIGN_PRODUIT'
  | 'DESIGN_EXPERIENCE'
  | 'DESIGN_SERVICE'
  | 'DESIGN_ESPACE'
  | 'DESIGN_NUMERIQUE'
  | 'DESIGN_STRATEGIQUE'
  | 'DESIGN_SOCIAL'
  | 'ILLUSTRATION'
  | 'MOTION_DESIGN'
  | 'DESIGN_TYPOGRAPHIQUE'
  | 'DESIGN_INDUSTRIEL'

export type Territory =
  | 'SEINE_MARITIME'
  | 'EURE'
  | 'CALVADOS'
  | 'MANCHE'
  | 'ORNE'

export type Structure =
  | 'FREELANCE'
  | 'AGENCE'
  | 'SALARIE'
  | 'ENSEIGNANT'
  | 'ETUDIANT'

export type TransitionFocus =
  | 'ECOLOGIQUE'
  | 'SOCIALE'
  | 'NUMERIQUE_RESPONSABLE'
  | 'ECONOMIE_CIRCULAIRE'
  | 'INCLUSION'
  | 'SANTE'
  | 'ALIMENTATION'
  | 'MOBILITE'

export type DesignerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED'

export type Designer = {
  id: string
  slug: string
  firstName: string
  lastName: string
  email: string
  photoUrl: string | null
  bio: string | null
  city: string
  territory: Territory
  disciplines: Discipline[]
  specialties: string[]
  structure: Structure
  seniority: string | null
  transitionFocuses: TransitionFocus[]
  isOpenToCollaboration: boolean
  website: string | null
  linkedin: string | null
  instagram: string | null
  behance: string | null
  status: DesignerStatus
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string | null
  imageUrl: string | null
  year: number | null
  designerId: string
  createdAt: Date
}

export type Event = {
  id: string
  title: string
  slug: string
  description: string | null
  date: Date
  location: string | null
  type: string
  createdAt: Date
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  type: string
  message: string
  createdAt: Date
}

export type DesignerWithProjects = Designer & {
  projects: Project[]
}

export type DesignerCardData = Pick<
  Designer,
  | 'slug'
  | 'firstName'
  | 'lastName'
  | 'photoUrl'
  | 'city'
  | 'territory'
  | 'disciplines'
  | 'structure'
  | 'isOpenToCollaboration'
>

export type DesignerFilters = {
  q?: string
  discipline?: string[]
  territory?: string[]
  structure?: string
  collaboration?: boolean
  transition?: string[]
  page?: number
  sort?: 'date' | 'name' | 'discipline'
}
