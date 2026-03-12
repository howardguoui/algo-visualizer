import { TopicContent } from '../types'

export const slidingWindow: TopicContent = {
  id: 'arrays-sliding-window',
  title: {
    en: 'Sliding Window Technique',
    zh: '滑动窗口技术',
  },
  description: {
    en: 'Solve substring and subarray problems by maintaining a dynamic window that slides through the data',
    zh: '通过维护在数据中滑动的动态窗口来解决子字符串和子数组问题',
  },
  timeEstimate: '70-90 minutes',
  contentType: 'all',
  hasVisualizer: false,
  content: {
    en: `## What is Sliding Window?

Sliding window is a technique that **maintains a contiguous window** that slides through an array/string. Instead of checking all subarrays (O(n²)), we expand and contract the window intelligently (O(n)).

### Core Insight

A window is defined by two pointers:
- **left pointer**: Start of window
- **right pointer**: End of window
- **Invariant**: Window contains elements we're currently examining

### Two Types

1. **Fixed-Size Window**: Window size is constant (e.g., find max of every k consecutive elements)
2. **Variable-Size Window**: Window size changes based on condition (e.g., find longest substring without repeating)

## Template: Fixed-Size Window

\`\`\`javascript
function slidingWindowFixed(arr, k) {
  let windowSum = 0;

  // Build first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    // Remove leftmost element, add new rightmost element
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;  // Time: O(n), Space: O(1)
}

// Example: [1,3,2,6,-1,4,1,8], k=3
// Window [1,3,2] → sum=6
// Window [3,2,6] → sum=11 (remove 1, add 6)
// Window [2,6,-1] → sum=7 (remove 3, add -1)
// etc...
\`\`\`

## Template: Variable-Size Window

\`\`\`javascript
function slidingWindowVariable(s) {
  let left = 0;
  let windowState = new Map();  // Track window content
  let result = '';

  for (let right = 0; right < s.length; right++) {
    // Add new element to window
    const rightChar = s[right];
    windowState.set(rightChar, (windowState.get(rightChar) || 0) + 1);

    // Shrink window while invalid
    while (isInvalid(windowState)) {
      const leftChar = s[left];
      windowState.set(leftChar, windowState.get(leftChar) - 1);
      if (windowState.get(leftChar) === 0) {
        windowState.delete(leftChar);
      }
      left++;
    }

    // Update result when valid
    if (isValid(windowState)) {
      result = updateResult(result, s.substring(left, right + 1));
    }
  }

  return result;  // Time: O(n), Space: O(k) where k is charset size
}
\`\`\`

## Example: Longest Substring Without Repeating

Find the longest substring with no duplicate characters.

\`\`\`javascript
function lengthOfLongestSubstring(s) {
  let left = 0;
  let charIndex = new Map();  // char → most recent index
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];

    // If char already in window, move left past it
    if (charIndex.has(rightChar) && charIndex.get(rightChar) >= left) {
      left = charIndex.get(rightChar) + 1;
    }

    // Update character's latest position
    charIndex.set(rightChar, right);

    // Current window is valid
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;  // Time: O(n), Space: O(min(n, charset))
}

// Example: "abcabcbb"
// right=0, s[0]='a' → charIndex={a:0}, window="a", maxLen=1
// right=1, s[1]='b' → charIndex={a:0,b:1}, window="ab", maxLen=2
// right=2, s[2]='c' → charIndex={a:0,b:1,c:2}, window="abc", maxLen=3
// right=3, s[3]='a' → duplicate! left=charIndex['a']+1=1
//   charIndex={a:3,b:1,c:2}, window="bca", maxLen=3
// right=4, s[4]='b' → duplicate! left=charIndex['b']+1=2
//   charIndex={a:3,b:4,c:2}, window="cab", maxLen=3
// right=5, s[5]='c' → duplicate! left=charIndex['c']+1=3
//   charIndex={a:3,b:4,c:5}, window="abc", maxLen=3
// right=6, s[6]='b' → duplicate! left=charIndex['b']+1=5
//   charIndex={a:3,b:6,c:5}, window="cb", maxLen=3
// right=7, s[7]='b' → duplicate! left=charIndex['b']+1=7
//   charIndex={a:3,b:7,c:5}, window="b", maxLen=3
// Result: 3
\`\`\`

## Example: Minimum Window Substring

Find shortest substring containing all characters from target.

\`\`\`javascript
function minWindow(s, t) {
  if (t.length > s.length) return '';

  // Count characters in target
  const targetCount = new Map();
  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) || 0) + 1);
  }

  let required = targetCount.size;  // Unique chars in target
  let formed = 0;  // Unique chars in window with desired frequency

  const windowCount = new Map();
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);

    // If frequency matches target, mark as formed
    if (targetCount.has(rightChar) &&
        windowCount.get(rightChar) === targetCount.get(rightChar)) {
      formed++;
    }

    // Try to shrink window
    while (left <= right && formed === required) {
      // Update result if smaller
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      // Remove left character
      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar) - 1);
      if (targetCount.has(leftChar) &&
          windowCount.get(leftChar) < targetCount.get(leftChar)) {
        formed--;
      }

      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
  // Time: O(|s| + |t|), Space: O(|t|)
}
\`\`\`

## Key Patterns to Recognize

| Problem Pattern | Approach |
|---|---|
| "Find longest/shortest substring" | Variable-size window |
| "Find all substrings with property" | Variable-size window with HashMap |
| "Consecutive elements sum" | Fixed-size window |
| "Duplicate in window" | Variable-size + HashMap |
| "k distinct characters" | Variable-size + HashMap |

## Algorithm Skeleton

\`\`\`
1. Initialize: left = 0, window_state = {}
2. Expand: for right in range(len(s)):
     - Add s[right] to window_state
     - While window is invalid:
       - Remove s[left] from window_state
       - Move left++
     - Update answer (if valid)
3. Return answer
\`\`\`

## Why Sliding Window Works

- **No recomputation**: Once left moves, we never revisit that position
- **Single pass**: Each element is processed twice (added, removed) at most
- **Optimal substructure**: Validity doesn't depend on elements outside window

This is why both fixed and variable window achieve **O(n) time complexity** despite examining multiple subarrays.`,

    zh: `## 什么是滑动窗口？

滑动窗口是一种技术，**维护一个连续窗口**在数组/字符串中滑动。与检查所有子数组O(n²)相比，我们智能地展开和收缩窗口可以达到O(n)。

### 核心洞察

窗口由两个指针定义：
- **左指针**：窗口起始
- **右指针**：窗口结束
- **不变式**：窗口包含我们当前检查的元素

### 两种类型

1. **固定大小窗口**：窗口大小不变（如找每k个连续元素的最大值）
2. **可变大小窗口**：窗口大小根据条件改变（如找最长无重复字符的子字符串）

## 模板：固定大小窗口

\`\`\`javascript
function slidingWindowFixed(arr, k) {
  let windowSum = 0;

  // 构建第一个窗口
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // 滑动窗口
  for (let i = k; i < arr.length; i++) {
    // 移除最左元素，添加新的最右元素
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;  // 时间：O(n)，空间：O(1)
}

// 例子：[1,3,2,6,-1,4,1,8], k=3
// 窗口 [1,3,2] → 和=6
// 窗口 [3,2,6] → 和=11 (移除1，添加6)
// 窗口 [2,6,-1] → 和=7 (移除3，添加-1)
// 等等...
\`\`\`

## 模板：可变大小窗口

\`\`\`javascript
function slidingWindowVariable(s) {
  let left = 0;
  let windowState = new Map();  // 跟踪窗口内容
  let result = '';

  for (let right = 0; right < s.length; right++) {
    // 添加新元素到窗口
    const rightChar = s[right];
    windowState.set(rightChar, (windowState.get(rightChar) || 0) + 1);

    // 当无效时收缩窗口
    while (isInvalid(windowState)) {
      const leftChar = s[left];
      windowState.set(leftChar, windowState.get(leftChar) - 1);
      if (windowState.get(leftChar) === 0) {
        windowState.delete(leftChar);
      }
      left++;
    }

    // 当有效时更新结果
    if (isValid(windowState)) {
      result = updateResult(result, s.substring(left, right + 1));
    }
  }

  return result;  // 时间：O(n)，空间：O(k)，k是字符集大小
}
\`\`\`

## 例子：最长无重复字符的子字符串

找最长的不包含重复字符的子字符串。

\`\`\`javascript
function lengthOfLongestSubstring(s) {
  let left = 0;
  let charIndex = new Map();  // 字符 → 最近索引
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];

    // 如果字符已在窗口中，移动left越过它
    if (charIndex.has(rightChar) && charIndex.get(rightChar) >= left) {
      left = charIndex.get(rightChar) + 1;
    }

    // 更新字符的最新位置
    charIndex.set(rightChar, right);

    // 当前窗口有效
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;  // 时间：O(n)，空间：O(min(n, 字符集))
}

// 例子："abcabcbb"
// right=0, s[0]='a' → charIndex={a:0}, 窗口="a", maxLen=1
// right=1, s[1]='b' → charIndex={a:0,b:1}, 窗口="ab", maxLen=2
// right=2, s[2]='c' → charIndex={a:0,b:1,c:2}, 窗口="abc", maxLen=3
// right=3, s[3]='a' → 重复！left=charIndex['a']+1=1
//   charIndex={a:3,b:1,c:2}, 窗口="bca", maxLen=3
// ... （继续过程类似）
// 结果：3
\`\`\`

## 例子：最小窗口子字符串

找包含目标中所有字符的最短子字符串。

\`\`\`javascript
function minWindow(s, t) {
  if (t.length > s.length) return '';

  // 计算目标中的字符
  const targetCount = new Map();
  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) || 0) + 1);
  }

  let required = targetCount.size;  // 目标中的唯一字符数
  let formed = 0;  // 窗口中具有所需频率的唯一字符数

  const windowCount = new Map();
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);

    // 如果频率匹配目标，标记为formed
    if (targetCount.has(rightChar) &&
        windowCount.get(rightChar) === targetCount.get(rightChar)) {
      formed++;
    }

    // 尝试收缩窗口
    while (left <= right && formed === required) {
      // 如果更小，更新结果
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      // 移除左边字符
      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar) - 1);
      if (targetCount.has(leftChar) &&
          windowCount.get(leftChar) < targetCount.get(leftChar)) {
        formed--;
      }

      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
  // 时间：O(|s| + |t|)，空间：O(|t|)
}
\`\`\`

## 关键模式识别

| 问题模式 | 方法 |
|---|---|
| "找最长/最短子字符串" | 可变大小窗口 |
| "找所有具有性质的子字符串" | 可变大小窗口+哈希表 |
| "连续元素和" | 固定大小窗口 |
| "窗口中重复" | 可变大小+哈希表 |
| "k个不同字符" | 可变大小+哈希表 |

## 算法框架

\`\`\`
1. 初始化：left = 0，window_state = {}
2. 展开：for right in range(len(s)):
     - 添加s[right]到window_state
     - While 窗口无效：
       - 从window_state移除s[left]
       - left++
     - 更新答案（如果有效）
3. 返回答案
\`\`\`

## 滑动窗口为什么有效

- **无重复计算**：一旦left移动，我们永远不会再访问该位置
- **单次遍历**：每个元素最多处理两次（添加、移除）
- **最优子结构**：有效性不依赖窗口外的元素

这就是为什么固定和可变窗口都能达到 **O(n)时间复杂度** 尽管检查多个子数组。`,
  },
  leetcode: [
    {
      id: 76,
      title: 'Minimum Window Substring',
      titleZh: '最小窗口子字符串',
      difficulty: 'Hard',
    },
    {
      id: 567,
      title: 'Permutation in String',
      titleZh: '字符串的排列',
      difficulty: 'Medium',
    },
    {
      id: 3,
      title: 'Longest Substring Without Repeating Characters',
      titleZh: '无重复字符的最长子字符串',
      difficulty: 'Medium',
    },
    {
      id: 438,
      title: 'Find All Anagrams in a String',
      titleZh: '找到字符串中所有字母异位词',
      difficulty: 'Medium',
    },
  ],
}
