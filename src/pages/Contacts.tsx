import { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ArrowUpRightIcon,
  Avatar,
  Badge,
  Button,
  Chip,
  IconButton,
  Pagination,
} from '@fanvue/ui'
import { Card, Input } from '@/components/ui'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { CONTACT_STATUS_LABELS, type ContactStatus } from '@/data/mock'

const STATUS_BADGE_VARIANT: Record<ContactStatus, 'default' | 'info' | 'success' | 'error' | 'warning'> = {
  lead: 'default',
  qualified: 'info',
  customer: 'success',
  churned: 'error',
}

const PAGE_SIZE = 8

function AddContactModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (data: { name: string; email: string; company?: string; status: ContactStatus }) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<ContactStatus>('lead')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    onAdd({ name: name.trim(), email: email.trim(), company: company.trim() || undefined, status })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-h-[90vh] max-w-md flex-1 overflow-auto rounded-b-none rounded-t-xl p-6 shadow-lg sm:flex-none sm:max-h-none sm:rounded-b-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="m-0 mb-4 text-lg font-semibold text-[var(--color-body-100)]">
          Add contact
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-body-200)]">
              Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-body-200)]">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-body-200)]">
              Company (optional)
            </label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-body-200)]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContactStatus)}
              className="w-full rounded-lg border border-[var(--color-background-inverse-solid-light)] bg-[var(--color-background-150)] px-3 py-2 text-sm text-[var(--color-body-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            >
              {(Object.keys(CONTACT_STATUS_LABELS) as ContactStatus[]).map((s) => (
                <option key={s} value={s}>
                  {CONTACT_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" size="40" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="40">
              Add contact
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export function Contacts() {
  const location = useLocation()
  const { contacts, addContact } = useData()
  const { showToast } = useToast()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all')
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const q = (location.state as { search?: string } | null)?.search
    if (typeof q === 'string') setSearch(q)
  }, [location.state])

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company?.toLowerCase().includes(search.toLowerCase()) ?? false)
      const matchStatus = statusFilter === 'all' || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [contacts, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  )

  const handleAddContact = (data: Parameters<typeof addContact>[0]) => {
    addContact(data)
    showToast({
      title: 'Contact added',
      description: data.name,
      variant: 'success',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="m-0 mb-1 text-xl font-semibold tracking-tight text-[var(--color-body-100)] sm:text-2xl">
            Contacts
          </h1>
          <p className="m-0 text-sm text-[var(--color-body-200)]">
            Manage your contacts and leads
          </p>
        </div>
        <Button variant="primary" size="40" onClick={() => setShowModal(true)} className="w-full shrink-0 sm:w-auto">
          Add contact
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[220px] flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <Chip
              variant="rounded"
              size="40"
              selected={statusFilter === 'all'}
              onClick={() => { setStatusFilter('all'); setPage(1) }}
            >
              All
            </Chip>
            {(Object.keys(CONTACT_STATUS_LABELS) as ContactStatus[]).map((s) => (
              <Chip
                key={s}
                variant="rounded"
                size="40"
                selected={statusFilter === s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
              >
                {CONTACT_STATUS_LABELS[s]}
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--color-body-200)]">
            {contacts.length === 0
              ? 'No contacts yet. Add one to get started.'
              : 'No contacts match your search or filter.'}
          </div>
        ) : (
          <>
            <ul className="m-0 list-none p-0">
              {paginated.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col gap-3 border-b border-[var(--color-background-inverse-solid-light)] px-4 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar size={40} fallback={c.name.slice(0, 2).toUpperCase()} />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate font-medium text-[var(--color-body-100)]">{c.name}</p>
                      <p className="m-0 truncate text-sm text-[var(--color-body-200)]">{c.email}</p>
                      {c.company && (
                        <p className="mt-0.5 truncate text-xs text-[var(--color-body-200)]">{c.company}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <IconButton
                      variant="tertiary"
                      size="32"
                      aria-label={`Open ${c.name}`}
                      icon={<ArrowUpRightIcon />}
                    />
                    <Badge variant={STATUS_BADGE_VARIANT[c.status]}>
                      {CONTACT_STATUS_LABELS[c.status]}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
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

      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddContact}
        />
      )}
    </div>
  )
}
