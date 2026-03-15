# 全新的排序原理：计数排序

> Source: https://labuladong.online/zh/algo/data-structure-basic/counting-sort/
> Archived: labuladong.online — 算法笔记

---

# 全新的排序原理：计数排序

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[75\. Sort Colors](<https://leetcode.com/problems/sort-colors/>)| [75\. 颜色分类](<https://leetcode.cn/problems/sort-colors/>)|   
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)| [912\. 排序数组](<https://leetcode.cn/problems/sort-an-array/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [排序算法的关键指标](</zh/algo/data-structure-basic/sort-basic/>)
  * [选择排序所面临的问题](</zh/algo/data-structure-basic/select-sort/>)

一句话总结

计数排序的原理比较简单：统计每种元素出现的次数，进而推算出每个元素在排序后数组中的索引位置，最终完成排序。

计数排序的时间和空间复杂度都是 O(n+max−min)O(n + max - min)O(n+max−min)，其中 nnn 是待排序数组长度，max−minmax - minmax−min 是待排序数组的元素范围。

这是选择排序的可视化面板，你可以点击 `sorted[count[index] - 1] = nums[i]` 这部分代码，即可看到有序数组形成的过程：

算法可视化

比方说，输入一个 `nums` 数组，我统计出其中有 2 个元素 `1`，1 个元素 `3`，3 个元素 `6`，那么只要我在数组中依次填入 2 个 `1`，1 个 `3`，3 个 `6`，就能得到排序结果 `[1, 1, 3, 6, 6, 6]`。

我们做一道简单的题目就能明白了，来看力扣第 75 题「[颜色分类](<https://leetcode.cn/problems/sort-colors/>)」：

**75\. 颜色分类** |[力扣](<https://leetcode.cn/problems/sort-colors/>)|[LeetCode](<https://leetcode.com/problems/sort-colors/>)

给定一个包含红色、白色和蓝色、共 `n` __ 个元素的数组 `nums` ，**[原地](<https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95>) **对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 `0`、 `1` 和 `2` 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。

**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
``` 

**示例 2：**

```
输入：nums = [2,0,1]
输出：[0,1,2]
``` 

**提示：**

  * `n == nums.length`
  * `1 <= n <= 300`
  * `nums[i]` 为 `0`、`1` 或 `2`

**进阶：**

  * 你能想出一个仅使用常数空间的一趟扫描算法吗？

题目来源：[力扣 75. 颜色分类](<https://leetcode.cn/problems/sort-colors/>)。

这道题有多种思路，最优解法是用双指针技巧仅遍历一次数组完成排序，我会在 [数组双指针技巧习题](</zh/algo/problem-set/array-two-pointers/>) 中介绍。这里我们用计数排序的思路来解决这个问题，说白了就是让你对数组排序，且这个数组里只有 0、1、2 三种元素。

我们可以创建一个大小为 3 的 `count` 数组，`count[0], count[1], count[2]` 分别表示数组中 0、1、2 出现的次数。然后我们按照 `count` 数组的统计结果，依次填充原数组即可。

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        # 统计 0, 1, 2 出现的次数
        count = [0] * 3
        for element in nums:
            count[element] += 1

        # 按照 count 数组的统计结果，依次填充原数组
        index = 0
        for element in range(3):
            for _ in range(count[element]):
                nums[index] = element
                index += 1
``` 

这就是一个简单的计数排序算法，不过这个题目给的场景比较简单，只有 `0, 1, 2` 三种元素，下面我们给出一个更通用的计数排序算法。

## 通用的计数排序

虽然计数排序的原理简单，但是在通用的计数排序代码中，还是有一些编码技巧的。

我们从提出问题开始。计数排序需要把数组中的元素作为 `count` 数组的索引才能计数，那么我们可以提出如下疑问：

1、是不是说只有当 `nums` 数组中的元素都是非负整数的时候才能用计数排序呢？包含负数时如何排序？对自定义的类型如何排序？

2、根据计数排序的原理，我们仅关心某一个元素出现了多少次，而并不关心相同元素的相对位置，那么看起来计数排序是一个不稳定排序，对吗？

3、因为计数排序需要将元素的值作为 `count` 数组的索引，那么如果数组中的最大元素的值很大时，会不会导致 `count` 数组太大，空间复杂度过高？

下面我们来一步一步思考这些问题，尝试给出解法。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
