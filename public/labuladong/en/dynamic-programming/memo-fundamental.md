# How to Determine the Base Case and Initial Values for Memoization?

> Source: https://labuladong.online/algo/en/dynamic-programming/memo-fundamental/
> Archived: labuladong.online

---

# How to Determine the Base Case and Initial Values for Memoization?

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[931\. Minimum Falling Path Sum](https://leetcode.com/problems/minimum-falling-path-sum/)|   
  
Prerequisites

Before diving in, make sure you've read:

  * [Dynamic Programming Core Framework](/en/algo/essential-technique/dynamic-programming-framework/)


Lots of people get confused about base cases, memo initialization values, and other details when working on dynamic programming problems. This article will clear all that up, and I'll also show you how to pick up on subtle hints in problem statements that can guide your solution.

Let's look at LeetCode problem 931, "[Minimum Falling Path Sum](https://leetcode.cn/problems/minimum-falling-path-sum/)". You're given an `n * n` 2D array called `matrix`, and you need to find the minimum sum of a falling path from the first row to the last row:

**931\. Minimum Falling Path Sum** |[LeetCode](https://leetcode.com/problems/minimum-falling-path-sum/)

Given an `n x n` array of integers `matrix`, return _the**minimum sum** of any **falling path** through_ `matrix`.

A **falling path** starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position `(row, col)` will be `(row + 1, col - 1)`, `(row + 1, col)`, or `(row + 1, col + 1)`.

**Example 1:**

![](/images/lc/uploads/2021/11/03/failing1-grid.jpg)
    
    
    **Input:** matrix = [[2,1,3],[6,5,4],[7,8,9]]
    **Output:** 13
    **Explanation:** There are two falling paths with a minimum sum as shown.
    

**Example 2:**

![](/images/lc/uploads/2021/11/03/failing2-grid.jpg)
    
    
    **Input:** matrix = [[-19,57],[-40,-5]]
    **Output:** -59
    **Explanation:** The falling path with a minimum sum is shown.
    

**Constraints:**

  * `n == matrix.length == matrix[i].length`
  * `1 <= n <= 100`
  * `-100 <= matrix[i][j] <= 100`


The problem is from [LeetCode 931. Minimum Falling Path Sum](https://leetcode.com/problems/minimum-falling-path-sum/).

Here's the function signature:

CC++GoJavaJavaScriptPython
    
    
    int minFallingPathSum(int[][] matrix);

This problem isn't particularly hard, so **I'm using it to demonstrate how to determine base case return values, memo initial values, and return values for out-of-bounds indices**.

That said, let me walk through the solution following the [standard dynamic programming approach](/en/algo/essential-technique/dynamic-programming-framework/).

Last updated: 03/14/2026, 12:17 AM

Loading comments...
