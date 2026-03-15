# Classic DP: Longest Common Subsequence

> Source: https://labuladong.online/algo/en/dynamic-programming/longest-common-subsequence/
> Archived: labuladong.online

---

# Classic DP: Longest Common Subsequence

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1143\. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)|   
[583\. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)|   
[712\. Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)|   
  
Prerequisite Knowledge

Before reading this article, you need to learn:

  * [Dynamic Programming Core Framework](/en/algo/essential-technique/dynamic-programming-framework/)


I'm not sure how everyone feels about solving algorithm problems, but I've concluded that the technique is to break down a large problem into a small point, study how to solve the problem at this small point, and then expand it to the whole problem through recursion/iteration.

For example, in our previous article [Binary Tree Series Part 3](/en/algo/data-structure/binary-tree-part3/), when solving binary tree problems, we break down the entire problem to a specific node, imagine standing at that node, figure out what needs to be done, and then apply the binary tree recursion framework.

The same applies to dynamic programming problems, especially those related to subsequences. **This article starts with the "Longest Common Subsequence Problem," summarizing three subsequence problems**. By carefully discussing this type of problem, you can grasp this way of thinking.

## ¶Longest Common Subsequence

Calculating the Longest Common Subsequence (LCS) is a classic dynamic programming problem, as seen in LeetCode Problem 1143 "[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)":

Given two input strings `s1` and `s2`, find their longest common subsequence and return its length. The function signature is as follows:

CC++GoJavaJavaScriptPython
    
    
    int longestCommonSubsequence(String s1, String s2);

For instance, if `s1 = "zabcde", s2 = "acez"`, their longest common subsequence is `lcs = "ace"`, with a length of 3, so the algorithm returns 3.

If you haven't solved this problem before, a simple brute-force algorithm would be to enumerate all subsequences of `s1` and `s2`, check for common ones, and then find the longest among them.

Obviously, this approach has a very high complexity, as enumerating all subsequences is exponential, making it impractical.

The correct approach is not to consider the entire strings, but to focus on each character of `s1` and `s2`. As summarized in the previous article [Subsequence Problem Template](/en/algo/dynamic-programming/subsequence-problem/):

Last updated: 03/14/2026, 12:17 AM

Loading comments...
