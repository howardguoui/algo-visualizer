# 线段树核心原理及可视化

> Source: https://labuladong.online/zh/algo/data-structure-basic/segment-tree-basic/
> Archived: labuladong.online — 算法笔记

---

# 线段树核心原理及可视化

前置知识

阅读本文前，你需要先学习：

  * [二叉树基础及常见类型](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的递归/层序遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)


一句话总结

线段树是 [二叉树结构](</zh/algo/data-structure-basic/binary-tree-basic/>) 的衍生，用于高效解决数组的区间查询和区间动态修改问题。

线段树可以在 O(log⁡N)O(\log N)O(logN) 的时间复杂度查询**任意长度** 的区间元素聚合值，在 O(log⁡N)O(\log N)O(logN) 的时间复杂度对**任意长度** 的区间元素进行动态修改，其中 NNN 为数组中的元素个数。

考虑到这是第一章，我并不准备深入讲解线段树的实现细节，具体代码会在后面的数据结构设计章节介绍。不过这里可以借助可视化面板帮你直观感受一下线段树的几种变化。

首先，[基本的线段树](</zh/algo/data-structure/segment-tree-implement/>) 包含区间查询 `query` 和**单点修改** `update` 方法，你可以打开这个可视化面板，逐行点击代码，观察 `query` 和 `update` 方法的执行过程：

算法可视化

可以看到这棵二叉树的叶子节点是数组中的元素，非叶子节点就是索引区间（线段）的汇总信息，也就是「线段树」这个名字的由来。

但上面这个线段树有个问题，就是必须输入 `nums` 数组进行构建，如果我们想在一个非常长的区间上进行区间操作，比如 `[0, 10^9]`，那么上来就需要 10910^9109 的空间复杂度构建线段树，这是非常浪费的。

[动态线段树的实现](</zh/algo/data-structure/segment-tree-dynamic/>) 运用「动态开点」技巧优化线段树处理稀疏数据的内存开销。你可以打开这个可视化面板，逐行点击代码，观察线段树的动态构建过程：

算法可视化

上面的实现都只支持「单点更新」，但更通用的需求是区间更新，比如把索引区间 `[i, j]` 的元素都更新为 `val`。[懒更新线段树的实现](</zh/algo/data-structure/segment-tree-lazy-update/>) 运用「懒更新」技巧，给线段树新增 `rangeAdd/rangeUpdate` 方法，可以在 O(log⁡N)O(\log N)O(logN) 时间复杂度内完成**任意长度** 的区间更新。

你可以打开这个可视化面板，逐行点击代码，观察懒更新线段树的运行过程。`rangeUpdate` 方法更新区间时，并不需要立即更新区间内的所有叶子节点，而是将更新的值缓存在某个非叶子节点中，当调用 `query` 方法进行区间查询时，才逐渐将更新的值向叶子节点传播：

算法可视化

下面我们来介绍线段树的使用场景和核心原理。

## ¶使用场景

在 [选择排序](</zh/algo/data-structure-basic/select-sort/>) 中，我们会尝试解决一个需求，就是计算 `nums` 数组中从索引 `i` 开始到末尾的最小值。

我们将提出一种使用 `suffixMin` 数组的优化尝试，即提前预计算一个 `suffixMin` 数组，使得 `suffixMin[i] = min(nums[i..])`，这样就可以在 O(1)O(1)O(1) 时间内查询 `nums[i..]` 的最小值：

更新时间：2026/03/14 00:17

Loading comments...
