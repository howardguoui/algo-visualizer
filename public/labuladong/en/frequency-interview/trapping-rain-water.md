# How to Efficiently Solve the Trapping Rain Water Problem

> Source: https://labuladong.online/algo/en/frequency-interview/trapping-rain-water/
> Archived: labuladong.online

---

# How to Efficiently Solve the Trapping Rain Water Problem

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[42\. Trapping Rain Water](<https://leetcode.com/problems/trapping-rain-water/>)|   
[11\. Container With Most Water](<https://leetcode.com/problems/container-with-most-water/>)|   
  
Prerequisite

Before reading this article, you need to learn:

  * [Two Pointers Techniques for Arrays](</en/algo/essential-technique/array-two-pointers-summary/>)

LeetCode Problem 42 "[Trapping Rain Water](<https://leetcode.com/problems/trapping-rain-water/>)" is interesting and often appears in interviews. This article will explain how to optimize the solution step by step.

Here is the problem:

**42\. Trapping Rain Water** |[LeetCode](<https://leetcode.com/problems/trapping-rain-water/>)

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2018/10/22/rainwatertrap.png)

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
``` 

**Example 2:**

```
Input: height = [4,2,0,3,2,5]
Output: 9
``` 

**Constraints:**

  * `n == height.length`
  * `1 <= n <= 2 * 104`
  * `0 <= height[i] <= 105`

The problem is from [LeetCode 42. Trapping Rain Water](<https://leetcode.com/problems/trapping-rain-water/>).

You are given an array representing a bar chart. The question asks how much water can be trapped by the bars after raining.

```python
def trap(height: List[int]) -> int:
``` 

Next, I will introduce three methods from simple to advanced: brute-force solution -> memoization solution -> two pointers solution. We will solve this problem in O(N) time and O(1) space.

## 1\. Core Idea

Quick Tip

When solving algorithm problems, if you have no idea how to start, try to simplify the problem. Think about a small part first and write the simplest brute-force solution. You might find a key point and then optimize step by step to reach the best solution.

For this problem, let's not think about the whole bar chart first. Just think about how much water can be trapped at position `i`?

![diagram](https://labuladong.online/images/algo/rain-water/0.jpg)

At position `i`, we can trap 2 units of water. This is because `height[i]` is 0, and the highest possible water level here is 2. So, 2 - 0 = 2.

Why can position `i` hold up to 2 units of water? It depends on the tallest bar to the left and the tallest bar to the right of position `i`. Let's call these heights `l_max` and `r_max`. **The highest water level at position`i` is `min(l_max, r_max)`.**

So, for position `i`, the amount of water trapped is:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
