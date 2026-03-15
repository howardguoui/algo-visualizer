# Basic Terminology in Graph Theory

> Source: https://labuladong.online/algo/en/data-structure-basic/graph-terminology/
> Archived: labuladong.online

---

# Basic Terminology in Graph Theory

A graph is made of some **vertices (nodes)** and **edges** :

  * Each vertex has a unique ID.
  * Edges can be directed (directed graph) or undirected (undirected graph).
  * Edges can have weights (weighted graph) or have no weights (unweighted graph).

## Edge weights and directions

Here is a directed unweighted graph:

In this graph there is a directed edge from node `1` to node `3`. This means you can go from node `1` to node `3` directly. But there is no directed edge from node `3` to node `1`, so you cannot go from node `3` to node `1` directly.

Here is an undirected unweighted graph:

In this graph there is an undirected edge between node `1` and node `3`. This means you can go from node `1` to node `3`, and also from node `3` to node `1`.

You can think of an undirected graph as a “two-way graph”. In code, we often implement an undirected edge as two directed edges in opposite directions.

Here is a directed weighted graph:

Here is an undirected weighted graph:

Weighted graphs are very common in real world. For example, in a map app, the weight of an edge can be the distance between two places. In a logistics network, the weight can be the shipping cost between two locations.

Many classic graph algorithms are based on weighted graphs, such as shortest path and minimum spanning tree. We will talk about them in later chapters.

## Degree

For each vertex in a graph, we have the idea of **degree**.

In an undirected graph, the degree of a vertex is the number of edges connected to it.

For example, in the undirected graph below, the degree of node `1` is 2, and the degree of node `4` is 4.

In a directed graph, edges have directions, so each vertex has **indegree** and **outdegree**.

For example, in the graph below, the indegree of node `3` is 2 (two edges point to it), and its outdegree is 1 (it has one edge going out to another node):

## Relation between number of edges and vertices

**In this article, when we talk about graphs, we usually mean simple graphs: graphs without self loops and multiple edges.**

![diagram](https://labuladong.online/images/algo/graph/simple-graph.jpg)

In a simple graph, suppose there are EEE edges and VVV vertices. What is the possible range of EEE?

The minimum value of EEE is 0. This means we only have some isolated vertices with no edges.

For the maximum value of EEE: each vertex can connect to at most V−1V - 1V−1 other vertices, so the maximum number of edges is E=V(V−1)2≈V2E = \frac{V(V - 1)}{2} \approx V^2E=2V(V−1)​≈V2.

If almost every pair of vertices has an edge between them, that is, EEE is close to V2V^2V2, we call the graph a **dense graph**. If there are few edges and EEE is much smaller than V2V^2V2, we call it a **sparse graph**.

## Subgraph

Subgraph is an important basic concept in graph theory.

**Subgraph** : If all vertices and edges of graph G′G'G′ are contained in graph GGG, then G′G'G′ is a subgraph of GGG. In simple words, a subgraph can be formed by deleting some vertices and edges from the original graph.

Let this graph be GGG. We use it to explain subgraphs. There are two special types of subgraphs:

**Spanning subgraph** : a subgraph that contains all vertices of the original graph, but only part of the edges.

The graph below is a spanning subgraph of $G`. It keeps all vertices but removes the edge between node `3`and node`4`.

**Induced subgraph** : choose some vertices from the original graph, and include all edges between these vertices that exist in the original graph.

The graph below is an induced subgraph of G‘.Itcontainsvertices‘1,2,3,4‘andalledgesamongthemthatexistinG`. It contains vertices `1,2,3,4` and all edges among them that exist in G‘.Itcontainsvertices‘1,2,3,4‘andalledgesamongthemthatexistinG$.

Subgraphs are used in many graph algorithms. For example, when we search for a minimum spanning tree, we are actually looking for a spanning subgraph that contains all vertices and has minimum total edge weight.

## Connectivity

Connectivity is a very important concept in graph theory. It describes whether there is a path between vertices.

### Connectivity in undirected graphs

**Connected graph** : In an undirected graph, if there is a path between every pair of vertices, we say the graph is connected.

This is a connected graph. From any vertex, you can reach all other vertices.

**Connected component** : For a disconnected undirected graph, each connected subgraph is called a connected component. A graph can have multiple connected components.

For example, the graph below has two connected components: vertices `1~5` form one component, and vertices `6,7` form another component.

### Connectivity in directed graphs

Connectivity in directed graphs is a bit more complex, because we must consider edge directions. We have strong connectivity and weak connectivity. You just need a basic idea here. In real interview problems, we usually focus on connectivity in undirected graphs.

**Strongly connected graph** : In a directed graph, if there is a directed path between every pair of vertices (both ways), we say the graph is strongly connected.

For example, the graph below is strongly connected. From any vertex, you can reach all other vertices.

**Weakly connected graph** : If we replace all directed edges by undirected edges, and the resulting undirected graph is connected, then the original directed graph is weakly connected.

For example, the graph below is not strongly connected (you cannot go from node `4` to node `1`), but it is weakly connected, because if we ignore edge directions, all vertices are connected.

**Strongly connected component (SCC)** : In a directed graph, each maximal strongly connected subgraph is called a strongly connected component.

For example, the graph below has two SCCs: vertices `1~3` form one SCC, and vertices `4~6` form another.

**Weakly connected component (WCC)** : If we replace all directed edges in a directed graph with undirected edges, the connected components in this undirected graph are called weakly connected components of the original directed graph.

There are many more terms in graph theory. But for data structures and algorithms, the terms above are enough. Later, when we learn specific graph algorithms, we will use these ideas in real problems.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
