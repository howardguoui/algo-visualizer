# Sliding Window Algorithm Code Template

> Source: https://labuladong.online/algo/en/essential-technique/sliding-window-framework/
> Archived: labuladong.online

---

# Sliding Window Algorithm Code Template

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[76\. Minimum Window Substring](<https://leetcode.com/problems/minimum-window-substring/>)|   
[567\. Permutation in String](<https://leetcode.com/problems/permutation-in-string/>)|   
[438\. Find All Anagrams in a String](<https://leetcode.com/problems/find-all-anagrams-in-a-string/>)|   
[3\. Longest Substring Without Repeating Characters](<https://leetcode.com/problems/longest-substring-without-repeating-characters/>)|   
  
In the previous article [Double Pointer Techniques](</en/algo/essential-technique/array-two-pointers-summary/>), we talked about some simple double pointer tricks for arrays. In this article, we will discuss a slightly more complex technique: the sliding window.

The sliding window can be seen as a fast and slow double pointer. One pointer moves fast, the other slow, and the part between them is the window. **The sliding window algorithm is mainly used to solve subarray problems, such as finding the longest or shortest subarray that meets certain conditions.**

You can open the visualization panel below. Click the line `while (right < s.length)` multiple times to see how the window moves step by step:

Algorithm Visualization

This article will give you a template that helps you write correct solutions easily. Each problem also has a visualization panel to help you better understand how the window slides.

## Sliding Window Framework Overview

If you use brute-force, you need nested for-loops to go through all subarrays. The time complexity is O(N2)O(N^2)O(N2):

```
for (int i = 0; i < nums.length; i++) {
    for (int j = i; j < nums.length; j++) {
        // nums[i, j] is a subarray
    }
}
``` 

The sliding window idea is simple: keep a window, move it step by step, and update the answer. The general logic is:

```
// The range [left, right) is the window
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

If you use this sliding window framework, the time complexity is O(N)O(N)O(N), which is much faster than the brute-force solution.

Why is it $O(N)$?

Some of you may ask, "Isn't there a nested while loop? Why is the complexity O(N)O(N)O(N)?"

Simply put, the pointers `left` and `right` never move backward. They only move forward. So, each element in the string/array is added to the window once, and removed once. No element is added or removed more than once, so the time complexity is proportional to the length of the string/array.

But in the nested for-loop brute-force solution, `j` moves backward, so some elements are counted many times. That's why its time complexity is O(N2)O(N^2)O(N2).

If you want to learn more about time and space complexity, check my article [Guide to Analyzing Algorithm Complexity](</en/algo/essential-technique/complexity-analysis/>).

Can sliding window really list all subarrays in $O(N)$ time?

Actually, this is a mistake. **Sliding window cannot list all substrings.** If you want to go through all substrings, you have to use the nested for-loops.

But for some problems, you don't need to check all substrings to find the answer. In these cases, the sliding window is a good template to make the solution faster and avoid extra calculations.

That's why in [The Essence of Algorithms](</en/algo/essential-technique/algorithm-summary/>), I put sliding window in the category of "smart enumeration".

What really confuses people are the details. For example, how to add new elements to the window, when to shrink the window, and when to update the result. Even if you know these, the code may still have bugs, and it's not easy to debug.

**So today I will give you a sliding window code template. I will even add print debug statements for you. Next time you see a related problem, just recall this template and change three places. This will help you avoid bugs.**

Since most examples in this article are substring problems, and a string is just an array, the input will be a string. When you solve problems, adapt as needed:

```python
# Pseudocode framework for sliding window algorithm
def slidingWindow(s: str):
    # Use an appropriate data structure to record the data in
    # the window, which can vary depending on the scenario
    # For example, if I want to record the frequency
    # of elements in the window, I would use a map
    # If I want to record the sum of elements in the window, I could just use an int
    window = ...

    left, right = 0, 0
    while right < len(s):
        # c is the character that will be added to the window
        c = s[right]
        window.add(c)
        # Expand the window
        right += 1
        # Perform a series of updates on the data within the window
        ...

        # *** position for debug output ***
        # Note that you should not print in the final solution code
        # because IO operations are time-consuming and may cause timeouts
        # print(f"window: [{left}, {right})")
        # ***********************

        # Determine whether the left side of the window needs to be contracted
        while left < right and window needs shrink:
            # d is the character that will be removed from the window
            d = s[left]
            window.remove(d)
            # Shrink the window
            left += 1
            # Perform a series of updates on the data within the window
            ...
``` 

**There are two places in the template marked with`...`. These are where you update the data for the window. In a real problem, just fill in your logic here. These two places are for expanding and shrinking the window, and you will see that their logic is almost the same, just opposite.**

With this template, if you get a substring or subarray problem, just answer these three questions:

  1. When should you move `right` to expand the window? What data should you update when adding a character to the window?

  2. When should you stop expanding and start moving `left` to shrink the window? What data should you update when removing a character from the window?

  3. When should you update the result?

If you can answer these questions, you can use the sliding window technique for the problem.

Next, we'll use this template to solve four LeetCode problems. For the first problem, I will explain the ideas in detail. For the others, just use the template and solve them quickly.

## 1\. Minimum Window Substring

Let's look at LeetCode problem 76: ["Minimum Window Substring"](<https://leetcode.com/problems/minimum-window-substring/>) (Hard):

**76\. Minimum Window Substring** |[LeetCode](<https://leetcode.com/problems/minimum-window-substring/>)

Given two strings `s` and `t` of lengths `m` and `n` respectively, return _the**minimum window**_ **_substring_** _of_`s` _such that every character in_`t` _(**including duplicates**) is included in the window_. If there is no such substring, return _the empty string_`""`.

The testcases will be generated such that the answer is **unique**.

**Example 1:**

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
``` 

**Example 2:**

```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
``` 

**Example 3:**

```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
``` 

**Constraints:**

  * `m == s.length`
  * `n == t.length`
  * `1 <= m, n <= 105`
  * `s` and `t` consist of uppercase and lowercase English letters.

**Follow up:** Could you find an algorithm that runs in `O(m + n)` time?

The problem is from [LeetCode 76. Minimum Window Substring](<https://leetcode.com/problems/minimum-window-substring/>).

You need to find a substring in `S` (source) that contains all the letters from `T` (target), and this substring must be the shortest one among all possible substrings.

If we use a brute-force solution, the code looks like this:

```
for (int i = 0; i < s.length(); i++)
    for (int j = i + 1; j < s.length(); j++)
        if s[i:j] contains all letters in t:
            update answer
``` 

This idea is simple, but the time complexity is definitely more than O(N2)O(N^2)O(N2), which is not good.

**The sliding window algorithm works like this:**

  1. We use two pointers, left and right, to define a window in string `S`. Initialize `left = right = 0`. The range `[left, right)` is a **left-closed, right-open** window.

Why use "left-closed, right-open" interval?

**In theory, you can use any kind of interval, but using left-closed, right-open is the most convenient.**

When you set `left = right = 0`, the interval `[0, 0)` has no elements. But if you move `right` one step, `[0, 1)` now contains element `0`.

If you use both ends open, moving `right` to `(0, 1)` still has no element. If you use both ends closed, `[0, 0]` already contains one element at the start. These two cases will make boundary handling harder.

  2. First, keep moving the `right` pointer to expand the window `[left, right)`, until the window contains all the characters in `T`.

  3. Then, stop moving `right`, and start moving `left` to shrink the window `[left, right)`, until the window no longer contains all characters in `T`. Each time you move `left`, update the answer.

  4. Repeat steps 2 and 3 until `right` reaches the end of string `S`.

This idea is not hard. **Step 2 is to find a "valid solution"; step 3 is to optimize this "valid solution" to find the optimal answer, which is the shortest substring.** The left and right pointers move back and forth, making the window grow and shrink, just like a caterpillar moving along—this is why it's called a "sliding window."

Let's use some pictures for understanding. `needs` and `window` are like counters. `needs` records the count of each character in `T`, and `window` records the count of each character in the current window.

Initial state:

![diagram](https://labuladong.online/images/algo/slidingwindow/1-en.png)

Move `right` until the window `[left, right)` contains all characters in `T`:

![diagram](https://labuladong.online/images/algo/slidingwindow/2-en.png)

Now move `left` to shrink the window `[left, right)`:

![diagram](https://labuladong.online/images/algo/slidingwindow/3-en.png)

Stop moving `left` when the window no longer meets the requirement:

![diagram](https://labuladong.online/images/algo/slidingwindow/4-en.png)

Then repeat: move `right`, then move `left`... until `right` reaches the end of `S`. The algorithm ends.

If you understand this process, congratulations, you have mastered the sliding window algorithm. **Now let's look at the sliding window code template:**

First, initialize two hash maps, `window` and `need`, to record the characters in the window and the characters you need:

```
// Count of characters in window
HashMap<Character, Integer> window = new HashMap<>();
// Count of required characters
HashMap<Character, Integer> need = new HashMap<>();
for (int i = 0; i < t.length(); i++) {
    char c = t.charAt(i);
    need.put(c, need.getOrDefault(c, 0) + 1);
}
``` 

Then, use `left` and `right` as the two ends of the window. Remember, `[left, right)` is left-closed, right-open, so at the start the window is empty:

```
int left = 0, right = 0;
int valid = 0;
while (right < s.length()) {
    // c is the character going into the window
    char c = s.charAt(right);
    // Move right to expand window
    right++;
    // Update data inside the window
    ...
}
``` 

**The`valid` variable counts how many characters in the window meet the `need` requirement.** If `valid` equals `need.size()`, the window is valid and covers all characters in `T`.

**Now, using this template, just think about these questions:**

  1. When should you move `right` to expand the window? When you add a character to the window, what should you update?

  2. When should you stop expanding and start moving `left` to shrink the window? When you remove a character, what should you update?

  3. Should you update the result when expanding or shrinking the window?

If a character enters the window, increase its count in `window`. If a character leaves, decrease its count. When `valid` meets the requirement, start shrinking the window. Update the answer when shrinking.

Here is the complete code:

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need, window = {}, {}
        for c in t:
            need[c] = need.get(c, 0) + 1

        left = 0
        right = 0
        valid = 0
        # record the start index and length of the minimum covering substring
        start = 0
        length = float('inf')
        while right < len(s):
            # c is the character that will be added to the window
            c = s[right]
            # expand the window
            right += 1
            # perform a series of updates to the data within the window
            if c in need:
                window[c] = window.get(c, 0) + 1
                if window[c] == need[c]:
                    valid += 1

            # determine whether the left side of the window needs to be contracted
            while valid == len(need): 
                # update the minimum covering substring here
                if right - left < length:
                    start = left
                    length = right - left
                # d is the character that will be removed from the window
                d = s[left]
                # shrink the window
                left += 1
                # perform a series of updates to the data within the window
                if d in need:
                    if window[d] == need[d]:
                        valid -= 1
                    window[d] -= 1

        # return the minimum covering substring
        return "" if length == float('inf') else s[start: start + length]
``` 

You can open the panel below and click the line `while (right < s.length)` several times to see how the sliding window `[left, right)` moves:

Algorithm Visualization

Note for Java users

Be careful when comparing Java wrapper classes like `Integer` and `String`. You should use the `equals` method instead of `==`, or you may get errors. For example, don't write `window.get(d) == need.get(d)`, but use `window.get(d).equals(need.get(d))`. This applies to the following problems as well.

In the code above, when a character's count in `window` meets the need in `need`, update `valid` to show that one more character meets the requirement. Notice that the updates for adding and removing characters are symmetric.

When `valid == need.size()`, all characters in `T` are included, and you have a valid window. Now you should start shrinking the window to try to find the smallest one.

When moving `left` to shrink the window, every window is a valid answer, so update the result during the shrinking phase to find the shortest one.

Now you should fully understand this template. The sliding window algorithm is not hard, just some details to be careful with. **Whenever you see a sliding window problem, use this template and your code will be bug-free and easy to write.**

Let's use this template to quickly solve a few more problems. Once you see the description, you will know what to do.

## 2\. Permutation in String

This is LeetCode Problem 567 "[Permutation in String](<https://leetcode.com/problems/permutation-in-string/>)", medium level:

**567\. Permutation in String** |[LeetCode](<https://leetcode.com/problems/permutation-in-string/>)

Given two strings `s1` and `s2`, return `true` _if_`s2` _contains a permutation of_`s1` _, or_`false` _otherwise_.

In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

**Example 1:**

```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
``` 

**Example 2:**

```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
``` 

**Constraints:**

  * `1 <= s1.length, s2.length <= 104`
  * `s1` and `s2` consist of lowercase English letters.

The problem is from [LeetCode 567. Permutation in String](<https://leetcode.com/problems/permutation-in-string/>).

Note that the input `s1` can contain duplicate characters, so this problem is not easy.

This is a typical sliding window problem. Basically, you are given a string `S` and a string `T`. You need to check if there is a substring in `S` with the same length as `T`, and that substring contains all characters in `T`.

First, copy and paste the sliding window template code. Then, just make a few changes to answer the questions mentioned earlier, and you can solve this problem:

```python
class Solution:
    # determine if there is a permutation of t in s
    def checkInclusion(self, t: str, s: str) -> bool:
        need = {}
        window = {}
        for c in t:
            need[c] = need.get(c, 0) + 1

        left = 0
        right = 0
        valid = 0
        while right < len(s):
            c = s[right]
            right += 1
            # update the data inside the window
            if c in need:
                window[c] = window.get(c, 0) + 1
                if window[c] == need[c]:
                    valid += 1

            # check if the left side of the window needs to shrink
            while right - left >= len(t):
                # check here if a valid substring is found
                if valid == len(need):
                    return True
                d = s[left]
                left += 1
                # update the data inside the window
                if d in need:
                    if window[d] == need[d]:
                        valid -= 1
                    window[d] -= 1

        # no valid substring found
        return False
``` 

You can open the visual panel below and click the line `while (right < s.length)` multiple times to see how the fixed-length window slides:

Algorithm Visualization

The code for this problem is almost the same as the code for the minimum window substring. You only need to change a few things:

  1. In this problem, you move `left` to shrink the window when the window size is greater than `t.length()`. Since we are looking for a permutation, the lengths must be the same.

  2. When you find `valid == need.size()`, it means the window is a valid permutation, so return `true` right away.

How to move the window is the same as the minimum window substring problem.

Small Optimization

In this problem, the window `[left, right)` is always a fixed size, which is `t.length()`. Each time the window moves, only one character leaves the window. So you can change the inner while loop to an if statement, and it will work the same.

## 3\. Find All Anagrams in a String

This is LeetCode Problem 438 "[Find All Anagrams in a String](<https://leetcode.com/problems/find-all-anagrams-in-a-string/>)", medium level:

**438\. Find All Anagrams in a String** |[LeetCode](<https://leetcode.com/problems/find-all-anagrams-in-a-string/>)

Given two strings `s` and `p`, return _an array of all the start indices of_`p` _'s anagrams in_`s`. You may return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
``` 

**Example 2:**

```
Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
``` 

**Constraints:**

  * `1 <= s.length, p.length <= 3 * 104`
  * `s` and `p` consist of lowercase English letters.

The problem is from [LeetCode 438. Find All Anagrams in a String](<https://leetcode.com/problems/find-all-anagrams-in-a-string/>).

An anagram is just a permutation. The problem gives it a fancy name, but it is the same. You are given a string `S` and a string `T`. Find all the starting indexes of `T`'s permutations in `S`.

Just copy the sliding window framework, answer the three key questions, and you can solve this problem:

```python
class Solution:
    def findAnagrams(self, s: str, t: str) -> list[int]:
        need = {}
        window = {}
        for c in t:
            need[c] = need.get(c, 0) + 1

        left = 0
        right = 0
        valid = 0
        # record the result
        res = []
        while right < len(s):
            c = s[right]
            right += 1
            # update various data within the window
            if c in need:
                window[c] = window.get(c, 0) + 1
                if window[c] == need[c]:
                    valid += 1
            # check if the left side of the window needs to shrink
            while right - left >= len(t):
                # when the window meets the condition, add the starting index to res
                if valid == len(need):
                    res.append(left)
                d = s[left]
                left += 1
                # update various data within the window
                if d in need:
                    if window[d] == need[d]:
                        valid -= 1
                    window[d] -= 1
        return res
``` 

This is almost the same as the previous problem. When you find a valid anagram (permutation), just save the starting index in `res`.

You can open the visual panel below and click the line `while (right < s.length)` multiple times to see how the fixed-length window slides:

Algorithm Visualization

## 4\. Longest Substring Without Repeating Characters

This is LeetCode Problem 3 "[Longest Substring Without Repeating Characters](<https://leetcode.com/problems/longest-substring-without-repeating-characters/>)", medium level:

**3\. Longest Substring Without Repeating Characters** |[LeetCode](<https://leetcode.com/problems/longest-substring-without-repeating-characters/>)

Given a string `s`, find the length of the **longest** **substring** without repeating characters.

**Example 1:**

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
``` 

**Example 2:**

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
``` 

**Example 3:**

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
``` 

**Constraints:**

  * `0 <= s.length <= 5 * 104`
  * `s` consists of English letters, digits, symbols and spaces.

The problem is from [LeetCode 3. Longest Substring Without Repeating Characters](<https://leetcode.com/problems/longest-substring-without-repeating-characters/>).

This problem is a bit different. You cannot use the same template directly, but it is actually simpler. Just make a small change:

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        window = {}
        
        left = 0
        right = 0
        # record the result
        res = 0
        while right < len(s):
            c = s[right]
            right += 1
            # perform a series of updates within the window
            window[c] = window.get(c, 0) + 1
            # determine whether the left side of the window needs to shrink
            while window[c] > 1:
                d = s[left]
                left += 1
                # perform a series of updates within the window
                window[d] = window.get(d, 0) - 1
            # update the result here
            res = max(res, right - left)
        return res
``` 

You can open the visual panel below and click the line `while (right < s.length)` multiple times to see how the window updates the answer:

Algorithm Visualization

This problem is simpler. You do not need `need` and `valid`. You only need to update the character count in the `window`.

If `window[c]` is greater than 1, it means there are repeated characters in the window. Then you need to move `left` to shrink the window.

One thing to pay attention to is: when should you update the result `res`? We want the longest substring without repeating characters. At which moment does the window have no repeated characters?

This is different from before. You should update `res` after shrinking the window. The while loop for shrinking only runs when there are repeated characters. After shrinking, the window must have no repeated characters.

That is all for the sliding window algorithm template. I hope you can understand the logic, remember the template, and apply it. To review, when you face a problem about subarrays or substrings, if you can answer these three questions, you can use the sliding window algorithm:

  1. When should you expand the window?

  2. When should you shrink the window?

  3. When should you update the answer?

In [Sliding Window Exercise Collection](</en/algo/problem-set/sliding-window/>), I list more classic problems using this way of thinking, to help you understand and remember the algorithm. After that, you will not be afraid of substring or subarray problems.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
