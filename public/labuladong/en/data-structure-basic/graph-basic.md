# Graph Structure Code Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/graph-basic/
> Archived: labuladong.online

---

# Graph Structure Code Implementation

Prerequisites

Before reading this article, you should first study:

  * [Recursion/Level Order Traversal of N-ary Trees](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

In a Nutshell

A graph is an extension of the [N-ary tree structure](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>). Logically, a graph consists of multiple nodes (Vertices) and edges. We usually use adjacency lists or adjacency matrices to store graphs.

In a tree, only parent nodes can point to child nodes; there are no child-to-parent links, and child nodes do not link to each other. In contrast, graphs do not have these restrictions—nodes can point to each other, forming complex networks.

The [visual panel](</en/algo/intro/visualize/>) supports creating graph structures. You can open the panel below to see the logical structure of a graph, and how adjacency lists and matrices are used to store it:

Algorithm Visualization

Graphs can abstract many complex problems and have led to many classic graph algorithms, such as [Bipartite Graph Algorithm](</en/algo/data-structure/bipartite-graph/>), [Topological Sort](</en/algo/data-structure/topological-sort/>), [Shortest Path Algorithm](</en/algo/data-structure/dijkstra/>), and [Minimum Spanning Tree Algorithm](</en/algo/data-structure/kruskal/>). These topics will be introduced later.

This article mainly introduces the basic concepts of graphs and how to implement graph structures in code.

Last updated: 03/14/2026, 12:17 AM
