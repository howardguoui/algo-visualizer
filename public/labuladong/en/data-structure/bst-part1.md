# Binary Search Tree in Action (In-order)

> Source: https://labuladong.online/algo/en/data-structure/bst-part1/
> Archived: labuladong.online

---

# Binary Search Tree in Action (In-order)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[230\. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)|   
[538\. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree/)|   
[1038\. Binary Search Tree to Greater Sum Tree](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/)|   
  
Prerequisites

Before reading this article, you need to study:

  * [Binary Tree Basics](/en/algo/data-structure-basic/binary-tree-basic/)
  * [DFS/BFS Traversal of Binary Trees](/en/algo/data-structure-basic/binary-tree-traverse-basic/)


In previous articles, we covered binary trees step by step. We wrote [Thinking](/en/algo/data-structure/binary-tree-part1/), [Construction](/en/algo/data-structure/binary-tree-part2/), [Postorder](/en/algo/data-structure/binary-tree-part3/), and [Serialization](/en/algo/data-structure/serialize-and-deserialize-binary-tree/) articles.

Today, we start a series on Binary Search Tree (BST). I will guide you through solving BST problems step by step.

First, you should be familiar with the properties of BST (see [Binary Tree Basics](/en/algo/data-structure-basic/binary-tree-basic/)):

  1. For any node `node` in a BST, all nodes in the left subtree are smaller than `node`, and all nodes in the right subtree are larger than `node`.

  2. For any node `node`, its left and right subtrees are also BSTs.


Binary search trees are not very complex, but they are very important in data structures. Data structures like AVL tree and Red-Black tree are based on BST and have self-balancing properties. These provide logN time for insertion, deletion, search, and update. B+ trees, segment trees, and other structures are also designed with BST ideas.

**From the perspective of solving algorithm problems, besides its definition, BST has another key property: the result of its inorder traversal is sorted in ascending order.**

This means, if you have a BST, the following code can print all node values in ascending order:

CC++GoJavaJavaScriptPython
    
    
    void traverse(TreeNode root) {
        if (root == null) return;
        traverse(root.left);
        // inorder traversal code position
        print(root.val);
        traverse(root.right);
    }

Now, based on this property, let's solve two algorithm problems.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
