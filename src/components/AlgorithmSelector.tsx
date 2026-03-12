import type { AlgorithmDef } from '../algorithms/types'
import { algorithms } from '../algorithms'

interface Props {
  selectedKey: string
  onSelect: (key: string) => void
}

export function AlgorithmSelector({ selectedKey, onSelect }: Props) {
  const selected = algorithms[selectedKey] as AlgorithmDef

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1 flex-wrap">
        {Object.entries(algorithms).map(([key, algo]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
              key === selectedKey
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>
      <div className="hidden lg:block text-xs text-slate-500 max-w-[200px] leading-snug">
        {selected.description}
      </div>
    </div>
  )
}
