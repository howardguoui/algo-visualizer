# 贪心算法之区间调度问题

> Source: https://labuladong.online/zh/algo/frequency-interview/interval-scheduling/
> Archived: labuladong.online — 算法笔记

---

# 贪心算法之区间调度问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[435\. Non-overlapping Intervals](<https://leetcode.com/problems/non-overlapping-intervals/>)| [435\. 无重叠区间](<https://leetcode.cn/problems/non-overlapping-intervals/>)|   
[452\. Minimum Number of Arrows to Burst Balloons](<https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/>)| [452\. 用最少数量的箭引爆气球](<https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/>)|   
  
什么是贪心算法呢？贪心算法可以认为是动态规划算法的一个特例，相比动态规划，使用贪心算法需要满足更多的条件（贪心选择性质），但是效率比动态规划要高。

比如说一个算法问题使用暴力解法需要指数级时间，如果能使用动态规划消除重叠子问题，就可以降到多项式级别的时间，如果满足贪心选择性质，那么可以进一步降低时间复杂度，达到线性级别的。

什么是贪心选择性质呢，简单说就是：每一步都做出一个局部最优的选择，最终的结果就是全局最优。注意哦，这是一种特殊性质，其实只有一部分问题拥有这个性质。

比如你面前放着 100 张人民币，你只能拿十张，怎么才能拿最多的面额？显然每次选择剩下钞票中面值最大的一张，最后你的选择一定是最优的。

然而，大部分问题明显不具有贪心选择性质。比如打斗地主，对手出对儿三，按照贪心策略，你应该出尽可能小的牌刚好压制住对方，但现实情况要视对手的情况而定，我们甚至可能会出王炸。这种情况就不能用贪心算法，只能使用更复杂的穷举算法找到最优解。

## ¶一、问题概述

言归正传，本文解决一个很经典的贪心算法问题 Interval Scheduling（区间调度问题），也就是力扣第 435 题「[无重叠区间](<https://leetcode.cn/problems/non-overlapping-intervals/>)」：

给你很多形如 `[start, end]` 的闭区间，请你设计一个算法，**算出这些区间中最多有几个互不相交的区间** 。

CC++GoJavaJavaScriptPython
    
    
    int intervalSchedule(int[][] intvs);

举个例子，`intvs = [[1,3], [2,4], [3,6]]`，这些区间最多有 2 个区间互不相交，即 `[[1,3], [3,6]]`，你的算法应该返回 2。注意边界相同并不算相交。

这个问题在生活中的应用广泛，比如你今天有好几个活动，每个活动都可以用区间 `[start, end]` 表示开始和结束的时间，请问你今天**最多能参加几个活动呢** ？显然你一个人不能同时参加两个活动，所以说这个问题就是求这些时间区间的最大不相交子集。

更新时间：2026/03/14 00:17

Loading comments...
