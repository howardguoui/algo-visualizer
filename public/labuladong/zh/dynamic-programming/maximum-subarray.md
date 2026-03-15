# 动态规划设计：最大子数组

> Source: https://labuladong.online/zh/algo/dynamic-programming/maximum-subarray/
> Archived: labuladong.online — 算法笔记

---

# 动态规划设计：最大子数组

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[53\. Maximum Subarray](<https://leetcode.com/problems/maximum-subarray/>)| [53\. 最大子数组和](<https://leetcode.cn/problems/maximum-subarray/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [前缀和技巧](</zh/algo/data-structure/prefix-sum/>)
  * [滑动窗口算法框架详解](</zh/algo/essential-technique/sliding-window-framework/>)
  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)

力扣第 53 题「[最大子序和](<https://leetcode.cn/problems/maximum-subarray/>)」问题和前文讲过的 [经典动态规划：最长递增子序列](</zh/algo/dynamic-programming/longest-increasing-subsequence/>) 的套路非常相似，代表着一类比较特殊的动态规划问题的思路，题目如下：

给你输入一个整数数组 `nums`，请你找在其中找一个和最大的子数组，返回这个子数组的和。函数签名如下：

```python
def maxSubArray(nums: List[int]) -> int:
``` 

比如说输入 `nums = [-3,1,3,-1,2,-4,2]`，算法返回 5，因为最大子数组 `[1,3,-1,2]` 的和为 5。

其实第一次看到这道题，我首先想到的是滑动窗口算法，因为滑动窗口算法就是专门处理子串/子数组问题的，这里不就是子数组问题么？

前文 [滑动窗口算法框架详解](</zh/algo/essential-technique/sliding-window-framework/>) 中讲过，想用滑动窗口算法，先问自己几个问题：

1、什么时候应该扩大窗口？

2、什么时候应该缩小窗口？

3、什么时候更新答案？

我之前认为这题用不了滑动窗口算法，理由是在包含负数的条件下对 `nums` 求和，应该无法确定什么时候扩大和缩小窗口（类似 [前缀和习题](</zh/algo/problem-set/perfix-sum/>) 中讲解的第 560 题）。但经读者评论的启发，我发现这道题确实是可以用滑动窗口技巧解决，不过有些 case 有点过于精巧，确实不容易想到。

所以我认为滑动窗口解法可以作为思路拓展，真正遇到类似的问题，还是以动态规划/前缀和的思路来做，更容易按照模板化的思维解决问题。下面我来依次讲解这三种解法。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
