# How to Determine a Bipartite Graph

> Source: https://labuladong.online/algo/en/data-structure/bipartite-graph/
> Archived: labuladong.online

---

# How to Determine a Bipartite Graph

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[785\. Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)|   
[886\. Possible Bipartition](https://leetcode.com/problems/possible-bipartition/)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Basic Concepts and Implementation of Graphs](/en/algo/data-structure-basic/graph-basic/)
  * [DFS and BFS Traversal of Graphs](/en/algo/data-structure-basic/graph-traverse-basic/)


Today, let's talk about a classic graph algorithm: checking if a graph is bipartite.

## ¶Introduction to Bipartite Graphs

Let's look at the definition of a bipartite graph:

A bipartite graph is a graph whose vertices can be divided into two groups, and every edge connects a vertex from one group to a vertex from the other group. No two vertices in the same group are connected by an edge.

![](/images/algo/bipartite-graph/0.png)

Graph theory often has definitions that are hard to understand. Let's not worry about the strict definition for now. Let’s play a game:

**Given a "graph", can you color all the nodes using two colors, so that no two connected nodes have the same color?**

This is called the "two-color problem" for graphs. In fact, solving this problem is the same as checking if a graph is bipartite. If you can color the graph this way, then the graph is bipartite; if not, then it is not:

![](/images/algo/algo4/1-en.jpg)

Before we talk about the algorithm to check bipartite graphs, let's discuss why computer scientists care about the two-color problem.

First, bipartite graphs are a special type of graph. Many advanced algorithms, like the maximum flow algorithm, use bipartite graphs. If you are interested, you can search for more information, but it’s not required.

From a simple and practical point of view, bipartite graphs can be used to store data more efficiently in some situations.

For example, suppose we want to store the relationship between movies and actors: a movie usually has several actors, and an actor can act in several movies. What data structure would you use to store this relationship?

Since we want to store mappings, the simplest way is to use a [hash table](/en/algo/data-structure-basic/hashmap-basic/). We can use a `HashMap<String, List<String>>` to map a movie to its list of actors. If we know a movie’s name, we can quickly find all its actors.

But what if we have an actor’s name and want to find all the movies this actor has appeared in? We would need to create another hash table, mapping actors to their movies.

So, if we use hash tables, we need two: one to map actors to movies, and one to map movies to actors. But if we use a "graph" structure, we can simply connect movies and actors together, which naturally forms a bipartite graph:

![](/images/algo/algo4/2.jpg)

For each movie node, its neighbors are the actors in the movie. For each actor node, its neighbors are the movies they acted in. Compared with hash tables, this is more direct and uses less storage.

In fact, many real-world relationships can be represented as bipartite graphs. In some cases, graphs can also be used as data structures for storing key-value pairs (symbol tables).

Now, let’s get to the main topic: how to check if a graph is bipartite.

## ¶How to Check If a Graph Is Bipartite

The algorithm is simple. It is just solving the "two-color problem" with code.

**In short, we traverse the graph, coloring nodes as we go. We try to use only two colors so that no connected nodes have the same color.**

Since we need to traverse the graph, and we don’t need to find the shortest path, both DFS and BFS work. DFS is more common, so let's see how to use DFS to check if a graph is bipartite.

First, based on [graph traversal](/en/algo/data-structure-basic/graph-traverse-basic/), let’s write the DFS framework for traversing a graph:

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

Since there might be cycles in the graph, a `visited` array is used to prevent revisiting nodes.

You can see that I like to place all the return statements at the beginning of the function because return statements are usually the base cases. Grouping them together makes the algorithm structure clearer.

In fact, if you prefer, you can place the if conditions elsewhere. For example, the graph traversal framework can be slightly adjusted:

CC++GoJavaJavaScriptPython
    
    
    // graph traversal framework
    boolean[] visited;
    void traverse(Graph graph, int v) {
        // pre-order traversal position, mark node v as visited
        visited[v] = true;
        for (int neighbor : graph.neighbors(v)) {
            if (!visited[neighbor]) {
                // only traverse unvisited neighboring nodes
                traverse(graph, neighbor);
            }
        }
    }

This approach places the check for `visited` before the recursive call. The only difference from the previous approach is that you need to ensure `visited[v] == false` when calling `traverse(v)`.

Why mention this specific approach? Because we use this method in the algorithm to determine bipartite graphs.

**To recall how to determine a bipartite graph, the`traverse` function is used to traverse the nodes and color them, attempting to make the colors of every pair of adjacent nodes different**.

Therefore, the code logic to determine a bipartite graph can be written like this:

CC++GoJavaJavaScriptPython
    
    
    // graph traversal framework
    void traverse(Graph graph, boolean[] visited, int v) {
        visited[v] = true;
        // traverse all adjacent nodes of node v
        for (int neighbor : graph.neighbors(v)) {
            if (!visited[neighbor]) {
                // the adjacent node neighbor has not been visited
                // then we should color node neighbor with a different color from node v
                traverse(graph, visited, neighbor);
            } else {
                // the adjacent node neighbor has already been visited
                // then we should compare the colors of node neighbor and node v
                // if they are the same, then this graph is not a bipartite graph
            }
        }
    }

If you can understand the above code, you can write the specific code for determining a bipartite graph. Next, let's practice with two specific algorithm problems.

## ¶Problem Practice

LeetCode Problem 785 "[Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)" is the original problem. You are given an input of an [adjacency list](/en/algo/data-structure-basic/graph-basic/) representing an undirected graph. Your task is to determine if this graph is a bipartite graph.

The function signature is as follows:

CC++GoJavaJavaScriptPython
    
    
    boolean isBipartite(int[][] graph);

For example, in the given input adjacency list `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]`, which represents the following graph:

![](/images/algo/bipartite-graph/1.png)

It is clear that the nodes cannot be colored such that every two adjacent nodes have different colors, so the algorithm returns false.

However, if the input is `graph = [[1,3],[0,2],[1,3],[0,2]]`, representing the following graph:

![](/images/algo/bipartite-graph/2.png)

By coloring nodes `{0, 2}` with one color and nodes `{1, 3}` with another color, the "two-color problem" can be solved, making it a bipartite graph, so the algorithm returns true.

In conjunction with the previous code framework, we can use an additional `color` array to record the color of each node, thus writing the solution code:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
    
        // record whether the graph is a bipartite graph
        private boolean ok = true;
        // record the color of the nodes in the graph,
        // false and true represent two different colors
        private boolean[] color;
        // record whether the nodes in the graph have been visited
        private boolean[] visited;
    
        // main function, input adjacency list, determine if it is a bipartite graph
        public boolean isBipartite(int[][] graph) {
            int n = graph.length;
            color = new boolean[n];
            visited = new boolean[n];
            // because the graph may not be connected, there may be multiple subgraphs
            // so we need to traverse each node as a starting point
            // if any subgraph is not a bipartite graph, the entire graph is not a bipartite graph
            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    traverse(graph, v);
                }
            }
            return ok;
        }
    
        // dfs traversal framework
        private void traverse(int[][] graph, int v) {
            // if it has been determined that it is not a bipartite graph,
            // there is no need to waste time on recursive traversal
            if (!ok) return;
    
            visited[v] = true;
            for (int w : graph[v]) {
                if (!visited[w]) {
                    // the adjacent node w has not been visited
                    // so node w should be colored with a different color from node v
                    color[w] = !color[v];
                    // continue to traverse w
                    traverse(graph, w);
                } else {
                    // the adjacent node w has already been visited
                    // determine if it is a bipartite graph based on the colors of v and w
                    if (color[w] == color[v]) {
                        // if the same, the graph is not a bipartite graph
                        ok = false;
                    }
                }
            }
        }
    
    }

