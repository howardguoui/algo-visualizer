# 经典动态规划：戳气球

> Source: https://labuladong.online/zh/algo/dynamic-programming/burst-balloons/
> Archived: labuladong.online — 算法笔记

---

# 经典动态规划：戳气球

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[312\. Burst Balloons](<https://leetcode.com/problems/burst-balloons/>)| [312\. 戳气球](<https://leetcode.cn/problems/burst-balloons/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)

今天我们要聊的这道题「Burst Balloon」和之前我们写过的那篇 [经典动态规划：高楼扔鸡蛋问题](</zh/algo/dynamic-programming/egg-drop/>) 分析过的高楼扔鸡蛋问题类似，知名度比较高，但难度确实也不小。

它是力扣第 312 题「[戳气球](<https://leetcode.cn/problems/burst-balloons/>)」，题目如下：

**312\. 戳气球** |[力扣](<https://leetcode.cn/problems/burst-balloons/>)|[LeetCode](<https://leetcode.com/problems/burst-balloons/>)

有 `n` 个气球，编号为`0` 到 `n - 1`，每个气球上都标有一个数字，这些数字存在数组 `nums` 中。

现在要求你戳破所有的气球。戳破第 `i` 个气球，你可以获得 `nums[i - 1] * nums[i] * nums[i + 1]` 枚硬币。 这里的 `i - 1` 和 `i + 1` 代表和 `i` 相邻的两个气球的序号。如果 `i - 1`或 `i + 1` 超出了数组的边界，那么就当它是一个数字为 `1` 的气球。

求所能获得硬币的最大数量。

**示例 1：**

```
输入：nums = [3,1,5,8]
输出：167
解释：
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
``` 

**示例 2：**

```
输入：nums = [1,5]
输出：10
``` 

**提示：**

  * `n == nums.length`
  * `1 <= n <= 300`
  * `0 <= nums[i] <= 100`

题目来源：[力扣 312. 戳气球](<https://leetcode.cn/problems/burst-balloons/>)。

首先必须要说明，这个题目的状态转移方程真的比较巧妙，所以说如果你看了题目之后完全没有思路恰恰是正常的。虽然最优答案不容易想出来，但基本的思路分析是我们应该力求做到的。所以本文会先分析一下常规思路，然后再引入动态规划解法。

## 一、回溯思路

先来梳理一下解决这种问题的套路：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
