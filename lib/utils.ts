import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'd MMMM yyyy', { locale: fr })
}

export function formatDateShort(date: Date | string): string {
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}
