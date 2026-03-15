# Heap Sort and Binary Heap

> Source: https://labuladong.online/algo/en/data-structure-basic/heap-sort/
> Archived: labuladong.online

---

# Heap Sort and Binary Heap

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)|   
  
Prerequisites

Before reading this article, you need to study:

  * [Binary Heap Basics](</en/algo/data-structure-basic/binary-heap-basic/>)
  * [Using Binary Heap to Implement Priority Queue](</en/algo/data-structure-basic/binary-heap-implement/>)

Summary

Heap sort is a sorting algorithm derived from the [binary heap structure](</en/algo/data-structure-basic/binary-heap-basic/>). Its time complexity is O(Nlog⁡N)O(N \log N)O(NlogN). Heap sort has two main steps: first, build a binary heap in place from the array (Heapify), then sort the array in place (Sort).

You can open the visualization panel below. Click to go to the `let heap = ...` part to see how the array is represented as a complete binary tree. Keep clicking `Heap.swim` to see the process of building the heap in place. Click `Heap.sink` to see how the sorting is done in place.

To learn heap sort, you **must** understand the principle of binary heap, otherwise the sorting process may not make sense.

Algorithm Visualization

In the previous article [Binary Heap Basics](</en/algo/data-structure-basic/binary-heap-basic/>), we introduced the structure of a binary heap. In [Using Binary Heap to Implement Priority Queue](</en/algo/data-structure-basic/binary-heap-implement/>), we used the binary heap to build a`SimpleMinPQ` priority queue, where inserted elements are taken out in increasing order.

This article will introduce the heap sort algorithm. It is a new sorting method based on the properties of binary heap. Heap sort is efficient and elegant.

First, I want to review a few key points about using binary heaps for priority queues. **If you don't understand any of them, go back and review the previous articles, or you will not understand heap sort.**

  1. A binary heap (priority queue) is implemented using an array, but logically it is a complete binary tree. The `swim` and `sink` methods are used to maintain the heap property.

  2. A priority queue can be a min-heap or a max-heap. A min-heap keeps the smallest element at the top; a max-heap keeps the largest element at the top.

  3. When you insert an element into a priority queue, you add it to the bottom of the heap, then call `swim` to move it up to the correct position. This takes O(log⁡N)O(\log N)O(logN) time.

  4. When you remove the top element from the priority queue, you swap the last element of the heap to the top, then call `sink` to move it down to the correct place. This also takes O(log⁡N)O(\log N)O(logN) time.

So, the simplest idea for heap sort is to use the priority queue directly: put all the elements into the priority queue, then take them out one by one, and you get a sorted array.

```python
# sort the array from smallest to largest using a priority queue
def sort(nums):
    # create a min heap that sorts elements from smallest to largest
    pq = SimpleMinPQ(len(nums))
    
    # first insert all elements into the priority queue
    for num in nums:
        # push operation automatically builds a binary heap, with time complexity O(logN)
        pq.push(num)
    
    # then extract all elements, resulting in a sorted order from smallest to largest
    for i in range(len(nums)):
        # pop operation removes the smallest element from the top
        # of the binary heap, with time complexity O(logN)
        nums[i] = pq.pop()
``` 

Since the `push` and `pop` methods of a priority queue have a complexity of O(log⁡N)O(\log N)O(logN), the overall time complexity of sorting is O(Nlog⁡N)O(N \log N)O(NlogN), where `N` is the length of the input array.

This approach can yield the correct sorting result, but the space complexity is O(N)O(N)O(N), as the priority queue we create is an additional data structure that uses an array to store elements.

Therefore, the problem heap sort aims to solve is to **avoid using extra auxiliary space and perform`sink` and `swim` operations directly on the original array**, completing the sort in O(Nlog⁡N)O(N \log N)O(NlogN) time.

Two Key Steps of Heap Sort

  1. In-place Heap Construction (Heapify): Directly transform the array to be sorted into a binary heap in place.

  2. Sorting: Continuously extract elements from the heap to obtain a sorted result.

Take a few minutes to think about it yourself. Comparing the process of adding and removing elements in a priority queue, it is indeed not difficult to implement these two steps in-place using `swim` and `sink` methods, and you should be able to figure it out independently.

Before explaining the heap sort code implementation in detail, I'll first present the `swim` and `sink` methods of a binary heap along with the supporting utility functions, because I will guide you through optimizing the heap sort code step by step later, and I won’t repeat the implementation of these functions.

These functions are extracted from the priority queue implementation in [Binary Heap Implementation of Priority Queue](</en/algo/data-structure-basic/binary-heap-implement/>), with the array passed in as a function parameter, and the other logic remains unchanged:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
