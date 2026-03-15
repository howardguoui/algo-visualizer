# 经典动态规划：最长公共子序列

> Source: https://labuladong.online/zh/algo/dynamic-programming/longest-common-subsequence/
> Archived: labuladong.online — 算法笔记

---

# 经典动态规划：最长公共子序列

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1143\. Longest Common Subsequence](<https://leetcode.com/problems/longest-common-subsequence/>)| [1143\. 最长公共子序列](<https://leetcode.cn/problems/longest-common-subsequence/>)|   
[583\. Delete Operation for Two Strings](<https://leetcode.com/problems/delete-operation-for-two-strings/>)| [583\. 两个字符串的删除操作](<https://leetcode.cn/problems/delete-operation-for-two-strings/>)|   
[712\. Minimum ASCII Delete Sum for Two Strings](<https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/>)| [712\. 两个字符串的最小ASCII删除和](<https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)

不知道大家做算法题有什么感觉，我总结出来做算法题的技巧就是，把大的问题细化到一个点，先研究在这个小的点上如何解决问题，然后再通过递归/迭代的方式扩展到整个问题。

比如说我们前文 [手把手带你刷二叉树第三期](</zh/algo/data-structure/binary-tree-part3/>)，解决二叉树的题目，我们就会把整个问题细化到某一个节点上，想象自己站在某个节点上，需要做什么，然后套二叉树递归框架就行了。

动态规划系列问题也是一样，尤其是子序列相关的问题。**本文从「最长公共子序列问题」展开，总结三道子序列问题** ，解这道题仔细讲讲这种子序列问题的套路，你就能感受到这种思维方式了。

## 最长公共子序列

计算最长公共子序列（Longest Common Subsequence，简称 LCS）是一道经典的动态规划题目，力扣第 1143 题「[最长公共子序列](<https://leetcode.cn/problems/longest-common-subsequence/>)」就是这个问题：

给你输入两个字符串 `s1` 和 `s2`，请你找出他们俩的最长公共子序列，返回这个子序列的长度。函数签名如下：

```python
def longestCommonSubsequence(s1: str, s2: str) -> int:
``` 

比如说输入 `s1 = "zabcde", s2 = "acez"`，它俩的最长公共子序列是 `lcs = "ace"`，长度为 3，所以算法返回 3。

如果没有做过这道题，一个最简单的暴力算法就是，把 `s1` 和 `s2` 的所有子序列都穷举出来，然后看看有没有公共的，然后在所有公共子序列里面再寻找一个长度最大的。

显然，这种思路的复杂度非常高，你要穷举出所有子序列，这个复杂度就是指数级的，肯定不实际。

正确的思路是不要考虑整个字符串，而是细化到 `s1` 和 `s2` 的每个字符。前文 [子序列解题模板](</zh/algo/dynamic-programming/subsequence-problem/>) 中总结的一个规律：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
