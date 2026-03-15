/**
 * Labuladong curriculum definition.
 *
 * Chapter structure mirrors labuladong.online/zh/algo/:
 *   Intro  →  Site intro + language basics
 *   Found  →  Data structure & sorting fundamentals
 *   Ch 0   →  Core algorithm frameworks
 *   Ch 1   →  Classic data-structure algorithms
 *   Ch 2   →  Brute-force search (DFS / backtracking / BFS)
 *   Ch 3   →  Dynamic programming
 *   Ch 4   →  Other techniques (greedy, math, CS, design patterns)
 *   PS     →  Problem set (static final page)
 *
 * zhPath is relative to public/labuladong/zh/  (e.g. "essential-technique/algorithm-summary")
 * The English file lives at:            public/labuladong/en/[same path]
 */

export interface LabuladongArticle {
  id: string                      // URL-safe slug, unique across all chapters
  zhPath: string                  // e.g. "essential-technique/algorithm-summary"
  title: { en: string; zh: string }
}

export interface LabuladongSection {
  id: string
  title: { en: string; zh: string }
  articles: LabuladongArticle[]
}

export interface LabuladongChapter {
  id: string
  label: string                   // e.g. "Chapter 0" or "Intro"
  title: { en: string; zh: string }
  icon: string
  sections: LabuladongSection[]
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helper
// ─────────────────────────────────────────────────────────────────────────────

export function allArticles(): LabuladongArticle[] {
  return labuladongChapters.flatMap(ch => ch.sections.flatMap(s => s.articles))
}

export function findArticle(id: string): {
  chapter: LabuladongChapter
  section: LabuladongSection
  article: LabuladongArticle
} | null {
  for (const chapter of labuladongChapters) {
    for (const section of chapter.sections) {
      const article = section.articles.find(a => a.id === id)
      if (article) return { chapter, section, article }
    }
  }
  return null
}

export function getAdjacentArticles(id: string): {
  prev: LabuladongArticle | null
  next: LabuladongArticle | null
} {
  const flat = allArticles()
  const idx = flat.findIndex(a => a.id === id)
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  CHAPTERS
// ─────────────────────────────────────────────────────────────────────────────

export const labuladongChapters: LabuladongChapter[] = [

  // ── INTRO ──────────────────────────────────────────────────────────────────
  {
    id: 'lb-intro',
    label: 'Intro',
    icon: '📖',
    title: { en: 'Introduction', zh: '序章' },
    sections: [
      {
        id: 'lb-intro-start',
        title: { en: 'Getting Started', zh: '入门导读' },
        articles: [
          { id: 'lb-home',                     zhPath: 'home',                           title: { en: 'Site Introduction',           zh: '本站简介' } },
          { id: 'lb-quick-learning-plan',       zhPath: 'intro/quick-learning-plan',       title: { en: 'Quick Learning Plan',          zh: '速成目录学习规划' } },
          { id: 'lb-beginner-learning-plan',    zhPath: 'intro/beginner-learning-plan',    title: { en: 'Complete Learning Plan',       zh: '完整目录学习规划' } },
          { id: 'lb-how-to-learn-algorithms',   zhPath: 'intro/how-to-learn-algorithms',   title: { en: 'How to Study Algorithms',      zh: '算法刷题的重点和坑' } },
          { id: 'lb-how-to-practice',           zhPath: 'intro/how-to-practice',           title: { en: 'How to Practice',              zh: '习题章节的练习方法' } },
        ],
      },
      {
        id: 'lb-intro-lang',
        title: { en: 'Programming Language Basics', zh: '编程语言基础' },
        articles: [
          { id: 'lb-lang-c',        zhPath: 'programming-language-basic/c',          title: { en: 'C Language Basics',   zh: 'C 语言基础' } },
          { id: 'lb-lang-cpp',      zhPath: 'programming-language-basic/cpp',        title: { en: 'C++ Basics',          zh: 'C++ 语言基础' } },
          { id: 'lb-lang-java',     zhPath: 'programming-language-basic/java',       title: { en: 'Java Basics',         zh: 'Java 语言基础' } },
          { id: 'lb-lang-golang',   zhPath: 'programming-language-basic/golang',     title: { en: 'Go Basics',           zh: 'Golang 语言基础' } },
          { id: 'lb-lang-python',   zhPath: 'programming-language-basic/python',     title: { en: 'Python Basics',       zh: 'Python 语言基础' } },
          { id: 'lb-lang-js',       zhPath: 'intro/js',                              title: { en: 'JavaScript Basics',   zh: 'JavaScript 语言基础' } },
          { id: 'lb-lang-leetcode', zhPath: 'intro/leetcode',                        title: { en: 'LeetCode Guide',      zh: 'LeetCode 使用指南' } },
          { id: 'lb-lang-practice', zhPath: 'programming-language-basic/lc-practice',title: { en: 'Practice Modes',      zh: 'LeetCode 刷题模式' } },
        ],
      },
    ],
  },

  // ── FOUNDATIONS ────────────────────────────────────────────────────────────
  {
    id: 'lb-foundations',
    label: 'Foundations',
    icon: '🏗️',
    title: { en: 'Foundations: Data Structures & Sorting', zh: '基础：数据结构及排序精讲' },
    sections: [
      {
        id: 'lb-found-array',
        title: { en: 'Arrays & Linked Lists', zh: '数组与链表' },
        articles: [
          { id: 'lb-complexity-basic',       zhPath: 'intro/complexity-basic',                        title: { en: 'Time & Space Complexity',     zh: '时间与空间复杂度' } },
          { id: 'lb-array-basic',            zhPath: 'data-structure-basic/array-basic',              title: { en: 'Array Basics',               zh: '数组基础' } },
          { id: 'lb-array-implement',        zhPath: 'data-structure-basic/array-implement',          title: { en: 'Dynamic Array Implementation',zh: '动态数组实现' } },
          { id: 'lb-linkedlist-basic',       zhPath: 'data-structure-basic/linkedlist-basic',         title: { en: 'Linked List Basics',          zh: '链表基础' } },
          { id: 'lb-linkedlist-implement',   zhPath: 'data-structure-basic/linkedlist-implement',     title: { en: 'Linked List Implementation', zh: '链表实现' } },
          { id: 'lb-cycle-array',            zhPath: 'data-structure-basic/cycle-array',              title: { en: 'Circular Array',              zh: '环形数组' } },
          { id: 'lb-skip-list-basic',        zhPath: 'data-structure-basic/skip-list-basic',          title: { en: 'Skip List',                  zh: '跳表' } },
          { id: 'lb-bitmap',                 zhPath: 'data-structure-basic/bitmap',                   title: { en: 'Bitmap',                     zh: '位图' } },
        ],
      },
      {
        id: 'lb-found-queue',
        title: { en: 'Queue, Stack & Hash', zh: '队列、栈与哈希' },
        articles: [
          { id: 'lb-queue-stack-basic',           zhPath: 'data-structure-basic/queue-stack-basic',          title: { en: 'Queue & Stack Basics',           zh: '队列和栈基础' } },
          { id: 'lb-linked-queue-stack',          zhPath: 'data-structure-basic/linked-queue-stack',         title: { en: 'Linked List Queue & Stack',       zh: '链式队列和栈' } },
          { id: 'lb-array-queue-stack',           zhPath: 'data-structure-basic/array-queue-stack',          title: { en: 'Array Queue & Stack',            zh: '数组队列和栈' } },
          { id: 'lb-deque-implement',             zhPath: 'data-structure-basic/deque-implement',            title: { en: 'Deque Implementation',           zh: '双端队列实现' } },
          { id: 'lb-hashmap-basic',               zhPath: 'data-structure-basic/hashmap-basic',              title: { en: 'Hash Map Basics',                zh: '哈希表基础' } },
          { id: 'lb-hashtable-chaining',          zhPath: 'data-structure-basic/hashtable-chaining',         title: { en: 'Chaining Hash Table',            zh: '拉链法哈希表' } },
          { id: 'lb-linear-probing-key-point',    zhPath: 'data-structure-basic/linear-probing-key-point',   title: { en: 'Linear Probing Key Points',       zh: '线性探查法要点' } },
          { id: 'lb-linear-probing-code',         zhPath: 'data-structure-basic/linear-probing-code',        title: { en: 'Linear Probing Implementation',  zh: '线性探查法实现' } },
          { id: 'lb-hash-set',                    zhPath: 'data-structure-basic/hash-set',                   title: { en: 'Hash Set',                       zh: '哈希集合' } },
          { id: 'lb-hashtable-with-linked-list',  zhPath: 'data-structure-basic/hashtable-with-linked-list', title: { en: 'LinkedHashMap',                  zh: 'LinkedHashMap' } },
          { id: 'lb-hashtable-with-array',        zhPath: 'data-structure-basic/hashtable-with-array',       title: { en: 'ArrayHashMap',                   zh: 'ArrayHashMap' } },
          { id: 'lb-bloom-filter',                zhPath: 'data-structure-basic/bloom-filter',               title: { en: 'Bloom Filter',                   zh: '布隆过滤器' } },
        ],
      },
      {
        id: 'lb-found-trees',
        title: { en: 'Trees', zh: '树结构' },
        articles: [
          { id: 'lb-binary-tree-basic',          zhPath: 'data-structure-basic/binary-tree-basic',          title: { en: 'Binary Tree Basics',          zh: '二叉树基础' } },
          { id: 'lb-binary-tree-traverse-basic', zhPath: 'data-structure-basic/binary-tree-traverse-basic', title: { en: 'Binary Tree Traversal',       zh: '二叉树遍历基础' } },
          { id: 'lb-use-case-of-dfs-bfs',        zhPath: 'data-structure-basic/use-case-of-dfs-bfs',        title: { en: 'DFS vs BFS Use Cases',        zh: 'DFS/BFS 使用场景' } },
          { id: 'lb-n-ary-tree-traverse-basic',  zhPath: 'data-structure-basic/n-ary-tree-traverse-basic',  title: { en: 'N-ary Tree Traversal',        zh: 'N叉树遍历' } },
          { id: 'lb-tree-map-basic',             zhPath: 'data-structure-basic/tree-map-basic',             title: { en: 'TreeMap Basics',              zh: 'TreeMap 基础' } },
          { id: 'lb-rbtree-basic',               zhPath: 'data-structure-basic/rbtree-basic',               title: { en: 'Red-Black Tree',              zh: '红黑树' } },
          { id: 'lb-trie-map-basic',             zhPath: 'data-structure-basic/trie-map-basic',             title: { en: 'Trie Map Basics',             zh: '前缀树 Map 基础' } },
          { id: 'lb-binary-heap-basic',          zhPath: 'data-structure-basic/binary-heap-basic',          title: { en: 'Binary Heap Basics',          zh: '二叉堆基础' } },
          { id: 'lb-binary-heap-implement',      zhPath: 'data-structure-basic/binary-heap-implement',      title: { en: 'Binary Heap Implementation',  zh: '二叉堆实现' } },
          { id: 'lb-segment-tree-basic',         zhPath: 'data-structure-basic/segment-tree-basic',         title: { en: 'Segment Tree Basics',         zh: '线段树基础' } },
          { id: 'lb-huffman-tree',               zhPath: 'data-structure-basic/huffman-tree',               title: { en: 'Huffman Tree',                zh: '哈夫曼树' } },
        ],
      },
      {
        id: 'lb-found-graphs',
        title: { en: 'Graphs', zh: '图结构' },
        articles: [
          { id: 'lb-graph-terminology',        zhPath: 'data-structure-basic/graph-terminology',        title: { en: 'Graph Terminology',        zh: '图论术语' } },
          { id: 'lb-graph-basic',              zhPath: 'data-structure-basic/graph-basic',              title: { en: 'Graph Basics',             zh: '图基础' } },
          { id: 'lb-graph-traverse-basic',     zhPath: 'data-structure-basic/graph-traverse-basic',     title: { en: 'Graph Traversal',          zh: '图遍历基础' } },
          { id: 'lb-eulerian-graph',           zhPath: 'data-structure-basic/eulerian-graph',           title: { en: 'Eulerian Graph',           zh: '欧拉图' } },
          { id: 'lb-graph-shortest-path',      zhPath: 'data-structure-basic/graph-shortest-path',      title: { en: 'Shortest Path Overview',   zh: '最短路径概述' } },
          { id: 'lb-graph-minimum-spanning',   zhPath: 'data-structure-basic/graph-minimum-spanning-tree', title: { en: 'Minimum Spanning Tree',  zh: '最小生成树' } },
          { id: 'lb-union-find-basic',         zhPath: 'data-structure-basic/union-find-basic',         title: { en: 'Union-Find Basics',        zh: '并查集基础' } },
        ],
      },
      {
        id: 'lb-found-sorting',
        title: { en: 'Sorting Algorithms', zh: '排序算法' },
        articles: [
          { id: 'lb-sort-basic',      zhPath: 'data-structure-basic/sort-basic',      title: { en: 'Sorting Overview',     zh: '排序算法概述' } },
          { id: 'lb-select-sort',     zhPath: 'data-structure-basic/select-sort',     title: { en: 'Selection Sort',       zh: '选择排序' } },
          { id: 'lb-bubble-sort',     zhPath: 'data-structure-basic/bubble-sort',     title: { en: 'Bubble Sort',          zh: '冒泡排序' } },
          { id: 'lb-insertion-sort',  zhPath: 'data-structure-basic/insertion-sort',  title: { en: 'Insertion Sort',       zh: '插入排序' } },
          { id: 'lb-shell-sort',      zhPath: 'data-structure-basic/shell-sort',      title: { en: 'Shell Sort',           zh: '希尔排序' } },
          { id: 'lb-quick-sort',      zhPath: 'data-structure-basic/quick-sort',      title: { en: 'Quick Sort',           zh: '快速排序' } },
          { id: 'lb-merge-sort',      zhPath: 'data-structure-basic/merge-sort',      title: { en: 'Merge Sort',           zh: '归并排序' } },
          { id: 'lb-heap-sort',       zhPath: 'data-structure-basic/heap-sort',       title: { en: 'Heap Sort',            zh: '堆排序' } },
          { id: 'lb-counting-sort',   zhPath: 'data-structure-basic/counting-sort',   title: { en: 'Counting Sort',        zh: '计数排序' } },
          { id: 'lb-bucket-sort',     zhPath: 'data-structure-basic/bucket-sort',     title: { en: 'Bucket Sort',          zh: '桶排序' } },
          { id: 'lb-radix-sort',      zhPath: 'data-structure-basic/radix-sort',      title: { en: 'Radix Sort',           zh: '基数排序' } },
        ],
      },
    ],
  },

  // ── CHAPTER 0: CORE FRAMEWORKS ─────────────────────────────────────────────
  {
    id: 'lb-chapter-0',
    label: 'Chapter 0',
    icon: '⚡',
    title: { en: 'Core Algorithm Frameworks', zh: '第零章：核心刷题框架汇总' },
    sections: [
      {
        id: 'lb-ch0-thinking',
        title: { en: 'Algorithm Thinking', zh: '算法思维' },
        articles: [
          { id: 'lb-algorithm-summary',   zhPath: 'essential-technique/algorithm-summary',   title: { en: 'How to Think About Algorithms', zh: '学习算法和刷题的框架思维' } },
          { id: 'lb-complexity-analysis', zhPath: 'essential-technique/complexity-analysis', title: { en: 'Complexity Analysis',           zh: '时间空间复杂度分析' } },
        ],
      },
      {
        id: 'lb-ch0-array',
        title: { en: 'Array Frameworks', zh: '数组类框架' },
        articles: [
          { id: 'lb-array-two-pointers',   zhPath: 'essential-technique/array-two-pointers-summary',  title: { en: 'Two Pointers',          zh: '双指针技巧汇总' } },
          { id: 'lb-sliding-window',       zhPath: 'essential-technique/sliding-window-framework',    title: { en: 'Sliding Window',        zh: '滑动窗口框架' } },
          { id: 'lb-binary-search',        zhPath: 'essential-technique/binary-search-framework',     title: { en: 'Binary Search',         zh: '二分搜索框架' } },
          { id: 'lb-binary-search-left',   zhPath: 'essential-technique/binary-search-left-open',     title: { en: 'Binary Search Variants',zh: '二分搜索变体' } },
        ],
      },
      {
        id: 'lb-ch0-linkedlist',
        title: { en: 'Linked List Frameworks', zh: '链表类框架' },
        articles: [
          { id: 'lb-linked-list-skills',   zhPath: 'essential-technique/linked-list-skills-summary',  title: { en: 'Linked List Techniques', zh: '链表算法技巧汇总' } },
        ],
      },
      {
        id: 'lb-ch0-tree',
        title: { en: 'Tree Frameworks', zh: '二叉树框架' },
        articles: [
          { id: 'lb-binary-tree-fw',       zhPath: 'essential-technique/binary-tree-summary',         title: { en: 'Binary Tree Framework',  zh: '二叉树心法汇总' } },
          { id: 'lb-understand-recursion', zhPath: 'essential-technique/understand-recursion',         title: { en: 'Understanding Recursion',zh: '学会递归' } },
        ],
      },
      {
        id: 'lb-ch0-search',
        title: { en: 'Search Frameworks', zh: '搜索类框架' },
        articles: [
          { id: 'lb-backtrack-fw',         zhPath: 'essential-technique/backtrack-framework',          title: { en: 'Backtracking Framework', zh: '回溯算法框架' } },
          { id: 'lb-bfs-fw',               zhPath: 'essential-technique/bfs-framework',               title: { en: 'BFS Framework',          zh: 'BFS 算法框架' } },
          { id: 'lb-permutation-fw',       zhPath: 'essential-technique/permutation-combination-subset-all-in-one', title: { en: 'Permutation / Combination / Subset', zh: '排列/组合/子集 问题' } },
        ],
      },
      {
        id: 'lb-ch0-other',
        title: { en: 'Other Core Frameworks', zh: '其他框架' },
        articles: [
          { id: 'lb-dp-fw',                zhPath: 'essential-technique/dynamic-programming-framework', title: { en: 'Dynamic Programming Framework', zh: '动态规划框架' } },
          { id: 'lb-greedy-fw',            zhPath: 'essential-technique/greedy',                       title: { en: 'Greedy Algorithm',             zh: '贪心算法' } },
          { id: 'lb-divide-and-conquer',   zhPath: 'essential-technique/divide-and-conquer',           title: { en: 'Divide & Conquer',             zh: '分治算法' } },
          { id: 'lb-math-techniques',      zhPath: 'essential-technique/math-techniques-summary',      title: { en: 'Math Techniques',              zh: '数学技巧汇总' } },
        ],
      },
    ],
  },

  // ── CHAPTER 1: CLASSIC DS ALGORITHMS ───────────────────────────────────────
  {
    id: 'lb-chapter-1',
    label: 'Chapter 1',
    icon: '📐',
    title: { en: 'Classic Data Structure Algorithms', zh: '第一章：经典数据结构算法' },
    sections: [
      {
        id: 'lb-ch1-linkedlist',
        title: { en: 'Linked List', zh: '链表' },
        articles: [
          { id: 'lb-reverse-linked-list',   zhPath: 'data-structure/reverse-linked-list-recursion',  title: { en: 'Reverse Linked List',     zh: '递归反转链表' } },
          { id: 'lb-palindrome-linked',     zhPath: 'data-structure/palindrome-linked-list',         title: { en: 'Palindrome Linked List',  zh: '判断回文链表' } },
        ],
      },
      {
        id: 'lb-ch1-array',
        title: { en: 'Arrays & Strings', zh: '数组与字符串' },
        articles: [
          { id: 'lb-2d-array',             zhPath: 'practice-in-action/2d-array-traversal-summary', title: { en: '2D Array Traversal',     zh: '二维数组遍历技巧' } },
          { id: 'lb-nsum',                 zhPath: 'practice-in-action/nsum',                       title: { en: 'N-Sum Problems',         zh: 'nSum 问题' } },
          { id: 'lb-prefix-sum',           zhPath: 'data-structure/prefix-sum',                     title: { en: 'Prefix Sum',             zh: '前缀和技巧' } },
          { id: 'lb-diff-array',           zhPath: 'data-structure/diff-array',                     title: { en: 'Difference Array',       zh: '差分数组技巧' } },
          { id: 'lb-rabinkarp',            zhPath: 'practice-in-action/rabinkarp',                  title: { en: 'Rabin-Karp Algorithm',   zh: 'Rabin-Karp 字符串匹配' } },
          { id: 'lb-advantage-shuffle',    zhPath: 'practice-in-action/advantage-shuffle',          title: { en: 'Advantage Shuffle',      zh: '田忌赛马（优势洗牌）' } },
        ],
      },
      {
        id: 'lb-ch1-stack',
        title: { en: 'Stack & Queue', zh: '栈与队列' },
        articles: [
          { id: 'lb-stack-queue',           zhPath: 'data-structure/stack-queue',         title: { en: 'Stack & Queue Problems',   zh: '栈和队列题目' } },
          { id: 'lb-monotonic-stack',       zhPath: 'data-structure/monotonic-stack',     title: { en: 'Monotonic Stack',          zh: '单调栈' } },
          { id: 'lb-monotonic-queue',       zhPath: 'data-structure/monotonic-queue',     title: { en: 'Monotonic Queue',          zh: '单调队列' } },
          { id: 'lb-implement-calculator',  zhPath: 'data-structure/implement-calculator',title: { en: 'Implement Calculator',    zh: '实现计算器' } },
        ],
      },
      {
        id: 'lb-ch1-tree',
        title: { en: 'Binary Tree', zh: '二叉树' },
        articles: [
          { id: 'lb-bt-part1',         zhPath: 'data-structure/binary-tree-part1',                    title: { en: 'Binary Tree – Intuition',           zh: '二叉树心法（思路篇）' } },
          { id: 'lb-bt-part2',         zhPath: 'data-structure/binary-tree-part2',                    title: { en: 'Binary Tree – Construction',        zh: '二叉树心法（构造篇）' } },
          { id: 'lb-bt-part3',         zhPath: 'data-structure/binary-tree-part3',                    title: { en: 'Binary Tree – Post-order',          zh: '二叉树心法（后序篇）' } },
          { id: 'lb-bt-serialize',     zhPath: 'data-structure/serialize-and-deserialize-binary-tree',title: { en: 'Serialize & Deserialize',           zh: '序列化和反序列化二叉树' } },
          { id: 'lb-bt-iterative',     zhPath: 'data-structure/iterative-traversal-binary-tree',     title: { en: 'Iterative Tree Traversal',          zh: '迭代遍历二叉树' } },
          { id: 'lb-bt-count',         zhPath: 'data-structure/count-complete-tree-nodes',           title: { en: 'Count Complete Tree Nodes',         zh: '完全二叉树的节点数' } },
          { id: 'lb-bt-lca',           zhPath: 'practice-in-action/lowest-common-ancestor-summary',  title: { en: 'Lowest Common Ancestor',            zh: '最近公共祖先汇总' } },
          { id: 'lb-bt-flatten',       zhPath: 'data-structure/flatten-nested-list-iterator',        title: { en: 'Flatten Nested List',               zh: '扁平化嵌套列表' } },
        ],
      },
      {
        id: 'lb-ch1-bst',
        title: { en: 'BST & Tries', zh: 'BST 与字典树' },
        articles: [
          { id: 'lb-bst-part1',   zhPath: 'data-structure/bst-part1',   title: { en: 'BST – Basics',      zh: 'BST 基础（一）' } },
          { id: 'lb-bst-part2',   zhPath: 'data-structure/bst-part2',   title: { en: 'BST – Operations',  zh: 'BST 基础（二）' } },
          { id: 'lb-bst-part3',   zhPath: 'data-structure/bst-part3',   title: { en: 'BST – Construction',zh: 'BST 基础（三）' } },
          { id: 'lb-bst-part4',   zhPath: 'data-structure/bst-part4',   title: { en: 'BST – Advanced',    zh: 'BST 基础（四）' } },
          { id: 'lb-trie-impl',   zhPath: 'data-structure/trie-implement',title: { en: 'Trie Implementation',zh: '字典树实现' } },
        ],
      },
      {
        id: 'lb-ch1-ds-design',
        title: { en: 'Data Structure Design', zh: '数据结构设计' },
        articles: [
          { id: 'lb-lru-cache',        zhPath: 'data-structure/lru-cache',              title: { en: 'LRU Cache',              zh: 'LRU 缓存' } },
          { id: 'lb-lfu',              zhPath: 'frequency-interview/lfu',               title: { en: 'LFU Cache',              zh: 'LFU 缓存' } },
          { id: 'lb-exam-room',        zhPath: 'frequency-interview/exam-room',          title: { en: 'Exam Room Design',       zh: '考场就座问题' } },
          { id: 'lb-random-set',       zhPath: 'data-structure/random-set',             title: { en: 'Randomized Set',         zh: '随机集合' } },
          { id: 'lb-consistent-hash',  zhPath: 'data-structure/consistent-hashing',     title: { en: 'Consistent Hashing',     zh: '一致性哈希' } },
        ],
      },
      {
        id: 'lb-ch1-graph',
        title: { en: 'Graph Algorithms', zh: '图算法' },
        articles: [
          { id: 'lb-bipartite',       zhPath: 'data-structure/bipartite-graph',     title: { en: 'Bipartite Graph',       zh: '二分图判定' } },
          { id: 'lb-topology',        zhPath: 'data-structure/topological-sort',    title: { en: 'Topological Sort',      zh: '拓扑排序' } },
          { id: 'lb-kruskal',         zhPath: 'data-structure/kruskal',             title: { en: 'Kruskal MST',           zh: 'Kruskal 最小生成树' } },
          { id: 'lb-prim',            zhPath: 'data-structure/prim',                title: { en: 'Prim MST',              zh: 'Prim 最小生成树' } },
          { id: 'lb-dijkstra',        zhPath: 'data-structure/dijkstra',            title: { en: 'Dijkstra Shortest Path',zh: 'Dijkstra 最短路径' } },
          { id: 'lb-dijkstra-adv',    zhPath: 'data-structure/dijkstra-follow-up',  title: { en: 'Dijkstra Advanced',     zh: 'Dijkstra 变体' } },
          { id: 'lb-floyd',           zhPath: 'data-structure/floyd',               title: { en: 'Floyd-Warshall',        zh: 'Floyd 算法' } },
          { id: 'lb-a-star',          zhPath: 'data-structure/a-star',              title: { en: 'A* Algorithm',          zh: 'A* 算法' } },
          { id: 'lb-union-find',      zhPath: 'data-structure/union-find',          title: { en: 'Union-Find',            zh: '并查集' } },
          { id: 'lb-cycle-detection', zhPath: 'data-structure/cycle-detection',     title: { en: 'Cycle Detection',       zh: '环检测' } },
          { id: 'lb-eulerian-hier',   zhPath: 'data-structure/eulerian-graph-hierholzer', title: { en: 'Eulerian Path',   zh: '欧拉路径' } },
          { id: 'lb-island-dfs',      zhPath: 'frequency-interview/island-dfs-summary', title: { en: 'Island DFS Problems',zh: '岛屿问题汇总' } },
        ],
      },
      {
        id: 'lb-ch1-segment',
        title: { en: 'Segment Tree & Heap', zh: '线段树与堆' },
        articles: [
          { id: 'lb-segment-impl',      zhPath: 'data-structure/segment-tree-implement',    title: { en: 'Segment Tree Implementation', zh: '线段树实现' } },
          { id: 'lb-segment-lazy',      zhPath: 'data-structure/segment-tree-lazy-update',  title: { en: 'Segment Tree Lazy Update',    zh: '线段树懒惰更新' } },
          { id: 'lb-segment-dynamic',   zhPath: 'data-structure/segment-tree-dynamic',      title: { en: 'Dynamic Segment Tree',        zh: '动态线段树' } },
          { id: 'lb-median-finder',     zhPath: 'practice-in-action/find-median-from-data-stream', title: { en: 'Find Median from Stream', zh: '数据流中位数' } },
        ],
      },
      {
        id: 'lb-ch1-binary-search',
        title: { en: 'Binary Search in Action', zh: '二分搜索实战' },
        articles: [
          { id: 'lb-binary-search-action',  zhPath: 'frequency-interview/binary-search-in-action', title: { en: 'Binary Search Applications', zh: '二分搜索应用' } },
          { id: 'lb-random-pick',           zhPath: 'frequency-interview/random-pick-with-weight', title: { en: 'Random Pick with Weight',    zh: '按权重随机选择' } },
        ],
      },
    ],
  },

  // ── CHAPTER 2: BRUTE-FORCE SEARCH ──────────────────────────────────────────
  {
    id: 'lb-chapter-2',
    label: 'Chapter 2',
    icon: '🔍',
    title: { en: 'Brute-Force Search', zh: '第二章：暴力搜索算法' },
    sections: [
      {
        id: 'lb-ch2-backtrack',
        title: { en: 'DFS & Backtracking', zh: 'DFS 与回溯' },
        articles: [
          { id: 'lb-backtrack-vs-dfs',       zhPath: 'essential-technique/backtrack-vs-dfs',                        title: { en: 'Backtrack vs DFS',              zh: '回溯与DFS的区别' } },
          { id: 'lb-permutation-adv',        zhPath: 'essential-technique/permutation-combination-subset-all-in-one-2', title: { en: 'Permutation / Combination II', zh: '排列/组合/子集（二）' } },
          { id: 'lb-sudoku-nqueens',         zhPath: 'practice-in-action/sudoku-nqueue',                            title: { en: 'Sudoku & N-Queens',             zh: '数独和 N 皇后' } },
          { id: 'lb-two-views-backtrack',    zhPath: 'practice-in-action/two-views-of-backtrack',                   title: { en: 'Two Views of Backtracking',     zh: '回溯两种视角' } },
          { id: 'lb-generate-parens',        zhPath: 'practice-in-action/generate-parentheses',                     title: { en: 'Generate Parentheses',          zh: '括号生成' } },
          { id: 'lb-partition-k',            zhPath: 'practice-in-action/partition-to-k-equal-sum-subsets',         title: { en: 'Partition to K Equal Subsets',  zh: '划分为 k 个相等子集' } },
        ],
      },
      {
        id: 'lb-ch2-bfs',
        title: { en: 'BFS in Action', zh: 'BFS 实战' },
        articles: [
          { id: 'lb-bfs-fw-2',    zhPath: 'essential-technique/bfs-framework-2',    title: { en: 'BFS Framework II', zh: 'BFS 算法框架（二）' } },
        ],
      },
    ],
  },

  // ── CHAPTER 3: DYNAMIC PROGRAMMING ─────────────────────────────────────────
  {
    id: 'lb-chapter-3',
    label: 'Chapter 3',
    icon: '💡',
    title: { en: 'Dynamic Programming', zh: '第三章：动态规划' },
    sections: [
      {
        id: 'lb-ch3-foundations',
        title: { en: 'DP Foundations', zh: 'DP 基础' },
        articles: [
          { id: 'lb-dp-fw-2',           zhPath: 'essential-technique/dynamic-programming-framework-2', title: { en: 'DP Framework II',       zh: '动态规划框架（二）' } },
          { id: 'lb-dp-memo',           zhPath: 'dynamic-programming/memo-fundamental',               title: { en: 'Memoization Basics',    zh: '备忘录基础' } },
          { id: 'lb-dp-faq',            zhPath: 'dynamic-programming/faq-summary',                    title: { en: 'DP FAQ',                zh: '动态规划 FAQ 汇总' } },
          { id: 'lb-dp-two-views',      zhPath: 'dynamic-programming/two-views-of-dp',                title: { en: 'Two Views of DP',       zh: 'DP 两种视角' } },
          { id: 'lb-dp-space',          zhPath: 'dynamic-programming/space-optimization',             title: { en: 'Space Optimization',    zh: '空间压缩技巧' } },
        ],
      },
      {
        id: 'lb-ch3-sequences',
        title: { en: 'Sequence DP', zh: '序列 DP' },
        articles: [
          { id: 'lb-dp-word-break',     zhPath: 'dynamic-programming/word-break',                    title: { en: 'Word Break',              zh: '单词拆分' } },
          { id: 'lb-dp-subseq',         zhPath: 'dynamic-programming/subsequence-problem',            title: { en: 'Subsequence Problems',    zh: '子序列类型问题' } },
          { id: 'lb-dp-lis',            zhPath: 'dynamic-programming/longest-increasing-subsequence', title: { en: 'Longest Increasing Subsequence', zh: '最长递增子序列' } },
          { id: 'lb-dp-edit',           zhPath: 'dynamic-programming/edit-distance',                  title: { en: 'Edit Distance',           zh: '编辑距离' } },
          { id: 'lb-dp-lcs',            zhPath: 'dynamic-programming/longest-common-subsequence',     title: { en: 'Longest Common Subsequence', zh: '最长公共子序列' } },
          { id: 'lb-dp-max-sub',        zhPath: 'dynamic-programming/maximum-subarray',               title: { en: 'Maximum Subarray',        zh: '最大子数组' } },
        ],
      },
      {
        id: 'lb-ch3-grid',
        title: { en: 'Grid & Knapsack DP', zh: '网格与背包 DP' },
        articles: [
          { id: 'lb-dp-min-path',   zhPath: 'dynamic-programming/minimum-path-sum',   title: { en: 'Minimum Path Sum',  zh: '最小路径和' } },
          { id: 'lb-dp-target',     zhPath: 'dynamic-programming/target-sum',         title: { en: 'Target Sum',        zh: '目标和' } },
          { id: 'lb-dp-knapsack1',  zhPath: 'dynamic-programming/knapsack1',          title: { en: '0-1 Knapsack',      zh: '0-1 背包' } },
          { id: 'lb-dp-knapsack2',  zhPath: 'dynamic-programming/knapsack2',          title: { en: 'Bounded Knapsack',  zh: '有界背包' } },
          { id: 'lb-dp-knapsack3',  zhPath: 'dynamic-programming/knapsack3',          title: { en: 'Unbounded Knapsack',zh: '完全背包' } },
        ],
      },
      {
        id: 'lb-ch3-advanced',
        title: { en: 'Advanced DP', zh: '高级 DP' },
        articles: [
          { id: 'lb-dp-stock',      zhPath: 'dynamic-programming/stock-problem-summary',  title: { en: 'Stock Problems',       zh: '股票买卖问题' } },
          { id: 'lb-dp-robber',     zhPath: 'dynamic-programming/house-robber',            title: { en: 'House Robber',         zh: '打家劫舍' } },
          { id: 'lb-dp-burst',      zhPath: 'dynamic-programming/burst-balloons',          title: { en: 'Burst Balloons',       zh: '戳气球' } },
          { id: 'lb-dp-travel',     zhPath: 'dynamic-programming/cheap-travel',            title: { en: 'Cheap Travel (K Stops)',zh: '便宜旅行（K站中转）' } },
          { id: 'lb-dp-egg',        zhPath: 'dynamic-programming/egg-drop',                title: { en: 'Egg Drop',             zh: '扔鸡蛋' } },
          { id: 'lb-dp-freedom',    zhPath: 'dynamic-programming/freedom-trail',           title: { en: 'Freedom Trail',        zh: '自由之路' } },
          { id: 'lb-dp-game',       zhPath: 'dynamic-programming/game-theory',             title: { en: 'Game Theory DP',       zh: '博弈问题' } },
          { id: 'lb-dp-magic',      zhPath: 'dynamic-programming/magic-tower',             title: { en: 'Magic Tower',          zh: '地下城游戏（魔塔）' } },
          { id: 'lb-dp-regex',      zhPath: 'dynamic-programming/regular-expression-matching', title: { en: 'Regular Expression Matching', zh: '正则表达式匹配' } },
        ],
      },
    ],
  },

  // ── CHAPTER 4: OTHER TECHNIQUES ────────────────────────────────────────────
  {
    id: 'lb-chapter-4',
    label: 'Chapter 4',
    icon: '🛠️',
    title: { en: 'Other Techniques', zh: '第四章：其他常用技巧' },
    sections: [
      {
        id: 'lb-ch4-greedy',
        title: { en: 'Greedy & Intervals', zh: '贪心与区间' },
        articles: [
          { id: 'lb-greedy-2',         zhPath: 'essential-technique/greedy-2',               title: { en: 'Greedy Algorithm II',    zh: '贪心算法（二）' } },
          { id: 'lb-interval-sched',   zhPath: 'frequency-interview/interval-scheduling',    title: { en: 'Interval Scheduling',    zh: '区间调度问题' } },
          { id: 'lb-scan-line',        zhPath: 'frequency-interview/scan-line-technique',    title: { en: 'Scan Line Technique',    zh: '扫描线技巧' } },
          { id: 'lb-interval-sum',     zhPath: 'practice-in-action/interval-problem-summary',title: { en: 'Interval Problems',      zh: '区间问题汇总' } },
          { id: 'lb-gas-station',      zhPath: 'frequency-interview/gas-station-greedy',     title: { en: 'Gas Station',            zh: '加油站问题' } },
          { id: 'lb-split-array',      zhPath: 'practice-in-action/split-array-into-consecutive-subsequences', title: { en: 'Split Into Consecutive Subseqs', zh: '分割成连续子序列' } },
        ],
      },
      {
        id: 'lb-ch4-math',
        title: { en: 'Math & Bit Operations', zh: '数学与位运算' },
        articles: [
          { id: 'lb-trapping-rain',    zhPath: 'frequency-interview/trapping-rain-water',  title: { en: 'Trapping Rain Water',   zh: '接雨水' } },
          { id: 'lb-pancake',          zhPath: 'frequency-interview/pancake-sorting',       title: { en: 'Pancake Sorting',       zh: '煎饼排序' } },
          { id: 'lb-one-line',         zhPath: 'frequency-interview/one-line-solutions',    title: { en: 'One-line Solutions',    zh: '一行代码解题' } },
          { id: 'lb-prime',            zhPath: 'frequency-interview/print-prime-number',    title: { en: 'Prime Numbers',         zh: '求素数' } },
          { id: 'lb-bitwise',          zhPath: 'frequency-interview/bitwise-operation',     title: { en: 'Bit Operations',        zh: '位运算技巧' } },
          { id: 'lb-factorial',        zhPath: 'frequency-interview/factorial-problems',    title: { en: 'Factorial Problems',    zh: '阶乘问题' } },
          { id: 'lb-mismatch',         zhPath: 'frequency-interview/mismatch-set',          title: { en: 'Mismatch Set',          zh: '错误集合' } },
          { id: 'lb-ugly-num',         zhPath: 'frequency-interview/ugly-number-summary',   title: { en: 'Ugly Number',           zh: '丑数问题' } },
          { id: 'lb-random-alg',       zhPath: 'frequency-interview/random-algorithm',      title: { en: 'Random Algorithms',     zh: '随机算法' } },
          { id: 'lb-probability',      zhPath: 'frequency-interview/probability-problem',   title: { en: 'Probability Problems',  zh: '概率问题' } },
          { id: 'lb-multiply-str',     zhPath: 'practice-in-action/multiply-strings',       title: { en: 'Multiply Strings',      zh: '字符串相乘' } },
          { id: 'lb-perfect-rect',     zhPath: 'frequency-interview/perfect-rectangle',     title: { en: 'Perfect Rectangle',     zh: '完美矩形' } },
          { id: 'lb-rm-dup-letters',   zhPath: 'frequency-interview/remove-duplicate-letters', title: { en: 'Remove Duplicate Letters', zh: '去除重复字母' } },
        ],
      },
      {
        id: 'lb-ch4-cs',
        title: { en: 'Computer Science', zh: '计算机科学' },
        articles: [
          { id: 'lb-cs-encrypt',       zhPath: 'computer-science/encryption-intro',              title: { en: 'Encryption Intro',      zh: '现代密码学简介' } },
          { id: 'lb-cs-tls',           zhPath: 'computer-science/tls-key-exchange',               title: { en: 'TLS Key Exchange',      zh: 'TLS 密钥协商' } },
          { id: 'lb-cs-jwt',           zhPath: 'computer-science/how-jwt-works',                  title: { en: 'How JWT Works',         zh: 'JWT 工作原理' } },
          { id: 'lb-cs-oauth',         zhPath: 'computer-science/oauth2-explained',               title: { en: 'OAuth2 Explained',      zh: 'OAuth2 详解' } },
          { id: 'lb-cs-sso',           zhPath: 'computer-science/sso',                           title: { en: 'Single Sign-On',        zh: '单点登录 SSO' } },
          { id: 'lb-cs-authn',         zhPath: 'computer-science/authentication-vs-authorization',title: { en: 'AuthN vs AuthZ',        zh: '认证 vs 授权' } },
          { id: 'lb-cs-linux-shell',   zhPath: 'other-skills/linux-shell',                        title: { en: 'Linux Shell',           zh: 'Linux Shell 实用技巧' } },
          { id: 'lb-cs-linux-fs',      zhPath: 'other-skills/linux-file-system',                  title: { en: 'Linux File System',     zh: 'Linux 文件系统' } },
          { id: 'lb-cs-lsm',          zhPath: 'other-skills/lsm-tree',                           title: { en: 'LSM Tree',              zh: 'LSM 树' } },
        ],
      },
      {
        id: 'lb-ch4-patterns',
        title: { en: 'Design Patterns', zh: '设计模式' },
        articles: [
          { id: 'lb-dp-singleton',    zhPath: 'design-pattern/singleton',      title: { en: 'Singleton',      zh: '单例模式' } },
          { id: 'lb-dp-factory',      zhPath: 'design-pattern/factory-method', title: { en: 'Factory Method', zh: '工厂方法' } },
          { id: 'lb-dp-abstract',     zhPath: 'design-pattern/abstract-factory',title: { en: 'Abstract Factory',zh: '抽象工厂' } },
          { id: 'lb-dp-builder',      zhPath: 'design-pattern/builder',        title: { en: 'Builder',        zh: '建造者模式' } },
          { id: 'lb-dp-decorator',    zhPath: 'design-pattern/decorator',      title: { en: 'Decorator',      zh: '装饰器模式' } },
          { id: 'lb-dp-adapter',      zhPath: 'design-pattern/adapter',        title: { en: 'Adapter',        zh: '适配器模式' } },
          { id: 'lb-dp-observer',     zhPath: 'design-pattern/observer',       title: { en: 'Observer',       zh: '观察者模式' } },
          { id: 'lb-dp-strategy',     zhPath: 'design-pattern/strategy',       title: { en: 'Strategy',       zh: '策略模式' } },
        ],
      },
    ],
  },
]
