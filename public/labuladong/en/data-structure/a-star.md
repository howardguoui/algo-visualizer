# A* Algorithm

> Source: https://labuladong.online/algo/en/data-structure/a-star/
> Archived: labuladong.online

---

# A* Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1091\. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)|   
  
Prerequisites

Before reading this article, you need to learn:

  * [Overview of Shortest Path Algorithms for Graphs](/en/algo/data-structure-basic/graph-shortest-path/)
  * [Core Principles and Implementation of Dijkstra's Algorithm](/en/algo/data-structure/dijkstra/)


One-Sentence Summary

The A* algorithm is primarily used to solve point-to-point shortest path problems in 2D grids. By introducing a heuristic function, it directs the search toward the destination, improving search efficiency.

[Standard BFS](/en/algo/data-structure-basic/graph-traverse-basic/) can compute the shortest path in an **unweighted graph**.

[Dijkstra's algorithm](/en/algo/data-structure/dijkstra/) uses a priority queue to efficiently compute the shortest path in **weighted graphs** without negative weights.

But have you ever wondered: for an unweighted graph, what happens if you insist on using Dijkstra's algorithm? Would there be any performance improvement?

Let's consider pathfinding in a 2D grid—for example, maze solving—where the top-left corner is the start and the bottom-right corner is the destination, and you need to find the shortest path.

In this scenario, you can treat each cell in the 2D grid as a node, with edges connecting adjacent cells. Every edge has a weight of 1, making it an unweighted graph.

The typical approach is standard BFS traversal: start from the origin and search layer by layer. The first time you reach the destination, that's the shortest path.

If you use Dijkstra's algorithm instead, not only is there no performance gain—it's actually slower than BFS.

**The reason is simple: since all edge weights are 1, nodes enqueued earlier have smaller weights and nodes enqueued later have larger weights. So the dequeue order is first-in-first-out (just like a regular queue), producing the same result as standard BFS**. The overhead of maintaining a priority queue actually makes the time complexity worse than standard BFS (O(Elog⁡E)O(E \log E)O(ElogE) vs O(E)O(E)O(E)).

For example, this maze game lets you choose the solving algorithm. Try setting it to Dijkstra's algorithm and then BFS—you'll see their search paths are identical:

Maze Map Generation

So, is there room for optimization in this scenario? There's actually an idea:

Since the destination is in the bottom-right corner, you should prioritize searching toward the bottom-right—that gives you a better chance of reaching the destination sooner. Conversely, avoid going toward the top-left, since that would most likely take you in the wrong direction.

**This is the core idea behind the A* algorithm: consider not only the distance from the start to a node, but also the distance from that node to the destination**.

## ¶Core Idea of the A* Algorithm

Specifically, for any node `x`, we define three quantities:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
