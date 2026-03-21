import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  // Auto-close sidebar on mobile when navigating to a new route
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile backdrop — clicking outside closes the drawer */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar
            Mobile:  absolute overlay on the left, slides over content
            Desktop: static inline flex item */}
        <div
          className={`
            absolute md:relative inset-y-0 left-0 z-30 md:z-auto
            ${sidebarOpen ? 'block' : 'hidden'}
          `}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
