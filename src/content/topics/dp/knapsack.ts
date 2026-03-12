import { TopicContent } from '../../types';

export const knapsackContent: TopicContent = {
  id: 'dp-knapsack',
  title: {
    en: 'Knapsack Problem - The Mother of All DP',
    zh: '背包问题 - 所有动态规划之母'
  },
  description: {
    en: 'Master the 0/1 knapsack problem and its variations, the foundation for advanced DP',
    zh: '掌握0/1背包问题及其变体，高级动态规划的基础'
  },
  timeEstimate: '50 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# 0/1 Knapsack Problem - The Mother of All DP Problems

The knapsack problem is called "the mother of all DP problems" because its framework applies to countless variants. Mastering 0/1 knapsack unlocks solutions to many other problems.

## Problem Statement

You have a knapsack with capacity W and n items, each with weight w[i] and value v[i]. Select items to maximize total value without exceeding capacity W. Each item can be taken at most once (0/1 constraint).

**Example**: W=5, items: [(w=2,v=3), (w=3,v=4), (w=4,v=5)]
- Best: Take items 1 and 2: weight=5, value=7

## State Definition (Critical)

\`\`\`
f(i, w) = maximum value using items 0..i-1 with weight limit w
\`\`\`

This is a 2D state because it depends on two variables: which items and remaining capacity.

## Recurrence Relation

For each item i with weight w[i] and value v[i], we have two choices:

1. **Take item i**: value = v[i] + f(i-1, w - w[i])
   (item's value plus best value with remaining capacity)

2. **Skip item i**: value = f(i-1, w)
   (use items 0..i-1 without this item)

**Recurrence**:
\`\`\`
f(i, w) = max(v[i] + f(i-1, w - w[i]),    // take item
               f(i-1, w))                  // skip item
\`\`\`

Only take item if it fits: `if (w[i] <= w)`

## Base Cases

\`\`\`
f(0, w) = 0  for all w  (no items, no value)
f(i, 0) = 0  for all i  (no capacity, no value)
\`\`\`

## Solution: Bottom-Up DP

\`\`\`javascript
function knapsack(capacity, weights, values) {
  const n = weights.length;

  // dp[i][w] = max value using items 0..i-1 with capacity w
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      const itemWeight = weights[i - 1];
      const itemValue = values[i - 1];

      if (itemWeight <= w) {
        // Item fits: choose between taking or skipping
        dp[i][w] = Math.max(
          itemValue + dp[i - 1][w - itemWeight], // take
          dp[i - 1][w]                            // skip
        );
      } else {
        // Item doesn't fit: must skip
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Example walkthrough:
// capacity=5, weights=[2,3,4], values=[3,4,5]
// dp[0][*] = [0,0,0,0,0,0]
// dp[1][0]=0, dp[1][1]=0, dp[1][2]=3, dp[1][3]=3, dp[1][4]=3, dp[1][5]=3
// dp[2][0]=0, dp[2][1]=0, dp[2][2]=3, dp[2][3]=4, dp[2][4]=7, dp[2][5]=7
// dp[3][0]=0, dp[3][1]=0, dp[3][2]=3, dp[3][3]=4, dp[3][4]=5, dp[3][5]=7
// Answer: dp[3][5] = 7
\`\`\`

**Time Complexity**: O(n × W)
**Space Complexity**: O(n × W)

## Space Optimization: 1D DP

Observation: Filling dp[i] only depends on dp[i-1]. Can we use one row?

**Naive approach fails**: If we overwrite dp[j] while iterating left-to-right, dp[j - weight] might be from the current row, not the previous.

**Solution**: Iterate capacity backwards! This prevents overwriting values we still need.

\`\`\`javascript
function knapsackOptimized(capacity, weights, values) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    // CRITICAL: Iterate backwards to avoid using same item twice
    for (let w = capacity; w >= weight; w--) {
      dp[w] = Math.max(
        dp[w],                    // skip item
        value + dp[w - weight]    // take item
      );
    }
  }

  return dp[capacity];
}
\`\`\`

**Why backwards?** When we compute dp[w], we need dp[w - weight] from the PREVIOUS row. If we iterate backwards, dp[w - weight] hasn't been updated yet, so it's still from the previous iteration (previous item).

**Space Complexity**: O(W) instead of O(n × W)!

## Variant: Complete Knapsack

If each item can be taken **unlimited times** (not just 0 or 1):

\`\`\`javascript
function completeKnapsack(capacity, weights, values) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    // Iterate FORWARDS (allows using same item multiple times)
    for (let w = weight; w <= capacity; w++) {
      dp[w] = Math.max(
        dp[w],
        value + dp[w - weight]  // Can reuse this item
      );
    }
  }

  return dp[capacity];
}
\`\`\`

The only difference: iterate capacity **forwards** instead of backwards. Now dp[w - weight] can be from the current iteration, allowing item reuse.

## Variant: Partition Equal Subset Sum

**Problem**: Can we partition array into two equal-sum subsets?

**Key insight**: This is 0/1 knapsack with target = sum / 2. Can we make exactly sum/2?

\`\`\`javascript
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // Can always make sum 0 (take nothing)

  for (const num of nums) {
    // Iterate backwards for 0/1 constraint
    for (let w = target; w >= num; w--) {
      dp[w] = dp[w] || dp[w - num];
    }
  }

  return dp[target];
}
\`\`\`

## Pattern Recognition

Knapsack framework applies when:
- You have items with weights/costs and values/benefits
- You have a capacity/budget limit
- You need to select items to maximize/minimize some objective
- Each item is used at most once (0/1) or unlimited times

**Examples**:
- 0/1 Knapsack: Select items to maximize value given weight limit
- Coin Change: Use coins (unlimited) to make exact amount
- Subset Sum: Can we make exact target sum?
- Partition Equal Subset: Can we split array into equal parts?

## Key Insights

1. **State is crucial**: f(i,w) encodes both item choice and capacity
2. **Backwards iteration matters**: Ensures 0/1 constraint (each item once)
3. **Forwards iteration for unlimited**: Complete knapsack uses items multiple times
4. **Space optimization**: Most problems reduce from O(n×W) to O(W)
5. **Many variants**: Same framework solves partitioning, subset sum, etc.`,
    zh: `# 0/1背包问题 - 所有动态规划之母

背包问题被称为"所有动态规划之母"，因为它的框架适用于无数变体。掌握0/1背包可以解锁许多其他问题的解。

## 问题陈述

你有容量为W的背包和n个物品，每个物品有重量w[i]和价值v[i]。选择物品以最大化总价值，不超过容量W。每个物品最多取一次（0/1约束）。

**例子**：W=5，物品：[(w=2,v=3), (w=3,v=4), (w=4,v=5)]
- 最优：取物品1和2：重量=5，价值=7

## 状态定义（关键）

\`\`\`
f(i, w) = 使用物品0..i-1、重量限制w的最大价值
\`\`\`

这是2D状态，因为它依赖两个变量：哪些物品和剩余容量。

## 递推关系

对于每个物品i，重量w[i]，价值v[i]，有两个选择：

1. **取物品i**：价值 = v[i] + f(i-1, w - w[i])
   （物品价值加上剩余容量的最佳价值）

2. **跳过物品i**：价值 = f(i-1, w)
   （不用此物品使用物品0..i-1）

**递推**：
\`\`\`
f(i, w) = max(v[i] + f(i-1, w - w[i]),    // 取物品
               f(i-1, w))                  // 跳过物品
\`\`\`

仅在物品适配时取：`if (w[i] <= w)`

## 基础情况

\`\`\`
f(0, w) = 0  对所有w  （无物品，无价值）
f(i, 0) = 0  对所有i  （无容量，无价值）
\`\`\`

## 解决方案：自底向上动态规划

\`\`\`javascript
function knapsack(capacity, weights, values) {
  const n = weights.length;

  // dp[i][w] = 使用物品0..i-1、容量w的最大价值
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  // 填充动态规划表
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      const itemWeight = weights[i - 1];
      const itemValue = values[i - 1];

      if (itemWeight <= w) {
        // 物品适配：选择取或跳过
        dp[i][w] = Math.max(
          itemValue + dp[i - 1][w - itemWeight], // 取
          dp[i - 1][w]                            // 跳过
        );
      } else {
        // 物品不适配：必须跳过
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// 例子演练：
// 容量=5，重量=[2,3,4]，价值=[3,4,5]
// dp[0][*] = [0,0,0,0,0,0]
// dp[1][0]=0, dp[1][1]=0, dp[1][2]=3, dp[1][3]=3, dp[1][4]=3, dp[1][5]=3
// dp[2][0]=0, dp[2][1]=0, dp[2][2]=3, dp[2][3]=4, dp[2][4]=7, dp[2][5]=7
// dp[3][0]=0, dp[3][1]=0, dp[3][2]=3, dp[3][3]=4, dp[3][4]=5, dp[3][5]=7
// 答案：dp[3][5] = 7
\`\`\`

**时间复杂度**：O(n × W)
**空间复杂度**：O(n × W)

## 空间优化：1D动态规划

观察：填充dp[i]仅依赖dp[i-1]。能否使用一行？

**朴素方法失败**：如果我们从左到右迭代时覆盖dp[j]，dp[j - weight]可能来自当前行而非前一行。

**解决方案**：向后迭代容量！这防止覆盖我们仍需要的值。

\`\`\`javascript
function knapsackOptimized(capacity, weights, values) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    // 关键：向后迭代以避免重复使用相同物品
    for (let w = capacity; w >= weight; w--) {
      dp[w] = Math.max(
        dp[w],                    // 跳过物品
        value + dp[w - weight]    // 取物品
      );
    }
  }

  return dp[capacity];
}
\`\`\`

**为什么向后？** 计算dp[w]时，需要dp[w - weight]来自上一行。如果向后迭代，dp[w - weight]尚未更新，仍来自前一次迭代（前一个物品）。

**空间复杂度**：O(W)而非O(n × W)！

## 变体：完全背包

如果每个物品可被取**无限次**（不仅0或1）：

\`\`\`javascript
function completeKnapsack(capacity, weights, values) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    // 向前迭代（允许多次使用相同物品）
    for (let w = weight; w <= capacity; w++) {
      dp[w] = Math.max(
        dp[w],
        value + dp[w - weight]  // 可重新使用此物品
      );
    }
  }

  return dp[capacity];
}
\`\`\`

唯一区别：容量向前而非向后迭代。现在dp[w - weight]可来自当前迭代，允许物品重用。

## 变体：分割等和子集

**问题**：能否将数组分割为两个等和子集？

**关键洞察**：这是0/1背包，目标 = sum / 2。能否恰好组成sum/2?

\`\`\`javascript
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // 总能组成和0（不取任何）

  for (const num of nums) {
    // 向后迭代用于0/1约束
    for (let w = target; w >= num; w--) {
      dp[w] = dp[w] || dp[w - num];
    }
  }

  return dp[target];
}
\`\`\`

## 模式识别

背包框架适用于：
- 你有带重量/成本和价值/收益的物品
- 你有容量/预算限制
- 你需要选择物品以最大化/最小化某个目标
- 每个物品最多使用一次（0/1）或无限次

**例子**：
- 0/1背包：选择物品以在重量限制下最大化价值
- 硬币兑换：用硬币（无限）组成精确金额
- 子集和：能否组成精确目标和？
- 分割等和子集：能否将数组分割为相等部分？

## 关键洞察

1. **状态很关键**：f(i,w)编码物品选择和容量
2. **向后迭代重要**：确保0/1约束（每物品一次）
3. **向前迭代用于无限**：完全背包多次使用物品
4. **空间优化**：大多数问题从O(n×W)降至O(W)
5. **许多变体**：相同框架解决分割、子集和等`
  },
  leetcode: [
    { id: 416, title: 'Partition Equal Subset Sum', titleZh: '分割等和子集', difficulty: 'Medium' },
    { id: 494, title: 'Target Sum', titleZh: '目标和', difficulty: 'Medium' },
    { id: 1049, title: 'Last Stone Weight II', titleZh: '最后一块石头的重量II', difficulty: 'Medium' }
  ]
};
