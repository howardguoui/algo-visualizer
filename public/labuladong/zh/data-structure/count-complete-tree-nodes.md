# 拓展：如何计算完全二叉树的节点数

> Source: https://labuladong.online/zh/algo/data-structure/count-complete-tree-nodes/
> Archived: labuladong.online — 算法笔记

---

# 拓展：如何计算完全二叉树的节点数

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[222\. Count Complete Tree Nodes](<https://leetcode.com/problems/count-complete-tree-nodes/>)| [222\. 完全二叉树的节点个数](<https://leetcode.cn/problems/count-complete-tree-nodes/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)

如果让你数一下一棵普通二叉树有多少个节点，这很简单，只要在二叉树的遍历框架上加一点代码就行了。

但是，力扣第第 222 题「完全二叉树的节点个数」给你一棵完全二叉树，让你计算它的节点个数，你会不会？算法的时间复杂度是多少？

这个算法的时间复杂度应该是 O(logN∗logN)O(logN*logN)O(logN∗logN)，如果你心中的算法没有达到这么高效，那么本文就是给你写的。

关于「完全二叉树」和「满二叉树」等名词的定义，可以参考基础知识章节的 [二叉树基础](</zh/algo/data-structure-basic/binary-tree-basic/>)。

### 一、思路分析

现在回归正题，如何求一棵完全二叉树的节点个数呢？

```java
// 输入一棵完全二叉树，返回节点总数
int countNodes(TreeNode root);
```
