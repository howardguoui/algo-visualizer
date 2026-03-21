import { lazy, Suspense, useState } from 'react'
import { useLang } from '../../context/LangContext'

// tldraw is large (~500 KB gz) — lazy-load so it never hits the main bundle
const TldrawCanvas = lazy(() => import('./TldrawCanvas'))

interface Props {
  topicId: string
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-full gap-2 text-gray-400 dark:text-slate-500">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span className="text-sm">Loading canvas…</span>
    </div>
  )
}

export function NoteDrawer({ topicId }: Props) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── FAB toggle button ──────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? t('Close notes', '关闭笔记') : t('Open notes', '打开笔记')}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        {open ? (
          /* X — close */
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          /* Pencil — open */
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        )}
      </button>

      {/* ── Mobile backdrop ────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Drawer ────────────────────────────────────────────────────────── */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50
          w-full sm:w-[520px]
          bg-white dark:bg-slate-900
          border-l border-gray-200 dark:border-slate-800
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-500">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">
              {t('Notes', '笔记')}
            </span>
            <span className="text-xs text-gray-400 dark:text-slate-500">
              — {t('draw, type, or sketch anything', '绘图、文字、随意记录')}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Canvas — only mount tldraw when drawer is open */}
        <div className="flex-1 overflow-hidden">
          {open && (
            <Suspense fallback={<Spinner />}>
              <TldrawCanvas persistenceKey={`note-${topicId}`} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  )
}
