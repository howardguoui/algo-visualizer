# Kruskal 最小生成树算法

> Source: https://labuladong.online/zh/algo/data-structure/kruskal/
> Archived: labuladong.online — 算法笔记

---

# Kruskal 最小生成树算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[261\. Graph Valid Tree](<https://leetcode.com/problems/graph-valid-tree/>)🔒| [261\. 以图判树](<https://leetcode.cn/problems/graph-valid-tree/>)🔒|   
[1135\. Connecting Cities With Minimum Cost](<https://leetcode.com/problems/connecting-cities-with-minimum-cost/>)🔒| [1135\. 最低成本连通所有城市](<https://leetcode.cn/problems/connecting-cities-with-minimum-cost/>)🔒|   
[1584\. Min Cost to Connect All Points](<https://leetcode.com/problems/min-cost-to-connect-all-points/>)| [1584\. 连接所有点的最小费用](<https://leetcode.cn/problems/min-cost-to-connect-all-points/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [Union-Find 并查集算法](</zh/algo/data-structure/union-find/>)
  * [最小生成树算法概览](</zh/algo/data-structure-basic/graph-minimum-spanning-tree/>)

一句话总结

Kruskal 算法是求解无向图中最小生成树的经典算法。

其本质是贪心思想，先排序，再借助 [并查集](</zh/algo/data-structure-basic/union-find-basic/>) 判断是否形成环。

[最小生成树算法概览](</zh/algo/data-structure-basic/graph-minimum-spanning-tree/>) 讲解了最小生成树的定义及实际运用场景，没看过的话需要先看下。

最小生成树算法主要有 Prim 算法和 Kruskal 算法两种，这两种算法从原理上讲都是运用贪心思想，但从实现上来说差异还是蛮大的。

本文先来讲比较简单易懂的 Kruskal 算法，然后在下一篇文章中聊 Prim 算法。

Kruskal 算法其实很容易理解和记忆，其关键是要熟悉并查集算法，如果不熟悉，建议先看下前文 [Union-Find 并查集算法](</zh/algo/data-structure/union-find/>)。

在讲 Kruskal 算法之前，先回顾一下 Union-Find 并查集算法。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
