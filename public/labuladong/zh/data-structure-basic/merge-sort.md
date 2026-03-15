# 妙用二叉树后序位置：归并排序

> Source: https://labuladong.online/zh/algo/data-structure-basic/merge-sort/
> Archived: labuladong.online — 算法笔记

---

# 妙用二叉树后序位置：归并排序

前置知识

阅读本文前，你需要先学习：

  * [二叉树的遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [妙用二叉树前序位置：快速排序](</zh/algo/data-structure-basic/quick-sort/>)

一句话总结

归并排序的核心思路需要结合 [二叉树的后序遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>) 来理解：先利用递归把左右两半子数组排好序，然后在二叉树的后序位置合并两个有序数组。

你可以点开这个可视化面板，点击全屏按钮 ，然后多次点击 `merge(nums, lo, mid, hi);` 这一行代码，即可直观地看到归并排序的递归过程和排序效果：

算法可视化

**考虑到这里是基础知识章节，我只会讲一下归并排序的整体思路** ，具体的代码实现和算法运用会安排在二叉树章节后面的 [归并排序详解及运用](</zh/algo/practice-in-action/merge-sort/>) 里，不建议初学者现在去看。

因为归并排序算法需要熟练掌握递归思维，且需要用到 [双指针技巧](</zh/algo/essential-technique/linked-list-skills-summary/>) 来合并两个有序数组，所以建议初学者按照本站目录顺序学习，到时候理解归并排序的代码会比较轻松。

## 归并排序核心思路

开头的这句总结虽然也比较抽象，但是有上一章 [快速排序核心思路](</zh/algo/data-structure-basic/quick-sort/>) 的铺垫，你应该有点感觉。

我用快速排序的思路来对比一下，你就能直观感受到它俩的区别了：

前文快速排序的思路是，先把一个元素放到正确的位置（排好序），然后将这个元素左右两边剩下的元素利用递归分别排好序，最终整个数组就排好序了。代码框架如下：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
