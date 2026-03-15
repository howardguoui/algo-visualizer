# 谈谈游戏中的随机算法

> Source: https://labuladong.online/zh/algo/frequency-interview/random-algorithm/
> Archived: labuladong.online — 算法笔记

---

# 谈谈游戏中的随机算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[384\. Shuffle an Array](<https://leetcode.com/problems/shuffle-an-array/>)| [384\. 打乱数组](<https://leetcode.cn/problems/shuffle-an-array/>)|   
[382\. Linked List Random Node](<https://leetcode.com/problems/linked-list-random-node/>)| [382\. 链表随机节点](<https://leetcode.cn/problems/linked-list-random-node/>)|   
[398\. Random Pick Index](<https://leetcode.com/problems/random-pick-index/>)| [398\. 随机数索引](<https://leetcode.cn/problems/random-pick-index/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [数组基础](</zh/algo/data-structure-basic/array-basic/>)

没事儿的时候我喜欢玩玩那些经典的 2D 网页小游戏，我发现很多游戏都要涉及地图的随机生成，比如扫雷游戏中雷的位置应该是随机分布的：

![diagram](https://labuladong.online/images/algo/random-algo/1.jpg)

再比如经典炸弹人游戏，障碍物的位置也是有一定随机性的：

![diagram](https://labuladong.online/images/algo/random-algo/2.jpg)

这些 2D 游戏相较现在的大型 3D 游戏虽然看起来有些简陋，但依然用到很多有趣算法技巧，本文就来深入研究一下地图的随机生成算法。

2D 游戏的地图肯定可以抽象成一个二维矩阵，就拿扫雷举例吧，我们可以用下面这个类表示扫雷的棋盘：

```
class Game {
    int m, n;
    // 大小为 m * n 的二维棋盘
    // 值为 true 的地方代表有雷，false 代表没有雷
    boolean[][] board;
}
``` 

在开始游戏时，需要在棋盘中随机生成 `k` 个雷，也就是说需要在 `board` 中生成 `k` 个不同的 `(x, y)` 坐标，且这里面 `x, y` 都是随机生成的。

对于这个需求，**首先一个优化就是对二维矩阵进行「降维打击」，把二维数组转化成一维数组** ：

```
class Game {
    int m, n;
    // 长度为 m * n 的一维棋盘
    // 值为 true 的地方代表有雷，false 代表没有雷
    boolean[] board;

    // 将二维数组中的坐标 (x, y) 转化为一维数组中的索引
    int encode(int x, int y) {
        return x * n + y;
    }

    // 将一维数组中的索引转化为二维数组中的坐标 (x, y)
    int[] decode(int index) {
        return new int[] {index / n, index % n};
    }
}
``` 

这样，我们只要在 `[0, m * n)` 中选取一个随机数，就相当于在二维数组中随机选取了一个元素。

但问题是，我们现在需要随机选出 `k` 个**不同的位置** 放雷。你可能说，那在 `[0, m * n)` 中选出来 `k` 个随机数不就行了？

是的，但实际操作起来有些麻烦，因为你很难保证随机数不重复。如果出现重复的随机数，你就得再随机选一次，直到找到 `k` 个不同的随机数。

如果 `k` 比较小 `m * n` 比较大，那出现重复随机数的概率还比较低，但如果 `k` 和 `m * n` 的大小接近，那么出现重复随机数的概率非常高，算法的效率就会大幅下降。

那么，我们有没有更好的办法能够在线性的时间复杂度解决这个问题？其实是有的，而且有很多种解决方案。
