import type { Step } from '../algorithms/types'

interface Props {
  step: Step
  maxValue: number
}

const BAR_COLORS = {
  sorted: '#22c55e',    // green
  swapping: '#ef4444',  // red
  comparing: '#eab308', // yellow
  pivot: '#a855f7',     // purple
  default: '#3b82f6',   // blue
}

function getBarColor(index: number, step: Step): string {
  if (step.sorted.includes(index)) return BAR_COLORS.sorted
  if (step.swapping.includes(index)) return BAR_COLORS.swapping
  if (step.comparing.includes(index)) return BAR_COLORS.comparing
  if (step.pivot === index) return BAR_COLORS.pivot
  return BAR_COLORS.default
}

export function ArrayVisualizer({ step, maxValue }: Props) {
  const { array } = step
  const n = array.length
  const barWidth = Math.max(4, Math.min(60, Math.floor(700 / n) - 2))

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Description */}
      <div className="bg-slate-800 rounded-lg px-4 py-2 min-h-[40px] flex items-center">
        <span className="text-sm text-slate-200">{step.description}</span>
      </div>

      {/* Bars */}
      <div className="flex-1 flex items-end justify-center gap-[2px] px-4 pb-2 bg-slate-900 rounded-xl overflow-hidden">
        {array.map((value, index) => {
          const heightPct = (value / maxValue) * 100
          const color = getBarColor(index, step)
          const isHighlighted =
            step.comparing.includes(index) ||
            step.swapping.includes(index) ||
            step.pivot === index

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-end"
              style={{ width: barWidth, height: '100%' }}
            >
              {/* Value label — only show if bars are wide enough */}
              {barWidth >= 24 && (
                <span
                  className="text-[10px] font-bold mb-[2px]"
                  style={{ color: isHighlighted ? color : '#94a3b8' }}
                >
                  {value}
                </span>
              )}
              <div
                className="rounded-t-sm w-full transition-all duration-150"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  boxShadow: isHighlighted ? `0 0 8px ${color}` : 'none',
                  minHeight: 4,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center flex-wrap text-xs">
        {Object.entries(BAR_COLORS).map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-slate-400 capitalize">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
