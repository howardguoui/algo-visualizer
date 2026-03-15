# Graph Shortest Path Algorithms Overview

> Source: https://labuladong.online/algo/en/data-structure-basic/graph-shortest-path/
> Archived: labuladong.online

---

# Graph Shortest Path Algorithms Overview

Prerequisites

Before reading this article, you should first learn:

  * [Graph Basics and Common Code Implementations](</en/algo/data-structure-basic/graph-basic/>)
  * [DFS/BFS Traversal of Graphs](</en/algo/data-structure-basic/graph-traverse-basic/>)

In One Sentence

Dijkstra and A* algorithms are extensions of [BFS Traversal in Graphs](</en/algo/data-structure-basic/graph-traverse-basic/>). They can solve single-source shortest path problems without negative weights.

The SPFA algorithm (queue-based Bellman-Ford algorithm) is also an extension of [BFS Traversal in Graphs](</en/algo/data-structure-basic/graph-traverse-basic/>). It can handle single-source shortest path problems with negative weights.

The Floyd algorithm is an application of [Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>). It can solve all-pairs (multi-source) shortest path problems.

Beginners do not need to think graph algorithms are hard. They are just extensions of simple algorithm ideas. Once you understand basic tree level-order traversal, you can come up with these algorithms yourself.

Since this is a basic knowledge chapter, I will not provide full code for each algorithm here. The detailed code will be shown in later chapters.

This article focuses on the main ideas, usage scenarios, and how these advanced algorithms connect with basic knowledge. It will help you get a complete understanding of shortest path algorithms on graphs.

## Overview of Shortest Path Problems

Shortest path problems are used a lot in real life, for example, to find the minimum cost, shortest distance, or least time.

In algorithms, we usually model these problems as finding the smallest path weight in a [weighted graph](</en/algo/data-structure-basic/graph-basic/>). In this article, **"shortest path" and "minimum path weight sum" mean the same thing.**

There are two main types of shortest path problems: "single-source shortest path" and "all-pairs shortest path". Below are some classic algorithms.

### Single-source Shortest Path

Single-source shortest path means finding the shortest path from one starting point to **all other nodes**.

For example, if a graph has `n` nodes labeled `0, 1, 2, ..., n-1`, and you are asked to find the shortest path from node `2` to every other node, this is a single-source shortest path problem.

The output of a single-source shortest path algorithm is usually a one-dimensional array `distTo`, where `distTo[i]` means the shortest path length from the start node to node `i`.

Common single-source shortest path algorithms are:

  1. Dijkstra algorithm. It is basically BFS plus a greedy idea. It is efficient, but cannot handle graphs with negative weights.

  2. Queue-based Bellman-Ford algorithm. This is also based on BFS. It can handle negative weights, but is slower than Dijkstra.

### Point-to-Point Shortest Path

Many algorithm problems don't require you to compute the shortest path from a source to every other node—you only need the shortest path from a source `src` to a specific destination `dst`. These are known as point-to-point shortest path problems.

**Generally speaking, a point-to-point shortest path problem can be treated as a special case of the single-source shortest path problem**. You can run a single-source shortest path algorithm starting from `src` and terminate early once you've found the shortest path to `dst`.

That said, there's an algorithm designed specifically for point-to-point problems: the **[A* algorithm](</en/algo/data-structure/a-star/>)** (A Star Algorithm).

As I always say, the essence of algorithms is enumeration. If you want to enumerate more efficiently, you need to leverage as much information as possible. A point-to-point problem (where both the source and destination are known) gives you more information than a single-source problem (where only the source is known), so it's entirely possible to use that extra information to speed things up.

For example, if you know the destination is to the lower-right of the source, it's reasonable to guess that searching toward the lower-right first might get you there faster.

This is exactly the key insight behind A*: it makes full use of available information to search directionally, reaching the destination more quickly. This class of algorithms is called **heuristic search algorithms** (Heuristic Search Algorithm).

But be careful—this guess is just a rule of thumb, and it's not always correct. The lower-right might be full of dead ends, and you might have to take a long detour through the upper-left to actually reach the destination.

That's why heuristic algorithms need a well-designed heuristic function (Heuristic Function) that strikes a balance between the rule of thumb and reality, ensuring the algorithm still performs reasonably well even when the heuristic is off.

### All-Pairs Shortest Path

**All-pairs shortest path** means computing the shortest path between every pair of nodes.

Say you have a graph with `n` nodes numbered `0, 1, 2, ..., n-1`, and you need to find the shortest path between all pairs of nodes—that's the all-pairs shortest path problem.

The output of an all-pairs shortest path algorithm should be a 2D array `dist`, where `dist[i][j]` represents the shortest path length from node `i` to node `j`.

The most well-known algorithm for this is Floyd's algorithm, which is essentially a dynamic programming algorithm.

In theory, you could run a single-source shortest path algorithm from every node and get the all-pairs solution that way.

In practice though, the best choice depends on the structure of the graph. Sometimes Floyd's all-pairs algorithm is more efficient, and sometimes running Dijkstra's single-source algorithm multiple times wins out. This will make more sense once we discuss the time complexity of each algorithm.

### The Impact of Negative-Weight Edges

When computing shortest paths, you need to pay close attention to whether the graph contains **negative-weight edges**. If it does, you must also check for **negative-weight cycles**.

Why do negative-weight edges cause trouble for shortest path algorithms? Because they make things significantly more complicated. A simple example makes this clear:

Suppose you're standing at the source node `s`, with neighboring nodes `a` and `b`. The weight of `s->a` is 3, and the weight of `s->b` is 4.

If there are no negative-weight edges in the graph, you can immediately conclude that the shortest path from `s` to `a` is `s->a` with a total weight of 3. Any path going through `s->b` and looping back to `a` would have a total weight greater than 4, which can't be less than 3.

But with negative-weight edges, all bets are off. For instance, if `b->a` has a weight of -10, then the path `s->b->a` has a total weight of -6, which is less than the direct path `s->a` with weight 3.

Greedy algorithms like Dijkstra's rely on a critical assumption: **as you traverse more edges, the total path weight always increases**. Negative-weight edges break this assumption, causing the algorithm to fail.

If the graph contains a negative-weight cycle, the shortest path problem becomes meaningless altogether. For example, if there's a negative-weight cycle on the path from `s` to `a`, you could loop around that cycle infinitely, driving the total path weight down without bound.

Among common shortest path algorithms, Dijkstra's and A* cannot handle graphs with negative-weight edges. Floyd's and Bellman-Ford can handle negative-weight edges, and Bellman-Ford is commonly used to detect negative-weight cycles.

Now let's dive into the core principles behind these algorithms.

Last updated: 03/14/2026, 12:17 AM
