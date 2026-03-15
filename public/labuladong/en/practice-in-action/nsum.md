# One Trick to Solve All N-Sum Problems

> Source: https://labuladong.online/algo/en/practice-in-action/nsum/
> Archived: labuladong.online

---

# One Trick to Solve All N-Sum Problems

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[1\. Two Sum](<https://leetcode.com/problems/two-sum/>)|   
[167\. Two Sum II - Input Array Is Sorted](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>)|   
[15\. 3Sum](<https://leetcode.com/problems/3sum/>)|   
[18\. 4Sum](<https://leetcode.com/problems/4sum/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Array Two Pointer Techniques Summary](</en/algo/essential-technique/array-two-pointers-summary/>)

If you often practice problems on LeetCode, you must know the famous `twoSum` problem. Besides `twoSum`, LeetCode also has `3Sum`, `4Sum`, and maybe in the future even `5Sum`, `6Sum`.

To sum up, these `nSum` problems ask you to find `n` numbers from an array `nums` whose sum is equal to a given `target`.

Is there a good way to solve such problems with a pattern? In this article, I will explain step by step, and show how to use one function to solve all `nSum` type problems.

## 1\. The twoSum Problem

Let’s start with a twoSum problem:

Suppose you are given an array `nums` and a target value `target`. **Please return two elements from`nums` whose sum is equal to `target`**. For example, if `nums = [1,3,5,6], target = 9`, the algorithm should return `[3,6]`. You can assume there is only one pair that adds up to `target`.

We can first sort `nums`, then use the [two pointer technique](</en/algo/essential-technique/array-two-pointers-summary/>) we learned before. Just use two pointers, one from each end, and move towards each other:

```python
def twoSum(nums, target):
    # first sort the array
    nums.sort()
    # left and right pointers
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        sum_nums = nums[lo] + nums[hi]
        # move the left and right pointers based on the comparison of sum and target
        if sum_nums < target:
            lo += 1
        elif sum_nums > target:
            hi -= 1
        elif sum_nums == target:
            return [nums[lo], nums[hi]]
    return []
``` 

This solves the problem. LeetCode Problem 1 ["Two Sum"](<https://leetcode.com/problems/two-sum/>) and Problem 167 ["Two Sum II - Input Array Is Sorted"](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>) can be solved in a similar way with some changes, so I won’t write them here.

But let’s make the problem a bit more general and harder:

**Now, there may be multiple pairs in`nums` whose sum is equal to `target`. Please return all pairs whose sum is `target`, and do not include duplicates.**

Function signature is as follows:

```python
def twoSumTarget(nums: List[int], target: int) -> List[List[int]]:
``` 

For example, if the input is `nums = [1,3,1,2,2,3], target = 4`, the output should be: `[[1,3],[2,2]]` (Note: I want the elements, not the indices).

For this new version, the key difficulty is that there may be many pairs that sum to `target`, and you cannot have duplicates. For example, `[1,3]` and `[3,1]` are considered the same and should only be returned once.

First, the basic idea is still sorting and two pointers:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
