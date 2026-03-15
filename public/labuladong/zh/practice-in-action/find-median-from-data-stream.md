# 拓展：两个二叉堆实现中位数算法

> Source: https://labuladong.online/zh/algo/practice-in-action/find-median-from-data-stream/
> Archived: labuladong.online — 算法笔记

---

# 拓展：两个二叉堆实现中位数算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[295\. Find Median from Data Stream](<https://leetcode.com/problems/find-median-from-data-stream/>)| [295\. 数据流的中位数](<https://leetcode.cn/problems/find-median-from-data-stream/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉堆原理](</zh/algo/data-structure-basic/binary-heap-basic/>)
  * [二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>)

如果输入一个数组，让你求中位数，这个好办，排个序，如果数组长度是奇数，最中间的一个元素就是中位数，如果数组长度是偶数，最中间两个元素的平均数作为中位数。

如果数据规模非常巨大，排序不太现实，那么也可以使用概率算法，随机抽取一部分数据，排序，求中位数，作为所有数据的中位数。

本文说的中位数算法比较困难，也比较精妙，是力扣第 295 题「[数据流的中位数](<https://leetcode.cn/problems/find-median-from-data-stream/>)」：

**295\. 数据流的中位数** |[力扣](<https://leetcode.cn/problems/find-median-from-data-stream/>)|[LeetCode](<https://leetcode.com/problems/find-median-from-data-stream/>)

**中位数** 是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

  * 例如 `arr = [2,3,4]` 的中位数是 `3` 。
  * 例如 `arr = [2,3]` 的中位数是 `(2 + 3) / 2 = 2.5` 。

实现 MedianFinder 类:

  * `MedianFinder() `初始化 `MedianFinder` 对象。

  * `void addNum(int num)` 将数据流中的整数 `num` 添加到数据结构中。

  * `double findMedian()` 返回到目前为止所有元素的中位数。与实际答案相差 `10-5` 以内的答案将被接受。

**示例 1：**

```
输入
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
输出
[null, null, null, 1.5, null, 2.0]

解释
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
``` 

**提示:**

  * `-105 <= num <= 105`
  * 在调用 `findMedian` 之前，数据结构中至少有一个元素
  * 最多 `5 * 104` 次调用 `addNum` 和 `findMedian`

题目来源：[力扣 295. 数据流的中位数](<https://leetcode.cn/problems/find-median-from-data-stream/>)。

```java
// 题目让你设计这样一个类
class MedianFinder {

    // 添加一个数字
    public void addNum(int num) {}

    // 计算当前添加的所有数字的中位数
    public double findMedian() {}
}
``` 

**其实，所有关于「流」的算法都比较难** ，比如我在前文 [谈谈游戏中的随机算法](</zh/algo/frequency-interview/random-algorithm/>) 写过如何从数据流中等概率随机抽取一个元素，如果说你没有接触过这个问题的话，还是很难想到解法的。

这道题要求在数据流中计算平均数，我们先想一想常规思路。

## 尝试分析

一个直接的解法可以用一个数组记录所有 `addNum` 添加进来的数字，通过插入排序的逻辑保证数组中的元素有序，当调用 `findMedian` 方法时，可以通过数组索引直接计算中位数。

但是用数组作为底层容器的问题也很明显，`addNum` 搜索插入位置的时候可以用二分搜索算法，但是插入操作需要搬移数据，所以最坏时间复杂度为 O(N)。

那换链表？链表插入元素很快，但是查找插入位置的时候只能线性遍历，最坏时间复杂度还是 O(N)，而且 `findMedian` 方法也需要遍历寻找中间索引，最坏时间复杂度也是 O(N)。

那么就用平衡二叉树呗，增删查改复杂度都是 O(logN)，这样总行了吧？

比如用 Java 提供的 `TreeSet` 容器，底层是红黑树，`addNum` 直接插入，`findMedian` 可以通过当前元素的个数推出计算中位数的元素的排名。

很遗憾，依然不行，这里有两个问题：

第一，`TreeSet` 是一种 `Set`，其中不存在重复元素的元素，但是我们的数据流可能输入重复数据的，而且计算中位数也是需要算上重复元素的。

第二，`TreeSet` 并没有实现一个通过排名快速计算元素的 API。假设我想找到 `TreeSet` 中第 5 大的元素，并没有一个现成可用的方法实现这个需求。

Info

如果让你实现一个在二叉搜索树中通过排名计算对应元素的方法 `select(int index)`，你会怎么设计？你可以思考一下，我会把答案写在留言区置顶。

除了平衡二叉树，还有没有什么常用的数据结构是动态有序的？优先级队列（二叉堆）行不行？

好像也不太行，因为优先级队列是一种受限的数据结构，只能从堆顶添加/删除元素，我们的 `addNum` 方法可以从堆顶插入元素，但是 `findMedian` 函数需要从数据中间取，这个功能优先级队列是没办法提供的。

可以看到，求个中位数还是挺难的，我们使尽浑身解数都没有一个高效地思路，下面直接来看解法吧，比较巧妙。
