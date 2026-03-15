# Prim 最小生成树算法

> Source: https://labuladong.online/zh/algo/data-structure/prim/
> Archived: labuladong.online — 算法笔记

---

# Prim 最小生成树算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1135\. Connecting Cities With Minimum Cost](<https://leetcode.com/problems/connecting-cities-with-minimum-cost/>)🔒| [1135\. 最低成本连通所有城市](<https://leetcode.cn/problems/connecting-cities-with-minimum-cost/>)🔒|   
[1584\. Min Cost to Connect All Points](<https://leetcode.com/problems/min-cost-to-connect-all-points/>)| [1584\. 连接所有点的最小费用](<https://leetcode.cn/problems/min-cost-to-connect-all-points/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [图结构基础及通用实现](</zh/algo/data-structure-basic/graph-basic/>)
  * [Dijkstra 原理及实现](</zh/algo/data-structure/dijkstra/>)

一句话总结

Prim 算法是求解无向图中最小生成树的经典算法。

只需要对 Dijkstra 算法稍作修改，即可得到 Prim 算法。

前文讲解的 [Kruskal 算法](</zh/algo/data-structure/kruskal/>) 最小生成树算法的核心思路是：先排好序，然后借助 [并查集](</zh/algo/data-structure-basic/union-find-basic/>) 组装最小生成树。

从思路上讲，Prim 算法的本质是 BFS + 贪心思想，一边排序一边组装最小生成树，相当于 Kruskal 算法先排序后组装的动态过程。

从代码的角度来看，Prim 算法和 Dijkstra 算法非常相似，只需修改几行代码，就可以把 Dijkstra 算法变成 Prim 算法。所以在学习 Prim 算法之前，需要你彻底理解 [Dijkstra 算法原理及实现](</zh/algo/data-structure/dijkstra/>)。

本文先展示 Prim 算法的代码实现，然后再讲解其原理，以及为什么可以直接从 Dijkstra 算法代码推导出 Prim 算法代码。

## Prim 算法代码

仅需修改 [Dijkstra 算法模板](</zh/algo/data-structure/dijkstra/>) 中的几行代码即可得到 Prim 算法，修改部分已经高亮显示：
