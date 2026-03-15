# 背包问题经典习题

> Source: https://labuladong.online/zh/algo/problem-set/knapsack/
> Archived: labuladong.online — 算法笔记

---

# 背包问题经典习题

前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)
  * [0-1 背包问题](</zh/algo/dynamic-programming/knapsack1/>)
  * [相等子集分割](</zh/algo/dynamic-programming/knapsack2/>)
  * [完全背包问题](</zh/algo/dynamic-programming/knapsack3/>)


背包问题是一类经典的动态规划问题，主要是在某个限制内，选择最优的元素组合。

其特点在于 `dp` 数组的定义方式，第一个维度的定义是「仅使用前 `i` 个物品」，之后的维度用来定义限制条件。

比如经典的 0-1 背包问题，`dp` 数组定义如下：
    
    
    // 定义：dp[i][j] 表示使用前 i 个物品，背包容量为 j 的情况下，可以获得的最大价值
    int[][] dp = new int[N + 1][W + 1];

下面列举几道和背包问题相关的题目，帮助大家加深理解。

更新时间：2026/03/14 00:17

Loading comments...
