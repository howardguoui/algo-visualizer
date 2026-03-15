# 回溯算法实践：括号生成

> Source: https://labuladong.online/zh/algo/practice-in-action/generate-parentheses/
> Archived: labuladong.online — 算法笔记

---

# 回溯算法实践：括号生成

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[22\. Generate Parentheses](<https://leetcode.com/problems/generate-parentheses/>)| [22\. 括号生成](<https://leetcode.cn/problems/generate-parentheses/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的遍历框架](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [多叉树结构及遍历框架](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [回溯算法套路框架详解](</zh/algo/essential-technique/backtrack-framework/>)

括号问题可以简单分成两类，一类是前文写过的 [括号的合法性判断](</zh/algo/problem-set/parentheses/>) ，一类是合法括号的生成。对于括号合法性的判断，主要是借助「栈」这种数据结构，而对于括号的生成，一般都要利用 [回溯算法](</zh/algo/essential-technique/backtrack-framework/>) 进行暴力穷举。

回到正题，看下力扣第 22 题「[括号生成](<https://leetcode.cn/problems/generate-parentheses/>)」，要求如下：

**22\. 括号生成** |[力扣](<https://leetcode.cn/problems/generate-parentheses/>)|[LeetCode](<https://leetcode.com/problems/generate-parentheses/>)

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

**示例 1：**

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
``` 

**示例 2：**

```
输入：n = 1
输出：["()"]
``` 

**提示：**

  * `1 <= n <= 8`

题目来源：[力扣 22. 括号生成](<https://leetcode.cn/problems/generate-parentheses/>)。

函数签名如下：

```java
List<String> generateParenthesis(int n);
``` 

有关括号问题，你只要记住以下性质，思路就很容易想出来：
