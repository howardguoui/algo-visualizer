import { useState, useMemo } from 'react'
import { algorithms } from '../../algorithms'
import { useVisualizer } from '../../hooks/useVisualizer'
import { ArrayVisualizer } from '../ArrayVisualizer'
import { Controls } from '../Controls'
import { useLang } from '../../context/LangContext'

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

interface Props {
  algorithmKey: string
}

export function VisualizerEmbed({ algorithmKey }: Props) {
  const { t } = useLang()
  const [arraySize, setArraySize] = useState(16)
  const [sourceArray, setSourceArray] = useState(() => randomArray(16))
  const algorithm = algorithms[algorithmKey]

  const steps = useMemo(() => algorithm?.generateSteps(sourceArray) ?? [], [algorithm, sourceArray])
  const maxValue = useMemo(() => sourceArray.length ? Math.max(...sourceArray) : 100, [sourceArray])
  const vis = useVisualizer(steps)

  const handleRandomize = () => {
    const arr = randomArray(arraySize)
    setSourceArray(arr)
    vis.reset()
  }

  const handleSizeChange = (size: number) => {
    setArraySize(size)
    setSourceArray(randomArray(size))
    vis.reset()
  }

  if (!algorithm) return null

  return (
    <div className="my-8 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-sm font-semibold">⚡ {t('Interactive Visualizer', '交互式可视化')}</span>
          <span className="text-slate-500 text-xs">— {algorithm.name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono">{vis.stepIndex + 1}/{vis.totalSteps}</span>
        </div>
      </div>

      {/* Visualizer */}
      <div className="h-64 p-4">
        <ArrayVisualizer step={vis.currentStep} maxValue={maxValue} />
      </div>

      {/* Stats row */}
      <div className="flex gap-6 px-5 py-2 border-t border-slate-800 text-xs">
        <span className="text-slate-500">{t('Comparisons', '比较次数')}: <span className="text-yellow-400 font-mono font-bold">{vis.currentStep?.comparisons ?? 0}</span></span>
        <span className="text-slate-500">{t('Swaps', '交换次数')}: <span className="text-red-400 font-mono font-bold">{vis.currentStep?.swaps ?? 0}</span></span>
        <span className="text-slate-500 flex-1 text-right">{vis.currentStep?.description ?? ''}</span>
      </div>

      {/* Controls */}
      <div className="border-t border-slate-800 p-3">
        <Controls
          isPlaying={vis.isPlaying}
          isFirst={vis.isFirst}
          isLast={vis.isLast}
          stepIndex={vis.stepIndex}
          totalSteps={vis.totalSteps}
          speed={vis.speed}
          arraySize={arraySize}
          onTogglePlay={vis.togglePlay}
          onStepForward={vis.stepForward}
          onStepBackward={vis.stepBackward}
          onJumpToStart={vis.jumpToStart}
          onJumpToEnd={vis.jumpToEnd}
          onSpeedChange={vis.setSpeed}
          onArraySizeChange={handleSizeChange}
          onRandomize={handleRandomize}
        />
      </div>
    </div>
  )
}
