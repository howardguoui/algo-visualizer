# Quick Sort and Binary Tree Preorder

> Source: https://labuladong.online/algo/en/data-structure-basic/quick-sort/
> Archived: labuladong.online

---

# Quick Sort and Binary Tree Preorder

Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Problems with Selection Sort](/en/algo/data-structure-basic/select-sort/)
  * [Binary Tree Traversal Basics](/en/algo/data-structure-basic/binary-tree-traverse-basic/)


Summary in One Sentence

The core idea of quicksort can be understood by combining it with [Preorder Traversal of Binary Trees](/en/algo/data-structure-basic/binary-tree-traverse-basic/): Position an element correctly in the preorder position during tree traversal, then recursively position the remaining elements.

You can open this visualization panel, click the fullscreen button , and repeatedly click `let p = partition(nums, lo, hi)` to visually observe the recursive process and sorting effect of quicksort:

Algorithm Visualization

Does this one-sentence summary leave beginners puzzled? How does array sorting relate to binary trees?

This illustrates that computer logic differs from human logic.

When a typical person sorts an array, they usually maintain a `sortedIndex`, ensuring `[0, sortedIndex)` is sorted, gradually moving `sortedIndex` to the right until the entire array is sorted. This process involves overcoming various challenges, as discussed in [Selection Sort](/en/algo/data-structure-basic/select-sort/), [Bubble Sort](/en/algo/data-structure-basic/bubble-sort/), [Insertion Sort](/en/algo/data-structure-basic/insertion-sort/), and [Shell Sort](/en/algo/data-structure-basic/shell-sort/).

**However, the more efficient an algorithm is, the closer it aligns with computer logic, making it harder for the untrained to understand.** Having studied the earlier basic sorting algorithms, you should now realize this: sorting algorithms that are easy to understand and derive have complexities of O(N2)O(N^2)O(N2). Breaking through the O(N2)O(N^2)O(N2) barrier involves algorithms that seem beyond human conception.

If someone casually says, "Sorting an array is easy; just sort one element, then sort the remaining elements, and the whole array will be sorted," you might think they are a Trisolaran agent secretly residing on Earth. :)

Last updated: 03/14/2026, 12:17 AM

Loading comments...
