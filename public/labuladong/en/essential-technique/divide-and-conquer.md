# Divide and Conquer Principles and Techniques

> Source: https://labuladong.online/algo/en/essential-technique/divide-and-conquer/
> Archived: labuladong.online

---

# Divide and Conquer Principles and Techniques

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[23\. Merge k Sorted Lists](<https://leetcode.com/problems/merge-k-sorted-lists/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Binary Tree Traversal Framework](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [N-ary Tree Structure and Traversal Framework](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

In One Sentence

The idea of divide and conquer is very common. But not every problem gets faster with divide and conquer. For some problems, divide and conquer can improve efficiency.

Why does divide and conquer make some problems faster? You can use the formula for the perfect square to understand:

(a+b)2=a2+2ab+b2>=a2+b2(a+b)^2 = a^2 + 2ab + b^2 >= a^2 + b^2(a+b)2=a2+2ab+b2>=a2+b2

Suppose your original problem size is N=a+bN=a+bN=a+b. If you solve it with an O(N2)O(N^2)O(N2) algorithm, the time complexity is O((a+b)2)O((a+b)^2)O((a+b)2).

But if you split the problem into aaa and bbb, then solve them separately using the O(N2)O(N^2)O(N2) algorithm, the complexity is O(a2+b2)<O((a+b)2)O(a^2 + b^2) < O((a+b)^2)O(a2+b2)<O((a+b)2).

In short, only algorithms with polynomial time complexity are likely to get faster using divide and conquer.

This article mainly explains the core idea and techniques of divide and conquer algorithms.

**Divide and Conquer Algorithm** and **Divide and Conquer Idea** are not the same. The following examples will make this clear.

## Divide and Conquer Idea

Divide and conquer idea is a broad concept. In this tutorial, it is also called the idea of "breaking down problems".

The idea of divide and conquer is to break down a problem into smaller subproblems, solve each subproblem, and then merge the results to get the answer to the original problem. This is very common in recursive algorithms.

For example, the recursive way to solve the Fibonacci sequence breaks `fib(n)` into two subproblems, `fib(n-1)` and `fib(n-2)`, then combines their answers:

```
int fib(int n) {
    // base case
    if (n == 0 || n == 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
``` 

A simple binary tree problem, such as counting the number of nodes in a binary tree:

```
// Given a binary tree, count how many nodes in the tree.
int count(TreeNode root) {
    // base case
    if (root == null) {
        return 0;
    }
    // count nodes of left subtree and right subtree
    int leftCount = count(root.left);
    int rightCount = count(root.right);

    // sum up nodes of left subtree, right subtree and current node
    return leftCount + rightCount + 1;
}
``` 

This solution also follows the divide-and-conquer approach: you break down the total number of nodes in the entire tree (the original problem) into the number of nodes in the left subtree and the right subtree (subproblems). You then recursively calculate the node counts for the left and right subtrees, and finally derive the total node count from these subproblem solutions.

For example, does [Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>) fall under the divide-and-conquer paradigm?

Yes, because all dynamic programming algorithms decompose a large problem into smaller, structurally similar subproblems, combining the optimal solutions of these subproblems to solve the original problem. This process often includes special optimization techniques.

Many more examples can be cited. In fact, I have summarized in [Binary Tree Mastery (Outline)](</en/algo/essential-technique/binary-tree-summary/>) that **recursive algorithms follow two main approaches: traversal or problem decomposition (divide-and-conquer)**.

Traversal-based algorithms are typically represented by [Backtracking Algorithms](</en/algo/essential-technique/backtrack-framework/>). Therefore, apart from backtracking, other recursive algorithms can be categorized under the problem decomposition approach (divide-and-conquer).

Given this, "divide-and-conquer" plays a significant role in recursive algorithms. When we talk about "divide-and-conquer algorithms," what do we specifically mean? Can we say that all the recursive algorithms mentioned above are "divide-and-conquer algorithms"? Actually, not quite.

## Divide-and-Conquer Algorithms

Narrowly defined, divide-and-conquer algorithms are recursive algorithms that apply the divide-and-conquer principle, but they have one distinctive feature that the previously listed algorithms lack:

**The time complexity after decomposing the problem is lower than solving it directly without decomposition**.

Only algorithms with this characteristic are referred to as "divide-and-conquer algorithms".

The algorithms mentioned earlier inherently require decomposition for their solutions; there's no direct method to solve them otherwise. Hence, we say they use the divide-and-conquer principle but aren't classified as divide-and-conquer algorithms.

For instance, [Bucket Sort](</en/algo/data-structure-basic/bucket-sort/>) divides an array into several buckets, sorts each bucket using insertion sort, and then merges the sorted buckets, reducing the time complexity to O(n)O(n)O(n).

Directly using [Insertion Sort](</en/algo/data-structure-basic/insertion-sort/>) has a complexity of O(n2)O(n^2)O(n2). By decomposing the problem and applying insertion sort on each bucket, the overall complexity drops to O(n)O(n)O(n). This qualifies as a divide-and-conquer algorithm.

**So why does dividing and conquering reduce complexity? If all problems were solved using divide-and-conquer, would they always result in lower complexity?**

Let’s delve deeper into when divide-and-conquer reduces complexity, when it doesn’t, and the underlying principles.

Last updated: 03/14/2026, 12:17 AM
