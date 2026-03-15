# Monotonic Stack Code Template

> Source: https://labuladong.online/algo/en/data-structure/monotonic-stack/
> Archived: labuladong.online

---

# Monotonic Stack Code Template

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[496\. Next Greater Element I](<https://leetcode.com/problems/next-greater-element-i/>)|   
[739\. Daily Temperatures](<https://leetcode.com/problems/daily-temperatures/>)|   
[503\. Next Greater Element II](<https://leetcode.com/problems/next-greater-element-ii/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Array Basics](</en/algo/data-structure-basic/array-basic/>)
  * [Linked List Basics](</en/algo/data-structure-basic/linkedlist-basic/>)
  * [Queue/Stack Basics](</en/algo/data-structure-basic/queue-stack-basic/>)

A stack is a very simple data structure. It follows a first-in-last-out order, which fits some problems well, such as the function call stack. A monotonic stack is just a stack, but with some clever logic. After each new element is pushed, the elements in the stack stay ordered (monotonically increasing or decreasing).

Sounds a bit like a heap? No. A monotonic stack is not used as widely. It is used for a specific type of problem, such as “next greater element”, “previous smaller element”, and so on. This article explains the monotonic stack template to solve “next greater element” problems, and also talks about how to handle “circular arrays”. Other variants and classic problems will be in the next article: [Monotonic Stack Variants and Classic Problems](</en/algo/problem-set/monotonic-stack/>).

## Monotonic Stack Template

Here is a problem: given an array `nums`, return a result array of the same length. For each index, store the next greater element. If there is no greater element, store -1. The function signature is:

```python
def calculateGreaterElement(nums: List[int])
``` 

For example, if the input is `nums = [2,1,2,4,3]`, you should return `[4,2,4,-1,-1]`. The first 2 has a next greater element 4; after 1, the next greater element is 2; the second 2 also has 4 as its next greater element; 4 has no greater element after it, so we put -1; 3 also has no greater element after it, so we put -1.

The brute-force solution is easy: for each element, scan to the right and find the first greater element. But the time complexity is O(n2)O(n^2)O(n2).

We can think about the problem like this: imagine the array elements as people standing in a line, and the value is the person’s height. They stand in a row facing you. How do you find the next greater element of the element “2”? Easy: if you can see “2”, then the first person you see behind “2” is its next greater element. Any person shorter than “2” will be blocked by “2”, so the first one who shows up must be taller and is the answer.

![diagram](https://labuladong.online/images/algo/monotonic-stack/1.jpeg)

This picture is easy to understand. With this in mind, look at the code:

```python
def calculateGreaterElement(nums):
    n = len(nums)
    # array to store the answers
    res = [0]*n
    s = []
    # push elements into the stack backwards
    for i in range(n-1, -1, -1):
        # compare the heights
        while s and s[-1] <= nums[i]:
            # shorter ones step aside, they're blocked anyway...
            s.pop()
        # the greater element behind nums[i]
        res[i] = -1 if not s else s[-1]
        s.append(nums[i])
    return res
``` 

This is the standard monotonic stack template. The for loop scans from right to left, because we use a stack. Pushing from right to left is like popping from left to right. The while loop removes elements between two “taller” elements, because those in the middle are useless. If a taller element stands in front of them, they can never be the next greater element for any future element.

The time complexity is not very obvious. Seeing a for loop with a nested while loop, you might think it is O(n2)O(n^2)O(n2), but it is actually O(n)O(n)O(n).

To analyze it, look at the whole process: there are `n` elements. Each element is pushed onto the stack once, and at most popped once. There is no extra work. So the total work is proportional to `n`, which is O(n)O(n)O(n).

## Variants

The code for a monotonic stack is quite simple. Now let’s look at some concrete problems.

### 496\. Next Greater Element I

First, an easy variant: LeetCode 496, “[Next Greater Element I](<https://leetcode.com/problems/next-greater-element-i/>)”:

**496\. Next Greater Element I** |[LeetCode](<https://leetcode.com/problems/next-greater-element-i/>)

The **next greater element** of some element `x` in an array is the **first greater** element that is **to the right** of `x` in the same array.

You are given two **distinct 0-indexed** integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.

For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the **next greater element** of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.

Return _an array_`ans` _of length_`nums1.length` _such that_`ans[i]`_is the**next greater element** as described above._

**Example 1:**

```
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
``` 

**Example 2:**

```
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
``` 

**Constraints:**

  * `1 <= nums1.length <= nums2.length <= 1000`
  * `0 <= nums1[i], nums2[i] <= 104`
  * All integers in `nums1` and `nums2` are **unique**.
  * All the integers of `nums1` also appear in `nums2`.

**Follow up:** Could you find an `O(nums1.length + nums2.length)` solution?

The problem is from [LeetCode 496. Next Greater Element I](<https://leetcode.com/problems/next-greater-element-i/>).

You are given two arrays `nums1` and `nums2`. For each element in `nums1`, find its next greater element in `nums2`. The function signature is:

```python
def nextGreaterElement(nums1: List[int], nums2: List[int]) -> List[int]:
``` 

We can solve it by slightly changing our previous code. Since `nums1` is a subset of `nums2`, we can first compute the next greater element for every element in `nums2`, and store it in a map. Then, for each element in `nums1`, we just look it up in the map:

```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # record the next greater element for each element in nums2
        greater = self.nextGreaterElementInternal(nums2)
        # convert to a map: element x -> next greater element of x
        greater_map = {}
        for i in range(len(nums2)):
            greater_map[nums2[i]] = greater[i]
        # nums1 is a subset of nums2, so we can get the result based on greaterMap
        res = [greater_map[num] for num in nums1]
        return res

    # calculate the next greater element for each element in nums
    def nextGreaterElementInternal(self, nums: List[int]) -> List[int]:
        n = len(nums)
        # array to store the answers
        res = [-1] * n  # Initialize with -1 as specified in the problem statement
        stack = []
        # push elements onto the stack in reverse order
        for i in range(n - 1, -1, -1):
            # determine the height (size) of elements
            while stack and stack[-1] <= nums[i]:
                # remove the shorter elements as they are blocked anyway
                stack.pop()
            # the next greater element after nums[i]
            res[i] = stack[-1] if stack else -1
            stack.append(nums[i])
        return res
``` 

Algorithm Visualization

### 739\. Daily Temperatures

Now look at LeetCode 739, “[Daily Temperatures](<https://leetcode.com/problems/daily-temperatures/>)”:

You are given an array `temperatures` that records the temperature of each day. Return an array of the same length that, for each day, tells you how many days you have to wait until a warmer temperature. If there is no future day with a warmer temperature, put 0. The function signature is:

```python
def dailyTemperatures(temperatures: List[int]) -> List[int]:
``` 

For example, if `temperatures = [73,74,75,71,69,76]`, the answer is `[1,1,3,2,1,0]`. For day 1 with 73°F, on day 2 it is 74°F, which is warmer. So for day 1, you need to wait 1 day; and so on.

This is also a “next greater element” problem. But now we do not return the value of the next greater element, we return the distance between the current index and the index of the next greater element.

We use the same idea, apply the monotonic stack template, and make small changes:

```python
class Solution:
    def dailyTemperatures(self, temperatures):
        n = len(temperatures)
        res = [0]*n
        # Store element indices here, not elements
        s = []
        # Monotonic stack template
        for i in range(n-1, -1, -1):
            while s and temperatures[s[-1]] <= temperatures[i]:
                s.pop()
            # Get the index difference
            res[i] = 0 if not s else s[-1] - i
            # Push the index onto the stack, not the element
            s.append(i)
        return res
``` 

We are done with monotonic stacks. Next we will talk about another key point: how to handle “circular arrays”.

## How to Handle Circular Arrays

We still want to find the next greater element. But now the array is circular. How do we handle it? LeetCode 503 “[Next Greater Element II](<https://leetcode.com/problems/next-greater-element-ii/>)” is this problem: given a _circular array_ , compute the next greater element for every element.

For example, input `[2,1,2,4,3]`, you should return `[4,2,4,-1,4]`. Because with the circular property, **the last element 3 can loop around and find 4 as its next greater element**.

If you have read the [Circular Array Techniques](</en/algo/data-structure-basic/cycle-array/>) in the basics section, you should be familiar with this idea: we usually use the `%` operator (modulo) to simulate the circular behavior:

```python
arr = [1,2,3,4,5]
n = len(arr)
index = 0
while True:
    # Circulate in a circular array
    print(arr[index % n])
    index += 1
``` 

We still need to use the monotonic stack template to solve this problem. The hard part is: for input `[2,1,2,4,3]`, how can the last element 3 find 4 as its next greater element?

**A common trick for this kind of problem is to double the length of the array** :

![diagram](https://labuladong.online/images/algo/monotonic-stack/2.jpeg)

This way, element 3 can find element 4 as its next greater element, and other elements can also be computed correctly.

With this idea, the simplest way is to really build a new array of double length, then apply the template. But **we do not need to build a new array. We can use circular array tricks to _simulate_ the effect of doubling the array**. Let’s go straight to the code:

```python
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        # Use an array to simulate a stack
        s = []
        # Double the array length to simulate a circular array
        for i in range(2 * n - 1, -1, -1):
            # Index i needs to be modulo, the rest is the same as the template
            while s and s[-1] <= nums[i % n]:
                s.pop()
            res[i % n] = -1 if not s else s[-1]
            s.append(nums[i % n])
        return res
``` 

Algorithm Visualization

This nicely solves the circular array problem, with time complexity O(N)O(N)O(N).

To end, think about some questions. The monotonic stack template we used is the `nextGreaterElement` function, which finds the next greater element for each position. But what if the problem asks for the _previous_ greater element, or the previous greater or equal element? How should you change the template?

Also, in real problems, you are rarely asked to directly compute the next (or previous) greater (or smaller) element. How can you turn a problem into one that can be solved using a monotonic stack?

I will compare several variants of the monotonic stack and give classic practice problems in [Monotonic Stack Variants and Exercises](</en/algo/problem-set/monotonic-stack/>). For more data structure design problems, see [Classic Data Structure Design Exercises](</en/algo/problem-set/ds-design/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
