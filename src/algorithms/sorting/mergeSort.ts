import type { Step, AlgorithmDef } from '../types'

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = []
  const a = [...input]
  let comparisons = 0
  let swaps = 0

  function merge(arr: number[], left: number, mid: number, right: number, sortedSet: Set<number>) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++
      const lIdx = left + i
      const rIdx = mid + 1 + j
      steps.push({
        array: [...arr], comparing: [lIdx, rIdx], swapping: [], sorted: [...sortedSet],
        pivot: null, codeLine: 6,
        description: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}`,
        variables: { left, mid, right, i, j }, comparisons, swaps,
      })
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i++]
      } else {
        arr[k] = rightArr[j++]
        swaps++
      }
      steps.push({
        array: [...arr], comparing: [], swapping: [k], sorted: [...sortedSet],
        pivot: null, codeLine: 7,
        description: `Placed ${arr[k]} at index ${k}`,
        variables: { left, mid, right, k }, comparisons, swaps,
      })
      k++
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i++]; k++
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j++]; k++
    }
    for (let x = left; x <= right; x++) sortedSet.add(x)
    steps.push({
      array: [...arr], comparing: [], swapping: [], sorted: [...sortedSet],
      pivot: null, codeLine: 8,
      description: `Merged segment [${left}..${right}]`,
      variables: { left, right }, comparisons, swaps,
    })
  }

  function mergeSort(arr: number[], left: number, right: number, sortedSet: Set<number>) {
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: [...arr], comparing: [], swapping: [],
      sorted: [...sortedSet], pivot: mid, codeLine: 2,
      description: `Dividing [${left}..${right}] → [${left}..${mid}] and [${mid + 1}..${right}]`,
      variables: { left, mid, right }, comparisons, swaps,
    })
    mergeSort(arr, left, mid, sortedSet)
    mergeSort(arr, mid + 1, right, sortedSet)
    merge(arr, left, mid, right, sortedSet)
  }

  const sortedSet = new Set<number>()
  mergeSort(a, 0, a.length - 1, sortedSet)
  steps.push({
    array: [...a], comparing: [], swapping: [],
    sorted: Array.from({ length: a.length }, (_, k) => k),
    pivot: null, codeLine: 10,
    description: '✅ Array is fully sorted!',
    variables: {}, comparisons, swaps,
  })
  return steps
}

export const mergeSort: AlgorithmDef = {
  name: 'Merge Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  stable: true,
  description: 'Divide and conquer: recursively splits array in half, sorts each half, then merges them back together in sorted order.',
  code: [
    'function mergeSort(arr, left, right) {',
    '  if (left >= right) return',
    '  const mid = Math.floor((left + right) / 2)',
    '  mergeSort(arr, left, mid)',
    '  mergeSort(arr, mid + 1, right)',
    '  // merge phase',
    '  compare and pick smaller element',
    '  place into merged array',
    '  segment [left..right] merged ✓',
    '  // recurse up the call stack',
    '}',
  ],
  generateSteps,
}
