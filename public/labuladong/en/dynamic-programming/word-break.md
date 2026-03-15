# How to Convert Backtracking to Dynamic Programming

> Source: https://labuladong.online/algo/en/dynamic-programming/word-break/
> Archived: labuladong.online

---

# How to Convert Backtracking to Dynamic Programming

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[139\. Word Break](<https://leetcode.com/problems/word-break/>)|   
[140\. Word Break II](<https://leetcode.com/problems/word-break-ii/>)|   
  
Prerequisites

Before reading this article, you need to study:

  * [Binary Tree Algorithms Series (Overview)](</en/algo/essential-technique/binary-tree-summary/>)
  * [Dynamic Programming Core Framework](</en/algo/essential-technique/dynamic-programming-framework/>)

In the earlier article [Step-by-Step Guide to Binary Trees (Overview)](</en/algo/essential-technique/binary-tree-summary/>), we divided recursive enumeration into two approaches: "Traversal" and "Decomposing Problems". The "Traversal" approach can be extended to [Backtracking Algorithms](</en/algo/essential-technique/backtrack-framework/>), and the "Decomposing Problems" approach can be extended to [Dynamic Programming Algorithms](</en/algo/essential-technique/dynamic-programming-framework/>).

This shift in thinking is not limited to binary tree-related algorithms. In this article, we will step outside the realm of binary tree problems to see how to abstract problems into a tree structure in actual algorithm questions, and then optimize step-by-step through "Traversal" and "Decomposing Problems" approaches, smoothly transitioning from backtracking algorithms to dynamic programming algorithms.

As a quick aside, the previous article [Detailed Explanation of the Dynamic Programming Core Framework](</en/algo/essential-technique/dynamic-programming-framework/>) stated that **standard dynamic programming problems always aim to find the optimal solution**. This is because dynamic programming problems have a property called "optimal substructure", meaning that the optimal solution to the overall problem can be derived from the optimal solutions of its subproblems.

However, in common parlance, even if a problem does not seek the optimal solution, as long as it uses a memoization technique to eliminate overlapping subproblems, we often call it a dynamic programming algorithm. Strictly speaking, this does not fit the definition of a dynamic programming problem. It might be more accurate to call such solutions "DFS algorithms with memoization". But we don't need to be too hung up on terminology. Since everyone is comfortable with the term, we can call it dynamic programming.

The two problems discussed in this article do not seek the optimal solution, but we will still refer to their solutions as dynamic programming solutions. This explanation is to prevent confusion for those who prefer precision. Without further ado, let's dive into the problems.

Last updated: 03/14/2026, 12:17 AM
