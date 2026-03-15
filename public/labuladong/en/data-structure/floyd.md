# Multi-source shortest path: Floyd algorithm

> Source: https://labuladong.online/algo/en/data-structure/floyd/
> Archived: labuladong.online

---

# Multi-source shortest path: Floyd algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1334\. Find the City With the Smallest Number of Neighbors at a Threshold Distance](<https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Overview of Shortest Path Algorithms in Graphs](</en/algo/data-structure-basic/graph-shortest-path/>)
  * [Core Concepts of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)

In the article [Overview of Shortest Path Algorithms in Graphs](</en/algo/data-structure-basic/graph-shortest-path/>), we talked about different shortest path problems in graphs: single source, multiple sources, and point-to-point shortest paths. We also compared several classic shortest path algorithms.

In [The Cheapest Travel Path](</en/algo/dynamic-programming/cheap-travel/>), we used dynamic programming to solve the shortest path from `src` to `dst` (point-to-point shortest path). But in this article, we are going to solve the multiple source shortest path problem, which cannot be solved in the same way.

The Floyd algorithm is based on dynamic programming. Its code is simple, but understanding the idea behind it requires some thought. Below, we first provide the Floyd algorithm code and a sample problem. Then we will explain how the state transition formula is derived.

## Floyd Algorithm Code

Here is the code for the Floyd algorithm. `Graph` is a common interface defined in [Graph Implementation](</en/algo/data-structure-basic/graph-basic/>):

```
int[][] floyd(Graph graph) {
    int n = graph.nodeCount();

    // Definition: dp[i][j] means the shortest path weight from node i to node j
    int[][] dp = new int[n][n];

    // base case
    // The path weight from a node to itself is 0, so dp[i][i] is initialized to 0
    // If nodes i and j are directly connected, dp[i][j] is set to the edge weight
    // If not directly connected, dp[i][j] is set to +inf
    for (int i = 0; i < n; i++) {
        Arrays.fill(dp[i], Integer.MAX_VALUE);
    }
    for (int i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    for (int i = 0; i < n; i++) {
        for (Edge edge : graph.neighbors(i)) {
            int j = edge.to;
            int weight = edge.weight;
            dp[i][j] = weight;
        }
    }

    // State transition
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // To avoid integer overflow when adding dp[i][k] + dp[k][j], check first
                if (dp[i][k] != Integer.MAX_VALUE && dp[k][j] != Integer.MAX_VALUE) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
                }
            }
        }
    }
    return dp;
}

// Calculate all-pairs shortest paths
// dist[i][j] is the shortest path weight from node i to node j
int[][] dist = floyd(graph);
``` 

As you can see, this code is a standard dynamic programming solution. Here:

The `dp` array is defined as `dp[i][j]`, which stores the shortest path weight from node `i` to node `j`.

For directly connected nodes `i` and `j`, `dp[i][j]` is initialized as the edge weight. For nodes that are not directly connected, it is set to `+inf`. This is the base case.

The state transition formula is handled in the three nested for loops, which is the core of the Floyd algorithm:

```
// State transition
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
        }
    }
}
``` 

Now the Floyd algorithm is complete. Its time complexity is O(n3)O(n^3)O(n3) and space complexity is O(n2)O(n^2)O(n2), where nnn is the number of nodes in the graph.

Last updated: 03/14/2026, 12:17 AM
