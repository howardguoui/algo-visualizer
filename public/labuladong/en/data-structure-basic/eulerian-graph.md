# Eulerian Graph and One-Stroke Game

> Source: https://labuladong.online/algo/en/data-structure-basic/eulerian-graph/
> Archived: labuladong.online

---

# Eulerian Graph and One-Stroke Game

Prerequisites

Before reading this article, you should first learn:

  * [Graph Terminology](/en/algo/data-structure-basic/graph-terminology/)
  * [DFS/BFS Traversal of Graphs](/en/algo/data-structure-basic/graph-traverse-basic/)


Key Takeaway

The essence of the "one-stroke drawing" puzzle is finding an Eulerian path or Eulerian circuit. You can determine whether one exists by checking the degree of each node.

Hierholzer's algorithm is the classic algorithm for finding Eulerian paths/circuits, and it's an extension of [Graph DFS Algorithms](/en/algo/data-structure-basic/graph-traverse-basic/).

Eulerian graphs are a classic concept in graph theory, originating from the famous Seven Bridges of Königsberg problem. This problem holds great historical significance in mathematics and has wide applications in modern computer science, such as route planning and circuit design.

Since this is a foundational chapter, we won't dive deep into code implementation. The actual algorithm code and exercises will be covered in the graph theory section of the data structures chapter.

This article mainly introduces the definition of Eulerian graphs, the classic Seven Bridges problem, the concepts of Eulerian paths and circuits, and techniques for finding Eulerian paths. You can experience these concepts intuitively through the one-stroke drawing game on this site.

## ¶The One-Stroke Drawing Puzzle

I remember playing a "one-stroke drawing" game as a kid. The rule is simple: you have to draw through all points and edges in one continuous stroke. You can pass through vertices multiple times, but each edge must be traversed exactly once—no repeating.

This site includes this puzzle game:

One-Stroke Drawing Puzzle

Back then, I relied purely on luck—randomly picking a starting point and wandering around. If I could finish, great. If not, just start over.

Later I learned that this simple puzzle is actually a classic graph theory problem, and there's a pattern to solving it.

Here's the trick to completing the game:

  * If all nodes have even degree, you can start from any node and will definitely complete the drawing, ending back at the starting point.
  * If exactly two nodes have odd degree, you must start from one of these two odd-degree nodes to complete the drawing.
  * If neither of the above conditions is met, the puzzle is unsolvable.


The game panel shows the [degree](/en/algo/data-structure-basic/graph-terminology/) of each node, so give this pattern a try and see if it works! :)

Now let's explore the graph theory behind this puzzle—Eulerian graphs.

## ¶The Seven Bridges Problem

The concept of Eulerian graphs originated from the famous Seven Bridges of Königsberg problem in the 18th century. At that time, Königsberg (now Kaliningrad) had a river dividing the city into north and south banks, with two islands in the middle. Seven bridges connected the north bank, south bank, east island, and west island.

The question was: Can you design a route that starts from any region, crosses each bridge exactly once, and returns to the starting point?

We can model this as a graph theory problem:

loading...

In this graph:

  * Each region corresponds to a node
  * Each bridge corresponds to an edge
  * The problem becomes: Is there a path that traverses each edge exactly once and returns to the starting point?


Euler ultimately proved mathematically that the Seven Bridges problem has no solution, thus resolving this famous puzzle.

## ¶Terminology

Based on the Seven Bridges problem, let's introduce some graph theory terms:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
