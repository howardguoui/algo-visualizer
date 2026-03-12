import { useState, useMemo, useCallback } from 'react'
import { algorithms } from '../algorithms'
import { useVisualizer } from '../hooks/useVisualizer'
import { ArrayVisualizer } from '../components/ArrayVisualizer'
import { Controls } from '../components/Controls'
import { AlgorithmSelector } from '../components/AlgorithmSelector'
import { StatsPanel } from '../components/StatsPanel'
import { CodePanel } from '../components/CodePanel'

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

export function VisualizePage() {
  const [algoKey, setAlgoKey] = useState('bubbleSort')
  const [arraySize, setArraySize] = useState(20)
  const [sourceArray, setSourceArray] = useState(() => randomArray(20))

  const algorithm = algorithms[algoKey]
  const steps = useMemo(() => algorithm.generateSteps(sourceArray), [algorithm, sourceArray])
  const maxValue = useMemo(() => Math.max(...sourceArray), [sourceArray])
  const vis = useVisualizer(steps)

  const handleRandomize = useCallback(() => {
    setSourceArray(randomArray(arraySize))
    vis.reset()
  }, [arraySize, vis])

  const handleSizeChange = useCallback((size: number) => {
    setArraySize(size)
    setSourceArray(randomArray(size))
    vis.reset()
  }, [vis])

  const handleAlgoChange = useCallback((key: string) => {
    setAlgoKey(key)
    vis.reset()
  }, [vis])

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="border-b border-slate-800 px-4 py-2 flex items-center gap-4 flex-wrap">
        <AlgorithmSelector selectedKey={algoKey} onSelect={handleAlgoChange} />
        <div className="ml-auto">
          <StatsPanel step={vis.currentStep} stepIndex={vis.stepIndex} totalSteps={vis.totalSteps} />
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <div className="flex-1 p-4 flex flex-col min-h-0">
          <ArrayVisualizer step={vis.currentStep} maxValue={maxValue} />
        </div>
        <div className="w-72 xl:w-80 border-l border-slate-800 p-4 flex flex-col min-h-0 overflow-auto">
          <CodePanel algorithm={algorithm} step={vis.currentStep} />
        </div>
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
