# 背包问题的变体：目标和

> Source: https://labuladong.online/zh/algo/dynamic-programming/target-sum/
> Archived: labuladong.online — 算法笔记

---

# 背包问题的变体：目标和

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[494\. Target Sum](<https://leetcode.com/problems/target-sum/>)| [494\. 目标和](<https://leetcode.cn/problems/target-sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)


我们前文经常说回溯算法和递归算法有点类似，有的问题如果实在想不出状态转移方程，尝试用回溯算法暴力解决也是一个聪明的策略，总比写不出来解法强。

那么，回溯算法和动态规划到底是啥关系？它俩都涉及递归，算法模板看起来还挺像的，都涉及做「选择」，真的酷似父与子。

![](/images/algo/targetSum/1.jpg)

那么，它俩具体有啥区别呢？回溯算法和动态规划之间，是否可能互相转化呢？

今天就用力扣第 494 题「[目标和](<https://leetcode.cn/problems/target-sum/>)」来详细对比一下回溯算法和动态规划，题目如下：

**494\. 目标和** |[力扣](<https://leetcode.cn/problems/target-sum/>)|[LeetCode](<https://leetcode.com/problems/target-sum/>)

给你一个非负整数数组 `nums` 和一个整数 `target` 。

向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，可以构造一个 **表达式** ：

  * 例如，`nums = [2, 1]` ，可以在 `2` 之前添加 `'+'` ，在 `1` 之前添加 `'-'` ，然后串联起来得到表达式 `"+2-1"` 。


返回可以通过上述方法构造的、运算结果等于 `target` 的不同 **表达式** 的数目。

**示例 1：**
    
    
    **输入：** nums = [1,1,1,1,1], target = 3
    **输出：** 5
    **解释：** 一共有 5 种方法让最终目标和为 3 。
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3
    

**示例 2：**
    
    
    **输入：** nums = [1], target = 1
    **输出：** 1
    

**提示：**

  * `1 <= nums.length <= 20`
  * `0 <= nums[i] <= 1000`
  * `0 <= sum(nums[i]) <= 1000`
  * `-1000 <= target <= 1000`


题目来源：[力扣 494. 目标和](<https://leetcode.cn/problems/target-sum/>)。

函数的签名如下：

CC++GoJavaJavaScriptPython
    
    
    int findTargetSumWays(int[] nums, int target);

## ¶一、回溯思路

其实我第一眼看到这个题目，花了两分钟就写出了一个回溯解法。

任何算法的核心都是穷举，回溯算法就是一个暴力穷举算法，前文 [回溯算法解题框架](</zh/algo/essential-technique/backtrack-framework/>) 就写了回溯算法框架：
    
    
    def backtrack(路径, 选择列表):
        if 满足结束条件:
            result.add(路径)
            return
        
        for 选择 in 选择列表:
            做选择
            backtrack(路径, 选择列表)
            撤销选择

关键就是搞清楚什么是「选择」，而对于这道题，「选择」不是明摆着的吗？**对于每个数字`nums[i]`，我们可以选择给一个正号 `+` 或者一个负号 `-`**，然后利用回溯模板穷举出来所有可能的结果，数一数到底有几种组合能够凑出 `target` 不就行了嘛？

伪码思路如下：

更新时间：2026/03/14 00:17

Loading comments...
