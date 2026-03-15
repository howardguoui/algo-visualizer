# Prim Minimum Spanning Tree Algorithm

> Source: https://labuladong.online/algo/en/data-structure/prim/
> Archived: labuladong.online

---

# Prim Minimum Spanning Tree Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1135\. Connecting Cities With Minimum Cost](<https://leetcode.com/problems/connecting-cities-with-minimum-cost/>)🔒|   
[1584\. Min Cost to Connect All Points](<https://leetcode.com/problems/min-cost-to-connect-all-points/>)|   
  
Prerequisites

Before reading this article, you should first study:

  * [Graph Structure Basics and General Implementation](</en/algo/data-structure-basic/graph-basic/>)
  * [Dijkstra's Algorithm: Principle and Implementation](</en/algo/data-structure/dijkstra/>)

One Sentence Summary

The Prim algorithm is a classic algorithm for finding the minimum spanning tree in an undirected graph.

You only need to slightly modify Dijkstra's algorithm to get the Prim algorithm.

Previously, we explained the core idea of the [Kruskal algorithm](</en/algo/data-structure/kruskal/>) for the minimum spanning tree: sort the edges first, and then use the [union-find data structure](</en/algo/data-structure-basic/union-find-basic/>) to build the minimum spanning tree.

In terms of approach, the essence of the Prim algorithm is BFS plus a greedy strategy. It sorts and builds the minimum spanning tree at the same time, which is like a dynamic process compared to Kruskal's sort-then-build method.

From a coding perspective, Prim's algorithm is very similar to Dijkstra's algorithm. You only need to change a few lines of code to turn Dijkstra's algorithm into Prim's algorithm. Therefore, before learning Prim's algorithm, you need to thoroughly understand [Dijkstra's Algorithm: Principle and Implementation](</en/algo/data-structure/dijkstra/>).

This article will first show the implementation of Prim's algorithm, then explain its principle, and why you can directly derive Prim's algorithm from Dijkstra's code.

## Prim Algorithm Code

You only need to modify a few lines in the [Dijkstra algorithm template](</en/algo/data-structure/dijkstra/>) to get Prim's algorithm. The modified parts are already highlighted:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
