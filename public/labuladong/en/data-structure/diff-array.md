# Difference Array Technique

> Source: https://labuladong.online/algo/en/data-structure/diff-array/
> Archived: labuladong.online

---

# Difference Array Technique

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[370\. Range Addition](<https://leetcode.com/problems/range-addition/>)🔒|   
[1109\. Corporate Flight Bookings](<https://leetcode.com/problems/corporate-flight-bookings/>)|   
[1094\. Car Pooling](<https://leetcode.com/problems/car-pooling/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Array Basics](</en/algo/data-structure-basic/array-basic/>)
  * [Prefix Sum Technique](</en/algo/data-structure/prefix-sum/>)

The [Prefix Sum Technique](</en/algo/data-structure/prefix-sum/>) is mainly used when the original array does not change, and you need to quickly find the sum of any interval. The key code is below:

```python
class PrefixSum:
    # Prefix sum array
    def __init__(self, nums: List[int]):
        self.prefix = [0] * (len(nums) + 1)
        # Calculate the cumulative sum of nums
        for i in range(1, len(self.prefix)):
            self.prefix[i] = self.prefix[i - 1] + nums[i - 1]
    
    # Query the cumulative sum of the closed interval [i, j]
    def query(self, i: int, j: int) -> int:
        return self.prefix[j + 1] - self.prefix[i]
``` 

![diagram](https://labuladong.online/images/algo/difference/1.jpeg)

`preSum[i]` means the sum of all elements from `nums[0]` to `nums[i-1]`. If you want to find the sum from `nums[i]` to `nums[j]`, just calculate `preSum[j+1] - preSum[i]`. You don't need to loop through the whole interval.

In this article, we talk about another technique similar to prefix sum: the **Difference Array**. The main use of the difference array is when you need to frequently increase or decrease the values in a range of the original array.

For example, suppose you have an array `nums`, and you need to:

  * add 1 to all elements from `nums[2]` to `nums[6]`
  * subtract 3 from all elements from `nums[3]` to `nums[9]`
  * add 2 to all elements from `nums[0]` to `nums[4]`
  * and so on...

After many such operations, what is the final value of the `nums` array?

The usual way is simple. If you want to add `val` to all elements from `nums[i]` to `nums[j]`, just use a for loop and add `val` to each element. But this takes O(N)O(N)O(N) time for each operation. If there are many operations, this will be slow.

Here is where the difference array helps. Just like the prefix sum uses a `preSum` array, we can build a `diff` array for `nums`. **`diff[i]` is the difference between `nums[i]` and `nums[i-1]`**:

```python
diff = [0] * len(nums)
# Construct the difference array
diff[0] = nums[0]
for i in range(1, len(nums)):
    diff[i] = nums[i] - nums[i - 1]
``` 

![diagram](https://labuladong.online/images/algo/difference/2.jpeg)

Using this `diff` array, you can get back the original `nums` array. The code is like this:

```python
res = [0] * len(diff)
# construct the result array based on the difference array
res[0] = diff[0]
for i in range(1, len(diff)):
    res[i] = res[i - 1] + diff[i]
``` 

**With the difference array`diff`, you can quickly increase or decrease a range of elements.** If you want to add 3 to all elements from `nums[i]` to `nums[j]`, just do `diff[i] += 3` and `diff[j+1] -= 3`:

![diagram](https://labuladong.online/images/algo/difference/3.jpeg)

**The idea is simple. When you set`diff[i] += 3`, it means you add 3 to all elements from `nums[i]` and after. Then `diff[j+1] -= 3` means you subtract 3 from all elements from `nums[j+1]` and after. In total, only the elements from `nums[i]` to `nums[j]` get increased by 3.**

You only need O(1) time to change the `diff` array, which is like updating an entire interval in the original `nums` array. Do all your changes to `diff`, then build the final `nums` from `diff`.

Now, let's make the difference array into a class with `increment` and `result` methods:

```python
# Difference Array Tool Class
class Difference:
    # difference array
    def __init__(self, nums: List[int]):
        assert len(nums) > 0
        self.diff = [0] * len(nums)
        # construct the difference array based on the initial array
        self.diff[0] = nums[0]
        for i in range(1, len(nums)):
            self.diff[i] = nums[i] - nums[i - 1]

    # increment the closed interval [i, j] by val (can be negative)
    def increment(self, i: int, j: int, val: int) -> None:
        self.diff[i] += val
        if j + 1 < len(self.diff):
            self.diff[j + 1] -= val

    # return the result array
    def result(self) -> List[int]:
        res = [0] * len(self.diff)
        # construct the result array based on the difference array
        res[0] = self.diff[0]
        for i in range(1, len(self.diff)):
            res[i] = res[i - 1] + self.diff[i]
        return res
``` 

Notice the `if` statement in the `increment` method:

```python
def increment(i: int, j: int, val: int) -> None:
    diff[i] += val
    
    if j + 1 < len(diff):
        diff[j + 1] -= val
``` 

When `j+1 >= diff.length`, it means you are changing all elements from `nums[i]` to the end, so you don't need to subtract `val` from `diff` anymore.

You can open the panel below. Click the line `diff[i] = nums[i] - nums[i - 1]` several times to see how the `diff` array is built. Then click `df.increment` a few times to see how the `diff` array changes:

Algorithm Visualization

## Practical Examples

LeetCode problem 370 "[Range Addition](<https://leetcode.com/problems/range-addition/>)" directly tests the difference array technique. You're given an array `nums` of length `n` initialized to all zeros, asked to perform increment/decrement operations on ranges, and finally return the resulting `nums` array.

Just copy over the `Difference` class we implemented and you're done:

```python
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        # nums initialized to all 0s
        nums = [0] * length
        # construct difference method
        df = self.Difference(nums)
        for update in updates:
            i = update[0]
            j = update[1]
            val = update[2]
            df.increment(i, j, val)
        return df.result()

    class Difference:
        # difference array
        def __init__(self, nums: List[int]):
            assert len(nums) > 0
            self.diff = [0] * len(nums)
            # construct difference array
            self.diff[0] = nums[0]
            for i in range(1, len(nums)):
                self.diff[i] = nums[i] - nums[i - 1]

        # increment closed interval [i, j] by val (can be negative)
        def increment(self, i: int, j: int, val: int):
            self.diff[i] += val
            if j + 1 < len(self.diff):
                self.diff[j + 1] -= val

        def result(self) -> List[int]:
            res = [0] * len(self.diff)
            # construct result array based on difference array
            res[0] = self.diff[0]
            for i in range(1, len(self.diff)):
                res[i] = res[i - 1] + self.diff[i]
            return res
``` 

Of course, in real problems you'll need to recognize and abstract the pattern—they won't be this obvious about using difference arrays. Let's look at LeetCode problem 1109 "[Corporate Flight Bookings](<https://leetcode.com/problems/corporate-flight-bookings/>)":

**1109\. Corporate Flight Bookings** |[LeetCode](<https://leetcode.com/problems/corporate-flight-bookings/>)

There are `n` flights that are labeled from `1` to `n`.

You are given an array of flight bookings `bookings`, where `bookings[i] = [firsti, lasti, seatsi]` represents a booking for flights `firsti` through `lasti` (**inclusive**) with `seatsi` seats reserved for **each flight** in the range.

Return _an array_`answer` _of length_`n` _, where_`answer[i]`_is the total number of seats reserved for flight_`i`.

**Example 1:**

```
Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
Explanation:
Flight labels:        1   2   3   4   5
Booking 1 reserved:  10  10
Booking 2 reserved:      20  20
Booking 3 reserved:      25  25  25  25
Total seats:         10  55  45  25  25
Hence, answer = [10,55,45,25,25]
``` 

**Example 2:**

```
Input: bookings = [[1,2,10],[2,2,15]], n = 2
Output: [10,25]
Explanation:
Flight labels:        1   2
Booking 1 reserved:  10  10
Booking 2 reserved:      15
Total seats:         10  25
Hence, answer = [10,25]
``` 

**Constraints:**

  * `1 <= n <= 2 * 104`
  * `1 <= bookings.length <= 2 * 104`
  * `bookings[i].length == 3`
  * `1 <= firsti <= lasti <= n`
  * `1 <= seatsi <= 104`

The problem is from [LeetCode 1109. Corporate Flight Bookings](<https://leetcode.com/problems/corporate-flight-bookings/>).

The function signature is:

```python
def corpFlightBookings(bookings: List[List[int]], n: int) -> List[int]:
``` 

This problem wraps things in confusing language, but it's really just a difference array problem. Let me translate it for you:

You're given an array `nums` of length `n` where all elements are 0. You're also given `bookings`, which contains several triplets `(i, j, k)`. Each triplet means you need to add `k` to all elements in the closed interval `[i-1, j-1]` of `nums`. Return the final `nums` array.

Note

Since the problem counts `n` starting from 1, but array indices start from 0, the triplet `(i, j, k)` corresponds to the array interval `[i-1, j-1]`.

Now it's clear—this is a standard difference array problem! We can directly reuse the class we wrote:

```python
class Solution:
    def corpFlightBookings(self, bookings, n):
        # initialize nums as all 0
        nums = [0] * n
        # construct the difference array
        df = self.Difference(nums)

        for booking in bookings:
            # note that converting to array index needs to subtract one
            i = booking[0] - 1
            j = booking[1] - 1
            val = booking[2]
            # increment the range nums[i..j] by val
            df.increment(i, j, val)
        # return the final result array
        return df.result()

    class Difference:
        # difference array
        def __init__(self, nums):
            assert len(nums) > 0
            self.diff = [0] * len(nums)
            # construct the difference array
            self.diff[0] = nums[0]
            for i in range(1, len(nums)):
                self.diff[i] = nums[i] - nums[i - 1]

        # increment the closed interval [i, j] by val (can be negative)
        def increment(self, i, j, val):
            self.diff[i] += val
            if j + 1 < len(self.diff):
                self.diff[j + 1] -= val

        def result(self):
            res = [0] * len(self.diff)
            # construct the result array based on the difference array
            res[0] = self.diff[0]
            for i in range(1, len(self.diff)):
                res[i] = res[i - 1] + self.diff[i]
            return res
``` 

Problem solved.

Here's another similar problem—LeetCode problem 1094 "[Car Pooling](<https://leetcode.com/problems/car-pooling/>)":

**1094\. Car Pooling** |[LeetCode](<https://leetcode.com/problems/car-pooling/>)

There is a car with `capacity` empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer `capacity` and an array `trips` where `trips[i] = [numPassengersi, fromi, toi]` indicates that the `ith` trip has `numPassengersi` passengers and the locations to pick them up and drop them off are `fromi` and `toi` respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return `true` _if it is possible to pick up and drop off all passengers for all the given trips, or_`false` _otherwise_.

**Example 1:**

```
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
``` 

**Example 2:**

```
Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
``` 

**Constraints:**

  * `1 <= trips.length <= 1000`
  * `trips[i].length == 3`
  * `1 <= numPassengersi <= 100`
  * `0 <= fromi < toi <= 1000`
  * `1 <= capacity <= 105`

The problem is from [LeetCode 1094. Car Pooling](<https://leetcode.com/problems/car-pooling/>).

The function signature is:

```python
def carPooling(trips: List[List[int]], capacity: int) -> bool:
``` 

For example, given:

```
trips = [[2,1,5],[3,3,7]], capacity = 4
``` 

This trip can't be completed in one go because `trips[1]` can only pick up 2 more passengers at most, otherwise the car would be overloaded.

You've probably already connected this to difference arrays: **each`trips[i]` represents a range operation—passengers boarding and alighting correspond to incrementing and decrementing ranges. If every element in the result array is less than `capacity`, all passengers can be transported without overloading.**

But what should the length of the difference array (number of stops) be? The problem doesn't tell us directly, but gives us the data range:

```
0 <= trips[i][1] < trips[i][2] <= 1000
``` 

Stop numbers range from 0 to at most 1000, meaning there are at most 1001 stops. So we can set our difference array length to 1001, which covers all possible stop numbers:

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        # at most there are 1000 stops
        nums = [0] * 1001
        # construct the difference array method
        df = self.Difference(nums)

        for trip in trips:
            # number of passengers
            val = trip[0]
            # passengers get on at stop trip[1]
            i = trip[1]
            # passengers get off at stop trip[2],
            # meaning the interval passengers are on the car is [trip[1], trip[2] - 1]
            j = trip[2] - 1
            # perform interval operation
            df.increment(i, j, val)

        res = df.result()

        # the car should never exceed its capacity
        for i in range(len(res)):
            if capacity < res[i]:
                return False
        return True

    # difference array utility class
    class Difference:
        # difference array
        def __init__(self, nums: List[int]):
            # input an initial array, interval operations will be performed on this array
            # construct the difference array based on the initial array
            self.diff = [nums[0]] + [nums[i] - nums[i - 1] for i in range(1, len(nums))]

        # increment the closed interval [i, j] by val (can be negative)
        def increment(self, i: int, j: int, val: int) -> None:
            self.diff[i] += val
            if j + 1 < len(self.diff):
                self.diff[j + 1] -= val

        # return the result array
        def result(self) -> List[int]:
            res = [self.diff[0]]
            # construct the result array based on the difference array
            for i in range(1, len(self.diff)):
                res.append(res[i - 1] + self.diff[i])
            return res
``` 

And that solves this problem too.

Both difference arrays and prefix sum arrays are common and clever techniques. They suit different scenarios, and once you understand them, they're straightforward—but tricky if you don't.

## Further Reading

First question: to use the difference array technique, you need to create a `diff` array with the same length as your interval. What if you have a huge interval like `[0, 10^9]`? Do you really need to create an array of length `10^9` just to start doing range operations?

Second question: prefix sums enable fast range queries, while difference arrays enable fast range updates. Can we combine them to get both fast range updates AND fast range queries?

These are common questions when dealing with range problems. The ultimate answer is the [Segment Tree](</en/algo/data-structure-basic/segment-tree-basic/>) data structure, which can perform both range updates and range queries on intervals of any length in O(log⁡N)O(\log N)O(logN) time.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
