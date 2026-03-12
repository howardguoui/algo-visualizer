import { TopicContent } from '../../types';

export const fibonacciContent: TopicContent = {
  id: 'dp-fibonacci',
  title: {
    en: 'Fibonacci and Coin Change',
    zh: '斐波那契与硬币兑换'
  },
  description: {
    en: 'Journey from exponential brute force to O(1) optimization, then master the coin change DP pattern',
    zh: '从指数蛮力到O(1)优化的旅程，然后掌握硬币兑换动态规划模式'
  },
  timeEstimate: '45 minutes',
  contentType: 'all',
  hasVisualizer: false,
  content: {
    en: `# Fibonacci and Coin Change: The DP Journey

Fibonacci is the quintessential DP introduction problem. Walking through the optimization journey from brute force to O(1) space reveals the power of dynamic programming.

## The Journey: Four Approaches to Fibonacci

### Approach 1: Brute Force Recursion O(2^n)

The naive recursive approach explodes exponentially:

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// fib(5) = 5
// Calls: fib(4) + fib(3)
//        (fib(3) + fib(2)) + (fib(2) + fib(1))
//        ((fib(2) + fib(1)) + (fib(1) + fib(0))) + ...
// Time: O(2^n) - exponential!
\`\`\`

**Why exponential?** The recursion tree grows exponentially, and many nodes repeat.

### Approach 2: Memoization (Top-Down) O(n) Time, O(n) Space

Cache results to avoid recomputation:

\`\`\`javascript
function fib(n, memo = {}) {
  // Check cache first
  if (n in memo) return memo[n];

  // Base case
  if (n <= 1) return n;

  // Compute and store
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// fib(5, {}) computes each fib(i) only once
// Time: O(n), Space: O(n) for recursion stack + memo
\`\`\`

**Key insight**: Each fib(i) is computed exactly once. Subsequent lookups hit the cache.

### Approach 3: Tabulation (Bottom-Up) O(n) Time, O(n) Space

Build array iteratively from base cases:

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// dp[0] = 0, dp[1] = 1
// dp[2] = dp[1] + dp[0] = 1
// dp[3] = dp[2] + dp[1] = 2
// dp[4] = dp[3] + dp[2] = 3
// dp[5] = dp[4] + dp[3] = 5
\`\`\`

**Why better?** No recursion overhead, no call stack, simple iteration.

### Approach 4: Space Optimization O(n) Time, O(1) Space

Key observation: We only need the last two values to compute the next:

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    // Store new value before overwriting
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// Iteration 2: prev=1, curr=0+1=1
// Iteration 3: prev=1, curr=1+1=2
// Iteration 4: prev=2, curr=1+2=3
// Iteration 5: prev=3, curr=2+3=5
\`\`\`

**The optimization trick**: After computing fib(i), we only need fib(i) and fib(i-1) for the next iteration. Discard older values.

**Final optimization**: Space from O(n) to O(1)!

## Coin Change: The Classic DP Pattern

The coin change problem demonstrates the DP pattern applied to a new domain.

**Problem**: Given coins [1, 2, 5] and amount 7, find minimum coins needed.

### State Definition

\`\`\`
f(i) = minimum number of coins to make amount i
\`\`\`

This is the crucial step. We're breaking down the problem by amount.

### Recurrence Relation

For amount i, we can use any coin c where c <= i:

\`\`\`
f(i) = 1 + min(f(i-1), f(i-2), f(i-5))
\`\`\`

"To make amount i, take one coin and the minimum way to make (i - coin_value)"

### Base Case

\`\`\`
f(0) = 0  (zero coins make amount 0)
\`\`\`

### Solution Code

\`\`\`javascript
function coinChange(coins, amount) {
  // dp[i] = minimum coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case

  for (let i = 1; i <= amount; i++) {
    // Try each coin
    for (const coin of coins) {
      if (coin <= i) {
        // If we can use this coin
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Example: coins=[1,2,5], amount=7
// dp[0] = 0
// dp[1] = 1 + dp[0] = 1 (coin 1)
// dp[2] = min(1 + dp[1], 1 + dp[0]) = 1 (coin 2)
// dp[3] = min(1 + dp[2], 1 + dp[1]) = 2 (1+2)
// dp[4] = min(1 + dp[3], 1 + dp[2]) = 2 (2+2)
// dp[5] = min(1 + dp[4], 1 + dp[3], 1 + dp[0]) = 1 (coin 5)
// dp[6] = min(1 + dp[5], 1 + dp[4], 1 + dp[1]) = 2 (5+1)
// dp[7] = min(1 + dp[6], 1 + dp[5], 1 + dp[2]) = 2 (5+2)
// Result: 2
\`\`\`

**Time Complexity**: O(amount × coins.length)
**Space Complexity**: O(amount)

## Key Patterns Recognition

**Fibonacci-like problems** (f(i) depends on f(i-1), f(i-2)):
- Climbing stairs
- House robber
- Decode ways

**Coin change-like problems** (f(i) depends on f(i-coin) for each coin):
- Coin change
- Coin change 2 (ways to make amount)
- Perfect squares

Both follow: Loop through states, update based on recurrence.

## Memoization vs Tabulation for Coin Change

**Memoization** (if implementing recursively):
\`\`\`javascript
function coinChangeMemo(coins, amount, memo = {}) {
  if (amount === 0) return 0;
  if (amount in memo) return memo[amount];

  let result = Infinity;
  for (const coin of coins) {
    if (coin <= amount) {
      result = Math.min(result, 1 + coinChangeMemo(coins, amount - coin, memo));
    }
  }

  memo[amount] = result;
  return result;
}
\`\`\`

Both work identically; choose based on code clarity preference.

## Common Mistakes

1. **Forgetting base case**: Will compute wrong values
2. **Initialization wrong**: dp should start with Infinity for min problems
3. **Wrong recurrence**: Mistaking direction (i-coin vs i+coin)
4. **Off-by-one errors**: Amount indices start at 0
5. **Not checking coin validity**: Using coin > amount causes issues`,
    zh: `# 斐波那契与硬币兑换：动态规划之旅

斐波那契是典型的动态规划入门问题。通过蛮力到O(1)空间优化的过程，展现了动态规划的强大。

## 旅程：四种斐波那契方法

### 方法1：蛮力递归 O(2^n)

朴素递归方法指数爆炸：

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// fib(5) = 5
// 调用：fib(4) + fib(3)
//       (fib(3) + fib(2)) + (fib(2) + fib(1))
//       ((fib(2) + fib(1)) + (fib(1) + fib(0))) + ...
// 时间：O(2^n) - 指数！
\`\`\`

**为什么指数？** 递归树指数增长，许多节点重复。

### 方法2：备忘（自顶向下）O(n)时间, O(n)空间

缓存结果避免重新计算：

\`\`\`javascript
function fib(n, memo = {}) {
  // 先检查缓存
  if (n in memo) return memo[n];

  // 基础情况
  if (n <= 1) return n;

  // 计算并存储
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// fib(5, {})仅计算每个fib(i)一次
// 时间：O(n)，空间：O(n)用于递归栈+备忘
\`\`\`

**关键洞察**：每个fib(i)只计算一次。后续查找命中缓存。

### 方法3：制表（自底向上）O(n)时间, O(n)空间

从基础情况向上迭代构建数组：

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// dp[0] = 0, dp[1] = 1
// dp[2] = dp[1] + dp[0] = 1
// dp[3] = dp[2] + dp[1] = 2
// dp[4] = dp[3] + dp[2] = 3
// dp[5] = dp[4] + dp[3] = 5
\`\`\`

**为什么更好？** 无递归开销，无调用栈，简单迭代。

### 方法4：空间优化 O(n)时间, O(1)空间

关键观察：仅需最后两个值计算下一个：

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;

  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    // 覆盖前先存储新值
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// 迭代2：prev=1, curr=0+1=1
// 迭代3：prev=1, curr=1+1=2
// 迭代4：prev=2, curr=1+2=3
// 迭代5：prev=3, curr=2+3=5
\`\`\`

**优化技巧**：计算fib(i)后，仅需fib(i)和fib(i-1)用于下一迭代。丢弃较旧值。

**最终优化**：空间从O(n)到O(1)！

## 硬币兑换：经典动态规划模式

硬币兑换问题展示了应用于新域的动态规划模式。

**问题**：给定硬币[1, 2, 5]和金额7，找最少硬币数。

### 状态定义

\`\`\`
f(i) = 组成金额i所需的最少硬币数
\`\`\`

这是关键步骤。我们按金额分解问题。

### 递推关系

对于金额i，可使用任何硬币c，其中c <= i：

\`\`\`
f(i) = 1 + min(f(i-1), f(i-2), f(i-5))
\`\`\`

"为组成金额i，取一个硬币和组成(i - 硬币值)的最少方式"

### 基础情况

\`\`\`
f(0) = 0  （零硬币组成金额0）
\`\`\`

### 解决方案代码

\`\`\`javascript
function coinChange(coins, amount) {
  // dp[i] = 组成金额i的最少硬币数
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 基础情况

  for (let i = 1; i <= amount; i++) {
    // 尝试每个硬币
    for (const coin of coins) {
      if (coin <= i) {
        // 如果能使用此硬币
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 例：硬币=[1,2,5], 金额=7
// dp[0] = 0
// dp[1] = 1 + dp[0] = 1 (硬币1)
// dp[2] = min(1 + dp[1], 1 + dp[0]) = 1 (硬币2)
// dp[3] = min(1 + dp[2], 1 + dp[1]) = 2 (1+2)
// dp[4] = min(1 + dp[3], 1 + dp[2]) = 2 (2+2)
// dp[5] = min(1 + dp[4], 1 + dp[3], 1 + dp[0]) = 1 (硬币5)
// dp[6] = min(1 + dp[5], 1 + dp[4], 1 + dp[1]) = 2 (5+1)
// dp[7] = min(1 + dp[6], 1 + dp[5], 1 + dp[2]) = 2 (5+2)
// 结果：2
\`\`\`

**时间复杂度**：O(金额 × 硬币数)
**空间复杂度**：O(金额)

## 关键模式识别

**斐波那契类问题**（f(i)依赖f(i-1), f(i-2)）：
- 爬楼梯
- 打家劫舍
- 解码方式

**硬币兑换类问题**（f(i)依赖每个硬币的f(i-coin)）：
- 硬币兑换
- 硬币兑换2（组成金额的方式数）
- 完全平方数

都遵循：循环遍历状态，根据递推更新。

## 备忘与制表用于硬币兑换

**备忘**（如实现递归）：
\`\`\`javascript
function coinChangeMemo(coins, amount, memo = {}) {
  if (amount === 0) return 0;
  if (amount in memo) return memo[amount];

  let result = Infinity;
  for (const coin of coins) {
    if (coin <= amount) {
      result = Math.min(result, 1 + coinChangeMemo(coins, amount - coin, memo));
    }
  }

  memo[amount] = result;
  return result;
}
\`\`\`

两者工作相同；根据代码清晰度偏好选择。

## 常见错误

1. **忘记基础情况**：将计算错误值
2. **初始化错误**：对最小值问题dp应从Infinity开始
3. **递推错误**：混淆方向（i-coin vs i+coin）
4. **一处差之毫厘错误**：金额索引从0开始
5. **未检查硬币有效性**：使用硬币 > 金额导致问题`
  },
  leetcode: [
    { id: 509, title: 'Fibonacci Number', titleZh: '斐波那契数', difficulty: 'Easy' },
    { id: 70, title: 'Climbing Stairs', titleZh: '爬楼梯', difficulty: 'Easy' },
    { id: 322, title: 'Coin Change', titleZh: '零钱兑换', difficulty: 'Medium' },
    { id: 518, title: 'Coin Change II', titleZh: '零钱兑换II', difficulty: 'Medium' }
  ]
};
