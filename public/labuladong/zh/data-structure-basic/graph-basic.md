# 图结构的通用代码实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/graph-basic/
> Archived: labuladong.online — 算法笔记

---

# 图结构的通用代码实现

前置知识

阅读本文前，你需要先学习：

  * [多叉树的递归/层序遍历](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

一句话总结

图结构就是 [多叉树结构](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>) 的延伸。图结构逻辑上由若干节点（`Vertex`）和边（`Edge`）构成，我们一般用邻接表、邻接矩阵等方式来存储图。

在树结构中，只允许父节点指向子节点，不存在子节点指向父节点的情况，子节点之间也不会互相链接；而图中没有那么多限制，节点之间可以相互指向，形成复杂的网络结构。

[可视化面板](</zh/algo/intro/visualize/>) 支持创建图结构，你可以打开下面的可视化面板，即可看到图的逻辑结构，以及邻接表和邻接矩阵的存储方式：

算法可视化

图结构可以对很多复杂的问题进行抽象，产生了很多经典的图论算法，比如 [二分图算法](</zh/algo/data-structure/bipartite-graph/>)、[拓扑排序](</zh/algo/data-structure/topological-sort/>)、[最短路径算法](</zh/algo/data-structure/dijkstra/>)、[最小生成树算法](</zh/algo/data-structure/kruskal/>) 等，这些都会在后文介绍。

本文主要介绍图的基本概念，以及如何用代码实现图结构。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
