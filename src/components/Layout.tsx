import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background-200)]">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 overflow-auto p-4 text-[var(--color-body-100)] md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
