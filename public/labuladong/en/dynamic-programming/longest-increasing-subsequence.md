# How to Design Transition Equations

> Source: https://labuladong.online/algo/en/dynamic-programming/longest-increasing-subsequence/
> Archived: labuladong.online

---

# How to Design Transition Equations

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[300\. Longest Increasing Subsequence](<https://leetcode.com/problems/longest-increasing-subsequence/>)|   
[354\. Russian Doll Envelopes](<https://leetcode.com/problems/russian-doll-envelopes/>)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Dynamic Programming Core Framework](</en/algo/essential-technique/dynamic-programming-framework/>)

Maybe you've read [Dynamic Programming Explained](</en/algo/essential-technique/dynamic-programming-framework/>) and learned the DP patterns: you can identify the problem's "states", define what your `dp` array/function represents, and establish the base cases. But you're still stuck—you can't figure out the "choices" or the state transition relationship, so you still can't write a working DP solution. What now?

Don't worry. The hardest part of dynamic programming has always been finding the right state transition equation. This article uses the classic "Longest Increasing Subsequence" problem to teach you a general technique for designing DP solutions: **mathematical induction**.

The Longest Increasing Subsequence (LIS for short) is a classic algorithm problem. The more straightforward approach is dynamic programming with O(N²) time complexity. We'll use this problem to dive deep into how to find state transitions and write DP solutions. A less obvious approach uses binary search with O(NlogN) time complexity—we'll understand this clever solution through a simple card game.

LeetCode problem 300 "[Longest Increasing Subsequence](<https://leetcode.cn/problems/longest-increasing-subsequence/>)" is exactly this problem:

**300\. Longest Increasing Subsequence** |[LeetCode](<https://leetcode.com/problems/longest-increasing-subsequence/>)

Given an integer array `nums`, return _the length of the longest**strictly increasing**_ _**subsequence**_.

**Example 1:**

```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
``` 

**Example 2:**

```
Input: nums = [0,1,0,3,2,3]
Output: 4
``` 

**Example 3:**

```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
``` 

**Constraints:**

  * `1 <= nums.length <= 2500`
  * `-104 <= nums[i] <= 104`

**Follow up:** Can you come up with an algorithm that runs in `O(n log(n))` time complexity?

The problem is from [LeetCode 300. Longest Increasing Subsequence](<https://leetcode.com/problems/longest-increasing-subsequence/>).

```python
# Function signature
def lengthOfLIS(nums: List[int]) -> int:
``` 

For example, given `nums=[10,9,2,5,3,7,101,18]`, the longest increasing subsequence is `[2,3,7,101]`, so the algorithm should return 4.

Note the difference between "subsequence" and "substring": a substring must be contiguous, while a subsequence doesn't have to be. Let's start by designing a dynamic programming solution.

## I. Dynamic Programming Solution

The core design principle behind dynamic programming is mathematical induction.

You're probably familiar with mathematical induction from high school—the concept is simple. When we want to prove a mathematical conclusion, **we first assume the conclusion holds for`k < n`, then use that assumption to prove it also holds for `k = n`**. If we can prove that, the conclusion holds for all values of `k`.

Similarly, when designing a DP algorithm with a dp array, we can assume `dp[0...i-1]` have all been computed, then ask ourselves: how can we use these results to calculate `dp[i]`?

Let's use the longest increasing subsequence problem as an example. First, we need to clearly define what the dp array means—what does `dp[i]` actually represent?

**Here's our definition:`dp[i]` represents the length of the longest increasing subsequence that ends with `nums[i]`.**

Info

Why define it this way? This is a common pattern for solving subsequence problems. [Dynamic Programming Patterns for Subsequences](</en/algo/dynamic-programming/subsequence-problem/>) summarizes several common patterns. Once you've read through all the DP problems in this chapter, you'll see there are only a few ways to define `dp` arrays.

Based on this definition, we can derive the base case: `dp[i]` starts at 1, because the longest increasing subsequence ending with `nums[i]` must at least include itself.

Here are two examples:

![diagram](https://labuladong.online/images/algo/lis/8.jpeg)

This GIF shows how the algorithm evolves:

![diagram](https://labuladong.online/images/algo/lis/gif1.gif)

Based on this definition, our final result (the maximum subsequence length) should be the maximum value in the dp array.

```
int res = 0;
for (int i = 0; i < dp.length; i++) {
    res = Math.max(res, dp[i]);
}
return res;
``` 

You might be wondering: in the algorithm evolution process we just saw, we figured out each `dp[i]` by visual inspection. How do we design the actual algorithm logic to correctly compute each `dp[i]`?

This is the heart of dynamic programming—how do we design the state transition logic to make it work correctly? Here's where we use mathematical induction:

**Assume we already know all the results for`dp[0..4]`. How can we use these known results to derive `dp[5]`?**

![diagram](https://labuladong.online/images/algo/lis/6.jpeg)

Based on our definition of the `dp` array, we're now trying to find `dp[5]`, which means finding the longest increasing subsequence ending with `nums[5]`.

**`nums[5] = 3`. Since we want an increasing subsequence, we just need to find all previous subsequences that end with values smaller than 3, then append 3 to those subsequences to form new increasing subsequences—each one unit longer.**

Which elements before `nums[5]` are smaller than `nums[5]`? Easy—just loop through and compare.

What's the length of the longest increasing subsequence ending with each of these elements? Remember our `dp` array definition—it records exactly that: the length of the longest increasing subsequence ending with each element.

In our example, both `nums[0]` and `nums[4]` are smaller than `nums[5]`. We compare `dp[0]` and `dp[4]`, then append `nums[5]` to the longer subsequence to get `dp[5] = 3`:

![diagram](https://labuladong.online/images/algo/lis/7.jpeg)

```
for (int j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
    }
}
``` 

When `i = 5`, this code calculates `dp[5]`. At this point, we've basically solved the problem.

You might ask: we only calculated `dp[5]`, what about `dp[4]`, `dp[3]`, etc.? Just like mathematical induction, once you can calculate `dp[5]`, you can calculate all the others:

```
for (int i = 0; i < nums.length; i++) {
    for (int j = 0; j < i; j++) {
        // find elements in nums[0..i-1] that are smaller than nums[i]
        if (nums[j] < nums[i]) {
            // append nums[i] to form an increasing subsequence of length dp[j] + 1
            // ending with nums[i]
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}
``` 

Combined with the base case we mentioned earlier, here's the complete code:

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # Definition: dp[i] represents the length of the
        # longest increasing subsequence ending with nums[i]
        dp = [1]*len(nums)
        # base case: initialize all elements of dp array to 1
        for i in range(len(nums)):
            for j in range(i):
                if nums[i] > nums[j]: 
                    dp[i] = max(dp[i], dp[j] + 1) 
        
        res = 0
        for i in range(len(dp)):
            res = max(res, dp[i])
        return res
``` 

Algorithm Visualization

That solves it. Time complexity is O(N2)O(N^2)O(N2). Let's summarize how to find the state transition relationship in dynamic programming:

  1. Clearly define the `dp` array. This step is crucial for any DP problem. If the definition isn't appropriate or clear enough, it'll block all subsequent steps.

  2. Based on the `dp` array definition, use mathematical induction: assume `dp[0...i-1]` are known, then figure out how to compute `dp[i]`. Once you complete this step, the problem is basically solved.

But if you can't complete this step, it's likely because the `dp` array definition isn't quite right and needs to be redefined; or perhaps the `dp` array doesn't store enough information to derive the next answer, and you need to expand it to a 2D or even 3D array.

This solution is standard dynamic programming, but for the longest increasing subsequence problem, it's not optimal and might not pass all test cases. Let's look at a more efficient approach.

## II. Binary Search Solution

This solution has O(NlogN)O(NlogN)O(NlogN) time complexity, but honestly, most people wouldn't think of it (maybe someone who's played certain card games could). Just be aware of it—under normal circumstances, being able to provide the DP solution is already quite good.

Based on the problem description, it's hard to imagine this problem could relate to binary search. The longest increasing subsequence actually connects to a card game called patience, and there's even a sorting algorithm called patience sorting.

To keep things simple, I'll skip all the mathematical proofs and explain the algorithm through a simplified example.

First, imagine you have a row of playing cards. We'll process them from left to right just like traversing an array, and eventually separate them into several piles.

![diagram](https://labuladong.online/images/algo/lis/poker1.jpeg)

**Follow these rules when processing the cards** :

You can only place a smaller card on top of a larger or equal card; if the current card is too large for any existing pile, create a new pile for it; if multiple piles could accept the current card, choose the leftmost pile.

For instance, the cards above would end up in 5 piles (we'll say Ace has the highest value and 2 has the lowest).

![diagram](https://labuladong.online/images/algo/lis/poker2.jpeg)

Why choose the leftmost pile when multiple options exist? Because this keeps the pile tops sorted (2, 4, 7, 8, Q)—proof omitted.

![diagram](https://labuladong.online/images/algo/lis/poker3.jpeg)

Following these rules, we can compute the longest increasing subsequence. The number of piles equals the length of the longest increasing subsequence—proof omitted.

![diagram](https://labuladong.online/images/algo/lis/poker4.jpeg)

We just need to code up the card-processing procedure. Each time we process a card, we need to find the right pile top to place it on, and the pile tops are **sorted** —perfect for binary search! We use binary search to find where the current card should go.

Tip

[Binary Search Explained](</en/algo/essential-technique/binary-search-framework/>) covers binary search details and variants in depth. This is a perfect application. If you haven't read it, I highly recommend it.

```python
class Solution:
    def lengthOfLIS(self, nums):
        top = [0] * len(nums)
        # initialize the number of piles to 0
        piles = 0
        for i in range(len(nums)):
            # the poker card to be processed
            poker = nums[i]

            # binary search for the left boundary
            left, right = 0, piles
            while left < right:
                mid = (left + right) // 2
                if top[mid] > poker:
                    right = mid
                elif top[mid] < poker:
                    left = mid + 1
                else:
                    right = mid

            # no suitable pile found, create a new one
            if left == piles:
                piles += 1
            # place this card on top of the pile
            top[left] = poker
        # the number of piles is the length of LIS
        return piles
``` 

Algorithm Visualization

That completes the binary search solution.

This approach is genuinely hard to come up with. First, it involves mathematical proof—who would think that following these rules yields the longest increasing subsequence? Second, it requires applying binary search, and if you're not familiar with its details, you'd struggle to implement it even with the idea.

So treat this method as a mental exercise. But the DP design approach should be fully understood: assume previous answers are known, use mathematical induction to correctly transition between states, and ultimately reach the answer.

## III. Extending to Two Dimensions

Let's look at an interesting problem that often appears in real life—LeetCode problem 354 "[Russian Doll Envelopes](<https://leetcode.cn/problems/russian-doll-envelopes/>)". Here's the problem:

**354\. Russian Doll Envelopes** |[LeetCode](<https://leetcode.com/problems/russian-doll-envelopes/>)

You are given a 2D array of integers `envelopes` where `envelopes[i] = [wi, hi]` represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

Return _the maximum number of envelopes you can Russian doll (i.e., put one inside the other)_.

**Note:** You cannot rotate an envelope.

**Example 1:**

```
3
``` 

**Example 2:**

```
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
``` 

**Constraints:**

  * `1 <= envelopes.length <= 105`
  * `envelopes[i].length == 2`
  * `1 <= wi, hi <= 105`

The problem is from [LeetCode 354. Russian Doll Envelopes](<https://leetcode.com/problems/russian-doll-envelopes/>).

**This problem is actually a variant of the longest increasing subsequence, because each valid nesting is larger containing smaller—equivalent to finding a longest increasing subsequence in a 2D plane. Its length is the maximum number of envelopes that can be nested.**

The standard LIS algorithm only works on 1D arrays, but our envelopes are represented as 2D pairs `(w, h)`. How do we apply the LIS algorithm here?

![diagram](https://labuladong.online/images/algo/nest-envelope/0.jpg)

You might think: calculate the area with `w × h`, then run the standard LIS algorithm on the areas. But a moment's thought reveals this won't work—for example, `1 × 10` is larger than `3 × 3`, but these two envelopes clearly can't nest inside each other.

The solution is pretty clever:

**First, sort by width`w` in ascending order. If two envelopes have the same `w`, sort them by height `h` in descending order. Then treat all the `h` values as an array and compute the LIS length on that array—that's the answer.**

Here's a visual to understand it. First, sort the pairs:

![diagram](https://labuladong.online/images/algo/nest-envelope/1-en.jpg)

Then find the longest increasing subsequence in `h`—this subsequence is the optimal nesting arrangement:

![diagram](https://labuladong.online/images/algo/nest-envelope/2-en.jpg)

**Why does this find a sequence of envelopes that can nest inside each other?** Think about it for a moment:

First, sorting `w` in ascending order ensures the `w` dimension can nest properly, so we only need to focus on the `h` dimension nesting.

Second, two envelopes with the same `w` can't contain each other, so for envelopes with equal width `w`, we sort height `h` in descending order to ensure the 2D LIS doesn't include multiple envelopes with the same `w` (since the problem says envelopes with identical dimensions can't nest).

Here's the solution code:

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        n = len(envelopes)
        # Sort by width in ascending order, and if widths are
        # the same, sort by height in descending order
        envelopes.sort(key=lambda x: (x[0], -x[1]))
        
        # Find the LIS for the height array
        height = [envelopes[i][1] for i in range(n)]

        return self.lengthOfLIS(height)

    # Return the length of the LIS in nums
    def lengthOfLIS(self, nums: List[int]) -> int:
        piles = 0
        n = len(nums)
        top = [0] * n
        for i in range(n):
            # The poker card to be processed
            poker = nums[i]
            left, right = 0, piles
            # Binary search for the insertion position
            while left < right:
                mid = (left + right) // 2
                if top[mid] >= poker:
                    right = mid
                else:
                    left = mid + 1
            if left == piles: piles += 1
            # Place this card on the top of the pile
            top[left] = poker
        # The number of piles is the length of the LIS
        return piles
``` 

Algorithm Visualization

To reuse the previous function, I split the code into two functions. You could also merge them to save the `height` array space.

With additional test cases, you must use the binary search version of `lengthOfLIS` to pass all tests. The algorithm's time complexity is O(NlogN)O(NlogN)O(NlogN), since both sorting and computing LIS take O(NlogN)O(NlogN)O(NlogN) time—combined, it's still O(NlogN)O(NlogN)O(NlogN). Space complexity is O(N)O(N)O(N) because the LIS function needs a `top` array.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
