# 一文秒杀所有丑数系列问题

> Source: https://labuladong.online/zh/algo/frequency-interview/ugly-number-summary/
> Archived: labuladong.online — 算法笔记

---

# 一文秒杀所有丑数系列问题

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[263\. Ugly Number](<https://leetcode.com/problems/ugly-number/>)| [263\. 丑数](<https://leetcode.cn/problems/ugly-number/>)|   
[264\. Ugly Number II](<https://leetcode.com/problems/ugly-number-ii/>)| [264\. 丑数 II](<https://leetcode.cn/problems/ugly-number-ii/>)|   
[313\. Super Ugly Number](<https://leetcode.com/problems/super-ugly-number/>)| [313\. 超级丑数](<https://leetcode.cn/problems/super-ugly-number/>)|   
[1201\. Ugly Number III](<https://leetcode.com/problems/ugly-number-iii/>)| [1201\. 丑数 III](<https://leetcode.cn/problems/ugly-number-iii/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [链表双指针技巧汇总](</zh/algo/essential-technique/linked-list-skills-summary/>)
  * [二分查找框架详解](</zh/algo/essential-technique/binary-search-framework/>)

最近读者群里有个读者跟我私信，说去面试微软遇到了一系列和数学相关的算法题，直接懵圈了。我看了下题目发现这些题其实就是 LeetCode 上面「丑数」系列问题的修改版。

首先，「丑数」系列问题属于会者不难难者不会的类型，因为会用到些数学定理嘛，如果没有专门学过，靠自己恐怕是想不出来的。

另外，这类问题而且非常考察抽象联想能力，因为它不仅仅要用到数学定理，还需要你把题目抽象成链表相关的题目运用双指针技巧，或者抽象成数组相关的题目运用二分搜索技巧。

那么今天我就来用一篇文章把所有丑数相关的问题一网打尽，看看这类问题能够如何变化，应该如何解决。

## 丑数 I

首先是力扣第 263 题「[丑数](<https://leetcode.cn/problems/ugly-number/>)」，题目给你输入一个数字 `n`，请你判断 `n` 是否为「丑数」。所谓「丑数」，就是只包含质因数 `2`、`3` 和 `5` 的正整数。

函数签名如下：

```
boolean isUgly(int n)
``` 

比如 12 = 2 x 2 x 3 就是一个丑数，而 42 = 2 x 3 x 7 就不是一个丑数。

这道题其实非常简单，前提是你知道算术基本定理（正整数唯一分解定理）：

**任意一个大于 1 的自然数，要么它本身就是质数，要么它可以分解为若干质数的乘积** 。

既然任意一个大于一的正整数都可以分解成若干质数的乘积，那么丑数也可以被分解成若干质数的乘积，且这些质数只能是 2, 3 或 5。

有了这个思路，就可以实现 `isUgly` 函数了：

```java
class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;
        // 如果 n 是丑数，分解因子应该只有 2, 3, 5
        while (n % 2 == 0) n /= 2;
        while (n % 3 == 0) n /= 3;
        while (n % 5 == 0) n /= 5;
        return n == 1;
    }
}
``` 

## 丑数 II

接下来提升难度，看下力扣第 264 题「[丑数 II](<https://leetcode.cn/problems/ugly-number-ii/>)」，现在题目不是让你判断一个数是不是丑数，而是给你输入一个 `n`，让你计算第 `n` 个丑数是多少，函数签名如下：

```java
int nthUglyNumber(int n)
```
