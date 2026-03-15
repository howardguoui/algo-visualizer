# Two Pointer Techniques for Array Problems

> Source: https://labuladong.online/algo/en/essential-technique/array-two-pointers-summary/
> Archived: labuladong.online

---

# Two Pointer Techniques for Array Problems

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[26\. Remove Duplicates from Sorted Array](<https://leetcode.com/problems/remove-duplicates-from-sorted-array/>)|   
[83\. Remove Duplicates from Sorted List](<https://leetcode.com/problems/remove-duplicates-from-sorted-list/>)|   
[27\. Remove Element](<https://leetcode.com/problems/remove-element/>)|   
[283\. Move Zeroes](<https://leetcode.com/problems/move-zeroes/>)|   
[167\. Two Sum II - Input Array Is Sorted](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>)|   
[344\. Reverse String](<https://leetcode.com/problems/reverse-string/>)|   
[5\. Longest Palindromic Substring](<https://leetcode.com/problems/longest-palindromic-substring/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Array Basics](</en/algo/data-structure-basic/array-basic/>)
  * [Six Patterns for Linked List Problems](</en/algo/essential-technique/linked-list-skills-summary/>)

When working with array and linked list problems, two-pointer techniques come up all the time. These techniques fall into two main categories: **left-right pointers** and **fast-slow pointers**.

Left-right pointers move toward or away from each other. Fast-slow pointers move in the same direction, but one moves faster than the other.

For singly linked lists, most techniques involve fast-slow pointers. [Six Patterns for Linked List Problems](</en/algo/essential-technique/linked-list-skills-summary/>) covers all of them—things like cycle detection and finding the `K`th node from the end. These problems are solved using a `fast` pointer and a `slow` pointer working together.

Arrays don't have actual pointers, but we can treat indices as pointers. This lets us apply two-pointer techniques to arrays as well. **This article focuses on two-pointer algorithms for arrays.**

## Fast-Slow Pointer Techniques

### In-Place Modification

**A common use of fast-slow pointers in array problems is in-place modification.**

Take LeetCode problem 26, "[Remove Duplicates from Sorted Array](<https://leetcode.cn/problems/remove-duplicates-from-sorted-array/>)," which asks you to deduplicate a sorted array:

**26\. Remove Duplicates from Sorted Array** |[LeetCode](<https://leetcode.com/problems/remove-duplicates-from-sorted-array/>)

Given an integer array `nums` sorted in **non-decreasing order** , remove the duplicates [**in-place**](<https://en.wikipedia.org/wiki/In-place_algorithm>) such that each unique element appears only **once**. The **relative order** of the elements should be kept the **same**. Then return _the number of unique elements in_`nums`.

Consider the number of unique elements of `nums` to be `k`, to get accepted, you need to do the following things:

  * Change the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
  * Return `k`.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
``` 

If all assertions pass, then your solution will be **accepted**.

**Example 1:**

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
``` 

**Example 2:**

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
``` 

**Constraints:**

  * `1 <= nums.length <= 3 * 104`
  * `-100 <= nums[i] <= 100`
  * `nums` is sorted in **non-decreasing** order.

The problem is from [LeetCode 26. Remove Duplicates from Sorted Array](<https://leetcode.com/problems/remove-duplicates-from-sorted-array/>).

Here's the function signature:

```python
def removeDuplicates(nums: List[int]) -> int:
``` 

Let me quickly explain what "in-place" means:

If we weren't required to do this in-place, we could just create a new `int[]` array, put the deduplicated elements in it, and return it.

But the problem requires in-place deletion—no new arrays allowed. You can only work with the original array and return a length. With that length and the original array, you can identify which elements remain after deduplication.

Since the array is sorted, duplicate elements are always adjacent, so finding them is easy. But if you delete each duplicate immediately when you find it, the data shifting involved would push the time complexity to O(N2)O(N^2)O(N2).

The efficient solution uses fast-slow pointers:

The `slow` pointer trails behind while the `fast` pointer scouts ahead. When `fast` finds a non-duplicate element, it assigns that value to `slow`, and `slow` moves forward one step.

This guarantees that `nums[0..slow]` contains only unique elements. Once `fast` finishes traversing the entire array, `nums[0..slow]` is the deduplicated result.

Here's the code:

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0
        slow = 0
        fast = 0
        while fast < len(nums):
            if nums[fast] != nums[slow]:
                slow += 1
                # maintain nums[0..slow] without duplicates
                nums[slow] = nums[fast]
            fast += 1
        # array length is index + 1
        return slow + 1
``` 

Open the visualization panel below and click the line `while (fast < nums.length)` multiple times to see how the two pointers maintain unique elements in `nums[0..slow]`:

Algorithm Visualization

Let's extend this a bit. Look at LeetCode problem 83, "[Remove Duplicates from Sorted List](<https://leetcode.cn/problems/remove-duplicates-from-sorted-list/>)." How would you deduplicate a sorted singly linked list?

It's essentially the same as array deduplication—the only difference is replacing array assignment with pointer manipulation. Compare it with the previous code:

```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        if head is None:
            return None
        slow = head
        fast = head
        while fast is not None:
            if fast.val != slow.val:
                # nums[slow] = nums[fast];
                slow.next = fast
                # slow++;
                slow = slow.next
            # fast++
            fast = fast.next
        # disconnect the link to the subsequent duplicate elements
        slow.next = None
        return head
``` 

Check out the visualization panel below to see the algorithm in action:

Algorithm Visualization

Note

You might be wondering: the duplicate nodes aren't actually deleted from the linked list—they're just left hanging there. Is that okay?

This comes down to language-specific behavior. Languages like Java and Python have garbage collection that automatically finds and reclaims memory from these "dangling" nodes. Languages like C++ don't have automatic garbage collection, so you'd need to manually free the memory for these nodes.

That said, when it comes to developing algorithmic thinking, just understanding this fast-slow pointer technique is what matters.

**Beyond deduplicating sorted arrays/linked lists, you might also need to "remove" certain elements from an array in-place.**

Take LeetCode problem 27, "[Remove Element](<https://leetcode.cn/problems/remove-element/>)":

**27\. Remove Element** |[LeetCode](<https://leetcode.com/problems/remove-element/>)

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` [**in-place**](<https://en.wikipedia.org/wiki/In-place_algorithm>). The order of the elements may be changed. Then return _the number of elements in_`nums` _which are not equal to_`val`.

Consider the number of elements in `nums` which are not equal to `val` be `k`, to get accepted, you need to do the following things:

  * Change the array `nums` such that the first `k` elements of `nums` contain the elements which are not equal to `val`. The remaining elements of `nums` are not important as well as the size of `nums`.
  * Return `k`.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
``` 

If all assertions pass, then your solution will be **accepted**.

**Example 1:**

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
``` 

**Example 2:**

```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
``` 

**Constraints:**

  * `0 <= nums.length <= 100`
  * `0 <= nums[i] <= 50`
  * `0 <= val <= 100`

The problem is from [LeetCode 27. Remove Element](<https://leetcode.com/problems/remove-element/>).

```python
# The function signature is as follows
def removeElement(nums: List[int], val: int) -> int:
``` 

The problem asks you to remove all elements equal to `val` from `nums` in-place. Once again, we use fast-slow pointers:

If `fast` encounters an element equal to `val`, it skips over it. Otherwise, it assigns the value to `slow` and moves `slow` forward one step.

The approach is exactly the same as the array deduplication problem. Here's the code:

```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        fast, slow = 0, 0
        while fast < len(nums):
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1
        return slow
``` 

Open the visualization panel below and click the line `while (fast < nums.length)` multiple times to see how the two pointers maintain `nums[0..slow]` without the target element:

Algorithm Visualization

Notice a subtle difference from the sorted array deduplication solution: here we assign to `nums[slow]` first, then increment `slow++`. This ensures `nums[0..slow-1]` contains no elements equal to `val`, so the final result length is `slow`.

With this `removeElement` function implemented, let's look at LeetCode problem 283, "[Move Zeroes](<https://leetcode.cn/problems/move-zeroes/>)":

Given an array `nums`, **modify it in-place** to move all zeros to the end. Here's the function signature:

```python
def moveZeroes(nums: List[int]) -> None:
``` 

For example, given `nums = [0,1,4,0,2]`, your algorithm returns nothing but modifies `nums` in-place to `[1,4,2,0,0]`.

Given what we've covered so far, can you already see the solution?

A slight modification to the `removeElement` function above solves this problem, or you can just reuse `removeElement` directly.

Moving all zeros to the end is essentially removing all zeros from `nums`, then setting the remaining positions to 0:

```python
class Solution:
    def moveZeroes(self, nums):
        # remove all 0s from nums
        # return the length of the array after removing 0s
        p = self.removeElement(nums, 0)
        # set all elements after p to 0
        for i in range(p, len(nums)):
            nums[i] = 0

    # two-pointer technique, reusing the solution from [27. Remove Element].
    def removeElement(self, nums, val):
        fast, slow = 0, 0
        while fast < len(nums):
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1
        return slow
``` 

Open the visualization panel below and click the line `while (fast < nums.length)` multiple times to watch the fast and slow pointers move. Then click the line `nums[p] = 0;` multiple times to see the remaining positions set to 0:

Algorithm Visualization

That wraps up these in-place array modification problems.

### Sliding Window

Another major category of fast-slow pointer problems in arrays is the "sliding window algorithm." I've provided a code framework for sliding window in [The Core Framework for Sliding Window Algorithms](</en/algo/essential-technique/sliding-window-framework/>):

```
// Pseudocode for the sliding window algorithm framework
int left = 0, right = 0;

while (right < nums.size()) {
    // Expand the window
    window.addLast(nums[right]);
    right++;
    
    while (window needs shrink) {
        // Shrink the window
        window.removeFirst(nums[left]);
        left++;
    }
}
``` 

I won't repeat the specific problems here—instead, let me just highlight the fast-slow pointer nature of the sliding window algorithm:

The `left` pointer stays behind while the `right` pointer moves ahead. The portion between these two pointers forms the "window," and the algorithm solves problems by expanding and shrinking this window.

## II. Common Left-Right Pointer Algorithms

### Binary Search

I've covered the details of binary search code in [The Binary Search Framework Explained](</en/algo/essential-technique/binary-search-framework/>). Here, I'll just show the simplest version to highlight its two-pointer nature:

```python
def binarySearch(nums: List[int], target: int) -> int:
    # two pointers, one on the left and one on the right, move towards each other
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (right + left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        elif nums[mid] > target:
            right = mid - 1
    return -1
``` 

### `n`-Sum Problems

Let's look at LeetCode problem 167, "[Two Sum II](<https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/>)":

**167\. Two Sum II - Input Array Is Sorted** |[LeetCode](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>)

Given a **1-indexed** array of integers `numbers` that is already **_sorted in non-decreasing order_** , find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return _the indices of the two numbers,_`index1` _and_`index2` _,**added by one** as an integer array _`[index1, index2]`_of length 2._

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

**Example 1:**

```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
``` 

**Example 2:**

```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
``` 

**Example 3:**

```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
``` 

**Constraints:**

  * `2 <= numbers.length <= 3 * 104`
  * `-1000 <= numbers[i] <= 1000`
  * `numbers` is sorted in **non-decreasing order**.
  * `-1000 <= target <= 1000`
  * The tests are generated such that there is **exactly one solution**.

The problem is from [LeetCode 167. Two Sum II - Input Array Is Sorted](<https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/>).

Whenever you see a sorted array, think two pointers. The approach here is similar to binary search—by adjusting `left` and `right`, you can control the value of `sum`:

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        # one pointer on the left and one on the right moving towards each other
        left, right = 0, len(numbers) - 1
        while left < right:
            sum = numbers[left] + numbers[right]
            if sum == target:
                # the index required by the problem starts from 1
                return [left + 1, right + 1]
            elif sum < target:
                # make the sum a little bigger
                left += 1
            elif sum > target:
                # make the sum a little smaller
                right -= 1
        return [-1, -1]
``` 

In another article, [One Function to Solve All nSum Problems](</en/algo/practice-in-action/nsum/>), I use a similar left-right pointer technique to provide a general approach for `nSum` problems. At its core, it's all about the two-pointer technique.

### Reversing an Array

Most programming languages provide a `reverse` function, but the underlying principle is quite simple. LeetCode problem 344, "[Reverse String](<https://leetcode.cn/problems/reverse-string/>)," asks you to do something similar—reverse a `char[]` character array. Let's look at the code:

```python
def reverseString(s: List[str]) -> None:
    # two pointers, one on the left and one on the right, move towards each other
    left, right = 0, len(s) - 1
    while left < right:
        # swap s[left] and s[right]
        temp = s[left]
        s[left] = s[right]
        s[right] = temp    
        left += 1
        right -= 1
``` 

For more advanced problems involving array reversal, check out [Creative Ways to Traverse 2D Arrays](</en/algo/practice-in-action/2d-array-traversal-summary/>).

### Palindrome Check

A palindrome is a string that reads the same forwards and backwards. For example, `aba` and `abba` are both palindromes because they're symmetric—reverse them and you get the same thing. On the other hand, `abac` is not a palindrome.

By now, you can probably sense that palindrome problems are closely tied to left-right pointers. If you need to check whether a string is a palindrome, you might write something like this:

```python
def isPalindrome(s: str) -> bool:
    # two pointers, one on the left and one on the right, moving towards each other
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
``` 

Now let's step it up a notch. Given a string, can you use the two-pointer technique to find the longest palindrome within it?

That's LeetCode problem 5, "[Longest Palindromic Substring](<https://leetcode.cn/problems/longest-palindromic-substring/>)":

**5\. Longest Palindromic Substring** |[LeetCode](<https://leetcode.com/problems/longest-palindromic-substring/>)

Given a string `s`, return _the longest_ _palindromic_ _substring_ in `s`.

**Example 1:**

```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
``` 

**Example 2:**

```
Input: s = "cbbd"
Output: "bb"
``` 

**Constraints:**

  * `1 <= s.length <= 1000`
  * `s` consist of only digits and English letters.

The problem is from [LeetCode 5. Longest Palindromic Substring](<https://leetcode.com/problems/longest-palindromic-substring/>).

The function signature looks like this:

```python
def longestPalindrome(s: str):
``` 

The tricky part about finding palindromes is that they can have either odd or even length. The key to solving this is **using two pointers that expand outward from the center**.

If a palindrome has odd length, it has one center character. If it has even length, you can think of it as having two center characters. So let's first implement a helper function:

```python
# Find the longest palindrome in s with s[l] and s[r] as the center
def palindrome(s: str, l: int, r: int) -> str:
    # Prevent index out of bounds
    while l >= 0 and r < len(s) and s[l] == s[r]:
        # Two pointers, expand to both sides
        l -= 1
        r += 1
    # now s[l+1..r-1] is the longest palindrome string
    return s[l + 1: r]
``` 

This way, if you pass in the same value for `l` and `r`, you're looking for odd-length palindromes. If you pass in adjacent values for `l, r`, you're looking for even-length palindromes.

With that in place, here's the general approach for finding the longest palindrome:

```
for 0 <= i < len(s):
    find the palindrome centered at s[i]
    find the palindrome centered at s[i] and s[i+1]
    update the answer
``` 

Translated into code, this solves the longest palindromic substring problem:

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            # the longest palindromic substring centered at s[i]
            s1 = self.palindrome(s, i, i)
            # the longest palindromic substring centered at s[i] and s[i+1]
            s2 = self.palindrome(s, i, i + 1)
            # res = longest(res, s1, s2)
            res = res if len(res) > len(s1) else s1
            res = res if len(res) > len(s2) else s2
        return res

    def palindrome(self, s: str, l: int, r: int) -> str:
        # prevent index out of bounds
        while l >= 0 and r < len(s) and s[l] == s[r]:
            # expand to both sides
            l -= 1
            r += 1
        # now s[l+1..r-1] is the longest palindrome string
        return s[l + 1:r]
``` 

Click the visualization panel below and repeatedly click on the line `while (l >= 0 && r < s.length && s[l] === s[r])` to watch the `l, r` pointers expand outward from the center:

Algorithm Visualization

You'll notice that the left-right pointers in the longest palindromic substring problem work differently from the previous examples. Before, our left and right pointers moved inward from both ends toward the middle. For palindrome problems, the pointers expand outward from the center. That said, this pattern really only comes up with palindrome-type problems, so I still classify it under left-right pointers.

That wraps up all the two-pointer techniques for arrays. For more extensions and variations on these techniques, check out [More Classic Two-Pointer Problems for Arrays](</en/algo/problem-set/array-two-pointers/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
