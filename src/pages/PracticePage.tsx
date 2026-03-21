import { useState, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getPracticeProblem } from '../data/problems/practiceProblems'
import { ProblemDescription } from '../components/Practice/ProblemDescription'
import { CodeEditor } from '../components/Practice/CodeEditor'
import type { Language } from '../components/Practice/CodeEditor'
import { TestPanel, evaluateTestCases } from '../components/Practice/TestPanel'
import type { TestResult } from '../components/Practice/TestPanel'
import { evaluatePythonTestCases, preloadPyodide } from '../utils/pythonRunner'
import { useLang } from '../context/LangContext'
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { useTheme } from '../context/ThemeContext'
import { NoteDrawer } from '../components/Notes/NoteDrawer'

export function PracticePage() {
  const { problemId } = useParams<{ problemId: string }>()
  const { lang } = useLang()
  const { theme, toggleTheme } = useTheme()

  const id = Number(problemId)
  const problem = getPracticeProblem(id)

  const [language, setLanguage] = useState<Language>('js')
  const [code, setCode] = useState(() => problem?.starterCode ?? '')
  const [results, setResults] = useState<TestResult[]>([])
  const [hasRun, setHasRun] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const handleLanguageChange = useCallback((lang: Language) => {
    if (!problem) return
    setLanguage(lang)
    setCode(lang === 'python' ? (problem.starterCodePython ?? problem.starterCode) : problem.starterCode)
    setResults([])
    setHasRun(false)
    // Kick off Pyodide download in background when user selects Python
    if (lang === 'python') preloadPyodide()
  }, [problem])

  const handleRun = useCallback(async () => {
    if (!problem) return
    setIsRunning(true)
    try {
      let res: TestResult[]
      if (language === 'python') {
        res = await evaluatePythonTestCases(code, problem.testCases)
      } else {
        // Defer to let UI update (show spinner) before synchronous execution
        res = await new Promise<TestResult[]>(resolve =>
          setTimeout(() => resolve(evaluateTestCases(code, problem.testCases)), 50)
        )
      }
      setResults(res)
      setHasRun(true)
    } finally {
      setIsRunning(false)
    }
  }, [code, problem, language])

  const handleReset = useCallback(() => {
    if (!problem) return
    setCode(language === 'python' ? (problem.starterCodePython ?? problem.starterCode) : problem.starterCode)
    setResults([])
    setHasRun(false)
  }, [problem, language])

  if (!problem) return <Navigate to="/problems" />

  const allPassed = hasRun && results.length > 0 && results.every(r => r.passed)
  const passCount = results.filter(r => r.passed).length
  const title = lang === 'zh' ? problem.titleZh : problem.title

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top bar */}
      <header className={`flex items-center gap-3 px-4 py-2.5 shrink-0 border-b ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <Link
          to="/problems"
          className={`flex items-center gap-1.5 transition-colors text-sm no-underline ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Problems
        </Link>

        <span className={theme === 'dark' ? 'text-slate-700' : 'text-gray-300'}>|</span>

        <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} font-mono text-sm`}>#{problem.id}</span>
        <span className={`font-semibold text-sm truncate max-w-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</span>

        {/* Run status */}
        {hasRun && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
            allPassed
              ? 'bg-green-900/50 text-green-400'
              : 'bg-slate-800 text-slate-400'
          }`}>
            {passCount}/{problem.testCases.length} passed
          </span>
        )}

        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggleTheme} className={`p-1.5 rounded transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`} title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            onClick={handleReset}
            title="Reset to starter code"
            className={`transition-colors p-1.5 rounded ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>

          <a
            href={`https://leetcode.com/problems/${problem.leetcodeSlug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 text-xs font-medium rounded-lg border border-orange-700/40 transition-colors no-underline"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            LeetCode
          </a>
        </div>
      </header>

      {/* Main split layout using React Resizable Panels */}
      <PanelGroup orientation="horizontal" className="flex-1 overflow-hidden">
        {/* Left panel — problem description */}
        <Panel defaultSize={50} minSize={20} className="flex flex-col overflow-hidden">
          <ProblemDescription problem={problem} />
        </Panel>

        <PanelResizeHandle className={`w-1.5 transition-colors cursor-col-resize hover:bg-blue-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />

        {/* Right panel — editor + test results */}
        <Panel defaultSize={50} minSize={30} className="flex flex-col overflow-hidden">
          <PanelGroup orientation="vertical">
            {/* Code editor */}
            <Panel defaultSize={50} minSize={20} className="flex flex-col overflow-hidden">
              <CodeEditor
                code={code}
                onChange={setCode}
                onRun={handleRun}
                isRunning={isRunning}
                language={language}
                onLanguageChange={handleLanguageChange}
              />
            </Panel>

            <PanelResizeHandle className={`h-1.5 transition-colors cursor-row-resize hover:bg-blue-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />

            {/* Test panel */}
            <Panel defaultSize={50} minSize={20} className="flex flex-col overflow-hidden">
              <TestPanel
                testCases={problem.testCases}
                results={results}
                hasRun={hasRun}
                problemId={problem.id}
                language={language}
                isRunning={isRunning}
                problemTitle={title}
                problemDescription={problem.description}
                userCode={code}
              />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>

      {/* Notes canvas */}
      <NoteDrawer />
    </div>
  )
}
