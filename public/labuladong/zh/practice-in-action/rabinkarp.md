# 滑动窗口延伸：Rabin Karp 字符匹配算法

> Source: https://labuladong.online/zh/algo/practice-in-action/rabinkarp/
> Archived: labuladong.online — 算法笔记

---

# 滑动窗口延伸：Rabin Karp 字符匹配算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[187\. Repeated DNA Sequences](<https://leetcode.com/problems/repeated-dna-sequences/>)| [187\. 重复的DNA序列](<https://leetcode.cn/problems/repeated-dna-sequences/>)|   
[28\. Find the Index of the First Occurrence in a String](<https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/>)| [28\. 找出字符串中第一个匹配项的下标](<https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [哈希表原理](</zh/algo/data-structure-basic/hashmap-basic/>)
  * [滑动窗口算法框架](</zh/algo/essential-technique/sliding-window-framework/>)

经常有读者留言，请我讲讲那些比较经典的算法，我觉得有这个必要，主要有以下原因：

1、经典算法之所以经典，一定是因为有独特新颖的设计思想，那当然要带大家学习一波。

2、我会尽量从最简单、最基本的算法切入，带你亲手推导出来这些经典算法的设计思想，自然流畅地写出最终解法。一方面消除大多数人对算法的恐惧，另一方面可以避免很多人对算法死记硬背的错误习惯。

今天就来讲一讲经典的 Rabin-Karp 字符串匹配算法。

本文会由浅入深地讲明白这个算法的核心思路，先从最简单的字符串转数字讲起，然后研究一道力扣题目，到最后你就会发现 Rabin-Karp 算法使用的就是滑动窗口技巧，直接套前文讲的 [滑动窗口算法框架](</zh/algo/essential-technique/sliding-window-framework/>) 就出来了，根本不用死记硬背。

废话不多说了，直接上干货。

首先，我问你一个很基础的问题，给你输入一个字符串形式的正整数，如何把它转化成数字的形式？很简单，下面这段代码就可以做到：

```python
s = "8264"
number = 0
for i in range(len(s)):
    # 将字符转化成数字
    number = 10 * number + (ord(s[i]) - ord('0'))
    print(number)
# 打印输出：
# 8
# 82
# 826
# 8264
``` 

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
