import { TopicContent } from '../types'

export const stackQueueBasics: TopicContent = {
  id: 'stackqueue-basics',
  title: {
    en: 'Stack, Queue, and Monotonic Stack',
    zh: '栈、队列和单调栈',
  },
  description: {
    en: 'Master LIFO and FIFO data structures, and the powerful monotonic stack pattern for next/previous element problems',
    zh: '掌握LIFO和FIFO数据结构，以及下一个/前一个元素问题的强大单调栈模式',
  },
  timeEstimate: '75-90 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `## Stack: Last-In-First-Out (LIFO)

A stack is a collection where elements are added and removed from the **same end** (the top).

### Operations

\`\`\`javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// All operations: O(1)
\`\`\`

### When to Use Stacks

- **Function calls**: Call stack in programming languages
- **Undo functionality**: Each action pushed to stack, undo pops
- **Parenthesis matching**: Push opening, pop matching closing
- **Expression evaluation**: Infix to postfix conversion
- **DFS traversal**: Alternative to recursion

## Queue: First-In-First-Out (FIFO)

A queue is a collection where elements are added at the **back** and removed from the **front**.

### Operations

\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);  // Add to back
  }

  dequeue() {
    return this.items.shift();  // Remove from front
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Note: Using array.shift() is O(n).
// For better performance, use manual index tracking.
\`\`\`

### Efficient Queue Implementation

\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
    this.front = 0;  // Track front position
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    if (this.front < this.items.length) {
      return this.items[this.front++];
    }
    return undefined;
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }

  // Cleanup when front reaches halfway
  _cleanup() {
    if (this.front > 0) {
      this.items = this.items.slice(this.front);
      this.front = 0;
    }
  }
}

// All operations: O(1) amortized
\`\`\`

### When to Use Queues

- **BFS traversal**: Explore level by level
- **Task scheduling**: Process in FIFO order
- **Message queues**: Request handling
- **Print queue**: Print jobs in order

## The Monotonic Stack Pattern

A **monotonic stack** maintains elements in increasing or decreasing order. This powerful technique solves "next greater/smaller element" problems efficiently.

### Template: Next Greater Element

\`\`\`javascript
function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];  // Stores indices, maintains decreasing values

  for (let i = 0; i < arr.length; i++) {
    // While current element is greater than stack top
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = arr[i];  // Found next greater!
    }

    stack.push(i);
  }

  return result;
  // Time: O(n), Space: O(n)
}

// Example: arr = [1, 5, 0, 3, 4, 5]
// i=0: stack=[0]
// i=1: arr[1]=5 > arr[0]=1, pop 0, result[0]=5
//      stack=[1]
// i=2: arr[2]=0 < arr[1]=5, stack=[1,2]
// i=3: arr[3]=3 > arr[2]=0, pop 2, result[2]=3
//      arr[3]=3 < arr[1]=5, stack=[1,3]
// i=4: arr[4]=4 > arr[3]=3, pop 3, result[3]=4
//      arr[4]=4 < arr[1]=5, stack=[1,4]
// i=5: arr[5]=5 > arr[4]=4, pop 4, result[4]=5
//      arr[5]=5 = arr[1]=5, stack=[1,5]
// Result: [5, -1, 3, 4, 5, -1]
\`\`\`

### Why Monotonic Stack Works

Instead of naive O(n²) approach (for each element, look right):

\`\`\`javascript
// Naive: O(n²)
function nextGreaterNaive(arr) {
  const result = new Array(arr.length).fill(-1);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        result[i] = arr[j];
        break;
      }
    }
  }
  return result;
}
\`\`\`

Monotonic stack keeps track of candidates efficiently:
- When we find next greater, we immediately mark and remove (no wasted comparisons)
- Each element pushed/popped once: O(n)

## Example: Daily Temperatures

Given daily temperatures, output days until next warmer temperature.

\`\`\`javascript
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];  // Stores indices

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 &&
           temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  return result;
  // Time: O(n), Space: O(n)
}

// Example: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// We want days until next warmer day
// Day 0 (73): next warmer is day 1 (74) → 1 day
// Day 1 (74): next warmer is day 2 (75) → 1 day
// Day 2 (75): next warmer is day 6 (76) → 4 days
// Result: [1, 1, 4, 2, 1, 1, 0, 0]
\`\`\`

## Example: Valid Parentheses

\`\`\`javascript
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (pairs[char]) {
      // Closing bracket
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    } else {
      // Opening bracket
      stack.push(char);
    }
  }

  return stack.length === 0;
  // Time: O(n), Space: O(n)
}

// Example: s = "({[]})"
// char='(' → stack=['(']
// char='{' → stack=['(', '{']
// char='[' → stack=['(', '{', '[']
// char=']' → pairs[']']='[', top is '[', match! pop
//   stack=['(', '{']
// char='}' → pairs['}']='{', top is '{', match! pop
//   stack=['(']
// char=')' → pairs[')']='(', top is '(', match! pop
//   stack=[]
// Result: true
\`\`\`

## Monotonic Stack Variants

### Next Greater vs Next Greater or Equal
\`\`\`javascript
// Next Greater: arr[i] > top
while (stack.length > 0 && arr[i] > arr[stack.back()]) { ... }

// Next Greater or Equal: arr[i] >= top
while (stack.length > 0 && arr[i] >= arr[stack.back()]) { ... }
\`\`\`

### Increasing vs Decreasing Stack
\`\`\`javascript
// Increasing stack (for next greater): pop while current > top
// Decreasing stack (for next smaller): pop while current < top

// For next smaller:
while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
  const prevIndex = stack.pop();
  result[prevIndex] = arr[i];
}
stack.push(i);
\`\`\`

## Time Complexity Comparison

| Problem | Naive | Monotonic Stack |
|---|---|---|
| Next Greater | O(n²) | O(n) |
| Daily Temperatures | O(n²) | O(n) |
| Largest Rectangle | O(n²) | O(n) |

## Problem Recognition

| Pattern | Use |
|---|---|
| "Next greater element" | Monotonic stack |
| "Previous smaller element" | Monotonic stack (backward) |
| "Largest area in histogram" | Monotonic stack |
| "Matching brackets" | Stack |
| "DFS without recursion" | Stack |
| "BFS level traversal" | Queue |

The monotonic stack is **the** pattern for "next/previous" problems—once you recognize it, the solution becomes mechanical.`,

    zh: `## 栈：后进先出（LIFO）

栈是一个集合，其中元素从**同一端**（顶部）添加和删除。

### 操作

\`\`\`javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// 所有操作：O(1)
\`\`\`

### 何时使用栈

- **函数调用**：编程语言中的调用栈
- **撤销功能**：每个操作推送到栈，撤销弹出
- **括号匹配**：推送开括号，弹出匹配的闭括号
- **表达式求值**：中缀到后缀转换
- **DFS遍历**：递归的替代方案

## 队列：先进先出（FIFO）

队列是一个集合，其中元素从**后面**添加，从**前面**删除。

### 操作

\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);  // 添加到后面
  }

  dequeue() {
    return this.items.shift();  // 从前面移除
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// 注意：使用array.shift()是O(n)。
// 为了更好的性能，使用手动索引追踪。
\`\`\`

### 高效队列实现

\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
    this.front = 0;  // 追踪前面位置
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    if (this.front < this.items.length) {
      return this.items[this.front++];
    }
    return undefined;
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }

  // 当front到达中点时清理
  _cleanup() {
    if (this.front > 0) {
      this.items = this.items.slice(this.front);
      this.front = 0;
    }
  }
}

// 所有操作：O(1)摊销
\`\`\`

### 何时使用队列

- **BFS遍历**：逐级探索
- **任务调度**：按FIFO顺序处理
- **消息队列**：请求处理
- **打印队列**：按顺序打印

## 单调栈模式

**单调栈**保持元素以递增或递减顺序排列。这个强大的技术高效地解决"下一个更大/更小元素"问题。

### 模板：下一个更大元素

\`\`\`javascript
function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];  // 存储索引，保持递减值

  for (let i = 0; i < arr.length; i++) {
    // 当当前元素大于栈顶
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = arr[i];  // 找到下一个更大！
    }

    stack.push(i);
  }

  return result;
  // 时间：O(n)，空间：O(n)
}

// 例子：arr = [1, 5, 0, 3, 4, 5]
// i=0: stack=[0]
// i=1: arr[1]=5 > arr[0]=1，弹出0，result[0]=5
//      stack=[1]
// i=2: arr[2]=0 < arr[1]=5，stack=[1,2]
// i=3: arr[3]=3 > arr[2]=0，弹出2，result[2]=3
//      arr[3]=3 < arr[1]=5，stack=[1,3]
// i=4: arr[4]=4 > arr[3]=3，弹出3，result[3]=4
//      arr[4]=4 < arr[1]=5，stack=[1,4]
// i=5: arr[5]=5 > arr[4]=4，弹出4，result[4]=5
//      arr[5]=5 = arr[1]=5，stack=[1,5]
// 结果：[5, -1, 3, 4, 5, -1]
\`\`\`

### 为什么单调栈有效

而不是朴素O(n²)的方法（对每个元素，向右查看）：

\`\`\`javascript
// 朴素：O(n²)
function nextGreaterNaive(arr) {
  const result = new Array(arr.length).fill(-1);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        result[i] = arr[j];
        break;
      }
    }
  }
  return result;
}
\`\`\`

单调栈有效地跟踪候选项：
- 找到下一个更大时，立即标记并删除（无浪费的比较）
- 每个元素推送/弹出一次：O(n)

## 例子：每日温度

给定每日温度，输出多少天后会有更高温度。

\`\`\`javascript
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];  // 存储索引

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 &&
           temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  return result;
  // 时间：O(n)，空间：O(n)
}

// 例子：temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// 我们想要多少天后会有更高温度
// 第0天(73)：下一个更高的是第1天(74) → 1天
// 第1天(74)：下一个更高的是第2天(75) → 1天
// 第2天(75)：下一个更高的是第6天(76) → 4天
// 结果：[1, 1, 4, 2, 1, 1, 0, 0]
\`\`\`

## 例子：有效括号

\`\`\`javascript
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (pairs[char]) {
      // 闭括号
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    } else {
      // 开括号
      stack.push(char);
    }
  }

  return stack.length === 0;
  // 时间：O(n)，空间：O(n)
}

// 例子：s = "({[]})"
// char='(' → stack=['(']
// char='{' → stack=['(', '{']
// char='[' → stack=['(', '{', '[']
// char=']' → pairs[']']='[', top是'[', 匹配！弹出
//   stack=['(', '{']
// char='}' → pairs['}']='{', top是'{', 匹配！弹出
//   stack=['(']
// char=')' → pairs[')']='(', top是'(', 匹配！弹出
//   stack=[]
// 结果：true
\`\`\`

## 单调栈变体

### 下一个更大 vs 下一个大于等于
\`\`\`javascript
// 下一个更大：arr[i] > 顶部
while (stack.length > 0 && arr[i] > arr[stack.back()]) { ... }

// 下一个大于等于：arr[i] >= 顶部
while (stack.length > 0 && arr[i] >= arr[stack.back()]) { ... }
\`\`\`

### 递增 vs 递减栈
\`\`\`javascript
// 递增栈（用于下一个更大）：当当前 > 顶部时弹出
// 递减栈（用于下一个更小）：当当前 < 顶部时弹出

// 对于下一个更小：
while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
  const prevIndex = stack.pop();
  result[prevIndex] = arr[i];
}
stack.push(i);
\`\`\`

## 时间复杂度比较

| 问题 | 朴素 | 单调栈 |
|---|---|---|
| 下一个更大元素 | O(n²) | O(n) |
| 每日温度 | O(n²) | O(n) |
| 最大矩形面积 | O(n²) | O(n) |

## 问题识别

| 模式 | 使用 |
|---|---|
| "下一个更大元素" | 单调栈 |
| "前一个更小元素" | 单调栈（向后） |
| "直方图中最大面积" | 单调栈 |
| "匹配括号" | 栈 |
| "DFS不用递归" | 栈 |
| "BFS逐级遍历" | 队列 |

单调栈是"下一个/前一个"问题的**唯一**模式——一旦你认识到它，解决方案就变得机械性。`,
  },
  leetcode: [
    {
      id: 20,
      title: 'Valid Parentheses',
      titleZh: '有效的括号',
      difficulty: 'Easy',
    },
    {
      id: 739,
      title: 'Daily Temperatures',
      titleZh: '每日温度',
      difficulty: 'Medium',
    },
    {
      id: 496,
      title: 'Next Greater Element I',
      titleZh: '下一个更大元素 I',
      difficulty: 'Easy',
    },
    {
      id: 84,
      title: 'Largest Rectangle in Histogram',
      titleZh: '柱状图中最大的矩形',
      difficulty: 'Hard',
    },
  ],
}
