# Dijkstra 算法核心原理及实现

> Source: https://labuladong.online/zh/algo/data-structure/dijkstra/
> Archived: labuladong.online — 算法笔记

---

# Dijkstra 算法核心原理及实现

前置知识

阅读本文前，你需要先学习：

  * [图结构基础及通用实现](</zh/algo/data-structure-basic/graph-basic/>)
  * [图结构最短路径算法概览](</zh/algo/data-structure-basic/graph-shortest-path/>)
  * [图结构的 DFS/BFS 遍历](</zh/algo/data-structure-basic/graph-traverse-basic/>)


一句话总结

Dijkstra 算法是一种用于计算图中单源最短路径的算法，**其本质是标准 BFS 算法 + 贪心思想** 。

如果图中包含负权重边，会让贪心思想失效，所以 **Dijkstra 只能处理不包含负权重边的图** 。

Dijkstra 算法和标准的 BFS 算法的区别只有两个：

1、标准 BFS 算法使用普通队列，Dijkstra 算法使用优先级队列，让距离起点更近的节点优先出队（贪心思想的体现）。

2、标准 BFS 算法使用一个 `visited` 数组记录访问过的节点，确保算法不会陷入死循环；Dijkstra 算法使用一个 `distTo` 数组，确保算法不会陷入死循环，同时记录起点到其他节点的最短路径。

在 [图结构最短路径算法概览](</zh/algo/data-structure-basic/graph-shortest-path/>) 中我们已经简要介绍了图结构中的最短路径问题、单源最短路径和多源最短路径的区别、负权重边产生的问题、以及包括 Dijkstra 算法在内的几种经典最短路径算法，本文会包含以下内容：

1、基于标准的 [图结构 BFS 遍历算法](</zh/algo/data-structure-basic/graph-traverse-basic/>) 拓展出 Dijkstra 算法的代码。

2、详细介绍 Dijkstra 算法的实现原理，并证明算法的正确性。

3、点到点最短路径问题是单源最短路径的一个特例，对标准的 Dijkstra 算法代码稍作修改即可优化效率。

掌握原理和代码模板后，下篇文章中会修改标准 Dijkstra 算法代码，解决更复杂的多约束条件下的最短路径问题。

本文会用到 [图结构基础及通用实现](</zh/algo/data-structure-basic/graph-basic/>) 中定义的图结构接口，请先阅读相关章节了解图结构的存储方法和接口定义。

下面进入正题。

## ¶Dijkstra 算法代码

我们首先给出代码实现，因为只需对标准 BFS 算法稍作修改即可得到 Dijkstra 算法，比较简单。我们先来看看有哪些修改，然后再探讨为什么这些修改是正确的。

[图结构 BFS 遍历算法](</zh/algo/data-structure-basic/graph-traverse-basic/>) 中介绍了三种 BFS 写法，其中第三种写法就特别适合 Dijkstra 算法，因为我们需要维护从起点到当前遍历的节点的最短路径。

对比来看，这是标准的图结构 BFS 遍历算法：

CC++GoJavaJavaScriptPython
    
    
    // 图结构的 BFS 遍历，从节点 s 开始进行 BFS，且记录遍历步数（从起点 s 到当前节点的边的条数）
    // 每个节点自行维护 State 类，记录从 s 走来的遍历步数
    class State {
        // 当前节点 ID
        int node;
        // 从起点 s 到当前节点的遍历步数
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

这个算法中，我们用 `State.step` 记录从起点到当前节点的最少步数（边的条数），并使用 `visited` 数组记录访问过的节点，保证每个节点只会被访问一次（即入队和出队一次），避免算法进入死循环。

在加权图场景中，最短路径问题想要计算的是从起点到其他节点的最小路径权重和，因为每条边可以有不同的权重，所以上述算法中计算的最少步数（边的条数）已经没有意义了，并不能得到权重和最小的路径。

这是 Dijkstra 算法代码，其中不同的地方高亮标记了：

更新时间：2026/03/14 00:17

Loading comments...
