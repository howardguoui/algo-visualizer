# 如何同时寻找缺失和重复的元素

> Source: https://labuladong.online/zh/algo/frequency-interview/mismatch-set/
> Archived: labuladong.online — 算法笔记

---

# 如何同时寻找缺失和重复的元素

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[645\. Set Mismatch](<https://leetcode.com/problems/set-mismatch/>)| [645\. 错误的集合](<https://leetcode.cn/problems/set-mismatch/>)|   
[41\. First Missing Positive](<https://leetcode.com/problems/first-missing-positive/>)| [41\. 缺失的第一个正数](<https://leetcode.cn/problems/first-missing-positive/>)|   
  
今天就聊一道很看起来简单却十分巧妙的问题，寻找缺失和重复的元素。之前的一篇文章 [常用的位操作](</zh/algo/frequency-interview/bitwise-operation/>) 中也写过类似的问题，不过这次的和上次的问题使用的技巧不同。

这是力扣第 645 题「[错误的集合](<https://leetcode.cn/problems/set-mismatch/>)」，我来描述一下这个题目：

给一个长度为 `N` 的数组 `nums`，其中本来装着 `[1..N]` 这 `N` 个元素，无序。但是现在出现了一些错误，`nums` 中的一个元素出现了重复，也就同时导致了另一个元素的缺失。请你写一个算法，找到 `nums` 中的重复元素和缺失元素的值。

```java
// 返回两个数字，分别是 {dup, missing}
int[] findErrorNums(int[] nums);
``` 

比如说输入：`nums = [1,2,2,4]`，算法返回 `[2,3]`。

其实很容易解决这个问题，先遍历一次数组，用一个哈希表记录每个数字出现的次数，然后遍历一次 `[1..N]`，看看那个元素重复出现，那个元素没有出现，就 OK 了。

但问题是，这个常规解法需要一个哈希表，也就是 O(N) 的空间复杂度。你看题目给的条件那么巧，在 `[1..N]` 的几个数字中恰好有一个重复，一个缺失，那肯定想让我们用更巧妙的方法来求解。

O(N) 的时间复杂度遍历数组是无法避免的，所以我们可以想想办法如何降低空间复杂度，是否可以在 O(1) 的空间复杂度之下找到重复和缺失的元素呢？
