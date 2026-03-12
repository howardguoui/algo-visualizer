export interface VizPointer {
  index: number
  label: string   // e.g. "L", "R", "M", "S", "F", "i"
  color: string   // CSS color for the label text
}

export interface VizStep {
  cells: (string | number)[]
  cellColors: string[]
  pointers: VizPointer[]
  secondCells?: (string | number)[]
  secondCellColors?: string[]
  secondLabel?: string
  windowRange?: [number, number]
  phase?: string
  description: string
  variables?: [string, string | number][]
  result?: string
}

export interface VizInputField {
  key: string
  label: string
  type: 'string' | 'number' | 'number[]'
  placeholder: string
  defaultValue: string   // string representation shown in the input box
}

export interface VizConfig {
  title: string
  demoInput: string
  steps: VizStep[]
  inputSchema: VizInputField[]
}
