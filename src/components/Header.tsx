import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Avatar,
  Count,
  Divider,
  IconButton,
  InfoCircleIcon,
  Logo,
} from '@fanvue/ui'
import { Input } from '@/components/ui'
import { useTheme } from '@/context/ThemeContext'
import { useState, useCallback } from 'react'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = useState('')

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const q = query.trim()
      if (!q) return
      if (location.pathname === '/contacts') {
        navigate('/contacts', { state: { search: q } })
      } else if (location.pathname === '/creators') {
        navigate('/creators', { state: { search: q } })
      } else {
        navigate('/contacts', { state: { search: q } })
      }
    },
    [query, location.pathname, navigate]
  )

  const showSearch =
    location.pathname === '/' ||
    location.pathname === '/contacts' ||
    location.pathname === '/creators'

  return (
    <header className="sticky top-0 z-30 shrink-0 bg-[var(--color-background-150)] safe-area-inset-top">
      <div className="flex h-14 min-w-0 items-center gap-2 px-3 md:gap-4 md:px-6">
        {onMenuClick && (
          <IconButton
            variant="tertiary"
            size="40"
            aria-label="Open menu"
            icon={<MenuIcon />}
            onClick={onMenuClick}
            className="md:hidden"
          />
        )}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-[var(--color-body-100)] no-underline"
          aria-label="VueCRM home"
        >
          <Logo type="wordmark" color="fullColour" className="h-5 shrink-0 md:h-6" />
          <span className="font-semibold text-base tracking-tight md:text-lg">VueCRM</span>
        </Link>

        {showSearch && (
          <form
            onSubmit={handleSearchSubmit}
            className="min-w-0 flex-1 md:flex md:justify-center md:px-4"
          >
            <Input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-w-0 md:max-w-md"
              aria-label="Search"
            />
          </form>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
          <IconButton
            variant="tertiary"
            size="40"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <div className="relative hidden sm:block">
            <IconButton
              variant="tertiary"
              size="40"
              aria-label="Notifications"
              icon={<InfoCircleIcon />}
            />
            <span className="absolute -right-0.5 -top-0.5">
              <Count variant="brand" value={3} max={99} />
            </span>
          </div>
          <Avatar size={40} fallback="You" className="shrink-0" />
        </div>
      </div>
      <Divider />
    </header>
  )
}
