# Binary Tree in Action (Traversal)

> Source: https://labuladong.online/algo/en/data-structure/binary-tree-part1/
> Archived: labuladong.online

---

# Binary Tree in Action (Traversal)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[226\. Invert Binary Tree](<https://leetcode.com/problems/invert-binary-tree/>)|   
[116\. Populating Next Right Pointers in Each Node](<https://leetcode.com/problems/populating-next-right-pointers-in-each-node/>)|   
[114\. Flatten Binary Tree to Linked List](<https://leetcode.com/problems/flatten-binary-tree-to-linked-list/>)|   
  
Prerequisites

Before reading this article, you should first study:

  * [Basics of Binary Tree Structure](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Binary Tree DFS/BFS Traversal](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Binary Tree Essentials (Guiding Principles)](</en/algo/essential-technique/binary-tree-summary/>)

This article continues from [Binary Tree Essentials (Guiding Principles)](</en/algo/essential-technique/binary-tree-summary/>). Let’s first review the key points summarized in the previous article:

Note

There are two main thinking patterns for solving binary tree problems:

**1\. Can you get the answer by traversing the binary tree once?**  
If yes, use a `traverse` function with external variables—this is called the "traversal" approach.

**2\. Can you define a recursive function that derives the answer to the original problem using answers from its subproblems (subtrees)?**  
If yes, write out this recursive function and make full use of its return value—this is called the "problem decomposition" approach.

No matter which approach you use, you should always think:

**If you isolate a single tree node, what does it need to do? At what point (preorder/inorder/postorder) should it do it?**  
You don’t need to worry about other nodes, as the recursive function will perform the same operation on all of them.

This article uses a few simple examples to help you practice these key principles, and to understand the differences and connections between the "traversal" and "problem decomposition" approaches.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
