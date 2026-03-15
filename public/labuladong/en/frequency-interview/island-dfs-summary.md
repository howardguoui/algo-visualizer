# Solve All Island Problems with DFS

> Source: https://labuladong.online/algo/en/frequency-interview/island-dfs-summary/
> Archived: labuladong.online

---

# Solve All Island Problems with DFS

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[200\. Number of Islands](https://leetcode.com/problems/number-of-islands/)|   
[1254\. Number of Closed Islands](https://leetcode.com/problems/number-of-closed-islands/)|   
[1020\. Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/)|   
[695\. Max Area of Island](https://leetcode.com/problems/max-area-of-island/)|   
[1905\. Count Sub Islands](https://leetcode.com/problems/count-sub-islands/)|   
[694\. Number of Distinct Islands](https://leetcode.com/problems/number-of-distinct-islands/)🔒|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Binary Tree Algorithms (Overview)](/en/algo/essential-technique/binary-tree-summary/)
  * [Backtracking Algorithm Core Framework](/en/algo/essential-technique/backtrack-framework/)
  * [Common Questions About Backtracking/DFS](/en/algo/essential-technique/backtrack-vs-dfs/)


The island problems are classic and very common in interviews. The basic versions are not hard, but there are many interesting variations, like counting sub‑islands, or counting islands with different shapes. This article will cover them all.

**The core of island problems is using DFS/BFS to traverse a 2D grid.**

In this article, we focus on how to use DFS to quickly solve island problems. The key idea for BFS is exactly the same; you just change DFS to BFS.

How do we use DFS in a 2D grid? If you treat each cell in the grid as a node, then its up, down, left, and right neighbors are its adjacent nodes. In this way, the whole grid can be seen as a mesh‑like “graph”.

Based on the ideas from [A Framework for Learning Data Structures and Algorithms](/en/algo/essential-technique/algorithm-summary/), we can rewrite the binary tree traversal template into a DFS template for a 2D grid:

CC++GoJavaJavaScriptPython
    
    
    // Binary tree traversal framework
    void traverse(TreeNode root) {
        traverse(root.left);
        traverse(root.right);
    }
    
    // Two-dimensional matrix traversal framework
    void dfs(int[][] grid, int i, int j, boolean[][] visited) {
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // out of index bounds
            return;
        }
        if (visited[i][j]) {
            // already visited (i, j)
            return;
        }
    
        // enter the current node (i, j)
        visited[i][j] = true;
    
        // enter adjacent nodes (quadtree)
        // up
        dfs(grid, i - 1, j, visited);
        // down
        dfs(grid, i + 1, j, visited);
        // left
        dfs(grid, i, j - 1, visited);
        // right
        dfs(grid, i, j + 1, visited);
    }

Because a 2D grid is essentially a “graph”, we need a `visited` boolean array during traversal to avoid going back to the same cell again. If you understand the code above, then all island problems become easy.

Here is a common trick when working with 2D arrays. You will sometimes see a “direction array” to handle moving up, down, left, and right. This is very similar to the code in [Union-Find Algorithm Explained](/en/algo/data-structure/union-find/):

CC++GoJavaJavaScriptPython
    
    
    // Direction array, representing up, down, left, right respectively
    int[][] dirs = new int[][]{{-1,0}, {1,0}, {0,-1}, {0,1}};
    
    void dfs(int[][] grid, int i, int j, boolean[][] visited) {
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // out of index bounds
            return;
        }
        if (visited[i][j]) {
            // already visited (i, j)
            return;
        }
    
        // enter node (i, j)
        visited[i][j] = true;
        // recursively visit the nodes above, below, left and right
        for (int[] d : dirs) {
            int next_i = i + d[0];
            int next_j = j + d[1];
            dfs(grid, next_i, next_j, visited);
        }
        // leave node (i, j)
    }

This style just uses a for loop to handle the four directions. You can choose whichever style you prefer. Next, we will solve problems using this framework together with the visual panel.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
