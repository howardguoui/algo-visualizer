import { useState } from 'react'
import type { TestCase } from '../../data/problems/practiceProblems'
import { AlgoVisualizer } from './AlgoVisualizer'
import { isPyodideReady } from '../../utils/pythonRunner'
import type { Language } from './CodeEditor'

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
}

function formatValue(v: unknown): string {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return `"${v}"`
  return JSON.stringify(v)
}

function ResultBadge({ passed, error }: { passed?: boolean; error?: string }) {
  if (error) return <span className="text-xs px-2 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-800">Error</span>
  if (passed === undefined) return <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">Pending</span>
  return passed
    ? <span className="text-xs px-2 py-0.5 rounded bg-green-900/40 text-green-400 border border-green-800">✓ Passed</span>
    : <span className="text-xs px-2 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-800">✗ Failed</span>
}

function checkDeepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function runCode(userCode: string, args: unknown[]): { result?: unknown; error?: string; time: number } {
  const start = performance.now()
  try {
    const fnMatch = userCode.match(/function\s+(\w+)\s*\(/)
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

export function TestPanel({ testCases, results, hasRun, problemId, language, isRunning }: Props) {
  const [tab, setTab] = useState<'cases' | 'results' | 'visualize'>('cases')
  const [selectedCase, setSelectedCase] = useState(0)

  const passCount = results.filter(r => r.passed).length
  const allPassed = hasRun && passCount === results.length

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex items-center border-b border-slate-800 shrink-0 px-2">
        {(['cases', 'results', 'visualize'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'text-white border-blue-500'
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            {t === 'cases' ? 'Test Cases' : t === 'results' ? 'Results' : '⚡ Visualize'}
            {t === 'results' && hasRun && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded font-bold ${allPassed ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
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

      <div className={`flex-1 overflow-y-auto p-3 ${tab === 'visualize' ? 'hidden' : ''}`}>
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
                        ? 'bg-slate-700 border-slate-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
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
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-3">
                  <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Input</div>
                  <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap">
                    {testCases[selectedCase].args.map((a, i) => (
                      `arg${i + 1} = ${formatValue(a)}`
                    )).join('\n')}
                  </pre>
                </div>
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-3">
                  <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Expected Output</div>
                  <pre className="text-sm text-green-300 font-mono">{formatValue(testCases[selectedCase].expected)}</pre>
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
              <div className="text-center py-8 text-slate-500 text-sm">
                <div className="text-3xl mb-2">▶</div>
                Click <strong className="text-slate-400">Run</strong> to execute your code against all test cases.
              </div>
            ) : (
              <div className="space-y-2">
                {/* Summary bar */}
                <div className={`flex items-center gap-2 p-3 rounded-lg border mb-3 ${
                  allPassed
                    ? 'bg-green-900/20 border-green-800 text-green-400'
                    : 'bg-red-900/20 border-red-800 text-red-400'
                }`}>
                  <span className="text-lg">{allPassed ? '🎉' : '❌'}</span>
                  <span className="font-semibold text-sm">
                    {allPassed ? 'All tests passed!' : `${passCount} of ${results.length} tests passed`}
                  </span>
                </div>

                {results.map((res, i) => (
                  <div key={i} className={`rounded-lg border p-3 ${
                    res.passed
                      ? 'bg-green-900/10 border-green-900'
                      : 'bg-red-900/10 border-red-900'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">{testCases[i]?.label ?? `Case ${i + 1}`}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">{res.time.toFixed(2)}ms</span>
                        <ResultBadge passed={res.passed} error={res.error} />
                      </div>
                    </div>

                    {res.error ? (
                      <pre className="text-xs text-red-400 font-mono bg-red-900/20 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {res.error}
                      </pre>
                    ) : !res.passed ? (
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-slate-500">Expected: </span>
                          <span className="text-green-400">{formatValue(res.expected)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Got: </span>
                          <span className="text-red-400">{formatValue(res.result)}</span>
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
