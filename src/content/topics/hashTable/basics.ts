import { TopicContent } from '../types'

export const hashTableBasics: TopicContent = {
  id: 'hashtable-basics',
  title: {
    en: 'Hash Table Fundamentals',
    zh: '哈希表基础',
  },
  description: {
    en: 'Master hash table design, collision handling, and patterns for frequency counting, grouping, and two-sum problems',
    zh: '掌握哈希表设计、冲突处理，以及频率计数、分组和两数之和问题的模式',
  },
  timeEstimate: '75-90 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `## Hash Table Basics

A hash table (or hash map) is a **key-value data structure** that provides O(1) average-case lookup by using a hash function to convert keys into array indices.

### Hash Function

\`\`\`javascript
// Simple hash function
function hash(key) {
  let sum = 0;
  for (let i = 0; i < key.length; i++) {
    sum += key.charCodeAt(i);
  }
  return sum % 10;  // Map to index 0-9
}

// Problem: Multiple keys hash to same value (collision)
hash("abc") = 97 + 98 + 99 = 294 % 10 = 4
hash("aaa") = 97 + 97 + 97 = 291 % 10 = 1
hash("jab") = 106 + 97 + 98 = 301 % 10 = 1  // Collision!
\`\`\`

### Collision Handling

#### 1. Chaining
\`\`\`javascript
// Store array of [key, value] pairs at each index
class HashTableChaining {
  constructor(size = 10) {
    this.size = size;
    this.table = Array(size).fill().map(() => []);
  }

  hash(key) {
    let sum = 0;
    for (const char of key) {
      sum += char.charCodeAt(0);
    }
    return sum % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];

    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // Add new pair
    bucket.push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return undefined;
  }

  // Time: O(1) average, O(n) worst (poor hash function)
  // Space: O(n)
}
\`\`\`

#### 2. Open Addressing
\`\`\`javascript
// Find alternative index if collision occurs
class HashTableOpenAddressing {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key) {
    // Linear probing: hash(key, i) = (hash(key) + i) % size
    let sum = 0;
    for (const char of key) {
      sum += char.charCodeAt(0);
    }
    return sum % this.size;
  }

  set(key, value) {
    let index = this.hash(key);

    // Linear probing: keep incrementing until empty slot
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined) {
      i++;
    }

    this.table[(index + i) % this.size] = [key, value];
  }

  get(key) {
    let index = this.hash(key);

    // Linear probing: keep searching
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined) {
      if (this.table[(index + i) % this.size][0] === key) {
        return this.table[(index + i) % this.size][1];
      }
      i++;
    }

    return undefined;
  }
}
\`\`\`

### Native Hash Table (Use This!)

In practice, use built-in hash tables:

\`\`\`javascript
// Map in JavaScript (similar to HashMap in Java)
const map = new Map();
map.set('key', 'value');
map.get('key');  // 'value'
map.has('key');  // true
map.delete('key');
map.size;  // number of entries

// Object (works for string keys)
const obj = {};
obj['key'] = 'value';
obj['key'];  // 'value'
delete obj['key'];
\`\`\`

## Pattern 1: Two Sum

Find two numbers that sum to target.

\`\`\`javascript
function twoSum(arr, target) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(arr[i], i);
  }

  return [];
  // Time: O(n), Space: O(n)
}

// Example: arr = [2, 7, 11, 15], target = 9
// i=0: arr[0]=2, complement=9-2=7
//      7 not in seen, add 2→0 to seen
//      seen: {2: 0}
// i=1: arr[1]=7, complement=9-7=2
//      2 in seen at index 0, return [0, 1]
// Result: [0, 1] (indices of 2 and 7)
\`\`\`

**Key insight**: Store seen numbers and check if complement exists.

## Pattern 2: Frequency Counting

\`\`\`javascript
function frequencyCount(arr) {
  const freq = new Map();

  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return freq;
  // Time: O(n), Space: O(k) where k is unique elements
}

function mostFrequent(arr) {
  const freq = frequencyCount(arr);
  let maxCount = 0;
  let maxNum = null;

  for (const [num, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      maxNum = num;
    }
  }

  return maxNum;
}

// Example: arr = [1, 1, 1, 2, 2, 3]
// freq: {1: 3, 2: 2, 3: 1}
// Most frequent: 1 (appears 3 times)
\`\`\`

## Pattern 3: Anagram Grouping

Group anagrams together.

\`\`\`javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Canonical form: sorted characters
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    map.get(sorted).push(str);
  }

  return Array.from(map.values());
  // Time: O(n × m log m) where m is max string length
  // Space: O(n × m)
}

// Example: strs = ["eat", "tea", "ate", "eta", "tan", "nat"]
// "eat" → sorted = "aet"
// "tea" → sorted = "aet" (same)
// "ate" → sorted = "aet" (same)
// "tan" → sorted = "ant"
// "nat" → sorted = "ant" (same)
// Result: [["eat", "tea", "ate"], ["tan", "nat"]]
\`\`\`

## Pattern 4: Sliding Window with Hash Map

Maintain hash map of elements in current window.

\`\`\`javascript
function characterReplacement(s, k) {
  const charCount = new Map();
  let left = 0;
  let maxCount = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
    maxCount = Math.max(maxCount, charCount.get(rightChar));

    // If window is invalid (too many characters to replace)
    while (right - left + 1 - maxCount > k) {
      const leftChar = s[left];
      charCount.set(leftChar, charCount.get(leftChar) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
  // Time: O(n), Space: O(26) = O(1) for lowercase letters
}

// Example: s = "ABAB", k = 2
// "A" → maxCount=1, len=1
// "AB" → maxCount=1, len=2
// "ABA" → maxCount=2, len=3
// "ABAB" → maxCount=2, len=4
// We can replace at most 2 characters, so we can make "AAAA"
\`\`\`

## Pattern 5: Longest Consecutive Sequence

Find longest sequence of consecutive numbers.

\`\`\`javascript
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;

  for (const num of numSet) {
    // Only start from sequence beginning
    if (!numSet.has(num - 1)) {
      let current = num;
      let length = 1;

      // Count consecutive numbers
      while (numSet.has(current + 1)) {
        current++;
        length++;
      }

      maxLen = Math.max(maxLen, length);
    }
  }

  return maxLen;
  // Time: O(n), Space: O(n)
}

// Example: nums = [100, 4, 200, 1, 3, 2]
// numSet: {100, 4, 200, 1, 3, 2}
// Start from 100: 100 → maxLen = 1
// Start from 4: 4 → 3 (no 5) → maxLen = 1
// Start from 200: 200 → maxLen = 1
// Start from 1: 1 → 2 → 3 → 4 (have all!) → length = 4
// Skip 2, 3, 4 (have predecessors)
// Result: 4
\`\`\`

## Why Hash Maps Excel

| Operation | Array | Hash Map |
|---|---|---|
| Get by index | O(1) | - |
| Get by key | O(n) | O(1) average |
| Insert | O(n) | O(1) average |
| Delete | O(n) | O(1) average |
| Frequency count | O(n²) | O(n) |
| Find pair | O(n²) | O(n) |

## Problem Recognition

| Pattern | Use |
|---|---|
| "Find two elements with property" | Hash map for complement |
| "Count frequencies" | Hash map |
| "Group by property" | Hash map |
| "Largest subarray with constraint" | Sliding window + hash map |
| "Consecutive sequence" | Set for O(1) lookup |
| "Anagrams" | Hash map with canonical key |
| "Duplicate detection" | Set |

## Key Insights

1. **Hash maps solve "find" problems** by trading space for O(1) lookup
2. **Canonical keys enable grouping**: Sort, encode, or transform before hashing
3. **Complement pattern**: For two-sum, store seen values and check complement
4. **Frequency + sliding window**: Maintain hash map inside window for constraints
5. **Set for existence checks**: Faster than array when checking membership`,

    zh: `## 哈希表基础

哈希表（或哈希映射）是一个**键值数据结构**，通过使用哈希函数将键转换为数组索引，提供O(1)平均情况下的查找。

### 哈希函数

\`\`\`javascript
// 简单哈希函数
function hash(key) {
  let sum = 0;
  for (let i = 0; i < key.length; i++) {
    sum += key.charCodeAt(i);
  }
  return sum % 10;  // 映射到索引0-9
}

// 问题：多个键哈希到相同值（冲突）
hash("abc") = 97 + 98 + 99 = 294 % 10 = 4
hash("aaa") = 97 + 97 + 97 = 291 % 10 = 1
hash("jab") = 106 + 97 + 98 = 301 % 10 = 1  // 冲突！
\`\`\`

### 冲突处理

#### 1. 链接法
\`\`\`javascript
// 在每个索引处存储[key, value]对的数组
class HashTableChaining {
  constructor(size = 10) {
    this.size = size;
    this.table = Array(size).fill().map(() => []);
  }

  hash(key) {
    let sum = 0;
    for (const char of key) {
      sum += char.charCodeAt(0);
    }
    return sum % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];

    // 检查键是否存在
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // 添加新对
    bucket.push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return undefined;
  }

  // 时间：O(1)平均，O(n)最坏（哈希函数不好）
  // 空间：O(n)
}
\`\`\`

#### 2. 开放寻址法
\`\`\`javascript
// 如果冲突，找替代索引
class HashTableOpenAddressing {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key) {
    // 线性探测：hash(key, i) = (hash(key) + i) % size
    let sum = 0;
    for (const char of key) {
      sum += char.charCodeAt(0);
    }
    return sum % this.size;
  }

  set(key, value) {
    let index = this.hash(key);

    // 线性探测：继续增加直到找到空槽
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined) {
      i++;
    }

    this.table[(index + i) % this.size] = [key, value];
  }

  get(key) {
    let index = this.hash(key);

    // 线性探测：继续搜索
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined) {
      if (this.table[(index + i) % this.size][0] === key) {
        return this.table[(index + i) % this.size][1];
      }
      i++;
    }

    return undefined;
  }
}
\`\`\`

### 原生哈希表（使用这个！）

在实际中，使用内置哈希表：

\`\`\`javascript
// JavaScript中的Map（类似Java中的HashMap）
const map = new Map();
map.set('key', 'value');
map.get('key');  // 'value'
map.has('key');  // true
map.delete('key');
map.size;  // 条目数量

// 对象（适用于字符串键）
const obj = {};
obj['key'] = 'value';
obj['key'];  // 'value'
delete obj['key'];
\`\`\`

## 模式1：两数之和

找两个数字，其和等于目标。

\`\`\`javascript
function twoSum(arr, target) {
  const seen = new Map();

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(arr[i], i);
  }

  return [];
  // 时间：O(n)，空间：O(n)
}

// 例子：arr = [2, 7, 11, 15], target = 9
// i=0: arr[0]=2, complement=9-2=7
//      7不在seen中，添加2→0到seen
//      seen: {2: 0}
// i=1: arr[1]=7, complement=9-7=2
//      2在seen中的索引0，返回[0, 1]
// 结果：[0, 1]（2和7的索引）
\`\`\`

**关键洞察**：存储已见数字，检查补数是否存在。

## 模式2：频率计数

\`\`\`javascript
function frequencyCount(arr) {
  const freq = new Map();

  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return freq;
  // 时间：O(n)，空间：O(k)，k是唯一元素数
}

function mostFrequent(arr) {
  const freq = frequencyCount(arr);
  let maxCount = 0;
  let maxNum = null;

  for (const [num, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      maxNum = num;
    }
  }

  return maxNum;
}

// 例子：arr = [1, 1, 1, 2, 2, 3]
// freq: {1: 3, 2: 2, 3: 1}
// 最频繁：1（出现3次）
\`\`\`

## 模式3：字母异位词分组

将字母异位词分组在一起。

\`\`\`javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 规范形式：排序字符
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    map.get(sorted).push(str);
  }

  return Array.from(map.values());
  // 时间：O(n × m log m)，m是最大字符串长度
  // 空间：O(n × m)
}

// 例子：strs = ["eat", "tea", "ate", "eta", "tan", "nat"]
// "eat" → 排序 = "aet"
// "tea" → 排序 = "aet"（相同）
// "ate" → 排序 = "aet"（相同）
// "tan" → 排序 = "ant"
// "nat" → 排序 = "ant"（相同）
// 结果：[["eat", "tea", "ate"], ["tan", "nat"]]
\`\`\`

## 模式4：哈希表滑动窗口

维护当前窗口中元素的哈希表。

\`\`\`javascript
function characterReplacement(s, k) {
  const charCount = new Map();
  let left = 0;
  let maxCount = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
    maxCount = Math.max(maxCount, charCount.get(rightChar));

    // 如果窗口无效（要替换的字符太多）
    while (right - left + 1 - maxCount > k) {
      const leftChar = s[left];
      charCount.set(leftChar, charCount.get(leftChar) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
  // 时间：O(n)，空间：O(26) = O(1)（小写字母）
}

// 例子：s = "ABAB", k = 2
// "A" → maxCount=1, len=1
// "AB" → maxCount=1, len=2
// "ABA" → maxCount=2, len=3
// "ABAB" → maxCount=2, len=4
// 我们最多可以替换2个字符，所以可以制作"AAAA"
\`\`\`

## 模式5：最长连续序列

找最长的连续数字序列。

\`\`\`javascript
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;

  for (const num of numSet) {
    // 只从序列开始的地方开始
    if (!numSet.has(num - 1)) {
      let current = num;
      let length = 1;

      // 计数连续数字
      while (numSet.has(current + 1)) {
        current++;
        length++;
      }

      maxLen = Math.max(maxLen, length);
    }
  }

  return maxLen;
  // 时间：O(n)，空间：O(n)
}

// 例子：nums = [100, 4, 200, 1, 3, 2]
// numSet: {100, 4, 200, 1, 3, 2}
// 从100开始：100 → maxLen = 1
// 从4开始：4 → 3（无5） → maxLen = 1
// 从200开始：200 → maxLen = 1
// 从1开始：1 → 2 → 3 → 4（都有！） → length = 4
// 跳过2, 3, 4（有前驱）
// 结果：4
\`\`\`

## 为什么哈希表优秀

| 操作 | 数组 | 哈希表 |
|---|---|---|
| 按索引获取 | O(1) | - |
| 按键获取 | O(n) | O(1)平均 |
| 插入 | O(n) | O(1)平均 |
| 删除 | O(n) | O(1)平均 |
| 频率计数 | O(n²) | O(n) |
| 找对 | O(n²) | O(n) |

## 问题识别

| 模式 | 使用 |
|---|---|
| "找两个具有性质的元素" | 哈希表补数 |
| "计数频率" | 哈希表 |
| "按性质分组" | 哈希表 |
| "最大子数组有约束" | 滑动窗口+哈希表 |
| "连续序列" | Set用于O(1)查找 |
| "字母异位词" | 哈希表规范键 |
| "重复检测" | Set |

## 关键洞察

1. **哈希表解决"查找"问题**，通过用空间换O(1)查找
2. **规范键启用分组**：排序、编码或转换后哈希
3. **补数模式**：对于两数之和，存储已见值并检查补数
4. **频率+滑动窗口**：在窗口内维护哈希表以满足约束
5. **Set用于存在性检查**：检查成员时比数组更快`,
  },
  leetcode: [
    {
      id: 1,
      title: 'Two Sum',
      titleZh: '两数之和',
      difficulty: 'Easy',
    },
    {
      id: 49,
      title: 'Group Anagrams',
      titleZh: '字母异位词分组',
      difficulty: 'Medium',
    },
    {
      id: 128,
      title: 'Longest Consecutive Sequence',
      titleZh: '最长连续序列',
      difficulty: 'Medium',
    },
    {
      id: 146,
      title: 'LRU Cache',
      titleZh: 'LRU 缓存',
      difficulty: 'Medium',
    },
  ],
}
