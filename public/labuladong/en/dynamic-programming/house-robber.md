# One Method to Solve All House Robber Problems on LeetCode

> Source: https://labuladong.online/algo/en/dynamic-programming/house-robber/
> Archived: labuladong.online

---

# One Method to Solve All House Robber Problems on LeetCode

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[198\. House Robber](<https://leetcode.com/problems/house-robber/>)|   
[213\. House Robber II](<https://leetcode.com/problems/house-robber-ii/>)|   
[337\. House Robber III](<https://leetcode.com/problems/house-robber-iii/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Binary Tree Algorithms (Overview)](</en/algo/essential-technique/binary-tree-summary/>)
  * [Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)

Today, let's talk about the "House Robber" series of problems. This is a classic and skillful dynamic programming problem.

The House Robber series has three problems, and the difficulty increases step by step. The first is a standard dynamic programming problem. The second adds a circular array condition. The third combines bottom-up and top-down dynamic programming with binary trees, which is very inspiring.

Let's start with the first problem.

## House Robber I

LeetCode 198 "[House Robber](<https://leetcode.com/problems/house-robber/>)" is described as follows:

There is a row of houses. Each house has some cash, given as a non-negative integer array `nums`, where `nums[i]` is the amount in the i-th house. You are a professional thief. You want to steal as much cash as possible, but **you cannot steal from two adjacent houses**. Otherwise, the alarm will go off.

Write an algorithm to calculate the maximum amount of cash you can steal without triggering the alarm. The function signature is:

```python
def rob(nums: List[int]) -> int:
``` 

For example, if the input is `nums = [2,1,7,9,3,1]`, the algorithm should return 12. The thief can steal from `nums[0]`, `nums[3]`, and `nums[5]`, getting 2 + 9 + 1 = 12, which is the best choice.

The problem is easy to understand, and it is clearly a dynamic programming problem. As summarized in [Dynamic Programming Details](</en/algo/essential-technique/dynamic-programming-framework/>), **to solve a dynamic programming problem, you just need to find the "state" and the "choices".**

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
