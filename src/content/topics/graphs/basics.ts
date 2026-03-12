import { TopicContent } from '../../types';

export const graphBasicsContent: TopicContent = {
  id: 'graphs-basics',
  title: {
    en: 'Graph Fundamentals and Traversal',
    zh: '图的基础与遍历'
  },
  description: {
    en: 'Master graph representations and DFS/BFS patterns for solving graph problems',
    zh: '掌握图的表示和DFS/BFS模式来解决图问题'
  },
  timeEstimate: '50 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Graph Fundamentals and Traversal

Graphs consist of vertices (nodes) and edges connecting them. Understanding graph representations and traversal algorithms is essential for solving problems involving networks, connectivity, and relationships.

## Graph Terminology

**Vertex (Node)**: A fundamental unit in a graph.

**Edge**: A connection between two vertices. Can be:
- **Directed**: One-way (u → v)
- **Undirected**: Two-way (u ↔ v)
- **Weighted**: Associated with a numerical value
- **Unweighted**: No value attached

**Degree**: Number of edges connected to a vertex.

**Path**: A sequence of vertices where each adjacent pair is connected by an edge.

**Cycle**: A path that starts and ends at the same vertex.

## Graph Representations

### Adjacency List (Preferred)

Most efficient for sparse graphs:

\`\`\`javascript
// Create graph as object of arrays
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'D'],
  'D': ['B', 'C', 'E'],
  'E': ['D']
};

// Or as Map for better performance
const graphMap = new Map();
graphMap.set('A', ['B', 'C']);
graphMap.set('B', ['A', 'D']);
// ...
\`\`\`

**Pros**: Space-efficient for sparse graphs, fast neighbor lookup
**Cons**: Checking edge existence requires linear search

### Adjacency Matrix

Better for dense graphs or when checking specific edges:

\`\`\`javascript
const matrix = [
  [0, 1, 1, 0, 0], // A
  [1, 0, 0, 1, 0], // B
  [1, 0, 0, 1, 0], // C
  [0, 1, 1, 0, 1], // D
  [0, 0, 0, 1, 0]  // E
];
// 1 means edge exists, 0 means no edge
\`\`\`

**Pros**: O(1) edge lookup, supports weights easily
**Cons**: O(V²) space, inefficient for sparse graphs

## DFS on Graphs

Depth-first search explores as far as possible along each branch:

\`\`\`javascript
function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function traverse(vertex) {
    if (visited.has(vertex)) return;

    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      traverse(neighbor);
    }
  }

  traverse(start);
  return result;
}
\`\`\`

**Iterative DFS with Stack**:

\`\`\`javascript
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (visited.has(vertex)) continue;
    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}
\`\`\`

## BFS on Graphs

Breadth-first search explores vertices level by level:

\`\`\`javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
\`\`\`

## When to Use DFS vs BFS

**Use DFS when**:
- Finding all connected components
- Detecting cycles in directed graphs
- Topological sorting
- Exploring deeply nested structures
- Memory efficiency is crucial

**Use BFS when**:
- Finding shortest path (unweighted)
- Finding all vertices at distance k
- Level-order traversal
- Exploring breadth-wise patterns

## Time and Space Complexity

Both DFS and BFS:
- **Time**: O(V + E) where V = vertices, E = edges
- **Space**: O(V) for visited set and recursion/stack

The difference is in traversal order, not efficiency.

## Template Pattern

Graph traversal follows a universal pattern:

1. Create visited set/boolean array
2. Create traversal structure (stack for DFS, queue for BFS)
3. Mark start vertex as visited
4. While structure not empty: pop/shift, process, add unvisited neighbors
5. Never re-visit vertices

Master this template and you can solve most graph problems.`,
    zh: `# 图的基础与遍历

图由顶点（节点）和连接它们的边组成。理解图的表示和遍历算法对解决涉及网络、连接性和关系的问题至关重要。

## 图的术语

**顶点（节点）**：图中的基本单位。

**边**：连接两个顶点的连接。可以是：
- **有向**：单向（u → v）
- **无向**：双向（u ↔ v）
- **加权**：关联数值
- **未加权**：无附加值

**度**：连接到顶点的边数。

**路径**：一系列顶点，其中每对相邻顶点由一条边连接。

**环**：以相同顶点开始和结束的路径。

## 图的表示

### 邻接表（推荐）

对于稀疏图最有效：

\`\`\`javascript
// 创建图作为对象数组
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'D'],
  'D': ['B', 'C', 'E'],
  'E': ['D']
};

// 或作为Map性能更好
const graphMap = new Map();
graphMap.set('A', ['B', 'C']);
graphMap.set('B', ['A', 'D']);
// ...
\`\`\`

**优点**：对稀疏图空间高效，快速邻接查找
**缺点**：检查边存在需要线性搜索

### 邻接矩阵

对于密集图或检查特定边时更好：

\`\`\`javascript
const matrix = [
  [0, 1, 1, 0, 0], // A
  [1, 0, 0, 1, 0], // B
  [1, 0, 0, 1, 0], // C
  [0, 1, 1, 0, 1], // D
  [0, 0, 0, 1, 0]  // E
];
// 1表示边存在，0表示无边
\`\`\`

**优点**：O(1)边查找，轻松支持权重
**缺点**：O(V²)空间，对稀疏图低效

## 图上的DFS

深度优先搜索沿着每个分支尽可能远地探索：

\`\`\`javascript
function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function traverse(vertex) {
    if (visited.has(vertex)) return;

    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      traverse(neighbor);
    }
  }

  traverse(start);
  return result;
}
\`\`\`

**使用栈的迭代DFS**：

\`\`\`javascript
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (visited.has(vertex)) continue;
    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}
\`\`\`

## 图上的BFS

广度优先搜索逐层探索顶点：

\`\`\`javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
\`\`\`

## 何时使用DFS vs BFS

**使用DFS当**：
- 查找所有连通分量
- 检测有向图中的环
- 拓扑排序
- 探索深层嵌套结构
- 内存效率很重要

**使用BFS当**：
- 查找最短路径（无权重）
- 查找所有距离为k的顶点
- 层序遍历
- 探索广度模式

## 时间和空间复杂度

DFS和BFS都：
- **时间**：O(V + E)，V = 顶点数，E = 边数
- **空间**：O(V)用于visited集合和递归/栈

区别在于遍历顺序，而不是效率。

## 模板模式

图遍历遵循通用模式：

1. 创建visited集合/布尔数组
2. 创建遍历结构（DFS用栈，BFS用队列）
3. 标记开始顶点为已访问
4. 当结构非空时：弹出，处理，添加未访问的邻接顶点
5. 永不重新访问顶点

掌握这个模板，你可以解决大多数图问题。`
  },
  leetcode: [
    { id: 200, title: 'Number of Islands', titleZh: '岛屿数量', difficulty: 'Medium' },
    { id: 133, title: 'Clone Graph', titleZh: '克隆图', difficulty: 'Medium' },
    { id: 207, title: 'Course Schedule', titleZh: '课程表', difficulty: 'Medium' }
  ]
};
