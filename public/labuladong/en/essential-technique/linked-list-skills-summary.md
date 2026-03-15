# Two Pointer Techniques for Linked List Problems

> Source: https://labuladong.online/algo/en/essential-technique/linked-list-skills-summary/
> Archived: labuladong.online

---

# Two Pointer Techniques for Linked List Problems

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[21\. Merge Two Sorted Lists](<https://leetcode.com/problems/merge-two-sorted-lists/>)|   
[86\. Partition List](<https://leetcode.com/problems/partition-list/>)|   
[23\. Merge k Sorted Lists](<https://leetcode.com/problems/merge-k-sorted-lists/>)|   
[19\. Remove Nth Node From End of List](<https://leetcode.com/problems/remove-nth-node-from-end-of-list/>)|   
[876\. Middle of the Linked List](<https://leetcode.com/problems/middle-of-the-linked-list/>)|   
[142\. Linked List Cycle II](<https://leetcode.com/problems/linked-list-cycle-ii/>)|   
[160\. Intersection of Two Linked Lists](<https://leetcode.com/problems/intersection-of-two-linked-lists/>)|   
[141\. Linked List Cycle](<https://leetcode.com/problems/linked-list-cycle/>)|   
  
Prerequisites

Before reading this article, you need to learn:

  * [Linked List Basics](</en/algo/data-structure-basic/linkedlist-basic/>)

This article summarizes the basic techniques of singly linked lists. Each technique matches at least one algorithm problem:

  1. Merge two sorted linked lists

  2. Split a linked list

  3. Merge `k` sorted linked lists

  4. Find the k-th node from the end of a linked list

  5. Find the middle node of a linked list

  6. Check if a linked list has a cycle and find the cycle's starting point

  7. Check if two singly linked lists intersect and find the intersection node

All these solutions use the two-pointer technique. So, for linked list problems, two pointers are very common. Let's look at them one by one.

## Merge Two Sorted Linked Lists

This is the most basic linked list technique. LeetCode problem 21 "[Merge Two Sorted Lists](<https://leetcode.com/problems/merge-two-sorted-lists/>)" is about this. You are given two sorted linked lists. Please merge them into one new sorted linked list:

**21\. Merge Two Sorted Lists** |[LeetCode](<https://leetcode.com/problems/merge-two-sorted-lists/>)

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/10/03/merge_ex1.jpg)

```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
``` 

**Example 2:**

```
Input: list1 = [], list2 = []
Output: []
``` 

**Example 3:**

```
Input: list1 = [], list2 = [0]
Output: [0]
``` 

**Constraints:**

  * The number of nodes in both lists is in the range `[0, 50]`.
  * `-100 <= Node.val <= 100`
  * Both `list1` and `list2` are sorted in **non-decreasing** order.

The problem is from [LeetCode 21. Merge Two Sorted Lists](<https://leetcode.com/problems/merge-two-sorted-lists/>).

```python
# The function signature is as follows
def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:
``` 

This problem is simple. Let's look at the solution:

```python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        # dummy head node
        dummy = ListNode(-1)
        p = dummy
        p1 = l1
        p2 = l2
        
        while p1 is not None and p2 is not None: 
            # compare the two pointers p1 and p2
            # attach the node with the smaller value to the p pointer
            if p1.val > p2.val:
                p.next = p2
                p2 = p2.next
            else:
                p.next = p1
                p1 = p1.next
            # the p pointer keeps moving forward
            p = p.next
        
        if p1 is not None:
            p.next = p1
        
        if p2 is not None:
            p.next = p2
        
        return dummy.next
``` 

Our while loop compares `p1` and `p2` each time. The smaller node is added to the result list. See the following GIF:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/1.gif)

To understand it, this algorithm works like zipping up a zipper. `l1` and `l2` are like the two sides of the zipper teeth. The pointer `p` is like the zipper puller, merging two sorted linked lists together.

Below is a visualization of the algorithm. You can click the line `while (p1 != null && p2 != null)` many times to see how `p` merges the two sorted linked lists:

Algorithm Visualization

**The code also uses a common trick in linked list problems called the "dummy node" or virtual head node, which is the`dummy` node**. If you try not using the `dummy` node, the code gets more complex and you need to handle when pointer `p` is null. With the `dummy` node as a placeholder, you can avoid handling null pointers and keep the code simple.

When to Use a Dummy Node

Many readers ask me, when should we use a dummy (virtual head) node? Here is my summary: **When you need to create a new linked list, you can use a dummy node to make edge cases easier.**

For example, when you merge two sorted lists into a new list, you need to create a new linked list. Or when you split a list into two new lists, you are also creating new linked lists. In these cases, using a dummy node makes the code simpler and easier to handle edge cases.

## Decomposing a Singly Linked List

Let's look at LeetCode Problem 86: [Partition List](<https://leetcode.com/problems/partition-list/>):

**86\. Partition List** |[LeetCode](<https://leetcode.com/problems/partition-list/>)

Given the `head` of a linked list and a value `x`, partition it such that all nodes **less than** `x` come before nodes **greater than or equal** to `x`.

You should **preserve** the original relative order of the nodes in each of the two partitions.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2021/01/04/partition.jpg)

```
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
``` 

**Example 2:**

```
Input: head = [2,1], x = 2
Output: [1,2]
``` 

**Constraints:**

  * The number of nodes in the list is in the range `[0, 200]`.
  * `-100 <= Node.val <= 100`
  * `-200 <= x <= 200`

The problem is from [LeetCode 86. Partition List](<https://leetcode.com/problems/partition-list/>).

When merging two sorted linked lists, you combine them into one. Here, you need to split the original list into two. Specifically, you can divide the original list into two smaller lists: one list with elements less than `x`, and another with elements greater than or equal to `x`. In the end, connect these two lists together to get the result the problem wants.

The overall logic is very similar to merging sorted lists. For the details, let's look at the code. Pay attention to how we use dummy head nodes:

```python
class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        # virtual head node for the list containing elements less than x
        dummy1 = ListNode(-1)
        # virtual head node for the list containing elements greater than or equal to x
        dummy2 = ListNode(-1)
        # p1, p2 pointers are responsible for creating the resulting list
        p1, p2 = dummy1, dummy2
        # p is responsible for traversing the original list,
        # similar to the logic of merging two sorted lists
        # here we decompose one list into two lists
        p = head
        while p:
            if p.val >= x:
                p2.next = p
                p2 = p2.next
            else:
                p1.next = p
                p1 = p1.next
            # cannot directly move the p pointer forward,
            # p = p.next
            # break the next pointer of each node in the original list
            temp = p.next
            p.next = None
            p = temp
        # connect the two lists
        p1.next = dummy2.next

        return dummy1.next
``` 

I know many readers may have questions about this part of the code:

```
// You cannot just move the p pointer forward like this:
// p = p.next
// You must break the next pointer of each node in the original list
ListNode temp = p.next;
p.next = null;
p = temp;
``` 

Let's use our visual panel to understand this. First, look at the correct way. Click the line `while (p !== null)` several times to see how the list is split:

Algorithm Visualization

If you do not break the `next` pointer of each node in the original list, it will go wrong. The result list will include a cycle. You can click `while (p !== null)` several times to see:

Algorithm Visualization

In summary, if we want to attach nodes from the original list to a new list, instead of creating new nodes, it is often necessary to break the link between the node and the original list. It's a good habit: in such cases, always disconnect the node from the original list to avoid mistakes.

## Merge `k` Sorted Linked Lists

Let's look at LeetCode Problem 23: [Merge k Sorted Lists](<https://leetcode.com/problems/merge-k-sorted-lists/>):

**23\. Merge k Sorted Lists** |[LeetCode](<https://leetcode.com/problems/merge-k-sorted-lists/>)

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

_Merge all the linked-lists into one sorted linked-list and return it._

**Example 1:**

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
``` 

**Example 2:**

```
Input: lists = []
Output: []
``` 

**Example 3:**

```
Input: lists = [[]]
Output: []
``` 

**Constraints:**

  * `k == lists.length`
  * `0 <= k <= 104`
  * `0 <= lists[i].length <= 500`
  * `-104 <= lists[i][j] <= 104`
  * `lists[i]` is sorted in **ascending order**.
  * The sum of `lists[i].length` will not exceed `104`.

The problem is from [LeetCode 23. Merge k Sorted Lists](<https://leetcode.com/problems/merge-k-sorted-lists/>).

```python
# The function signature is as follows
def mergeKLists(lists: List[ListNode]) -> ListNode:
``` 

Merging `k` sorted linked lists is similar to merging two sorted lists. The main challenge is: how to quickly get the smallest node among the `k` nodes and add it to the result list?

Here, we use a priority queue. Put the nodes into a min-heap, and you can always get the smallest node among the `k` nodes. If you want to know more about priority queues, see [Priority Queue (Binary Heap) Principle and Implementation](</en/algo/data-structure-basic/binary-heap-implement/>). This article will not go into details.

```python
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    # Override comparison operators to facilitate adding ListNode to the min-heap
    def __lt__(self, other):
        return self.val < other.val

class Solution:
    def mergeKLists(self, lists):
        if not lists:
            return None
        # Dummy head node
        dummy = ListNode(-1)
        p = dummy
        # Priority queue, min-heap
        pq = []
        # Add the head nodes of k linked lists to the min-heap
        for i, head in enumerate(lists):
            if head is not None:
                heapq.heappush(pq, (head.val, i, head))

        while pq:
            # Get the smallest node and attach it to the result linked list
            val, i, node = heapq.heappop(pq)
            p.next = node
            if node.next is not None:
                heapq.heappush(pq, (node.next.val, i, node.next))
            # Move the p pointer forward continuously
            p = p.next
            
        return dummy.next
``` 

You can open the visual panel below and click the line `while (pq.size() > 0)` several times to see the process of merging sorted lists:

Algorithm Visualization

This algorithm is a common interview question. What is its time complexity?

The priority queue `pq` can hold at most kkk elements, so each `poll` or `add` operation takes O(logk)O(logk)O(logk) time. All nodes from all lists are added and removed from `pq`, so **the total time complexity is O(Nlogk)O(Nlogk)O(Nlogk), where kkk is the number of lists and NNN is the total number of nodes**.

Tip

There is another classic solution for this problem, explained in detail in [Divide and Conquer Algorithm Framework](</en/algo/essential-technique/divide-and-conquer/>). We will not discuss it here.

## The `k`th Node From the End in a Singly Linked List

Finding the `k`th node from the start is easy. You just loop with a `for` loop and move forward `k` steps. But how do we find the `k`th node from the end?

You might say: if the list has `n` nodes, then the `k`th node from the end is the `(n - k + 1)`th node from the start. That is also just a `for` loop.

Yes, but in algorithm problems, you are usually only given the head node `ListNode head` of a singly linked list. You do not know the length `n` directly. You must first traverse the list once to get `n`, then traverse again to find the `(n - k + 1)`th node.

So this solution needs to traverse the list twice to find the `k`th node from the end.

Can we find the `k`th node from the end by traversing the list only once? Yes. In an interview, the interviewer will expect you to give a one-pass solution.

This solution is clever. Assume `k = 2`. The idea is:

First, use a pointer `p1` that points to the head `head`, and move it `k` steps forward:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/1.jpeg)

Now `p1` only needs to move `n - k` more steps to reach the null pointer at the end of the list.

At this moment, use another pointer `p2`, and also point it to the head `head`:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/2.jpeg)

Now it is clear: move `p1` and `p2` forward at the same time. When `p1` moves `n - k` steps and reaches the null pointer at the end, `p2` has also moved `n - k` steps from `head`, and is now at the `(n - k + 1)`th node. That node is exactly the `k`th node from the end:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/3.jpeg)

This way, we traverse the list only once, and get the `k`th node from the end as `p2`.

Here is the code for this logic:

```python
# return the k-th node from the end of the linked list
def findFromEnd(head: ListNode, k: int) -> ListNode:
    p1 = head
    # p1 goes k steps first
    for i in range(k):
        p1 = p1.next
    p2 = head
    # p1 and p2 go n - k steps together
    while p1 != None:
        p2 = p2.next
        p1 = p1.next
    # p2 now points to the (n - k + 1)-th node, which is the k-th node from the end
    return p2
``` 

You can open the visualization panel below. The code will find the second node from the end. Click `i++` several times to see the fast pointer `p1` move 2 steps first. Then click the line `while (p1 !== null)` many times. You will see `p1` and `p2` move together, and finally `p2` stops at the `k`th node from the end:

Algorithm Visualization

If we use big-O notation, both the one-pass and two-pass solutions have time complexity O(N)O(N)O(N). But the one-pass algorithm uses a better trick.

Many linked list problems use this trick. For example, LeetCode 19: “[Remove Nth Node From End of List](<https://leetcode.com/problems/remove-nth-node-from-end-of-list/>)”:

**19\. Remove Nth Node From End of List** |[LeetCode](<https://leetcode.com/problems/remove-nth-node-from-end-of-list/>)

Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/10/03/remove_ex1.jpg)

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
``` 

**Example 2:**

```
Input: head = [1], n = 1
Output: []
``` 

**Example 3:**

```
Input: head = [1,2], n = 1
Output: [1]
``` 

**Constraints:**

  * The number of nodes in the list is `sz`.
  * `1 <= sz <= 30`
  * `0 <= Node.val <= 100`
  * `1 <= n <= sz`

**Follow up:** Could you do this in one pass?

The problem is from [LeetCode 19. Remove Nth Node From End of List](<https://leetcode.com/problems/remove-nth-node-from-end-of-list/>).

Here is the solution code:

```python
# main function
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # dummy head node
        dummy = ListNode(-1)
        dummy.next = head
        # to remove the nth from end, first find the (n + 1)th node from end
        x = self.findFromEnd(dummy, n + 1)
        # remove the nth node from end
        x.next = x.next.next
        return dummy.next
        
    def findFromEnd(self, head: ListNode, k: int) -> ListNode:
        # refer to the code above
        pass
``` 

You can open the visualization panel. Click the line `let p2 = head;` once. You will see `p1` move `k` steps first. Then click the line `while (p1 !== null)` many times. You will see `p1` and `p2` move together, and finally `p2` stops at the `k`th node from the end:

Algorithm Visualization

The logic is simple: to delete the `n`th node from the end, we first need a reference to the `(n + 1)`th node from the end. We can get it using our `findFromEnd` function.

But note that we also use the dummy head trick. This is to avoid null pointer problems. For example, the list has 5 nodes, and the task is to delete the 5th node from the end, which is the first node. By our logic, we should find the 6th node from the end first. But before the first node, there is no node, so this would fail.

With the dummy node `dummy`, we avoid this problem. We can handle this case and delete correctly.

## Middle Node of a Singly Linked List

LeetCode problem 876 "[Middle of the Linked List](<https://leetcode.com/problems/middle-of-the-linked-list/>)" is about this topic. The main problem is that we cannot directly get the length `n` of the linked list. The normal way is to first go through the list to count `n`, and then go through again to get the `n / 2`-th node, which is the middle node.

If you want to find the middle node in one pass, you need to use a smart trick called the "fast and slow pointer" technique:

We use two pointers, `slow` and `fast`, both starting at the head of the list.

**Every time the slow pointer`slow` moves one step, the fast pointer `fast` moves two steps. This way, when `fast` reaches the end of the list, `slow` will be at the middle node.**

Here is the code for this idea:

```python
class Solution:
    # initialize slow and fast pointers to head
    def middleNode(self, head: ListNode) -> ListNode:
        slow = head
        fast = head
        # stop when the fast pointer reaches the end
        while fast is not None and fast.next is not None:
            # slow pointer moves one step, fast pointer moves two steps
            slow = slow.next
            fast = fast.next.next
        # slow pointer points to the middle node
        return slow
``` 

You can open the visual panel and click on the line `while (fast !== null && fast.next !== null)` to see how the fast and slow pointers move:

Algorithm Visualization

Note: If the length of the list is even (there are two middle nodes), this method will return the second one.

Also, you can change this code a little to solve the problem of checking if a linked list has a cycle.

## Check if a Linked List Has a Cycle

Checking if a linked list has a cycle is a classic problem. The solution also uses the fast and slow pointer method:

Every time the slow pointer `slow` moves one step, the fast pointer `fast` moves two steps.

If `fast` can reach the end of the list, then there is no cycle. If `fast` meets `slow` while moving, then `fast` must be running in a circle, so the list has a cycle.

You just need to change the code for finding the middle node a little:

```python
class Solution:
    # initialize slow and fast pointers to head
    def hasCycle(self, head: ListNode) -> bool:
        slow = head
        fast = head
        # stop when the fast pointer reaches the end
        while fast is not None and fast.next is not None:
            # slow pointer moves one step, fast pointer moves two steps
            slow = slow.next
            fast = fast.next.next
            # if slow and fast pointers meet, it indicates a cycle
            if slow == fast:
                return True
        # no cycle present
        return False
``` 

You can open the visual panel below and click the line `fast = fast.next.next;` many times to see the movement of the pointers and how they finally meet:

Algorithm Visualization

There is also a harder version of this problem: LeetCode 142 "[Linked List Cycle II](<https://leetcode.com/problems/linked-list-cycle-ii/>)": If there is a cycle, how do you find the start node of the cycle?

For example, the start of the cycle is node 2 in the picture below:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/circularlinkedlist.png)

Here is the code to find the start of the cycle:

```python
class Solution:
    def detectCycle(self, head: ListNode):
        fast, slow = head, head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                break
        
        # the above code is similar to the hasCycle function
        if not fast or not fast.next:
            # if fast encounters a null pointer, it means there is no cycle
            return None
        
        # reset the pointer to the head node
        slow = head 
        # both fast and slow pointers move forward in sync, the
        # intersection point is the start of the cycle
        while slow != fast:
            fast = fast.next
            slow = slow.next
        return slow
``` 

You can open the visual panel below and click the line `fast = fast.next.next;` many times to see how the fast and slow pointers chase and meet. Then click the line `while (slow != fast)` many times to see both pointers move at the same speed and finally meet at the start of the cycle:

Algorithm Visualization

When the fast and slow pointers meet, set one of them to the head node, then move both at the same speed. When they meet again, the node is the start of the cycle.

Why does this work? Here is a simple explanation.

Suppose when the fast and slow pointers meet, the slow pointer `slow` has walked `k` steps. The fast pointer `fast` must have walked `2k` steps:

![diagram](https://labuladong.online/images/algo/linked-two-pointer/3-en.jpeg)

`fast` has walked `k` steps more than `slow`. These extra `k` steps mean that `fast` has run around the cycle, so `k` is a multiple of the cycle's length.

Suppose the distance from the meeting point to the cycle's start is `m`. According to the picture, the distance from the head to the start of the cycle is `k - m`. So, if you start from `head` and walk `k - m` steps, you will reach the start of the cycle.

Also, if you start from the meeting point and walk `k - m` steps, you will also reach the start of the cycle. Because, from the meeting point, after `k` steps, you will be back to the meeting point. So, after `k - m` steps, you will be at the start of the cycle:

![diagram](https://labuladong.online/images/algo/linked-two-pointer/2-en.jpeg)

So, just set one of the pointers to `head`, and move both pointers at the same speed. After `k - m` steps, they will meet at the start of the cycle.

## Do Two Linked Lists Intersect

This is an interesting problem. It is also LeetCode 160: [Intersection of Two Linked Lists](<https://leetcode.com/problems/intersection-of-two-linked-lists/>). The function signature is as follows:

```python
def getIntersectionNode(headA: ListNode, headB: ListNode) -> ListNode:
``` 

You are given the heads of two linked lists, `headA` and `headB`. These two lists may intersect.

If they intersect, your algorithm should return the node where they intersect. If they do not intersect, return null.

For example, if the input linked lists look like the picture below:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/4.png)

Your algorithm should return the node `c1`.

A direct idea is to use a `HashSet` to store all nodes of one list, then check the other list. But this needs extra space.

If you do not want to use extra space and only want to use two pointers, how can you do it?

The difficulty is that the two lists may have different lengths, so nodes cannot be matched one by one:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/5.jpeg)

If you move two pointers, `p1` and `p2`, along the lists, they cannot reach the intersection node at the same time. So you cannot get the intersection node `c1`.

**The key is to find a way so that`p1` and `p2` can reach the intersection node `c1` at the same time.**

So, we can let `p1` travel list `A`, then switch to list `B` after reaching the end. Similarly, let `p2` travel list `B`, then switch to list `A`. In this way, it is as if the two lists are joined together.

By doing this, `p1` and `p2` will enter the common part at the same time, and reach the intersection node `c1` together:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/6.jpeg)

You might ask: what if the two lists do not intersect? Can this method return null correctly?

Yes, this logic works. If there is no intersection, the `c1` node is null, and the algorithm will return null.

With this idea, we can write the code as follows:

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        # p1 points to the head of list A, p2 points to the head of list B
        p1, p2 = headA, headB
        while p1 != p2:
            # p1 takes one step forward, if it reaches the end of list A, switch to list B
            p1 = headB if p1 is None else p1.next
            # p2 takes one step forward, if it reaches the end of list B, switch to list A
            p2 = headA if p2 is None else p2.next
        return p1
``` 

Open the visualization panel below, and click on the line `while (p1 !== p2)` several times. You can see how the two pointers meet at the intersection.

Algorithm Visualization

In this way, the problem is solved. The space complexity is O(1)O(1)O(1) and the time complexity is O(N)O(N)O(N).

These are all the tips for singly linked lists. I hope they inspire you.

**Update 2022/1/24:**

Some great readers left other solutions in the comments for "Finding the intersection node of two linked lists". I will share them here.

First, some readers noticed that if you connect the two lists end to end, the problem becomes the "Find the start of a cycle" problem discussed before:

![diagram](https://labuladong.online/images/algo/linked-list-two-pointer/7.png)

To be honest, I did not think of this approach. It is a clever trick! But keep in mind, this question says you cannot change the original structure of the linked lists. So if you turn the input lists into a cycle to solve it, you must change them back after, or your solution will not pass.

Also, some readers said that since the core is to make `p1` and `p2` reach the intersection node `c1` at the same time, you can do this by first calculating the lengths of both lists. Here is the code:

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        lenA, lenB = 0, 0
        # calculate the length of both linked lists
        p1, p2 = headA, headB
        while p1:
            lenA += 1
            p1 = p1.next
        while p2:
            lenB += 1
            p2 = p2.next
        
        # make p1 and p2 reach the same distance from the end
        p1, p2 = headA, headB
        if lenA > lenB:
            for _ in range(lenA - lenB):
                p1 = p1.next
        else:
            for _ in range(lenB - lenA):
                p2 = p2.next
        
        # check if the two pointers are the same, there are two cases when p1 == p2:
        # 1. either the two linked lists do not intersect and both reach the end null pointer
        # 2. or the two linked lists intersect and they reach the intersection point
        while p1 != p2:
            p1 = p1.next
            p2 = p2.next
        
        return p1
``` 

Though this code is a bit longer, the time complexity is still O(N)O(N)O(N), and it may be easier to understand.

In short, my solution may not be the best or the only correct one. I encourage everyone to post your questions and thoughts in the comments. I am also happy to discuss more problem-solving ideas with you!

Now, you have learned all the two-pointer tricks for linked lists. For more practice, see [More Classic Linked List Two-Pointer Problems](</en/algo/problem-set/linkedlist-two-pointers/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
