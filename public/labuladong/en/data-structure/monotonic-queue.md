# Monotonic Queue to Solve Sliding Window Problems

> Source: https://labuladong.online/algo/en/data-structure/monotonic-queue/
> Archived: labuladong.online

---

# Monotonic Queue to Solve Sliding Window Problems

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[239\. Sliding Window Maximum](<https://leetcode.com/problems/sliding-window-maximum/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Basic Array](</en/algo/data-structure-basic/array-basic/>)
  * [Basic Linked List](</en/algo/data-structure-basic/linkedlist-basic/>)
  * [Basic Queue/Stack](</en/algo/data-structure-basic/queue-stack-basic/>)

In a previous article [Solving Three Algorithm Problems Using Monotonic Stack](</en/algo/data-structure/monotonic-stack/>), we introduced the special data structure called monotonic stack. Here, we will discuss a similar data structure called "monotonic queue."

You might not have heard of this data structure before. Essentially, it is just a "queue" that uses a clever method to ensure that the elements in the queue are all monotonically increasing (or decreasing).

Why invent a structure like the "monotonic queue"? It is mainly to solve the following scenario:

**Given an array`window` with a known extreme value `A`, if you add a number `B` to `window`, you can immediately calculate the new extreme value by comparing `A` and `B`. However, if you remove a number from `window`, you cannot directly obtain the extreme value. If the removed number happens to be `A`, you need to traverse all elements in `window` to find the new extreme value.**

This scenario is common, but it seems that a monotonic queue is not necessary. For example, a [priority queue (binary heap)](</en/algo/data-structure-basic/binary-heap-basic/>) is specifically designed for dynamically finding extreme values. By creating a max (min) heap, you can quickly get the maximum (minimum) value, right?

For simply maintaining the extreme values, a priority queue is professional, with the head of the queue being the extreme value. However, a priority queue cannot satisfy the standard "first-in, first-out" time sequence of a queue structure. This is because a priority queue uses a binary heap to dynamically sort elements, and the order of dequeue is determined by the element size, having no relation to the order of enqueue.

Thus, a new queue structure is needed that can both maintain the "first-in, first-out" time sequence of queue elements and correctly maintain the extreme values of all elements in the queue, which is the "monotonic queue" structure.

The "monotonic queue" is mainly used to assist in solving problems related to sliding windows. In the previous article [Core Framework of Sliding Window](</en/algo/essential-technique/sliding-window-framework/>), the sliding window algorithm is explained as a part of the double pointer technique. However, some slightly more complex sliding window problems cannot be solved with just two pointers and require more advanced data structures.

For instance, in the previous article [Core Framework of Sliding Window](</en/algo/essential-technique/sliding-window-framework/>), for each problem discussed, whenever the window is expanded (`right++`) or contracted (`left++`), you can decide whether to update the answer based solely on the elements entering and leaving the window.

But in the example at the beginning of this article about determining the extreme value in a window, you cannot update the extreme value of the window based solely on the element leaving the window, unless you traverse all elements again, which increases the time complexity, something we do not want to see.

Let's look at LeetCode Problem 239 [Sliding Window Maximum](<https://leetcode.com/problems/sliding-window-maximum/>), which is a standard sliding window problem:

Given an array `nums` and a positive integer `k`, there is a window of size `k` that slides from left to right across `nums`. Please output the maximum value of `k` elements in the window each time.

The function signature is as follows:

```python
def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
``` 

For example, here is a sample problem provided by LeetCode:

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Position of the sliding window          Maximum value
---------------                         -----
[1  3  -1] -3  5  3  6  7                3
 1 [3  -1  -3] 5  3  6  7                3
 1  3 [-1  -3  5] 3  6  7                5
 1  3  -1 [-3  5  3] 6  7                5
 1  3  -1  -3 [5  3  6] 7                6
 1  3  -1  -3  5 [3  6  7]               7
``` 

Next, we will use a monotonic queue structure to calculate the maximum value in each sliding window in O(1)O(1)O(1) time, allowing the entire algorithm to be completed in linear time.

### 1\. Building the Solution Framework

Before introducing the API of the "monotonic queue" data structure, let's compare the standard API of a [regular queue](</en/algo/data-structure-basic/queue-stack-basic/>) with the API implemented by the monotonic queue:

```python
# API for a regular queue
class Queue:
    # enqueue operation, add element n to the end of the queue
    def push(self, n: int):
        pass
    
    # dequeue operation, remove the front element of the queue
    def pop(self):
        pass

# API for a monotonic queue
class MonotonicQueue:
    # add element n to the end of the queue
    def push(self, n: int):
        pass

    # return the maximum value in the current queue
    def max(self) -> int:
        pass

    # if the front element is n, remove it
    def pop(self, n: int):
        pass
``` 

Of course, the implementation of these APIs for a monotonic queue is different from a regular Queue, but for now, let's assume these operations have a time complexity of O(1) and first set up the solution framework for this "sliding window" problem:

```python
from collections import deque
from typing import List

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    window = MonotonicQueue()
    res = []

    for i in range(len(nums)):
        if i < k - 1:
            # first fill the window with the first k - 1 elements
            window.append(nums[i])
        else:
            # the window starts to slide forward
            # insert the new element
            window.append(nums[i])
            # add the maximum element of the current window to the result
            res.append(max(window))
            # remove the last element
            window.popleft()

    # convert the List type to an int[] array as the return value
    return res
``` 

![diagram](https://labuladong.online/images/algo/monotonic-queue/1.png)

This idea is quite simple, right? Now let's start with the main part, the implementation of the monotonic queue.

### 2\. Implementing the Monotonic Queue Data Structure

By observing the sliding window process, we can see that implementing a "monotonic queue" requires a data structure that supports insertion and deletion at both the head and tail. Clearly, a [doubly linked list](</en/algo/data-structure-basic/linkedlist-basic/>) meets this requirement.

The core idea of the "monotonic queue" is similar to the "monotonic stack." The `push` method still adds elements at the queue's tail, but it removes elements in front that are smaller than itself:

```python
from collections import deque

class MonotonicQueue:
    
    def __init__(self):
        # use a deque to support adding and removing elements from both ends
        # maintain the elements in increasing order from tail to head
        self.maxq = deque()
    
    # add an element n to the tail, maintaining the monotonic property of maxq
    def push(self, n: int) -> None:
        # remove all elements before it that are smaller than itself
        while len(self.maxq) > 0 and self.maxq[-1] < n:
            self.maxq.pop()
        self.maxq.append(n)
``` 

Imagine that the size of a number represents a person's weight. A heavier weight will flatten the lighter ones in front of it until it encounters a weight of greater magnitude.

![diagram](https://labuladong.online/images/algo/monotonic-queue/3.png)

If each element is processed in this manner when added, the elements in the monotonic queue will maintain a **monotonically decreasing** order. This makes our `max` method straightforward to implement: simply return the front element of the queue. The `pop` method also operates on the front of the queue. If the front element is the element `n` to be removed, then delete it:

```python
class MonotonicQueue:
    # To save space, the previous code part is omitted...

    def max(self) -> int:
        # The element at the head of the queue is definitely the largest
        return self.maxq[0]

    def pop(self, n: int) -> None:
        if n == self.maxq[0]:
            self.maxq.popleft()
``` 

The reason the `pop` method checks if `n == maxq.getFirst()` is that the front element `n` we want to remove might have been "flattened" during the `push` process and may no longer exist. In this case, we don't need to remove it:

![diagram](https://labuladong.online/images/algo/monotonic-queue/2.png)

With this, the design of the monotonic queue is complete. Let's look at the full solution code:

```python
class MonotonicQueue:
    def __init__(self):
        self.maxq = []
    
    def push(self, n):
        # remove all elements less than n
        while self.maxq and self.maxq[-1] < n: 
            self.maxq.pop()
        # then add n to the end
        self.maxq.append(n)
    
    def max(self):
        return self.maxq[0]
    
    def pop(self, n):
        if n == self.maxq[0]:
            self.maxq.pop(0)

class Solution(object):
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        window = MonotonicQueue()
        res = []
        
        for i in range(len(nums)):
            if i < k - 1:
                # first fill the window with the first k - 1 elements
                window.push(nums[i])
            else: 
                # slide the window forward, add new number
                window.push(nums[i])
                # record the maximum value of the current window
                res.append(window.max())
                # remove the old number
                window.pop(nums[i - k + 1])
        return res
``` 

Do not overlook some detailed issues. When implementing `MonotonicQueue`, we used Java's `LinkedList` because the linked list structure supports fast insertion and deletion of elements at both the head and tail. Meanwhile, the `res` in the solution code uses the `ArrayList` structure, as elements will be accessed by index later, making the array structure more suitable. Pay attention to these details when implementing in other languages.

Regarding the time complexity of the monotonic queue API, readers might be puzzled: the `push` operation contains a while loop, so the worst-case time complexity should be O(N)O(N)O(N), and with an additional for loop, the algorithm's time complexity should be O(N2)O(N^2)O(N2), right?

Here, we apply amortized analysis as mentioned in the [Guide to Algorithm Time and Space Complexity Analysis](</en/algo/essential-technique/complexity-analysis/>):

Looking at the `push` operation alone, the worst-case time complexity is indeed O(N)O(N)O(N), but the average time complexity is O(1)O(1)O(1). Typically, we use average complexity rather than the worst-case complexity to measure API interfaces, so the overall time complexity of this algorithm is O(N)O(N)O(N), not O(N2)O(N^2)O(N2).

Alternatively, analyzing from an overall perspective: the algorithm essentially involves adding and removing each element in `nums` from the `window` **at most once**. It is impossible to repeatedly add and remove the same element, so the overall time complexity is O(N)O(N)O(N).

The space complexity is easy to analyze, which is the size of the window O(k)O(k)O(k).

### Further Exploration

Finally, I pose a few questions for you to consider:

  1. The `MonotonicQueue` class provided in this article only implements the `max` method. Can you add a `min` method to return the minimum value of all elements in the queue in O(1)O(1)O(1) time?

  2. The `pop` method of the `MonotonicQueue` class provided in this article still requires a parameter, which is not so elegant and goes against the standard queue API. Please fix this defect.

  3. Implement the `size` method of the `MonotonicQueue` class to return the number of elements in the monotonic queue (note that each `push` operation might remove elements from the underlying `q` list, so the number of elements in `q` is not the number of elements in the monotonic queue).

In other words, can you implement a general-purpose monotonic queue:

```python
# General implementation of a monotonic queue, can
# efficiently maintain maximum and minimum values
class MonotonicQueue:
    def push(self, elem: 'Comparable') -> None:
        pass
    
    # Standard queue API, pop elements from the front in FIFO order
    def pop(self) -> 'Comparable':
        pass
    
    # Standard queue API, return the number of elements in the queue
    def size(self) -> int:
        pass
    
    # Monotonic queue specific API, calculate the
    # maximum value of elements in the queue in O(1) time
    def max(self) -> 'Comparable':
        pass
    
    # Monotonic queue specific API, calculate the
    # minimum value of elements in the queue in O(1) time
    def min(self) -> 'Comparable':
        pass
``` 

I will provide a general implementation of the monotonic queue and classic exercises in [General Implementation and Applications of Monotonic Queue](</en/algo/problem-set/monotonic-queue/>). For more data structure design problems, see [Classic Exercises on Data Structure Design](</en/algo/problem-set/ds-design/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
