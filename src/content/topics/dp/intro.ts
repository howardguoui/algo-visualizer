import { TopicContent } from '../../types';

export const dpIntroContent: TopicContent = {
  id: 'dp-intro',
  title: {
    en: 'Dynamic Programming Fundamentals',
    zh: '动态规划基础'
  },
  description: {
    en: 'Understand the three pillars of DP: optimal substructure, overlapping subproblems, and state',
    zh: '理解动态规划的三个支柱：最优子结构、重叠子问题和状态'
  },
  timeEstimate: '40 minutes',
  contentType: 'content',
  hasVisualizer: false,
  content: {
    en: `# Dynamic Programming Fundamentals

Dynamic programming is an optimization technique for solving problems by breaking them into overlapping subproblems and storing results to avoid redundant computation. Not all problems can be solved with DP—only those with specific characteristics.

## The Three Pillars of Dynamic Programming

### 1. Optimal Substructure

An optimal solution is composed of optimal solutions to subproblems. If you know the best way to solve subproblem(s), you can combine them to get the best solution to the full problem.

**Example**: Finding longest path in a graph
- Longest path to destination = max(longest path via neighbor 1, longest path via neighbor 2, ...)
- The optimal solution includes optimal solutions to reach each neighbor

**Checking for optimal substructure**:
- Can the problem be decomposed into subproblems?
- Can you express: f(n) = combine(f(n-1), f(n-2), ...)?

### 2. Overlapping Subproblems

The same subproblems are solved multiple times. Without caching, exponential time results.

**Example**: Fibonacci(5)
```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)  ← computed again
│   │   └── fib(1)
│   └── fib(2)      ← computed again
└── fib(3)          ← computed again
```

Notice fib(3), fib(2), fib(1) are computed multiple times.

Without memoization: O(2^n)
With memoization: O(n)

**Checking for overlapping subproblems**:
- Does solving the problem require solving the same subproblem multiple times?
- Can a lookup/cache help?

### 3. State Definition (The Most Important)

State is the minimum information needed to uniquely identify a subproblem. This is the foundation of DP.

**The key question**: "What does f(i) represent?"

For coin change with coins [1,2,5] and amount 7:
- State f(i) = minimum coins needed to make amount i
- Base case: f(0) = 0 (zero coins make amount 0)
- Transition: f(i) = 1 + min(f(i-1), f(i-2), f(i-5)) where i-coin >= 0

## Two Approaches: Top-Down vs Bottom-Up

### Top-Down (Memoization)

Solve recursively, cache results:

\`\`\`javascript
function fib(n, memo = {}) {
  if (n in memo) return memo[n]; // Check cache first
  if (n <= 1) return n;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
\`\`\`

**Pros**: Natural recursive thought process, computes only needed states
**Cons**: Recursion depth, function call overhead

### Bottom-Up (Tabulation)

Build solutions from smallest subproblems upward:

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
\`\`\`

**Pros**: No recursion overhead, clear iteration order, easier to understand
**Cons**: Might compute unnecessary states

## The DP Problem-Solving Process

1. **Identify State**: What's the minimum info to define a subproblem?
2. **Define Recurrence**: How do solutions combine? f(n) = ?
3. **Find Base Cases**: When do we stop recursing?
4. **Choose Approach**: Top-down (memoization) or bottom-up (tabulation)?
5. **Optimize Space**: Can we reduce dimensions?

## Recognizing DP Problems

Problems that benefit from DP often ask:
- "Find the maximum/minimum..."
- "Count the number of ways..."
- "Determine if it's possible..."
- "Find the longest/shortest..."

Look for:
- Can be broken into subproblems?
- Same subproblems appear multiple times?
- Optimal solution uses optimal subsolutions?

## Space Optimization Example

Fibonacci starting with 2D approach:

\`\`\`javascript
// 1D array (remember last two values)
function fib(n) {
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
\`\`\`

From O(n) space to O(1) space by recognizing we only need two previous values.

## Common DP Patterns

- **Linear DP**: f(i) depends on f(i-1), f(i-2), etc. (Fibonacci, climbing stairs)
- **Grid DP**: f(i,j) depends on f(i-1,j), f(i,j-1), etc. (Paths, matrices)
- **Knapsack DP**: f(i,w) = best solution using items 0..i with weight limit w
- **Interval DP**: f(i,j) = solution for subarray/substring [i...j]

## Key Insights

- DP is an **optimization**: only use when there are overlapping subproblems
- **State definition is critical**: Wrong state = wrong solution
- **Recurrence must be correct**: Test with small examples
- **Both approaches work**: Choose based on clarity and efficiency needs
- **Space optimization** is an advanced technique: master basic DP first`,
    zh: `# 动态规划基础

动态规划是一种优化技术，通过将问题分解为重叠的子问题并存储结果以避免冗余计算来解决问题。并非所有问题都能用动态规划解决—仅那些具有特定特征的问题。

## 动态规划的三个支柱

### 1. 最优子结构

最优解由子问题的最优解组成。如果你知道解决子问题的最佳方式，你可以组合它们来得到完整问题的最佳解。

**例子**：在图中查找最长路径
- 到目标的最长路径 = max(经过邻接点1的最长路径, 经过邻接点2的最长路径, ...)
- 最优解包括到达每个邻接点的最优解

**检查最优子结构**：
- 问题能否分解为子问题？
- 能否表达：f(n) = combine(f(n-1), f(n-2), ...)?

### 2. 重叠子问题

相同的子问题被求解多次。不缓存会导致指数时间。

**例子**：Fibonacci(5)
```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)  ← 再次计算
│   │   └── fib(1)
│   └── fib(2)      ← 再次计算
└── fib(3)          ← 再次计算
```

注意fib(3), fib(2), fib(1)被多次计算。

无备忘：O(2^n)
有备忘：O(n)

**检查重叠子问题**：
- 解决问题是否需要多次解决相同子问题？
- 缓存能否帮助？

### 3. 状态定义（最重要）

状态是唯一标识子问题所需的最小信息。这是动态规划的基础。

**关键问题**："f(i)代表什么？"

对于硬币兑换，硬币[1,2,5]，金额7：
- 状态f(i) = 组成金额i所需的最少硬币数
- 基础情况：f(0) = 0（零硬币组成金额0）
- 转移：f(i) = 1 + min(f(i-1), f(i-2), f(i-5))，其中i-coin >= 0

## 两种方法：自顶向下与自底向上

### 自顶向下（备忘）

递归求解，缓存结果：

\`\`\`javascript
function fib(n, memo = {}) {
  if (n in memo) return memo[n]; // 先检查缓存
  if (n <= 1) return n;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
\`\`\`

**优点**：自然的递归思维过程，仅计算需要的状态
**缺点**：递归深度，函数调用开销

### 自底向上（制表）

从最小子问题向上构建解：

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
\`\`\`

**优点**：无递归开销，清晰的迭代顺序，易于理解
**缺点**：可能计算不必要的状态

## 动态规划问题解决过程

1. **确定状态**：定义子问题所需的最小信息？
2. **定义递推**：解如何组合？f(n) = ?
3. **找到基础**：何时停止递推？
4. **选择方法**：自顶向下（备忘）还是自底向上（制表）？
5. **优化空间**：能否减少维度？

## 识别动态规划问题

从DP受益的问题通常询问：
- "查找最大/最小..."
- "计算方式数..."
- "确定是否可能..."
- "查找最长/最短..."

寻找：
- 能否分解为子问题？
- 相同子问题是否出现多次？
- 最优解是否使用最优子解？

## 空间优化示例

从斐波那契的2D方法开始：

\`\`\`javascript
// 1D数组（记住最后两个值）
function fib(n) {
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
\`\`\`

从O(n)空间优化到O(1)空间，通过认识我们仅需要两个前值。

## 常见动态规划模式

- **线性DP**：f(i)依赖f(i-1), f(i-2)等（斐波那契、爬楼梯）
- **网格DP**：f(i,j)依赖f(i-1,j), f(i,j-1)等（路径、矩阵）
- **背包DP**：f(i,w) = 使用物品0..i且重量限制w的最佳解
- **区间DP**：f(i,j) = 子数组/子串[i...j]的解

## 关键洞察

- DP是一种**优化**：仅在有重叠子问题时使用
- **状态定义很关键**：错误的状态 = 错误的解
- **递推必须正确**：用小例子测试
- **两种方法都有效**：根据清晰度和效率需求选择
- **空间优化**是高级技术：先掌握基本动态规划`
  },
  leetcode: []
};
