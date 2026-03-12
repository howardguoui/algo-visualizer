import { TopicContent } from '../types'

export const twoPointers: TopicContent = {
  id: 'arrays-two-pointers',
  title: {
    en: 'Two Pointer Technique',
    zh: '双指针技术',
  },
  description: {
    en: 'Master left-right and fast-slow pointer patterns that solve array problems in linear time with constant space',
    zh: '掌握左右指针和快慢指针模式，用线性时间和常数空间解决数组问题',
  },
  timeEstimate: '60-80 minutes',
  contentType: 'all',
  hasVisualizer: false,
  content: {
    en: `## The Two Pointer Pattern

Two pointers solve problems by maintaining two positions in an array. Instead of nested loops (O(n²)), we move pointers strategically (O(n)).

### When to Use Two Pointers

1. **Array is sorted** - allows directional movement
2. **Looking for pairs/triplets** - two pointers converge
3. **Need to remove/partition elements** - fast/slow separation
4. **Reverse operations** - left/right converge from ends

## Template 1: Left-Right Pointers (Converging)

Use when problem has **two ends** with directional properties.

\`\`\`javascript
function twoPointerConverging(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Process based on condition
    if (condition(arr[left], arr[right])) {
      // Move based on problem requirements
      left++;
    } else {
      right--;
    }
  }

  return result;
}
\`\`\`

### Example: Valid Palindrome

\`\`\`javascript
function isPalindrome(s) {
  let left = 0, right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric
    if (!isAlphaNum(s[left])) {
      left++;
      continue;
    }
    if (!isAlphaNum(s[right])) {
      right--;
      continue;
    }

    // Compare characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;  // Time: O(n), Space: O(1)
}
\`\`\`

### Example: Container With Most Water

Find two lines that maximize area.

\`\`\`javascript
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // Current area = width × min height
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    maxArea = Math.max(maxArea, area);

    // Move the pointer at smaller height
    // (moving taller side won't help - limited by height)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;  // Time: O(n), Space: O(1)
}
\`\`\`

## Template 2: Fast-Slow Pointers (Separation)

Use when you need to **remove/partition elements** in place.

\`\`\`javascript
function twoPointerSeparation(arr) {
  let slow = 0;  // Boundary of "valid" region

  for (let fast = 0; fast < arr.length; fast++) {
    // When fast pointer finds valid element
    if (isValid(arr[fast])) {
      arr[slow] = arr[fast];
      slow++;
    }
  }

  return slow;  // Length of result
}
\`\`\`

### Example: Remove Duplicates

\`\`\`javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let slow = 0;  // Points to last unique element

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return slow + 1;  // Time: O(n), Space: O(1)
}

// Example: [1,1,1,2,2,3]
// slow: 0, fast: 1 → arr[1]=1, same as arr[0], continue
// slow: 0, fast: 2 → arr[2]=1, same as arr[0], continue
// slow: 0, fast: 3 → arr[3]=2, diff from arr[0], slow→1, arr[1]=2
// slow: 1, fast: 4 → arr[4]=2, same as arr[1], continue
// slow: 1, fast: 5 → arr[5]=3, diff from arr[1], slow→2, arr[2]=3
// Result: [1,2,3], length=3
\`\`\`

## Template 3: Reverse Array (Left-Right)

\`\`\`javascript
function reverseArray(arr) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
\`\`\`

## Advanced: 3Sum Problem

Combine two pointers with outer loop for triplets.

\`\`\`javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);  // Sort first
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Two pointer for remaining array
    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;  // Time: O(n²), Space: O(1) (excluding output)
}
\`\`\`

## Key Insights

1. **Two pointers reduce nested loops** - Convert O(n²) problems to O(n)
2. **Direction matters** - Converge for pairs, separate for in-place operations
3. **Sorted arrays enable directional movement** - Smaller sum → move left pointer, larger → move right
4. **Fast-slow maintains relative order** - Essential for in-place modifications`,

    zh: `## 双指针模式

双指针通过维护数组中的两个位置来解决问题。与嵌套循环O(n²)相比，战略性地移动指针可以实现O(n)。

### 何时使用双指针

1. **数组已排序** - 允许定向移动
2. **寻找对/三元组** - 两个指针相向收敛
3. **需要删除/分割元素** - 快慢指针分离
4. **反转操作** - 左右指针从两端相向收敛

## 模板1：左右指针（相向）

当问题有**两个端点**且具有方向特性时使用。

\`\`\`javascript
function twoPointerConverging(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 基于条件处理
    if (condition(arr[left], arr[right])) {
      // 根据问题要求移动
      left++;
    } else {
      right--;
    }
  }

  return result;
}
\`\`\`

### 例子：验证回文

\`\`\`javascript
function isPalindrome(s) {
  let left = 0, right = s.length - 1;

  while (left < right) {
    // 跳过非字母数字
    if (!isAlphaNum(s[left])) {
      left++;
      continue;
    }
    if (!isAlphaNum(s[right])) {
      right--;
      continue;
    }

    // 比较字符（不区分大小写）
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;  // 时间：O(n)，空间：O(1)
}
\`\`\`

### 例子：盛最多水的容器

找两条线使面积最大。

\`\`\`javascript
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // 当前面积 = 宽度 × 最小高度
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    maxArea = Math.max(maxArea, area);

    // 移动较小高度的指针
    // （移动较高的一侧不会帮助 - 受限于高度）
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;  // 时间：O(n)，空间：O(1)
}
\`\`\`

## 模板2：快慢指针（分离）

当需要**原地删除/分割元素**时使用。

\`\`\`javascript
function twoPointerSeparation(arr) {
  let slow = 0;  // "有效"区域的边界

  for (let fast = 0; fast < arr.length; fast++) {
    // 当快指针找到有效元素
    if (isValid(arr[fast])) {
      arr[slow] = arr[fast];
      slow++;
    }
  }

  return slow;  // 结果长度
}
\`\`\`

### 例子：移除重复项

\`\`\`javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let slow = 0;  // 指向最后一个唯一元素

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return slow + 1;  // 时间：O(n)，空间：O(1)
}

// 例子：[1,1,1,2,2,3]
// slow: 0, fast: 1 → arr[1]=1，与arr[0]相同，继续
// slow: 0, fast: 2 → arr[2]=1，与arr[0]相同，继续
// slow: 0, fast: 3 → arr[3]=2，与arr[0]不同，slow→1，arr[1]=2
// slow: 1, fast: 4 → arr[4]=2，与arr[1]相同，继续
// slow: 1, fast: 5 → arr[5]=3，与arr[1]不同，slow→2，arr[2]=3
// 结果：[1,2,3]，长度=3
\`\`\`

## 模板3：反转数组（左右）

\`\`\`javascript
function reverseArray(arr) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    // 交换元素
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
\`\`\`

## 进阶：3Sum问题

结合双指针和外层循环解决三元组。

\`\`\`javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);  // 先排序
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // 跳过重复
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 对剩余数组使用双指针
    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        // 跳过重复
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;  // 时间：O(n²)，空间：O(1)（不包括输出）
}
\`\`\`

## 关键洞察

1. **双指针减少嵌套循环** - 将O(n²)问题转为O(n)
2. **方向很重要** - 相向收敛找对，分离做原地修改
3. **有序数组启用定向移动** - 较小的和→移动左指针，较大→移动右指针
4. **快慢指针保持相对顺序** - 对原地修改至关重要`,
  },
  leetcode: [
    {
      id: 125,
      title: 'Valid Palindrome',
      titleZh: '验证回文字符串',
      difficulty: 'Easy',
    },
    {
      id: 167,
      title: 'Two Sum II - Input Array Is Sorted',
      titleZh: '两数之和 II - 输入有序数组',
      difficulty: 'Medium',
    },
    {
      id: 11,
      title: 'Container With Most Water',
      titleZh: '盛最多水的容器',
      difficulty: 'Medium',
    },
    {
      id: 15,
      title: '3Sum',
      titleZh: '三数之和',
      difficulty: 'Medium',
    },
  ],
}
