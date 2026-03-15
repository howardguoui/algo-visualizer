# Removing Duplicates from an Array (Hard Version)

> Source: https://labuladong.online/algo/en/frequency-interview/remove-duplicate-letters/
> Archived: labuladong.online

---

# Removing Duplicates from an Array (Hard Version)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[316\. Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/)|   
[1081\. Smallest Subsequence of Distinct Characters](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Principles of Queue/Stack](/en/algo/data-structure-basic/queue-stack-basic/)
  * [Principles and Implementation of Monotonic Stack](/en/algo/data-structure/monotonic-stack/)


The de-duplication algorithm shouldn't be too difficult; just insert items into a hash set, right?

At most, you might be asked to remove duplicates in-place from a sorted array, which we discussed in a previous article [Double Pointer Techniques to Solve Array Problems](/en/algo/essential-technique/array-two-pointers-summary/).

The problem discussed in this article is likely the most challenging among de-duplication algorithms. Understanding this problem will make array de-duplication issues trivial for you.

This is LeetCode problem 316 "[Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/)," and the problem is as follows:

**316\. Remove Duplicate Letters** |[LeetCode](https://leetcode.com/problems/remove-duplicate-letters/)

Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is **the smallest in lexicographical order** among all possible results.

**Example 1:**
    
    
    **Input:** s = "bcabc"
    **Output:** "abc"
    

**Example 2:**
    
    
    **Input:** s = "cbacdcbc"
    **Output:** "acdb"
    

**Constraints:**

  * `1 <= s.length <= 104`
  * `s` consists of lowercase English letters.


**Note:** This question is the same as 1081: <https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/>

The problem is from [LeetCode 316. Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/).

The solution to this problem is identical to problem 1081 "Smallest Subsequence of Distinct Characters." You can directly apply the solution of this problem to solve problem 1081 as well.

The requirements of the problem can be summarized into three points:

Requirement one, **remove duplicates**.

Requirement two, the character order in the deduplicated string **must not disrupt the relative order of characters in`s`**.

Requirement three, among all deduplicated strings that meet the above requirement, the one with the **smallest lexicographical order** should be the final result.

Among the above three requirements, requirement three might be a bit hard to understand, so let's illustrate with an example.

For instance, given the input string `s = "babc"`, there are two deduplicated strings that maintain the relative position, `"bac"` and `"abc"`. However, our algorithm should return `"abc"` because it has a smaller lexicographical order.

Logically, if we want an ordered result, we should sort the original string, but sorting would disrupt the character order in `s`, which seems contradictory.

In fact, we will use the idea of a "monotonic stack," as mentioned in the previous article [Monotonic Stack Problem-Solving Framework](/en/algo/data-structure/monotonic-stack/). It's fine if you haven't read it; you'll understand shortly.

**Let's temporarily ignore requirement three and use a "stack" to achieve requirements one and two**. The reason for using a stack will become clear later:

Last updated: 03/14/2026, 12:17 AM

Loading comments...
