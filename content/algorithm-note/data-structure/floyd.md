# 多源最短路径：Floyd 算法

> Source: https://labuladong.online/zh/algo/data-structure/floyd/
> Archived: labuladong.online — 算法笔记

---

# 多源最短路径：Floyd 算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1334\. Find the City With the Smallest Number of Neighbors at a Threshold Distance](<https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/>)| [1334\. 阈值距离内邻居最少的城市](<https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [图结构最短路径算法概览](</zh/algo/data-structure-basic/graph-shortest-path/>)
  * [动态规划算法核心套路](</zh/algo/essential-technique/dynamic-programming-framework/>)


在 [图结构最短路径算法概览](</zh/algo/data-structure-basic/graph-shortest-path/>) 中，我们详细介绍了图论中单源最短路径、多源最短路径、点对点最短路径几种场景，以及几种经典最短路径算法的区别与联系。

在 [最便宜的旅行路径](</zh/algo/dynamic-programming/cheap-travel/>) 中，我们用动态规划求解过从 `src` 到 `dst` 的最短路径（点对点最短路径问题），而本文要解决的是多源最短路径问题，不能直接套用。

Floyd 算法基于动态规划思想，代码实现非常简单，但想要彻底理解其原理，需要费点功夫。下面先直接给出 Floyd 算法的代码以及例题，然后再详细讲解状态转移方程的推导过程。

## ¶Floyd 算法代码

Floyd 算法的代码如下，其中 `Graph` 是 [图结构代码实现](</zh/algo/data-structure-basic/graph-basic/>) 中的通用接口：
    
    
    int[][] floyd(Graph graph) {
        int n = graph.nodeCount();
    
        // 定义：dp[i][j] 的值为节点 i 到节点 j 的最短路径权重
        int[][] dp = new int[n][n];
    
        // base case
        // 节点到其自身的路径权重为 0，所以 dp[i][i] 初始化为 0
        // 对于直接相邻的节点，dp[i][j] 初始化为边的权重
        // 对于不直接相邻的节点，dp[i][j] 初始化为 +inf
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
    
        // 状态转移
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    // 为了防止 dp[i][k] + dp[k][j] 导致 int 溢出，需要额外判断
                    if (dp[i][k] != Integer.MAX_VALUE && dp[k][j] != Integer.MAX_VALUE) {
                        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
                    }
                }
            }
        }
        return dp;
    }
    
    // 计算多源最短路径
    // 其中 dist[i][j] 为节点 i 到节点 j 的最短路径权重
    int[][] dist = floyd(graph);

可以看出上述代码就是一个标准的动态规划问题的解法代码，其中：

`dp` 数组的定义是 `dp[i][j]` 存储节点 `i` 到节点 `j` 的最短路径权重。

对于直接相邻的节点 `i, j`，`dp[i][j]` 的值初始化为边的权重，不直接相邻的节点，初始化为 `+inf`，这就是 base case。

状态转移方程就是三层嵌套 for 循环的部分，也是 Floyd 算法的核心：
    
    
    // 状态转移
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
            }
        }
    }

这样，Floyd 算法就完成了，时间复杂度是 O(n3)O(n^3)O(n3)，空间复杂度是 O(n2)O(n^2)O(n2)，其中 nnn 是图的节点数。

更新时间：2026/03/14 00:17

Loading comments...
