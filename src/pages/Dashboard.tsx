import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Avatar,
  Button,
  Count,
  Divider,
  ProgressBar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@fanvue/ui'
import { Card } from '@/components/ui'
import { useData } from '@/context/DataContext'

export function Dashboard() {
  const navigate = useNavigate()
  const { contacts, creators } = useData()
  const [dismissedAlert, setDismissedAlert] = useState(false)
  const recentContacts = [...contacts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5)
  const customers = contacts.filter((c) => c.status === 'customer').length
  const leads = contacts.filter((c) => c.status === 'lead').length
  const pipelinePercent = contacts.length > 0 ? Math.round((customers / contacts.length) * 100) : 0

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="min-w-0">
        <h1 className="m-0 mb-1 text-xl font-semibold tracking-tight text-[var(--color-body-100)] sm:text-2xl">
          Dashboard
        </h1>
        <p className="m-0 text-sm text-[var(--color-body-200)]">
          Overview of your contacts and creators
        </p>
      </div>

      {!dismissedAlert && (
        <Alert
          variant="info"
          title="Welcome to VueCRM"
          closable
          onClose={() => setDismissedAlert(true)}
        >
          Use the header search to find contacts or creators. Add contacts with the button on the
          Contacts page and filter with the status chips.
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col gap-2 p-5">
              <p className="m-0 text-sm font-medium text-[var(--color-body-200)]">
                Total contacts
              </p>
              <Count variant="brand" value={contacts.length} className="text-2xl font-semibold" />
            </Card>
            <Card className="flex flex-col gap-2 p-5">
              <p className="m-0 text-sm font-medium text-[var(--color-body-200)]">
                Total creators
              </p>
              <Count variant="default" value={creators.length} className="text-2xl font-semibold" />
            </Card>
            <Card className="flex flex-col gap-2 p-5">
              <p className="m-0 text-sm font-medium text-[var(--color-body-200)]">Customers</p>
              <Count variant="success" value={customers} className="text-2xl font-semibold" />
            </Card>
            <Card className="flex flex-col gap-2 p-5">
              <p className="m-0 text-sm font-medium text-[var(--color-body-200)]">Leads</p>
              <Count variant="warning" value={leads} className="text-2xl font-semibold" />
            </Card>
          </div>

          <Card className="p-5">
            <ProgressBar
              value={pipelinePercent}
              title="Pipeline (contacts → customers)"
              showCompletion
              helperLeft={`${customers} of ${contacts.length} contacts are customers`}
              variant="generic"
            />
          </Card>

          <Divider />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h2 className="m-0 mb-4 text-base font-semibold text-[var(--color-body-100)]">
                Quick actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="40" onClick={() => navigate('/contacts')}>
                  View contacts
                </Button>
                <Button variant="secondary" size="40" onClick={() => navigate('/creators')}>
                  View creators
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <Card className="p-5">
            <h2 className="m-0 mb-4 text-base font-semibold text-[var(--color-body-100)]">
              Recent contacts
            </h2>
            {recentContacts.length === 0 ? (
              <p className="m-0 text-sm text-[var(--color-body-200)]">No contacts yet.</p>
            ) : (
              <ul className="m-0 list-none p-0">
                {recentContacts.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 border-b border-[var(--color-background-inverse-solid-light)] py-3 last:border-0"
                  >
                    <Avatar size={32} fallback={c.name.slice(0, 2).toUpperCase()} />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-sm font-medium text-[var(--color-body-100)]">
                        {c.name}
                      </p>
                      <p className="m-0 text-xs text-[var(--color-body-200)]">{c.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
