# DP Design: Maximum Subarray

> Source: https://labuladong.online/algo/en/dynamic-programming/maximum-subarray/
> Archived: labuladong.online

---

# DP Design: Maximum Subarray

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[53\. Maximum Subarray](<https://leetcode.com/problems/maximum-subarray/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Prefix Sum Tricks](</en/algo/data-structure/prefix-sum/>)
  * [Sliding Window Framework](</en/algo/essential-technique/sliding-window-framework/>)
  * [Core Dynamic Programming Framework](</en/algo/essential-technique/dynamic-programming-framework/>)

LeetCode 53, “[Maximum Subarray](<https://leetcode.com/problems/maximum-subarray/>)”, is very similar to the idea in the earlier article [Classic DP: Longest Increasing Subsequence](</en/algo/dynamic-programming/longest-increasing-subsequence/>). It represents a special kind of DP problem. The problem is:

You are given an integer array `nums`. Find a subarray with the largest sum, and return that sum. The function signature is:

```python
def maxSubArray(nums: List[int]) -> int:
``` 

For example, if `nums = [-3,1,3,-1,2,-4,2]`, the answer is 5, because the maximum subarray `[1,3,-1,2]` has sum 5.

When I first saw this problem, I thought of the sliding window method, because sliding window is made for substring/subarray problems. This is a subarray problem, right?

In the earlier article [Sliding Window Framework](</en/algo/essential-technique/sliding-window-framework/>), I said that to use sliding window, you should ask yourself:

  1. When should we expand the window?
  2. When should we shrink the window?
  3. When should we update the answer?

Before, I thought sliding window could not work here. The reason is: when there are negative numbers, we cannot decide when to expand or shrink the window (similar to LeetCode 560 in [Prefix Sum Exercises](</en/algo/problem-set/perfix-sum/>)). But inspired by reader comments, I found this problem can be solved with a sliding window trick. However, some cases are very tricky, so it is hard to think of.

So I think the sliding window solution is good for expanding your thinking. But in real problems, it is easier to use DP / prefix sum ideas, because they follow a more standard template. Next, I will explain these three solutions.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
