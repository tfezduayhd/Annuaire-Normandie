'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchInputProps = {
  className?: string
}

const SEARCH_DEBOUNCE_MS = 300

export function SearchInput({ className }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }

      // Reset to page 1 on new search
      params.delete('page')

      router.push(`?${params.toString()}`, { scroll: false })
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [value, router, searchParams])

  return (
    <div className={cn('relative', className)}>
      <Search
        className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-flint"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher un designer, une ville, une discipline..."
        className="w-full border border-slate bg-white py-3 pl-11 pr-4 font-sans text-sm text-ink outline-none transition-colors placeholder:text-flint focus:ring-2 focus:ring-inset focus:ring-earth"
      />
    </div>
  )
}
