# 二叉搜索树心法（构造篇）

> Source: https://labuladong.online/zh/algo/data-structure/bst-part3/
> Archived: labuladong.online — 算法笔记

---

# 二叉搜索树心法（构造篇）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[96\. Unique Binary Search Trees](<https://leetcode.com/problems/unique-binary-search-trees/>)| [96\. 不同的二叉搜索树](<https://leetcode.cn/problems/unique-binary-search-trees/>)|   
[95\. Unique Binary Search Trees II](<https://leetcode.com/problems/unique-binary-search-trees-ii/>)| [95\. 不同的二叉搜索树 II](<https://leetcode.cn/problems/unique-binary-search-trees-ii/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)

之前写了两篇手把手刷 BST 算法题的文章，[第一篇](</zh/algo/data-structure/bst-part1/>) 讲了中序遍历对 BST 的重要意义，[第二篇](</zh/algo/data-structure/bst-part2/>) 写了 BST 的基本操作。

本文就来写手把手刷 BST 系列的第三篇，循序渐进地讲两道题，如何计算所有有效 BST。

第一道题是力扣第 96 题「[不同的二叉搜索树](<https://leetcode.cn/problems/unique-binary-search-trees/>)」：

**96\. 不同的二叉搜索树** |[力扣](<https://leetcode.cn/problems/unique-binary-search-trees/>)|[LeetCode](<https://leetcode.com/problems/unique-binary-search-trees/>)

给你一个整数 `n` ，求恰由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的 **二叉搜索树** 有多少种？返回满足题意的二叉搜索树的种数。

**示例 1：**

![diagram](https://labuladong.online/images/lc/uploads/2021/01/18/uniquebstn3.jpg)

```
输入：n = 3
输出：5
``` 

**示例 2：**

```
输入：n = 1
输出：1
``` 

**提示：**

  * `1 <= n <= 19`

题目来源：[力扣 96. 不同的二叉搜索树](<https://leetcode.cn/problems/unique-binary-search-trees/>)。

函数签名如下：

```java
int numTrees(int n);
``` 

这就是一个正宗的穷举问题，那么什么方式能够正确地穷举有效 BST 的数量呢？

我们前文说过，不要小看「穷举」，这是一件看起来简单但是比较有技术含量的事情，问题的关键就是不能数漏，也不能数多，你咋整？

之前 [手把手刷二叉树第一期](</zh/algo/data-structure/binary-tree-part1/>) 说过，二叉树算法的关键就在于明确根节点需要做什么，其实 BST 作为一种特殊的二叉树，核心思路也是一样的。
