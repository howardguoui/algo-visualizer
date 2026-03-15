# 回溯算法实践：集合划分

> Source: https://labuladong.online/zh/algo/practice-in-action/partition-to-k-equal-sum-subsets/
> Archived: labuladong.online — 算法笔记

---

# 回溯算法实践：集合划分

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[698\. Partition to K Equal Sum Subsets](<https://leetcode.com/problems/partition-to-k-equal-sum-subsets/>)| [698\. 划分为k个相等的子集](<https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [多叉树结构及遍历框架](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [回溯算法框架套路](</zh/algo/essential-technique/backtrack-framework/>)
  * [球盒模型：回溯算法的两种穷举视角](</zh/algo/practice-in-action/two-views-of-backtrack/>)

我之前说过回溯算法是笔试中最好用的算法，只要你没什么思路，就用回溯算法暴力求解，即便不能通过所有测试用例，多少能过一点。回溯算法的技巧也不算难，就是穷举一棵决策树的过程，只要在递归之前「做选择」，在递归之后「撤销选择」就行了。

**但是，就算暴力穷举，不同的思路也有优劣之分** 。本文就来看一道非常经典的回溯算法问题，力扣第 698 题「[划分为k个相等的子集](<https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/>)」。这道题可以帮你更深刻理解回溯算法的思维，得心应手地写出回溯函数。

题目非常简单：

给你输入一个数组 `nums` 和一个正整数 `k`，请你判断 `nums` 是否能够被平分为元素和相同的 `k` 个子集。

函数签名如下：

```python
def canPartitionKSubsets(nums: List[int], k: int) -> bool:
``` 

思考题

我们之前 [背包问题之子集划分](</zh/algo/dynamic-programming/knapsack2/>) 写过一次子集划分问题，不过那道题只需要我们把集合划分成两个相等的集合，可以转化成背包问题用动态规划技巧解决。

为什么划分成两个相等的子集可以转化成背包问题用动态规划思路解决，而划分成 `k` 个相等的子集就不可以转化成背包问题，只能用回溯算法暴力穷举？请先尝试自己思考。

思考题答案

为什么划分两个相等的子集可以转化成背包问题？

[背包问题之子集划分](</zh/algo/dynamic-programming/knapsack2/>) 的场景中，有一个背包和若干物品，每个物品有**两个选择** ，分别是「装进背包」和「不装进背包」。把原集合 `S` 划分成两个相等子集 `S_1, S_2` 的场景下，`S` 中的每个元素也有**两个选择** ，分别是「装进 `S_1`」和「不装进 `S_1`（装进 `S_2`）」，这时候的穷举思路其实和背包问题相同。

但如果你想把 `S` 划分成 `k` 个相等的子集，相当于 `S` 中的每个元素有 **`k` 个选择**，这和标准背包问题的场景有本质区别，是无法套用背包问题的解题思路的。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
