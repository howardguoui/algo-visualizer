# 经典动态规划：子集背包问题

> Source: https://labuladong.online/zh/algo/dynamic-programming/knapsack2/
> Archived: labuladong.online — 算法笔记

---

# 经典动态规划：子集背包问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[416\. Partition Equal Subset Sum](<https://leetcode.com/problems/partition-equal-subset-sum/>)| [416\. 分割等和子集](<https://leetcode.cn/problems/partition-equal-subset-sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)
  * [0-1 背包问题详解](</zh/algo/dynamic-programming/knapsack1/>)

上篇文章 [经典动态规划：0-1 背包问题](</zh/algo/dynamic-programming/knapsack1/>) 详解了通用的 0-1 背包问题，今天来看看背包问题的思想能够如何运用到其他算法题目。

**读者在阅读本文之前务必读懂前文[经典动态规划：0-1 背包问题](</zh/algo/dynamic-programming/knapsack1/>) 中讲的套路，因为本文就是按照背包问题的解题模板来讲解的**。

## 一、问题分析

看一下力扣第 416 题「[分割等和子集](<https://leetcode.cn/problems/partition-equal-subset-sum/>)」：

输入一个只包含正整数的非空数组 `nums`，请你写一个算法，判断这个数组是否可以被分割成两个子集，使得两个子集的元素和相等。

算法的函数签名如下：

```java
// 输入一个集合，返回是否能够分割成和相等的两个子集
boolean canPartition(int[] nums);
```
