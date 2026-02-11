import { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  Pagination,
  Pill,
  PlusIcon,
} from '@fanvue/ui'
import { Card, Input } from '@/components/ui'
import { useData } from '@/context/DataContext'
import { CREATOR_TIER_LABELS, type CreatorTier } from '@/data/mock'

function formatSubscribers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

const TIER_PILL_VARIANT: Record<CreatorTier, 'green' | 'blue' | 'gold' | 'brand' | 'grey'> = {
  standard: 'grey',
  premium: 'blue',
  vip: 'gold',
}

const PAGE_SIZE = 9

export function Creators() {
  const location = useLocation()
  const { creators } = useData()
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<CreatorTier | 'all'>('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const q = (location.state as { search?: string } | null)?.search
    if (typeof q === 'string') setSearch(q)
  }, [location.state])

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      const matchSearch =
        !search.trim() ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase())
      const matchTier = tierFilter === 'all' || c.tier === tierFilter
      return matchSearch && matchTier
    })
  }, [creators, search, tierFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="m-0 mb-1 text-xl font-semibold tracking-tight text-[var(--color-body-100)] sm:text-2xl">
            Creators
          </h1>
          <p className="m-0 text-sm text-[var(--color-body-200)]">
            Browse and manage creators on the platform
          </p>
        </div>
        <Button variant="secondary" size="40" className="w-full shrink-0 sm:w-auto">
          Connect marketplace
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[220px] max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            <Chip
              variant="rounded"
              size="40"
              selected={tierFilter === 'all'}
              onClick={() => { setTierFilter('all'); setPage(1) }}
            >
              All tiers
            </Chip>
            {(Object.keys(CREATOR_TIER_LABELS) as CreatorTier[]).map((t) => (
              <Chip
                key={t}
                variant="rounded"
                size="40"
                selected={tierFilter === t}
                onClick={() => { setTierFilter(t); setPage(1) }}
              >
                {CREATOR_TIER_LABELS[t]}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--color-body-200)]">
            {creators.length === 0
              ? 'No creators yet. Connect to the Fanvue marketplace to discover creators.'
              : 'No creators match your search or filter.'}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((c) => (
                <div
                  key={c.id}
                  className="flex min-h-[88px] flex-col justify-center gap-2 border-b border-[var(--color-background-inverse-solid-light)] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:p-5 sm:last:border-r-0"
                >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar size={40} fallback={c.name.slice(0, 2).toUpperCase()} />
                    <div className="min-w-0">
                      <p className="m-0 truncate font-medium text-[var(--color-body-100)]">
                        {c.name}
                      </p>
                      <p className="m-0 truncate text-sm text-[var(--color-body-200)]">
                        {c.handle}
                      </p>
                    </div>
                  </div>
                  <IconButton
                    variant="tertiary"
                    size="32"
                    aria-label={`Add ${c.name}`}
                    icon={<PlusIcon />}
                  />
                </div>
                <Divider />
                <div className="flex flex-wrap items-center gap-2">
                  <Pill variant={TIER_PILL_VARIANT[c.tier]}>
                    {CREATOR_TIER_LABELS[c.tier]}
                  </Pill>
                  <span className="text-xs text-[var(--color-body-200)]">
                    {formatSubscribers(c.subscribers)} subs
                  </span>
                </div>
              </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center border-t border-[var(--color-background-inverse-solid-light)] p-4">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
