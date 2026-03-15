# 讲两道常考的阶乘算法题

> Source: https://labuladong.online/zh/algo/frequency-interview/factorial-problems/
> Archived: labuladong.online — 算法笔记

---

# 讲两道常考的阶乘算法题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[793\. Preimage Size of Factorial Zeroes Function](<https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function/>)| [793\. 阶乘函数后 K 个零](<https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/>)|   
[172\. Factorial Trailing Zeroes](<https://leetcode.com/problems/factorial-trailing-zeroes/>)| [172\. 阶乘后的零](<https://leetcode.cn/problems/factorial-trailing-zeroes/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二分查找框架详解](</zh/algo/essential-technique/binary-search-framework/>)


笔试题中经常看到阶乘相关的题目，今天说两个最常见的题目：

**1、输入一个非负整数`n`，请你计算阶乘 `n!` 的结果末尾有几个 0**。

这也是力扣第 172 题「[阶乘后的零](<https://leetcode.cn/problems/factorial-trailing-zeroes/>)」，比如说输入 `n = 5`，算法返回 1，因为 `5! = 120`，末尾有一个 0。

函数签名如下：
    
    
    int trailingZeroes(int n);

**2、输入一个非负整数`K`，请你计算有多少个 `n`，满足 `n!` 的结果末尾恰好有 `K` 个 0**。

这也是力扣第 793 题「[阶乘后 K 个零](<https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/>)」，比如说输入 `K = 1`，算法返回 5，因为 `5!,6!,7!,8!,9!` 这 5 个阶乘的结果最后只有一个 0，即有 5 个 `n` 满足条件。

函数签名如下：
    
    
    int preimageSizeFZF(int K);

我把这两个题放在一起，肯定是因为它们有共性，下面我们来逐一分析。

更新时间：2026/03/14 00:17

Loading comments...
