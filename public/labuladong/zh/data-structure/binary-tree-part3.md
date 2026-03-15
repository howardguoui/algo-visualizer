# 二叉树心法（后序篇）

> Source: https://labuladong.online/zh/algo/data-structure/binary-tree-part3/
> Archived: labuladong.online — 算法笔记

---

# 二叉树心法（后序篇）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[652\. Find Duplicate Subtrees](<https://leetcode.com/problems/find-duplicate-subtrees/>)| [652\. 寻找重复的子树](<https://leetcode.cn/problems/find-duplicate-subtrees/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)

本文是承接 [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>) 的第四篇文章，主要讲二叉树后序位置的妙用，复述下前文关于后序遍历的描述：

> 前序位置的代码只能从函数参数中获取父节点传递来的数据，而后序位置的代码不仅可以获取参数数据，还可以获取到子树通过函数返回值传递回来的数据。
> 
> **那么换句话说，一旦你发现题目和子树有关，那大概率要给函数设置合理的定义和返回值，在后序位置写代码了** 。

多说无益，我们直接看题，这是力扣第 652 题「[寻找重复的子树](<https://leetcode.cn/problems/find-duplicate-subtrees/>)」：

**652\. 寻找重复的子树** |[力扣](<https://leetcode.cn/problems/find-duplicate-subtrees/>)|[LeetCode](<https://leetcode.com/problems/find-duplicate-subtrees/>)

给你一棵二叉树的根节点 `root` ，返回所有 **重复的子树** 。

对于同一类的重复子树，你只需要返回其中任意 **一棵** 的根结点即可。

如果两棵树具有**相同的结构** 和 **相同的结点值** ，则认为二者是 **重复** 的。

**示例 1：**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e1.jpg)

```
输入：root = [1,2,3,4,null,2,4,null,null,4]
输出：[[2,4],[4]]
``` 

**示例 2：**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e2.jpg)

```
输入：root = [2,1,1]
输出：[[1]]
``` 

**示例 3：**

**![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e33.jpg)**

```
输入：root = [2,2,2,3,null,3,null]
输出：[[2,3],[3]]
``` 

**提示：**

  * 树中的结点数在 `[1, 5000]` 范围内。
  * `-200 <= Node.val <= 200`

题目来源：[力扣 652. 寻找重复的子树](<https://leetcode.cn/problems/find-duplicate-subtrees/>)。

```java
// 函数签名如下
List<TreeNode> findDuplicateSubtrees(TreeNode root);
``` 

我来简单解释下题目，输入是一棵二叉树的根节点 `root`，返回的是一个列表，里面装着若干个二叉树节点，这些节点对应的子树在原二叉树中是存在重复的。

说起来比较绕，举例来说，比如输入如下的二叉树：

![diagram](https://labuladong.online/images/algo/binary-tree-iii/1.png)

首先，节点 4 本身可以作为一棵子树，且二叉树中有多个节点 4：

![diagram](https://labuladong.online/images/algo/binary-tree-iii/2.png)

类似的，还存在两棵以 2 为根的重复子树：

![diagram](https://labuladong.online/images/algo/binary-tree-iii/3.png)

那么，我们返回的 `List` 中就应该有两个 `TreeNode`，值分别为 4 和 2（具体是哪个节点都无所谓）。
