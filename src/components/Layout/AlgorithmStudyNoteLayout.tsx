import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { AlgorithmStudyNoteSidebar } from './AlgorithmStudyNoteSidebar'

export function AlgorithmStudyNoteLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="flex flex-1 overflow-hidden">
        <AlgorithmStudyNoteSidebar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
