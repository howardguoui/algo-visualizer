# Lowest Common Ancestor All in One

> Source: https://labuladong.online/algo/en/practice-in-action/lowest-common-ancestor-summary/
> Archived: labuladong.online

---

# Lowest Common Ancestor All in One

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[236\. Lowest Common Ancestor of a Binary Tree](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/>)|   
[1676\. Lowest Common Ancestor of a Binary Tree IV](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/>)🔒|   
[1644\. Lowest Common Ancestor of a Binary Tree II](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/>)🔒|   
[235\. Lowest Common Ancestor of a Binary Search Tree](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/>)|   
[1650\. Lowest Common Ancestor of a Binary Tree III](<https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/>)🔒|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Basics of Binary Tree Structure](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [DFS/BFS Traversal of Binary Trees](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Binary Tree Essentials (Outline)](</en/algo/essential-technique/binary-tree-summary/>)

In written exams, you may often encounter problems with some difficulty, like dynamic programming and backtracking. However, interviews tend to focus on more classic problems, which are not too difficult and quite practical.

This article introduces a classic algorithm problem through Git: the Lowest Common Ancestor (LCA).

The `git pull` command, which is commonly used, defaults to using the `merge` method to bring remote changes locally. If you add the parameter `git pull -r`, it uses the `rebase` method to incorporate remote changes locally.

The most straightforward difference between the two is that with `merge`, you will see many "branches," while with `rebase`, the branch is a straight line. Regardless of the method, if there are conflicts, Git will detect them and prompt you to resolve the conflicts manually.

This leads to the question: how does Git detect conflicts between two branches?

Take the `rebase` command as an example. In the situation shown below, I execute `git rebase master` on the `dev` branch, and then `dev` is applied on top of the `master` branch:

![diagram](https://labuladong.online/images/algo/lca/1.jpeg)

During this process, Git operates as follows:

First, it locates the Lowest Common Ancestor (LCA) of the two branches. Then, starting from the `master` node, it replays the changes from `LCA` to `dev`. If these changes conflict with the `LCA` to `master` commits, Git will prompt you to resolve the conflicts manually. The final result is that the `dev` branch is fully applied on top of `master`.

How does Git find the Lowest Common Ancestor of two different branches? This is a classic algorithm problem, which I will explain step by step below.

Last updated: 03/14/2026, 12:17 AM
