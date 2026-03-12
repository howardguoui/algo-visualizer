import type { TestCase } from '../data/problems/practiceProblems'
import type { TestResult } from '../components/Practice/TestPanel'

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _pyodide: any = null
let _loadPromise: Promise<any> | null = null

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide: (config: { indexURL: string }) => Promise<any>
  }
}

export function isPyodideReady(): boolean {
  return _pyodide !== null
}

/** Start loading Pyodide in the background (call when user selects Python). */
export function preloadPyodide(): Promise<unknown> {
  if (_pyodide) return Promise.resolve(_pyodide)
  if (_loadPromise) return _loadPromise

  _loadPromise = new Promise<unknown>((resolve, reject) => {
    const existing = document.querySelector('script[src*="pyodide.js"]')

    const onScriptReady = async () => {
      try {
        _pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN })
        resolve(_pyodide)
      } catch (e) {
        _loadPromise = null
        reject(e)
      }
    }

    if (existing) {
      // Script already injected — may already be loaded
      if (typeof window.loadPyodide === 'function') onScriptReady()
      else existing.addEventListener('load', onScriptReady)
      return
    }

    const script = document.createElement('script')
    script.src = PYODIDE_CDN + 'pyodide.js'
    script.onload = onScriptReady
    script.onerror = () => {
      _loadPromise = null
      reject(new Error('Failed to load Pyodide from CDN.'))
    }
    document.head.appendChild(script)
  })

  return _loadPromise
}

/**
 * Build a Python harness that:
 * - Accepts user code (Solution class or plain function)
 * - Runs it with JSON-serialised args
 * - Returns the result as a JSON string (last expression)
 */
function buildHarness(userCode: string, args: unknown[]): string {
  const argsJson = JSON.stringify(args)
  const argsLiteral = JSON.stringify(argsJson)  // double-encoded for embedding

  const jsonSetup = `import json as _j`
  const argsParse = `_a = _j.loads(${argsLiteral})`
  const resultLine = `_j.dumps(_r)`

  if (/class\s+Solution\s*:/.test(userCode)) {
    // Find first non-__init__ method
    const m = userCode.match(/def\s+(?!__init__)(\w+)\s*\(\s*self/)
    if (!m) throw new Error('No method found in Solution class. Add a method (other than __init__).')
    const method = m[1]
    return [jsonSetup, userCode, argsParse, `_r = Solution().${method}(*_a)`, resultLine].join('\n')
  }

  // Plain function
  const m = userCode.match(/def\s+(\w+)\s*\(/)
  if (!m) throw new Error('No function definition found. Write a function starting with "def".')
  const fn = m[1]
  return [jsonSetup, userCode, argsParse, `_r = ${fn}(*_a)`, resultLine].join('\n')
}

export interface PyResult {
  result?: unknown
  error?: string
  time: number
}

export async function runPythonCode(userCode: string, args: unknown[]): Promise<PyResult> {
  const start = performance.now()
  try {
    const py = await preloadPyodide()
    const harness = buildHarness(userCode, args)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultStr = await (py as any).runPythonAsync(harness) as string
    const result = JSON.parse(resultStr)
    return { result, time: performance.now() - start }
  } catch (e) {
    const msg = String(e)
    // Extract just the Python traceback (after "PythonError: Traceback...")
    const pyMatch = msg.match(/PythonError:\s*([\s\S]+)/)
    return { error: pyMatch ? pyMatch[1].trim() : msg, time: performance.now() - start }
  }
}

export async function evaluatePythonTestCases(
  userCode: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  const results: TestResult[] = []
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const { result, error, time } = await runPythonCode(userCode, tc.args)
    if (error) {
      results.push({ caseIndex: i, passed: false, result: undefined, expected: tc.expected, error, time })
    } else {
      const passed = JSON.stringify(result) === JSON.stringify(tc.expected)
      results.push({ caseIndex: i, passed, result, expected: tc.expected, time })
    }
  }
  return results
}
