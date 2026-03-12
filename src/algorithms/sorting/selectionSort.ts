import type { Step, AlgorithmDef } from '../types'

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = []
  const a = [...input]
  const n = a.length
  const sorted: number[] = []
  let comparisons = 0
  let swaps = 0

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({
      array: [...a], comparing: [i], swapping: [], sorted: [...sorted],
      pivot: i, codeLine: 2,
      description: `Starting pass ${i + 1}: assume a[${i}] = ${a[i]} is minimum`,
      variables: { i, minIdx }, comparisons, swaps,
    })

    for (let j = i + 1; j < n; j++) {
      comparisons++
      steps.push({
        array: [...a], comparing: [j, minIdx], swapping: [], sorted: [...sorted],
        pivot: minIdx, codeLine: 4,
        description: `Comparing a[${j}] = ${a[j]} with current min a[${minIdx}] = ${a[minIdx]}`,
        variables: { i, j, minIdx }, comparisons, swaps,
      })
      if (a[j] < a[minIdx]) {
        minIdx = j
        steps.push({
          array: [...a], comparing: [minIdx], swapping: [], sorted: [...sorted],
          pivot: minIdx, codeLine: 5,
          description: `New minimum found! a[${minIdx}] = ${a[minIdx]}`,
          variables: { i, j, minIdx }, comparisons, swaps,
        })
      }
    }

    if (minIdx !== i) {
      swaps++;
      [a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({
        array: [...a], comparing: [], swapping: [i, minIdx], sorted: [...sorted],
        pivot: null, codeLine: 7,
        description: `Swapped a[${i}] ↔ a[${minIdx}] to place ${a[i]} in position ${i}`,
        variables: { i, minIdx }, comparisons, swaps,
      })
    }
    sorted.push(i)
    steps.push({
      array: [...a], comparing: [], swapping: [], sorted: [...sorted],
      pivot: null, codeLine: 2,
      description: `${a[i]} is now in its final position`,
      variables: { i }, comparisons, swaps,
    })
  }
  sorted.push(n - 1)
  steps.push({
    array: [...a], comparing: [], swapping: [], sorted: [...sorted],
    pivot: null, codeLine: 9,
    description: '✅ Array is fully sorted!',
    variables: {}, comparisons, swaps,
  })
  return steps
}

export const selectionSort: AlgorithmDef = {
  name: 'Selection Sort',
  category: 'Sorting',
  timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: false,
  description: 'Divides array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and places it at the beginning.',
  code: [
    'function selectionSort(arr) {',
    '  for (let i = 0; i < n - 1; i++) {',
    '    let minIdx = i',
    '    for (let j = i + 1; j < n; j++) {',
    '      if (arr[j] < arr[minIdx])',
    '        minIdx = j',
    '    }',
    '    if (minIdx !== i)',
    '      swap(arr, i, minIdx)',
    '  }',
    '}',
  ],
  generateSteps,
}
