# 谁能想到，斗地主也能玩出算法

> Source: https://labuladong.online/zh/algo/practice-in-action/split-array-into-consecutive-subsequences/
> Archived: labuladong.online — 算法笔记

---

# 谁能想到，斗地主也能玩出算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[659\. Split Array into Consecutive Subsequences](<https://leetcode.com/problems/split-array-into-consecutive-subsequences/>)| [659\. 分割数组为连续子序列](<https://leetcode.cn/problems/split-array-into-consecutive-subsequences/>)|   
  
斗地主中，大小连续的牌可以作为顺子，有时候我们把对子拆掉，结合单牌，可以组合出更多的顺子，可能更容易赢。

那么如何合理拆分手上的牌，合理地拆出顺子呢？我们今天看一道非常有意思的算法题，连续子序列的划分问题。

这是力扣第 659 题「[分割数组为连续子序列](<https://leetcode.cn/problems/split-array-into-consecutive-subsequences/>)」，题目很简单：

给你输入一个**升序排列** 的数组 `nums`（可能包含重复数字），请你判断 `nums` 是否能够被分割成若干个**长度至少为 3** 的子序列，每个子序列都由连续的整数组成。

函数签名如下：

```java
boolean isPossible(int[] nums);
``` 

比如题目举的例子，输入 `nums = [1,2,3,3,4,4,5,5]`，算法返回 true。

因为 `nums` 可以被分割成 `[1,2,3,4,5]` 和 `[3,4,5]` 两个包含连续整数子序列。

但如果输入 `nums = [1,2,3,4,4,5]`，算法返回 false，因为无法分割成两个长度至少为 3 的连续子序列。

**对于这种涉及连续整数的问题，应该条件反射地想到排序** ，不过题目说了，输入的 `nums` 本就是排好序的。

那么，我们如何判断 `nums` 是否能够被划分成若干符合条件的子序列呢？

类似前文 [回溯算法进行集合划分](</zh/algo/practice-in-action/partition-to-k-equal-sum-subsets/>)，我们想把 `nums` 的元素划分到若干个子序列中，其实就是下面这个代码逻辑：
