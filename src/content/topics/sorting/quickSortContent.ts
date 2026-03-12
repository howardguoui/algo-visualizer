import { TopicContent } from '../../types';

export const quickSortContent: TopicContent = {
  id: 'sorting-quick-sort',
  title: {
    en: 'Quick Sort - Partitioning Paradigm',
    zh: '快速排序 - 分割范式'
  },
  description: {
    en: 'Master the most practical sorting algorithm with average O(n log n) and intelligent pivot selection',
    zh: '掌握最实用的排序算法，平均O(n log n)和智能枢轴选择'
  },
  timeEstimate: '50 minutes',
  contentType: 'all',
  hasVisualizer: false,
  visualizerKey: 'quickSort',
  content: {
    en: `# Quick Sort - The Partitioning Paradigm

Quick sort is the most practical general-purpose sorting algorithm. It uses partitioning to divide the problem and runs in O(n log n) average time with O(log n) space. Despite O(n²) worst case, careful pivot selection makes this rare.

## Core Idea: Partition

The key operation is **partitioning**: rearrange array so that:
- All elements <= pivot are on the left
- Pivot is in its final position
- All elements > pivot are on the right

This single operation reduces the problem size and builds the sort recursively.

## Basic Implementation

\`\`\`javascript
function quickSort(arr) {
  return quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    // Partition and get pivot index
    const pivotIndex = partition(arr, low, high);

    // Recursively sort left and right partitions
    quickSortHelper(arr, low, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, high);
  }

  return arr;
}

function partition(arr, low, high) {
  // Choose rightmost as pivot
  const pivot = arr[high];
  let i = low - 1;

  // Rearrange: elements <= pivot go left
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in final position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
\`\`\`

**Partition logic**:
- `i` tracks boundary between <= pivot and > pivot
- When we find an element <= pivot, swap it into the left partition
- Finally, put pivot in its correct position

## Example Walkthrough

Array: [3, 7, 8, 5, 2, 1, 9, 5, 4], pivot = 4

```
Start: [3, 7, 8, 5, 2, 1, 9, 5, 4]
       i points to position before first element

j=0: arr[0]=3 <= 4? Yes → i=0, swap → [3, 7, 8, 5, 2, 1, 9, 5, 4]
j=1: arr[1]=7 <= 4? No  → skip
j=2: arr[2]=8 <= 4? No  → skip
j=3: arr[3]=5 <= 4? No  → skip
j=4: arr[4]=2 <= 4? Yes → i=1, swap → [3, 2, 8, 5, 7, 1, 9, 5, 4]
j=5: arr[5]=1 <= 4? Yes → i=2, swap → [3, 2, 1, 5, 7, 8, 9, 5, 4]
j=6: arr[6]=9 <= 4? No  → skip
j=7: arr[7]=5 <= 4? No  → skip

Final swap: place pivot at i+1=3
Result: [3, 2, 1, 4, 7, 8, 9, 5, 5]
         └─ <= 4 ─┘ │ └─ > 4 ──┘
              Partition complete! Pivot (4) is in correct final position.
```

Now recursively sort [3,2,1] and [7,8,9,5,5]

## Pivot Selection Strategies

**Poor pivot choice** leads to O(n²). **Good pivot selection** ensures O(n log n).

### Strategy 1: Last Element (Simple, Risky)

\`\`\`javascript
const pivot = arr[high]; // Easy but worst-case on sorted data
\`\`\`

### Strategy 2: Random Pivot (Better)

\`\`\`javascript
function partition(arr, low, high) {
  // Pick random element and swap to end
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];

  const pivot = arr[high];
  // ... rest of partition logic
}
\`\`\`

Randomization avoids worst-case on any input pattern.

### Strategy 3: Median-of-Three (Sophisticated)

\`\`\`javascript
function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);

  if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];

  return mid; // Middle is now median
}

function partition(arr, low, high) {
  const pivotIndex = medianOfThree(arr, low, high);
  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

  const pivot = arr[high];
  // ... rest of partition logic
}
\`\`\`

Median-of-three helps avoid worst case even on partially sorted data.

## Time Complexity Analysis

**Best Case: O(n log n)**
- Balanced partition: pivot always divides array in half
- log n levels, O(n) work per level

**Average Case: O(n log n)**
- Random partition usually close to balanced
- Expected height is O(log n)

**Worst Case: O(n²)**
- Unbalanced partition: pivot is always smallest/largest
- Linear depth (n levels), O(n) work per level
- Happens with sorted data and bad pivot selection

**Space Complexity: O(log n)**
- Recursion depth (best/average case)
- O(n) worst case with terrible partitions

## Stability

Quick sort is **NOT stable** because partitioning moves elements around without preserving order. If you need stable sort, use merge sort.

## In-Place Sorting

Quick sort sorts in-place, modifying the input array directly. This is space-efficient.

## Comparison with Merge Sort

| Property | Quick Sort | Merge Sort |
|----------|-----------|-----------|
| Best | O(n log n) | O(n log n) |
| Average | O(n log n) | O(n log n) |
| Worst | O(n²) | O(n log n) |
| Space | O(log n) | O(n) |
| Stable | No | Yes |
| Cache | Better | Good |
| Practical | Faster | More predictable |

## When to Use Quick Sort

✓ **Good for**:
- General-purpose sorting (most practical)
- Cache-friendly (better locality)
- In-place sorting needed
- Average O(n log n) acceptable
- Large datasets (with good pivot selection)

✗ **Avoid for**:
- Stable sort required (use merge sort)
- Worst-case O(n²) unacceptable
- Real-time systems (merge sort more predictable)
- When input is adversarially sorted

## Advanced: Using Quick Sort for Selection

Quick sort's partition can find k-th smallest in O(n) average time:

\`\`\`javascript
function findKthSmallest(arr, k) {
  function select(low, high) {
    if (low === high) return arr[low];

    const pivotIndex = partition(arr, low, high);

    if (k === pivotIndex) {
      return arr[k];
    } else if (k < pivotIndex) {
      return select(low, pivotIndex - 1);
    } else {
      return select(pivotIndex + 1, high);
    }
  }

  return select(0, arr.length - 1);
}
\`\`\`

This is O(n) average vs O(n log n) for sorting and selecting.

## Key Insights

1. **Partition is key** - Single operation that creates recursive structure
2. **Pivot selection matters** - Good pivot ensures balanced splits
3. **In-place efficient** - O(log n) space for average case
4. **Unstable but practical** - Most real-world sorting uses quick sort
5. **Selection connection** - Same partition logic solves k-th selection`,
    zh: `# 快速排序 - 分割范式

快速排序是最实用的通用排序算法。它使用分割来分解问题，平均运行时间为O(n log n)，空间为O(log n)。尽管最坏情况为O(n²)，聪明的枢轴选择使这种情况很少见。

## 核心思想：分割

关键操作是**分割**：重新排列数组使得：
- 所有元素<= 枢轴在左边
- 枢轴在其最终位置
- 所有元素 > 枢轴在右边

这个单一操作减少问题大小并递归构建排序。

## 基础实现

\`\`\`javascript
function quickSort(arr) {
  return quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    // 分割并获取枢轴索引
    const pivotIndex = partition(arr, low, high);

    // 递归排序左右分割
    quickSortHelper(arr, low, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, high);
  }

  return arr;
}

function partition(arr, low, high) {
  // 选择最右元素作为枢轴
  const pivot = arr[high];
  let i = low - 1;

  // 重新排列：<= 枢轴的元素放左边
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 将枢轴放在最终位置
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
\`\`\`

**分割逻辑**：
- `i`跟踪<= 枢轴和 > 枢轴之间的边界
- 找到<= 枢轴的元素时，交换到左分割
- 最后，将枢轴放在正确位置

## 例子演练

数组：[3, 7, 8, 5, 2, 1, 9, 5, 4], 枢轴 = 4

```
开始：[3, 7, 8, 5, 2, 1, 9, 5, 4]
      i指向第一个元素前的位置

j=0: arr[0]=3 <= 4? 是 → i=0, 交换 → [3, 7, 8, 5, 2, 1, 9, 5, 4]
j=1: arr[1]=7 <= 4? 否 → 跳过
j=2: arr[2]=8 <= 4? 否 → 跳过
j=3: arr[3]=5 <= 4? 否 → 跳过
j=4: arr[4]=2 <= 4? 是 → i=1, 交换 → [3, 2, 8, 5, 7, 1, 9, 5, 4]
j=5: arr[5]=1 <= 4? 是 → i=2, 交换 → [3, 2, 1, 5, 7, 8, 9, 5, 4]
j=6: arr[6]=9 <= 4? 否 → 跳过
j=7: arr[7]=5 <= 4? 否 → 跳过

最终交换：将枢轴放在i+1=3
结果：[3, 2, 1, 4, 7, 8, 9, 5, 5]
      └─ <= 4 ─┘ │ └─ > 4 ──┘
             分割完成！枢轴(4)在正确的最终位置。
```

现在递归排序[3,2,1]和[7,8,9,5,5]

## 枢轴选择策略

**差的枢轴选择**导致O(n²)。**好的枢轴选择**确保O(n log n)。

### 策略1：最后元素（简单，有风险）

\`\`\`javascript
const pivot = arr[high]; // 简单但排序数据时最坏情况
\`\`\`

### 策略2：随机枢轴（更好）

\`\`\`javascript
function partition(arr, low, high) {
  // 选择随机元素并交换到末尾
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];

  const pivot = arr[high];
  // ...分割逻辑的其余部分
}
\`\`\`

随机化避免了任何输入模式的最坏情况。

### 策略3：三数中值（更精细）

\`\`\`javascript
function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);

  if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];

  return mid; // 中间现在是中值
}

function partition(arr, low, high) {
  const pivotIndex = medianOfThree(arr, low, high);
  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

  const pivot = arr[high];
  // ...分割逻辑的其余部分
}
\`\`\`

三数中值甚至在部分排序数据上帮助避免最坏情况。

## 时间复杂度分析

**最优情况：O(n log n)**
- 平衡分割：枢轴总是将数组分成两半
- log n级，每级O(n)工作

**平均情况：O(n log n)**
- 随机分割通常接近平衡
- 期望高度是O(log n)

**最坏情况：O(n²)**
- 不平衡分割：枢轴总是最小/最大
- 线性深度（n级），每级O(n)工作
- 排序数据和差的枢轴选择时发生

**空间复杂度：O(log n)**
- 递归深度（最优/平均情况）
- 最坏情况O(n)带可怕分割

## 稳定性

快速排序**不稳定**，因为分割移动元素而不保持顺序。需要稳定排序时，使用归并排序。

## 原地排序

快速排序原地排序，直接修改输入数组。这是空间高效的。

## 与归并排序的比较

| 属性 | 快速排序 | 归并排序 |
|------|---------|---------|
| 最优 | O(n log n) | O(n log n) |
| 平均 | O(n log n) | O(n log n) |
| 最坏 | O(n²) | O(n log n) |
| 空间 | O(log n) | O(n) |
| 稳定 | 否 | 是 |
| 缓存 | 更好 | 好 |
| 实用 | 更快 | 更可预测 |

## 何时使用快速排序

✓ **适用于**：
- 通用排序（最实用）
- 缓存友好（更好的位置性）
- 需要原地排序
- 平均O(n log n)可接受
- 大数据集（带好的枢轴选择）

✗ **避免用于**：
- 需要稳定排序（使用归并排序）
- 最坏情况O(n²)不可接受
- 实时系统（归并排序更可预测）
- 输入被对抗性排序

## 高级：使用快速排序用于选择

快速排序的分割可在O(n)平均时间内找到第k小：

\`\`\`javascript
function findKthSmallest(arr, k) {
  function select(low, high) {
    if (low === high) return arr[low];

    const pivotIndex = partition(arr, low, high);

    if (k === pivotIndex) {
      return arr[k];
    } else if (k < pivotIndex) {
      return select(low, pivotIndex - 1);
    } else {
      return select(pivotIndex + 1, high);
    }
  }

  return select(0, arr.length - 1);
}
\`\`\`

这是O(n)平均对比排序和选择的O(n log n)。

## 关键洞察

1. **分割是关键** - 单一操作创建递归结构
2. **枢轴选择重要** - 好的枢轴确保平衡分割
3. **原地高效** - 平均情况O(log n)空间
4. **不稳定但实用** - 大多数实际排序使用快速排序
5. **选择连接** - 相同分割逻辑解决第k选择`
  },
  leetcode: [
    { id: 912, title: 'Sort an Array', titleZh: '排序数组', difficulty: 'Medium' },
    { id: 215, title: 'Kth Largest Element in an Array', titleZh: '数组中的第K个最大元素', difficulty: 'Medium' }
  ]
};
