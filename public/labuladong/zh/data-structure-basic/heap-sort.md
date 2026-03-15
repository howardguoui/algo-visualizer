# 二叉堆结构的运用：堆排序

> Source: https://labuladong.online/zh/algo/data-structure-basic/heap-sort/
> Archived: labuladong.online — 算法笔记

---

# 二叉堆结构的运用：堆排序

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)| [912\. 排序数组](<https://leetcode.cn/problems/sort-an-array/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉堆基础](</zh/algo/data-structure-basic/binary-heap-basic/>)
  * [二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>)

一句话总结

堆排序是从 [二叉堆结构](</zh/algo/data-structure-basic/binary-heap-basic/>) 衍生出来的排序算法，复杂度为 O(Nlog⁡N)O(N \log N)O(NlogN)。堆排序主要分两步，第一步是在待排序数组上原地创建二叉堆（Heapify），然后进行原地排序（Sort）。

你可以打开下方可视化面板，点击跳转到 `let heap = ...` 这部分代码可以看到数组被抽象成完全二叉树；不断点击 `Heap.swim` 这部分代码，可以看到原地建堆的过程；点击 `Heap.sink` 这部分代码，可以看到原地排序的过程。

学习堆排序算法**必须** 掌握二叉堆结构原理，否则可能完全无法理解排序过程。

算法可视化

前文 [二叉堆基础](</zh/algo/data-structure-basic/binary-heap-basic/>) 介绍过二叉堆结构，[二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>) 利用二叉堆结构实现了一个 `SimpleMinPQ` 优先级队列，插入队列的元素会按照从小到大的顺序取出。

本文将介绍堆排序算法，它是基于二叉堆性质衍生出来的一种全新排序算法，非常优雅和高效。

首先，我要复述一下二叉堆实现优先级队列的几个关键原理，**如果你有任何不理解的地方，务必回去复习前文，否则无法理解堆排序** 。

1、二叉堆（优先级队列）底层是用数组实现的，但是逻辑上是一棵完全二叉树，主要依靠 `swim, sink` 方法来维护堆的性质。

2、优先级队列可以分为小顶堆和大顶堆，小顶堆会将整个堆中最小的元素维护在堆顶，大顶堆会将整个堆中最大的元素维护在堆顶。

3、优先级队列插入元素时，首先把元素追加到二叉堆底部，然后调用 `swim` 方法把该元素上浮到合适的位置，时间复杂度是 O(log⁡N)O(\log N)O(logN)。

4、优先级队列删除堆顶元素时，首先把堆底的最后一个元素交换到堆顶作为新的堆顶元素，然后调用 `sink` 方法把这个新的堆顶元素下沉到合适的位置，时间复杂度是 O(log⁡N)O(\log N)O(logN)。

那么最简单的堆排序算法思路就是直接利用优先级队列，把所有元素塞到优先级队列里面，然后再取出来，不就完成排序了吗？

```java
// 直接利用优先级队列对数组从小到大排序
void sort(int[] nums) {
    // 创建一个从小到大排序元素的小顶堆
    SimpleMinPQ pq = new SimpleMinPQ(nums.length);
    // 先把所有元素插入到优先级队列中
    for (int num : nums) {
        // push 操作会自动构建二叉堆，时间复杂度为 O(logN)
        pq.push(num);
    }
    // 再把所有元素取出来，就是从小到大排序的结果
    for (int i = 0; i < nums.length; i++) {
        // pop 操作从堆顶弹出二叉堆堆中最小的元素，时间复杂度为 O(logN)
        nums[i] = pq.pop();
    }
}
``` 

因为优先级队列的 `push, pop` 方法的复杂度都是 O(log⁡N)O(\log N)O(logN)，所以整个排序的时间复杂度是 O(Nlog⁡N)O(N \log N)O(NlogN)，其中 `N` 是输入数组的长度。

这个思路可以得到正确的排序结果，但空间复杂度是 O(N)O(N)O(N)，因为我们创建的这个优先级队列是一个额外的数据结构，它的底层使用了一个数组来存储元素。

所以，堆排序要解决的问题是，**不要使用额外的辅助空间，直接在原数组上进行`sink, swim` 操作**，在 O(Nlog⁡N)O(N \log N)O(NlogN) 的时间内完成排序。

堆排序的两个关键步骤

1、原地建堆（Heapify）：直接把待排序数组原地变成一个二叉堆。

2、排序（Sort）：将元素不断地从堆中取出，最终得到有序的结果。

你不妨自己思考几分钟，对比一下优先级队列增删元素的过程，其实利用 `swim, sink` 方法原地实现这两步并不难，应该可以独立思考出来。

在具体讲解堆排序代码实现之前，我先把二叉堆的 `swim, sink` 方法和配套的工具函数写出来，因为后文我会带你逐步优化堆排序的代码，就不重复实现这些函数了。

这些函数就是从 [二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>) 中的优先级队列实现里抠出来的，把数组作为函数参数传入，其他的逻辑完全一样：
