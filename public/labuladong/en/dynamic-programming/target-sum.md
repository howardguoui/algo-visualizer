# A Variant of the Knapsack Problem: Target Sum

> Source: https://labuladong.online/algo/en/dynamic-programming/target-sum/
> Archived: labuladong.online

---

# A Variant of the Knapsack Problem: Target Sum

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[494\. Target Sum](https://leetcode.com/problems/target-sum/)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Core Framework of Dynamic Programming](/en/algo/essential-technique/dynamic-programming-framework/)


We often mention that backtracking algorithms are somewhat similar to recursive algorithms. If you really can't work out the state transition equation for a problem, trying to solve it with a brute-force backtracking algorithm is a clever strategy—it’s better than having no solution at all.

So, what exactly is the relationship between backtracking algorithms and dynamic programming? Both involve recursion, and their algorithm templates seem quite similar, both involving making "choices," resembling a parent-child relationship.

![](/images/algo/targetSum/1.jpg)

What exactly are the differences between them? Is it possible for backtracking algorithms and dynamic programming to be converted into each other?

Today, we will use LeetCode Problem 494 "[Target Sum](https://leetcode.com/problems/target-sum/)" to compare backtracking algorithms and dynamic programming in detail. The problem is as follows:

**494\. Target Sum** |[LeetCode](https://leetcode.com/problems/target-sum/)

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.

  * For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`.


Return the number of different **expressions** that you can build, which evaluates to `target`.

**Example 1:**
    
    
    **Input:** nums = [1,1,1,1,1], target = 3
    **Output:** 5
    **Explanation:** There are 5 ways to assign symbols to make the sum of nums be target 3.
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3
    

**Example 2:**
    
    
    **Input:** nums = [1], target = 1
    **Output:** 1
    

**Constraints:**

  * `1 <= nums.length <= 20`
  * `0 <= nums[i] <= 1000`
  * `0 <= sum(nums[i]) <= 1000`
  * `-1000 <= target <= 1000`


The problem is from [LeetCode 494. Target Sum](https://leetcode.com/problems/target-sum/).

The function signature is as follows:

CC++GoJavaJavaScriptPython
    
    
    int findTargetSumWays(int[] nums, int target);

## ¶I. Backtracking Approach

Actually, when I first saw this problem, it took me just two minutes to come up with a backtracking solution.

The core of any algorithm is exhaustive enumeration, and backtracking is a brute-force enumeration algorithm. The previous article [Backtracking Algorithm Framework](/en/algo/essential-technique/backtrack-framework/) outlined the framework for backtracking:
    
    
    def backtrack(path, choices):
        if meets_end_condition:
            result.add(path)
            return
        
        for choice in choices:
            make_choice
            backtrack(path, choices)
            undo_choice

The key is to understand what constitutes a "choice". For this problem, isn't the "choice" obvious? **For each number`nums[i]`, we can choose to assign either a positive sign `+` or a negative sign `-`**. Then, using the backtracking template, we can enumerate all possible outcomes and count how many combinations can sum up to the `target`.

The pseudocode approach is as follows:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
