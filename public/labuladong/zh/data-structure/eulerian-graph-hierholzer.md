# Hierholzer 算法寻找欧拉路径

> Source: https://labuladong.online/zh/algo/data-structure/eulerian-graph-hierholzer/
> Archived: labuladong.online — 算法笔记

---

# Hierholzer 算法寻找欧拉路径

前置知识

阅读本文前，你需要先学习：

  * [图结构的通用实现](</zh/algo/data-structure-basic/graph-basic/>)
  * [图结构的 DFS/BFS 遍历](</zh/algo/data-structure-basic/graph-traverse-basic/>)
  * [欧拉图及一笔画游戏](</zh/algo/data-structure-basic/eulerian-graph/>)

一句话总结

Hierholzer 算法是用于计算欧拉路径/欧拉回路的算法，其本质就是 [遍历图结构**所有边** 的 DFS 算法](</zh/algo/data-structure-basic/graph-traverse-basic/>) 的**逆后序** 遍历结果。

在 [欧拉图及一笔画游戏](</zh/algo/data-structure-basic/eulerian-graph/>) 中，我们通过经典的一笔画游戏学习了欧拉图的基本概念，探讨了欧拉路径/欧拉回路的判定条件。

关键就是看节点的度数，这里简单总结一下。如果你忘记了其中的原理，请先回去复习。

对于无向图：

  * 如果所有节点的度数都是偶数，那么起点和终点是同一个节点，存在欧拉回路。我们可以以任意一个节点作为起点，遍历所有边后，一定可以回到起点。

  * 如果存在两个奇数度节点，那么起点和终点分别是这两个节点，存在欧拉路径。我们可以任选一个奇数度节点作为起点，遍历所有边后，一定可以到达另一个奇数度节点。

对于有向图：

  * 如果所有节点的入度和出度都相等，那么起点和终点是同一个节点，存在欧拉回路。我们可以以任意一个节点作为起点，遍历所有边后，一定可以回到起点。

  * 如果存在两个节点入度和出度不相等，那么起点和终点分别是这两个节点，存在欧拉路径。其中**出度比入度大 1** 的节点是起点，**入度比出度大 1** 的节点是终点。从起点出发，遍历所有边后，一定可以到达终点。

接下来看看 Hierholzer 算法的代码实现，在 O(E)O(E)O(E) 时间复杂度内找到欧拉路径/欧拉回路。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
