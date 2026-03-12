import { TopicContent } from '../../types';

export const mergeSortContent: TopicContent = {
  id: 'sorting-merge-sort',
  title: {
    en: 'Merge Sort - Divide and Conquer',
    zh: '归并排序 - 分治法'
  },
  description: {
    en: 'Master the efficient O(n log n) sorting algorithm using divide-and-conquer strategy',
    zh: '掌握使用分治策略的高效O(n log n)排序算法'
  },
  timeEstimate: '45 minutes',
  contentType: 'all',
  hasVisualizer: false,
  visualizerKey: 'mergeSort',
  content: {
    en: `# Merge Sort - Divide and Conquer Paradigm

Merge sort is a classic divide-and-conquer algorithm that achieves O(n log n) time complexity. It divides the array into halves, sorts them recursively, then merges the sorted halves.

## Algorithm Overview

**Three steps**:
1. **Divide**: Split array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge two sorted halves into one sorted array

## Recursion Tree Visualization

For array [38, 27, 43, 3, 9, 82, 10]:

```
                [38,27,43,3,9,82,10]
                      /         \\
            [38,27,43,3]    [9,82,10]
              /        \\        /      \\
        [38,27]    [43,3]   [9,82]   [10]
        /    \\      /    \\    /   \\
      [38] [27]  [43] [3] [9][82] [10]

        [27,38]    [3,43]  [9,82] [10]
          \\        /        \\     /
          [3,27,38,43]    [9,10,82]
                \\           /
           [3,9,10,27,38,43,82]
```

Each level halves the array size. Height = log n, so log n levels.

## Core Implementation

\`\`\`javascript
function mergeSort(arr) {
  // Base case: array of size 1 is already sorted
  if (arr.length <= 1) return arr;

  // Divide: split into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Conquer: recursively sort each half
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine: merge sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  // Merge two sorted arrays
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements
  result.push(...left.slice(i));
  result.push(...right.slice(j));

  return result;
}
\`\`\`

**Key insight**: The merge step is O(n) because we compare each element once. With log n levels, total time is O(n log n).

## In-Place Implementation (Space Optimization)

The above uses O(n) extra space for recursion. In-place version:

\`\`\`javascript
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Recursively sort left and right halves
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);

    // Merge sorted halves
    mergeInPlace(arr, left, mid, right);
  }

  return arr;
}

function mergeInPlace(arr, left, mid, right) {
  // Create temporary arrays
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  // Merge back into original array
  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) {
      arr[k++] = leftPart[i++];
    } else {
      arr[k++] = rightPart[j++];
    }
  }

  // Copy remaining elements
  while (i < leftPart.length) {
    arr[k++] = leftPart[i++];
  }
  while (j < rightPart.length) {
    arr[k++] = rightPart[j++];
  }
}
\`\`\`

## Time Complexity Analysis

**Master Theorem**: T(n) = 2T(n/2) + O(n)

The merge function is O(n) - comparing and placing each element once.

```
Level 0:        1 problem of size n           → O(n)
Level 1:        2 problems of size n/2        → 2 × O(n/2) = O(n)
Level 2:        4 problems of size n/4        → 4 × O(n/4) = O(n)
...
Level log n:    n problems of size 1          → n × O(1) = O(n)

Total: O(n) × log n levels = O(n log n)
```

**All cases**: O(n log n) - best, average, worst are the same!

**Space Complexity**: O(n) for temporary arrays in merge step

## Stability

Merge sort is **stable** because we preserve order: `if (left[i] <= right[j])` uses `<=` not `<`. Equal elements from the left go before equal elements from the right, preserving original order.

## Comparison with Quick Sort

| Aspect | Merge Sort | Quick Sort |
|--------|-----------|-----------|
| Time (Best) | O(n log n) | O(n log n) |
| Time (Avg) | O(n log n) | O(n log n) |
| Time (Worst) | O(n log n) | O(n²) |
| Space | O(n) | O(log n) |
| Stable | Yes | No |
| Cache Efficiency | Good | Better |

## When to Use Merge Sort

✓ **Good for**:
- Guaranteed O(n log n) needed
- Stable sort required
- Linked list sorting (O(1) extra space)
- External sorting (data on disk)
- Parallel processing (divides evenly)

✗ **Avoid for**:
- Small datasets (insertion sort better)
- Memory constraints (uses O(n) space)
- Cache optimization critical (quick sort better)

## Advanced: Counting Inversions

Merge sort reveals a powerful application: counting inversions (pairs where arr[i] > arr[j] with i < j).

During merge, when taking from right array, we add (mid - i + 1) to inversion count:

\`\`\`javascript
function countInversions(arr) {
  let count = 0;

  function mergeSortCount(arr, left, mid, right) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length) {
      if (leftPart[i] <= rightPart[j]) {
        arr[k++] = leftPart[i++];
      } else {
        // leftPart[i] > rightPart[j]: these are inversions
        count += leftPart.length - i;
        arr[k++] = rightPart[j++];
      }
    }

    while (i < leftPart.length) arr[k++] = leftPart[i++];
    while (j < rightPart.length) arr[k++] = rightPart[j++];
  }

  // ... merge sort implementation with counting
  return count;
}
\`\`\`

This converts O(n²) naive inversion counting to O(n log n)!

## Key Insights

1. **Divide-and-conquer** solves in log n levels of O(n) work
2. **Guaranteed O(n log n)** - no worst case degradation
3. **Stable sort** - preserves order of equal elements
4. **Space tradeoff** - uses O(n) space for O(n log n) time
5. **Parallelizable** - independent subproblems ideal for parallel execution`,
    zh: `# 归并排序 - 分治范式

归并排序是经典的分治算法，实现O(n log n)时间复杂度。它将数组分为两半，递归排序，然后合并有序的两半。

## 算法概述

**三个步骤**：
1. **分割**：将数组分成两半
2. **征服**：递归排序每一半
3. **合并**：合并两个有序的一半为一个有序数组

## 递归树可视化

对于数组[38, 27, 43, 3, 9, 82, 10]：

```
                [38,27,43,3,9,82,10]
                      /         \\
            [38,27,43,3]    [9,82,10]
              /        \\        /      \\
        [38,27]    [43,3]   [9,82]   [10]
        /    \\      /    \\    /   \\
      [38] [27]  [43] [3] [9][82] [10]

        [27,38]    [3,43]  [9,82] [10]
          \\        /        \\     /
          [3,27,38,43]    [9,10,82]
                \\           /
           [3,9,10,27,38,43,82]
```

每一级将数组大小减半。高度 = log n，所以有log n级。

## 核心实现

\`\`\`javascript
function mergeSort(arr) {
  // 基础情况：大小为1的数组已排序
  if (arr.length <= 1) return arr;

  // 分割：分成两半
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 征服：递归排序每一半
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // 合并：合并有序的两半
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  // 合并两个有序数组
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // 添加剩余元素
  result.push(...left.slice(i));
  result.push(...right.slice(j));

  return result;
}
\`\`\`

**关键洞察**：合并步骤是O(n)，因为我们比较每个元素一次。有log n级，总时间是O(n log n)。

## 原地实现（空间优化）

上面使用O(n)额外空间用于递归。原地版本：

\`\`\`javascript
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 递归排序左右两半
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);

    // 合并有序的两半
    mergeInPlace(arr, left, mid, right);
  }

  return arr;
}

function mergeInPlace(arr, left, mid, right) {
  // 创建临时数组
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  // 合并回原数组
  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) {
      arr[k++] = leftPart[i++];
    } else {
      arr[k++] = rightPart[j++];
    }
  }

  // 复制剩余元素
  while (i < leftPart.length) {
    arr[k++] = leftPart[i++];
  }
  while (j < rightPart.length) {
    arr[k++] = rightPart[j++];
  }
}
\`\`\`

## 时间复杂度分析

**主定理**：T(n) = 2T(n/2) + O(n)

合并函数是O(n) - 比较并放置每个元素一次。

```
第0级：        1个大小为n的问题           → O(n)
第1级：        2个大小为n/2的问题        → 2 × O(n/2) = O(n)
第2级：        4个大小为n/4的问题        → 4 × O(n/4) = O(n)
...
第log n级：    n个大小为1的问题          → n × O(1) = O(n)

总计：O(n) × log n级 = O(n log n)
```

**所有情况**：O(n log n) - 最优、平均、最坏都一样！

**空间复杂度**：O(n)用于合并步骤的临时数组

## 稳定性

归并排序是**稳定的**，因为我们保持顺序：`if (left[i] <= right[j])`使用`<=`而非`<`。左侧相等元素在右侧相等元素之前，保留原始顺序。

## 与快速排序的比较

| 方面 | 归并排序 | 快速排序 |
|------|---------|---------|
| 时间（最优） | O(n log n) | O(n log n) |
| 时间（平均） | O(n log n) | O(n log n) |
| 时间（最坏） | O(n log n) | O(n²) |
| 空间 | O(n) | O(log n) |
| 稳定 | 是 | 否 |
| 缓存效率 | 好 | 更好 |

## 何时使用归并排序

✓ **适用于**：
- 需要保证O(n log n)
- 需要稳定排序
- 链表排序（O(1)额外空间）
- 外部排序（数据在磁盘上）
- 并行处理（均匀分割）

✗ **避免用于**：
- 小数据集（插入排序更好）
- 内存受限（使用O(n)空间）
- 缓存优化关键（快速排序更好）

## 高级：计数反演

归并排序展示强大应用：计数反演（对中arr[i] > arr[j]且i < j）。

合并期间，从右数组取值时，添加(mid - i + 1)到反演计数：

\`\`\`javascript
function countInversions(arr) {
  let count = 0;

  function mergeSortCount(arr, left, mid, right) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length) {
      if (leftPart[i] <= rightPart[j]) {
        arr[k++] = leftPart[i++];
      } else {
        // leftPart[i] > rightPart[j]：这些是反演
        count += leftPart.length - i;
        arr[k++] = rightPart[j++];
      }
    }

    while (i < leftPart.length) arr[k++] = leftPart[i++];
    while (j < rightPart.length) arr[k++] = rightPart[j++];
  }

  // ...带计数的归并排序实现
  return count;
}
\`\`\`

这将O(n²)朴素反演计数转换为O(n log n)！

## 关键洞察

1. **分治法**在log n级中以O(n)工作解决
2. **保证O(n log n)** - 无最坏情况降级
3. **稳定排序** - 保留相等元素的顺序
4. **空间权衡** - 用O(n)空间换O(n log n)时间
5. **可并行化** - 独立子问题适合并行执行`
  },
  leetcode: [
    { id: 912, title: 'Sort an Array', titleZh: '排序数组', difficulty: 'Medium' },
    { id: 315, title: 'Count of Smaller Numbers After Self', titleZh: '计算右侧小于当前元素的个数', difficulty: 'Hard' }
  ]
};
