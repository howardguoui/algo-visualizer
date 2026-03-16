# 优化：实现动态线段树

> Source: https://labuladong.online/zh/algo/data-structure/segment-tree-dynamic/
> Archived: labuladong.online — 算法笔记

---

# 优化：实现动态线段树

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[307\. Range Sum Query - Mutable](<https://leetcode.com/problems/range-sum-query-mutable/>)| [307\. 区域和检索 - 数组可修改](<https://leetcode.cn/problems/range-sum-query-mutable/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [线段树基本实现](</zh/algo/data-structure/segment-tree-implement/>)


[线段树基本实现](</zh/algo/data-structure/segment-tree-implement/>) 中用数组和链表分别实现了线段树，文末留了两个优化点，分别是区间更新问题和稀疏数据的内存优化问题。

本文将实现一个动态线段树 `DynamicSegmentTree`，利用「动态开点技术」，优化稀疏数据的内存占用问题。

更新时间：2026/03/14 00:17

Loading comments...
