# 拓展：最近公共祖先系列解题框架

> Source: https://labuladong.online/zh/algo/practice-in-action/lowest-common-ancestor-summary/
> Archived: labuladong.online — 算法笔记

---

# 拓展：最近公共祖先系列解题框架

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[236\. Lowest Common Ancestor of a Binary Tree](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/>)| [236\. 二叉树的最近公共祖先](<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/>)|   
[1676\. Lowest Common Ancestor of a Binary Tree IV](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/>)🔒| [1676\. 二叉树的最近公共祖先 IV](<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iv/>)🔒|   
[1644\. Lowest Common Ancestor of a Binary Tree II](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/>)🔒| [1644\. 二叉树的最近公共祖先 II](<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-ii/>)🔒|   
[235\. Lowest Common Ancestor of a Binary Search Tree](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/>)| [235\. 二叉搜索树的最近公共祖先](<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/>)|   
[1650\. Lowest Common Ancestor of a Binary Tree III](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/>)🔒| [1650\. 二叉树的最近公共祖先 III](<https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iii/>)🔒|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)

如果说笔试的时候经常遇到各种动归回溯这类稍有难度的题目，那么面试会倾向于一些比较经典的问题，难度不算大，而且也比较实用。

本文就用 Git 引出一个经典的算法问题：最近公共祖先（Lowest Common Ancestor，简称 LCA）。

`git pull` 这个命令我们经常会用，它默认是使用 `merge` 方式将远端别人的修改拉到本地；如果带上参数 `git pull -r`，就会使用 `rebase` 的方式将远端修改拉到本地。

这二者最直观的区别就是：`merge` 方式合并的分支会看到很多「分叉」，而 `rebase` 方式合并的分支就是一条直线。但无论哪种方式，如果存在冲突，Git 都会检测出来并让你手动解决冲突。

那么问题来了，Git 是如何检测两条分支是否存在冲突的呢？

以 `rebase` 命令为例，比如下图的情况，我站在 `dev` 分支执行 `git rebase master`，然后 `dev` 就会接到 `master` 分支之上：

![diagram](https://labuladong.online/images/algo/lca/1.jpeg)

这个过程中，Git 是这么做的：

首先，找到这两条分支的最近公共祖先 `LCA`，然后从 `master` 节点开始，重演 `LCA` 到 `dev` 几个 `commit` 的修改，如果这些修改和 `LCA` 到 `master` 的 `commit` 有冲突，就会提示你手动解决冲突，最后的结果就是把 `dev` 的分支完全接到 `master` 上面。

那么，Git 是如何找到两条不同分支的最近公共祖先的呢？这就是一个经典的算法问题了，下面我来由浅入深讲一讲。
