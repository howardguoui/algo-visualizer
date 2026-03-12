import { TopicContent } from '../types'

export const arrayFundamentals: TopicContent = {
  id: 'arrays-fundamentals',
  title: {
    en: 'Array Fundamentals',
    zh: '数组基础',
  },
  description: {
    en: 'Understand array memory layout, indexing, and core operations that form the foundation of algorithm design',
    zh: '理解数组内存布局、索引和核心操作，这些是算法设计的基础',
  },
  timeEstimate: '50-70 minutes',
  contentType: 'content',
  hasVisualizer: false,
  content: {
    en: `## What is an Array?

An array is a **contiguous block of memory** that stores elements of the same type. This simple fact drives all array operations:

### Memory Layout

\`\`\`
Array: [10, 20, 30, 40, 50]
Index:  [0,  1,  2,  3,  4]

Memory: [10][20][30][40][50]
Address: 0x100 0x104 0x108 0x10c 0x110  (4 bytes per int)
\`\`\`

Because elements are **contiguous in memory**, we get constant-time random access.

## Time Complexity Analysis

### Access by Index: O(1)
\`\`\`javascript
const arr = [10, 20, 30, 40, 50];
const element = arr[2];  // Direct memory lookup: O(1)
\`\`\`

Memory address calculation: \`baseAddress + (index × elementSize)\`

No matter if you access arr[0] or arr[1000000], it's always one computation.

### Search (unsorted): O(n)
\`\`\`javascript
function findElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;  // O(n) - must check each element
}
\`\`\`

### Insertion at Beginning: O(n)
\`\`\`javascript
// Insert 5 at index 0
[10, 20, 30] → [5, 10, 20, 30]

// Must shift ALL elements right
arr.unshift(5);  // O(n) operation
\`\`\`

Why? After insertion, the array is still **contiguous**. To insert at index 0:
1. Shift element at index 0 → index 1: O(1)
2. Shift element at index 1 → index 2: O(1)
3. Shift element at index n-1 → index n: O(1)
4. Total: n shifts = **O(n)**

### Insertion at End: O(1) amortized
\`\`\`javascript
arr.push(100);  // O(1) if space available
\`\`\`

When array is full, it doubles capacity (amortized O(1)).

### Deletion: O(n) for middle, O(1) for end
\`\`\`javascript
// Delete from middle - must shift remaining elements
[10, 20, 30, 40]
Delete index 1 → [10, 30, 40]  // Shift 30, 40 left: O(n)

// Delete from end - just reduce size
[10, 20, 30, 40]
Delete index 3 → [10, 20, 30]  // O(1)
\`\`\`

## Dynamic Arrays

Most modern languages use **dynamic arrays** (vector, ArrayList, Python list) that:
- Start with capacity C
- When full, allocate 2C and copy all elements
- Copying happens rarely, so insertion amortizes to O(1)

\`\`\`javascript
const arr = [];
arr.push(1);   // capacity: 1, size: 1
arr.push(2);   // capacity: 2, size: 2
arr.push(3);   // capacity: 4 (doubled!), size: 3
arr.push(4);   // capacity: 4, size: 4
arr.push(5);   // capacity: 8 (doubled!), size: 5
\`\`\`

## Common Array Operations

### Reverse
\`\`\`javascript
function reverse(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
// Time: O(n), Space: O(1)
\`\`\`

### Remove Duplicates (sorted array)
\`\`\`javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;  // new length
}
// Time: O(n), Space: O(1)
\`\`\`

### Rotate Array
\`\`\`javascript
function rotate(arr, k) {
  k = k % arr.length;  // Handle k > length
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
}
// Time: O(n), Space: O(1)

// Example: [1,2,3,4,5], k=2
// Step 1: reverse all → [5,4,3,2,1]
// Step 2: reverse first k → [4,5,3,2,1]
// Step 3: reverse rest → [4,5,1,2,3]
\`\`\`

## Key Insights

1. **Arrays excel at random access** (O(1)) due to contiguous memory
2. **Arrays suffer at insertions/deletions** in the middle (O(n)) because maintaining contiguity requires shifting
3. **Size matters**: Small arrays often outperform linked lists due to cache locality
4. **Two-pointer technique works well with arrays** because you have O(1) access to both ends

Arrays are the foundation—master their properties and you'll design algorithms efficiently.`,

    zh: `## 什么是数组？

数组是一个**连续的内存块**，存储相同类型的元素。这个简单事实驱动所有数组操作：

### 内存布局

\`\`\`
数组：[10, 20, 30, 40, 50]
索引： [0,  1,  2,  3,  4]

内存：[10][20][30][40][50]
地址：0x100 0x104 0x108 0x10c 0x110  (每个int占4字节)
\`\`\`

因为元素在内存中**连续**，我们得到常数时间随机访问。

## 时间复杂度分析

### 按索引访问：O(1)
\`\`\`javascript
const arr = [10, 20, 30, 40, 50];
const element = arr[2];  // 直接内存查找：O(1)
\`\`\`

内存地址计算：\`基地址 + (索引 × 元素大小)\`

无论访问arr[0]还是arr[1000000]，都只是一次计算。

### 搜索（无序）：O(n)
\`\`\`javascript
function findElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;  // O(n) - 必须检查每个元素
}
\`\`\`

### 在开头插入：O(n)
\`\`\`javascript
// 在索引0处插入5
[10, 20, 30] → [5, 10, 20, 30]

// 必须将所有元素右移
arr.unshift(5);  // O(n)操作
\`\`\`

为什么？插入后，数组仍然是**连续**的。在索引0插入：
1. 把索引0的元素移到索引1：O(1)
2. 把索引1的元素移到索引2：O(1)
3. ...
4. 总共：n次移位 = **O(n)**

### 在末尾插入：摊销O(1)
\`\`\`javascript
arr.push(100);  // 如果有空间：O(1)
\`\`\`

当数组满时，容量加倍（摊销O(1)）。

### 删除：中间O(n)，末尾O(1)
\`\`\`javascript
// 从中间删除 - 必须左移后续元素
[10, 20, 30, 40]
删除索引1 → [10, 30, 40]  // 移位30, 40：O(n)

// 从末尾删除 - 只需减小大小
[10, 20, 30, 40]
删除索引3 → [10, 20, 30]  // O(1)
\`\`\`

## 动态数组

大多数现代语言使用**动态数组**（vector、ArrayList、Python list），其特点是：
- 初始容量C
- 满时，分配2C并复制所有元素
- 复制很少发生，所以插入摊销为O(1)

\`\`\`javascript
const arr = [];
arr.push(1);   // 容量：1，大小：1
arr.push(2);   // 容量：2，大小：2
arr.push(3);   // 容量：4（加倍！），大小：3
arr.push(4);   // 容量：4，大小：4
arr.push(5);   // 容量：8（加倍！），大小：5
\`\`\`

## 常见数组操作

### 反转
\`\`\`javascript
function reverse(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
// 时间：O(n)，空间：O(1)
\`\`\`

### 移除重复（有序数组）
\`\`\`javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;  // 新长度
}
// 时间：O(n)，空间：O(1)
\`\`\`

### 旋转数组
\`\`\`javascript
function rotate(arr, k) {
  k = k % arr.length;  // 处理k > 长度的情况
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
}
// 时间：O(n)，空间：O(1)

// 例子：[1,2,3,4,5], k=2
// 步骤1：反转所有 → [5,4,3,2,1]
// 步骤2：反转前k个 → [4,5,3,2,1]
// 步骤3：反转其余 → [4,5,1,2,3]
\`\`\`

## 关键洞察

1. **数组擅长随机访问**（O(1)），因为内存连续
2. **数组在中间插入/删除时表现差**（O(n)），因为需要移位来维持连续性
3. **大小很重要**：小数组通常因缓存局部性而优于链表
4. **双指针技术对数组效果很好**，因为你有O(1)访问两端的能力

数组是基础——掌握其性质，你将有效地设计算法。`,
  },
  leetcode: [
    {
      id: 27,
      title: 'Remove Element',
      titleZh: '移除元素',
      difficulty: 'Easy',
    },
    {
      id: 26,
      title: 'Remove Duplicates from Sorted Array',
      titleZh: '删除有序数组中的重复项',
      difficulty: 'Easy',
    },
    {
      id: 977,
      title: 'Squares of a Sorted Array',
      titleZh: '有序数组的平方',
      difficulty: 'Easy',
    },
  ],
}
