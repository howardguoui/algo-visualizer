# Dijkstra 拓展：带限制的最短路问题

> Source: https://labuladong.online/zh/algo/data-structure/dijkstra-follow-up/
> Archived: labuladong.online — 算法笔记

---

# Dijkstra 拓展：带限制的最短路问题

前置知识

阅读本文前，你需要先学习：

  * [图结构基础及通用实现](</zh/algo/data-structure-basic/graph-basic/>)
  * [Dijkstra 算法核心原理及实现](</zh/algo/data-structure/dijkstra/>)

上一篇文章 [Dijkstra 算法原理及实现](</zh/algo/data-structure/dijkstra/>) 中，我们从标准的 BFS 算法推导出了 Dijkstra 算法，解决了标准的加权图最短路径问题。

本文将探讨更复杂的场景：**带限制的最短路径问题** 。

这类问题比标准的最短路径问题复杂，不过不用担心，只需稍微修改之前给出的 Dijkstra 模板就可以解决这类问题。所以请确保你已经完全掌握了上一章的内容。

## 带限制的最短路径问题

上一章给出的 Dijkstra 算法使用的是 [BFS 算法的三种写法](</zh/algo/data-structure-basic/graph-traverse-basic/>) 的第三种，每个节点自己维护了一个 `State` 对象，所以我们可以很容易地扩展标准的 Dijkstra 算法，完成更复杂的任务。

举个简单的例子，**现在不仅让你求最短路径，还要求最短路径最多不能超过`k` 条边**。

这个场景下依然可以使用 Dijkstra 算法，但是需要修改 `distTo` 数组，且需要给 `State` 类增加额外的字段。

下面直接给出代码实现，给 `dijkstra` 函数增加一个 `k` 参数，其他不同的地方用高亮标记了：
