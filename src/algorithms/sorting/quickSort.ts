import type { Step, AlgorithmDef } from '../types'

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = []
  const a = [...input]
  let comparisons = 0
  let swaps = 0

  function partition(arr: number[], low: number, high: number, sortedSet: Set<number>): number {
    const pivotVal = arr[high]
    let i = low - 1
    steps.push({
      array: [...arr], comparing: [], swapping: [], sorted: [...sortedSet],
      pivot: high, codeLine: 2,
      description: `Pivot = ${pivotVal} at index ${high}`,
      variables: { low, high, pivot: pivotVal, i }, comparisons, swaps,
    })
    for (let j = low; j < high; j++) {
      comparisons++
      steps.push({
        array: [...arr], comparing: [j, high], swapping: [], sorted: [...sortedSet],
        pivot: high, codeLine: 4,
        description: `Comparing a[${j}] = ${arr[j]} with pivot ${pivotVal}`,
        variables: { low, high, i, j, pivot: pivotVal }, comparisons, swaps,
      })
      if (arr[j] <= pivotVal) {
        i++
        swaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]]
        steps.push({
          array: [...arr], comparing: [], swapping: [i, j], sorted: [...sortedSet],
          pivot: high, codeLine: 5,
          description: `a[${j}] = ${arr[j]} ≤ pivot → swapped a[${i}] ↔ a[${j}]`,
          variables: { i, j, pivot: pivotVal }, comparisons, swaps,
        })
      }
    }
    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    sortedSet.add(i + 1)
    steps.push({
      array: [...arr], comparing: [], swapping: [i + 1, high], sorted: [...sortedSet],
      pivot: null, codeLine: 7,
      description: `Pivot ${pivotVal} placed at final position ${i + 1}`,
      variables: { pivotIdx: i + 1 }, comparisons, swaps,
    })
    return i + 1
  }

  function quickSort(arr: number[], low: number, high: number, sortedSet: Set<number>) {
    if (low >= high) {
      if (low === high) sortedSet.add(low)
      return
    }
    const pi = partition(arr, low, high, sortedSet)
    steps.push({
      array: [...arr], comparing: [], swapping: [], sorted: [...sortedSet],
      pivot: null, codeLine: 9,
      description: `Recursing left [${low}..${pi - 1}] and right [${pi + 1}..${high}]`,
      variables: { low, high, pi }, comparisons, swaps,
    })
    quickSort(arr, low, pi - 1, sortedSet)
    quickSort(arr, pi + 1, high, sortedSet)
  }

  const sortedSet = new Set<number>()
  quickSort(a, 0, a.length - 1, sortedSet)
  steps.push({
    array: [...a], comparing: [], swapping: [],
    sorted: Array.from({ length: a.length }, (_, k) => k),
    pivot: null, codeLine: 11,
    description: '✅ Array is fully sorted!',
    variables: {}, comparisons, swaps,
  })
  return steps
}

export const quickSort: AlgorithmDef = {
  name: 'Quick Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  spaceComplexity: 'O(log n)',
  stable: false,
  description: 'Picks a pivot element, partitions array so elements < pivot go left and > pivot go right, then recursively sorts each side.',
  code: [
    'function quickSort(arr, low, high) {',
    '  const pivot = arr[high]',
    '  let i = low - 1',
    '  for (let j = low; j < high; j++) {',
    '    if (arr[j] <= pivot) {',
    '      i++; swap(arr, i, j)',
    '    }',
    '  }',
    '  swap(arr, i + 1, high) // place pivot',
    '  quickSort(arr, low, pivotIdx - 1)',
    '  quickSort(arr, pivotIdx + 1, high)',
    '}',
  ],
  generateSteps,
}
