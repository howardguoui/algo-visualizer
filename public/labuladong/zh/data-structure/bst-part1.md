# 二叉搜索树心法（特性篇）

> Source: https://labuladong.online/zh/algo/data-structure/bst-part1/
> Archived: labuladong.online — 算法笔记

---

# 二叉搜索树心法（特性篇）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[230\. Kth Smallest Element in a BST](<https://leetcode.com/problems/kth-smallest-element-in-a-bst/>)| [230\. 二叉搜索树中第K小的元素](<https://leetcode.cn/problems/kth-smallest-element-in-a-bst/>)|   
[538\. Convert BST to Greater Tree](<https://leetcode.com/problems/convert-bst-to-greater-tree/>)| [538\. 把二叉搜索树转换为累加树](<https://leetcode.cn/problems/convert-bst-to-greater-tree/>)|   
[1038\. Binary Search Tree to Greater Sum Tree](<https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/>)| [1038\. 从二叉搜索树到更大和树](<https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)

前文手把手带你刷二叉树已经写了 [思维篇](</zh/algo/data-structure/binary-tree-part1/>)，[构造篇](</zh/algo/data-structure/binary-tree-part2/>)，[后序篇](</zh/algo/data-structure/binary-tree-part3/>) 和 [序列化篇](</zh/algo/data-structure/serialize-and-deserialize-binary-tree/>)。

今天开启二叉搜索树（Binary Search Tree，后文简写 BST）的系列文章，手把手带你刷 BST。

首先，BST 的特性大家应该都很熟悉了（详见基础知识章节的 [二叉树基础](</zh/algo/data-structure-basic/binary-tree-basic/>)）：

1、对于 BST 的每一个节点 `node`，左子树节点的值都比 `node` 的值要小，右子树节点的值都比 `node` 的值大。

2、对于 BST 的每一个节点 `node`，它的左侧子树和右侧子树都是 BST。

二叉搜索树并不算复杂，但我觉得它可以算是数据结构领域的半壁江山，直接基于 BST 的数据结构有 AVL 树，红黑树等等，拥有了自平衡性质，可以提供 logN 级别的增删查改效率；还有 B+ 树，线段树等结构都是基于 BST 的思想来设计的。

**从做算法题的角度来看 BST，除了它的定义，还有一个重要的性质：BST 的中序遍历结果是有序的（升序）** 。

也就是说，如果输入一棵 BST，以下代码可以将 BST 中每个节点的值升序打印出来：

```java
void traverse(TreeNode root) {
    if (root == null) return;
    traverse(root.left);
    // 中序遍历代码位置
    print(root.val);
    traverse(root.right);
}
``` 

那么根据这个性质，我们来做两道算法题。
