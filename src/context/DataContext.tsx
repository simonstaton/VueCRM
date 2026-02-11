import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import {
  MOCK_CONTACTS,
  MOCK_CREATORS,
  type Contact,
  type Creator,
} from '@/data/mock'

type DataContextValue = {
  contacts: Contact[]
  creators: Creator[]
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void
  addCreator: (creator: Omit<Creator, 'id' | 'joinedAt'>) => void
}

const DataContext = createContext<DataContextValue | null>(null)

function nextId(prefix: string, existing: { id: string }[]) {
  const max = existing.reduce((n, c) => {
    const num = parseInt(prefix ? c.id.replace(prefix, '') : c.id, 10)
    return Number.isNaN(num) ? n : Math.max(n, num)
  }, 0)
  return prefix ? `${prefix}${max + 1}` : String(max + 1)
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS)
  const [creators, setCreators] = useState<Creator[]>(MOCK_CREATORS)

  const addContact = useCallback((contact: Omit<Contact, 'id' | 'createdAt'>) => {
    setContacts((prev) => [
      ...prev,
      {
        ...contact,
        id: nextId('', prev as { id: string }[]),
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ])
  }, [])

  const addCreator = useCallback((creator: Omit<Creator, 'id' | 'joinedAt'>) => {
    setCreators((prev) => [
      ...prev,
      {
        ...creator,
        id: nextId('c', prev),
        joinedAt: new Date().toISOString().slice(0, 10),
      },
    ])
  }, [])

  return (
    <DataContext.Provider
      value={{
        contacts,
        creators,
        addContact,
        addCreator,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
