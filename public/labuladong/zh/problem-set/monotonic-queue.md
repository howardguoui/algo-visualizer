# 单调队列的通用实现及经典习题

> Source: https://labuladong.online/zh/algo/problem-set/monotonic-queue/
> Archived: labuladong.online — 算法笔记

---

# 单调队列的通用实现及经典习题

前置知识

阅读本文前，你需要先学习：

  * [队列/栈的原理](</zh/algo/data-structure-basic/queue-stack-basic/>)
  * [单调队列解决滑动窗口问题](</zh/algo/data-structure/monotonic-queue/>)

## 通用实现

我先提供一个单调队列结构的通用实现，这里涉及 Java 的泛型，`E` 就代表任意类型，`E extends Comparable<E>` 的意思是这个类型 `E` 需要实现 `Comparable` 接口，即类型 `E` 是可比较的，比如 `Integer, String` 这种实现了 `compareTo` 方法的类型。原因也很好理解，因为你要求队列中元素的最值嘛，所以元素当然得是有大小之分（可比较）的。

我们原先的简陋实现包含了 `max` 方法的实现，其原理是在底层维护了一个队列 `maxq`，维护这个队列中从尾部到头部的元素单调递增。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
