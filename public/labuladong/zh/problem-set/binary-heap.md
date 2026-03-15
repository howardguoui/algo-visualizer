# 优先级队列经典习题

> Source: https://labuladong.online/zh/algo/problem-set/binary-heap/
> Archived: labuladong.online — 算法笔记

---

# 优先级队列经典习题

前置知识

阅读本文前，你需要先学习：

  * [二叉堆基础](</zh/algo/data-structure-basic/binary-heap-basic/>)
  * [二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>)

二叉堆的主要应用是优先级队列，而优先级队列的特色是**动态排序** ，插入的元素可以自动维护正确的顺序。当然，[二叉搜索树](</zh/algo/data-structure-basic/tree-map-basic/>) 也可以做到动态排序，但优先级队列提供的接口更简单，实现也更简单。

一般来说，用到优先级队列的题目主要分两类，一类是把多个有序序列合并成一个，另一类是在多个有序序列中寻找第 `k` 个最大元素这类题，我们分别来看。

## 类型一，合并有序序列

先来看第一类，类似于合并有序链表这样的题目。
