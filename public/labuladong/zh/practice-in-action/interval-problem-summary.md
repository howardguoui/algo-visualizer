# 一个方法解决三道区间问题

> Source: https://labuladong.online/zh/algo/practice-in-action/interval-problem-summary/
> Archived: labuladong.online — 算法笔记

---

# 一个方法解决三道区间问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1288\. Remove Covered Intervals](<https://leetcode.com/problems/remove-covered-intervals/>)| [1288\. 删除被覆盖区间](<https://leetcode.cn/problems/remove-covered-intervals/>)|   
[56\. Merge Intervals](<https://leetcode.com/problems/merge-intervals/>)| [56\. 合并区间](<https://leetcode.cn/problems/merge-intervals/>)|   
[986\. Interval List Intersections](<https://leetcode.com/problems/interval-list-intersections/>)| [986\. 区间列表的交集](<https://leetcode.cn/problems/interval-list-intersections/>)|   
  
经常有读者问区间相关的问题，今天写一篇文章，秒杀三道区间相关的问题。

所谓区间问题，就是线段问题，让你合并所有线段、找出线段的交集等等。主要有两个技巧：

**1、排序** 。常见的排序方法就是按照区间起点排序，或者先按照起点升序排序，若起点相同，则按照终点降序排序。当然，如果你非要按照终点排序，无非对称操作，本质都是一样的。

**2、画图** 。就是说不要偷懒，勤动手，两个区间的相对位置到底有几种可能，不同的相对位置我们的代码应该怎么去处理。

废话不多说，下面我们来做题。