You can click the line `visited[v] = true;` multiple times to observe the node coloring process.

Algorithm Visualization

Next, let's look at the logic of the BFS algorithm:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        // record whether the graph is bipartite
        private boolean ok = true;
        // record the color of each node in the graph;
        // false and true represent two different colors
        private boolean[] color;
        // record whether each node in the graph has been visited
        private boolean[] visited;
    
        public boolean isBipartite(int[][] graph) {
            int n = graph.length;
            color =  new boolean[n];
            visited =  new boolean[n];
            
            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    // use the BFS function instead
                    bfs(graph, v);
                }
            }
            
            return ok;
        }
    
        // perform BFS traversal starting from the start node
        private void bfs(int[][] graph, int start) {
            Queue<Integer> q = new LinkedList<>();
            visited[start] = true;
            q.offer(start);
            
            while (!q.isEmpty() && ok) {
                int v = q.poll();
                // spread from node v to all adjacent nodes
                for (int w : graph[v]) {
                    if (!visited[w]) {
                        // adjacent node w has not been visited
                        // therefore, node w should be colored differently from node v
                        color[w] = !color[v];
                        // mark node w and add it to the queue
                        visited[w] = true;
                        q.offer(w);
                    } else {
                        // adjacent node w has already been visited
                        // determine if the graph is bipartite based on the colors of v and w
                        if (color[w] == color[v]) {
                            // if they are the same, then the graph is not bipartite
                            ok = false;
                            return;
                        }
                    }
                }
            }
        }
    }

