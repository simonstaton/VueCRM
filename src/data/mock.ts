export type ContactStatus = 'lead' | 'qualified' | 'customer' | 'churned'

export interface Contact {
  id: string
  name: string
  email: string
  company?: string
  status: ContactStatus
  createdAt: string
}

export type CreatorTier = 'standard' | 'premium' | 'vip'

export interface Creator {
  id: string
  name: string
  handle: string
  avatar?: string
  tier: CreatorTier
  subscribers: number
  joinedAt: string
}

export const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Jordan Lee', email: 'jordan.lee@studio.com', company: 'Studio Co', status: 'customer', createdAt: '2025-02-08' },
  { id: '2', name: 'Sam Rivera', email: 'sam.r@agency.io', company: 'Agency IO', status: 'qualified', createdAt: '2025-02-09' },
  { id: '3', name: 'Alex Chen', email: 'alex.chen@mail.com', status: 'lead', createdAt: '2025-02-10' },
  { id: '4', name: 'Morgan Blake', email: 'morgan@creators.net', company: 'Creators Network', status: 'customer', createdAt: '2025-02-07' },
  { id: '5', name: 'Casey Drew', email: 'casey.d@outlook.com', status: 'lead', createdAt: '2025-02-11' },
]

export const MOCK_CREATORS: Creator[] = [
  { id: 'c1', name: 'Jade Monroe', handle: '@jademonroe', tier: 'vip', subscribers: 125000, joinedAt: '2024-11-01' },
  { id: 'c2', name: 'Riley Fox', handle: '@rileyfox', tier: 'premium', subscribers: 42000, joinedAt: '2025-01-15' },
  { id: 'c3', name: 'Quinn Sterling', handle: '@quinnsterling', tier: 'standard', subscribers: 8800, joinedAt: '2025-02-01' },
  { id: 'c4', name: 'Skyler Vale', handle: '@skylervale', tier: 'premium', subscribers: 67000, joinedAt: '2024-12-10' },
  { id: 'c5', name: 'Parker Reed', handle: '@parkerreed', tier: 'standard', subscribers: 15200, joinedAt: '2025-02-05' },
]

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  customer: 'Customer',
  churned: 'Churned',
}

export const CREATOR_TIER_LABELS: Record<CreatorTier, string> = {
  standard: 'Standard',
  premium: 'Premium',
  vip: 'VIP',
}
