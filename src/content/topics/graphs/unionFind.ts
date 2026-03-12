import { TopicContent } from '../../types';

export const unionFindContent: TopicContent = {
  id: 'graphs-union-find',
  title: {
    en: 'Union-Find (Disjoint Set Union)',
    zh: '并查集（不相交集合并集）'
  },
  description: {
    en: 'Master the Union-Find data structure for efficient connectivity and cycle detection',
    zh: '掌握并查集数据结构，高效处理连接性和环检测问题'
  },
  timeEstimate: '45 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Union-Find (Disjoint Set Union)

Union-Find is a data structure that efficiently handles two operations: union (combining two sets) and find (determining if two elements are in the same set). With path compression and union by rank optimizations, both operations approach O(1) time.

## Core Concept

Each element belongs to a set (tree). Union-Find tracks which elements belong to the same connected component.

**Two fundamental operations**:
- **find(x)**: Determine the root/parent of element x (which set does it belong to?)
- **union(x, y)**: Merge the sets containing x and y

## Basic Implementation

Without optimizations (acceptable for small datasets):

\`\`\`javascript
class UnionFind {
  constructor(n) {
    // parent[i] initially points to itself
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}
\`\`\`

## Optimized Implementation (Path Compression + Union by Rank)

These optimizations make operations nearly O(1):

\`\`\`javascript
class OptimizedUnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      // Path compression: point directly to root
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    // Union by rank: attach smaller tree under larger tree
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }

  countComponents() {
    const roots = new Set();
    for (let i = 0; i < this.parent.length; i++) {
      roots.add(this.find(i));
    }
    return roots.size;
  }
}
\`\`\`

## Optimizations Explained

**Path Compression**: When finding a root, make each node point directly to the root. This flattens the tree.

**Union by Rank**: Attach the smaller tree under the larger one to keep trees shallow.

Together, these reduce amortized time complexity to nearly O(1) per operation (technically O(α(n)) where α is inverse Ackermann function).

## Common Problem Patterns

### Pattern 1: Connectivity Questions

\`\`\`javascript
// Given edges, determine if two nodes are connected
function isConnected(n, edges, x, y) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    uf.union(a, b);
  }

  return uf.isConnected(x, y);
}
\`\`\`

### Pattern 2: Count Connected Components

\`\`\`javascript
function countComponents(n, edges) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    uf.union(a, b);
  }

  return uf.countComponents();
}
\`\`\`

### Pattern 3: Detect Cycles in Undirected Graph

Union-Find efficiently detects cycles: if union fails (nodes already connected), there's a cycle.

\`\`\`javascript
function hasCycle(n, edges) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    // If nodes are already connected, this edge creates a cycle
    if (uf.isConnected(a, b)) {
      return true;
    }
    uf.union(a, b);
  }

  return false;
}
\`\`\`

### Pattern 4: Find Redundant Edge

\`\`\`javascript
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new OptimizedUnionFind(n + 1);

  for (const [a, b] of edges) {
    if (uf.isConnected(a, b)) {
      return [a, b]; // This edge creates the cycle
    }
    uf.union(a, b);
  }

  return [];
}
\`\`\`

## When to Use Union-Find

✓ **Good for**:
- Connectivity problems
- Finding connected components
- Cycle detection in undirected graphs
- Minimum spanning tree (Kruskal's algorithm)
- Image processing (connected regions)

✗ **Not good for**:
- Weighted shortest paths (use Dijkstra)
- Directed graph cycle detection (use DFS)
- Dynamic graph modifications (requires rebuild)

## Complexity Analysis

| Operation | Without Optimization | With Path Compression & Rank |
|-----------|----------------------|------------------------------|
| find()    | O(n)                 | O(α(n)) ≈ O(1)               |
| union()   | O(n)                 | O(α(n)) ≈ O(1)               |

For all practical purposes, α(n) ≤ 5 for any realistic n, so treat as O(1).`,
    zh: `# 并查集（不相交集合并集）

并查集是一种高效处理两种操作的数据结构：union（合并两个集合）和find（判断两个元素是否在同一个集合）。通过路径压缩和按秩合并优化，两种操作的时间接近O(1)。

## 核心概念

每个元素属于一个集合（树）。并查集跟踪哪些元素属于同一个连通分量。

**两个基本操作**：
- **find(x)**：确定元素x的根/父节点（它属于哪个集合？）
- **union(x, y)**：合并包含x和y的集合

## 基础实现

不带优化（对于小数据集可接受）：

\`\`\`javascript
class UnionFind {
  constructor(n) {
    // parent[i]初始指向自己
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 路径压缩
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}
\`\`\`

## 优化实现（路径压缩 + 按秩合并）

这些优化使操作时间接近O(1)：

\`\`\`javascript
class OptimizedUnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      // 路径压缩：直接指向根
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    // 按秩合并：将较小树接到较大树下
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }

  countComponents() {
    const roots = new Set();
    for (let i = 0; i < this.parent.length; i++) {
      roots.add(this.find(i));
    }
    return roots.size;
  }
}
\`\`\`

## 优化解释

**路径压缩**：查找根时，使每个节点直接指向根。这展平了树。

**按秩合并**：将较小树接到较大树下，以保持树的浅层结构。

结合起来，这些将摊销时间复杂度降低到每次操作接近O(1)（技术上O(α(n))，其中α是反阿克曼函数）。

## 常见问题模式

### 模式1：连通性问题

\`\`\`javascript
// 给定边，判断两个节点是否连通
function isConnected(n, edges, x, y) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    uf.union(a, b);
  }

  return uf.isConnected(x, y);
}
\`\`\`

### 模式2：计算连通分量

\`\`\`javascript
function countComponents(n, edges) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    uf.union(a, b);
  }

  return uf.countComponents();
}
\`\`\`

### 模式3：无向图中的环检测

并查集有效检测环：如果union失败（节点已连接），存在环。

\`\`\`javascript
function hasCycle(n, edges) {
  const uf = new OptimizedUnionFind(n);

  for (const [a, b] of edges) {
    // 如果节点已连接，这条边会创建环
    if (uf.isConnected(a, b)) {
      return true;
    }
    uf.union(a, b);
  }

  return false;
}
\`\`\`

### 模式4：查找冗余边

\`\`\`javascript
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new OptimizedUnionFind(n + 1);

  for (const [a, b] of edges) {
    if (uf.isConnected(a, b)) {
      return [a, b]; // 这条边创建了环
    }
    uf.union(a, b);
  }

  return [];
}
\`\`\`

## 何时使用并查集

✓ **适用于**：
- 连通性问题
- 查找连通分量
- 无向图中的环检测
- 最小生成树（Kruskal算法）
- 图像处理（连通区域）

✗ **不适用于**：
- 加权最短路径（使用Dijkstra）
- 有向图环检测（使用DFS）
- 动态图修改（需要重建）

## 复杂度分析

| 操作   | 无优化   | 带路径压缩与秩  |
|--------|----------|------------------|
| find() | O(n)     | O(α(n)) ≈ O(1)   |
| union()| O(n)     | O(α(n)) ≈ O(1)   |

对于所有实际目的，α(n) ≤ 5（任何现实的n），所以视为O(1)。`
  },
  leetcode: [
    { id: 547, title: 'Number of Provinces', titleZh: '省份数量', difficulty: 'Medium' },
    { id: 684, title: 'Redundant Connection', titleZh: '冗余连接', difficulty: 'Medium' },
    { id: 1584, title: 'Min Cost to Connect All Points', titleZh: '连接所有点的最小费用', difficulty: 'Medium' }
  ]
};
