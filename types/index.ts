import type { Designer, Project, Event, ContactMessage } from '@prisma/client'

export type { Designer, Project, Event, ContactMessage }

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
