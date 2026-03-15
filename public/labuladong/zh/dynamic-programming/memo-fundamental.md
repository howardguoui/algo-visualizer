# base case 和备忘录的初始值怎么定？

> Source: https://labuladong.online/zh/algo/dynamic-programming/memo-fundamental/
> Archived: labuladong.online — 算法笔记

---

# base case 和备忘录的初始值怎么定？

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[931\. Minimum Falling Path Sum](<https://leetcode.com/problems/minimum-falling-path-sum/>)| [931\. 下降路径最小和](<https://leetcode.cn/problems/minimum-falling-path-sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)

很多读者对动态规划问题的 base case、备忘录初始值等问题存在疑问，本文就专门讲一讲这类问题，顺便聊一聊怎么通过题目的蛛丝马迹揣测出题人的小心思，辅助我们解题。

看下力扣第 931 题「[下降路径最小和](<https://leetcode.cn/problems/minimum-falling-path-sum/>)」，输入为一个 `n * n` 的二维数组 `matrix`，请你计算从第一行落到最后一行，经过的路径和最小为多少：

**931\. 下降路径最小和** |[力扣](<https://leetcode.cn/problems/minimum-falling-path-sum/>)|[LeetCode](<https://leetcode.com/problems/minimum-falling-path-sum/>)

给你一个 `n x n` 的**方形** 整数数组 `matrix` ，请你找出并返回通过 `matrix` 的**下降路径** __ 的******最小和** 。

**下降路径** 可以从第一行中的任何元素开始，并从每一行中选择一个元素。在下一行选择的元素和当前行所选元素最多相隔一列（即位于正下方或者沿对角线向左或者向右的第一个元素）。具体来说，位置 `(row, col)` 的下一个元素应当是 `(row + 1, col - 1)`、`(row + 1, col)` 或者 `(row + 1, col + 1)` 。

**示例 1：**

![diagram](https://labuladong.online/images/lc/uploads/2021/11/03/failing1-grid.jpg)

```
输入：matrix = [[2,1,3],[6,5,4],[7,8,9]]
输出：13
解释：如图所示，为和最小的两条下降路径
``` 

**示例 2：**

![diagram](https://labuladong.online/images/lc/uploads/2021/11/03/failing2-grid.jpg)

```
输入：matrix = [[-19,57],[-40,-5]]
输出：-59
解释：如图所示，为和最小的下降路径
``` 

**提示：**

  * `n == matrix.length == matrix[i].length`
  * `1 <= n <= 100`
  * `-100 <= matrix[i][j] <= 100`

题目来源：[力扣 931. 下降路径最小和](<https://leetcode.cn/problems/minimum-falling-path-sum/>)。

函数签名如下：

```python
def minFallingPathSum(matrix: List[List[int]]) -> int
``` 

今天这道题不算是困难的题目，所以**我借这道题来讲讲 base case 的返回值、备忘录的初始值、索引越界情况的返回值如何确定** 。

不过还是要根据 [动态规划的标准套路](</zh/algo/essential-technique/dynamic-programming-framework/>) 讲一下这道题的解题思路。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
