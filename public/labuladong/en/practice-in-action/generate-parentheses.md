# Backtracking Algorithm Practice: Generating Valid Parentheses

> Source: https://labuladong.online/algo/en/practice-in-action/generate-parentheses/
> Archived: labuladong.online

---

# Backtracking Algorithm Practice: Generating Valid Parentheses

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[22\. Generate Parentheses](<https://leetcode.com/problems/generate-parentheses/>)|   
  
Prerequisites

Before reading this article, you need to learn:

  * [Binary Tree Basics](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Binary Tree Traversal Framework](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [N-ary Tree Basics and Traversal Framework](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [Backtracking Algorithm Detailed Guide](</en/algo/essential-technique/backtrack-framework/>)

Bracket problems can be divided into two types. One is [checking if brackets are valid](</en/algo/problem-set/parentheses/>), which I have covered before. The other is generating valid parentheses. To check if brackets are valid, we usually use a stack. To generate all valid combinations, we often use [backtracking](</en/algo/essential-technique/backtrack-framework/>) to try all possible ways.

Now, let's look at LeetCode Problem 22: [Generate Parentheses](<https://leetcode.com/problems/generate-parentheses/>). The task is:

**22\. Generate Parentheses** |[LeetCode](<https://leetcode.com/problems/generate-parentheses/>)

Given `n` pairs of parentheses, write a function to _generate all combinations of well-formed parentheses_.

**Example 1:**

```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
``` 

**Example 2:**

```
Input: n = 1
Output: ["()"]
``` 

**Constraints:**

  * `1 <= n <= 8`

The problem is from [LeetCode 22. Generate Parentheses](<https://leetcode.com/problems/generate-parentheses/>).

The function signature is:

```java
List<String> generateParenthesis(int n);
``` 

For bracket problems, just remember the following key points and you will find the solution easily:

Last updated: 03/14/2026, 12:17 AM
