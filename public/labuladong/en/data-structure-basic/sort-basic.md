# Key Metrics of Sorting Algorithms

> Source: https://labuladong.online/algo/en/data-structure-basic/sort-basic/
> Archived: labuladong.online

---

# Key Metrics of Sorting Algorithms

Prerequisites

Before reading this article, you should first learn:

  * [Array Basics](/en/algo/data-structure-basic/array-basic/)
  * [Intro to Time and Space Complexity](/en/algo/intro/complexity-basic/)


In practice, coding problems and interviews rarely ask you to implement a sorting algorithm from scratch. But for the sake of completeness, I'm dedicating a chapter to covering several common sorting algorithms—their principles, characteristics, time complexity, and code implementations—along with [visualization panels](/en/algo/intro/visualize/).

This article introduces the key metrics we use to evaluate sorting algorithms. When we dive into specific algorithms later, we'll analyze each one based on these metrics.

## ¶Time and Space Complexity

The first metric is, of course, time complexity and space complexity.

As discussed in [Intro to Time and Space Complexity](/en/algo/intro/complexity-basic/), for any algorithm, lower time and space complexity is always better.

## ¶Sort Stability

Stability is an important property of sorting algorithms. Here's a simple summary:

**If equal elements in a sequence retain their original relative order after sorting, the algorithm is called a "stable sort." Otherwise, it's an "unstable sort."**

If you're just sorting an `int` array, stability doesn't really matter. But when you're sorting more complex data structures, stable sorting can be a real advantage.

For example, say you have a bunch of order records already sorted by transaction date, and now you want to sort them by user ID so that orders from the same user are grouped together. This is where the difference between stable and unstable sorting shows up:

**If you use a stable sorting algorithm** , orders with the same user ID will still be sorted by transaction date after the sort:
    
    
       Date    UserID
    2020-02-01  1001
    2020-02-02  1001
    2020-02-03  1001
    
    2020-01-01  1002
    2020-01-02  1002
    2020-01-03  1002
    ...

Since the data was already sorted by date, a stable sort on user ID preserves the relative order of records with the same user ID, so the date ordering is maintained.

**If you use an unstable sorting algorithm** , the relative positions of orders with the same user ID might change, which means the date ordering within each user's orders could be lost—essentially wasting the previous date sort.

Stability is a pretty important property, so pay close attention to it when choosing a sorting algorithm to avoid unexpected results.

## ¶In-Place vs. Out-of-Place Sorting

**In-place sorting means the algorithm doesn't require extra auxiliary space—it only needs constant extra space and sorts the original array directly.**

The key point is whether extra space is needed, not whether a new array is returned. Here's what the distinction looks like in practice:

CC++GoJavaJavaScriptPython
    
    
    // non-in-place sorting
    void sort(int[] nums) {
        // requires an additional auxiliary array during sorting, consuming O(N) space
        int[] tmp = new int[nums.length];
    
        // sort the nums array
        for ...
    }
    
    // in-place sorting
    void sort(int[] nums) {
        // directly operate on nums, no additional auxiliary array needed, consuming O(1) space
        for ...
    }

:::

As you might expect, in-place sorting algorithms have a clear advantage when dealing with large datasets.

Those are the key metrics for evaluating sorting algorithms. In upcoming articles, I'll walk through several common sorting algorithms and analyze their strengths and weaknesses based on these metrics.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
