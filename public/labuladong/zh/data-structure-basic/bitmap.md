# 位图原理及实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/bitmap/
> Archived: labuladong.online — 算法笔记

---

# 位图原理及实现

一句话总结

位图（BitMap）是一种非常节省空间的数据结构，它用一个比特位（bit）的 0 和 1 来标记某个元素是否存在。

在后面做算法题时，我们会经常用到类似 `boolean[] visited` 这样的布尔数组，来记录数组中那些元素已经被访问过。

```
// 假设 nums 是一个包含 1000 个整数的数组
int[] nums = {...}

// 我们在写算法时
// 可能会用一个布尔数组来记录 nums 中那些元素已经被访问过
boolean[] visited = new boolean[nums.length];
visited[10] = true;
visited[100] = true;
``` 

我们来仔细观察这个场景，是否存在优化空间？

布尔类型只有 `true` 和 `false` 两种状态，理论上只需要 1 个比特位（bit）的 `0` 和 `1` 就可以表示。

但在大部分编程语言中，由于内存寻址等原因，一个布尔元素通常会占用 1 字节（byte），也就是 8 个比特位的内存。

这就意味着，编程语言内置的布尔数组 `boolean[]` 实际上浪费了 7/8 的内存空间。

那么我们是否可以优化？答案是肯定的。

提示

在实际开发和求解算法题的过程中，我们使用编程语言提供的布尔数组就够了，**除非需要处理的数据规模非常大，否则没必要为了节省这一点内存空间而引入位图这种结构** 。

比如后文介绍的 [布隆过滤器](</zh/algo/data-structure-basic/bloom-filter/>)，专门为了处理超大规模数据而设计，才需要使用位图这种结构进行优化。
