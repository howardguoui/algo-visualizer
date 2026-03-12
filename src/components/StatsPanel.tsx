import type { Step } from '../algorithms/types'

interface Props {
  step: Step
  stepIndex: number
  totalSteps: number
}

function Stat({ label, value, color = 'text-white' }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-lg font-bold font-mono ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}

export function StatsPanel({ step, stepIndex, totalSteps }: Props) {
  const progress = Math.round(((stepIndex + 1) / totalSteps) * 100)

  return (
    <div className="flex items-center gap-6 bg-slate-800 rounded-xl px-5 py-3">
      <Stat label="Comparisons" value={step.comparisons} color="text-yellow-400" />
      <div className="w-px h-8 bg-slate-700" />
      <Stat label="Swaps" value={step.swaps} color="text-red-400" />
      <div className="w-px h-8 bg-slate-700" />
      <Stat label="Progress" value={`${progress}%`} color="text-blue-400" />
      <div className="w-px h-8 bg-slate-700" />
      <Stat label="Sorted" value={step.sorted.length} color="text-green-400" />
    </div>
  )
}
