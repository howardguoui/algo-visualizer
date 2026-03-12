import type { Step, AlgorithmDef } from '../algorithms/types'

interface Props {
  algorithm: AlgorithmDef
  step: Step
}

export function CodePanel({ algorithm, step }: Props) {
  const vars = step.variables

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Code */}
      <div className="flex-1 bg-slate-900 rounded-xl overflow-auto p-4 font-mono text-sm">
        <div className="text-slate-500 text-xs mb-3 uppercase tracking-wider">
          {algorithm.name}
        </div>
        {algorithm.code.map((line, i) => {
          const isActive = i === step.codeLine
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-2 rounded transition-colors duration-100"
              style={{
                backgroundColor: isActive ? 'rgba(251,191,36,0.15)' : 'transparent',
                borderLeft: isActive ? '2px solid #fbbf24' : '2px solid transparent',
              }}
            >
              <span className="text-slate-600 select-none w-5 text-right text-xs shrink-0">
                {i + 1}
              </span>
              <span
                className="whitespace-pre py-[3px]"
                style={{ color: isActive ? '#fbbf24' : '#94a3b8' }}
              >
                {line}
              </span>
            </div>
          )
        })}
      </div>

      {/* Variables inspector */}
      {Object.keys(vars).length > 0 && (
        <div className="bg-slate-900 rounded-xl p-3">
          <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">
            Variables
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(vars).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center gap-1 bg-slate-800 rounded px-2 py-1 text-xs"
              >
                <span className="text-purple-400">{key}</span>
                <span className="text-slate-500">=</span>
                <span className="text-yellow-300 font-bold">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complexity */}
      <div className="bg-slate-900 rounded-xl p-3 text-xs">
        <div className="text-slate-500 uppercase tracking-wider mb-2">Complexity</div>
        <div className="grid grid-cols-2 gap-1">
          <span className="text-slate-400">Best</span>
          <span className="text-green-400 font-mono">{algorithm.timeComplexity.best}</span>
          <span className="text-slate-400">Average</span>
          <span className="text-yellow-400 font-mono">{algorithm.timeComplexity.average}</span>
          <span className="text-slate-400">Worst</span>
          <span className="text-red-400 font-mono">{algorithm.timeComplexity.worst}</span>
          <span className="text-slate-400">Space</span>
          <span className="text-blue-400 font-mono">{algorithm.spaceComplexity}</span>
          <span className="text-slate-400">Stable</span>
          <span className={algorithm.stable ? 'text-green-400' : 'text-red-400'}>
            {algorithm.stable ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  )
}
