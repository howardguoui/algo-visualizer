# 旅游省钱大法：加权最短路径

> Source: https://labuladong.online/zh/algo/dynamic-programming/cheap-travel/
> Archived: labuladong.online — 算法笔记

---

# 旅游省钱大法：加权最短路径

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[787\. Cheapest Flights Within K Stops](<https://leetcode.com/problems/cheapest-flights-within-k-stops/>)| [787\. K 站中转内最便宜的航班](<https://leetcode.cn/problems/cheapest-flights-within-k-stops/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [图结构基础](</zh/algo/data-structure-basic/graph-basic/>)
  * [图结构遍历](</zh/algo/data-structure-basic/graph-traverse-basic/>)
  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)


毕业季，对过去也许有些欢乐和感伤，对未来也许有些迷茫和向往，不过这些终究是过眼云烟，迟早会被时间淡化和遗忘。

在这段美好时光的末尾，确实应该来一场说走就走的毕业旅行，放肆一把，给青春画上一个完美的句号。

那么，本文就教给你一个动态规划算法，在毕业旅行中省钱，节约追求诗和远方的资本。

假设，你准备从学校所在的城市出发，游历多个城市，一路浪到公司入职，那么你应该如何安排旅游路线，才能最小化机票的开销？

我们来看看力扣第 787 题「[K 站中转内最便宜的航班](<https://leetcode.cn/problems/cheapest-flights-within-k-stops/>)」：

**787\. K 站中转内最便宜的航班** |[力扣](<https://leetcode.cn/problems/cheapest-flights-within-k-stops/>)|[LeetCode](<https://leetcode.com/problems/cheapest-flights-within-k-stops/>)

有 `n` 个城市通过一些航班连接。给你一个数组 `flights` ，其中 `flights[i] = [fromi, toi, pricei]` ，表示该航班都从城市 `fromi` 开始，以价格 `pricei` 抵达 `toi`。

现在给定所有的城市和航班，以及出发城市 `src` 和目的地 `dst`，你的任务是找到出一条最多经过 `k` 站中转的路线，使得从 `src` 到 `dst` 的 **价格最便宜** ，并返回该价格。 如果不存在这样的路线，则输出 `-1`。

**示例 1：**
    
    
    **输入:** 
    n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
    src = 0, dst = 2, k = 1
    **输出:** 200
    **解释:** 
    城市航班图如下
    ![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png)
    
    从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。

**示例 2：**
    
    
    **输入:** 
    n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
    src = 0, dst = 2, k = 0
    **输出:** 500
    **解释:** 
    城市航班图如下
    ![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png)
    
    从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。

**提示：**

  * `1 <= n <= 100`
  * `0 <= flights.length <= (n * (n - 1) / 2)`
  * `flights[i].length == 3`
  * `0 <= fromi, toi < n`
  * `fromi != toi`
  * `1 <= pricei <= 104`
  * 航班没有重复，且不存在自环
  * `0 <= src, dst, k < n`
  * `src != dst`


题目来源：[力扣 787. K 站中转内最便宜的航班](<https://leetcode.cn/problems/cheapest-flights-within-k-stops/>)。

函数签名如下：

CC++GoJavaJavaScriptPython
    
    
    int findCheapestPrice(int n, int[][] flights, int src, int dst, int K);

**很明显，这题就是个加权有向图中求最短路径的问题** 。

说白了，就是给你一幅加权有向图，让你求 `src` 到 `dst` 权重最小的一条路径，同时要满足，**这条路径最多不能超过`K + 1` 条边**（经过 `K` 个节点相当于经过 `K + 1` 条边）。

我们来分析下求最短路径相关的算法。

更新时间：2026/03/14 00:17

Loading comments...
