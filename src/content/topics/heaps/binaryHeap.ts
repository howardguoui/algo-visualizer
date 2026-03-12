import { TopicContent } from '../../types';

export const binaryHeapContent: TopicContent = {
  id: 'heaps-binary-heap',
  title: {
    en: 'Binary Heap and Priority Queue',
    zh: '二叉堆与优先级队列'
  },
  description: {
    en: 'Master heap operations and priority queues for Top-K problems and efficient selection',
    zh: '掌握堆操作和优先级队列，用于Top-K问题和高效选择'
  },
  timeEstimate: '50 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Binary Heap and Priority Queue

A binary heap is a complete binary tree where each node is either greater than or equal to (max-heap) or less than or equal to (min-heap) its children. This structure enables O(log n) insertion and extraction while maintaining sorted order.

## Heap Properties

**Complete Binary Tree**: All levels are fully filled except possibly the last, which is filled left to right.

**Heap Property**:
- **Max-Heap**: Parent >= Children (largest element at root)
- **Min-Heap**: Parent <= Children (smallest element at root)

**Array Representation**:
- Root at index 0
- Left child of index i at index 2i + 1
- Right child of index i at index 2i + 2
- Parent of index i at index floor((i - 1) / 2)

## Core Heap Operations

### Insertion (Heapify Up)

Insert at the end, then bubble up to restore heap property:

\`\`\`javascript
function insert(heap, value) {
  heap.push(value);
  let idx = heap.length - 1;

  // Bubble up: compare with parent and swap if needed
  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (heap[idx] > heap[parentIdx]) {
      // Swap with parent (for max-heap)
      [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
      idx = parentIdx;
    } else {
      break;
    }
  }
}
\`\`\`

**Time Complexity**: O(log n) - at most heap height swaps

### Extraction (Heapify Down)

Remove root, move last element to root, then bubble down:

\`\`\`javascript
function extractMax(heap) {
  if (heap.length === 0) return null;

  const max = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();

  let idx = 0;
  // Bubble down: swap with larger child
  while (true) {
    let largest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < heap.length && heap[left] > heap[largest]) {
      largest = left;
    }
    if (right < heap.length && heap[right] > heap[largest]) {
      largest = right;
    }

    if (largest !== idx) {
      [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
      idx = largest;
    } else {
      break;
    }
  }

  return max;
}
\`\`\`

**Time Complexity**: O(log n) - at most heap height swaps

### Heapify (Build Heap)

Convert array into heap in O(n) time:

\`\`\`javascript
function buildHeap(arr) {
  // Start from last non-leaf node and heapify down
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, i);
  }
  return arr;
}
\`\`\`

## Priority Queue Implementation

JavaScript doesn't have built-in heaps, so we use array-based heaps:

\`\`\`javascript
class MaxPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return max;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] > this.heap[parentIdx]) {
        [this.heap[idx], this.heap[parentIdx]] =
          [this.heap[parentIdx], this.heap[idx]];
        idx = parentIdx;
      } else break;
    }
  }

  _bubbleDown(idx) {
    while (true) {
      let largest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < this.heap.length &&
          this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < this.heap.length &&
          this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest !== idx) {
        [this.heap[idx], this.heap[largest]] =
          [this.heap[largest], this.heap[idx]];
        idx = largest;
      } else break;
    }
  }
}
\`\`\`

## Top-K Problems Pattern

The heap excels at Top-K problems where you need the k largest (or smallest) elements:

**Strategy for Top-K Largest**:
1. Create a min-heap of size k
2. Iterate through all elements
3. If element > min of heap, remove min and insert element
4. Result: k largest elements remain

**Time**: O(n log k) - better than O(n log n) sorting when k << n

## Key Insights

- **Insert/Extract**: O(log n) operations maintain sorted property
- **Top-K Problems**: Use heap of size k for O(n log k) efficiency
- **Heapify Building**: O(n) linear time construction vs O(n log n) insertions
- **Array Indexing**: Master parent/child index formulas
- **Max vs Min**: Just flip comparison operators`,
    zh: `# 二叉堆与优先级队列

二叉堆是一种完全二叉树，其中每个节点都大于等于（最大堆）或小于等于（最小堆）其子节点。这个结构实现了O(log n)的插入和提取，同时维持排序顺序。

## 堆的特性

**完全二叉树**：除最后一层可能未满外，所有层都完全填充。最后一层从左到右填充。

**堆特性**：
- **最大堆**：父节点 >= 子节点（最大元素在根）
- **最小堆**：父节点 <= 子节点（最小元素在根）

**数组表示**：
- 根在索引0
- 索引i的左子节点在索引2i + 1
- 索引i的右子节点在索引2i + 2
- 索引i的父节点在索引floor((i - 1) / 2)

## 核心堆操作

### 插入（向上调整）

在末尾插入，然后向上冒泡以恢复堆特性：

\`\`\`javascript
function insert(heap, value) {
  heap.push(value);
  let idx = heap.length - 1;

  // 向上冒泡：与父节点比较并交换
  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (heap[idx] > heap[parentIdx]) {
      // 与父节点交换（最大堆）
      [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
      idx = parentIdx;
    } else {
      break;
    }
  }
}
\`\`\`

**时间复杂度**：O(log n) - 最多堆高度次交换

### 提取（向下调整）

移除根，将最后一个元素移到根，然后向下冒泡：

\`\`\`javascript
function extractMax(heap) {
  if (heap.length === 0) return null;

  const max = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();

  let idx = 0;
  // 向下冒泡：与较大的子节点交换
  while (true) {
    let largest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < heap.length && heap[left] > heap[largest]) {
      largest = left;
    }
    if (right < heap.length && heap[right] > heap[largest]) {
      largest = right;
    }

    if (largest !== idx) {
      [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
      idx = largest;
    } else {
      break;
    }
  }

  return max;
}
\`\`\`

**时间复杂度**：O(log n) - 最多堆高度次交换

### 建堆（Heapify）

在O(n)时间内将数组转换为堆：

\`\`\`javascript
function buildHeap(arr) {
  // 从最后一个非叶子节点开始向下调整
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, i);
  }
  return arr;
}
\`\`\`

## 优先级队列实现

JavaScript没有内置堆，所以使用基于数组的堆：

\`\`\`javascript
class MaxPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return max;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] > this.heap[parentIdx]) {
        [this.heap[idx], this.heap[parentIdx]] =
          [this.heap[parentIdx], this.heap[idx]];
        idx = parentIdx;
      } else break;
    }
  }

  _bubbleDown(idx) {
    while (true) {
      let largest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < this.heap.length &&
          this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < this.heap.length &&
          this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest !== idx) {
        [this.heap[idx], this.heap[largest]] =
          [this.heap[largest], this.heap[idx]];
        idx = largest;
      } else break;
    }
  }
}
\`\`\`

## Top-K问题模式

堆擅长于需要k个最大（或最小）元素的Top-K问题：

**Top-K最大元素策略**：
1. 创建大小为k的最小堆
2. 遍历所有元素
3. 如果元素 > 堆的最小值，移除最小值并插入元素
4. 结果：k个最大元素保留

**时间**：O(n log k) - 当k远小于n时优于O(n log n)排序

## 关键洞察

- **插入/提取**：O(log n)操作维持排序特性
- **Top-K问题**：使用大小为k的堆实现O(n log k)效率
- **堆的构建**：O(n)线性时间构建优于O(n log n)逐个插入
- **数组索引**：掌握父子节点索引公式
- **最大堆vs最小堆**：只需反转比较运算符`
  },
  leetcode: [
    { id: 215, title: 'Kth Largest Element in an Array', titleZh: '数组中的第K个最大元素', difficulty: 'Medium' },
    { id: 347, title: 'Top K Frequent Elements', titleZh: '前K个高频元素', difficulty: 'Medium' },
    { id: 23, title: 'Merge k Sorted Lists', titleZh: '合并K个升序链表', difficulty: 'Hard' },
    { id: 295, title: 'Find Median from Data Stream', titleZh: '数据流的中位数', difficulty: 'Hard' }
  ]
};
