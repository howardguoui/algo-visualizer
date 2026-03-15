# 用拉链法实现哈希表

> Source: https://labuladong.online/zh/algo/data-structure-basic/hashtable-chaining/
> Archived: labuladong.online — 算法笔记

---

# 用拉链法实现哈希表

前置知识

阅读本文前，你需要先学习：

  * [哈希表核心原理](</zh/algo/data-structure-basic/hashmap-basic/>)
  * [链表（链式存储）基础](</zh/algo/data-structure-basic/linkedlist-basic/>)

前文 [哈希表核心原理](</zh/algo/data-structure-basic/hashmap-basic/>) 中我介绍了哈希表的核心原理和几个关键概念，其中提到了解决哈希冲突的方法主要有两种，分别是拉链法和开放寻址法（也常叫做线性探查法）：

![diagram](https://labuladong.online/images/algo/ds-basic/hash-collision.jpeg)

本文就来具体介绍一下拉链法的实现原理和代码。

**首先，我会结合[可视化面板](</zh/algo/intro/visualize/>) 用拉链法实现一个简化版的哈希表，带大家直观地理解拉链法是如何实现增删查改的 API 并解决哈希冲突的，最后再给出一个比较完善的 Java 代码实现**。

## 拉链法的简化版实现

[哈希表核心原理](</zh/algo/data-structure-basic/hashmap-basic/>) 已经介绍过哈希函数和 `key` 的类型的关系，其中 `hash` 函数的作用是在 O(1)O(1)O(1) 的时间把 `key` 转化成数组的索引，而 `key` 可以是任意不可变的类型。

但是这里为了方便诸位理解，我先做如下简化：

1、我们实现的哈希表只支持 `key` 类型为 `int`，`value` 类型为 `int` 的情况，如果 `key` 不存在，就返回 `-1`。

2、我们实现的 `hash` 函数就是简单地取模，即 `hash(key) = key % table.length`。这样也方便模拟出哈希冲突的情况，比如当 `table.length = 10` 时，`hash(1)` 和 `hash(11)` 的值都是 1。

3、底层的 `table` 数组的大小在创建哈希表时就固定，不考虑负载因子和动态扩缩容的问题。

这些简化能够帮助我们聚焦增删查改的核心逻辑，并且可以借助 [可视化面板](</zh/algo/intro/visualize/>) 辅助大家学习理解。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
