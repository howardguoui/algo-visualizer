import { createContext, useContext, useState } from 'react'

type ActivePanel = 'notes' | 'chat' | null

interface FloatingPanelContextValue {
  activePanel: ActivePanel
  setActivePanel: (panel: ActivePanel) => void
}

const FloatingPanelContext = createContext<FloatingPanelContextValue | null>(null)

export function FloatingPanelProvider({ children }: { children: React.ReactNode }) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  return (
    <FloatingPanelContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </FloatingPanelContext.Provider>
  )
}

export function useFloatingPanel() {
  const ctx = useContext(FloatingPanelContext)
  if (!ctx) throw new Error('useFloatingPanel must be used within FloatingPanelProvider')
  return ctx
}
