# Graph Structure DFS/BFS Traversal

> Source: https://labuladong.online/algo/en/data-structure-basic/graph-traverse-basic/
> Archived: labuladong.online

---

# Graph Structure DFS/BFS Traversal

Prerequisites

Before reading this article, you should learn:

  * [Graph Basics and Common Code](/en/algo/data-structure-basic/graph-basic/)
  * [Recursion / Level Order Traversal of N-ary Trees](/en/algo/data-structure-basic/n-ary-tree-traverse-basic/)


One-Sentence Summary

Graph traversal is an extension of [N-ary tree traversal](/en/algo/data-structure-basic/n-ary-tree-traverse-basic/). The main methods are still Depth First Search (DFS) and Breadth First Search (BFS).

The only difference is: trees have no cycles, but graphs may have cycles. So we must mark visited nodes to avoid an infinite loop.

Because graphs are more complex, we can split traversal into three cases: traverse **nodes** , **edges** , and **paths**. Each case has slightly different code.

When traversing **nodes** and **edges** , we use a `visited` array and mark it in the **preorder** position to avoid repeated traversal.  
When traversing **paths** , we use an `onPath` array: mark in **preorder** , and unmark in **postorder**.

The [Visualization Panel](/en/algo/intro/visualize/) can create graph structures, and it can also show DFS/BFS traversal paths. **You can clearly see that even if a graph looks more complex than a tree, graph traversal is still tree traversal in nature.**

First look at the DFS algorithm. You can open the panel below and click the line `console.log` many times. You will see the DFS traversal process. The `traverse` function is basically traversing an N-ary recursive tree:

Algorithm Visualization

Then look at the BFS algorithm. You can open the panel below and click the line `console.log` many times. You will see the BFS traversal process. It is basically doing level order traversal on an N-ary tree:

Algorithm Visualization

Now let’s explain it in detail.

## ¶Depth First Search (DFS)

In the earlier article [Graph Basics and Common Implementation](/en/algo/data-structure-basic/graph-basic/), we said we usually do not use a class like `Vertex` to store a graph. But here I will still use this class first, so you can compare graph traversal with N-ary tree traversal. Later I will give traversal code based on adjacency lists / adjacency matrices.

### ¶Traverse all nodes (`visited` array)

Compare it with the traversal framework of an N-ary tree:

CC++GoJavaJavaScriptPython
    
    
    // N-ary tree node
    class Node {
        int val;
        List<Node> children;
    }
    
    // Traversal framework for N-ary tree
    void traverse(Node root) {
        // base case
        if (root == null) {
            return;
        }
        // Pre-order position
        System.out.println("visit " + root.val);
        for (Node child : root.children) {
            traverse(child);
        }
        // Post-order position
    }
    
    
    // Graph node
    class Vertex {
        int id;
        Vertex[] neighbors;
    }
    
    // Traversal framework for graph
    // Need a visited array to record visited nodes
    // Avoid going back to prevent infinite loops
    void traverse(Vertex s, boolean[] visited) {
        // base case
        if (s == null) {
            return;
        }
        if (visited[s.id]) {
            // Prevent infinite loops
            return;
        }
        // Pre-order position
        visited[s.id] = true;
        System.out.println("visit " + s.id);
        for (Vertex neighbor : s.neighbors) {
            traverse(neighbor, visited);
        }
        // Post-order position
    }

You can see that graph traversal has one extra `visited` array. It records which nodes have been visited, so we won’t get stuck in a cycle.

Why cycles cause infinite loops

Here is the simplest cycle: there is an edge `1 -> 2`, and also an edge `2 -> 1`. Then nodes `1, 2` form a cycle:
    
    
    1 <=> 2

If we do not mark visited nodes, starting from `1` we go to `2`, then back to `1`, then to `2`, then to `1`... It becomes `1->2->1->2->...` forever.

With a `visited` array, when we first visit `1`, we mark it as visited. When we later reach `1` again (like `1->2->1`), we see `1` is already visited, so we return directly. This stops the recursion and avoids the infinite loop.

With this, we can write graph traversal code based on adjacency lists / adjacency matrices. Even though their storage is different, they provide the same API. So we can directly use the `Graph` interface from [Graph Basics and Common Implementation](/en/algo/data-structure-basic/graph-basic/):

CC++GoJavaJavaScriptPython
    
    
    // traverse all nodes of the graph
    void traverse(Graph graph, int s, boolean[] visited) {
        // base case
        if (s < 0 || s >= graph.size()) {
            return;
        }
        if (visited[s]) {
            // prevent infinite loop
            return;
        }
        // pre-order position
        visited[s] = true;
        System.out.println("visit " + s);
        for (Edge e : graph.neighbors(s)) {
            traverse(graph, e.to, visited);
        }
        // post-order position
    }

