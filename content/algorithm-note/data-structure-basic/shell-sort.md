# 突破 O(N^2)：希尔排序

> Source: https://labuladong.online/zh/algo/data-structure-basic/shell-sort/
> Archived: labuladong.online — 算法笔记

---

# 突破 O(N^2)：希尔排序

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)| [912\. 排序数组](<https://leetcode.cn/problems/sort-an-array/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [选择排序所面临的问题](</zh/algo/data-structure-basic/select-sort/>)
  * [运用逆向思维：插入排序](</zh/algo/data-structure-basic/insertion-sort/>)


一句话总结

希尔排序是基于 [插入排序](</zh/algo/data-structure-basic/insertion-sort/>) 的简单改进，通过预处理增加数组的局部有序性，突破了插入排序的 O(N2)O(N^2)O(N2) 时间复杂度。

你可以点开可视化面板，点击播放按钮，然后点击加速/减速按钮调节速度，即可直观感受希尔排序的过程：

算法可视化

必须承认，希尔排序的思路很难想到，我是在《算法 4》第一次了解到这个算法，然后惊叹于这个算法的简单优化竟然能给插入排序带来如此大的提升。

首先我们要明确一个 **`h` 有序数组** 的概念。

## ¶`h` 有序数组

一个数组是 `h` 有序的，是指这个数组中任意间隔为 `h`（或者说间隔元素的个数为 `h-1`）的元素都是有序的。

这个概念用文字不好描述清楚，直接看个例子吧。比方说 `h=3` 时，一个 `3` 有序数组是这样的：

更新时间：2026/03/14 00:17

Loading comments...
