# Classic DP: Subset Knapsack Problem

> Source: https://labuladong.online/algo/en/dynamic-programming/knapsack2/
> Archived: labuladong.online

---

# Classic DP: Subset Knapsack Problem

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[416\. Partition Equal Subset Sum](<https://leetcode.com/problems/partition-equal-subset-sum/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)
  * [Detailed Explanation of 0-1 Knapsack Problem](</en/algo/dynamic-programming/knapsack1/>)

The previous article [Classic Dynamic Programming: 0-1 Knapsack Problem](</en/algo/dynamic-programming/knapsack1/>) detailed the general 0-1 knapsack problem. Today, let's see how the concept of the knapsack problem can be applied to other algorithmic problems.

**Readers must understand the routine explained in the previous article[Classic Dynamic Programming: 0-1 Knapsack Problem](</en/algo/dynamic-programming/knapsack1/>) before reading this article, as this article explains according to the knapsack problem's solving template**.

## 1\. Problem Analysis

Take a look at LeetCode problem 416 "[Partition Equal Subset Sum](<https://leetcode.com/problems/partition-equal-subset-sum/>)":

Given a non-empty array `nums` containing only positive integers, write an algorithm to determine if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

The function signature of the algorithm is as follows:

```python
# input a set, return whether it can be partitioned into two subsets with equal sum
def canPartition(nums: List[int]) -> bool:
``` 

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
