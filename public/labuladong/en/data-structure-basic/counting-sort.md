# Counting Sort: A New Pespective on Sorting

> Source: https://labuladong.online/algo/en/data-structure-basic/counting-sort/
> Archived: labuladong.online

---

# Counting Sort: A New Pespective on Sorting

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[75\. Sort Colors](<https://leetcode.com/problems/sort-colors/>)|   
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)|   
  
Prerequisite Knowledge

Before reading this article, you need to learn:

  * [Key Metrics of Sorting Algorithms](</en/algo/data-structure-basic/sort-basic/>)
  * [Problems with Selection Sort](</en/algo/data-structure-basic/select-sort/>)

In One Sentence

The idea of counting sort is simple: count how many times each element appears, then figure out the index of each element in the sorted array, and finally finish sorting.

The time and space complexity of counting sort is O(n+max−min)O(n + max - min)O(n+max−min), where nnn is the length of the array, and max−minmax - minmax−min is the range of the numbers in the array.

Here is a visualization panel for selection sort. You can click the code `sorted[count[index] - 1] = nums[i]` to see how the sorted array is formed:

Algorithm Visualization

For example, if the input array `nums` contains two `1`s, one `3`, and three `6`s, then we just need to fill the array with two `1`s, one `3`, and three `6`s in order. The sorted result is `[1, 1, 3, 6, 6, 6]`.

Let’s look at a simple problem to understand this. See LeetCode Problem 75: “[Sort Colors](<https://leetcode.com/problems/sort-colors/>)”:

**75\. Sort Colors** |[LeetCode](<https://leetcode.com/problems/sort-colors/>)

Given an array `nums` with `n` objects colored red, white, or blue, sort them **[in-place](<https://en.wikipedia.org/wiki/In-place_algorithm>) **so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

**Example 1:**

```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
``` 

**Example 2:**

```
Input: nums = [2,0,1]
Output: [0,1,2]
``` 

**Constraints:**

  * `n == nums.length`
  * `1 <= n <= 300`
  * `nums[i]` is either `0`, `1`, or `2`.

**Follow up:** Could you come up with a one-pass algorithm using only constant extra space?

The problem is from [LeetCode 75. Sort Colors](<https://leetcode.com/problems/sort-colors/>).

There are many ways to solve this problem. The best way uses the two-pointer technique to sort the array in one pass. I will explain this in [Array Two-Pointer Practice Problems](</en/algo/problem-set/array-two-pointers/>). Here, we use counting sort to solve it. In short, you need to sort an array where the values are only 0, 1, or 2.

We can create a `count` array of size 3. `count[0]`, `count[1]`, and `count[2]` store how many 0s, 1s, and 2s are in the array. Then we fill the original array in order according to the `count` array.

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        # count the number of 0, 1, 2
        count = [0] * 3
        for element in nums:
            count[element] += 1

        # fill the original array according to the count array
        index = 0
        for element in range(3):
            for _ in range(count[element]):
                nums[index] = element
                index += 1
``` 

This is a simple counting sort. But this problem is easy because it only has three types of numbers: 0, 1, and 2. Next, let’s see a more general counting sort algorithm.

## General Counting Sort

Although counting sort is simple, there are still some coding tricks in the general version.

Let’s start with the problems. Counting sort needs to use the values in the array as indexes in the `count` array. So we can ask:

  1. Does this mean we can only use counting sort when all numbers in `nums` are non-negative integers? What if there are negative numbers? What about custom types?

  2. Since counting sort only cares about how many times each value appears, and does not care about the order of the same numbers, is counting sort unstable?

  3. Because counting sort uses the value of the element as the index of the `count` array, what if the largest value in the array is very large? Will the `count` array use too much space?

Let’s think about these questions step by step and try to solve them.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
