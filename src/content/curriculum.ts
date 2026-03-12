import type { TopicContent } from './types'

import { algoThinking } from './topics/intro/algoThinking'
import { arrayFundamentals } from './topics/arrays/fundamentals'
import { twoPointers } from './topics/arrays/twoPointers'
import { slidingWindow } from './topics/arrays/slidingWindow'
import { binarySearch } from './topics/arrays/binarySearch'
import { prefixSum } from './topics/arrays/prefixSum'
import { linkedListFundamentals } from './topics/linkedList/fundamentals'
import { stackQueueBasics } from './topics/stackQueue/basics'
import { hashTableBasics } from './topics/hashTable/basics'
import { traversalContent } from './topics/trees/traversal'
import { bfsContent } from './topics/trees/bfs'
import { bstContent } from './topics/trees/bst'
import { binaryHeapContent } from './topics/heaps/binaryHeap'
import { graphBasicsContent } from './topics/graphs/basics'
import { unionFindContent } from './topics/graphs/unionFind'
import { backtrackingFrameworkContent } from './topics/backtracking/framework'
import { permutationsContent } from './topics/backtracking/permutations'
import { dpIntroContent } from './topics/dp/intro'
import { fibonacciContent } from './topics/dp/fibonacci'
import { knapsackContent } from './topics/dp/knapsack'
import { bubbleSortContent } from './topics/sorting/bubbleSortContent'
import { mergeSortContent } from './topics/sorting/mergeSortContent'
import { quickSortContent } from './topics/sorting/quickSortContent'

export interface Chapter {
  id: string
  title: { en: string; zh: string }
  icon: string
  topics: TopicContent[]
}

export const curriculum: Chapter[] = [
  {
    id: 'intro',
    title: { en: 'Getting Started', zh: '入门指南' },
    icon: '🚀',
    topics: [algoThinking],
  },
  {
    id: 'arrays',
    title: { en: 'Arrays & Strings', zh: '数组与字符串' },
    icon: '📦',
    topics: [arrayFundamentals, twoPointers, slidingWindow, binarySearch, prefixSum],
  },
  {
    id: 'linked-list',
    title: { en: 'Linked Lists', zh: '链表' },
    icon: '🔗',
    topics: [linkedListFundamentals],
  },
  {
    id: 'stack-queue',
    title: { en: 'Stacks & Queues', zh: '栈与队列' },
    icon: '📚',
    topics: [stackQueueBasics],
  },
  {
    id: 'hash-table',
    title: { en: 'Hash Tables', zh: '哈希表' },
    icon: '🗂️',
    topics: [hashTableBasics],
  },
  {
    id: 'trees',
    title: { en: 'Binary Trees', zh: '二叉树' },
    icon: '🌳',
    topics: [traversalContent, bfsContent, bstContent],
  },
  {
    id: 'heaps',
    title: { en: 'Heaps & Priority Queues', zh: '堆与优先队列' },
    icon: '⛰️',
    topics: [binaryHeapContent],
  },
  {
    id: 'graphs',
    title: { en: 'Graphs', zh: '图论' },
    icon: '🕸️',
    topics: [graphBasicsContent, unionFindContent],
  },
  {
    id: 'backtracking',
    title: { en: 'Backtracking', zh: '回溯算法' },
    icon: '🔄',
    topics: [backtrackingFrameworkContent, permutationsContent],
  },
  {
    id: 'dp',
    title: { en: 'Dynamic Programming', zh: '动态规划' },
    icon: '💡',
    topics: [dpIntroContent, fibonacciContent, knapsackContent],
  },
  {
    id: 'sorting',
    title: { en: 'Sorting Algorithms', zh: '排序算法' },
    icon: '📊',
    topics: [bubbleSortContent, mergeSortContent, quickSortContent],
  },
]

export function findTopic(topicId: string): { chapter: Chapter; topic: TopicContent } | null {
  for (const chapter of curriculum) {
    const topic = chapter.topics.find(t => t.id === topicId)
    if (topic) return { chapter, topic }
  }
  return null
}

export function getNextTopic(topicId: string): TopicContent | null {
  const allTopics = curriculum.flatMap(c => c.topics)
  const idx = allTopics.findIndex(t => t.id === topicId)
  return idx >= 0 && idx < allTopics.length - 1 ? allTopics[idx + 1] : null
}

export function getPrevTopic(topicId: string): TopicContent | null {
  const allTopics = curriculum.flatMap(c => c.topics)
  const idx = allTopics.findIndex(t => t.id === topicId)
  return idx > 0 ? allTopics[idx - 1] : null
}