The core logic is identical to the previously implemented `traverse` function (DFS algorithm), which also judges based on the colors of adjacent nodes `v` and `w`. For a discussion on the BFS algorithm framework, refer to the previous articles [BFS Algorithm Framework](/en/algo/essential-technique/bfs-framework/) and [Dijkstra Algorithm Template](/en/algo/data-structure/dijkstra/), which will not be elaborated here.

Finally, let's look at LeetCode Problem 886 "[Possible Bipartition](https://leetcode.com/problems/possible-bipartition/)":

**886\. Possible Bipartition** |[LeetCode](https://leetcode.com/problems/possible-bipartition/)

We want to split a group of `n` people (labeled from `1` to `n`) into two groups of **any size**. Each person may dislike some other people, and they should not go into the same group.

Given the integer `n` and the array `dislikes` where `dislikes[i] = [ai, bi]` indicates that the person labeled `ai` does not like the person labeled `bi`, return `true` _if it is possible to split everyone into two groups in this way_.

**Example 1:**
    
    
    **Input:** n = 4, dislikes = [[1,2],[1,3],[2,4]]
    **Output:** true
    **Explanation:** The first group has [1,4], and the second group has [2,3].
    

**Example 2:**
    
    
    **Input:** n = 3, dislikes = [[1,2],[1,3],[2,3]]
    **Output:** false
    **Explanation:** We need at least 3 groups to divide them. We cannot put them in two groups.
    

**Constraints:**

  * `1 <= n <= 2000`
  * `0 <= dislikes.length <= 104`
  * `dislikes[i].length == 2`
  * `1 <= ai < bi <= n`
  * All the pairs of `dislikes` are **unique**.


The problem is from [LeetCode 886. Possible Bipartition](https://leetcode.com/problems/possible-bipartition/).

CC++GoJavaJavaScriptPython
    
    
    // The function signature is as follows
    boolean possibleBipartition(int n, int[][] dislikes);

**This problem essentially tests the determination of a bipartite graph** :

If you consider each person as a node in the graph and the dislike relationship as an edge, the `dislikes` array forms a graph;

Since the problem states that people who dislike each other cannot be in the same group, it means that all adjacent nodes in the graph must be in two different groups.

This brings us back to the "two-color problem." If it is possible to color all nodes with two colors where adjacent nodes have different colors, then you can divide these nodes into two groups based on their colors.

Therefore, the solution emerges. We construct a graph from the `dislikes` array and then execute the bipartite graph determination algorithm:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
    
        private boolean ok = true;
        private boolean[] color;
        private boolean[] visited;
    
        public boolean possibleBipartition(int n, int[][] dislikes) {
            // graph node numbering starts from 1
            color = new boolean[n + 1];
            visited = new boolean[n + 1];
            // convert the graph into an adjacency list
            List<Integer>[] graph = buildGraph(n, dislikes);
    
            for (int v = 1; v <= n; v++) {
                if (!visited[v]) {
                    traverse(graph, v);
                }
            }
            return ok;
        }
    
        // build graph function
        private List<Integer>[] buildGraph(int n, int[][] dislikes) {
            // graph node numbering is 1...n
            List<Integer>[] graph = new LinkedList[n + 1];
            for (int i = 1; i <= n; i++) {
                graph[i] = new LinkedList<>();
            }
            for (int[] edge : dislikes) {
                int v = edge[1];
                int w = edge[0];
                // "Undirected graph" is equivalent to "bidirectional graph"
                // v -> w
                graph[v].add(w);
                // w -> v
                graph[w].add(v);
            }
            return graph;
        }
    
        // this traverse function is exactly the same as
        // the one used to determine a bipartite graph
        private void traverse(List<Integer>[] graph, int v) {
            if (!ok) return;
            visited[v] = true;
            for (int w : graph[v]) {
                if (!visited[w]) {
                    color[w] = !color[v];
                    traverse(graph, w);
                } else {
                    if (color[w] == color[v]) {
                        ok = false;
                    }
                }
            }
        }
    
    }

Algorithm Visualization

At this point, this problem is also solved using the DFS algorithm. If you want to use the BFS algorithm, it is similar to the previous solution. During the spread, try coloring the adjacent elements. You can try to implement it yourself.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
