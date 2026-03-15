# Segment Tree Basics and Visualization

> Source: https://labuladong.online/algo/en/data-structure-basic/segment-tree-basic/
> Archived: labuladong.online

---

# Segment Tree Basics and Visualization

Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Basics and Common Types of Binary Trees](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Recursive/Level Order Traversal of Binary Trees](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)

Summary in One Sentence

A segment tree is a derivative of the [binary tree structure](</en/algo/data-structure-basic/binary-tree-basic/>) used to efficiently solve problems of interval queries and dynamic modifications in arrays.

A segment tree can query the aggregated value of interval elements of **any length** with a time complexity of O(log⁡N)O(\log N)O(logN), and perform dynamic modifications on interval elements of **any length** with a time complexity of O(log⁡N)O(\log N)O(logN), where NNN is the number of elements in the array.

Considering this is the first chapter, I do not intend to delve into the implementation details of the segment tree. Specific codes will be introduced in the subsequent data structure design chapters. However, here you can use a visual panel to intuitively understand some variations of the segment tree.

Firstly, the [basic segment tree](</en/algo/data-structure/segment-tree-implement/>) includes interval query `query` and **single point update** `update` methods. You can open this visual panel, click the code step by step, and observe the execution process of the `query` and `update` methods:

Algorithm Visualization

You can see that the leaf nodes of this binary tree are the elements in the array, and the non-leaf nodes are the aggregated information of the index intervals (segments), which is where the name "segment tree" comes from.

However, this segment tree has a problem: it requires the `nums` array for construction. If we want to perform interval operations on a very long range, such as `[0, 10^9]`, we would need 10910^9109 space complexity to construct the segment tree, which is very wasteful.

The [implementation of a dynamic segment tree](</en/algo/data-structure/segment-tree-dynamic/>) uses the "dynamic node opening" technique to optimize the memory overhead of the segment tree for sparse data. You can open this visual panel, click the code step by step, and observe the dynamic construction process of the segment tree:

Algorithm Visualization

The above implementations only support "single point updates," but a more general requirement is interval updates, such as updating all elements in the index interval `[i, j]` to `val`. The [implementation of a lazy update segment tree](</en/algo/data-structure/segment-tree-lazy-update/>) uses the "lazy update" technique to add `rangeAdd/rangeUpdate` methods to the segment tree, allowing interval updates of **any length** to be completed in O(log⁡N)O(\log N)O(logN) time complexity.

You can open this visual panel, click the code step by step, and observe the operation process of the lazy update segment tree. The `rangeUpdate` method does not need to immediately update all leaf nodes within the interval when updating an interval. Instead, it buffers the update value in a non-leaf node, and only propagates the update value to the leaf nodes gradually when the `query` method is called for interval queries:

Algorithm Visualization

Next, we will introduce the application scenarios and core principles of the segment tree.

## Application Scenarios

In [Selection Sort](</en/algo/data-structure-basic/select-sort/>), we attempt to solve a requirement, which is to calculate the minimum value from index `i` to the end of the `nums` array.

We propose an optimization attempt using a `suffixMin` array, i.e., precomputing a `suffixMin` array such that `suffixMin[i] = min(nums[i..])`, allowing the minimum value of `nums[i..]` to be queried in O(1)O(1)O(1) time:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
