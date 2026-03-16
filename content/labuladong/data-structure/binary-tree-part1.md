# 二叉树心法（思路篇）

> Source: https://labuladong.online/zh/algo/data-structure/binary-tree-part1/
> Archived: labuladong.online — 算法笔记

---

# 二叉树心法（思路篇）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[226\. Invert Binary Tree](<https://leetcode.com/problems/invert-binary-tree/>)| [226\. 翻转二叉树](<https://leetcode.cn/problems/invert-binary-tree/>)|   
[116\. Populating Next Right Pointers in Each Node](<https://leetcode.com/problems/populating-next-right-pointers-in-each-node/>)| [116\. 填充每个节点的下一个右侧节点指针](<https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/>)|   
[114\. Flatten Binary Tree to Linked List](<https://leetcode.com/problems/flatten-binary-tree-to-linked-list/>)| [114\. 二叉树展开为链表](<https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)


本文承接 [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)，先复述一下前文总结的二叉树解题总纲：

Note

二叉树解题的思维模式分两类：

**1、是否可以通过遍历一遍二叉树得到答案** ？如果可以，用一个 `traverse` 函数配合外部变量来实现，这叫「遍历」的思维模式。

**2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案** ？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，这叫「分解问题」的思维模式。

无论使用哪种思维模式，你都需要思考：

**如果单独抽出一个二叉树节点，它需要做什么事情？需要在什么时候（前/中/后序位置）做** ？其他的节点不用你操心，递归函数会帮你在所有节点上执行相同的操作。

本文就以几道比较简单的题目为例，带你实践运用这几条总纲，理解「遍历」的思维和「分解问题」的思维有何区别和联系。

更新时间：2026/03/14 00:17

Loading comments...
