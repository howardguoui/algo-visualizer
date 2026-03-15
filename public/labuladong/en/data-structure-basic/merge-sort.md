# Merge Sort and Binary Tree Postorder

> Source: https://labuladong.online/algo/en/data-structure-basic/merge-sort/
> Archived: labuladong.online

---

# Merge Sort and Binary Tree Postorder

Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Binary Tree Traversal](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Using Binary Tree Preorder Traversal: Quick Sort](</en/algo/data-structure-basic/quick-sort/>)

One-Sentence Summary

To understand merge sort, you need to combine it with [binary tree postorder traversal](</en/algo/data-structure-basic/binary-tree-traverse-basic/>): first use recursion to sort the left and right subarrays, then merge the two sorted arrays at the postorder position of the binary tree.

You can open this visual panel, click the full screen button , then keep clicking the line `merge(nums, lo, mid, hi);` to clearly see the recursive process and result of merge sort:

Algorithm Visualization

**Since this is a basic knowledge chapter, I will only talk about the main idea of merge sort.** The detailed code and how to use this algorithm will be in the later chapter [Merge Sort Explained and Applied](</en/algo/practice-in-action/merge-sort/>) after the binary tree section. I do not suggest beginners read it now.

To really understand merge sort, you need to be comfortable with recursion, and you also need the [two-pointer technique](</en/algo/essential-technique/linked-list-skills-summary/>) to merge two sorted arrays. So I suggest beginners follow the order of this site. By then, it will be much easier for you to understand the code of merge sort.

## Core Idea of Merge Sort

The summary at the beginning is still a bit abstract, but with the help of the previous chapter [Core Idea of Quick Sort](</en/algo/data-structure-basic/quick-sort/>), you should have some intuition.

Let’s compare it with quick sort. Then you can clearly see the difference between the two:

In quick sort, we first put one element in the correct position (sorted), then use recursion to sort the elements on the left and right of this element. In the end, the whole array becomes sorted. The code framework is like this:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
