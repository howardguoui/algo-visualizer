# Classic DP: Regular Expression Matching

> Source: https://labuladong.online/algo/en/dynamic-programming/regular-expression-matching/
> Archived: labuladong.online

---

# Classic DP: Regular Expression Matching

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[10\. Regular Expression Matching](<https://leetcode.com/problems/regular-expression-matching/>)|   
  
Prerequisite Knowledge

Before reading this article, you need to study:

  * [Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)
  * [Classic Dynamic Programming: Edit Distance](</en/algo/dynamic-programming/edit-distance/>)

Regular expressions are a very powerful tool. In this article, we will look at the basic idea behind regular expressions. LeetCode problem 10: [Regular Expression Matching](<https://leetcode.com/problems/regular-expression-matching/>) asks us to implement a simple regular matching algorithm, including the "." wildcard and the "*" wildcard.

These two wildcards are used most often. The dot "." can match any single character. The star "*" means the character before it can repeat any number of times (including 0 times).

For example, the pattern `".a*b"` can match the text `"zaaab"` or `"cb"`. The pattern `"a..b"` matches `"amnb"`. The pattern `".*"` can match any text.

The problem gives us two strings `s` and `p`. `s` is the text, and `p` is the pattern. You need to check if the pattern `p` can match the text `s`. You can assume the pattern only contains lowercase letters and the two wildcards above. The pattern will always be valid; there won't be cases like `*a` or `b**`.

The function signature is as follows:

```python
def isMatch(s: str, p: str) -> bool:
``` 

What is the hard part of this regular expression we need to implement?

The dot wildcard is easy. Any character in `s` can match a `.` in the pattern. The tricky part is the star wildcard. When you see "*", the character before it can be used any number of times: repeated once, many times, or not at all. What should we do?

The answer is simple: try all possible cases. If any case matches, then `p` matches `s`. Whenever we need to try all cases for two strings, we should think about using dynamic programming.

## 1\. Idea Analysis

Let’s think about how `s` and `p` match. We use two pointers `i` and `j` to move along `s` and `p`. If both pointers reach the end, it means the match is successful. Otherwise, the match fails.

**If we ignore the "*" wildcard, when matching characters`s[i]` and `p[j]`, all we need to do is check if they match:**

```python
def isMatch(s: str, p: str) -> bool:
    i, j = 0, 0
    while i < len(s) and j < len(p):
        # the '.' wildcard is versatile
        if s[i] == p[j] or p[j] == '.':
            # match, then continue to match s[i+1..] and p[j+1..]
            i += 1
            j += 1
        else:
            # not a match
            return False
    return i == j
``` 

Now, if we add the "*" wildcard, things get a bit more complex, but we just need to consider each case separately.

**When`p[j + 1]` is "*", let’s look at the cases:**

  1. If `s[i] == p[j]`, there are two possibilities:

1.1 `p[j]` might match multiple characters. For example, `s = "aaa", p = "a*"`, then `p[0]` matches all three `"a"`.

1.2 `p[j]` might match 0 characters. For example, `s = "aa", p = "a*aa"`. Since the rest of the pattern can match `s`, `p[0]` can match 0 times.

  2. If `s[i] != p[j]`, there is only one case:

`p[j]` can only match 0 times, and we see if the next part can match `s[i]`. For example, `s = "aa", p = "b*aa"`, `p[0]` can only match 0 times.

So, we can update the code for the "*" wildcard as follows:

```python
if s[i] == p[j] or p[j] == '.':
    # match
    if j < len(p) - 1 and p[j + 1] == '*':
        # there is a * wildcard, which can match 0 times or multiple times
        pass
    else:
        # no * wildcard, match exactly 1 time
        i += 1
        j += 1
else:
    # not a match
    if j < len(p) - 1 and p[j + 1] == '*':
        # there is a * wildcard, can only match 0 times
        pass
    else:
        # no * wildcard, the match cannot proceed
        return False
``` 

The idea is clear. But when we see the "*" wildcard, should we match 0 times or more? How many times?

This is a "choice" problem. We need to try all possible choices to get the answer. The core of dynamic programming is "state" and "choice". **The "state" is the position of the two pointers`i` and `j`. The "choice" is how many times `p[j]` matches a character.**

## 2\. Dynamic Programming Solution

Based on the "state", we can define a `dp` function:

```
boolean dp(String s, int i, String p, int j);
``` 

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
