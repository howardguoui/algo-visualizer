import { useState, useEffect, useRef, useCallback } from 'react'
import type { Step } from '../algorithms/types'

const SPEED_MAP: Record<number, number> = {
  1: 1000,
  2: 600,
  3: 300,
  4: 150,
  5: 60,
  6: 20,
  7: 5,
}

export function useVisualizer(steps: Step[]) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(3)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentStep = steps[stepIndex] ?? steps[0]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === steps.length - 1

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) { clearTimer(); return }
    if (isLast) { setIsPlaying(false); return }
    intervalRef.current = setInterval(() => {
      setStepIndex(prev => {
        if (prev >= steps.length - 1) { setIsPlaying(false); return prev }
        return prev + 1
      })
    }, SPEED_MAP[speed])
    return clearTimer
  }, [isPlaying, speed, steps.length, isLast, clearTimer])

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])
  const togglePlay = useCallback(() => setIsPlaying(p => !p), [])

  const stepForward = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const stepBackward = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(prev => Math.max(prev - 1, 0))
  }, [])

  const jumpToStart = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(0)
  }, [])

  const jumpToEnd = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(steps.length - 1)
  }, [steps.length])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(0)
  }, [])

  return {
    currentStep,
    stepIndex,
    totalSteps: steps.length,
    isPlaying,
    isFirst,
    isLast,
    speed,
    setSpeed,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    jumpToStart,
    jumpToEnd,
    reset,
  }
}
