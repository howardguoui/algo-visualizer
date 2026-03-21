import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { SAMPLE_DB_SQL, DB_SCHEMA } from '../data/sqlSandbox/sampleDatabase'
import { exercises, DIFFICULTY_COLORS } from '../data/sqlSandbox/exercises'
import type { Exercise } from '../data/sqlSandbox/exercises'

// ─── Types ───────────────────────────────────────────────────────────────────
interface QueryResult {
  columns: string[]
  rows: unknown[][]
  rowCount: number
  timeMs: number
}

interface SqlError {
  message: string
}

// ─── DB dialect comparison data ──────────────────────────────────────────────
const DIALECT_COMPARISON = [
  {
    feature: 'Get current date/time',
    sqlite:     'SELECT date(\'now\')  /  datetime(\'now\')',
    postgresql: 'SELECT CURRENT_DATE  /  NOW()',
    mysql:      'SELECT CURDATE()  /  NOW()',
    oracle:     'SELECT TRUNC(SYSDATE)  /  SYSDATE  FROM DUAL',
  },
  {
    feature: 'Limit rows returned',
    sqlite:     'SELECT … LIMIT 10',
    postgresql: 'SELECT … LIMIT 10',
    mysql:      'SELECT … LIMIT 10',
    oracle:     'FETCH FIRST 10 ROWS ONLY  (12c+)\nor WHERE ROWNUM <= 10 (legacy)',
  },
  {
    feature: 'Pagination (rows 11–20)',
    sqlite:     'LIMIT 10 OFFSET 10',
    postgresql: 'LIMIT 10 OFFSET 10',
    mysql:      'LIMIT 10 OFFSET 10',
    oracle:     'OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY',
  },
  {
    feature: 'String concatenation',
    sqlite:     "|| operator:  'Hello' || ' ' || 'World'",
    postgresql: "|| operator  or  CONCAT()",
    mysql:      "CONCAT('Hello', ' ', 'World')",
    oracle:     "|| operator  (native SQL, preferred)",
  },
  {
    feature: 'Auto-increment primary key',
    sqlite:     'INTEGER PRIMARY KEY  (auto-assigns rowid)',
    postgresql: 'SERIAL  or  GENERATED ALWAYS AS IDENTITY',
    mysql:      'INT AUTO_INCREMENT',
    oracle:     'NUMBER GENERATED ALWAYS AS IDENTITY  (12c+)\nor SEQUENCE + TRIGGER (legacy)',
  },
  {
    feature: 'NULL replacement',
    sqlite:     'COALESCE(col, default)  or  IFNULL(col, default)',
    postgresql: 'COALESCE(col, default)',
    mysql:      'COALESCE(col, default)  or  IFNULL(col, default)',
    oracle:     'NVL(col, default)  or  COALESCE()',
  },
  {
    feature: 'Conditional expression',
    sqlite:     'CASE WHEN … THEN … ELSE … END',
    postgresql: 'CASE WHEN … THEN … ELSE … END',
    mysql:      'CASE WHEN … THEN … ELSE … END  or  IF(cond, a, b)',
    oracle:     'CASE WHEN … THEN … ELSE … END  or  DECODE()',
  },
  {
    feature: 'String length',
    sqlite:     'LENGTH(str)',
    postgresql: 'LENGTH(str)  or  CHAR_LENGTH(str)',
    mysql:      'LENGTH(str)  or  CHAR_LENGTH(str)',
    oracle:     'LENGTH(str)',
  },
  {
    feature: 'Substring',
    sqlite:     "SUBSTR(str, start, len)  — 1-based",
    postgresql: "SUBSTRING(str FROM start FOR len)  or  SUBSTR()",
    mysql:      "SUBSTRING(str, start, len)  or  SUBSTR()",
    oracle:     "SUBSTR(str, start, len)  — 1-based",
  },
  {
    feature: 'Hierarchical queries',
    sqlite:     'Recursive CTE:  WITH RECURSIVE cte AS ( … UNION ALL … )',
    postgresql: 'Recursive CTE:  WITH RECURSIVE cte AS ( … UNION ALL … )',
    mysql:      'Recursive CTE (MySQL 8+):  WITH RECURSIVE …',
    oracle:     'CONNECT BY PRIOR  (legacy, unique to Oracle)\nor Recursive CTE (12c+)',
  },
  {
    feature: 'Window functions',
    sqlite:     'Supported (3.25+): OVER(), PARTITION BY, ROW_NUMBER, LAG…',
    postgresql: 'Full support: all standard window functions',
    mysql:      'Supported (MySQL 8+): OVER(), PARTITION BY…',
    oracle:     'Full support — called "analytic functions". RATIO_TO_REPORT, LISTAGG extra.',
  },
  {
    feature: 'Upsert (insert-or-update)',
    sqlite:     'INSERT OR REPLACE  or  INSERT … ON CONFLICT DO UPDATE',
    postgresql: 'INSERT … ON CONFLICT DO UPDATE  (upsert)',
    mysql:      'INSERT … ON DUPLICATE KEY UPDATE',
    oracle:     'MERGE INTO … USING … ON … WHEN MATCHED … WHEN NOT MATCHED',
  },
  {
    feature: 'Boolean type',
    sqlite:     'Stored as INTEGER (0/1). No BOOLEAN keyword.',
    postgresql: 'Native BOOLEAN type: TRUE / FALSE',
    mysql:      'TINYINT(1) alias. TRUE/FALSE = 1/0',
    oracle:     'No native BOOLEAN in SQL. Use NUMBER(1) or CHAR(1).',
  },
  {
    feature: 'Date arithmetic (add 7 days)',
    sqlite:     "date('now', '+7 days')  or  datetime(col, '+7 days')",
    postgresql: "col + INTERVAL '7 days'  or  col + 7",
    mysql:      "DATE_ADD(col, INTERVAL 7 DAY)",
    oracle:     "col + 7  (days are native number units in Oracle)",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SchemaPanel({ theme }: { theme: string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['employees', 'departments']))

  const toggle = (t: string) =>
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(t) ? next.delete(t) : next.add(t)
      return next
    })

  return (
    <div className="space-y-1.5">
      <p className={`text-xs px-1 pb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
        Click a table to see its columns. Click a column name to insert it into the editor.
      </p>
      {DB_SCHEMA.map(table => (
        <div key={table.name} className={`rounded-lg border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={() => toggle(table.name)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-mono font-semibold rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-slate-200 hover:bg-slate-700'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${table.color}`} />
            <span className="flex-1 text-left">{table.name}</span>
            <svg
              viewBox="0 0 24 24"
              className={`w-3.5 h-3.5 fill-current transition-transform ${expanded.has(table.name) ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {expanded.has(table.name) && (
            <div className={`px-3 pb-2 text-xs font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              {table.columns.map(col => (
                <div key={col.name} className="flex items-center gap-2 py-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    col.key?.startsWith('PK') ? 'bg-yellow-400' :
                    col.key?.startsWith('FK') ? 'bg-blue-400' : 'bg-gray-400'
                  }`} />
                  <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>{col.name}</span>
                  <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>{col.type}</span>
                  {col.key && (
                    <span className={`text-[10px] px-1 rounded ${
                      col.key.startsWith('PK')
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>{col.key}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DialectPanel({ theme }: { theme: string }) {
  return (
    <div className="space-y-3">
      <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
        This sandbox runs <strong className="text-blue-500">SQLite</strong> in your browser via WebAssembly.
        Below are syntax differences across the 4 major databases.
      </p>

      <div className={`grid grid-cols-5 gap-0 text-xs font-semibold border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
        {['Feature', 'SQLite', 'PostgreSQL', 'MySQL', 'Oracle'].map((h, i) => (
          <div key={h} className={`px-2 py-2 ${
            i === 0
              ? `col-span-1 ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`
              : i === 1
              ? 'bg-blue-600 text-white text-center'
              : `text-center ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`
          }`}>{h}</div>
        ))}
        {DIALECT_COMPARISON.map((row, ri) => (
          <>
            <div key={`f${ri}`} className={`px-2 py-2 font-medium text-[11px] border-t ${theme === 'dark' ? 'border-slate-700 text-slate-300' : 'border-gray-100 text-gray-700'}`}>{row.feature}</div>
            {([row.sqlite, row.postgresql, row.mysql, row.oracle] as string[]).map((val, ci) => (
              <div key={`v${ri}${ci}`} className={`px-2 py-2 font-mono text-[10px] leading-relaxed border-t ${
                ci === 0 ? 'text-blue-400 font-semibold ' : ''
              }${theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-gray-100 text-gray-600'}`}>
                {val}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

function ResultsTable({ result, error, theme }: { result: QueryResult | null; error: SqlError | null; theme: string }) {
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className={`px-4 py-2 text-xs font-semibold border-b flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          Error
        </div>
        <div className={`flex-1 p-4 font-mono text-sm ${theme === 'dark' ? 'text-red-400 bg-red-950/20' : 'text-red-700 bg-red-50'}`}>
          {error.message}
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className={`h-full flex flex-col items-center justify-center text-sm gap-2 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current opacity-30"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        <span>Run a query to see results here</span>
        <span className="text-xs opacity-70">Press Ctrl+Enter (Cmd+Enter) or click Run</span>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className={`px-4 py-2 text-xs flex items-center gap-3 shrink-0 border-b ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
        <span className="text-green-500 font-semibold flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          {result.rowCount} row{result.rowCount !== 1 ? 's' : ''}
        </span>
        <span>{result.columns.length} column{result.columns.length !== 1 ? 's' : ''}</span>
        <span>{result.timeMs}ms</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}>
            <tr>
              {result.columns.map(col => (
                <th key={col} className={`px-3 py-2 text-left font-semibold whitespace-nowrap border-b ${theme === 'dark' ? 'border-slate-700 text-slate-300' : 'border-gray-200 text-gray-600'}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, ri) => (
              <tr key={ri} className={`border-b transition-colors ${
                theme === 'dark'
                  ? 'border-slate-800 hover:bg-slate-800/50'
                  : 'border-gray-100 hover:bg-gray-50'
              }`}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-3 py-2 font-mono whitespace-nowrap max-w-xs truncate ${
                    cell === null || cell === undefined
                      ? theme === 'dark' ? 'text-slate-600 italic' : 'text-gray-400 italic'
                      : theme === 'dark' ? 'text-slate-300' : 'text-gray-800'
                  }`}>
                    {cell === null || cell === undefined ? 'NULL' : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {result.rows.length === 0 && (
          <div className={`py-12 text-center text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
            Query ran successfully — 0 rows returned
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function SQLSandboxPage() {
  const { theme, toggleTheme } = useTheme()
  const { lang } = useLang()

  // SQL engine state
  const dbRef = useRef<unknown>(null)
  const sqlJsRef = useRef<unknown>(null)
  const [dbReady, setDbReady] = useState(false)
  const [dbError, setDbError] = useState<string | null>(null)

  // Editor + results
  const [sql, setSql] = useState(
    '-- Welcome to the SQL Sandbox!\n-- The TechCorp sample database is loaded.\n-- Try: SELECT * FROM employees LIMIT 5;\n\nSELECT e.name, d.dept_name, e.salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nORDER BY e.salary DESC\nLIMIT 10;'
  )
  const [result, setResult] = useState<QueryResult | null>(null)
  const [queryError, setQueryError] = useState<SqlError | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Left panel tabs
  const [leftTab, setLeftTab] = useState<'exercises' | 'schema' | 'dialects'>('exercises')
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  // ── Load sql.js + init DB ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        const mod = await import('sql.js')
        // sql.js is a CJS module — the function may land on .default or the namespace itself
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initSqlJs: (cfg: unknown) => Promise<unknown> = (mod as any).default ?? mod
        const SQL = await initSqlJs({
          // Use a fully-qualified URL so the pre-bundled code always resolves correctly
          locateFile: (file: string) => `${window.location.origin}/${file}`,
        }) as { Database: new (data?: ArrayBuffer) => unknown }

        if (cancelled) return
        sqlJsRef.current = SQL

        // Create fresh in-memory DB and load sample data
        const db = new SQL.Database()
        ;(db as { run: (sql: string) => void }).run(SAMPLE_DB_SQL)
        dbRef.current = db
        setDbReady(true)
      } catch (e) {
        if (!cancelled) setDbError(String(e))
      }
    }

    init()
    return () => { cancelled = true }
  }, [])

  // ── Run SQL ────────────────────────────────────────────────────────────────
  const runQuery = useCallback(() => {
    if (!dbReady || !dbRef.current) return
    setIsRunning(true)
    setQueryError(null)

    try {
      const db = dbRef.current as {
        exec: (sql: string) => Array<{ columns: string[]; values: unknown[][] }>
      }
      const t0 = performance.now()
      const results = db.exec(sql)
      const timeMs = Math.round(performance.now() - t0)

      if (results.length === 0) {
        setResult({ columns: [], rows: [], rowCount: 0, timeMs })
      } else {
        const { columns, values } = results[results.length - 1]
        setResult({ columns, rows: values, rowCount: values.length, timeMs })
      }
    } catch (e: unknown) {
      setQueryError({ message: (e as Error).message ?? String(e) })
      setResult(null)
    } finally {
      setIsRunning(false)
    }
  }, [dbReady, sql])

  // Ctrl+Enter / Cmd+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        runQuery()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [runQuery])

  // ── Load exercise ──────────────────────────────────────────────────────────
  const loadExercise = (ex: Exercise) => {
    setActiveExercise(ex)
    setShowSolution(false)
    setSql(ex.starterQuery)
    setResult(null)
    setQueryError(null)
  }

  // ── Reset DB ───────────────────────────────────────────────────────────────
  const resetDb = useCallback(() => {
    if (!sqlJsRef.current) return
    const SQL = sqlJsRef.current as { Database: new () => { run: (sql: string) => void } }
    const db = new SQL.Database()
    db.run(SAMPLE_DB_SQL)
    dbRef.current = db
    setResult(null)
    setQueryError(null)
  }, [])

  const filteredExercises = difficultyFilter === 'all'
    ? exercises
    : exercises.filter(e => e.difficulty === difficultyFilter)

  const isDark = theme === 'dark'

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className={`flex items-center gap-3 px-4 py-2.5 shrink-0 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <Link
          to="/"
          className={`flex items-center gap-1.5 transition-colors text-sm no-underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          {lang === 'zh' ? '返回主页' : 'Home'}
        </Link>

        <span className={isDark ? 'text-slate-700' : 'text-gray-300'}>|</span>

        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {lang === 'zh' ? 'SQL 沙盒' : 'SQL Sandbox'}
        </span>

        {/* DB status */}
        <span className={`text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
          dbReady
            ? 'bg-green-900/50 text-green-400'
            : dbError
            ? 'bg-red-900/50 text-red-400'
            : 'bg-slate-700 text-slate-400 animate-pulse'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dbReady ? 'bg-green-400' : dbError ? 'bg-red-400' : 'bg-slate-400'}`} />
          {dbReady ? 'SQLite ready' : dbError ? 'Load failed' : 'Loading…'}
        </span>

        <div className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
          TechCorp DB · 8 tables · 26 employees
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={resetDb}
            title="Reset database to original data"
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
          >
            Reset DB
          </button>
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-1.5 rounded transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-2a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm0 14a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm9-8h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM4 11H2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm14.24-5.76a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 1 0 1.42 1.41l1.41-1.41a1 1 0 0 0 0-1.42zM7.76 17.66l-1.42 1.41a1 1 0 1 0 1.42 1.42l1.41-1.42a1 1 0 0 0-1.41-1.41zm11.32 1.41-1.41-1.41a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.41-1.42zM7.76 6.34 6.34 4.93a1 1 0 0 0-1.42 1.41l1.42 1.42a1 1 0 0 0 1.42-1.42z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Main split ──────────────────────────────────────────────────────── */}
      <PanelGroup orientation="horizontal" className="flex-1 overflow-hidden">

        {/* ── Left panel: Exercises / Schema / Dialects ─────────────────────── */}
        <Panel defaultSize={30} minSize={20} className="flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className={`flex shrink-0 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            {(['exercises', 'schema', 'dialects'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setLeftTab(tab)}
                className={`flex-1 px-2 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                  leftTab === tab
                    ? isDark
                      ? 'border-blue-500 text-blue-400 bg-slate-800/50'
                      : 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : `border-transparent ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-800'}`
                }`}
              >
                {tab === 'exercises' ? (lang === 'zh' ? '练习题' : 'Exercises') :
                 tab === 'schema'    ? (lang === 'zh' ? '数据库结构' : 'DB Schema') :
                                       (lang === 'zh' ? '语法对比' : 'DB Guide')}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">

            {/* ── Exercises Tab ── */}
            {leftTab === 'exercises' && (
              <div className="space-y-3">
                {/* Filter buttons */}
                <div className="flex gap-1.5 flex-wrap">
                  {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                        difficultyFilter === d
                          ? 'bg-blue-600 text-white'
                          : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Exercise list */}
                {filteredExercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => loadExercise(ex)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeExercise?.id === ex.id
                        ? isDark
                          ? 'border-blue-500 bg-blue-950/30'
                          : 'border-blue-400 bg-blue-50'
                        : isDark
                        ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${DIFFICULTY_COLORS[ex.difficulty]}`}>
                        {ex.difficulty}
                      </span>
                      <div className="min-w-0">
                        <div className={`text-sm font-semibold leading-snug ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                          {ex.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                          {ex.topic}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ── Schema Tab ── */}
            {leftTab === 'schema' && <SchemaPanel theme={theme} />}

            {/* ── Dialects Tab ── */}
            {leftTab === 'dialects' && <DialectPanel theme={theme} />}
          </div>

          {/* ── Exercise detail panel (shown when exercise selected) ── */}
          {leftTab === 'exercises' && activeExercise && (
            <div className={`shrink-0 border-t max-h-72 overflow-y-auto ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <div className="p-3 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[activeExercise.difficulty]}`}>
                    {activeExercise.difficulty}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeExercise.title}</span>
                </div>

                <p className={`text-xs leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {activeExercise.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSolution(s => !s)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                  >
                    {showSolution ? 'Hide hint' : 'Show hint'}
                  </button>
                  <button
                    onClick={() => setSql(activeExercise.solution)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Load solution
                  </button>
                </div>

                {showSolution && (
                  <div className={`text-xs p-2.5 rounded-lg font-mono leading-relaxed ${isDark ? 'bg-slate-800 text-yellow-300' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                    Hint: {activeExercise.hint}
                  </div>
                )}
              </div>
            </div>
          )}
        </Panel>

        <PanelResizeHandle className={`w-1.5 transition-colors cursor-col-resize hover:bg-blue-500 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />

        {/* ── Right panel: Editor + Results ─────────────────────────────────── */}
        <Panel defaultSize={70} minSize={40} className="flex flex-col overflow-hidden">
          <PanelGroup orientation="vertical">

            {/* Editor panel */}
            <Panel defaultSize={55} minSize={25} className="flex flex-col overflow-hidden">
              {/* Editor toolbar */}
              <div className={`flex items-center gap-2 px-3 py-2 shrink-0 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  SQL Editor
                </span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  SQLite
                </span>

                <div className="ml-auto flex items-center gap-2">
                  <span className={`text-[11px] ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
                    Ctrl+Enter to run
                  </span>
                  <button
                    onClick={() => { setSql(''); setResult(null); setQueryError(null) }}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                  >
                    Clear
                  </button>
                  <button
                    onClick={runQuery}
                    disabled={!dbReady || isRunning}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {isRunning ? (
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" strokeOpacity=".25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M8 5v14l11-7z"/></svg>
                    )}
                    Run
                  </button>
                </div>
              </div>

              {/* Monaco editor */}
              <div className="flex-1 overflow-hidden">
                {!dbReady && !dbError ? (
                  <div className={`h-full flex flex-col items-center justify-center gap-3 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    <svg className="w-8 h-8 animate-spin opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" strokeOpacity=".25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    <span>Loading SQLite engine…</span>
                    <span className="text-xs opacity-60">Downloading WebAssembly (~1 MB, one-time)</span>
                  </div>
                ) : dbError ? (
                  <div className={`h-full flex flex-col items-center justify-center gap-2 text-sm text-red-400 p-4 text-center`}>
                    <span className="text-2xl">Failed to load SQLite engine</span>
                    <span className="text-xs opacity-80">{dbError}</span>
                    <span className="text-xs opacity-60">Try a hard refresh (Ctrl+Shift+R). If the problem persists, restart the dev server.</span>
                  </div>
                ) : (
                  <Editor
                    height="100%"
                    language="sql"
                    value={sql}
                    onChange={v => setSql(v ?? '')}
                    theme={isDark ? 'vs-dark' : 'light'}
                    options={{
                      fontSize: 13,
                      fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", Menlo, monospace',
                      fontLigatures: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      tabSize: 2,
                      padding: { top: 12 },
                      suggestOnTriggerCharacters: true,
                    }}
                  />
                )}
              </div>
            </Panel>

            <PanelResizeHandle className={`h-1.5 transition-colors cursor-row-resize hover:bg-blue-500 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />

            {/* Results panel */}
            <Panel defaultSize={45} minSize={20} className="flex flex-col overflow-hidden">
              <div className={`px-3 py-2 text-xs font-semibold shrink-0 border-b ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-gray-200 text-gray-500'}`}>
                Query Results
              </div>
              <div className="flex-1 overflow-hidden">
                <ResultsTable result={result} error={queryError} theme={theme} />
              </div>
            </Panel>

          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}
