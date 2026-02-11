import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Avatar,
  CloseIcon,
  Count,
  Divider,
  HomeIcon,
  IconButton,
  Pill,
} from '@fanvue/ui'
import { useData } from '@/context/DataContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: HomeIcon },
  { to: '/contacts', label: 'Contacts', countKey: 'contacts' as const },
  { to: '/creators', label: 'Creators', countKey: 'creators' as const },
]

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const { contacts, creators } = useData()
  const counts = { contacts: contacts.length, creators: creators.length }

  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  return (
    <>
      {/* Mobile overlay */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col border-r border-[var(--color-background-inverse-solid-light)] bg-[var(--color-background-150)] transition-transform duration-200 ease-out md:static md:translate-x-0 md:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-background-inverse-solid-light)] p-3 md:border-0 md:p-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Avatar size={40} fallback="CRM" />
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-sm font-semibold text-[var(--color-body-100)]">
                VueCRM
              </p>
              <p className="m-0 truncate text-xs text-[var(--color-body-200)]">
                Workspace
              </p>
            </div>
          </div>
          <IconButton
            variant="tertiary"
            size="32"
            aria-label="Close menu"
            icon={<CloseIcon />}
            onClick={onClose}
            className="md:hidden"
          />
        </div>
        <div className="flex flex-col gap-3 p-4 md:pt-0">
          <div className="flex flex-wrap gap-2">
            <Pill variant="brand">CRM</Pill>
            <Pill variant="grey">Active</Pill>
          </div>
        </div>

        <Divider />

        <nav className="flex flex-1 flex-col gap-0.5 overflow-auto p-3">
          {navItems.map(({ to, label, icon: Icon, countKey }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-500)]'
                    : 'text-[var(--color-body-200)] hover:bg-[var(--color-background-600)] hover:text-[var(--color-body-100)]'
                }`
              }
            >
              {Icon && <Icon className="size-5 shrink-0" />}
              {!Icon && to === '/contacts' && (
                <span className="flex size-5 shrink-0 items-center justify-center text-xs" aria-hidden>
                  C
                </span>
              )}
              {!Icon && to === '/creators' && (
                <span className="flex size-5 shrink-0 items-center justify-center text-xs" aria-hidden>
                  Cr
                </span>
              )}
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {countKey && (
                <Count
                  variant="default"
                  value={counts[countKey]}
                  className="shrink-0"
                />
              )}
            </NavLink>
          ))}
        </nav>

        <Divider />

        <div className="p-3">
          <div className="rounded-lg bg-[var(--color-background-600)] p-3">
            <p className="m-0 text-xs font-medium text-[var(--color-body-200)]">
              Signed in as
            </p>
            <p className="mt-0.5 truncate text-sm font-medium text-[var(--color-body-100)]">
              Demo User
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
