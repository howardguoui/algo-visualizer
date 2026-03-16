# 多叉树的递归/层序遍历

> Source: https://labuladong.online/zh/algo/data-structure-basic/n-ary-tree-traverse-basic/
> Archived: labuladong.online — 算法笔记

---

# 多叉树的递归/层序遍历

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[589\. N-ary Tree Preorder Traversal](<https://leetcode.com/problems/n-ary-tree-preorder-traversal/>)| [589\. N 叉树的前序遍历](<https://leetcode.cn/problems/n-ary-tree-preorder-traversal/>)|   
[590\. N-ary Tree Postorder Traversal](<https://leetcode.com/problems/n-ary-tree-postorder-traversal/>)| [590\. N 叉树的后序遍历](<https://leetcode.cn/problems/n-ary-tree-postorder-traversal/>)|   
[429\. N-ary Tree Level Order Traversal](<https://leetcode.com/problems/n-ary-tree-level-order-traversal/>)| [429\. N 叉树的层序遍历](<https://leetcode.cn/problems/n-ary-tree-level-order-traversal/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树的递归/层序遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)


一句话总结

多叉树结构就是 [二叉树结构](</zh/algo/data-structure-basic/binary-tree-basic/>) 的延伸，二叉树是特殊的多叉树。

多叉树的遍历就是 [二叉树遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>) 的延伸。

森林是指多个多叉树的集合，单独一棵多叉树是一个特殊的森林。

二叉树的节点长这样，每个节点有两个子节点：

CC++GoJavaJavaScriptPython
    
    
    class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
    }

多叉树的节点长这样，每个节点有任意个子节点：

CC++GoJavaJavaScriptPython
    
    
    class Node {
        int val;
        List<Node> children;
    }

就这点区别，其他没了。

## ¶森林

这里介绍一下「森林」这个名词，后面讲到 [Union Find 并查集算法](</zh/algo/data-structure-basic/union-find-basic/>) 时，会用到这个概念。

顾名思义，**森林就是多个多叉树的集合（单独一棵多叉树也是一个特殊的森林）** ，用代码表示就是多个多叉树的根节点列表，类似这样：
    
    
    List<Node> forest;

只需对每个根节点分别进行 DFS/BFS 遍历，即可遍历森林的所有节点。

在并查集算法中，我们会同时持有多棵多叉树的根节点，那么这些根节点的集合就是一个森林。

接下来说下多叉树的遍历，和二叉树一样，也就递归遍历（DFS）和层序遍历（BFS）两种。

## ¶递归遍历（DFS）

对比二叉树的遍历框架看多叉树的遍历框架吧：

更新时间：2026/03/14 00:17

Loading comments...
