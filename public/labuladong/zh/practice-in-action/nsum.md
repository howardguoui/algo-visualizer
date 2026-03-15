# 一个方法团灭 nSum 问题

> Source: https://labuladong.online/zh/algo/practice-in-action/nsum/
> Archived: labuladong.online — 算法笔记

---

# 一个方法团灭 nSum 问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1\. Two Sum](<https://leetcode.com/problems/two-sum/>)| [1\. 两数之和](<https://leetcode.cn/problems/two-sum/>)|   
[167\. Two Sum II - Input Array Is Sorted](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>)| [167\. 两数之和 II - 输入有序数组](<https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/>)|   
[15\. 3Sum](<https://leetcode.com/problems/3sum/>)| [15\. 三数之和](<https://leetcode.cn/problems/3sum/>)|   
[18\. 4Sum](<https://leetcode.com/problems/4sum/>)| [18\. 四数之和](<https://leetcode.cn/problems/4sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [数组双指针技巧汇总](</zh/algo/essential-technique/array-two-pointers-summary/>)

经常刷力扣的读者肯定知道鼎鼎有名的 `twoSum` 问题，不过除了 `twoSum` 问题，力扣上面还有 `3Sum`，`4Sum` 问题，以后如果想出个 `5Sum`，`6Sum` 也不是不可以。

总结来说，这类 `nSum` 问题就是给你输入一个数组 `nums` 和一个目标和 `target`，让你从 `nums` 选择 `n` 个数，使得这些数字之和为 `target`。

那么，对于这种问题有没有什么好办法用套路解决呢？本文就由浅入深，层层推进，用一个函数来解决所有 `nSum` 类型的问题。

## 一、twoSum 问题

我先来编一道 twoSum 题目：

如果假设输入一个数组 `nums` 和一个目标和 `target`，**请你返回`nums` 中能够凑出 `target` 的两个元素的值**，比如输入 `nums = [1,3,5,6], target = 9`，那么算法返回两个元素 `[3,6]`。可以假设只有且仅有一对儿元素可以凑出 `target`。

我们可以先对 `nums` 排序，然后利用前文 [双指针技巧](</zh/algo/essential-technique/array-two-pointers-summary/>) 写过的左右双指针技巧，从两端相向而行就行了：

```python
def twoSum(nums, target):
    # 先对数组排序
    nums.sort()
    # 左右指针
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        sum_nums = nums[lo] + nums[hi]
        # 根据 sum 和 target 的比较，移动左右指针
        if sum_nums < target:
            lo += 1
        elif sum_nums > target:
            hi -= 1
        elif sum_nums == target:
            return [nums[lo], nums[hi]]
    return []
``` 

这样就可以解决这个问题，力扣第 1 题「[两数之和](<https://leetcode.cn/problems/two-sum/>)」和力扣第 167 题「[两数之和 II - 输入有序数组](<https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/>)」稍加修改就可以用类似的思路解决，我这里就不写了。

不过我要继续魔改题目，把这个题目变得更泛化，更困难一点：

**`nums` 中可能有多对儿元素之和都等于 `target`，请你的算法返回所有和为 `target` 的元素对儿，其中不能出现重复**。

函数签名如下：

```python
def twoSumTarget(nums: List[int], target: int) -> List[List[int]]:
``` 

比如说输入为 `nums = [1,3,1,2,2,3], target = 4`，那么算法返回的结果就是：`[[1,3],[2,2]]`（注意，我要求返回元素，而不是索引）。

对于修改后的问题，关键难点是现在可能有多个和为 `target` 的数对儿，还不能重复，比如上述例子中 `[1,3]` 和 `[3,1]` 就算重复，只能算一次。

首先，基本思路肯定还是排序加双指针：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
