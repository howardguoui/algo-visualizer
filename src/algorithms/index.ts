import type { AlgorithmDef } from './types'
import { bubbleSort } from './sorting/bubbleSort'
import { selectionSort } from './sorting/selectionSort'
import { insertionSort } from './sorting/insertionSort'
import { mergeSort } from './sorting/mergeSort'
import { quickSort } from './sorting/quickSort'

export const algorithms: Record<string, AlgorithmDef> = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
}

export type AlgorithmKey = keyof typeof algorithms
export { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort }
export type { AlgorithmDef } from './types'
