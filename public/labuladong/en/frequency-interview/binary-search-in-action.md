# Binary Search in Action

> Source: https://labuladong.online/algo/en/frequency-interview/binary-search-in-action/
> Archived: labuladong.online

---

# Binary Search in Action

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[875\. Koko Eating Bananas](<https://leetcode.com/problems/koko-eating-bananas/>)|   
[1011\. Capacity To Ship Packages Within D Days](<https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/>)|   
[410\. Split Array Largest Sum](<https://leetcode.com/problems/split-array-largest-sum/>)|   
  
Required Knowledge

Before reading this article, you need to learn:

  * [Binary Search Framework in Detail](</en/algo/essential-technique/binary-search-framework/>)

In [Binary Search Framework in Detail](</en/algo/essential-technique/binary-search-framework/>), we thoroughly examined the details of binary search, exploring three scenarios: "searching for an element", "searching for the left boundary", and "searching for the right boundary", teaching you how to write correct, bug-free binary search algorithms.

**However, the binary search framework summarized in that article is limited to the basic scenario of "searching for a specified element in a sorted array". Real algorithm problems aren't this straightforward—you might not even recognize that a problem can use binary search**.

So this article summarizes a framework for applying binary search algorithms, helping you think through and analyze binary search problems systematically, step by step, to arrive at the solution.

## Original Binary Search Code

The prototype of binary search is searching for an element `target` in a **sorted array** and returning the corresponding index.

If the element doesn't exist, you can return some special value. These details can be implemented with minor adjustments to the algorithm.

There's another important issue: if the **sorted array** contains multiple `target` elements, these elements will definitely be adjacent. This involves whether the algorithm should return the index of the leftmost `target` element or the rightmost one—the so-called "searching for the left boundary" and "searching for the right boundary". This can also be implemented through minor code adjustments.

**We discussed these issues in detail in the previous article[Binary Search Core Framework](</en/algo/essential-technique/binary-search-framework/>). Readers who are unclear on this should review that article**. If you already understand the basic binary search algorithm, you can continue reading.

**In real algorithm problems, the "search left boundary" and "search right boundary" scenarios are commonly used** , while rarely will you be asked to simply "search for an element".

This is because algorithm problems generally ask you to find optimal values, like finding the "minimum speed" for eating bananas or the "minimum capacity" for a ship. The process of finding optimal values is necessarily a process of searching for a boundary, so we'll analyze these two boundary search binary algorithms in detail.

Note

Note that I'm using the left-closed, right-open notation for binary search. If you prefer both ends closed, you can modify the code accordingly.

The specific code implementation for the "search left boundary" binary search algorithm is as follows:

```python
def left_bound(nums: List[int], target: int) -> int:
    # search for the left boundary
    if len(nums) == 0:
        return -1
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            # when target is found, shrink the right boundary
            right = mid
        elif nums[mid] < target:
            left = mid + 1
        elif nums[mid] > target:
            right = mid
    return left
``` 

Suppose the input array is `nums = [1,2,3,3,3,5,7]` and you want to search for `target = 3`. The algorithm will return index 2.

If we draw a diagram, it looks like this:

![diagram](https://labuladong.online/images/algo/binary-search-in-action/1.jpeg)

The specific code implementation for the "search right boundary" binary search algorithm is as follows:

```python
# Search for the right boundary
def right_bound(nums: list[int], target: int) -> int:
    if len(nums) == 0:
        return -1
    left, right = 0, len(nums)

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            # When target is found, shrink the left boundary
            left = mid + 1
        elif nums[mid] < target:
            left = mid + 1
        elif nums[mid] > target:
            right = mid
    return left - 1
``` 

With the same input, the algorithm will return index 4. If we draw a diagram, it looks like this:

![diagram](https://labuladong.online/images/algo/binary-search-in-action/2.jpeg)

Good, the above content is all review. I expect readers at this point should understand it all. Remember the diagrams above—any problem that can be abstracted into these diagrams can be solved using binary search.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
