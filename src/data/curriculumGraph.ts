import type { Node, Edge } from '@xyflow/react';

// Manual layout for an RPG Skill Tree feel
export const initialNodes: Node[] = [
  // Tier 1: Intro
  {
    id: 'algo-thinking',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: { labelEn: 'Algo Thinking', labelZh: '算法思维', icon: '🚀', path: '/learn/intro-algo-thinking', locked: false }
  },

  // Tier 2: Basic Arrays & Linked Lists
  {
    id: 'array-fundamentals',
    type: 'custom',
    position: { x: 250, y: 150 },
    data: { labelEn: 'Arrays', labelZh: '数组', icon: '📦', path: '/learn/arrays-fundamentals', locked: false }
  },
  {
    id: 'linked-list-fundamentals',
    type: 'custom',
    position: { x: 550, y: 150 },
    data: { labelEn: 'Linked Lists', labelZh: '链表', icon: '🔗', path: '/learn/linked-list-fundamentals', locked: false }
  },

  // Tier 3: Array Techniques & Stacks/Queues
  {
    id: 'two-pointers',
    type: 'custom',
    position: { x: 100, y: 250 },
    data: { labelEn: 'Two Pointers', labelZh: '双指针', icon: '👉👈', path: '/learn/arrays-two-pointers', locked: false }
  },
  {
    id: 'sliding-window',
    type: 'custom',
    position: { x: 250, y: 250 },
    data: { labelEn: 'Sliding Window', labelZh: '滑动窗口', icon: '🪟', path: '/learn/arrays-sliding-window', locked: false }
  },
  {
    id: 'binary-search',
    type: 'custom',
    position: { x: 400, y: 250 },
    data: { labelEn: 'Binary Search', labelZh: '二分查找', icon: '🔍', path: '/learn/arrays-binary-search', locked: false }
  },
  {
    id: 'stack-queue-basics',
    type: 'custom',
    position: { x: 550, y: 250 },
    data: { labelEn: 'Stacks & Queues', labelZh: '栈与队列', icon: '📚', path: '/learn/stack-queue-basics', locked: false }
  },

  // Tier 4: Hash Tables & Trees
  {
    id: 'hash-table',
    type: 'custom',
    position: { x: 150, y: 350 },
    data: { labelEn: 'Hash Tables', labelZh: '哈希表', icon: '🗂️', path: '/learn/hash-table-basics', locked: false }
  },
  {
    id: 'trees-traversal',
    type: 'custom',
    position: { x: 550, y: 350 },
    data: { labelEn: 'Tree Traversal', labelZh: '树的遍历', icon: '🌳', path: '/learn/trees-traversal', locked: false }
  },

  // Tier 5: Advanced Trees & Sorting
  {
    id: 'sorting',
    type: 'custom',
    position: { x: 150, y: 450 },
    data: { labelEn: 'Sorting', labelZh: '排序算法', icon: '📊', path: '/learn/sorting-bubble-sort', locked: false }
  },
  {
    id: 'trees-bfs',
    type: 'custom',
    position: { x: 450, y: 450 },
    data: { labelEn: 'BFS Engine', labelZh: 'BFS 引擎', icon: '🔄', path: '/learn/trees-bfs', locked: false }
  },
  {
    id: 'backtracking',
    type: 'custom',
    position: { x: 650, y: 450 },
    data: { labelEn: 'Backtracking', labelZh: '回溯算法', icon: '🔄', path: '/learn/backtracking-framework', locked: false }
  },

  // Tier 6: DP & Graphs
  {
    id: 'dp-intro',
    type: 'custom',
    position: { x: 650, y: 550 },
    data: { labelEn: 'Dynamic Prog.', labelZh: '动态规划', icon: '💡', path: '/learn/dp-intro', locked: false }
  },
  {
    id: 'graphs',
    type: 'custom',
    position: { x: 450, y: 550 },
    data: { labelEn: 'Graphs', labelZh: '图论', icon: '🕸️', path: '/learn/graphs-basics', locked: false }
  },

  // Tier 7: Advanced Data Structures
  {
    id: 'union-find',
    type: 'custom',
    position: { x: 250, y: 650 },
    data: { labelEn: 'Union Find', labelZh: '并查集', icon: '🔗', path: '/learn/graphs-union-find', locked: false }
  },
  {
    id: 'heaps',
    type: 'custom',
    position: { x: 750, y: 350 },
    data: { labelEn: 'Binary Heaps', labelZh: '二叉堆', icon: '⛰️', path: '/learn/heaps-binary-heap', locked: false }
  },
  {
    id: 'dp-advanced',
    type: 'custom',
    position: { x: 650, y: 650 },
    data: { labelEn: 'Advanced DP', labelZh: '进阶动规', icon: '🧠', path: '/learn/dp-knapsack', locked: false }
  }
];

const defaultEdgeStyle = { stroke: '#475569', strokeWidth: 2 };
export const initialEdges: Edge[] = [
  { id: 'e-algo-arr', source: 'algo-thinking', target: 'array-fundamentals', style: defaultEdgeStyle },
  { id: 'e-algo-ll', source: 'algo-thinking', target: 'linked-list-fundamentals', style: defaultEdgeStyle },
  
  { id: 'e-arr-tp', source: 'array-fundamentals', target: 'two-pointers', style: defaultEdgeStyle },
  { id: 'e-arr-sw', source: 'array-fundamentals', target: 'sliding-window', style: defaultEdgeStyle },
  { id: 'e-arr-bs', source: 'array-fundamentals', target: 'binary-search', style: defaultEdgeStyle },
  
  { id: 'e-ll-sq', source: 'linked-list-fundamentals', target: 'stack-queue-basics', style: defaultEdgeStyle },

  { id: 'e-arr-ht', source: 'array-fundamentals', target: 'hash-table', style: defaultEdgeStyle },
  
  { id: 'e-sq-trees', source: 'stack-queue-basics', target: 'trees-traversal', style: defaultEdgeStyle },

  { id: 'e-trees-bfs', source: 'trees-traversal', target: 'trees-bfs', style: defaultEdgeStyle },
  { id: 'e-trees-bt', source: 'trees-traversal', target: 'backtracking', style: defaultEdgeStyle },
  
  { id: 'e-bt-dp', source: 'backtracking', target: 'dp-intro', style: defaultEdgeStyle },
  { id: 'e-bfs-graphs', source: 'trees-bfs', target: 'graphs', style: defaultEdgeStyle },
  { id: 'e-arr-sort', source: 'array-fundamentals', target: 'sorting', style: defaultEdgeStyle },
  
  // Advanced edges
  { id: 'e-graphs-uf', source: 'graphs', target: 'union-find', style: defaultEdgeStyle },
  { id: 'e-trees-heaps', source: 'trees-traversal', target: 'heaps', style: defaultEdgeStyle },
  { id: 'e-dp-adv', source: 'dp-intro', target: 'dp-advanced', style: defaultEdgeStyle },
];
