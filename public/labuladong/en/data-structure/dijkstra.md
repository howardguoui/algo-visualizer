# Dijkstra Algorithm

> Source: https://labuladong.online/algo/en/data-structure/dijkstra/
> Archived: labuladong.online

---

# Dijkstra Algorithm

Prerequisites

Before reading this article, you should first learn:

  * [Graph Basics and Common Implementations](</en/algo/data-structure-basic/graph-basic/>)
  * [Overview of Shortest Path Algorithms for Graphs](</en/algo/data-structure-basic/graph-shortest-path/>)
  * [DFS/BFS Traversal of Graphs](</en/algo/data-structure-basic/graph-traverse-basic/>)

TL;DR

Dijkstra's algorithm computes single-source shortest paths in a graph. **At its core, it's just standard BFS + a greedy strategy**.

Negative-weight edges break the greedy assumption, so **Dijkstra's algorithm only works on graphs without negative-weight edges**.

There are just two differences between Dijkstra's algorithm and standard BFS:

  1. Standard BFS uses a regular queue; Dijkstra uses a priority queue so that nodes closer to the source are dequeued first (this is the greedy part).

  2. Standard BFS uses a `visited` array to track visited nodes and prevent infinite loops; Dijkstra uses a `distTo` array that both prevents infinite loops and records the shortest path from the source to every other node.

In [Overview of Shortest Path Algorithms for Graphs](</en/algo/data-structure-basic/graph-shortest-path/>), we briefly introduced shortest path problems in graphs, the difference between single-source and multi-source shortest paths, issues caused by negative-weight edges, and several classic shortest path algorithms including Dijkstra's. This article will cover:

  1. How to extend the standard [Graph BFS Traversal Algorithm](</en/algo/data-structure-basic/graph-traverse-basic/>) into Dijkstra's algorithm.

  2. A detailed explanation of how Dijkstra's algorithm works, along with a proof of correctness.

  3. Point-to-point shortest path is a special case of single-source shortest path. A small tweak to the standard Dijkstra code can improve efficiency for this case.

Once you've mastered the principles and the code template, the next article will show how to modify the standard Dijkstra code to solve more complex shortest path problems with multiple constraints.

This article uses the graph interface defined in [Graph Basics and Common Implementations](</en/algo/data-structure-basic/graph-basic/>). Please read that section first to understand the graph storage methods and interface definitions.

Let's dive in.

## Dijkstra's Algorithm Code

Let's start with the code, since Dijkstra's algorithm only requires a few modifications to standard BFS—it's fairly straightforward. We'll first look at what changes, then discuss why those changes are correct.

[Graph BFS Traversal](</en/algo/data-structure-basic/graph-traverse-basic/>) introduced three BFS implementations. The third one is particularly well-suited for Dijkstra's algorithm because we need to track the shortest path from the source to each node as we traverse.

For comparison, here's the standard graph BFS traversal algorithm:

```java
// BFS traversal of a graph, starting from node s and recording the number
// of steps (the number of edges from the start node s to the current node)
// Each node maintains its own State class to record the number of steps from s
class State {
    // Current node ID
    int node;
    // Number of steps from the start node s to the current node
    int step;

    public State(int node, int step) {
        this.node = node;
        this.step = step;
    }
}

void bfs(Graph graph, int s) {
    boolean[] visited = new boolean[graph.size()];
    Queue<State> q = new LinkedList<>();

    q.offer(new State(s, 0));
    visited[s] = true;

    while (!q.isEmpty()) {
        State state = q.poll();
        int cur = state.node;
        int step = state.step;
        System.out.println("visit " + cur + " with step " + step);
        for (Edge e : graph.neighbors(cur)) {
            if (visited[e.to]) { // [!code highlight:5]
                continue;
            }
            q.offer(new State(e.to, step + 1));
            visited[e.to] = true;
        }
    }
}
``` 

In this algorithm, we use `State.step` to record the minimum number of steps (edges) from the source to the current node, and a `visited` array to track visited nodes, ensuring each node is visited only once (enqueued and dequeued once) to prevent infinite loops.

In weighted graphs, the shortest path problem asks for the minimum total edge weight from the source to other nodes. Since each edge can have a different weight, counting the number of edges is no longer meaningful—it won't give us the path with the minimum total weight.

Here's Dijkstra's algorithm code, with the differences highlighted:

Last updated: 03/14/2026, 12:17 AM
