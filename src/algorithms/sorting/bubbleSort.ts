import type { Step, AlgorithmDef } from '../types'

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = []
  const a = [...input]
  const n = a.length
  const sorted: number[] = []
  let comparisons = 0
  let swaps = 0

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      steps.push({
        array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted],
        pivot: null, codeLine: 3,
        description: `Comparing a[${j}] = ${a[j]} and a[${j + 1}] = ${a[j + 1]}`,
        variables: { i, j }, comparisons, swaps,
      })
      if (a[j] > a[j + 1]) {
        swaps++;
        [a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({
          array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted],
          pivot: null, codeLine: 4,
          description: `Swapped! a[${j}] ↔ a[${j + 1}]`,
          variables: { i, j }, comparisons, swaps,
        })
      }
    }
    sorted.unshift(n - 1 - i)
    steps.push({
      array: [...a], comparing: [], swapping: [], sorted: [...sorted],
      pivot: null, codeLine: 2,
      description: `${a[n - 1 - i]} is now in its final position`,
      variables: { i }, comparisons, swaps,
    })
  }
  sorted.unshift(0)
  steps.push({
    array: [...a], comparing: [], swapping: [], sorted: [...sorted],
    pivot: null, codeLine: 7,
    description: '✅ Array is fully sorted!',
    variables: {}, comparisons, swaps,
  })
  return steps
}

export const bubbleSort: AlgorithmDef = {
  name: 'Bubble Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: true,
  description: 'Repeatedly compares adjacent elements and swaps them if out of order. Largest elements "bubble up" to their correct positions.',
  code: [
    'function bubbleSort(arr) {',
    '  for (let i = 0; i < n - 1; i++) {',
    '    for (let j = 0; j < n - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        swap(arr, j, j + 1)',
    '      }',
    '    }',
    '  }',
    '}',
  ],
  generateSteps,
}
