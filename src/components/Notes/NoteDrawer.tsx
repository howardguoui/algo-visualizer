import { lazy, Suspense, useRef } from 'react'
import type { Editor } from 'tldraw'
import { exportAs } from 'tldraw'
import { useLocation } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useFloatingPanel } from '../../context/FloatingPanelContext'

// tldraw is large (~500 KB gz) — lazy-load so it never hits the main bundle
const TldrawCanvas = lazy(() => import('./TldrawCanvas'))

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

export function NoteDrawer() {
  const { t } = useLang()
  const { activePanel, setActivePanel } = useFloatingPanel()
  const location = useLocation()
  const open = activePanel === 'notes'
  const editorRef = useRef<Editor | null>(null)

  // Use the current pathname as a unique key so each route has its own canvas
  const pageKey = location.pathname.replace(/\//g, '-').replace(/^-/, '') || 'home'

  const handleOpen = () => setActivePanel('notes')
  const handleClose = () => setActivePanel(null)

  const handleSave = () => {
    const editor = editorRef.current
    if (!editor) return
    const snapshot = editor.getSnapshot()
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `notes-${pageKey}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    const editor = editorRef.current
    if (!editor) return
    const ids = [...editor.getCurrentPageShapeIds()]
    if (ids.length === 0) return
    await exportAs(editor, ids, { format: 'png', name: `notes-${pageKey}` })
  }

  // Hide FAB when chat panel is active
  if (activePanel === 'chat') return null

  return (
    <>
      {/* ── FAB toggle button ──────────────────────────────────────────────── */}
      {!open && (
        <button
          onClick={handleOpen}
          title={t('Open notes', '打开笔记')}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      )}

      {/* ── Mobile backdrop ────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={handleClose}
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
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {/* Save JSON */}
            <button
              onClick={handleSave}
              title={t('Save as JSON', '保存为 JSON')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
              </svg>
              {t('Save', '保存')}
            </button>

            {/* Export PNG */}
            <button
              onClick={handleExport}
              title={t('Export as PNG', '导出为 PNG')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              PNG
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Canvas — only mount tldraw when drawer is open */}
        <div className="flex-1 overflow-hidden">
          {open && (
            <Suspense fallback={<Spinner />}>
              <TldrawCanvas
                persistenceKey={`note-${pageKey}`}
                onEditorMount={editor => { editorRef.current = editor }}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  )
}
