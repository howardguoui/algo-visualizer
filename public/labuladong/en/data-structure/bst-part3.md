# Binary Search Tree in Action (Construction)

> Source: https://labuladong.online/algo/en/data-structure/bst-part3/
> Archived: labuladong.online

---

# Binary Search Tree in Action (Construction)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[96\. Unique Binary Search Trees](<https://leetcode.com/problems/unique-binary-search-trees/>)|   
[95\. Unique Binary Search Trees II](<https://leetcode.com/problems/unique-binary-search-trees-ii/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Binary Tree Basics](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [DFS/BFS Traversal of Binary Trees](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)

Previously, I wrote two articles walking you through BST algorithm problems. The [first one](</en/algo/data-structure/bst-part1/>) covered why inorder traversal is so important for BSTs, and the [second one](</en/algo/data-structure/bst-part2/>) went over basic BST operations.

This article is the third installment in the BST series. We'll work through two problems step by step: how to calculate all valid BSTs.

The first problem is LeetCode #96 "[Unique Binary Search Trees](<https://leetcode.com/problems/unique-binary-search-trees/>)":

**96\. Unique Binary Search Trees** |[LeetCode](<https://leetcode.com/problems/unique-binary-search-trees/>)

Given an integer `n`, return _the number of structurally unique**BST'** s (binary search trees) which has exactly _`n` _nodes of unique values from_ `1` _to_ `n`.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2021/01/18/uniquebstn3.jpg)

```
Input: n = 3
Output: 5
``` 

**Example 2:**

```
Input: n = 1
Output: 1
``` 

**Constraints:**

  * `1 <= n <= 19`

The problem is from [LeetCode 96. Unique Binary Search Trees](<https://leetcode.com/problems/unique-binary-search-trees/>).

The function signature is:

```java
int numTrees(int n);
``` 

This is a classic enumeration problem. So how do we correctly enumerate the number of valid BSTs?

As I've mentioned before, don't underestimate enumeration—it looks simple but actually requires real skill. The key challenge is counting exactly right: no duplicates, no omissions. How do you pull that off?

In [Binary Tree Series, Part 1](</en/algo/data-structure/binary-tree-part1/>), I explained that the key to binary tree algorithms is figuring out what the root node needs to do. Since a BST is just a special type of binary tree, the core idea is exactly the same.

Last updated: 03/14/2026, 12:17 AM
