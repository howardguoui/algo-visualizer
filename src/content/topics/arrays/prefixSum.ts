import { TopicContent } from '../types'

export const prefixSum: TopicContent = {
  id: 'arrays-prefix-sum',
  title: {
    en: 'Prefix Sum and Difference Array',
    zh: '前缀和与差分数组',
  },
  description: {
    en: 'Optimize range queries and updates with prefix sum and difference array techniques',
    zh: '使用前缀和与差分数组技术优化范围查询和范围更新',
  },
  timeEstimate: '60-75 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `## Prefix Sum: Solving Range Sum Queries

A prefix sum array stores the cumulative sum up to each index. This allows O(1) range sum queries.

### Building Prefix Sum

\`\`\`javascript
function buildPrefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }

  return prefix;  // O(n) preprocessing
}

// Example: arr = [1, 2, 3, 4, 5]
// prefix = [0, 1, 3, 6, 10, 15]
//          ^  ^  ^  ^  ^   ^
//          0  1  1+2 1+2+3 ... sum of all
\`\`\`

**Why index 0?** Having prefix[0] = 0 simplifies the formula.

### Range Sum Query

\`\`\`javascript
// Query: sum of elements from index i to j (inclusive)
function rangeSum(prefix, i, j) {
  return prefix[j + 1] - prefix[i];
}

// Example: rangeSum(prefix, 1, 3) = prefix[4] - prefix[1]
//                                  = 10 - 1 = 9
//                                  = 2 + 3 + 4 = 9 ✓
\`\`\`

### Time Complexity

- Preprocessing: O(n)
- Query: O(1)
- Total for m queries: O(n + m) vs naive O(n × m)

### Example: Subarray Sum Equals K

Find count of subarrays that sum to k.

\`\`\`javascript
function subarraySum(arr, k) {
  // Key insight: if sum(0, j) - sum(0, i-1) = k
  // then sum(0, i-1) = sum(0, j) - k

  const sumMap = new Map();
  sumMap.set(0, 1);  // Empty prefix sum is 0

  let currentSum = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];

    // How many times has (currentSum - k) appeared?
    if (sumMap.has(currentSum - k)) {
      count += sumMap.get(currentSum - k);
    }

    // Record current sum
    sumMap.set(currentSum, (sumMap.get(currentSum) || 0) + 1);
  }

  return count;
  // Time: O(n), Space: O(n)
}

// Example: arr = [1, 1, 1], k = 2
// i=0: currentSum=1, 1-2=-1 not in map
//      map: {0:1, 1:1}
// i=1: currentSum=2, 2-2=0 in map with count 1
//      count += 1 → count=1 (subarray [1,1] at indices 0-1)
//      map: {0:1, 1:1, 2:1}
// i=2: currentSum=3, 3-2=1 in map with count 1
//      count += 1 → count=2 (subarray [1,1] at indices 1-2)
//      map: {0:1, 1:1, 2:1, 3:1}
// Result: 2
\`\`\`

## Difference Array: Solving Range Updates

When you need to **update all elements in a range**, a difference array is more efficient than updating each element.

### Building and Applying Difference Array

\`\`\`javascript
function rangeUpdate(n, updates) {
  // updates is array of [start, end, value]
  const diff = new Array(n + 1).fill(0);

  // Record range updates
  for (const [start, end, value] of updates) {
    diff[start] += value;
    diff[end + 1] -= value;  // Undo after range
  }

  // Reconstruct final array using prefix sum
  const result = new Array(n).fill(0);
  let currentValue = 0;

  for (let i = 0; i < n; i++) {
    currentValue += diff[i];
    result[i] = currentValue;
  }

  return result;
  // Time: O(n + m) vs naive O(n × m)
}

// Example: n=5, updates=[[1,2,3], [0,1,1]]
// Step 1: Build diff array
//   [1,2,3]: diff[1]+=3, diff[3]-=3
//   [0,1,1]: diff[0]+=1, diff[2]-=1
//   diff = [1, 3, -1, -3, 0, 0]
//
// Step 2: Reconstruct via prefix sum
//   i=0: current=0+1=1, result[0]=1
//   i=1: current=1+3=4, result[1]=4
//   i=2: current=4-1=3, result[2]=3
//   i=3: current=3-3=0, result[3]=0
//   i=4: current=0+0=0, result[4]=0
//   result = [1, 4, 3, 0, 0]
\`\`\`

### Why This Works

When we increment diff[start] and decrement diff[end + 1]:
- All positions [start, end] accumulate the increment
- Positions after end cancel it out

This clever encoding allows batch updates in O(1) per update!

## 2D Prefix Sum

For 2D arrays, extend the 1D concept.

\`\`\`javascript
function buildPrefix2D(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const prefix = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefix[i][j] = matrix[i-1][j-1]
                     + prefix[i-1][j]
                     + prefix[i][j-1]
                     - prefix[i-1][j-1];
    }
  }

  return prefix;
}

function rangeSum2D(prefix, r1, c1, r2, c2) {
  // Sum from (r1,c1) to (r2,c2)
  return prefix[r2+1][c2+1]
         - prefix[r1][c2+1]
         - prefix[r2+1][c1]
         + prefix[r1][c1];
}

// Time: O(1) query after O(m×n) preprocessing
\`\`\`

## Problem Recognition

| Pattern | Solution |
|---|---|
| "Sum of range" | Prefix sum |
| "Range query after updates" | Difference array |
| "Update all elements in range" | Difference array |
| "Rectangle sum" | 2D prefix sum |
| "Count subarrays with property" | Prefix sum + HashMap |

## Key Insights

1. **Prefix sum trades space for time**: O(n) space for O(1) queries
2. **Difference array enables batch updates**: Record changes, apply once
3. **Both use prefix sum concept**: Difference array is reconstructed via prefix sum
4. **Optimal for offline queries**: When all queries are known upfront`,

    zh: `## 前缀和：解决范围求和查询

前缀和数组存储到每个索引的累计和。这允许O(1)的范围和查询。

### 构建前缀和

\`\`\`javascript
function buildPrefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }

  return prefix;  // O(n)预处理
}

// 例子：arr = [1, 2, 3, 4, 5]
// prefix = [0, 1, 3, 6, 10, 15]
//          ^  ^  ^  ^  ^   ^
//          0  1  1+2 1+2+3 ... 全部和
\`\`\`

**为什么索引0？** 设置prefix[0] = 0简化了公式。

### 范围和查询

\`\`\`javascript
// 查询：从索引i到j（含）的元素和
function rangeSum(prefix, i, j) {
  return prefix[j + 1] - prefix[i];
}

// 例子：rangeSum(prefix, 1, 3) = prefix[4] - prefix[1]
//                                = 10 - 1 = 9
//                                = 2 + 3 + 4 = 9 ✓
\`\`\`

### 时间复杂度

- 预处理：O(n)
- 查询：O(1)
- m次查询总计：O(n + m) vs 朴素O(n × m)

### 例子：子数组和等于K

找出和等于k的子数组个数。

\`\`\`javascript
function subarraySum(arr, k) {
  // 关键洞察：如果 sum(0, j) - sum(0, i-1) = k
  // 那么 sum(0, i-1) = sum(0, j) - k

  const sumMap = new Map();
  sumMap.set(0, 1);  // 空前缀和为0

  let currentSum = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];

    // (currentSum - k)出现过多少次？
    if (sumMap.has(currentSum - k)) {
      count += sumMap.get(currentSum - k);
    }

    // 记录当前和
    sumMap.set(currentSum, (sumMap.get(currentSum) || 0) + 1);
  }

  return count;
  // 时间：O(n)，空间：O(n)
}

// 例子：arr = [1, 1, 1], k = 2
// i=0: currentSum=1, 1-2=-1不在map中
//      map: {0:1, 1:1}
// i=1: currentSum=2, 2-2=0在map中，计数为1
//      count += 1 → count=1 (子数组[1,1]在索引0-1)
//      map: {0:1, 1:1, 2:1}
// i=2: currentSum=3, 3-2=1在map中，计数为1
//      count += 1 → count=2 (子数组[1,1]在索引1-2)
//      map: {0:1, 1:1, 2:1, 3:1}
// 结果：2
\`\`\`

## 差分数组：解决范围更新

当需要**更新范围内的所有元素**时，差分数组比更新每个元素更高效。

### 构建并应用差分数组

\`\`\`javascript
function rangeUpdate(n, updates) {
  // updates是[start, end, value]的数组
  const diff = new Array(n + 1).fill(0);

  // 记录范围更新
  for (const [start, end, value] of updates) {
    diff[start] += value;
    diff[end + 1] -= value;  // 在范围后撤销
  }

  // 使用前缀和重建最终数组
  const result = new Array(n).fill(0);
  let currentValue = 0;

  for (let i = 0; i < n; i++) {
    currentValue += diff[i];
    result[i] = currentValue;
  }

  return result;
  // 时间：O(n + m) vs 朴素O(n × m)
}

// 例子：n=5, updates=[[1,2,3], [0,1,1]]
// 步骤1：构建差分数组
//   [1,2,3]: diff[1]+=3, diff[3]-=3
//   [0,1,1]: diff[0]+=1, diff[2]-=1
//   diff = [1, 3, -1, -3, 0, 0]
//
// 步骤2：通过前缀和重建
//   i=0: current=0+1=1, result[0]=1
//   i=1: current=1+3=4, result[1]=4
//   i=2: current=4-1=3, result[2]=3
//   i=3: current=3-3=0, result[3]=0
//   i=4: current=0+0=0, result[4]=0
//   result = [1, 4, 3, 0, 0]
\`\`\`

### 为什么有效

当我们在diff[start]增加并在diff[end + 1]减少时：
- 所有位置[start, end]都累积增加
- end之后的位置抵消它

这种巧妙的编码允许每次更新O(1)的批量更新！

## 2D前缀和

对于2D数组，扩展1D概念。

\`\`\`javascript
function buildPrefix2D(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const prefix = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefix[i][j] = matrix[i-1][j-1]
                     + prefix[i-1][j]
                     + prefix[i][j-1]
                     - prefix[i-1][j-1];
    }
  }

  return prefix;
}

function rangeSum2D(prefix, r1, c1, r2, c2) {
  // 从(r1,c1)到(r2,c2)的和
  return prefix[r2+1][c2+1]
         - prefix[r1][c2+1]
         - prefix[r2+1][c1]
         + prefix[r1][c1];
}

// 时间：O(1)查询，O(m×n)预处理
\`\`\`

## 问题识别

| 模式 | 解决方案 |
|---|---|
| "范围和" | 前缀和 |
| "更新后范围查询" | 差分数组 |
| "更新范围内所有元素" | 差分数组 |
| "矩形和" | 2D前缀和 |
| "计数具有性质的子数组" | 前缀和+哈希表 |

## 关键洞察

1. **前缀和用空间换时间**：O(n)空间换O(1)查询
2. **差分数组启用批量更新**：记录更改，一次应用
3. **两者都使用前缀和概念**：差分数组通过前缀和重建
4. **对离线查询最优**：当所有查询事先已知`,
  },
  leetcode: [
    {
      id: 303,
      title: 'Range Sum Query - Immutable',
      titleZh: '区域和检索 - 数组不可变',
      difficulty: 'Easy',
    },
    {
      id: 304,
      title: 'Range Sum Query 2D - Immutable',
      titleZh: '二维区域和检索 - 矩阵不可变',
      difficulty: 'Medium',
    },
    {
      id: 560,
      title: 'Subarray Sum Equals K',
      titleZh: '和为K的子数组',
      difficulty: 'Medium',
    },
  ],
}
