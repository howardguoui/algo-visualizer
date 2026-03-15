# Minimum Spanning Tree Algorithms Overview

> Source: https://labuladong.online/algo/en/data-structure-basic/graph-minimum-spanning-tree/
> Archived: labuladong.online

---

# Minimum Spanning Tree Algorithms Overview

Prerequisites

Before reading this article, you need to learn:

  * [Basics of Graph Structure and Common Code Implementation](</en/algo/data-structure-basic/graph-basic/>)
  * [Graph Terminology](</en/algo/data-structure-basic/graph-terminology/>)

Minimum Spanning Tree (MST) is a classic problem in graph theory. It has many real-world applications, such as designing the lowest-cost communication networks, circuit wiring, and pipeline layout.

Since implementing MST algorithms needs some other algorithms as a foundation, and this article is in the basics section, we will not explain the algorithm code in detail here.

This article mainly introduces the definition and application scenarios of minimum spanning trees, and explains the core ideas of two classic MST algorithms. The detailed code will be provided in the data structure design section.

## What is a Spanning Tree

First, let's understand what a spanning tree is. Given an undirected connected graph GGG, a **spanning tree** is a subgraph of GGG that includes all the vertices of GGG and is a tree (which means it is connected and has no cycles).

In other words, a spanning tree has these features:

  * It includes all the vertices from the original graph.
  * The number of edges is one less than the number of vertices (`V-1` edges).
  * It is connected and has no cycles.

A graph can have many different spanning trees. For example, here is a weighted graph:

Here are some spanning trees. The edges in the spanning tree are marked in red:

Here is another spanning tree:

## What is a Minimum Spanning Tree

If the graph is a weighted graph, the **minimum spanning tree** is the spanning tree with the smallest total edge weight.

For example, in the case above, the second spanning tree is the minimum spanning tree. The total weight is 2 + 3 + 5 = 10. There is no other spanning tree with a smaller total weight.

Minimum spanning trees have many real-world uses. The edge weights can represent distance, cost, time, and so on.

For example, if you want to build roads between several cities, the nodes in the graph are cities, the edges are roads, and the weights are the cost to build each road. We want to connect all the cities with the lowest total cost. This is a classic minimum spanning tree problem.

## Minimum Spanning Tree Algorithms

There are two classic algorithms to solve the minimum spanning tree problem: Kruskal's algorithm and Prim's algorithm. Both use a greedy approach, but their implementation is different.

Kruskal's algorithm is simpler. First, sort all the edges in the graph by weight, then use the [Union-Find algorithm](</en/algo/data-structure/union-find/>) to build the minimum spanning tree.

Prim's algorithm is an extension of the [Dijkstra algorithm](</en/algo/data-structure/dijkstra/>). It uses a [priority queue](</en/algo/data-structure-basic/binary-heap-basic/>) to build the minimum spanning tree step by step.

You can find the code for these algorithms in [Kruskal's Algorithm](</en/algo/data-structure/kruskal/>) and [Prim's Algorithm](</en/algo/data-structure/prim/>).

## Random Map Generation Problem

With some clever changes, minimum spanning tree algorithms can be used to generate random mazes and caves for games.

The main idea is to use the property of minimum spanning trees, which can connect all points without forming cycles. This ensures the map is connected. By adding randomness, we can make each map look different, natural, and complex.

On this site, there is a maze game. You need to write a function `mazeGenerate` to create a maze map. The map must have at least one path from start to finish, and should be as random as possible:

Generate a Random Maze Map

We can use the game panel to see how minimum spanning tree algorithms generate maps.

In the panel, you can choose a "generation algorithm" and a "solving algorithm". You can switch between different generation methods, then click the "Generate" button to see how each algorithm creates a map.

First, observe the Kruskal algorithm. The map starts as a grid. Then, random paths begin to appear from different places, finally connecting into a complete maze.

Next, observe the Prim algorithm. The map starts as all walls. Then, from the starting point, paths spread out, eventually forming a complete maze.

Not only are the generation processes different, but the maps created have different features. You can also switch between different solving algorithms in the panel. Click the "Solve" button to see how each algorithm solves the maze.

I suggest watching how BFS/DFS algorithms solve the map. Pay attention to the differences in maps made by each generation method. After we explain how minimum spanning tree algorithms work, we will talk more about random maze generation in detail.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
