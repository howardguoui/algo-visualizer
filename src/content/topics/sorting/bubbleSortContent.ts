import { TopicContent } from '../../types';

export const bubbleSortContent: TopicContent = {
  id: 'sorting-bubble-sort',
  title: {
    en: 'Bubble Sort Algorithm',
    zh: '冒泡排序算法'
  },
  description: {
    en: 'Understand the simplest sorting algorithm - repeated comparison and swapping',
    zh: '理解最简单的排序算法 - 重复比较和交换'
  },
  timeEstimate: '30 minutes',
  contentType: 'all',
  hasVisualizer: false,
  visualizerKey: 'bubbleSort',
  content: {
    en: `# Bubble Sort Algorithm

Bubble sort is the simplest sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they're in the wrong order. The algorithm gets its name because smaller elements "bubble" to the front while larger elements "sink" to the back.

## How Bubble Sort Works

**Core idea**: After each pass through the array, the largest unsorted element moves to its correct position at the end.

**Example**: Sorting [5, 3, 8, 4, 2]

Pass 1:
- Compare 5,3 → swap → [3, 5, 8, 4, 2]
- Compare 5,8 → no swap → [3, 5, 8, 4, 2]
- Compare 8,4 → swap → [3, 5, 4, 8, 2]
- Compare 8,2 → swap → [3, 5, 4, 2, 8] ← 8 in correct position

Pass 2:
- Compare 3,5 → no swap → [3, 5, 4, 2, 8]
- Compare 5,4 → swap → [3, 4, 5, 2, 8]
- Compare 5,2 → swap → [3, 4, 2, 5, 8] ← 5 in correct position

Continue until sorted...

## Basic Implementation

\`\`\`javascript
function bubbleSort(arr) {
  const n = arr.length;

  // Outer loop: n passes
  for (let i = 0; i < n; i++) {
    // Inner loop: compare adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap if out of order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
\`\`\`

**Why n - i - 1?** After i passes, the last i elements are already in their correct positions, so we don't need to compare them again.

## Optimization: Early Termination

If no swaps occur in a pass, the array is sorted and we can stop early:

\`\`\`javascript
function bubbleSortOptimized(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps occurred, array is sorted
    if (!swapped) {
      break;
    }
  }

  return arr;
}
\`\`\`

This optimization is crucial for partially sorted arrays or already-sorted arrays.

## Time Complexity Analysis

**Worst Case: O(n²)**
- Occurs when array is sorted in reverse order
- Each of n passes needs to compare n, n-1, n-2, ... 1 elements
- Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)

**Average Case: O(n²)**
- Still quadratic for random data

**Best Case: O(n)** (with optimization)
- Occurs when array is already sorted
- First pass makes no swaps, early termination triggers
- Only n-1 comparisons

**Space Complexity: O(1)**
- Sorts in-place, no extra space needed

## Comparison with Other Sorting Algorithms

| Algorithm | Time Best | Time Avg | Time Worst | Space | Stable |
|-----------|-----------|----------|-----------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Stability

Bubble sort is **stable**: equal elements maintain their relative order. When comparing arr[j] and arr[j+1], we only swap if arr[j] > arr[j+1] (not >=), preserving the order of equal elements.

## When to Use Bubble Sort

✓ **Good for**:
- Educational purposes (easy to understand)
- Very small datasets (n < 10)
- Nearly sorted data (with optimization)
- Demonstrating sorting concepts

✗ **Avoid for**:
- Large datasets (use merge sort, quick sort)
- Performance-critical applications
- Real production code (use built-in sort)

## Code Pattern Recognition

The bubble sort pattern appears in many places:
- Any "repeatedly compare neighbors and swap" logic
- Problems requiring adjacent element swaps
- Detecting whether an array is sorted

## Key Insights

1. **Bubble effect**: Largest element "bubbles" to end each pass
2. **Early termination**: Check for swaps to optimize partially sorted data
3. **In-place sorting**: O(1) space by swapping without extra arrays
4. **Stable sort**: Maintains relative order of equal elements
5. **O(n²) quadratic**: Acceptable only for tiny datasets`,
    zh: `# 冒泡排序算法

冒泡排序是最简单的排序算法。它通过重复遍历列表、比较相邻元素和交换位置不当的元素来工作。该算法得名于较小元素"冒泡"到前面，较大元素"沉入"后面。

## 冒泡排序如何工作

**核心思想**：经过一次完整遍历后，最大的未排序元素移到末尾的正确位置。

**例子**：排序[5, 3, 8, 4, 2]

第1轮：
- 比较5,3 → 交换 → [3, 5, 8, 4, 2]
- 比较5,8 → 不交换 → [3, 5, 8, 4, 2]
- 比较8,4 → 交换 → [3, 5, 4, 8, 2]
- 比较8,2 → 交换 → [3, 5, 4, 2, 8] ← 8在正确位置

第2轮：
- 比较3,5 → 不交换 → [3, 5, 4, 2, 8]
- 比较5,4 → 交换 → [3, 4, 5, 2, 8]
- 比较5,2 → 交换 → [3, 4, 2, 5, 8] ← 5在正确位置

继续直到排序完成...

## 基础实现

\`\`\`javascript
function bubbleSort(arr) {
  const n = arr.length;

  // 外层循环：n轮
  for (let i = 0; i < n; i++) {
    // 内层循环：比较相邻元素
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 如果顺序不对，交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
\`\`\`

**为什么是n - i - 1?** 经过i轮后，最后i个元素已在正确位置，无需再比较。

## 优化：提前终止

如果一轮中没有交换，数组已排序，可以停止：

\`\`\`javascript
function bubbleSortOptimized(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // 如果无交换发生，数组已排序
    if (!swapped) {
      break;
    }
  }

  return arr;
}
\`\`\`

此优化对部分排序或已排序的数组至关重要。

## 时间复杂度分析

**最坏情况：O(n²)**
- 当数组反向排序时发生
- 每一轮需要比较n、n-1、n-2、...、1个元素
- 总计：n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)

**平均情况：O(n²)**
- 随机数据仍为二次方

**最优情况：O(n)**（带优化）
- 当数组已排序时发生
- 第一轮无交换，提前终止触发
- 仅n-1次比较

**空间复杂度：O(1)**
- 原地排序，无需额外空间

## 与其他排序算法的比较

| 算法       | 最优    | 平均    | 最坏    | 空间   | 稳定 |
|-----------|---------|---------|---------|--------|------|
| 冒泡排序   | O(n)    | O(n²)   | O(n²)   | O(1)   | 是   |
| 选择排序   | O(n²)   | O(n²)   | O(n²)   | O(1)   | 否   |
| 插入排序   | O(n)    | O(n²)   | O(n²)   | O(1)   | 是   |
| 归并排序   | O(n log n) | O(n log n) | O(n log n) | O(n) | 是 |
| 快速排序   | O(n log n) | O(n log n) | O(n²) | O(log n) | 否 |

## 稳定性

冒泡排序是**稳定的**：相等元素保持相对顺序。比较arr[j]和arr[j+1]时，仅在arr[j] > arr[j+1]时交换（非>=），保留相等元素的顺序。

## 何时使用冒泡排序

✓ **适用于**：
- 教育目的（易于理解）
- 极小数据集（n < 10）
- 接近排序的数据（带优化）
- 演示排序概念

✗ **避免用于**：
- 大数据集（使用归并排序、快速排序）
- 性能关键应用
- 真实生产代码（使用内置排序）

## 代码模式识别

冒泡排序模式出现在很多地方：
- 任何"重复比较邻接并交换"的逻辑
- 需要相邻元素交换的问题
- 检测数组是否排序

## 关键洞察

1. **冒泡效应**：最大元素每轮"冒泡"到末尾
2. **提前终止**：检查交换以优化部分排序数据
3. **原地排序**：通过交换实现O(1)空间
4. **稳定排序**：保持相等元素的相对顺序
5. **O(n²)二次方**：仅对极小数据集可接受`
  },
  leetcode: [
    { id: 912, title: 'Sort an Array', titleZh: '排序数组', difficulty: 'Medium' }
  ]
};
