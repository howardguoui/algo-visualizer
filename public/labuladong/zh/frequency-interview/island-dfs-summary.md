# 一文秒杀所有岛屿题目

> Source: https://labuladong.online/zh/algo/frequency-interview/island-dfs-summary/
> Archived: labuladong.online — 算法笔记

---

# 一文秒杀所有岛屿题目

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[200\. Number of Islands](<https://leetcode.com/problems/number-of-islands/>)| [200\. 岛屿数量](<https://leetcode.cn/problems/number-of-islands/>)|   
[1254\. Number of Closed Islands](<https://leetcode.com/problems/number-of-closed-islands/>)| [1254\. 统计封闭岛屿的数目](<https://leetcode.cn/problems/number-of-closed-islands/>)|   
[1020\. Number of Enclaves](<https://leetcode.com/problems/number-of-enclaves/>)| [1020\. 飞地的数量](<https://leetcode.cn/problems/number-of-enclaves/>)|   
[695\. Max Area of Island](<https://leetcode.com/problems/max-area-of-island/>)| [695\. 岛屿的最大面积](<https://leetcode.cn/problems/max-area-of-island/>)|   
[1905\. Count Sub Islands](<https://leetcode.com/problems/count-sub-islands/>)| [1905\. 统计子岛屿](<https://leetcode.cn/problems/count-sub-islands/>)|   
[694\. Number of Distinct Islands](<https://leetcode.com/problems/number-of-distinct-islands/>)🔒| [694\. 不同岛屿的数量](<https://leetcode.cn/problems/number-of-distinct-islands/>)🔒|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [回溯算法核心框架](</zh/algo/essential-technique/backtrack-framework/>)
  * [关于回溯/DFS算法的若干疑问](</zh/algo/essential-technique/backtrack-vs-dfs/>)

岛屿系列算法问题是经典的面试高频题，虽然基本的问题并不难，但是这类问题有一些有意思的扩展，比如求子岛屿数量，求形状不同的岛屿数量等等，本文就来把这些问题一网打尽。

**岛屿系列题目的核心考点就是用 DFS/BFS 算法遍历二维数组** 。

本文主要来讲解如何用 DFS 算法来秒杀岛屿系列题目，不过用 BFS 算法的核心思路是完全一样的，无非就是把 DFS 改写成 BFS 而已。

那么如何在二维矩阵中使用 DFS 搜索呢？如果你把二维矩阵中的每一个位置看做一个节点，这个节点的上下左右四个位置就是相邻节点，那么整个矩阵就可以抽象成一幅网状的「图」结构。

根据 [学习数据结构和算法的框架思维](</zh/algo/essential-technique/algorithm-summary/>)，完全可以根据二叉树的遍历框架改写出二维矩阵的 DFS 代码框架：

```java
// 二叉树遍历框架
void traverse(TreeNode root) {
    traverse(root.left);
    traverse(root.right);
}

// 二维矩阵遍历框架
void dfs(int[][] grid, int i, int j, boolean[][] visited) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
        // 超出索引边界
        return;
    }
    if (visited[i][j]) {
        // 已遍历过 (i, j)
        return;
    }

    // 进入当前节点 (i, j)
    visited[i][j] = true;

    // 进入相邻节点（四叉树）
    // 上
    dfs(grid, i - 1, j, visited);
    // 下
    dfs(grid, i + 1, j, visited);
    // 左
    dfs(grid, i, j - 1, visited);
    // 右
    dfs(grid, i, j + 1, visited);
}
``` 

因为二维矩阵本质上是一幅「图」，所以遍历的过程中需要一个 `visited` 布尔数组防止走回头路，如果你能理解上面这段代码，那么搞定所有岛屿系列题目都很简单。

这里额外说一个处理二维数组的常用小技巧，你有时会看到使用「方向数组」来处理上下左右的遍历，和前文 [union-find 算法详解](</zh/algo/data-structure/union-find/>) 的代码很类似：

```java
// 方向数组，分别代表上、下、左、右
int[][] dirs = new int[][]{{-1,0}, {1,0}, {0,-1}, {0,1}};

void dfs(int[][] grid, int i, int j, boolean[][] visited) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
        // 超出索引边界
        return;
    }
    if (visited[i][j]) {
        // 已遍历过 (i, j)
        return;
    }

    // 进入节点 (i, j)
    visited[i][j] = true;
    // 递归遍历上下左右的节点
    for (int[] d : dirs) {
        int next_i = i + d[0];
        int next_j = j + d[1];
        dfs(grid, next_i, next_j, visited);
    }
    // 离开节点 (i, j)
}
``` 

这种写法无非就是用 for 循环处理上下左右的遍历罢了，你可以按照个人喜好选择写法。下面就按照上述框架结合可视化面板来解题。
