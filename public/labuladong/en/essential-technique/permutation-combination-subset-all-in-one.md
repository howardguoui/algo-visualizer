# Backtracking Algorithm to Solve All Permutation/Combination/Subset Problems

> Source: https://labuladong.online/algo/en/essential-technique/permutation-combination-subset-all-in-one/
> Archived: labuladong.online

---

# Backtracking Algorithm to Solve All Permutation/Combination/Subset Problems

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[78\. Subsets](https://leetcode.com/problems/subsets/)|   
[77\. Combinations](https://leetcode.com/problems/combinations/)|   
[46\. Permutations](https://leetcode.com/problems/permutations/)|   
[90\. Subsets II](https://leetcode.com/problems/subsets-ii/)|   
[40\. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)|   
[47\. Permutations II](https://leetcode.com/problems/permutations-ii/)|   
[39\. Combination Sum](https://leetcode.com/problems/combination-sum/)|   
[216\. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)|   
  
Prerequisite

Before reading this article, you need to learn:

  * [Binary Tree Algorithms (Overview)](/en/algo/essential-technique/binary-tree-summary/)
  * [Backtracking Algorithm Core Framework](/en/algo/essential-technique/backtrack-framework/)


You learned permutations, combinations, and subsets in high school math. But it is still hard to write algorithms to solve them. This article will teach you the key ideas to solve these problems with code. After you learn this, you can easily handle different variants later.

For permutation, combination, or subset problems, the task is always: pick some elements from an array `nums` under certain rules. There are three basic forms:

**Form 1: Elements are unique and cannot be reused. That is, all elements in`nums` are different, and each element can be used at most once. This is the basic form.**

For example, for combinations, if `nums = [2,3,6,7]`, the combinations whose sum is 7 should only be `[7]`.

**Form 2: Elements may repeat but still cannot be reused. That is,`nums` may contain duplicates, but each element can be used at most once.**

For example, for combinations, if `nums = [2,5,2,1,2]`, the combinations whose sum is 7 should be `[2,2,2,1]` and `[5,2]`.

**Form 3: Elements are unique and can be reused. That is, all elements in`nums` are different, and each element can be used many times.**

For example, for combinations, if `nums = [2,3,6,7]`, the combinations whose sum is 7 should be `[2,2,3]` and `[7]`.

You may think there is a fourth form: elements may repeat and can be reused. But if an element can be reused, why keep duplicates in `nums`? After removing duplicates, this case becomes the same as Form 3. So we do not treat it as a separate case.

The examples above use combination problems, but permutation, combination, and subset problems can all appear in these three basic forms. So in total, there are 9 variants.

On top of that, the problem can add more conditions. For example, “find combinations whose sum is `target` and have exactly `k` elements.” From here you can create many more variants. No wonder these topics show up so often in coding interviews.

**But no matter how the form changes, the essence is to brute-force all solutions. These solutions form a tree structure. So if you use the backtracking framework correctly, you can solve all these problems by slightly changing the same code framework.**

More concretely, you should first read and understand [Backtracking Algorithm Core Framework](/en/algo/essential-technique/backtrack-framework/). Then remember the backtracking trees for the subset problem and the permutation problem below. With these two trees, you can solve all permutation/combination/subset problems:

![](/images/algo/permutation/1-en.jpeg)

![](/images/algo/permutation/2-en.jpeg)

Why can these two tree structures solve all related problems?

**First, combination problems and subset problems are actually equivalent. We will explain this later. As for the three forms we talked about, they just mean cutting off or adding some branches on these two trees.**

Next, we will start brute-forcing. We will go through all 9 forms of permutation/combination/subset problems and learn how to solve them with backtracking.

Tip

Some of you may have seen other solutions for permutations/subsets/combinations before. The code you saw may be different from what I show in this article. That is because backtracking has two ways to view the brute-force process. I will explain them step by step in [Ball-and-Box Model: Two Views of Backtracking](/en/algo/practice-in-action/two-views-of-backtrack/). It is not the right time to explain those other solutions now. Just follow the approach in this article.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
