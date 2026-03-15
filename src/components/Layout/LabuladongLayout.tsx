import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LabuladongSidebar } from './LabuladongSidebar'

export function LabuladongLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="flex flex-1 overflow-hidden">
        <LabuladongSidebar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
