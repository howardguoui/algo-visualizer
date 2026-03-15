# 一个方法团灭 LeetCode 打家劫舍问题

> Source: https://labuladong.online/zh/algo/dynamic-programming/house-robber/
> Archived: labuladong.online — 算法笔记

---

# 一个方法团灭 LeetCode 打家劫舍问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[198\. House Robber](<https://leetcode.com/problems/house-robber/>)| [198\. 打家劫舍](<https://leetcode.cn/problems/house-robber/>)|   
[213\. House Robber II](<https://leetcode.com/problems/house-robber-ii/>)| [213\. 打家劫舍 II](<https://leetcode.cn/problems/house-robber-ii/>)|   
[337\. House Robber III](<https://leetcode.com/problems/house-robber-iii/>)| [337\. 打家劫舍 III](<https://leetcode.cn/problems/house-robber-iii/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)


今天来讲「打家劫舍」系列问题（英文版叫 House Robber），这个系列是比较有代表性和技巧性的动态规划题目。

打家劫舍系列总共有三道，难度设计比较合理，层层递进。第一道是比较标准的动态规划问题，而第二道融入了环形数组的条件，第三道更绝，把动态规划的自底向上和自顶向下解法和二叉树结合起来，我认为很有启发性。

下面，我们从第一道开始分析。

## ¶打家劫舍 I

力扣第 198 题「[打家劫舍](<https://leetcode.cn/problems/house-robber/>)」的题目如下：

街上有一排房屋，用一个包含非负整数的数组 `nums` 表示，每个元素 `nums[i]` 代表第 `i` 间房子中的现金数额。现在你是一名专业盗贼，你希望**尽可能多** 的盗窃这些房子中的现金，但是，**相邻的房子不能被同时盗窃** ，否则会触发报警器，你就凉凉了。

请你写一个算法，计算在不触动报警器的前提下，最多能够盗窃多少现金呢？函数签名如下：

CC++GoJavaJavaScriptPython
    
    
    int rob(int[] nums);

比如说输入 `nums=[2,1,7,9,3,1]`，算法返回 12，小偷可以盗窃 `nums[0], nums[3], nums[5]` 三个房屋，得到的现金之和为 2 + 9 + 1 = 12，是最优的选择。

题目很容易理解，而且动态规划的特征很明显。我们前文 [动态规划详解](</zh/algo/essential-technique/dynamic-programming-framework/>) 做过总结，**解决动态规划问题就是找「状态」和「选择」，仅此而已** 。

更新时间：2026/03/14 00:17

Loading comments...
