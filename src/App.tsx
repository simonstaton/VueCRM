import { Routes, Route } from 'react-router-dom'
import { DataProvider } from '@/context/DataContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProviderWrapper } from '@/context/ToastContext'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Contacts } from '@/pages/Contacts'
import { Creators } from '@/pages/Creators'
import { ComponentsShowcase } from '@/pages/ComponentsShowcase'

function App() {
  return (
    <ThemeProvider>
      <ToastProviderWrapper>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="creators" element={<Creators />} />
              <Route path="components" element={<ComponentsShowcase />} />
            </Route>
          </Routes>
        </DataProvider>
      </ToastProviderWrapper>
    </ThemeProvider>
  )
}

export default App
