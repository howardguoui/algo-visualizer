# 拓展：数组去重问题（困难版）

> Source: https://labuladong.online/zh/algo/frequency-interview/remove-duplicate-letters/
> Archived: labuladong.online — 算法笔记

---

# 拓展：数组去重问题（困难版）

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[316\. Remove Duplicate Letters](<https://leetcode.com/problems/remove-duplicate-letters/>)| [316\. 去除重复字母](<https://leetcode.cn/problems/remove-duplicate-letters/>)|   
[1081\. Smallest Subsequence of Distinct Characters](<https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/>)| [1081\. 不同字符的最小子序列](<https://leetcode.cn/problems/smallest-subsequence-of-distinct-characters/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [队列/栈的原理](</zh/algo/data-structure-basic/queue-stack-basic/>)
  * [单调栈原理及实现](</zh/algo/data-structure/monotonic-stack/>)

关于去重算法，应该没什么难度，往哈希集合里面塞不就行了么？

最多给你加点限制，问你怎么给有序数组原地去重，这个我们前文 [双指针技巧秒杀七道数组题目](</zh/algo/essential-technique/array-two-pointers-summary/>) 讲过。

本文讲的问题应该是去重相关算法中难度最大的了，把这个问题搞懂，就再也不用怕数组去重问题了。

这是力扣第 316 题「[去除重复字母](<https://leetcode.cn/problems/remove-duplicate-letters/>)」，题目如下：

**316\. 去除重复字母** |[力扣](<https://leetcode.cn/problems/remove-duplicate-letters/>)|[LeetCode](<https://leetcode.com/problems/remove-duplicate-letters/>)

给你一个字符串 `s` ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 **返回结果的 字典序最小**（要求不能打乱其他字符的相对位置）。

**示例 1：**

```
s = "bcabc"
``` 

**示例 2：**

```
s = "cbacdcbc"
``` 

**提示：**

  * `1 <= s.length <= 104`
  * `s` 由小写英文字母组成

**注意：** 该题与 1081 <https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters> 相同

题目来源：[力扣 316. 去除重复字母](<https://leetcode.cn/problems/remove-duplicate-letters/>)。

这道题和第 1081 题「不同字符的最小子序列」的解法是完全相同的，你可以把这道题的解法代码直接粘过去把 1081 题也干掉。

题目的要求总结出来有三点：

要求一、**要去重** 。

要求二、去重字符串中的字符顺序**不能打乱`s` 中字符出现的相对顺序**。

要求三、在所有符合上一条要求的去重字符串中，**字典序最小** 的作为最终结果。

上述三条要求中，要求三可能有点难理解，举个例子。

比如说输入字符串 `s = "babc"`，去重且符合相对位置的字符串有两个，分别是 `"bac"` 和 `"abc"`，但是我们的算法得返回 `"abc"`，因为它的字典序更小。

按理说，如果我们想要有序的结果，那就得对原字符串排序对吧，但是排序后就不能保证符合 `s` 中字符出现顺序了，这似乎是矛盾的。

其实这里会借鉴前文 [单调栈解题框架](</zh/algo/data-structure/monotonic-stack/>) 中讲到的「单调栈」的思路，没看过也无妨，等会你就明白了。

**我们先暂时忽略要求三，用「栈」来实现一下要求一和要求二** ，至于为什么用栈来实现，后面你就知道了：
