# 二叉堆核心原理及可视化

> Source: https://labuladong.online/zh/algo/data-structure-basic/binary-heap-basic/
> Archived: labuladong.online — 算法笔记

---

# 二叉堆核心原理及可视化

前置知识

阅读本文前，你需要先学习：

  * [二叉树基础及常见类型](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的递归/层序遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)

一句话总结

二叉堆是一种能够动态排序的数据结构，是 [二叉树结构](</zh/algo/data-structure-basic/binary-tree-basic/>) 的延伸。

二叉堆的主要操作就两个，`sink`（下沉）和 `swim`（上浮），用以维护二叉堆的性质。

二叉堆的主要应用有两个，首先是一种很有用的数据结构优先级队列（Priority Queue），第二是一种排序方法堆排序（Heap Sort）。

这个可视化面板直观地展示了二叉堆的基本操作，你可以点击跳转执行其中的代码，或自己修改代码玩一玩：

算法可视化

下面我就结合可视化面板来展示二叉堆的原理，最后以优先级队列为例，展示二叉堆的代码实现。
