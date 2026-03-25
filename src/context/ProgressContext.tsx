import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

const STORAGE_KEY = 'algo-viz-progress'

interface ProgressState {
  solvedProblemIds: number[]
  readTopicIds: string[]
}

interface ProgressContextValue {
  solvedProblemIds: Set<number>
  readTopicIds: Set<string>
  markSolved: (id: number) => void
  markUnsolved: (id: number) => void
  markTopicRead: (id: string) => void
  clearProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function loadFromStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { solvedProblemIds: [], readTopicIds: [] }
    return JSON.parse(raw)
  } catch {
    return { solvedProblemIds: [], readTopicIds: [] }
  }
}

function saveToStorage(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadFromStorage)

  const markSolved = useCallback((id: number) => {
    setState(prev => {
      if (prev.solvedProblemIds.includes(id)) return prev
      const next = { ...prev, solvedProblemIds: [...prev.solvedProblemIds, id] }
      saveToStorage(next)
      return next
    })
  }, [])

  const markUnsolved = useCallback((id: number) => {
    setState(prev => {
      const next = { ...prev, solvedProblemIds: prev.solvedProblemIds.filter(x => x !== id) }
      saveToStorage(next)
      return next
    })
  }, [])

  const markTopicRead = useCallback((id: string) => {
    setState(prev => {
      if (prev.readTopicIds.includes(id)) return prev
      const next = { ...prev, readTopicIds: [...prev.readTopicIds, id] }
      saveToStorage(next)
      return next
    })
  }, [])

  const clearProgress = useCallback(() => {
    const next: ProgressState = { solvedProblemIds: [], readTopicIds: [] }
    saveToStorage(next)
    setState(next)
  }, [])

  return (
    <ProgressContext.Provider value={{
      solvedProblemIds: new Set(state.solvedProblemIds),
      readTopicIds: new Set(state.readTopicIds),
      markSolved,
      markUnsolved,
      markTopicRead,
      clearProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
