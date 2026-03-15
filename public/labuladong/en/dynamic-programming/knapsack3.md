# Classic DP: Unbounded Knapsack Problem

> Source: https://labuladong.online/algo/en/dynamic-programming/knapsack3/
> Archived: labuladong.online

---

# Classic DP: Unbounded Knapsack Problem

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[518\. Coin Change II](https://leetcode.com/problems/coin-change-ii/)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Dynamic Programming Core Framework](/en/algo/essential-technique/dynamic-programming-framework/)
  * [0-1 Knapsack Problem in Detail](/en/algo/dynamic-programming/knapsack1/)


[Dynamic Programming Patterns in Detail](/en/algo/essential-technique/dynamic-programming-framework/) covered LeetCode problem 322, "Coin Change I." This article covers Coin Change II, another classic variant of the knapsack problem. We've already discussed [Classic Dynamic Programming: 0-1 Knapsack Problem](/en/algo/dynamic-programming/knapsack1/) and [Knapsack Variant: Equal Subset Partition](/en/algo/dynamic-programming/knapsack2/).

**Before reading this article, make sure you've read the previous two articles.** Once you're familiar with the patterns for dynamic programming and knapsack problems, this article continues applying the same pattern to another knapsack variant.

Let's look at LeetCode problem 518, "[Coin Change II](https://leetcode.cn/problems/coin-change-ii/)":

**518\. Coin Change II** |[LeetCode](https://leetcode.com/problems/coin-change-ii/)

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return _the number of combinations that make up that amount_. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The answer is **guaranteed** to fit into a signed **32-bit** integer.

**Example 1:**
    
    
    **Input:** amount = 5, coins = [1,2,5]
    **Output:** 4
    **Explanation:** there are four ways to make up the amount:
    5=5
    5=2+2+1
    5=2+1+1+1
    5=1+1+1+1+1
    

**Example 2:**
    
    
    **Input:** amount = 3, coins = [2]
    **Output:** 0
    **Explanation:** the amount of 3 cannot be made up just with coins of 2.
    

**Example 3:**
    
    
    **Input:** amount = 10, coins = [10]
    **Output:** 1
    

**Constraints:**

  * `1 <= coins.length <= 300`
  * `1 <= coins[i] <= 5000`
  * All the values of `coins` are **unique**.
  * `0 <= amount <= 5000`


The problem is from [LeetCode 518. Coin Change II](https://leetcode.com/problems/coin-change-ii/).

The function signature we need to implement is:

CC++GoJavaJavaScriptPython
    
    
    int change(int amount, int[] coins);

We can reframe this problem in knapsack terms:

You have a knapsack with a maximum capacity of `amount`, and a series of items `coins`, where each item weighs `coins[i]`. **Each item can be used unlimited times.** How many ways can you fill the knapsack exactly?

The key difference between this problem and the two knapsack problems we covered earlier is that each item has unlimited quantity. This is the so-called "**Complete Knapsack Problem**." Nothing fancy — the state transition equation just needs a small tweak.

Let's continue our analysis using the knapsack problem framework.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
