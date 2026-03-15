# 线性探查法的两种代码实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/linear-probing-code/
> Archived: labuladong.online — 算法笔记

---

# 线性探查法的两种代码实现

前置知识

阅读本文前，你需要先学习：

  * [线性探查法的两个难点](</zh/algo/data-structure-basic/linear-probing-key-point/>)

前文 [哈希表核心原理](</zh/algo/data-structure-basic/hashmap-basic/>) 中我介绍了哈希表的核心原理和几个关键概念，[拉链法原理和实现](</zh/algo/data-structure-basic/hashtable-chaining/>) 中介绍了拉链法的实现，[线性探查法的两个难点](</zh/algo/data-structure-basic/linear-probing-key-point/>) 介绍了线性探查法实现哈希表的难点所在，并给出了两种方法解决删除元素时的空洞问题，本文会同时给出这两种方法的参考代码实现。

本文会先结合可视化面板给出简化的实现，方便大家理解增删查改的过程，最后给完整实现。

简化实现中，具体简化的地方如下：

1、我们实现的哈希表只支持 `key` 类型为 `int`，`value` 类型为 `int` 的情况，如果 `key` 不存在，就返回 `-1`。

2、我们实现的 `hash` 函数就是简单地取模，即 `hash(key) = key % table.length`。这样也方便模拟出哈希冲突的情况，比如当 `table.length = 10` 时，`hash(1)` 和 `hash(11)` 的值都是 1。

3、底层的 `table` 数组的大小在创建哈希表时就固定，假设 `table` 数组不会被装满，不考虑负载因子和动态扩缩容的问题。

这些简化能够帮助我们聚焦增删查改的核心逻辑，并且可以借助 [可视化面板](</zh/algo/intro/visualize/>) 辅助大家学习理解。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
