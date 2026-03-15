# 拓展：归并排序详解及应用

> Source: https://labuladong.online/zh/algo/practice-in-action/merge-sort/
> Archived: labuladong.online — 算法笔记

---

# 拓展：归并排序详解及应用

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)| [912\. 排序数组](<https://leetcode.cn/problems/sort-an-array/>)|   
[315\. Count of Smaller Numbers After Self](<https://leetcode.com/problems/count-of-smaller-numbers-after-self/>)| [315\. 计算右侧小于当前元素的个数](<https://leetcode.cn/problems/count-of-smaller-numbers-after-self/>)|   
[493\. Reverse Pairs](<https://leetcode.com/problems/reverse-pairs/>)| [493\. 翻转对](<https://leetcode.cn/problems/reverse-pairs/>)|   
[327\. Count of Range Sum](<https://leetcode.com/problems/count-of-range-sum/>)| [327\. 区间和的个数](<https://leetcode.cn/problems/count-of-range-sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的遍历框架](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [多叉树结构及遍历框架](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)

一直都有很多读者说，想让我用框架思维讲一讲基本的排序算法，我觉得确实得讲讲，毕竟学习任何东西都讲求一个融会贯通，只有对其本质进行比较深刻的理解，才能运用自如。

本文就先讲归并排序，给一套代码模板，然后讲讲它在算法问题中的应用。阅读本文前我希望你读过前文 [手把手刷二叉树（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)。

我在讲二叉树的时候，提了一嘴归并排序，说归并排序就是二叉树的后序遍历，当时就有很多读者留言说醍醐灌顶。

知道为什么很多读者遇到递归相关的算法就觉得烧脑吗？因为还处在「看山是山，看水是水」的阶段。

就说归并排序吧，如果给你看代码，让你脑补一下归并排序的过程，你脑子里会出现什么场景？

这是一个数组排序算法，所以你脑补一个数组的 GIF，在那一个个交换元素？如果是这样的话，那格局就低了。

但如果你脑海中浮现出的是一棵二叉树，甚至浮现出二叉树后序遍历的场景，那格局就高了，大概率掌握了我经常强调的 [框架思维](</zh/algo/essential-technique/algorithm-summary/>)，用这种抽象能力学习算法就省劲多了。

那么，归并排序明明就是一个数组算法，和二叉树有什么关系？接下来我就具体讲讲。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
