import Editor from '@monaco-editor/react'
import { useTheme } from '../../context/ThemeContext'

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
  const { theme } = useTheme()
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
    <div className={`flex flex-col h-full ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Editor toolbar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b shrink-0 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className={`flex rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
            <button
              onClick={() => handleLanguageChange('js')}
              className={`px-2.5 py-0.5 text-xs font-medium transition-colors ${
                language === 'js'
                  ? (theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300 border-r border-slate-700' : 'bg-yellow-100 text-yellow-700 border-r border-gray-200')
                  : (theme === 'dark' ? 'bg-slate-800 text-slate-500 hover:text-slate-300 border-r border-slate-700' : 'bg-gray-50 text-gray-500 hover:text-gray-700 border-r border-gray-200')
              }`}
            >
              JS
            </button>
            <button
              onClick={() => handleLanguageChange('python')}
              className={`px-2.5 py-0.5 text-xs font-medium transition-colors ${
                language === 'python'
                  ? (theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700')
                  : (theme === 'dark' ? 'bg-slate-800 text-slate-500 hover:text-slate-300' : 'bg-gray-50 text-gray-500 hover:text-gray-700')
              }`}
            >
              Python
            </button>
          </div>
          <span className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`}>Ctrl+Enter to run</span>
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
          theme={theme === 'dark' ? "vs-dark" : "light"}
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
