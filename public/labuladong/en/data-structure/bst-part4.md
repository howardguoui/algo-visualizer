# Binary Search Tree in Action (Post-order)

> Source: https://labuladong.online/algo/en/data-structure/bst-part4/
> Archived: labuladong.online

---

# Binary Search Tree in Action (Post-order)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1373\. Maximum Sum BST in Binary Tree](<https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/>)|   
  
Prerequisite Knowledge

Before reading this article, you need to learn:

  * [Basics of Binary Tree Structure](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [DFS/BFS Traversal of Binary Trees](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Binary Tree Key Points (Summary)](</en/algo/essential-technique/binary-tree-summary/>)

This article is the fifth part following [Binary Tree Key Points (Summary)](</en/algo/essential-technique/binary-tree-summary/>). It mainly talks about the power of post-order in binary trees. Here is a summary about post-order traversal from the previous article:

> In pre-order, the code can only get data passed from the parent node through function parameters. In post-order, the code can not only get parameter data, but also the results returned by the left and right subtrees.
> 
> **In other words, if the problem is related to subtrees, you should define your function carefully and write code in the post-order position.**

Actually, binary tree problems are not hard. They are just about using pre-order, in-order, and post-order frameworks. As long as you arrange what each node should do, you can leave the rest to recursion.

But for some problems, different traversal orders have different time complexity. Especially code written in post-order can sometimes make your algorithm much faster.

Let's look again at the post-order traversal framework:

```java
void traverse(TreeNode root) {
    traverse(root.left);
    traverse(root.right);
    // the position of the post-order code
    // process the current node here
}
``` 

Based on this framework, when should you write code in the post-order position?

**If what the current node needs to do depends on the results of its left and right subtrees, you should use post-order traversal.**

Next, let's look at a classic algorithm problem to see the power of post-order. This is LeetCode 1373: [Maximum Sum BST in Binary Tree](<https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/>). The function signature is:

```java
int maxSumBST(TreeNode root);
``` 

Last updated: 03/14/2026, 12:17 AM
