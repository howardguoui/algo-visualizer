# 最优子结构原理和 dp 数组遍历方向

> Source: https://labuladong.online/zh/algo/dynamic-programming/faq-summary/
> Archived: labuladong.online — 算法笔记

---

# 最优子结构原理和 dp 数组遍历方向

前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)


本文作为 [动态规划核心套路框架](</zh/algo/essential-technique/dynamic-programming-framework/>) 之后的一篇全面答疑文章，给你讲明白以下几个问题：

1、到底什么才叫「最优子结构」，和动态规划什么关系。

2、如何判断一个问题是动态规划问题，即如何看出是否存在重叠子问题。

3、为什么经常看到将 `dp` 数组的大小设置为 `n + 1` 而不是 `n`。

4、为什么动态规划遍历 `dp` 数组的方式五花八门，有的正着遍历，有的倒着遍历，有的斜着遍历。

更新时间：2026/03/14 00:17

Loading comments...
