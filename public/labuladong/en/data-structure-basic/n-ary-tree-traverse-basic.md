# N-ary Tree Recursive/Level Traversal

> Source: https://labuladong.online/algo/en/data-structure-basic/n-ary-tree-traverse-basic/
> Archived: labuladong.online

---

# N-ary Tree Recursive/Level Traversal

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[589\. N-ary Tree Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/)|   
[590\. N-ary Tree Postorder Traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)|   
[429\. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)|   
  
Prerequisite

Before reading this article, you should first learn:

  * [Recursive and Level Order Traversal of Binary Tree](/en/algo/data-structure-basic/binary-tree-traverse-basic/)


In One Sentence

A multi-way tree is an extension of the [binary tree](/en/algo/data-structure-basic/binary-tree-basic/). A binary tree is a special type of multi-way tree.

Traversal of a multi-way tree is an extension of [binary tree traversal](/en/algo/data-structure-basic/binary-tree-traverse-basic/).

A forest is a collection of multiple multi-way trees. A single multi-way tree is a special kind of forest.

A node in a binary tree looks like this. Each node has two children:

CC++GoJavaJavaScriptPython
    
    
    class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
    }

A node in a multi-way tree looks like this. Each node can have any number of children:

CC++GoJavaJavaScriptPython
    
    
    class Node {
        int val;
        List<Node> children;
    }

That's the only difference.

## ¶Forest

Let me explain what "forest" means. Later, when we talk about the [Union Find algorithm](/en/algo/data-structure-basic/union-find-basic/), this concept will be useful.

As the name suggests, **a forest is a collection of multiple multi-way trees (even a single tree is a special kind of forest)**. In code, it is just a list of the root nodes of several multi-way trees, like this:
    
    
    List<Node> forest;

You just need to run DFS or BFS on each root node, and you will visit all the nodes in the forest.

In the union-find algorithm, we often keep the root nodes of several multi-way trees. These roots together form a forest.

Now, let's talk about traversal of a multi-way tree. Just like a binary tree, there are only two types: recursive traversal (DFS) and level order traversal (BFS).

## ¶Recursive Traversal (DFS)

Let's compare the frameworks for traversing binary trees and multi-way trees:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
