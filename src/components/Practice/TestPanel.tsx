import { useState } from 'react'
import type { TestCase } from '../../data/problems/practiceProblems'
import { AlgoVisualizer } from './AlgoVisualizer'
import { isPyodideReady } from '../../utils/pythonRunner'
import type { Language } from './CodeEditor'
import { AITutorPanel } from './AITutorPanel'
import { useTheme } from '../../context/ThemeContext'

export interface TestResult {
  caseIndex: number
  passed: boolean
  result: unknown
  expected: unknown
  error?: string
  time: number
}

interface Props {
  testCases: TestCase[]
  results: TestResult[]
  problemId: number
  hasRun: boolean
  language: Language
  isRunning: boolean
  problemTitle?: string
  problemDescription?: string
  userCode?: string
}

function formatValue(v: unknown): string {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return `"${v}"`
  return JSON.stringify(v)
}

function ResultBadge({ passed, error, theme }: { passed?: boolean; error?: string; theme: string }) {
  if (error) return <span className={`text-xs px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-red-900/40 text-red-400 border-red-800' : 'bg-red-100 text-red-700 border-red-200'}`}>Error</span>
  if (passed === undefined) return <span className={`text-xs px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>Pending</span>
  return passed
    ? <span className={`text-xs px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-green-900/40 text-green-400 border-green-800' : 'bg-green-100 text-green-700 border-green-200'}`}>✓ Passed</span>
    : <span className={`text-xs px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-red-900/40 text-red-400 border-red-800' : 'bg-red-100 text-red-700 border-red-200'}`}>✗ Failed</span>
}

function checkDeepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function runCode(userCode: string, args: unknown[]): { result?: unknown; error?: string; time: number } {
  const start = performance.now()
  try {
    // Prefer explicit `function solve` adapter (used for tree/LL problems)
    const solveMatch = userCode.match(/function\s+(solve)\s*\(/)
    const fnMatch = solveMatch || userCode.match(/function\s+(\w+)\s*\(/)
    if (!fnMatch) return { error: 'No function definition found. Write a named function.', time: 0 }
    const fnName = fnMatch[1]
    // eslint-disable-next-line no-new-func
    const fn = new Function(`${userCode}\nreturn ${fnName}`)() as (...a: unknown[]) => unknown
    const result = fn(...args)
    return { result, time: performance.now() - start }
  } catch (e) {
    return { error: String(e), time: performance.now() - start }
  }
}

export function evaluateTestCases(userCode: string, testCases: TestCase[]): TestResult[] {
  return testCases.map((tc, i) => {
    const { result, error, time } = runCode(userCode, tc.args)
    if (error) return { caseIndex: i, passed: false, result: undefined, expected: tc.expected, error, time }
    const passed = checkDeepEqual(result, tc.expected)
    return { caseIndex: i, passed, result, expected: tc.expected, time }
  })
}

export function TestPanel({ testCases, results, hasRun, problemId, language, isRunning, problemTitle, problemDescription, userCode }: Props) {
  const [tab, setTab] = useState<'cases' | 'results' | 'visualize'>('cases')
  const [selectedCase, setSelectedCase] = useState(0)
  const { theme } = useTheme()

  const passCount = results.filter(r => r.passed).length
  const allPassed = hasRun && passCount === results.length

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className={`flex items-center border-b shrink-0 px-2 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200 bg-white'}`}>
        {(['cases', 'results', 'visualize'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? `border-blue-500 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`
                : `border-transparent ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            {t === 'cases' ? 'Test Cases' : t === 'results' ? 'Results' : '⚡ Visualize'}
            {t === 'results' && hasRun && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded font-bold ${
                allPassed
                  ? (theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700')
                  : (theme === 'dark' ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700')
              }`}>
                {passCount}/{results.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Visualize tab renders full-height without inner scroll */}
      {tab === 'visualize' && (
        <div className="flex-1 overflow-hidden">
          <AlgoVisualizer problemId={problemId} />
        </div>
      )}

      <div className={`flex-1 overflow-y-auto p-3 custom-scrollbar ${tab === 'visualize' ? 'hidden' : ''} ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {tab === 'cases' && (
          <div>
            {/* Case selector tabs */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {testCases.map((_tc, i) => {
                const res = results[i]
                const dot = !hasRun ? '' : res?.passed ? '✓' : res?.error ? '!' : '✗'
                const dotColor = !hasRun ? '' : res?.passed ? 'text-green-400' : 'text-red-400'
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedCase(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedCase === i
                        ? (theme === 'dark' ? 'bg-slate-700 border-slate-500 text-white' : 'bg-white border-gray-400 text-gray-900 shadow-sm')
                        : (theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-gray-100 border-gray-200 text-gray-500 hover:border-gray-300')
                    }`}
                  >
                    {dot && <span className={`text-xs ${dotColor}`}>{dot}</span>}
                    Case {i + 1}
                  </button>
                )
              })}
            </div>

            {/* Selected case detail */}
            {testCases[selectedCase] && (
              <div className="space-y-2">
                <div className={`rounded-lg border p-3 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className={`text-xs mb-1 font-medium uppercase tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Input</div>
                  <pre className={`text-sm font-mono whitespace-pre-wrap ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                    {testCases[selectedCase].args.map((a, i) => (
                      `arg${i + 1} = ${formatValue(a)}`
                    )).join('\n')}
                  </pre>
                </div>
                <div className={`rounded-lg border p-3 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className={`text-xs mb-1 font-medium uppercase tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Expected Output</div>
                  <pre className={`text-sm font-mono ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>{formatValue(testCases[selectedCase].expected)}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'results' && (
          <div>
            {language === 'python' && isRunning && !isPyodideReady() && (
              <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg bg-blue-900/20 border border-blue-800 text-blue-300 text-xs">
                <span className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin shrink-0" />
                Loading Python runtime (Pyodide ~8MB) — first run takes a moment…
              </div>
            )}
            {!hasRun ? (
              <div className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                <div className="text-3xl mb-2">▶</div>
                Click <strong className={theme === 'dark' ? 'text-slate-400' : 'text-gray-700'}>Run</strong> to execute your code against all test cases.
              </div>
            ) : (
              <div className="space-y-2">
                {/* Summary bar */}
                <div className={`flex items-center gap-2 p-3 rounded-lg border mb-3 ${
                  allPassed
                    ? (theme === 'dark' ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-green-50 border-green-200 text-green-700')
                    : (theme === 'dark' ? 'bg-red-900/20 border-red-800 text-red-400' : 'bg-red-50 border-red-200 text-red-700')
                }`}>
                  <span className="text-lg">{allPassed ? '🎉' : '❌'}</span>
                  <span className="font-semibold text-sm">
                    {allPassed ? 'All tests passed!' : `${passCount} of ${results.length} tests passed`}
                  </span>
                </div>

                {/* AI Tutor Panel injection */}
                {(() => {
                  if (allPassed || !problemTitle || !userCode) return null;
                  const firstFail = results.find(r => !r.passed);
                  if (!firstFail) return null;
                  
                  return (
                    <AITutorPanel
                      problemTitle={problemTitle}
                      problemDescription={problemDescription || ''}
                      userCode={userCode}
                      language={language}
                      failingTestInput={testCases[firstFail.caseIndex].args.map(a => formatValue(a)).join(', ')}
                      failingTestExpected={formatValue(firstFail.expected)}
                      failingTestActual={formatValue(firstFail.result) || (firstFail.error ?? 'Unknown error')}
                    />
                  )
                })()}

                {results.map((res, i) => (
                  <div key={i} className={`rounded-lg border p-3 ${
                    res.passed
                      ? (theme === 'dark' ? 'bg-green-900/10 border-green-900' : 'bg-white border-green-200 shadow-sm')
                      : (theme === 'dark' ? 'bg-red-900/10 border-red-900' : 'bg-white border-red-200 shadow-sm')
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>{testCases[i]?.label ?? `Case ${i + 1}`}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono border-none ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>{res.time.toFixed(2)}ms</span>
                        <ResultBadge passed={res.passed} error={res.error} theme={theme} />
                      </div>
                    </div>

                    {res.error ? (
                      <pre className={`text-xs font-mono p-2 rounded overflow-x-auto whitespace-pre-wrap ${theme === 'dark' ? 'text-red-400 bg-red-900/20' : 'text-red-700 bg-red-50'}`}>
                        {res.error}
                      </pre>
                    ) : !res.passed ? (
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className={theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}>Expected: </span>
                          <span className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{formatValue(res.expected)}</span>
                        </div>
                        <div>
                          <span className={theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}>Got: </span>
                          <span className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}>{formatValue(res.result)}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
