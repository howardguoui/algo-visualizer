# Two Perspectives of Dynamic Programming Enumeration

> Source: https://labuladong.online/algo/en/dynamic-programming/two-views-of-dp/
> Archived: labuladong.online

---

# Two Perspectives of Dynamic Programming Enumeration

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[115\. Distinct Subsequences](<https://leetcode.com/problems/distinct-subsequences/>)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Binary Tree Algorithms (Overview)](</en/algo/essential-technique/binary-tree-summary/>)
  * [Core Dynamic Programming Framework](</en/algo/essential-technique/dynamic-programming-framework/>)
  * [Ball-Box Model: Two Views of Brute-force in Backtracking](</en/algo/practice-in-action/two-views-of-backtrack/>)

In this article, I will review common ways to solve dynamic programming problems. Then I will focus on one key point: when you do brute-force in DP, different “views” can lead to different efficiency.

## A Combo of DP Skills

First, as [My Tips for Solving Problems](</en/algo/essential-technique/algorithm-summary/>) says, the core of most algorithm problems is **brute-force**. DP problems are the same. You must find a way to try all possible answers, and pick the ones that match the requirement.

Also, when you do brute-force in DP, you often meet **overlapping subproblems** , which causes repeated work. So in [Core DP Framework](</en/algo/essential-technique/dynamic-programming-framework/>), I explained how to improve a brute-force solution step by step into a faster DP solution.

But to write a brute-force solution, you still need the **state transition equation**. This is the core of DP, and it is not easy to come up with. In [DP Design: Mathematical Induction](</en/algo/dynamic-programming/longest-increasing-subsequence/>), I showed a basic method: use mathematical induction. That is, first make the definition of the `dp` function/array clear, then use this definition to derive the unknown state from known states.

**Now comes the main topic of this article: even if the definition of the`dp` function/array is the same, if you brute-force from different “views”, the efficiency may be different.**

About the “view” of brute-force, the earlier article [Ball-Box Model: Two Views of Brute-force in Backtracking](</en/algo/practice-in-action/two-views-of-backtrack/>) showed that different views in backtracking lead to different solutions. This kind of view switching also exists in DP problems. The permutation example there is very helpful. Let’s briefly review it here.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
