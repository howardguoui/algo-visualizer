# 【游戏】华容道游戏

> Source: https://labuladong.online/zh/algo/game/huarong-road/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】华容道游戏

前置知识

阅读本文前，你需要先学习：

  * [BFS 算法框架](</zh/algo/essential-technique/bfs-framework/>)


华容道游戏展示

![Video Cover](/images/algo/vod/huarong-road.jpg)

华容道游戏

华容道游戏就是 [BFS 算法框架](</zh/algo/essential-technique/bfs-framework/>) 中讲解的数字谜题问题的进阶版本，主要有以下几个不同：

1、数字谜题中，每个数字都占据一个格子，而华容道游戏中的每个棋子的形状和占据格子的数量不一样，曹操占据 4 个格子，五虎上将占据 2 个格子，小兵占据 1 个格子。

2、数字谜题仅要求我们记录完成游戏的最小步数，而这里的华容道没有要求步数最小，但是要求你记录具体操作步骤，这样才能调用 `gameHandler.move` 函数来操作棋盘，完成游戏。

我们可以用 BFS 算法对棋盘的所有移动进行穷举，同时使用额外的数据结构记录操作步骤，找到可行解后再调用 `gameHandler.move` 来操作棋盘，即可完成游戏。

游戏面板仅支持运行 JavaScript 代码，但是这道要求你实现的 `solveHuarongRoad` 函数求的是一个操作序列，不是游戏运行逻辑的一部分，所以我们可以变通一下，用任意编程语言实现算法，只要打印出类似这样的操作序列：
    
    
    gameHandler.move(10, 'left')
    gameHandler.move(9, 'right')
    gameHandler.move(5, 'down')
    ...

然后把这个操作序列复制到游戏面板的 `solveHuarongRoad` 函数中，也可以完成游戏，检验算法是否正确。

## ¶讲解

更新时间：2026/03/14 00:17

Loading comments...
