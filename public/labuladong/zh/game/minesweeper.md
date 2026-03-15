# 【游戏】扫雷游戏地图生成器

> Source: https://labuladong.online/zh/algo/game/minesweeper/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】扫雷游戏地图生成器

扫雷游戏是一款经典的单机游戏，玩家需要在一个方块阵列中，根据已知信息判断未知的方块是否是地雷，并标记出地雷的位置。

在本次游戏挑战中，题目将给你输入 `width, height, mineCount` 三个参数，请你实现一个算法，生成扫雷游戏的初始地图，即一个 `width` 行 `height` 列的二维数组，其中随机分布着 `mineCount` 个地雷。

要求：你的算法必须是**均匀随机** 的，即每个方块是地雷的概率必须相等（P(x)=mineCountwidth×heightP(x) = \frac{mineCount}{width \times height}P(x)=width×heightmineCount​）。

扫雷游戏演示

请你尝试实现这个算法，点击「提交」按钮后即可用你的算法生成一个扫雷游戏地图，愉快的玩耍吧！

## 进阶

第一个问题，你的随机算法的时间复杂度是多少，空间复杂度是多少？你能不能把算法的空间复杂度控制在 O(mineCount)O(mineCount)O(mineCount)？

第二个问题，怎么证明你的随机算法是**均匀随机** 的？怎么证明每个格子被选中的概率都是相等的？

## 讲解

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
