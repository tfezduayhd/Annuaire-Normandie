import type { Metadata } from 'next'
import { DISCIPLINES } from '@/lib/constants'
import { formatDateShort } from '@/lib/utils'
import type { Discipline } from '@/types'

export const metadata: Metadata = {
  title: 'Gestion des designers — Administration',
}

type MockDesigner = {
  id: string
  firstName: string
  lastName: string
  email: string
  disciplines: Discipline[]
  city: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date
}

const MOCK_PENDING: MockDesigner[] = [
  { id: '10', firstName: 'Sophie', lastName: 'Bernard', email: 'sophie@example.com', disciplines: ['DESIGN_GRAPHIQUE'], city: 'Rouen', status: 'PENDING', createdAt: new Date('2025-06-01') },
  { id: '11', firstName: 'Marc', lastName: 'Petit', email: 'marc@example.com', disciplines: ['DESIGN_NUMERIQUE', 'DESIGN_EXPERIENCE'], city: 'Caen', status: 'PENDING', createdAt: new Date('2025-06-03') },
  { id: '12', firstName: 'Julie', lastName: 'Rousseau', email: 'julie@example.com', disciplines: ['ILLUSTRATION'], city: 'Le Havre', status: 'APPROVED', createdAt: new Date('2025-05-20') },
  { id: '13', firstName: 'Pierre', lastName: 'Lambert', email: 'pierre@example.com', disciplines: ['DESIGN_PRODUIT', 'DESIGN_INDUSTRIEL'], city: 'Évreux', status: 'REJECTED', createdAt: new Date('2025-05-15') },
  { id: '14', firstName: 'Claire', lastName: 'Martin', email: 'claire@example.com', disciplines: ['DESIGN_SERVICE'], city: 'Cherbourg', status: 'PENDING', createdAt: new Date('2025-06-05') },
]

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border border-amber-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  REJECTED: 'bg-red-50 text-red-700 border border-red-200',
}

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  APPROVED: 'Approuvé',
  REJECTED: 'Refusé',
}

export default function AdminDesignersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-display text-2xl text-ink">Gestion des designers</h2>

      <div className="overflow-x-auto rounded-sm border border-flint/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-flint/10">
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Nom
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Email
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Disciplines
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Ville
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Date
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Statut
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-flint">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PENDING.map((designer) => (
              <tr key={designer.id} className="border-b border-flint/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">
                  {designer.firstName} {designer.lastName}
                </td>
                <td className="px-4 py-3 text-slate">{designer.email}</td>
                <td className="px-4 py-3 text-slate">
                  {designer.disciplines.map((d) => DISCIPLINES[d]).join(', ')}
                </td>
                <td className="px-4 py-3 text-slate">{designer.city}</td>
                <td className="px-4 py-3 font-mono text-xs text-flint">
                  {formatDateShort(designer.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-sm px-2 py-0.5 text-xs font-medium ${statusStyles[designer.status]}`}
                  >
                    {statusLabels[designer.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {designer.status === 'PENDING' && (
                      <>
                        <button className="rounded-sm bg-moss px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-moss/90">
                          Approuver
                        </button>
                        <button className="rounded-sm border border-flint/20 px-3 py-1 text-xs font-medium text-slate transition-colors hover:bg-chalk">
                          Rejeter
                        </button>
                      </>
                    )}
                    <button className="rounded-sm border border-slate px-3 py-1 text-xs font-medium text-slate transition-colors hover:bg-slate hover:text-white">
                      Voir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
