# Classic DP: Burst Balloons

> Source: https://labuladong.online/algo/en/dynamic-programming/burst-balloons/
> Archived: labuladong.online

---

# Classic DP: Burst Balloons

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[312\. Burst Balloons](<https://leetcode.com/problems/burst-balloons/>)|   
  
Prerequisites

Before reading this article, you should first study:

  * [Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)

Today, we will discuss the problem "Burst Balloon", which is similar to the "Classic Dynamic Programming: Egg Drop Problem" analyzed in our previous article [Egg Drop Problem](</en/algo/dynamic-programming/egg-drop/>). This problem is well-known but also quite challenging.

It is LeetCode's Problem 312 "[Burst Balloons](<https://leetcode.com/problems/burst-balloons/>)", and the problem statement is as follows:

**312\. Burst Balloons** |[LeetCode](<https://leetcode.com/problems/burst-balloons/>)

You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.

If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.

Return _the maximum coins you can collect by bursting the balloons wisely_.

**Example 1:**

```
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
``` 

**Example 2:**

```
Input: nums = [1,5]
Output: 10
``` 

**Constraints:**

  * `n == nums.length`
  * `1 <= n <= 300`
  * `0 <= nums[i] <= 100`

The problem is from [LeetCode 312. Burst Balloons](<https://leetcode.com/problems/burst-balloons/>).

First, it must be noted that the state transition equation for this problem is quite ingenious. If you find yourself with no clue after reading the problem, it's perfectly normal. Although the optimal solution is not easy to conceive, we should strive to achieve a basic analysis of the approach. Therefore, this article will first analyze the conventional approach and then introduce the dynamic programming solution.

## 1\. Backtracking Approach

Let's first outline the approach to solve this type of problem:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
