# Shell Sort - Better than O(N^2)

> Source: https://labuladong.online/algo/en/data-structure-basic/shell-sort/
> Archived: labuladong.online

---

# Shell Sort - Better than O(N^2)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](https://leetcode.com/problems/sort-an-array/)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Problems with Selection Sort](/en/algo/data-structure-basic/select-sort/)
  * [Reverse Thinking: Insertion Sort](/en/algo/data-structure-basic/insertion-sort/)


Summary in One Sentence

Shell Sort is a simple improvement based on [Insertion Sort](/en/algo/data-structure-basic/insertion-sort/). It increases the local order of an array by preprocessing, and breaks the O(N2)O(N^2)O(N2) time complexity of insertion sort.

You can open the visualization panel, click the play button, and then use the speed up or slow down buttons to adjust the speed. This helps you clearly see how Shell Sort works:

Algorithm Visualization

I have to admit, the idea behind Shell Sort is not easy to come up with. I first learned about this algorithm in "Algorithms 4", and I was surprised how this simple trick can make insertion sort much faster.

First, let's make clear what an **`h`-sorted array** is.

## ¶`h`-Sorted Array

An array is called `h`-sorted if every group of elements that are `h` apart (that is, elements where the gap between them is `h-1`) are sorted.

This idea is hard to explain in words, so let's look at an example. When `h=3`, a `3`-sorted array looks like this:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
