# A* 算法核心原理及实现

> Source: https://labuladong.online/zh/algo/data-structure/a-star/
> Archived: labuladong.online — 算法笔记

---

# A* 算法核心原理及实现

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1091\. Shortest Path in Binary Matrix](<https://leetcode.com/problems/shortest-path-in-binary-matrix/>)| [1091\. 二进制矩阵中的最短路径](<https://leetcode.cn/problems/shortest-path-in-binary-matrix/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [图结构最短路径算法概览](</zh/algo/data-structure-basic/graph-shortest-path/>)
  * [Dijkstra 算法核心原理及实现](</zh/algo/data-structure/dijkstra/>)


一句话总结

A* 算法主要用于解决二维网格中的点对点最短路径问题，通过引入启发函数，让算法有方向性地向终点搜索，提高搜索效率。

[标准的 BFS 算法](</zh/algo/data-structure-basic/graph-traverse-basic/>) 可以计算**无权图** 的最短路径。

[Dijkstra 算法](</zh/algo/data-structure/dijkstra/>) 借助优先级队列，可以高效计算不包含负权重的**加权图** 的最短路径。

那你有没有思考过，对于无权图，如果我非要用 Dijkstra 算法，会发生什么？是否会有性能提升呢？

让我们探讨二维数组中的寻路问题，比如迷宫寻路，二维数组的左上角为起点，右下角为终点，计算最短路径。

这个场景中，可以把二维数组的每个位置看作一个节点，相邻位置之间有边相连，边的权重都是 1，也就是无权图。

一般的做法是用标准的 BFS 遍历算法，从起点开始，一层一层暴力搜索就行了，第一次到终点时就是最短路径。

如果我们用 Dijkstra 算法，不仅没有性能提升，反而比 BFS 算法更慢。

**原因很简单，边权重都是 1，那么早入队的节点权重小，晚入队的节点权重大，因此节点出队的顺序就是先进先出（和普通队列一样），效果等同于标准 BFS 算法** 。反而因为优先级队列产生额外的维护成本，导致时间复杂度比标准 BFS 更高（O(Elog⁡E)O(E \log E)O(ElogE) vs O(E)O(E)O(E)）。

比如这个迷宫小游戏可以设置求解迷宫的算法，你可以分别设置 Dijkstra 算法和 BFS 算法求解迷宫，就能发现它们的搜索路径完全一致：

迷宫地图生成

那么，对于这个场景是否有优化呢？其实有一个思路：

既然终点在右下角，我们可以优先向右下角搜索，这样有更大概率更容易到达终点；反之，尽量不要往左上角走，因为那样大概率会南辕北辙绕远路。

**这就是 A* 算法的核心思想：不仅仅考虑节点距起点的距离，也要考虑节点距终点的距离** 。

## ¶A* 算法的核心思想

具体地，对于任意节点 `x`，我们定义三个量：

更新时间：2026/03/14 00:17

Loading comments...
