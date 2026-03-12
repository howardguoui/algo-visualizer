export interface LeetCodeProblem {
  id: number
  title: string
  titleZh: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export interface TopicContent {
  id: string
  title: { en: string; zh: string }
  description: { en: string; zh: string }
  timeEstimate: string
  contentType: 'content' | 'content+visual' | 'content+practice' | 'all'
  hasVisualizer: boolean
  visualizerKey?: string
  content: { en: string; zh: string }
  leetcode: LeetCodeProblem[]
}
