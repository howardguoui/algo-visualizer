# Scan Line Technique: Scheduling Meeting Rooms

> Source: https://labuladong.online/algo/en/frequency-interview/scan-line-technique/
> Archived: labuladong.online

---

# Scan Line Technique: Scheduling Meeting Rooms

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[253\. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)🔒|   
[1235\. Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling/)|   
  
In a previous interview, I was asked a very classic and practical algorithm problem: the meeting room scheduling problem.

Similar problems on LeetCode are behind a paywall — you need a premium subscription to access them. But for such a classic algorithm problem, it's still important to understand the approach.

Let me first describe the problem. LeetCode Problem 253, "[Meeting Rooms II](https://leetcode.cn/problems/meeting-rooms-ii/)":

Given an array of intervals `[begin, end]` representing the start and end times of meetings, calculate the minimum number of meeting rooms required.

The function signature is as follows:

CC++GoJavaJavaScriptPython
    
    
    // Return the number of meeting rooms to be reserved
    int minMeetingRooms(int[][] meetings);

For example, given `meetings = [[0,30],[5,10],[15,20]]`, the algorithm should return 2, because the last two meetings conflict with the first one, so you need at least two meeting rooms to hold all meetings.

If meetings overlap in time, you need extra rooms. Finding the minimum number of rooms is essentially finding the maximum number of meetings happening simultaneously at any given moment.

In other words, **if you think of each meeting's time range as a line segment, the problem is asking you to find the maximum number of overlapping intervals**. That's it.

We've previously learned interval-related algorithms. If you recall the [difference array technique](/en/algo/data-structure/diff-array/), you should immediately think of using it to solve this problem.

This problem is essentially saying: given an array initially filled with 0s and several intervals, increment every element within each interval by 1, then find the maximum value in the entire array. This is a classic use case for the difference array, right? You can directly apply the `Difference` class from the previous article to solve it.

However, the difference array technique has one issue: you must construct that initial all-zero array. Since we use array indices to represent time, the array length depends on the maximum time value.

For example, with `meetings = [[0,30],[5,10],[15,20]]`, you'd need an array of length 30. But if the input is `meetings = [[0,30],[5,10],[10^8,10^9]]`, you'd need an array of length 10^9, which is clearly problematic. That said, this problem constrains time values to at most 10^6, which isn't too large, so the difference array approach should pass.

But in this article, I'll teach you another technique for handling intervals that doesn't require constructing such a large array and still solves the problem elegantly.

## ¶Extending the Problem

We've written many articles about interval scheduling. Let me take this opportunity to organize the different scenarios for you:

**Scenario 1** : You have only one meeting room and several meetings. How do you schedule as many meetings as possible into this room?

Sort the meetings (intervals) by end time (right endpoint), then process them. See [Greedy Algorithm for Time Management](/en/algo/frequency-interview/interval-scheduling/) for details.

**Scenario 2** : You're given several short video clips and one long video clip. Pick as few short clips as possible to cover the entire long clip.

Sort the video clips (intervals) by start time (left endpoint), then process them. See [A Greedy Algorithm from Video Editing](/en/algo/frequency-interview/cut-video/) for details.

**Scenario 3** : Given several intervals where some shorter ones are completely covered by others, delete the covered intervals.

Sort the intervals by left endpoint, then you can identify and remove the fully covered ones. See [Remove Covered Intervals](/en/algo/practice-in-action/interval-problem-summary/) for details.

**Scenario 4** : Given several intervals, merge all overlapping intervals.

Sort the intervals by left endpoint to easily find overlapping ones. See [Merge Overlapping Intervals](/en/algo/practice-in-action/interval-problem-summary/) for details.

**Scenario 5** : Two departments have booked the same meeting room for various time slots. Find the conflicting time slots.

This gives you two lists of intervals and asks you to find their intersection. Sort the intervals by left endpoint. See [Interval Intersection Problem](/en/algo/practice-in-action/interval-problem-summary/) for details.

**Scenario 6** : You have only one meeting room and several meetings. How do you schedule meetings to minimize the room's idle time?

This one requires some creative thinking. It's essentially a variation of the 0-1 knapsack problem:

Think of the meeting room as a knapsack and each meeting as an item whose value is the meeting duration. How do you select items (meetings) to maximize the knapsack's value (total usage time)?

Of course, the constraint here isn't a maximum weight but that items (meetings) cannot conflict with each other. Sort the meetings by end time, then apply the approach from [0-1 Knapsack Problem Explained](/en/algo/dynamic-programming/knapsack1/) along with a TreeMap to solve it.

LeetCode Problem 1235, "[Maximum Profit in Job Scheduling](https://leetcode.cn/problems/maximum-profit-in-job-scheduling/)", is a similar problem. I've provided a detailed solution in my plugin's hints. You can install my [Chrome plugin](/en/algo/intro/chrome/) to check it out — I won't go into detail here.

**Scenario 7** is what this article focuses on: given several meetings, minimize the number of meeting rooms needed.

Alright, with all these examples laid out, let's see how to solve today's problem.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
