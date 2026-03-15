# 经典动态规划：完全背包问题

> Source: https://labuladong.online/zh/algo/dynamic-programming/knapsack3/
> Archived: labuladong.online — 算法笔记

---

# 经典动态规划：完全背包问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[518\. Coin Change II](<https://leetcode.com/problems/coin-change-ii/>)| [518\. 零钱兑换 II](<https://leetcode.cn/problems/coin-change-ii/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)
  * [0-1 背包问题详解](</zh/algo/dynamic-programming/knapsack1/>)

[动态规划套路详解](</zh/algo/essential-technique/dynamic-programming-framework/>) 详细讲解了力扣第 322 题「零钱兑换 I」。本文讲的零钱兑换 II 是另一种典型背包问题的变体，我们前文已经讲了 [经典动态规划：0-1 背包问题](</zh/algo/dynamic-programming/knapsack1/>) 和 [背包问题变体：相等子集分割](</zh/algo/dynamic-programming/knapsack2/>)。

**读本文之前，希望你已经看过前两篇文章** ，看过了动态规划和背包问题的套路，这篇继续按照背包问题的套路，列举一个背包问题的变形。

来看力扣第 518 题「[零钱兑换 II](<https://leetcode.cn/problems/coin-change-ii/>)」：

**518\. 零钱兑换 II** |[力扣](<https://leetcode.cn/problems/coin-change-ii/>)|[LeetCode](<https://leetcode.com/problems/coin-change-ii/>)

给你一个整数数组 `coins` 表示不同面额的硬币，另给一个整数 `amount` 表示总金额。

请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 `0` 。

假设每一种面额的硬币有无限个。 

题目数据保证结果符合 32 位带符号整数。

**示例 1：**

```
输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
``` 

**示例 2：**

```
输入：amount = 3, coins = [2]
输出：0
解释：只用面额 2 的硬币不能凑成总金额 3 。
``` 

**示例 3：**

```
输入：amount = 10, coins = [10] 
输出：1
``` 

**提示：**

  * `1 <= coins.length <= 300`
  * `1 <= coins[i] <= 5000`
  * `coins` 中的所有值 **互不相同**
  * `0 <= amount <= 5000`

题目来源：[力扣 518. 零钱兑换 II](<https://leetcode.cn/problems/coin-change-ii/>)。

我们要完成的函数的签名如下：

```java
int change(int amount, int[] coins);
``` 

我们可以把这个问题转化为背包问题的描述形式：

有一个背包，最大容量为 `amount`，有一系列物品 `coins`，每个物品的重量为 `coins[i]`，**每个物品的数量无限** 。请问有多少种方法，能够把背包恰好装满？

这个问题和我们前面讲过的两个背包问题，有一个最大的区别就是，每个物品的数量是无限的，这也就是传说中的「**完全背包问题** 」，没啥高大上的，无非就是状态转移方程有一点变化而已。

下面就以背包问题的描述形式，继续按照流程来分析。
