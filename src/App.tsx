import { useState, useMemo, useCallback } from 'react'
import { algorithms } from './algorithms'
import { useVisualizer } from './hooks/useVisualizer'
import { ArrayVisualizer } from './components/ArrayVisualizer'
import { CodePanel } from './components/CodePanel'
import { Controls } from './components/Controls'
import { AlgorithmSelector } from './components/AlgorithmSelector'
import { StatsPanel } from './components/StatsPanel'

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

export default function App() {
  const [algoKey, setAlgoKey] = useState('bubbleSort')
  const [arraySize, setArraySize] = useState(20)
  const [sourceArray, setSourceArray] = useState(() => randomArray(20))

  const algorithm = algorithms[algoKey]

  const steps = useMemo(
    () => algorithm.generateSteps(sourceArray),
    [algorithm, sourceArray]
  )

  const maxValue = useMemo(() => Math.max(...sourceArray), [sourceArray])

  const vis = useVisualizer(steps)

  const handleRandomize = useCallback(() => {
    const arr = randomArray(arraySize)
    setSourceArray(arr)
    vis.reset()
  }, [arraySize, vis])

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size)
    setSourceArray(randomArray(size))
    vis.reset()
  }, [vis])

  const handleAlgoChange = useCallback((key: string) => {
    setAlgoKey(key)
    vis.reset()
  }, [vis])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">
            ⚡
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none">AlgoVisualizer</h1>
            <p className="text-xs text-slate-500">See algorithms think</p>
          </div>
        </div>
        <StatsPanel
          step={vis.currentStep}
          stepIndex={vis.stepIndex}
          totalSteps={vis.totalSteps}
        />
      </header>

      {/* Algorithm selector */}
      <div className="border-b border-slate-800 px-6 py-3">
        <AlgorithmSelector selectedKey={algoKey} onSelect={handleAlgoChange} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Visualizer area */}
        <div className="flex-1 p-4 flex flex-col min-h-0">
          <ArrayVisualizer step={vis.currentStep} maxValue={maxValue} />
        </div>

        {/* Code panel */}
        <div className="w-72 xl:w-80 border-l border-slate-800 p-4 flex flex-col min-h-0 overflow-auto">
          <CodePanel algorithm={algorithm} step={vis.currentStep} />
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-slate-800 p-4">
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
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
        />
      </div>
    </div>
  )
}
