import { useRef, useEffect } from 'react'

export type Language = 'js' | 'python'

interface Props {
  code: string
  onChange: (code: string) => void
  onRun: () => void
  isRunning: boolean
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function CodeEditor({ code, onChange, onRun, isRunning, language, onLanguageChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineCountRef = useRef<HTMLDivElement>(null)

  const lineCount = code.split('\n').length

  // Sync scroll between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineCountRef.current) {
      lineCountRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab → indent (2 spaces for JS, 4 for Python)
    if (e.key === 'Tab') {
      e.preventDefault()
      const spaces = language === 'python' ? '    ' : '  '
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const newVal = code.substring(0, start) + spaces + code.substring(end)
      onChange(newVal)
      requestAnimationFrame(() => {
        el.selectionStart = start + spaces.length
        el.selectionEnd = start + spaces.length
      })
    }
    // Ctrl/Cmd + Enter → run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onRun()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            <button
              onClick={() => onLanguageChange('js')}
              className={`px-2.5 py-0.5 text-xs font-medium transition-colors ${
                language === 'js'
                  ? 'bg-yellow-500/20 text-yellow-300 border-r border-slate-700'
                  : 'bg-slate-800 text-slate-500 hover:text-slate-300 border-r border-slate-700'
              }`}
            >
              JS
            </button>
            <button
              onClick={() => onLanguageChange('python')}
              className={`px-2.5 py-0.5 text-xs font-medium transition-colors ${
                language === 'python'
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              Python
            </button>
          </div>
          <span className="text-xs text-slate-600">Ctrl+Enter to run</span>
        </div>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {isRunning ? (
            <>
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {language === 'python' ? 'Loading...' : 'Running...'}
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M8 5v14l11-7z"/></svg>
              Run
            </>
          )}
        </button>
      </div>

      {/* Editor area */}
      <div className="flex flex-1 overflow-hidden font-mono text-sm">
        {/* Line numbers */}
        <div
          ref={lineCountRef}
          className="select-none overflow-hidden shrink-0 w-10 bg-slate-950 text-slate-600 text-right pr-3 pt-3 text-xs leading-6"
          style={{ overflowY: 'hidden' }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          className="flex-1 bg-slate-950 text-slate-100 resize-none outline-none pt-3 pr-4 pb-3 pl-2 leading-6 caret-white text-sm"
          style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace" }}
        />
      </div>
    </div>
  )
}
