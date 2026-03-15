# Let's Have Fun with LeetCode

> Source: https://labuladong.online/algo/en/programming-language-basic/lc-practice/
> Archived: labuladong.online

---

# Let's Have Fun with LeetCode

In the previous sections, I introduced the basic syntax of each programming language and how to use common data structures. Now, let's solve a few simple algorithm problems. This will help you practice programming and get familiar with the process of solving problems on LeetCode.

If this is your first time solving problems, make sure to submit your code by yourself on LeetCode to get the full experience.

The solutions in this article may not be the most optimal

**The main goal here is to help beginners practice using programming languages, not to explain the best algorithm ideas.** So my solutions are simple and direct. They may not be the most efficient.

These problems will be explained and optimized in later chapters. As you learn more about data structures and algorithms, you will understand them better.

## 1\. Two Sum

**1\. Two Sum** |[LeetCode](<https://leetcode.com/problems/two-sum/>)

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to`target`_.

You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
``` 

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
``` 

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
``` 

**Constraints:**

  * `2 <= nums.length <= 104`
  * `-109 <= nums[i] <= 109`
  * `-109 <= target <= 109`
  * **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n2)` time complexity?

The problem is from [LeetCode 1. Two Sum](<https://leetcode.com/problems/two-sum/>).

This is a classic first problem on LeetCode. Let's try to solve it.

The simplest way is brute-force. Use nested for loops: fix the first number with the outer loop, and use the inner loop to find another number. Check if their sum equals the target.

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
``` 

This uses for loops and if statements. Notice that when we loop over `j`, it starts from `i+1`. We can't start from `i` because we cannot use the same element twice. We also don't need to start from 0, because the combinations with earlier elements have already been checked.

## 217\. Contains Duplicate

**217\. Contains Duplicate** |[LeetCode](<https://leetcode.com/problems/contains-duplicate/>)

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: true
``` 

**Example 2:**

```
Input: nums = [1,2,3,4]
Output: false
``` 

**Example 3:**

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
``` 

**Constraints:**

  * `1 <= nums.length <= 105`
  * `-109 <= nums[i] <= 109`

The problem is from [LeetCode 217. Contains Duplicate](<https://leetcode.com/problems/contains-duplicate/>).

This problem asks if there are duplicate elements in the array. Removing duplicates is a classic use case for hash sets, because a hash set can quickly check if an element exists.

We can add each number into a hash set. If we find a number that is already in the set, we return `true`.

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        count = set()
        for num in nums:
            # if the element already exists, return True
            if num in count:
                return True
            # put the element into the hash set
            count.add(num)
        return False
``` 

## 136\. Single Number

**136\. Single Number** |[LeetCode](<https://leetcode.com/problems/single-number/>)

Given a **non-empty** array of integers `nums`, every element appears _twice_ except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

```
Input: nums = [2,2,1]
Output: 1
``` 

**Example 2:**

```
Input: nums = [4,1,2,1,2]
Output: 4
``` 

**Example 3:**

```
Input: nums = [1]
Output: 1
``` 

**Constraints:**

  * `1 <= nums.length <= 3 * 104`
  * `-3 * 104 <= nums[i] <= 3 * 104`
  * Each element in the array appears twice except for one element which appears only once.

The problem is from [LeetCode 136. Single Number](<https://leetcode.com/problems/single-number/>).

This problem asks you to find the number that appears only once in the array. When a problem is about counting elements, we usually use a hash map to store each element and its count.

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        count = {}
        # traverse the array, count the frequency of each number
        for num in nums:
            count[num] = count.get(num, 0) + 1

        # find the number that only appears once
        for num in nums:
            if count[num] == 1:
                return num
        return -1
``` 

## 20\. Valid Parentheses

**20\. Valid Parentheses** |[LeetCode](<https://leetcode.com/problems/valid-parentheses/>)

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.
  3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**

```
Input: s = "()"
Output: true
``` 

**Example 2:**

```
Input: s = "()[]{}"
Output: true
``` 

**Example 3:**

```
Input: s = "(]"
Output: false
``` 

**Constraints:**

  * `1 <= s.length <= 104`
  * `s` consists of parentheses only `'()[]{}'`.

The problem is from [LeetCode 20. Valid Parentheses](<https://leetcode.com/problems/valid-parentheses/>).

This is a classic parentheses problem. Such problems can usually be solved with a stack. The idea is: **when you see a left parenthesis, push it onto the stack; when you see a right parenthesis, pop the top left parenthesis from the stack and check if they match.**

```python
class Solution:
    def isValid(self, s: str) -> bool:
        # use list to simulate stack
        left = []
        for c in s:
            if c in '({[':
                # character c is a left parenthesis, push to the stack
                left.append(c)
            else:
                # character c is a right parenthesis
                if left and self.leftOf(c) == left[-1]:
                    left.pop()
                else:
                    # does not match the most recent left parenthesis
                    return False
        # check if all left parentheses have been matched
        return not left

    def leftOf(self, c: str) -> str:
        if c == '}': return '{'
        if c == ')': return '('
        return '['
``` 

## 2073\. Time Needed to Buy Tickets

**2073\. Time Needed to Buy Tickets** |[LeetCode](<https://leetcode.com/problems/time-needed-to-buy-tickets/>)

There are `n` people in a line queuing to buy tickets, where the `0th` person is at the **front** of the line and the `(n - 1)th` person is at the **back** of the line.

You are given a **0-indexed** integer array `tickets` of length `n` where the number of tickets that the `ith` person would like to buy is `tickets[i]`.

Each person takes **exactly 1 second** to buy a ticket. A person can only buy **1 ticket at a time** and has to go back to **the end** of the line (which happens **instantaneously**) in order to buy more tickets. If a person does not have any tickets left to buy, the person will **leave** the line.

Return _the**time taken** for the person at position _`k` __**_(0-indexed)_ ** _to finish buying tickets_.

**Example 1:**

```
Input: tickets = [2,3,2], k = 2
Output: 6
Explanation: 
- In the first pass, everyone in the line buys a ticket and the line becomes [1, 2, 1].
- In the second pass, everyone in the line buys a ticket and the line becomes [0, 1, 0].
The person at position 2 has successfully bought 2 tickets and it took 3 + 3 = 6 seconds.
``` 

**Example 2:**

```
Input: tickets = [5,1,1,1], k = 0
Output: 8
Explanation:
- In the first pass, everyone in the line buys a ticket and the line becomes [4, 0, 0, 0].
- In the next 4 passes, only the person in position 0 is buying tickets.
The person at position 0 has successfully bought 5 tickets and it took 4 + 1 + 1 + 1 + 1 = 8 seconds.
``` 

**Constraints:**

  * `n == tickets.length`
  * `1 <= n <= 100`
  * `1 <= tickets[i] <= 100`
  * `0 <= k < n`

The problem is from [LeetCode 2073. Time Needed to Buy Tickets](<https://leetcode.com/problems/time-needed-to-buy-tickets/>).

This is an interesting problem based on a real-world scenario. If we use a queue to simulate the process, we can solve this problem easily. Let's look at the code:

```python
class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        # use queue to simulate the whole process
        queue = collections.deque()
        for i in range(len(tickets)):
            queue.append(i)

        time = 0
        while queue:
            # the person at the front of the queue buys a ticket
            front = queue.popleft()
            time += 1
            tickets[front] -= 1
            
            if front == k and tickets[front] == 0:
                # if person k has bought the ticket, return the total time
                return time

            if tickets[front] == 0:
                continue

            # if the person needs to buy more tickets, put him back to the end of the queue
            queue.append(front)
        return time
``` 

## Summary & Next Steps

By practicing these problems, you should now know how to solve problems on LeetCode, and how to use your programming language to solve them.

Some solutions above are not the most optimal, but that's okay. There are standard ways to optimize algorithms, and as you keep learning, you'll be able to write better solutions easily.

For beginners, taking this first step is already a great achievement. A journey of a thousand miles begins with a single step. Just do it!

The next content will focus on two main parts:

  1. We will first dive deeper into how data structures work, and learn about some special data structures. Data structures are important tools for solving algorithm problems. For example, in the problems above, if you don't have a hash map, how can you count elements in an array? So you need to know the common data structures, their strengths and weaknesses, and the time complexity of their operations.

  2. We will use algorithm templates and practice many problems. This will help you master different problem-solving methods and use them freely. The problems above are simple, but the next ones will get harder step by step. Don't worry—algorithms are still based on brute-force ideas. Once you master some common brute-force methods, you can always find a way to solve the problem.

Finally, I wish you can explore the world of coding problems on your own soon!

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
