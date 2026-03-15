# Greedy Algorithm for Interval Scheduling Problem

> Source: https://labuladong.online/algo/en/frequency-interview/interval-scheduling/
> Archived: labuladong.online

---

# Greedy Algorithm for Interval Scheduling Problem

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[435\. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)|   
[452\. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)|   
  
What is a greedy algorithm? You can think of a greedy algorithm as a special case of dynamic programming. Compared to dynamic programming, a greedy algorithm needs more conditions to work (the greedy choice property), but if it works, it is faster.

For example, suppose a problem needs exponential time with a brute-force solution. If you can use dynamic programming to remove overlapping subproblems, the time can drop to polynomial. If the problem also satisfies the greedy choice property, you can further reduce the time complexity to linear.

What is the greedy choice property? Simply put: at each step, if you make the best local choice, the final result is also the global best. Note that this is a special property, and only some problems have it.

For example, you have 100 RMB bills in front of you, and you can only pick 10. How do you get the largest total amount? Clearly, each time you should pick the bill with the largest value among the remaining ones. In the end, your choice will be optimal.

However, most problems do not have the greedy choice property. For example, in the card game Dou Dizhu, if your opponent plays a pair of 3s, a greedy strategy would be to play the smallest pair that can beat it. But in real situations, it depends on the opponent’s cards and strategy; you might even play the strongest combination “rocket” (the two jokers). In such cases, you cannot use a greedy algorithm and instead need a more complex brute-force algorithm to find the optimal solution.

## ¶1\. Problem Overview

Now back to the main topic. This article solves a classic greedy algorithm problem, Interval Scheduling, which is LeetCode Problem 435 “[Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)”:

You are given many closed intervals of the form `[start, end]`. Please design an algorithm to **find the maximum number of intervals that are mutually non-overlapping**.

CC++GoJavaJavaScriptPython
    
    
    int intervalSchedule(int[][] intvs);

For example, `intvs = [[1,3], [2,4], [3,6]]`. Among these intervals, the maximum number of non-overlapping intervals is 2, that is `[[1,3], [3,6]]`. Your algorithm should return 2. Note that intervals that only touch at the boundary are not considered overlapping.

This problem has many real-world uses. For example, you have several events today. Each event can be represented as an interval `[start, end]` for its start time and end time. **What is the maximum number of events you can attend today?** Clearly, you cannot attend two events at the same time. So this problem is to find the largest subset of these time intervals that do not overlap.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
