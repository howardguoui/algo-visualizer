# Backtracking Algorithm Practice: Partitioning k Subsets

> Source: https://labuladong.online/algo/en/practice-in-action/partition-to-k-equal-sum-subsets/
> Archived: labuladong.online

---

# Backtracking Algorithm Practice: Partitioning k Subsets

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[698\. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [N-ary Tree Structure and Traversal Framework](/en/algo/data-structure-basic/n-ary-tree-traverse-basic/)
  * [Binary Tree Algorithms (Overview)](/en/algo/essential-technique/binary-tree-summary/)
  * [Backtracking Algorithm Framework](/en/algo/essential-technique/backtrack-framework/)
  * [Ball-and-Box Model: Two Brute-Force Views of Backtracking](/en/algo/practice-in-action/two-views-of-backtrack/)


I said before that backtracking is the most useful algorithm in written tests. When you have no idea, just use backtracking to do a brute-force search. Even if you cannot pass all test cases, you can still pass some of them. The basic skill of backtracking is not hard: you brute-force a decision tree, and for each step, you "make a choice" before recursion and "undo the choice" after recursion.

**However, even for brute-force search, some ideas are better than others.** In this article, we look at a classic backtracking problem: LeetCode 698, “[Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)”. This problem can help you understand the backtracking mindset more deeply and write backtracking functions more easily.

The problem is very simple:

You are given an array `nums` and a positive integer `k`. Please check whether `nums` can be divided into `k` subsets such that the sum of elements in each subset is the same.

The function signature is:

CC++GoJavaJavaScriptPython
    
    
    boolean canPartitionKSubsets(int[] nums, int k);

Thinking Question

Earlier, in [Subset Partition as a Knapsack Problem](/en/algo/dynamic-programming/knapsack2/), we solved a subset partition problem. But that problem only asked us to split the set into two equal subsets, and we could turn it into a knapsack problem and solve it with dynamic programming.

Why can partitioning into two equal subsets be transformed into a knapsack problem and solved with dynamic programming, but partitioning into `k` equal subsets cannot be transformed this way and must be solved by brute-force backtracking? Please think about this yourself first.

Answer to the Thinking Question

Why can partitioning into two equal subsets be transformed into a knapsack problem?

In the setting of [Subset Partition as a Knapsack Problem](/en/algo/dynamic-programming/knapsack2/), we have one knapsack and several items. Each item has **two choices** : "put it into the knapsack" or "do not put it into the knapsack".

When we split the original set `S` into two equal subsets `S_1` and `S_2`, each element in `S` also has **two choices** : "put it into `S_1`" or "do not put it into `S_1` (put it into `S_2`)". The brute-force idea here is actually the same as in the knapsack problem.

But if you want to split `S` into `k` equal subsets, then each element in `S` has **`k` choices**. This is essentially different from the standard knapsack setting, so you cannot directly use the knapsack DP approach. You have to use backtracking and brute-force search.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
