# 二叉搜索树心法（后序篇）

> Source: https://labuladong.online/zh/algo/data-structure/bst-part4/
> Archived: labuladong.online — 算法笔记

---

# 二叉搜索树心法（后序篇）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1373\. Maximum Sum BST in Binary Tree](<https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/>)| [1373\. 二叉搜索子树的最大键值和](<https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)


本文是承接 [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>) 的第五篇文章，主要讲二叉树后序位置的妙用，复述下前文关于后序遍历的描述：

> 前序位置的代码只能从函数参数中获取父节点传递来的数据，而后序位置的代码不仅可以获取参数数据，还可以获取到子树通过函数返回值传递回来的数据。
> 
> **那么换句话说，一旦你发现题目和子树有关，那大概率要给函数设置合理的定义和返回值，在后序位置写代码了** 。

其实二叉树的题目真的不难，无非就是前中后序遍历框架来回倒嘛，只要你把一个节点该做的事情安排好，剩下的抛给递归框架即可。

但是对于有的题目，不同的遍历顺序时间复杂度不同。尤其是这个后序位置的代码，有时候可以大幅提升算法效率。

我们再看看后序遍历的代码框架：

CC++GoJavaJavaScriptPython
    
    
    void traverse(TreeNode root) {
        traverse(root.left);
        traverse(root.right);
        // 后序代码的位置
        // 在这里处理当前节点
    }

看这个代码框架，你说什么情况下需要在后序位置写代码呢？

**如果当前节点要做的事情需要通过左右子树的计算结果推导出来，就要用到后序遍历** 。

下面就讲一个经典的算法问题，可以直观地体会到后序位置的妙用。这是力扣第 1373 题「[二叉搜索子树的最大键值和](<https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/>)」，函数签名如下：

CC++GoJavaJavaScriptPython
    
    
    int maxSumBST(TreeNode root);

更新时间：2026/03/14 00:17

Loading comments...
