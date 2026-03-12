export interface Step {
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  pivot: number | null
  codeLine: number
  description: string
  variables: Record<string, number | string>
  comparisons: number
  swaps: number
}

export interface Complexity {
  best: string
  average: string
  worst: string
}

export interface AlgorithmDef {
  name: string
  category: string
  timeComplexity: Complexity
  spaceComplexity: string
  stable: boolean
  description: string
  code: string[]
  generateSteps: (arr: number[]) => Step[]
}
