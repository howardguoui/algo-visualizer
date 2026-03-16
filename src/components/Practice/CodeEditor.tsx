import Editor from '@monaco-editor/react'

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
  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Add Ctrl+Enter or Cmd+Enter shortcut
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun()
    })
    
    // Focus the editor automatically
    editor.focus()
  }

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang)
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            <button
              onClick={() => handleLanguageChange('js')}
              className={`px-2.5 py-0.5 text-xs font-medium transition-colors ${
                language === 'js'
                  ? 'bg-yellow-500/20 text-yellow-300 border-r border-slate-700'
                  : 'bg-slate-800 text-slate-500 hover:text-slate-300 border-r border-slate-700'
              }`}
            >
              JS
            </button>
            <button
              onClick={() => handleLanguageChange('python')}
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
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          language={language === 'js' ? 'javascript' : 'python'}
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value ?? '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            lineHeight: 24,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            wordWrap: 'on'
          }}
          loading={
             <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                Loading editor...
             </div>
          }
        />
      </div>
    </div>
  )
}
