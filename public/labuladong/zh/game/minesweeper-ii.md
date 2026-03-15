# 【游戏】扫雷 II

> Source: https://labuladong.online/zh/algo/game/minesweeper-ii/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】扫雷 II

前置知识

阅读本文前，你需要先学习：

  * [一文秒杀所有岛屿题目](</zh/algo/frequency-interview/island-dfs-summary/>)

扫雷游戏是一款经典的单机游戏，玩家需要在一个方块阵列中，根据已知信息判断未知的方块是否是地雷，并标记出地雷的位置。

在本次游戏挑战中，请你完成 `expandClick(board, i, j)` 函数，实现用户点击单元格展开地图的算法：

当点击一个单元格 `board[i][j]` 时，该单元格会显示周围 8 个单元格中的地雷数量；若该单元格就是雷，则直接返回；如果周围没有地雷（数字为 0），则继续自动展开周围的单元格，直到遇到有数字的单元格为止。

扫雷游戏地图展开算法

## 讲解

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
