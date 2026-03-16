# 妙用二叉树前序位置：快速排序

> Source: https://labuladong.online/zh/algo/data-structure-basic/quick-sort/
> Archived: labuladong.online — 算法笔记

---

# 妙用二叉树前序位置：快速排序

前置知识

阅读本文前，你需要先学习：

  * [选择排序所面临的问题](</zh/algo/data-structure-basic/select-sort/>)
  * [二叉树的遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)


一句话总结

快速排序的核心思路需要结合 [二叉树的前序遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>) 来理解：在二叉树遍历的前序位置将一个元素排好位置，然后递归地将剩下的元素排好位置。

你可以点开这个可视化面板，点击全屏按钮 ，然后多次点击 `let p = partition(nums, lo, hi)` 这部分代码，即可直观地看到快排的递归过程和排序效果：

算法可视化

上来这一句总结是不是就把初学者听懵了？数组排序算法怎么扯到二叉树上了？

所以说，计算机思维和人类思维是不一样的。

正常人要排序数组，一般就是维护一个 `sortedIndex`，保持 `[0, sortedIndex)` 有序，逐步右移 `sortedIndex`，直到整个数组有序。这中间历经种种坎坷，逢山开路遇水搭桥，正如我们前面讲的 [选择排序](</zh/algo/data-structure-basic/select-sort/>)、[冒泡排序](</zh/algo/data-structure-basic/bubble-sort/>)、[插入排序](</zh/algo/data-structure-basic/insertion-sort/>)、[希尔排序](</zh/algo/data-structure-basic/shell-sort/>)。

**但是越是效率高的算法，离计算机思维越近，未经训练的人就越难理解** 。学过前面几种基础排序算法，现在你应该可以感觉到这一点了，容易理解和推导的排序算法复杂度全都是 O(N2)O(N^2)O(N2)，而突破 O(N2)O(N^2)O(N2) 的排序算法，都感觉不是人类能想出来的。

哪个人要是张嘴就说：排序数组简单啊，只要把一个元素排好序，然后把剩下元素排好序，就能把整个数组排好序了。那只能说这个人可能是三体人潜伏在地球的特务：）

更新时间：2026/03/14 00:17

Loading comments...
