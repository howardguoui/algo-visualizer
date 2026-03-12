import { TopicContent } from '../types'

export const linkedListFundamentals: TopicContent = {
  id: 'linkedlist-fundamentals',
  title: {
    en: 'Linked List Fundamentals',
    zh: '链表基础',
  },
  description: {
    en: 'Master linked list operations, two-pointer tricks, and the dummy node pattern that simplifies edge cases',
    zh: '掌握链表操作、双指针技巧和简化边界情况的虚拟头节点模式',
  },
  timeEstimate: '70-90 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `## Linked List Structure

A linked list is a **chain of nodes** where each node contains data and a reference to the next node.

\`\`\`javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Example: 1 → 2 → 3 → null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
\`\`\`

### Single vs Double Linked List

| Operation | Singly | Doubly |
|---|---|---|
| Forward traverse | O(1) | O(1) |
| Backward traverse | O(n) | O(1) |
| Insert before | O(n) | O(1) |
| Space | O(n) | O(n + back refs) |

**Rule of thumb**: Use singly unless you need backward traversal.

## Common Operations

### Traverse
\`\`\`javascript
function traverse(head) {
  let current = head;
  while (current) {
    console.log(current.val);
    current = current.next;
  }
}
// Time: O(n), Space: O(1)
\`\`\`

### Find nth Element
\`\`\`javascript
function findNth(head, n) {
  let current = head;
  for (let i = 0; i < n && current; i++) {
    current = current.next;
  }
  return current;  // nth element (0-indexed)
}
\`\`\`

### Reverse
\`\`\`javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    // Save next before breaking link
    const next = current.next;

    // Reverse the link
    current.next = prev;

    // Move pointers forward
    prev = current;
    current = next;
  }

  return prev;  // New head
  // Time: O(n), Space: O(1)
}

// Example: 1 → 2 → 3 → null
// Step 0: prev=null, current=1
//   next=2, 1.next=null, prev=1, current=2
// Step 1: prev=1, current=2
//   next=3, 2.next=1, prev=2, current=3
// Step 2: prev=2, current=3
//   next=null, 3.next=2, prev=3, current=null
// Result: 3 → 2 → 1 → null
\`\`\`

## Two Pointer Tricks for Linked Lists

### Find Middle
\`\`\`javascript
function findMiddle(head) {
  let slow = head, fast = head;

  // Move fast 2 steps, slow 1 step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;  // Middle node
  // Time: O(n), Space: O(1)
}

// Example: 1 → 2 → 3 → 4 → 5
// Initially: slow=1, fast=1
// Iter 1: slow=2, fast=3
// Iter 2: slow=3, fast=5
// Iter 3: fast=null (5.next.next)
// Result: slow=3 (middle)
\`\`\`

### Detect Cycle
\`\`\`javascript
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;  // Cycle detected
    }
  }

  return false;  // No cycle
  // Time: O(n), Space: O(1)
}

// Why it works: If cycle exists, fast will eventually catch slow.
// Fast moves 2 steps per iteration, slow moves 1.
// In cycle, fast gains 1 step on slow per iteration.
// Eventually fast.next === slow.next === slow (collision!)
\`\`\`

### Find Cycle Start
\`\`\`javascript
function findCycleStart(head) {
  let slow = head, fast = head;

  // First, detect if cycle exists
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null;  // No cycle

  // Slow and fast met at some point in cycle
  // Reset slow to head, move both 1 step at a time
  // They will meet at cycle start!
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;  // Cycle start
  // Time: O(n), Space: O(1)
}

// Why it works:
// When slow/fast collide in cycle, they're at distance d from start.
// slow has traveled x, fast has traveled 2x (where x = distance to collision).
// Resetting slow to head: both are now (x + d) apart.
// Moving 1 step at a time: they meet at cycle start.
\`\`\`

### Remove nth from End
\`\`\`javascript
function removeNthFromEnd(head, n) {
  // Create dummy node pointing to head
  const dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;

  // Move first n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }

  // Move both until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }

  // Skip the node
  second.next = second.next.next;

  return dummy.next;
  // Time: O(n), Space: O(1)
}

// Example: Remove 2nd from end in [1,2,3,4,5], n=2
// dummy → 1 → 2 → 3 → 4 → 5 → null
// first moves n+1=3 steps: first points to 3
// both move until first reaches null:
//   first at 5, second at 3
// second.next = second.next.next (skip 4)
// Result: [1,2,3,5]
\`\`\`

## The Dummy Node Pattern

The **dummy node** is a sentinel node that simplifies edge cases by ensuring the head always has a predecessor.

\`\`\`javascript
// Without dummy: Must handle head separately
function removeValue_noDummy(head, val) {
  // Special case: removing head
  while (head && head.val === val) {
    head = head.next;
  }

  // Regular case: removing non-head
  let current = head;
  while (current && current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
}

// With dummy: Uniform handling
function removeValue_dummy(head, val) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let current = dummy;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

// Key insight: dummy ensures every node has a predecessor,
// eliminating need for special case handling!
\`\`\`

## Example: Merge Two Sorted Lists

\`\`\`javascript
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes
  current.next = list1 || list2;

  return dummy.next;
  // Time: O(m + n), Space: O(1)
}
\`\`\`

## Key Insights

1. **Linked lists excel at insertions/deletions** at known positions (O(1) after finding position)
2. **Finding position still requires traversal** (O(n)), so total is O(n)
3. **Two-pointer tricks are powerful**: Finding middle, detecting cycles, removing nth
4. **Dummy node eliminates edge cases**: Always use for modifications
5. **Trade-off**: Random access O(n) vs arrays O(1), but insertion O(1) vs arrays O(n)`,

    zh: `## 链表结构

链表是一个**节点链**，其中每个节点包含数据和对下一个节点的引用。

\`\`\`javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 例子：1 → 2 → 3 → null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
\`\`\`

### 单向链表 vs 双向链表

| 操作 | 单向 | 双向 |
|---|---|---|
| 前向遍历 | O(1) | O(1) |
| 后向遍历 | O(n) | O(1) |
| 在前面插入 | O(n) | O(1) |
| 空间 | O(n) | O(n + 反向引用) |

**经验法则**：除非需要后向遍历，否则使用单向。

## 常见操作

### 遍历
\`\`\`javascript
function traverse(head) {
  let current = head;
  while (current) {
    console.log(current.val);
    current = current.next;
  }
}
// 时间：O(n)，空间：O(1)
\`\`\`

### 找第n个元素
\`\`\`javascript
function findNth(head, n) {
  let current = head;
  for (let i = 0; i < n && current; i++) {
    current = current.next;
  }
  return current;  // 第n个元素（0索引）
}
\`\`\`

### 反转链表
\`\`\`javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    // 保存下一个节点
    const next = current.next;

    // 反转链接
    current.next = prev;

    // 向前移动指针
    prev = current;
    current = next;
  }

  return prev;  // 新head
  // 时间：O(n)，空间：O(1)
}

// 例子：1 → 2 → 3 → null
// 步骤0：prev=null, current=1
//   next=2, 1.next=null, prev=1, current=2
// 步骤1：prev=1, current=2
//   next=3, 2.next=1, prev=2, current=3
// 步骤2：prev=2, current=3
//   next=null, 3.next=2, prev=3, current=null
// 结果：3 → 2 → 1 → null
\`\`\`

## 链表的双指针技巧

### 找中点
\`\`\`javascript
function findMiddle(head) {
  let slow = head, fast = head;

  // 快指针移动2步，慢指针移动1步
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;  // 中点节点
  // 时间：O(n)，空间：O(1)
}

// 例子：1 → 2 → 3 → 4 → 5
// 初始化：slow=1, fast=1
// 迭代1：slow=2, fast=3
// 迭代2：slow=3, fast=5
// 迭代3：fast=null（5.next.next）
// 结果：slow=3（中点）
\`\`\`

### 检测环
\`\`\`javascript
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;  // 检测到环
    }
  }

  return false;  // 无环
  // 时间：O(n)，空间：O(1)
}

// 为什么有效：如果存在环，快指针最终会追上慢指针。
// 快指针每次迭代移动2步，慢指针移动1步。
// 在环中，快指针每次迭代在慢指针上前进1步。
// 最终快指针.next === 慢指针.next === 慢指针（碰撞！）
\`\`\`

### 找到环的起点
\`\`\`javascript
function findCycleStart(head) {
  let slow = head, fast = head;

  // 首先检测环是否存在
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null;  // 无环

  // 慢快指针在环中某点相遇
  // 重置慢指针到头部，两者都以1步移动
  // 它们将在环的起点相遇！
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;  // 环的起点
  // 时间：O(n)，空间：O(1)
}

// 为什么有效：
// 当slow/fast在环中碰撞时，它们距离起点距离d。
// slow已经走了x，fast走了2x（x=到碰撞点的距离）。
// 重置slow到head：两者现在相距(x + d)。
// 每次移动1步：它们在环的起点相遇。
\`\`\`

### 删除倒数第n个节点
\`\`\`javascript
function removeNthFromEnd(head, n) {
  // 创建虚拟节点指向head
  const dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;

  // 移动first指针n+1步
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }

  // 两个指针都移动，直到first到达末尾
  while (first) {
    first = first.next;
    second = second.next;
  }

  // 跳过节点
  second.next = second.next.next;

  return dummy.next;
  // 时间：O(n)，空间：O(1)
}

// 例子：删除[1,2,3,4,5]的倒数第2个，n=2
// dummy → 1 → 2 → 3 → 4 → 5 → null
// first移动n+1=3步：first指向3
// 两个指针都移动，直到first到达null：
//   first在5，second在3
// second.next = second.next.next（跳过4）
// 结果：[1,2,3,5]
\`\`\`

## 虚拟节点模式

**虚拟节点**是一个哨兵节点，通过确保head始终有前驱，简化边界情况。

\`\`\`javascript
// 无虚拟节点：必须单独处理head
function removeValue_noDummy(head, val) {
  // 特殊情况：删除head
  while (head && head.val === val) {
    head = head.next;
  }

  // 普通情况：删除非head
  let current = head;
  while (current && current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
}

// 有虚拟节点：统一处理
function removeValue_dummy(head, val) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let current = dummy;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

// 关键洞察：虚拟节点确保每个节点都有前驱，
// 消除了特殊情况处理的需要！
\`\`\`

## 例子：合并两个排序链表

\`\`\`javascript
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // 附加剩余节点
  current.next = list1 || list2;

  return dummy.next;
  // 时间：O(m + n)，空间：O(1)
}
\`\`\`

## 关键洞察

1. **链表在已知位置的插入/删除上表现出色**（找到位置后O(1)）
2. **找到位置仍需要遍历**（O(n)），所以总体是O(n)
3. **双指针技巧很强大**：找中点、检测环、删除倒数第n个
4. **虚拟节点消除边界情况**：修改时总是使用
5. **权衡**：随机访问O(n)vs数组O(1)，但插入O(1)vs数组O(n)`,
  },
  leetcode: [
    {
      id: 21,
      title: 'Merge Two Sorted Lists',
      titleZh: '合并两个排序的链表',
      difficulty: 'Easy',
    },
    {
      id: 206,
      title: 'Reverse Linked List',
      titleZh: '反转链表',
      difficulty: 'Easy',
    },
    {
      id: 141,
      title: 'Linked List Cycle',
      titleZh: '环形链表',
      difficulty: 'Easy',
    },
    {
      id: 19,
      title: 'Remove Nth Node From End of List',
      titleZh: '删除链表的倒数第 N 个结点',
      difficulty: 'Medium',
    },
    {
      id: 876,
      title: 'Middle of the Linked List',
      titleZh: '链表的中间结点',
      difficulty: 'Easy',
    },
  ],
}
