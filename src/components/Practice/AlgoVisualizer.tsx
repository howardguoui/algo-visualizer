import { useState, useEffect, useRef, useCallback } from 'react'
import { getVizConfig } from '../../algorithms/practice/generators'
import type { VizConfig } from '../../algorithms/practice/vizTypes'

const CELL = 34   // px per cell width/height
const SPEEDS: Record<string, number> = { Slow: 1200, Normal: 700, Fast: 350, 'Very Fast': 120 }

const PHASE_COLOR: Record<string, string> = {
  Init: 'text-slate-400', Match: 'text-green-400', Mismatch: 'text-red-400',
  Found: 'text-green-400', Move: 'text-blue-400', Store: 'text-yellow-400',
  Compare: 'text-yellow-400', Halve: 'text-blue-400', Skip: 'text-slate-500',
  Write: 'text-blue-400', Duplicate: 'text-orange-400', Expand: 'text-sky-400',
  Shrink: 'text-orange-400', Compute: 'text-purple-400', Base: 'text-cyan-400',
  Build: 'text-blue-400', Query: 'text-green-400', Done: 'text-emerald-400',
  'New Max': 'text-green-400',
}

interface Props { problemId: number }

export function AlgoVisualizer({ problemId }: Props) {
  const [config, setConfig] = useState<VizConfig | null>(() => getVizConfig(problemId))
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState('Normal')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Input editor state
  const [editingInput, setEditingInput] = useState(false)
  const [inputVals, setInputVals] = useState<Record<string, string>>({})
  const [inputError, setInputError] = useState<string | null>(null)

  const total = config?.steps.length ?? 0

  // Reset when problem changes
  useEffect(() => {
    const newConfig = getVizConfig(problemId)
    setConfig(newConfig)
    setIdx(0)
    setPlaying(false)
    setEditingInput(false)
    setInputError(null)
    // Pre-fill inputVals with schema defaults
    const defaults: Record<string, string> = {}
    newConfig?.inputSchema.forEach(f => { defaults[f.key] = f.defaultValue })
    setInputVals(defaults)
  }, [problemId])

  const next = useCallback(() => setIdx(i => Math.min(i + 1, total - 1)), [total])
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), [])
  const reset = useCallback(() => { setIdx(0); setPlaying(false) }, [])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!playing) return
    if (idx >= total - 1) { setPlaying(false); return }
    timerRef.current = setInterval(() => {
      setIdx(i => {
        if (i >= total - 1) { setPlaying(false); return i }
        return i + 1
      })
    }, SPEEDS[speed])
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing, speed, total, idx])

  function handleApplyInputs() {
    setInputError(null)
    try {
      const newConfig = getVizConfig(problemId, inputVals)
      setConfig(newConfig)
      setIdx(0)
      setPlaying(false)
      setEditingInput(false)
    } catch (e) {
      setInputError(e instanceof Error ? e.message : String(e))
    }
  }

  function openEditor() {
    // Pre-fill with current schema defaults merged with any existing inputVals
    const defaults: Record<string, string> = {}
    config?.inputSchema.forEach(f => { defaults[f.key] = inputVals[f.key] ?? f.defaultValue })
    setInputVals(defaults)
    setInputError(null)
    setEditingInput(true)
  }

  if (!config) return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
      <span className="text-2xl">🔜</span>
      <p className="text-sm">Visualizer coming soon for this problem.</p>
    </div>
  )

  const step = config.steps[idx]
  const cellCount = step.cells.length

  // Build pointer lookup: index → labels
  const ptrMap = new Map<number, typeof step.pointers>()
  step.pointers.forEach(p => {
    if (!ptrMap.has(p.index)) ptrMap.set(p.index, [])
    ptrMap.get(p.index)!.push(p)
  })

  // Clamp cell width for long arrays
  const cellW = cellCount > 10 ? Math.max(22, Math.floor(280 / cellCount)) : CELL

  function CellRow({ cells, colors, isSecond = false }: { cells: (string|number)[], colors: string[], isSecond?: boolean }) {
    return (
      <div className="flex gap-0.5">
        {cells.map((val, i) => (
          <div
            key={i}
            className={`flex items-center justify-center rounded font-mono font-bold text-white border border-black/20 ${isSecond ? 'text-[10px]' : 'text-xs'}`}
            style={{
              width: cellW, minWidth: cellW, height: isSecond ? 20 : CELL,
              backgroundColor: colors[i] ?? '#475569',
              boxShadow: step.windowRange && i >= step.windowRange[0] && i <= step.windowRange[1] && !isSecond
                ? '0 0 0 2px #0284c7' : undefined,
              fontSize: cellW < 28 ? 10 : undefined,
            }}
          >
            {String(val).length > 3 ? String(val).slice(0,3) : val}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold text-purple-400 shrink-0">⚡ {config.title}</span>
          <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded truncate max-w-[180px]">
            {config.demoInput}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono">{idx + 1}/{total}</span>
          {config.inputSchema.length > 0 && (
            <button
              onClick={editingInput ? () => setEditingInput(false) : openEditor}
              title="Edit inputs"
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                editingInput
                  ? 'bg-purple-900/40 border-purple-700 text-purple-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {/* pencil icon */}
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              {editingInput ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>
      </div>

      {/* Input editor panel */}
      {editingInput && (
        <div className="shrink-0 border-b border-slate-800 bg-slate-900/80 px-3 py-2">
          <div className="flex flex-wrap gap-2 items-end">
            {config.inputSchema.map(field => (
              <div key={field.key} className="flex flex-col gap-0.5">
                <label className="text-[9px] text-slate-500 uppercase tracking-wide font-medium">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={inputVals[field.key] ?? field.defaultValue}
                  onChange={e => setInputVals(prev => ({ ...prev, [field.key]: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') handleApplyInputs() }}
                  placeholder={field.placeholder}
                  className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500 w-36"
                />
              </div>
            ))}
            <button
              onClick={handleApplyInputs}
              className="px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-[11px] font-medium transition-colors"
            >
              Apply
            </button>
          </div>
          {inputError && (
            <div className="mt-1.5 text-[10px] text-red-400 font-mono bg-red-900/20 px-2 py-1 rounded">
              {inputError}
            </div>
          )}
        </div>
      )}

      {/* Visualization area */}
      <div className="flex-1 flex flex-col justify-center overflow-x-auto px-3 py-2 gap-1.5 min-h-0">
        {/* Index row */}
        <div className="flex gap-0.5">
          {step.cells.map((_, i) => (
            <div key={i} className="text-center text-[9px] text-slate-600 font-mono"
              style={{ width: cellW, minWidth: cellW }}>{i}</div>
          ))}
        </div>

        {/* Primary cell row */}
        <CellRow cells={step.cells} colors={step.cellColors} />

        {/* Pointer labels row */}
        <div className="flex gap-0.5" style={{ minHeight: 18 }}>
          {step.cells.map((_, i) => {
            const ptrs = ptrMap.get(i) ?? []
            return (
              <div key={i} className="flex flex-col items-center" style={{ width: cellW, minWidth: cellW }}>
                {ptrs.map((p, j) => (
                  <span key={j} className="text-[10px] font-bold leading-none" style={{ color: p.color }}>
                    {p.label}
                  </span>
                ))}
              </div>
            )
          })}
        </div>

        {/* Second row (DP table / prefix array) */}
        {step.secondCells && (
          <div className="mt-1 flex flex-col gap-0.5">
            {step.secondLabel && (
              <span className="text-[9px] text-slate-500 font-mono">{step.secondLabel}</span>
            )}
            <CellRow cells={step.secondCells} colors={step.secondCellColors ?? step.secondCells.map(()=>'#1e293b')} isSecond />
          </div>
        )}
      </div>

      {/* Variables bar */}
      {step.variables && step.variables.length > 0 && (
        <div className="flex gap-1.5 px-3 pb-1 flex-wrap shrink-0">
          {step.variables.map(([k, v]) => (
            <div key={k} className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 text-[10px]">
              <span className="text-slate-400">{k}:</span>
              <span className="text-yellow-300 font-mono font-bold">{String(v)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="mx-3 mb-1.5 bg-slate-900 rounded-lg px-2.5 py-1.5 shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          {step.phase && (
            <span className={`text-[10px] font-bold uppercase tracking-wide ${PHASE_COLOR[step.phase] ?? 'text-slate-400'}`}>
              [{step.phase}]
            </span>
          )}
          <span className="text-slate-300 text-[11px] leading-relaxed">{step.description}</span>
        </div>
        {step.result && (
          <div className="text-green-400 text-[11px] font-semibold mt-0.5">→ {step.result}</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 px-3 pb-2 shrink-0">
        <button onClick={reset} title="Reset"
          className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
        </button>
        <button onClick={prev} disabled={idx === 0}
          className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white disabled:opacity-25 transition-colors">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
        >
          {playing
            ? <><svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>Pause</>
            : <><svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M8 5v14l11-7z"/></svg>Play</>
          }
        </button>
        <button onClick={next} disabled={idx === total - 1}
          className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white disabled:opacity-25 transition-colors">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden mx-1">
          <div className="h-full bg-purple-600 rounded-full transition-all duration-200"
            style={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>

        {/* Speed */}
        <select value={speed} onChange={e => setSpeed(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-slate-400 text-[10px]">
          {Object.keys(SPEEDS).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
  )
}
