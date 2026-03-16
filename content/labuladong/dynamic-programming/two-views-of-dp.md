# 动态规划穷举的两种视角

> Source: https://labuladong.online/zh/algo/dynamic-programming/two-views-of-dp/
> Archived: labuladong.online — 算法笔记

---

# 动态规划穷举的两种视角

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[115\. Distinct Subsequences](<https://leetcode.com/problems/distinct-subsequences/>)| [115\. 不同的子序列](<https://leetcode.cn/problems/distinct-subsequences/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)
  * [球盒模型：回溯算法穷举的两种视角](</zh/algo/practice-in-action/two-views-of-backtrack/>)


本文我会带大家复习一下动态规划相关问题的一系列解题套路，然后着重讨论一下动态规划穷举时不同视角的问题。

## ¶动态规划解题组合拳

首先，[我的刷题心得](</zh/algo/essential-technique/algorithm-summary/>) 讲了，我们刷的算法问题的本质是「穷举」，动态规划问题也不例外，你必须想办法穷举所有可能的解，然后从中筛选出符合题目要求的解。

另外，动态规划问题穷举的过程中会出现重叠子问题导致的冗余计算，所以前文 [动态规划核心套路框架](</zh/algo/essential-technique/dynamic-programming-framework/>) 中告诉你如何一步一步把暴力穷举解法优化成效率更高的动态规划解法。

然而，想要写出暴力解需要依据状态转移方程，状态转移方程是动态规划的解题核心，可不是那么容易想出来的。不过，前文 [动态规划设计：数学归纳法](</zh/algo/dynamic-programming/longest-increasing-subsequence/>) 告诉你，思考状态转移方程的一个基本方法是数学归纳法，即明确 `dp` 函数或数组的定义，然后使用这个定义，从已知的「状态」中推导出未知的「状态」。

**接下来就是本文要着重探讨的问题了：就算`dp` 函数/数组的定义相同，如果你使用不同的「视角」进行穷举，效率也不见得是相同的**。

关于穷举「视角」的问题，前文 [球盒模型：回溯算法穷举的两种视角](</zh/algo/practice-in-action/two-views-of-backtrack/>) 讲了回溯算法中不同的穷举视角导致的不同解法，其实这种视角的切换在动态规划类型问题中依然存在。前文对排列的举例非常有助于你理解穷举视角的问题，这里再简单提一下。

更新时间：2026/03/14 00:17

Loading comments...
