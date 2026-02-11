/**
 * Showcase of @fanvue/ui components for the design system.
 * Used to demo the library while building the CRM.
 */
import { useState } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Count,
  DatePicker,
  Divider,
  IconButton,
  Pagination,
  Pill,
  PlusIcon,
  ProgressBar,
  RadioGroup,
  Radio,
  Slider,
  Snackbar,
  SuccessIcon,
  SwitchField,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Toast,
  ToastProvider,
  ToastViewport,
} from '@fanvue/ui'
import { Card } from '@/components/ui'

function ShowcaseSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[var(--color-body-100)]">{title}</h2>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  )
}

function ToastDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="primary" size="40" onClick={() => setOpen(true)}>
        Show toast
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        variant="success"
        title="Success"
        description="This is a success toast from @fanvue/ui"
        showClose
      />
    </div>
  )
}

export function ComponentsShowcase() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchChecked, setSwitchChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('a')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="m-0 mb-1 text-2xl font-semibold tracking-tight text-[var(--color-body-100)]">
          @fanvue/ui components
        </h1>
        <p className="m-0 text-sm text-[var(--color-body-200)]">
          Design system components used across the CRM
        </p>
      </div>

      <Card className="p-6 space-y-8">
        <ShowcaseSection title="Alert">
          <Alert variant="info" title="Info" closable onClose={() => {}}>
            Use alerts for inline messages and notices.
          </Alert>
          <Alert variant="success" title="Success">
            Contact saved successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review before submitting.
          </Alert>
          <Alert variant="error" title="Error" closable onClose={() => {}}>
            Something went wrong.
          </Alert>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Avatar">
          <Avatar size={24} fallback="A" />
          <Avatar size={32} fallback="B" />
          <Avatar size={40} fallback="JD" />
          <Avatar size={48} fallback="CRM" />
          <Avatar size={64} fallback="FV" />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Badge">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="brand">Brand</Badge>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Button variants">
          <Button variant="primary" size="40">Primary</Button>
          <Button variant="secondary" size="40">Secondary</Button>
          <Button variant="tertiary" size="40">Tertiary</Button>
          <Button variant="link" size="40">Link</Button>
          <Button variant="destructive" size="40">Destructive</Button>
          <Button variant="primary" size="40" leftIcon={<PlusIcon />}>With icon</Button>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Checkbox">
          <Checkbox label="Accept terms" />
          <Checkbox label="Subscribe" defaultChecked />
          <Checkbox size="small" label="Small" helperText="Optional helper" />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Chip">
          <Chip variant="rounded" size="40" selected>Selected</Chip>
          <Chip variant="rounded" size="40">Lead</Chip>
          <Chip variant="rounded" size="40">Customer</Chip>
          <Chip variant="square" size="32">Square</Chip>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Count">
          <Count variant="default" value={42} />
          <Count variant="brand" value={12} />
          <Count variant="success" value={99} max={99} />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="DatePicker">
          <DatePicker
            mode="single"
            onSelect={() => {}}
            showFooter
          />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="IconButton">
          <IconButton variant="primary" size="40" aria-label="Add" icon={<PlusIcon />} />
          <IconButton variant="secondary" size="40" aria-label="Edit" icon={<SuccessIcon />} />
          <IconButton variant="tertiary" size="32" aria-label="More" icon={<PlusIcon />} />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Pagination">
          <Pagination
            totalPages={10}
            currentPage={3}
            onPageChange={() => {}}
          />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Pill">
          <Pill variant="green">Green</Pill>
          <Pill variant="blue">Blue</Pill>
          <Pill variant="brand">Brand</Pill>
          <Pill variant="gold">Gold</Pill>
          <Pill variant="error">Error</Pill>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="ProgressBar">
          <div className="w-full max-w-xs space-y-2">
            <ProgressBar value={75} title="Pipeline" showCompletion />
            <ProgressBar value={40} size="small" variant="generic" stepsLabel="2/5 steps" />
          </div>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="RadioGroup">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </RadioGroup>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Slider">
          <div className="w-64">
            <Slider
              min={0}
              max={100}
              value={sliderValue}
              onValueChange={setSliderValue}
              label="Volume"
              showTooltip
            />
          </div>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Snackbar">
          <Button variant="secondary" size="40" onClick={() => setSnackbarOpen(true)}>
            Open snackbar
          </Button>
          {snackbarOpen && (
            <Snackbar
              variant="default"
              title="Snackbar"
              description="Use for contextual CTAs."
              showActions
              primaryLabel="Done"
              primaryOnClick={() => setSnackbarOpen(false)}
              closable
              onClose={() => setSnackbarOpen(false)}
            />
          )}
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="SwitchField">
          <SwitchField
            label="Email notifications"
            helperText="Get notified when a contact is added"
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
          />
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Tabs">
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview content</TabsContent>
            <TabsContent value="activity">Activity content</TabsContent>
            <TabsContent value="settings">Settings content</TabsContent>
          </Tabs>
        </ShowcaseSection>

        <Divider />

        <ShowcaseSection title="Toast">
          <ToastProvider>
            <ToastDemo />
            <ToastViewport />
          </ToastProvider>
        </ShowcaseSection>
      </Card>
    </div>
  )
}
