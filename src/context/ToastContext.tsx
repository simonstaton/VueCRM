import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { Toast, ToastProvider, ToastViewport } from '@fanvue/ui'

type ToastVariant = 'info' | 'warning' | 'success' | 'error' | 'messageToast'

type ToastContextValue = {
  showToast: (options: { title: string; description?: string; variant?: ToastVariant }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProviderWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [variant, setVariant] = useState<ToastVariant>('success')

  const showToast = useCallback(
    (options: { title: string; description?: string; variant?: ToastVariant }) => {
      setTitle(options.title)
      setDescription(options.description)
      setVariant(options.variant ?? 'success')
      setOpen(true)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastProvider>
        {children}
        <Toast
          open={open}
          onOpenChange={setOpen}
          variant={variant}
          title={title}
          description={description}
          showClose
        />
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProviderWrapper')
  return ctx
}
