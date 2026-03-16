import { useState, useMemo, useCallback } from 'react'
import { algorithms } from '../algorithms'
import { useVisualizer } from '../hooks/useVisualizer'
import { ArrayVisualizer } from '../components/ArrayVisualizer'
import { Controls } from '../components/Controls'
import { AlgorithmSelector } from '../components/AlgorithmSelector'
import { StatsPanel } from '../components/StatsPanel'
import { CodePanel } from '../components/CodePanel'
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { useTheme } from '../context/ThemeContext'

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

export function VisualizePage() {
  const { theme } = useTheme()
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
    <div className={`flex flex-col h-full transition-colors ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top bar */}
      <div className={`border-b px-4 py-2 flex items-center gap-4 flex-wrap ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200 bg-white'}`}>
        <AlgorithmSelector selectedKey={algoKey} onSelect={handleAlgoChange} />
        <div className="ml-auto">
          <StatsPanel step={vis.currentStep} stepIndex={vis.stepIndex} totalSteps={vis.totalSteps} />
        </div>
      </div>

      {/* Main */}
      <PanelGroup orientation="horizontal" className="flex-1 overflow-hidden min-h-0">
        <Panel flex-1 minSize={40} className="flex-1 p-4 flex flex-col min-h-0">
          <ArrayVisualizer step={vis.currentStep} maxValue={maxValue} />
        </Panel>
        
        <PanelResizeHandle className={`w-1.5 transition-colors cursor-col-resize hover:bg-blue-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
        
        <Panel defaultSize={30} minSize={20} maxSize={50} className={`p-4 flex flex-col min-h-0 overflow-auto ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}`}>
          <CodePanel algorithm={algorithm} step={vis.currentStep} />
        </Panel>
      </PanelGroup>

      {/* Controls */}
      <div className={`border-t p-3 ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
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