You can open the panel below and click the line `console.log` many times to see the DFS traversal process:

Algorithm Visualization

Because `visited` prunes duplicates, this traversal function will visit all nodes once, and it will try to traverse all edges once. So the time complexity is O(E+V)O(E + V)O(E+V), where `E` is the number of edges and `V` is the number of nodes.

Why is the time complexity $O(E + V)$?

When we explained [binary tree traversal](/en/algo/data-structure-basic/binary-tree-traverse-basic/), we said the time complexity is O(N)O(N)O(N), where NNN is the number of nodes.

A graph is an extension of a tree, so why is it O(E+V)O(E + V)O(E+V), not O(V)O(V)O(V)? Why do we also count edges?

Think about it for two minutes. The answer is below.

Click to see the answer

Tree traversal also counts edges. But in a tree, the number of edges is almost the same as the number of nodes, so it becomes O(N+N)=O(N)O(N + N) = O(N)O(N+N)=O(N).

In a tree, edges only go from parent to child. Except the root, each node can be paired with exactly one incoming edge from its parent. So edges and nodes are almost equal in count.

But in a graph, any two nodes can have an edge. The number of edges and the number of nodes have no fixed relation. So graph traversal time is O(E+V)O(E + V)O(E+V).

### ¶Traverse all edges (2D `visited` array)

In graphs, traversing all edges is not very common. It is mainly used when [computing an Euler path](/en/algo/data-structure-basic/eulerian-graph/), so we only mention it briefly.

In the “traverse all nodes” code, we used a 1D `visited` array to record visited nodes, so each node is visited once. The simplest idea for edges is: use a 2D `visited` array to record visited edges (`visited[u][v]` means the edge `u->v` has been traversed), so each edge is traversed once.

First compare it with N-ary tree traversal:

CC++GoJavaJavaScriptPython
    
    
    // N-ary tree node
    class Node {
        int val;
        List<Node> children;
    }
    
    // Traverse the branches of an N-ary tree
    void traverseBranch(Node root) {
        // base case
        if (root == null) {
            return;
        }
        for (Node child : root.children) {
            System.out.println("visit branch: " + root.val + " -> " + child.val);
            traverseBranch(child);
        }
    }
    
    // Graph node
    class Vertex {
        int id;
        Vertex[] neighbors;
    }
    
    // Traverse the edges of a graph
    // Need a 2D visited array to record visited edges,
    // visited[u][v] indicates that edge u->v has been visited
    void traverseEdges(Vertex s, boolean[][] visited) {
        // base case
        if (s == null) {
            return;
        }
        for (Vertex neighbor : s.neighbors) {
          // if the edge has been visited, skip it
          if (visited[s.id][neighbor.id]) {
            continue;
          }
          // mark and visit the edge
          visited[s.id][neighbor.id] = true;
          System.out.println("visit edge: " + s.id + " -> " + neighbor.id);
          traverseEdges(neighbor, visited);
        }
    }

Tip

Because an edge is made of two nodes, we need to put the preorder code inside the `for` loop.

Next, we can implement it using the `Graph` interface from [Graph Basics and Common Implementation](/en/algo/data-structure-basic/graph-basic/):

CC++GoJavaJavaScriptPython
    
    
    // traverse all edges of the graph starting from vertex s
    void traverseEdges(Graph graph, int s, boolean[][] visited) {
        // base case
        if (s < 0 || s >= graph.size()) {
            return;
        }
        for (Edge e : graph.neighbors(s)) {
          // if the edge has been visited, skip it
          if (visited[s][e.to]) {
            continue;
          }
          // mark and visit the edge
          visited[s][e.to] = true;
          System.out.println("visit edge: " + s + " -> " + e.to);
          traverseEdges(graph, e.to, visited);
        }
    }

Clearly, a 2D `visited` array is not very efficient, because we must create a 2D array. The time complexity is O(E+V2)O(E + V^2)O(E+V2) and the space complexity is O(V2)O(V^2)O(V2), where `E` is the number of edges and `V` is the number of nodes.

When we explain the [Hierholzer algorithm for Euler paths](/en/algo/data-structure/eulerian-graph-hierholzer/), we will show a simple optimization to avoid the 2D `visited` array. We won’t expand it here.

### ¶Traverse all paths (`onPath` array)

Why explain these different traversal cases? Because this site says at the start: the core of all algorithms is brute-force. If you can brute-force all paths, then you can surely compute shortest paths. This is a classic type of graph problem.

For trees, traversing all **paths** is almost the same as traversing all **nodes**. But for graphs, they are a bit different.

In a tree, edges only go from parent to child. So from the root `root` to any node `targetNode`, the path is unique. In other words, if you traverse all nodes once, you will also find the unique path from `root` to `targetNode`:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
