import type { Node, Edge } from '@xyflow/react'

// Category color palette
const C = {
  intro:          '#60a5fa', // blue-400
  arrays:         '#34d399', // emerald-400
  linkedList:     '#a78bfa', // violet-400
  stackQueue:     '#fbbf24', // amber-400
  hashTable:      '#f472b6', // pink-400
  sorting:        '#6ee7b7', // teal-300
  trees:          '#4ade80', // green-400
  heaps:          '#fb923c', // orange-400
  graphs:         '#22d3ee', // cyan-400
  backtracking:   '#818cf8', // indigo-400
  dp:             '#e879f9', // fuchsia-400
  sql:            '#38bdf8', // sky-400
}

export const initialNodes: Node[] = [
  // ── Tier 0: Foundation ──────────────────────────────────────────────────
  {
    id: 'algo-thinking',
    type: 'custom',
    position: { x: 400, y: 30 },
    data: { labelEn: 'Algo Thinking', labelZh: '算法思维', color: C.intro, path: '/learn/intro-algo-thinking', locked: false },
  },

  // ── Tier 1: Core Structures ─────────────────────────────────────────────
  {
    id: 'array-fundamentals',
    type: 'custom',
    position: { x: 240, y: 160 },
    data: { labelEn: 'Arrays', labelZh: '数组基础', color: C.arrays, path: '/learn/arrays-fundamentals', locked: false },
  },
  {
    id: 'linked-list-fundamentals',
    type: 'custom',
    position: { x: 560, y: 160 },
    data: { labelEn: 'Linked Lists', labelZh: '链表', color: C.linkedList, path: '/learn/linked-list-fundamentals', locked: false },
  },

  // ── Tier 2: Array Techniques & Stack/Queue ───────────────────────────────
  {
    id: 'prefix-sum',
    type: 'custom',
    position: { x: -30, y: 300 },
    data: { labelEn: 'Prefix Sum', labelZh: '前缀和', color: C.arrays, path: '/learn/arrays-prefix-sum', locked: false },
  },
  {
    id: 'two-pointers',
    type: 'custom',
    position: { x: 110, y: 300 },
    data: { labelEn: 'Two Pointers', labelZh: '双指针', color: C.arrays, path: '/learn/arrays-two-pointers', locked: false },
  },
  {
    id: 'sliding-window',
    type: 'custom',
    position: { x: 250, y: 300 },
    data: { labelEn: 'Sliding Window', labelZh: '滑动窗口', color: C.arrays, path: '/learn/arrays-sliding-window', locked: false },
  },
  {
    id: 'binary-search',
    type: 'custom',
    position: { x: 390, y: 300 },
    data: { labelEn: 'Binary Search', labelZh: '二分查找', color: C.arrays, path: '/learn/arrays-binary-search', locked: false },
  },
  {
    id: 'stack-queue-basics',
    type: 'custom',
    position: { x: 560, y: 300 },
    data: { labelEn: 'Stacks & Queues', labelZh: '栈与队列', color: C.stackQueue, path: '/learn/stack-queue-basics', locked: false },
  },

  // ── Tier 3: Hash + Sorting + Trees ──────────────────────────────────────
  {
    id: 'hash-table',
    type: 'custom',
    position: { x: 110, y: 440 },
    data: { labelEn: 'Hash Tables', labelZh: '哈希表', color: C.hashTable, path: '/learn/hash-table-basics', locked: false },
  },
  {
    id: 'sorting-bubble',
    type: 'custom',
    position: { x: -30, y: 440 },
    data: { labelEn: 'Bubble Sort', labelZh: '冒泡排序', color: C.sorting, path: '/learn/sorting-bubble-sort', locked: false },
  },
  {
    id: 'sorting-merge',
    type: 'custom',
    position: { x: 250, y: 440 },
    data: { labelEn: 'Merge Sort', labelZh: '归并排序', color: C.sorting, path: '/learn/sorting-merge-sort', locked: false },
  },
  {
    id: 'sorting-quick',
    type: 'custom',
    position: { x: 390, y: 440 },
    data: { labelEn: 'Quick Sort', labelZh: '快速排序', color: C.sorting, path: '/learn/sorting-quick-sort', locked: false },
  },
  {
    id: 'trees-traversal',
    type: 'custom',
    position: { x: 560, y: 440 },
    data: { labelEn: 'Tree Traversal', labelZh: '树的遍历', color: C.trees, path: '/learn/trees-traversal', locked: false },
  },
  {
    id: 'heaps',
    type: 'custom',
    position: { x: 730, y: 440 },
    data: { labelEn: 'Binary Heaps', labelZh: '二叉堆', color: C.heaps, path: '/learn/heaps-binary-heap', locked: false },
  },

  // ── Tier 4: Advanced Trees & Backtracking ───────────────────────────────
  {
    id: 'trees-bfs',
    type: 'custom',
    position: { x: 420, y: 580 },
    data: { labelEn: 'BFS', labelZh: '广度优先搜索', color: C.trees, path: '/learn/trees-bfs', locked: false },
  },
  {
    id: 'trees-bst',
    type: 'custom',
    position: { x: 560, y: 580 },
    data: { labelEn: 'BST', labelZh: '二叉搜索树', color: C.trees, path: '/learn/trees-bst', locked: false },
  },
  {
    id: 'backtracking',
    type: 'custom',
    position: { x: 700, y: 580 },
    data: { labelEn: 'Backtracking', labelZh: '回溯算法', color: C.backtracking, path: '/learn/backtracking-framework', locked: false },
  },
  {
    id: 'backtracking-perms',
    type: 'custom',
    position: { x: 840, y: 580 },
    data: { labelEn: 'Permutations', labelZh: '排列组合', color: C.backtracking, path: '/learn/backtracking-permutations', locked: false },
  },

  // ── Tier 5: Graphs & DP ─────────────────────────────────────────────────
  {
    id: 'graphs',
    type: 'custom',
    position: { x: 350, y: 720 },
    data: { labelEn: 'Graphs', labelZh: '图论基础', color: C.graphs, path: '/learn/graphs-basics', locked: false },
  },
  {
    id: 'dp-intro',
    type: 'custom',
    position: { x: 630, y: 720 },
    data: { labelEn: 'Dynamic Prog.', labelZh: '动态规划', color: C.dp, path: '/learn/dp-intro', locked: false },
  },
  {
    id: 'dp-fibonacci',
    type: 'custom',
    position: { x: 790, y: 720 },
    data: { labelEn: 'Fibonacci DP', labelZh: '斐波那契DP', color: C.dp, path: '/learn/dp-fibonacci', locked: false },
  },

  // ── Tier 6: Advanced ────────────────────────────────────────────────────
  {
    id: 'union-find',
    type: 'custom',
    position: { x: 200, y: 860 },
    data: { labelEn: 'Union Find', labelZh: '并查集', color: C.graphs, path: '/learn/graphs-union-find', locked: false },
  },
  {
    id: 'dp-advanced',
    type: 'custom',
    position: { x: 680, y: 860 },
    data: { labelEn: 'Knapsack DP', labelZh: '背包问题', color: C.dp, path: '/learn/dp-knapsack', locked: false },
  },

  // ── SQL Track (right column) ─────────────────────────────────────────────
  {
    id: 'sql-basics',
    type: 'custom',
    position: { x: 1080, y: 30 },
    data: { labelEn: 'SQL Basics', labelZh: 'SQL 基础', color: C.sql, path: '/learn/sql-basics', locked: false },
  },
  {
    id: 'sql-joins',
    type: 'custom',
    position: { x: 1080, y: 160 },
    data: { labelEn: 'SQL Joins', labelZh: 'SQL 连接', color: C.sql, path: '/learn/sql-joins', locked: false },
  },
  {
    id: 'sql-aggregation',
    type: 'custom',
    position: { x: 940, y: 300 },
    data: { labelEn: 'Aggregation', labelZh: '聚合函数', color: C.sql, path: '/learn/sql-aggregation', locked: false },
  },
  {
    id: 'sql-subqueries',
    type: 'custom',
    position: { x: 1080, y: 300 },
    data: { labelEn: 'Subqueries', labelZh: '子查询', color: C.sql, path: '/learn/sql-subqueries', locked: false },
  },
  {
    id: 'sql-window-functions',
    type: 'custom',
    position: { x: 1220, y: 300 },
    data: { labelEn: 'Window Funcs', labelZh: '窗口函数', color: C.sql, path: '/learn/sql-window-functions', locked: false },
  },
  {
    id: 'sql-oracle',
    type: 'custom',
    position: { x: 940, y: 440 },
    data: { labelEn: 'Oracle SQL', labelZh: 'Oracle SQL', color: C.sql, path: '/learn/sql-oracle', locked: false },
  },
  {
    id: 'sql-postgresql',
    type: 'custom',
    position: { x: 1080, y: 440 },
    data: { labelEn: 'PostgreSQL', labelZh: 'PostgreSQL', color: C.sql, path: '/learn/sql-postgresql', locked: false },
  },
  {
    id: 'sql-mysql',
    type: 'custom',
    position: { x: 1220, y: 440 },
    data: { labelEn: 'MySQL', labelZh: 'MySQL', color: C.sql, path: '/learn/sql-mysql', locked: false },
  },
]

