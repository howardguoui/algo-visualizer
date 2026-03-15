# 优化：实现懒更新线段树

> Source: https://labuladong.online/zh/algo/data-structure/segment-tree-lazy-update/
> Archived: labuladong.online — 算法笔记

---

# 优化：实现懒更新线段树

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[307\. Range Sum Query - Mutable](<https://leetcode.com/problems/range-sum-query-mutable/>)| [307\. 区域和检索 - 数组可修改](<https://leetcode.cn/problems/range-sum-query-mutable/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [线段树基本实现](</zh/algo/data-structure/segment-tree-implement/>)
  * [优化：动态线段树](</zh/algo/data-structure/segment-tree-dynamic/>)

[线段树基本实现](</zh/algo/data-structure/segment-tree-implement/>) 中用数组和链表分别实现了线段树，文末留了两个优化点，分别是区间更新问题和稀疏数据的内存优化问题。

[优化：动态线段树](</zh/algo/data-structure/segment-tree-dynamic/>) 解决了稀疏数据的内存优化问题，**本文将基于`DynamicSegmentTree` 的链式实现，使用「懒更新」技术，为线段树新增 `rangeAdd/rangeUpdate` 方法，在 O(log⁡N)O(\log N)O(logN) 时间复杂度内完成任意长度的区间更新**。

本文实现的区间更新线段树和之前的单点更新线段树有几点区别：

1、因为单点更新可以看作是长度为 1 的区间更新，复杂度还是 O(log⁡N)O(\log N)O(logN)，所以我们不需要单独实现单点更新了。

2、我们不接受 `merge` 聚合函数了，因为涉及区间懒更新，如果同时考虑不同的聚合函数，会引入一些编程语言层面的细节问题，对于算法的学习没有什么意义，所以本文仅给出**求和线段树** 的实现。如果你需要求最值等其他场景，可以自行修改代码中的聚合计算逻辑，或者使用文末提供的 `AllInOneSegmentTree` 万能模板。

3、线段树的区间更新可以是区间赋值（Assign），也可以区间累加（Increment）。

比方 `[1, 2, 3, 4, 5]` 这个数组，将索引区间 `[1, 3]` 内的元素都赋值为 10 叫做区间赋值，结果是 `[1, 10, 10, 10, 5]`；将索引区间 `[1, 3]` 内的元素都增加 1 叫做区间累加，结果是 `[1, 3, 4, 5, 5]`。

这两种场景都是算法题中常见的，本文会同时给出这两种实现。

我们之前实现的线段树主要 API 如下：

```
class SegmentTree {

    // 初始化线段树
    public SegmentTree(int[] nums, Function<Integer, Integer> merge) {}

    // 查询闭区间 [qL, qR] 的聚合值，时间复杂度 O(logN)
    public int query(int qL, int qR) {}
    
    // 单点更新，设置 nums[i] = val，时间复杂度 O(logN)
    public void update(int i, int val) {}
}
``` 

本文将实现以下两种线段树：

```
// 区间累加线段树
class IncrSegmentTree {

    // 初始化动态线段树
    public IncrSegmentTree(int start, int end, int defaultValue) {}

    // 将闭区间 [qL, qR] 增加 delta（可以是负数），时间复杂度 O(logN)
    public void rangeAdd(int qL, int qR, int delta) {}

    // 查询闭区间 [qL, qR] 的元素和，时间复杂度 O(logN)
    public int query(int qL, int qR) {}
}

// 区间赋值线段树
class AssignSegmentTree {

    // 初始化动态线段树
    public AssignSegmentTree(int start, int end, int defaultValue) {}

    // 将闭区间 [qL, qR] 赋值为 val，时间复杂度 O(logN)
    public void rangeUpdate(int qL, int qR, int val) {}

    // 查询闭区间 [qL, qR] 的元素和，时间复杂度 O(logN)
    public int query(int qL, int qR) {}
}
``` 

`rangeAdd` 和 `rangeUpdate` 的实现逻辑非常类似，理论上可以同时实现到一个类上，但是两个逻辑混在一起代码会更复杂，徒增理解成本，而且实际的算法题中，一般只会用到区间累加或区间赋值中的一种，不会同时用到，所以本文还是把它们拆到两个类分别实现，方便大家理解其原理。

本文的最后会给出一个万能线段树模板 `AllInOneSegmentTree`，同时包含上述所有 API 和线段树的所有优化，笔试时可以直接拿来使用。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
