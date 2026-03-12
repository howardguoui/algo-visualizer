import type { Step, AlgorithmDef } from '../types'

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = []
  const a = [...input]
  const n = a.length
  const sorted: number[] = [0]
  let comparisons = 0
  let swaps = 0

  for (let i = 1; i < n; i++) {
    const key = a[i]
    steps.push({
      array: [...a], comparing: [i], swapping: [], sorted: [...sorted],
      pivot: i, codeLine: 2,
      description: `Picking a[${i}] = ${key} to insert into sorted region`,
      variables: { i, key }, comparisons, swaps,
    })

    let j = i - 1
    while (j >= 0 && a[j] > key) {
      comparisons++
      steps.push({
        array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted],
        pivot: i, codeLine: 4,
        description: `a[${j}] = ${a[j]} > ${key}, shifting right`,
        variables: { i, j, key }, comparisons, swaps,
      })
      swaps++
      a[j + 1] = a[j]
      steps.push({
        array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted],
        pivot: null, codeLine: 5,
        description: `Shifted a[${j}] = ${a[j]} to position ${j + 1}`,
        variables: { i, j, key }, comparisons, swaps,
      })
      j--
    }
    if (j >= 0) {
      comparisons++
      steps.push({
        array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted],
        pivot: null, codeLine: 4,
        description: `a[${j}] = ${a[j]} ≤ ${key}, stop shifting`,
        variables: { i, j, key }, comparisons, swaps,
      })
    }
    a[j + 1] = key
    sorted.push(i)
    steps.push({
      array: [...a], comparing: [], swapping: [], sorted: [...sorted],
      pivot: null, codeLine: 6,
      description: `Inserted ${key} at position ${j + 1}`,
      variables: { i, key }, comparisons, swaps,
    })
  }
  steps.push({
    array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, k) => k),
    pivot: null, codeLine: 8,
    description: '✅ Array is fully sorted!',
    variables: {}, comparisons, swaps,
  })
  return steps
}

export const insertionSort: AlgorithmDef = {
  name: 'Insertion Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: true,
  description: 'Builds the sorted array one element at a time by inserting each element into its correct position in the already-sorted portion.',
  code: [
    'function insertionSort(arr) {',
    '  for (let i = 1; i < n; i++) {',
    '    let key = arr[i], j = i - 1',
    '    while (j >= 0 && arr[j] > key) {',
    '      arr[j + 1] = arr[j]',
    '      j--',
    '    }',
    '    arr[j + 1] = key',
    '  }',
    '}',
  ],
  generateSteps,
}
