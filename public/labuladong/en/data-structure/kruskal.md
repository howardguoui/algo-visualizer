# Kruskal Minimum Spanning Tree Algorithm

> Source: https://labuladong.online/algo/en/data-structure/kruskal/
> Archived: labuladong.online

---

# Kruskal Minimum Spanning Tree Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[261\. Graph Valid Tree](<https://leetcode.com/problems/graph-valid-tree/>)🔒|   
[1135\. Connecting Cities With Minimum Cost](<https://leetcode.com/problems/connecting-cities-with-minimum-cost/>)🔒|   
[1584\. Min Cost to Connect All Points](<https://leetcode.com/problems/min-cost-to-connect-all-points/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Union-Find Algorithm](</en/algo/data-structure/union-find/>)
  * [Overview of Minimum Spanning Tree Algorithms](</en/algo/data-structure-basic/graph-minimum-spanning-tree/>)

In One Sentence

Kruskal's algorithm is a classic way to find the minimum spanning tree in an undirected graph.

It uses a greedy approach: sort the edges first, then use the [Union-Find](</en/algo/data-structure-basic/union-find-basic/>) to check for cycles.

[Overview of Minimum Spanning Tree Algorithms](</en/algo/data-structure-basic/graph-minimum-spanning-tree/>) explains what a minimum spanning tree is and where it is used. If you haven't read it yet, please read it first.

There are two main algorithms for minimum spanning trees: Prim's algorithm and Kruskal's algorithm. Both use greedy ideas, but the ways they work are quite different.

In this article, we will talk about the easier Kruskal's algorithm. In the next article, we will cover Prim's algorithm.

Kruskal's algorithm is simple to understand and remember. The key is to know the Union-Find algorithm well. If you are not familiar with it, read [Union-Find Algorithm](</en/algo/data-structure/union-find/>) first.

Before we start with Kruskal's algorithm, let's quickly review the Union-Find data structure.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
