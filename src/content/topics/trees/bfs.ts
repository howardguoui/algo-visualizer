import { TopicContent } from '../../types';

export const bfsContent: TopicContent = {
  id: 'trees-bfs',
  title: {
    en: 'Binary Tree BFS (Level-Order Traversal)',
    zh: '二叉树广度优先搜索（层序遍历）'
  },
  description: {
    en: 'Master level-order traversal using queues for solving classic BFS patterns',
    zh: '使用队列掌握层序遍历，解决经典的广度优先搜索模式'
  },
  timeEstimate: '40 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Binary Tree BFS and Level-Order Traversal

BFS (Breadth-First Search) explores nodes level by level using a queue. Unlike DFS (depth-first), BFS visits all nodes at distance k before visiting nodes at distance k+1.

## Core BFS Template

The fundamental pattern uses a queue to explore nodes level by level:

\`\`\`javascript
function bfsLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Process exactly levelSize nodes (one full level)
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
\`\`\`

**The levelSize trick**: Store queue length at each iteration to know when one level ends. This is crucial for level-by-level processing.

## Common BFS Patterns

### Pattern 1: Basic Level-Order (Problem 102)
Process nodes one level at a time. Returns array of arrays.

### Pattern 2: Zigzag Traversal (Problem 103)
Traverse left-to-right on odd levels, right-to-left on even levels. Use a flag or alternate push/unshift.

\`\`\`javascript
function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let isLeftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (isLeftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    isLeftToRight = !isLeftToRight;
  }

  return result;
}
\`\`\`

### Pattern 3: Right Side View (Problem 199)
Return the rightmost node at each level. Only add the last node of each level.

\`\`\`javascript
function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // Only add the last node (rightmost) of each level
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
\`\`\`

## BFS vs DFS

**BFS (Queue-based)**:
- Level-by-level exploration
- Shortest path in unweighted graphs
- Better for "closest" type problems

**DFS (Stack-based or Recursion)**:
- Goes deep first
- Better for path problems
- Often simpler for tree modifications

## Key Insights

1. **The levelSize trick** is essential for processing one level at a time
2. **Queue operations**: shift() removes from front, push() adds to back
3. **When to use BFS**: Problems asking for levels, shortest paths, or right side view
4. **Time Complexity**: O(n) - visit each node once
5. **Space Complexity**: O(w) where w is maximum width of tree`,
    zh: `# 二叉树广度优先搜索与层序遍历

广度优先搜索（BFS）使用队列逐层探索节点。与深度优先搜索（DFS）不同，BFS先访问距离为k的所有节点，再访问距离为k+1的节点。

## 核心BFS模板

基础模式使用队列逐层探索节点：

\`\`\`javascript
function bfsLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // 处理恰好levelSize个节点（一整层）
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
\`\`\`

**levelSize技巧**：在每次迭代时存储队列长度，以便知道一层何时结束。这对逐层处理至关重要。

## 常见BFS模式

### 模式1：基本层序遍历（问题102）
逐层处理节点。返回数组的数组。

### 模式2：之字形遍历（问题103）
奇数层从左到右遍历，偶数层从右到左遍历。使用标志或交替使用push/unshift。

\`\`\`javascript
function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let isLeftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (isLeftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    isLeftToRight = !isLeftToRight;
  }

  return result;
}
\`\`\`

### 模式3：右侧视图（问题199）
返回每层的最右侧节点。只添加每层的最后一个节点。

\`\`\`javascript
function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // 只添加每层的最后一个节点（最右侧）
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
\`\`\`

## BFS与DFS比较

**BFS（基于队列）**：
- 逐层探索
- 无权图中的最短路径
- 更适合"最近"类问题

**DFS（基于栈或递归）**：
- 深度优先
- 更适合路径问题
- 树修改操作通常更简单

## 关键洞察

1. **levelSize技巧**对于逐层处理至关重要
2. **队列操作**：shift()从前移除，push()从后添加
3. **何时使用BFS**：涉及层级、最短路径或右侧视图的问题
4. **时间复杂度**：O(n) - 访问每个节点一次
5. **空间复杂度**：O(w)，w为树的最大宽度`
  },
  leetcode: [
    { id: 102, title: 'Binary Tree Level Order Traversal', titleZh: '二叉树的层序遍历', difficulty: 'Medium' },
    { id: 103, title: 'Binary Tree Zigzag Level Order Traversal', titleZh: '二叉树的锯齿形层序遍历', difficulty: 'Medium' },
    { id: 199, title: 'Binary Tree Right Side View', titleZh: '二叉树的右视图', difficulty: 'Medium' },
    { id: 111, title: 'Minimum Depth of Binary Tree', titleZh: '二叉树的最小深度', difficulty: 'Easy' }
  ]
};
