import { TopicContent } from '../types'

export const binarySearch: TopicContent = {
  id: 'arrays-binary-search',
  title: {
    en: 'Binary Search Mastery',
    zh: '二分查找精通',
  },
  description: {
    en: 'Master binary search not just for sorted arrays, but for any well-defined search space. Three template variants for different problem types.',
    zh: '不仅掌握排序数组的二分查找，还要掌握任何定义清晰的搜索空间。三个不同问题类型的模板变体。',
  },
  timeEstimate: '80-100 minutes',
  contentType: 'all',
  hasVisualizer: false,
  content: {
    en: `## The Key Insight: Define Your Search Space

Binary search isn't just for finding exact values in sorted arrays. The **real power** comes from clearly defining a search space where the answer exists, and the property is monotonic.

### Monotonic Property

A search space has monotonic property if:
\`\`\`
Search space divided into two parts:
[Invalid ... Invalid | Valid ... Valid]
                    ↑
              Answer is here
\`\`\`

Examples:
- Sorted array: [elements < target | elements >= target]
- Capacity problems: [capacity too small | capacity sufficient]
- Time problems: [time too early | time sufficient]

## Template 1: Find Exact Match

Use when looking for a specific value in sorted array.

\`\`\`javascript
function binarySearchExact(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;  // Found!
    } else if (arr[mid] < target) {
      left = mid + 1;  // Target is to the right
    } else {
      right = mid - 1;  // Target is to the left
    }
  }

  return -1;  // Not found
  // Time: O(log n), Space: O(1)
}
\`\`\`

**Key**: Use \`left <= right\` because we want to check all elements that might be target.

## Template 2: Find Left Boundary

Use when you need the **first position** where condition is true.

\`\`\`javascript
function binarySearchLeftBound(arr, target) {
  let left = 0;
  let right = arr.length;  // Note: right = length, not length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      // arr[mid] doesn't satisfy condition
      left = mid + 1;
    } else {
      // arr[mid] might be answer, keep searching left
      right = mid;
    }
  }

  // left is now the leftmost position where arr[left] >= target
  return left;
  // Time: O(log n), Space: O(1)
}

// Example: Find first position of 5
// arr = [1, 3, 5, 5, 5, 7]
// left=0, right=6
// mid=3, arr[3]=5, not < 5, so right=3
// mid=1, arr[1]=3, < 5, so left=2
// mid=2, arr[2]=5, not < 5, so right=2
// left=right=2, exit
// Result: position 2 (first 5)
\`\`\`

**Key**: Use \`left < right\` (not <=) and move \`right = mid\` (not mid-1) to preserve boundary.

## Template 3: Find Right Boundary

Use when you need the **last position** where condition is true.

\`\`\`javascript
function binarySearchRightBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      // arr[mid] might be answer, keep searching right
      left = mid + 1;
    } else {
      // arr[mid] is beyond target
      right = mid;
    }
  }

  // left-1 is now the rightmost position where arr[left-1] <= target
  return left - 1;
  // Time: O(log n), Space: O(1)
}

// Example: Find last position of 5
// arr = [1, 3, 5, 5, 5, 7]
// left=0, right=6
// mid=3, arr[3]=5, <= 5, so left=4
// mid=5, arr[5]=7, > 5, so right=5
// mid=4, arr[4]=5, <= 5, so left=5
// left=right=5, exit
// Result: left-1=4 (last 5)
\`\`\`

**Key**: Use \`arr[mid] <= target\` and move \`left = mid + 1\` to find rightmost.

## Example: Find First and Last Position

\`\`\`javascript
function searchRange(arr, target) {
  if (arr.length === 0) return [-1, -1];

  // Find first position
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const firstPos = left;
  if (firstPos === arr.length || arr[firstPos] !== target) {
    return [-1, -1];  // Not found
  }

  // Find last position
  left = 0;
  right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const lastPos = left - 1;

  return [firstPos, lastPos];
  // Time: O(log n), Space: O(1)
}

// Example: arr = [5,7,7,8,8,10], target = 8
// First pass finds leftmost 8 at index 3
// Second pass finds rightmost 8 at index 4
// Result: [3, 4]
\`\`\`

## Example: Search in Rotated Sorted Array

\`\`\`javascript
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    // Determine which side is sorted
    if (arr[left] <= arr[mid]) {
      // Left half is sorted
      if (arr[left] <= target && target < arr[mid]) {
        // Target is in sorted left half
        right = mid - 1;
      } else {
        // Target is in right half (may be unsorted)
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (arr[mid] < target && target <= arr[right]) {
        // Target is in sorted right half
        left = mid + 1;
      } else {
        // Target is in left half (may be unsorted)
        right = mid - 1;
      }
    }
  }

  return -1;
  // Time: O(log n), Space: O(1)
}

// Example: [4,5,6,7,0,1,2], target=0
// left=0, right=6, mid=3, arr[3]=7
// Left [4,5,6,7] is sorted, target 0 not in range, so left=4
// left=4, right=6, mid=5, arr[5]=1
// Right [1,2] is sorted, target 0 not in range, so right=4
// left=4, right=4, mid=4, arr[4]=0 == target
// Result: 4
\`\`\`

## Common Patterns

| Problem Type | Search Space | Template |
|---|---|---|
| Find exact value | Sorted array | Template 1 |
| Find first >= target | Sorted array | Template 2 |
| Find last <= target | Sorted array | Template 3 |
| Find peak element | Mountain array | Find boundary |
| Capacity problem | [too small \| sufficient] | Find boundary |
| Time-based problem | [not ready \| ready] | Find boundary |

## Why Three Templates?

Each template corresponds to a different boundary scenario:
- **Exact match**: Condition is \`==\`
- **Left bound**: Condition is \`>=\` (first element satisfying)
- **Right bound**: Condition is \`<=\` (last element satisfying)

The subtle differences ensure correctness at the boundary.

## Template Comparison

\`\`\`
           | Exact     | Left        | Right
-----------|-----------|-------------|----------
while      | left<=rgt  | left<right  | left<right
right init | len-1      | len         | len
mid test   | ==, <, >   | <           | <=
adjust     | mid±1      | mid, mid+1  | mid+1, mid
return     | mid/-1     | left        | left-1
\`\`\`

The consistency across templates makes them easy to remember and implement correctly.`,

    zh: `## 关键洞察：定义搜索空间

二分查找不仅仅是在排序数组中查找精确值。**真正的力量**来自于清楚地定义一个存在答案的搜索空间，且具有单调性。

### 单调性属性

搜索空间具有单调性当：
\`\`\`
搜索空间分为两部分：
[无效 ... 无效 | 有效 ... 有效]
              ↑
            答案在这里
\`\`\`

例子：
- 排序数组：[元素 < 目标 | 元素 >= 目标]
- 容量问题：[容量不足 | 容量充足]
- 时间问题：[时间太早 | 时间充足]

## 模板1：精确查找

当在排序数组中查找特定值时使用。

\`\`\`javascript
function binarySearchExact(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;  // 找到！
    } else if (arr[mid] < target) {
      left = mid + 1;  // 目标在右边
    } else {
      right = mid - 1;  // 目标在左边
    }
  }

  return -1;  // 未找到
  // 时间：O(log n)，空间：O(1)
}
\`\`\`

**关键**：使用 \`left <= right\` 因为我们想检查所有可能是目标的元素。

## 模板2：找左边界

当你需要**第一个位置**满足条件时使用。

\`\`\`javascript
function binarySearchLeftBound(arr, target) {
  let left = 0;
  let right = arr.length;  // 注意：right = 长度，不是长度-1

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      // arr[mid]不满足条件
      left = mid + 1;
    } else {
      // arr[mid]可能是答案，继续搜索左侧
      right = mid;
    }
  }

  // left现在是arr[left] >= target的最左位置
  return left;
  // 时间：O(log n)，空间：O(1)
}

// 例子：找5的第一个位置
// arr = [1, 3, 5, 5, 5, 7]
// left=0, right=6
// mid=3, arr[3]=5, 不 < 5，所以 right=3
// mid=1, arr[1]=3, < 5，所以 left=2
// mid=2, arr[2]=5, 不 < 5，所以 right=2
// left=right=2，退出
// 结果：位置2（第一个5）
\`\`\`

**关键**：使用 \`left < right\` （不是<=）并移动 \`right = mid\` （不是mid-1）以保持边界。

## 模板3：找右边界

当你需要**最后一个位置**满足条件时使用。

\`\`\`javascript
function binarySearchRightBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      // arr[mid]可能是答案，继续搜索右侧
      left = mid + 1;
    } else {
      // arr[mid]超过目标
      right = mid;
    }
  }

  // left-1现在是arr[left-1] <= target的最右位置
  return left - 1;
  // 时间：O(log n)，空间：O(1)
}

// 例子：找5的最后一个位置
// arr = [1, 3, 5, 5, 5, 7]
// left=0, right=6
// mid=3, arr[3]=5, <= 5，所以 left=4
// mid=5, arr[5]=7, > 5，所以 right=5
// mid=4, arr[4]=5, <= 5，所以 left=5
// left=right=5，退出
// 结果：left-1=4（最后一个5）
\`\`\`

**关键**：使用 \`arr[mid] <= target\` 并移动 \`left = mid + 1\` 以找到最右侧。

## 例子：找第一个和最后一个位置

\`\`\`javascript
function searchRange(arr, target) {
  if (arr.length === 0) return [-1, -1];

  // 找第一个位置
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const firstPos = left;
  if (firstPos === arr.length || arr[firstPos] !== target) {
    return [-1, -1];  // 未找到
  }

  // 找最后一个位置
  left = 0;
  right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const lastPos = left - 1;

  return [firstPos, lastPos];
  // 时间：O(log n)，空间：O(1)
}

// 例子：arr = [5,7,7,8,8,10], target = 8
// 第一次遍历找到最左侧的8在索引3
// 第二次遍历找到最右侧的8在索引4
// 结果：[3, 4]
\`\`\`

## 例子：旋转排序数组中的搜索

\`\`\`javascript
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    // 确定哪一侧是有序的
    if (arr[left] <= arr[mid]) {
      // 左半部分有序
      if (arr[left] <= target && target < arr[mid]) {
        // 目标在有序左半部分
        right = mid - 1;
      } else {
        // 目标在右半部分（可能无序）
        left = mid + 1;
      }
    } else {
      // 右半部分有序
      if (arr[mid] < target && target <= arr[right]) {
        // 目标在有序右半部分
        left = mid + 1;
      } else {
        // 目标在左半部分（可能无序）
        right = mid - 1;
      }
    }
  }

  return -1;
  // 时间：O(log n)，空间：O(1)
}

// 例子：[4,5,6,7,0,1,2], target=0
// left=0, right=6, mid=3, arr[3]=7
// 左侧[4,5,6,7]有序，目标0不在范围内，所以left=4
// left=4, right=6, mid=5, arr[5]=1
// 右侧[1,2]有序，目标0不在范围内，所以right=4
// left=4, right=4, mid=4, arr[4]=0 == target
// 结果：4
\`\`\`

## 常见模式

| 问题类型 | 搜索空间 | 模板 |
|---|---|---|
| 找精确值 | 排序数组 | 模板1 |
| 找第一个 >= 目标 | 排序数组 | 模板2 |
| 找最后一个 <= 目标 | 排序数组 | 模板3 |
| 找峰值元素 | 山型数组 | 找边界 |
| 容量问题 | [不足\|充足] | 找边界 |
| 时间问题 | [未准备\|准备好] | 找边界 |

## 为什么有三个模板？

每个模板对应不同的边界场景：
- **精确匹配**：条件是 \`==\`
- **左边界**：条件是 \`>=\` （首个满足的元素）
- **右边界**：条件是 \`<=\` （最后一个满足的元素）

细微的差异确保了边界处的正确性。

## 模板比较

\`\`\`
           | 精确      | 左边界      | 右边界
-----------|-----------|-------------|----------
while      | left<=rgt  | left<right  | left<right
right初始  | len-1      | len         | len
mid测试    | ==, <, >   | <           | <=
调整       | mid±1      | mid, mid+1  | mid+1, mid
返回       | mid/-1     | left        | left-1
\`\`\`

模板间的一致性使其易于记忆和正确实现。`,
  },
  leetcode: [
    {
      id: 704,
      title: 'Binary Search',
      titleZh: '二分查找',
      difficulty: 'Easy',
    },
    {
      id: 34,
      title: 'Find First and Last Position of Element in Sorted Array',
      titleZh: '在排序数组中查找元素的第一个和最后一个位置',
      difficulty: 'Medium',
    },
    {
      id: 33,
      title: 'Search in Rotated Sorted Array',
      titleZh: '搜索旋转排序数组',
      difficulty: 'Medium',
    },
    {
      id: 162,
      title: 'Find Peak Element',
      titleZh: '寻找峰值',
      difficulty: 'Medium',
    },
  ],
}
