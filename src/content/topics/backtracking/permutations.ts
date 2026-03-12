import { TopicContent } from '../../types';

export const permutationsContent: TopicContent = {
  id: 'backtracking-permutations',
  title: {
    en: 'Permutation Problems',
    zh: '排列问题'
  },
  description: {
    en: 'Deep dive into permutation generation with and without duplicate handling',
    zh: '深入研究排列生成，包括有无重复元素的情况'
  },
  timeEstimate: '45 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Permutation Problems In Depth

Permutations are arrangements where order matters and every element is used exactly once. Understanding permutations is the key to mastering backtracking.

## Basic Permutations: [1,2,3]

Walking through the decision tree helps visualize how permutations are generated:

\`\`\`
Starting with []

Choose 1 → [1]
  Choose 2 → [1,2]
    Choose 3 → [1,2,3] ✓ (solution found)
  Choose 3 → [1,3]
    Choose 2 → [1,3,2] ✓ (solution found)

Choose 2 → [2]
  Choose 1 → [2,1]
    Choose 3 → [2,1,3] ✓
  Choose 3 → [2,3]
    Choose 1 → [2,3,1] ✓

Choose 3 → [3]
  Choose 1 → [3,1]
    Choose 2 → [3,1,2] ✓
  Choose 2 → [3,2]
    Choose 1 → [3,2,1] ✓

Result: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
\`\`\`

Total: 3! = 6 permutations

## Approach 1: Using Remaining Array

Track which elements haven't been used yet:

\`\`\`javascript
function permute(nums) {
  const result = [];

  function backtrack(path, remaining) {
    // Base case: used all numbers
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }

    // Try each remaining number
    for (let i = 0; i < remaining.length; i++) {
      // Choose
      path.push(remaining[i]);

      // Create new remaining array without current element
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));

      // Explore
      backtrack(path, newRemaining);

      // Unchoose
      path.pop();
    }
  }

  backtrack([], nums);
  return result;
}
\`\`\`

**Pros**: Clear logic, easy to understand
**Cons**: Creates new arrays (O(n) space per call)

## Approach 2: Using Used Array (More Efficient)

Track which indices have been used:

\`\`\`javascript
function permuteEfficient(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // Base case: path contains all numbers
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // Skip if already used
      if (used[i]) continue;

      // Choose
      path.push(nums[i]);
      used[i] = true;

      // Explore
      backtrack(path);

      // Unchoose
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
\`\`\`

**Pros**: No array creation, more efficient
**Cons**: Needs boolean array

## Handling Duplicates: Permutations II

When array has duplicates like [1,1,2], we need to avoid duplicate permutations.

Key insight: **Sort first, then skip consecutive duplicates**.

\`\`\`javascript
function permuteUnique(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  // Step 1: Sort to group duplicates together
  nums.sort((a, b) => a - b);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // Skip if already used
      if (used[i]) continue;

      // Key optimization: skip duplicates
      // If current is same as previous AND previous hasn't been used yet,
      // skip this duplicate to avoid duplicate permutations
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      // Choose
      path.push(nums[i]);
      used[i] = true;

      // Explore
      backtrack(path);

      // Unchoose
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
\`\`\`

## Why the Duplicate-Skipping Works

For [1,1,2]:

**Without optimization** (generates duplicates):
- [1(index 0), 1(index 1), 2]
- [1(index 1), 1(index 0), 2] ← duplicate!

**With optimization**:
- When at index 1 and nums[0] == nums[1] and used[0] is false, skip
- This prevents using the second 1 before the first 1
- Only generates: [1, 1, 2], [1, 2, 1], [2, 1, 1]

The rule: **In sorted array, never use nums[i] if nums[i-1] is the same AND hasn't been used yet.**

## Time and Space Complexity

- **Time**: O(n! × n) - n! permutations, each takes O(n) to create
- **Space**: O(n) for recursion depth + O(n) path storage

## Common Mistakes

1. **Forgetting to unchoose**: Stack error or wrong results
2. **Not sorting before handling duplicates**: Creates duplicate permutations
3. **Wrong skip condition**: Can generate duplicates or miss solutions
4. **Using slice instead of used array**: Inefficient due to array creation

## Key Takeaways

- **Basic permutations**: Try each remaining element
- **With duplicates**: Sort + skip consecutive duplicates at same recursion level
- **Always follow**: Choose → Explore → Unchoose pattern
- **Visualize decision tree** to understand why permutations are generated in that order`,
    zh: `# 排列问题深入研究

排列是考虑顺序且每个元素恰好使用一次的安排。理解排列是掌握回溯法的关键。

## 基本排列：[1,2,3]

遍历决策树有助于可视化排列是如何生成的：

\`\`\`
从[]开始

选择1 → [1]
  选择2 → [1,2]
    选择3 → [1,2,3] ✓ (找到解)
  选择3 → [1,3]
    选择2 → [1,3,2] ✓ (找到解)

选择2 → [2]
  选择1 → [2,1]
    选择3 → [2,1,3] ✓
  选择3 → [2,3]
    选择1 → [2,3,1] ✓

选择3 → [3]
  选择1 → [3,1]
    选择2 → [3,1,2] ✓
  选择2 → [3,2]
    选择1 → [3,2,1] ✓

结果: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
\`\`\`

总计：3! = 6个排列

## 方法1：使用剩余数组

跟踪哪些元素还未被使用：

\`\`\`javascript
function permute(nums) {
  const result = [];

  function backtrack(path, remaining) {
    // 基础情况：已使用所有数字
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }

    // 尝试每个剩余数字
    for (let i = 0; i < remaining.length; i++) {
      // 选择
      path.push(remaining[i]);

      // 创建不含当前元素的新剩余数组
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));

      // 探索
      backtrack(path, newRemaining);

      // 取消选择
      path.pop();
    }
  }

  backtrack([], nums);
  return result;
}
\`\`\`

**优点**：逻辑清晰，易于理解
**缺点**：创建新数组（每次调用O(n)空间）

## 方法2：使用Used数组（更有效）

跟踪哪些索引已被使用：

\`\`\`javascript
function permuteEfficient(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // 基础情况：路径包含所有数字
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 跳过已使用的
      if (used[i]) continue;

      // 选择
      path.push(nums[i]);
      used[i] = true;

      // 探索
      backtrack(path);

      // 取消选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
\`\`\`

**优点**：无数组创建，更有效
**缺点**：需要布尔数组

## 处理重复：排列II

当数组有重复元素如[1,1,2]时，需要避免重复排列。

关键洞察：**先排序，然后跳过连续的重复元素**。

\`\`\`javascript
function permuteUnique(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  // 步骤1：排序以分组重复元素
  nums.sort((a, b) => a - b);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 跳过已使用的
      if (used[i]) continue;

      // 关键优化：跳过重复
      // 如果当前与前一个相同且前一个尚未被使用，
      // 跳过此重复以避免重复排列
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      // 选择
      path.push(nums[i]);
      used[i] = true;

      // 探索
      backtrack(path);

      // 取消选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
\`\`\`

## 为什么重复跳过有效

对于[1,1,2]：

**不带优化**（生成重复）：
- [1(索引0), 1(索引1), 2]
- [1(索引1), 1(索引0), 2] ← 重复！

**带优化**：
- 当在索引1且nums[0] == nums[1]且used[0]为false时，跳过
- 这防止在第一个1前使用第二个1
- 仅生成：[1, 1, 2], [1, 2, 1], [2, 1, 1]

规则：**在排序数组中，如果nums[i-1]相同且尚未被使用，永不使用nums[i]。**

## 时间和空间复杂度

- **时间**：O(n! × n) - n!个排列，每个花费O(n)创建
- **空间**：O(n)递归深度 + O(n)路径存储

## 常见错误

1. **忘记取消选择**：栈错误或错误结果
2. **处理重复前不排序**：创建重复排列
3. **跳过条件错误**：可能生成重复或遗漏解
4. **使用slice而非used数组**：由于数组创建低效

## 关键要点

- **基本排列**：尝试每个剩余元素
- **有重复**：排序 + 跳过同一递归层的连续重复
- **始终遵循**：选择 → 探索 → 取消选择模式
- **可视化决策树**以理解排列生成的顺序`
  },
  leetcode: [
    { id: 46, title: 'Permutations', titleZh: '排列', difficulty: 'Medium' },
    { id: 47, title: 'Permutations II', titleZh: '排列II', difficulty: 'Medium' }
  ]
};