// ── Edge helper ────────────────────────────────────────────────────────────
function e(id: string, source: string, target: string, color: string): Edge {
  return {
    id,
    source,
    target,
    style: { stroke: color + '55', strokeWidth: 1.5 },
    markerEnd: { type: 'arrowclosed' as const, color: color + '55', width: 14, height: 14 },
  }
}

export const initialEdges: Edge[] = [
  // Intro → core structures
  e('e-algo-arr', 'algo-thinking', 'array-fundamentals', C.intro),
  e('e-algo-ll',  'algo-thinking', 'linked-list-fundamentals', C.intro),

  // Arrays → techniques
  e('e-arr-ps',  'array-fundamentals', 'prefix-sum',    C.arrays),
  e('e-arr-tp',  'array-fundamentals', 'two-pointers',  C.arrays),
  e('e-arr-sw',  'array-fundamentals', 'sliding-window', C.arrays),
  e('e-arr-bs',  'array-fundamentals', 'binary-search', C.arrays),
  e('e-arr-ht',  'array-fundamentals', 'hash-table',    C.arrays),
  e('e-arr-sb',  'array-fundamentals', 'sorting-bubble', C.sorting),

  // Linked list → stack/queue
  e('e-ll-sq',   'linked-list-fundamentals', 'stack-queue-basics', C.linkedList),

  // Stack/queue → trees
  e('e-sq-tree', 'stack-queue-basics', 'trees-traversal', C.stackQueue),

  // Sorting chain
  e('e-sb-sm',   'sorting-bubble', 'sorting-merge', C.sorting),
  e('e-sm-sq',   'sorting-merge',  'sorting-quick', C.sorting),

  // Trees
  e('e-tree-bfs',  'trees-traversal', 'trees-bfs', C.trees),
  e('e-tree-bst',  'trees-traversal', 'trees-bst', C.trees),
  e('e-tree-bt',   'trees-traversal', 'backtracking', C.trees),
  e('e-tree-heap', 'trees-traversal', 'heaps', C.trees),

  // Backtracking → permutations + DP
  e('e-bt-perms', 'backtracking', 'backtracking-perms', C.backtracking),
  e('e-bt-dp',    'backtracking', 'dp-intro', C.backtracking),

  // BFS → graphs
  e('e-bfs-graph', 'trees-bfs', 'graphs', C.trees),

  // DP chain
  e('e-dp-fib', 'dp-intro', 'dp-fibonacci', C.dp),
  e('e-dp-adv', 'dp-intro', 'dp-advanced',  C.dp),

  // Graphs → union find
  e('e-graph-uf', 'graphs', 'union-find', C.graphs),

  // SQL track
  e('e-sql-basics-joins', 'sql-basics',  'sql-joins',         C.sql),
  e('e-sql-joins-agg',    'sql-joins',   'sql-aggregation',   C.sql),
  e('e-sql-joins-sub',    'sql-joins',   'sql-subqueries',    C.sql),
  e('e-sql-joins-win',    'sql-joins',   'sql-window-functions', C.sql),
  e('e-sql-agg-ora',      'sql-aggregation',    'sql-oracle',      C.sql),
  e('e-sql-sub-pg',       'sql-subqueries',     'sql-postgresql',  C.sql),
  e('e-sql-win-my',       'sql-window-functions', 'sql-mysql',     C.sql),
]
