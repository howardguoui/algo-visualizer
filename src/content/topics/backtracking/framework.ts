import { TopicContent } from '../../types';

export const backtrackingFrameworkContent: TopicContent = {
  id: 'backtracking-framework',
  title: {
    en: 'Backtracking Framework and Decision Trees',
    zh: '回溯法框架与决策树'
  },
  description: {
    en: 'Master the universal backtracking template that solves all backtracking problems',
    zh: '掌握解决所有回溯问题的通用回溯法模板'
  },
  timeEstimate: '50 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Backtracking Framework and Decision Trees

Backtracking is a systematic approach to exploring all possible solutions by building partial solutions incrementally and abandoning (backtracking) when constraints are violated. The same template solves permutations, combinations, subsets, N-Queens, and more.

## The Universal Backtracking Template

Every backtracking problem follows this three-step pattern:

\`\`\`javascript
function backtrack(choices, path, result) {
  // Base case: found a solution
  if (isGoal(path)) {
    result.push([...path]);
    return;
  }

  // Try all choices
  for (const choice of choices) {
    // Check constraints: can we make this choice?
    if (isValid(choice, path)) {
      // Choose: add to current path
      path.push(choice);

      // Explore: recurse with remaining choices
      const remainingChoices = getRemaining(choices, choice);
      backtrack(remainingChoices, path, result);

      // Unchoose: backtrack
      path.pop();
    }
  }
}
\`\`\`

**The three steps**:
1. **Choose**: Add an option to the current path
2. **Explore**: Recursively build solutions
3. **Unchoose**: Remove the option and try another

## Decision Tree Mental Model

Visualize backtracking as a decision tree where:
- Each node represents a choice
- Each path from root to leaf is a potential solution
- Pruning happens when constraints fail

Example for [1,2,3]:
```
              []
           /  |  \
         [1] [2] [3]
        / \   |
      [1,2][1,3][2,1]...
```

Each node expands to children by adding another choice.

## Solving Any Backtracking Problem

Ask three questions:

1. **What are the choices?** (elements to pick from)
2. **What are the constraints?** (conditions choices must satisfy)
3. **What is the goal?** (when is a solution complete)

Example: Permutations of [1,2,3]
- **Choices**: Each number that hasn't been used
- **Constraints**: Can't reuse a number
- **Goal**: Path has 3 elements (all numbers used)

## Common Backtracking Patterns

### Pattern 1: Subsets (No Ordering)

All subsets of [1,2,3]:
- Choices: include or exclude each element
- No constraints
- Goal: processed all elements

\`\`\`javascript
function subsets(nums) {
  const result = [];

  function backtrack(index, path) {
    // Every state is a valid solution (even empty)
    result.push([...path]);

    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}
\`\`\`

**Key**: Use index to avoid revisiting elements. Include current state in results.

### Pattern 2: Combinations (No Ordering, Fixed Size)

All 2-element combinations of [1,2,3]:
- Choices: pick from remaining elements
- Constraints: size must equal k
- Goal: path has k elements

\`\`\`javascript
function combine(n, k) {
  const result = [];

  function backtrack(start, path) {
    // Base case: found a combination of size k
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
}
\`\`\`

### Pattern 3: Permutations (All Orderings)

All permutations of [1,2,3]:
- Choices: each unused number
- Constraints: can't reuse
- Goal: used all numbers

\`\`\`javascript
function permute(nums) {
  const result = [];

  function backtrack(path, remaining) {
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const num = remaining[i];
      path.push(num);

      // Create new remaining array without current element
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack(path, newRemaining);

      path.pop();
    }
  }

  backtrack([], nums);
  return result;
}
\`\`\`

## Optimization: Pruning

Pruning eliminates branches that can't lead to valid solutions:

\`\`\`javascript
function backtrackWithPruning(choices, path, result) {
  // Pruning: stop early if constraint can't be satisfied
  if (!canSatisfyGoal(path, choices)) {
    return; // Prune this branch
  }

  if (isGoal(path)) {
    result.push([...path]);
    return;
  }

  for (const choice of choices) {
    if (isValid(choice, path)) {
      path.push(choice);
      backtrack(getRemaining(choices, choice), path, result);
      path.pop();
    }
  }
}
\`\`\`

## Complexity Analysis

- **Time**: O(N^N) worst case (all permutations), but pruning dramatically improves this
- **Space**: O(N) recursion depth + O(N) for path

Backtracking is a brute-force approach optimized by pruning.

## When to Use Backtracking

✓ **Good for**:
- Generating all combinations/permutations
- Constraint satisfaction (Sudoku, N-Queens)
- Path finding with restrictions
- Search through discrete state space

✗ **Not for**:
- Continuous optimization
- Large solution spaces without pruning
- When greedy or DP works faster`,
    zh: `# 回溯法框架与决策树

回溯法是一种系统地通过逐步构建部分解并在约束违反时放弃（回溯）来探索所有可能解的方法。相同的模板可以解决排列、组合、子集、N皇后等问题。

## 通用回溯法模板

每个回溯问题都遵循这个三步模式：

\`\`\`javascript
function backtrack(choices, path, result) {
  // 基础情况：找到一个解
  if (isGoal(path)) {
    result.push([...path]);
    return;
  }

  // 尝试所有选择
  for (const choice of choices) {
    // 检查约束：我们能做这个选择吗？
    if (isValid(choice, path)) {
      // 选择：添加到当前路径
      path.push(choice);

      // 探索：用剩余选择递归
      const remainingChoices = getRemaining(choices, choice);
      backtrack(remainingChoices, path, result);

      // 取消选择：回溯
      path.pop();
    }
  }
}
\`\`\`

**三个步骤**：
1. **选择**：将一个选项添加到当前路径
2. **探索**：递归构建解
3. **取消选择**：移除选项并尝试另一个

## 决策树心理模型

将回溯视为决策树：
- 每个节点代表一个选择
- 从根到叶的每条路径是一个潜在解
- 约束失败时进行修剪

[1,2,3]的例子：
```
              []
           /  |  \
         [1] [2] [3]
        / \   |
      [1,2][1,3][2,1]...
```

每个节点通过添加另一个选择来扩展到子节点。

## 解决任何回溯问题

问三个问题：

1. **选择是什么？** （要从中选择的元素）
2. **约束是什么？** （选择必须满足的条件）
3. **目标是什么？** （何时解完整）

例子：[1,2,3]的排列
- **选择**：每个未使用的数字
- **约束**：不能重复使用数字
- **目标**：路径有3个元素（所有数字已使用）

## 常见回溯法模式

### 模式1：子集（无顺序）

[1,2,3]的所有子集：
- 选择：包含或排除每个元素
- 无约束
- 目标：已处理所有元素

\`\`\`javascript
function subsets(nums) {
  const result = [];

  function backtrack(index, path) {
    // 每个状态都是有效解（即使是空的）
    result.push([...path]);

    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}
\`\`\`

**关键**：使用索引避免重新访问元素。在结果中包括当前状态。

### 模式2：组合（无顺序，固定大小）

[1,2,3]的所有2元素组合：
- 选择：从剩余元素中选择
- 约束：大小必须等于k
- 目标：路径有k个元素

\`\`\`javascript
function combine(n, k) {
  const result = [];

  function backtrack(start, path) {
    // 基础情况：找到大小为k的组合
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
}
\`\`\`

### 模式3：排列（所有顺序）

[1,2,3]的所有排列：
- 选择：每个未使用的数字
- 约束：无法重复使用
- 目标：已使用所有数字

\`\`\`javascript
function permute(nums) {
  const result = [];

  function backtrack(path, remaining) {
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const num = remaining[i];
      path.push(num);

      // 创建不含当前元素的新剩余数组
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack(path, newRemaining);

      path.pop();
    }
  }

  backtrack([], nums);
  return result;
}
\`\`\`

## 优化：修剪

修剪消除不能导致有效解的分支：

\`\`\`javascript
function backtrackWithPruning(choices, path, result) {
  // 修剪：如果无法满足目标，提前停止
  if (!canSatisfyGoal(path, choices)) {
    return; // 修剪此分支
  }

  if (isGoal(path)) {
    result.push([...path]);
    return;
  }

  for (const choice of choices) {
    if (isValid(choice, path)) {
      path.push(choice);
      backtrack(getRemaining(choices, choice), path, result);
      path.pop();
    }
  }
}
\`\`\`

## 复杂度分析

- **时间**：O(N^N)最坏情况（所有排列），但修剪显著改善
- **空间**：O(N)递归深度 + O(N)用于路径

回溯法是通过修剪优化的蛮力方法。

## 何时使用回溯法

✓ **适用于**：
- 生成所有组合/排列
- 约束满足（数独、N皇后）
- 有限制的路径查找
- 通过离散状态空间搜索

✗ **不适用于**：
- 连续优化
- 无修剪的大解空间
- 贪心或动态规划更快时`
  },
  leetcode: [
    { id: 46, title: 'Permutations', titleZh: '排列', difficulty: 'Medium' },
    { id: 77, title: 'Combinations', titleZh: '组合', difficulty: 'Medium' },
    { id: 78, title: 'Subsets', titleZh: '子集', difficulty: 'Medium' },
    { id: 51, title: 'N-Queens', titleZh: 'N皇后', difficulty: 'Hard' }
  ]
};
