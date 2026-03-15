# Tricks to Traverse a 2D Array

> Source: https://labuladong.online/algo/en/practice-in-action/2d-array-traversal-summary/
> Archived: labuladong.online

---

# Tricks to Traverse a 2D Array

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[48\. Rotate Image](<https://leetcode.com/problems/rotate-image/>)|   
[151\. Reverse Words in a String](<https://leetcode.com/problems/reverse-words-in-a-string/>)|   
[61\. Rotate List](<https://leetcode.com/problems/rotate-list/>)|   
[54\. Spiral Matrix](<https://leetcode.com/problems/spiral-matrix/>)|   
[59\. Spiral Matrix II](<https://leetcode.com/problems/spiral-matrix-ii/>)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Array Basics](</en/algo/data-structure-basic/array-basic/>)

Some readers say that after reading many articles on this site, they learned “framework thinking” and can solve most problems that follow a fixed pattern.

But framework thinking is not magic. Some special tricks are like this: if you know them, they are easy; if you don’t, they feel very hard. You can only learn them by doing more problems and summarizing.

In this article, I will share some smart operations on 2D arrays. Just remember the idea. Next time you see a similar problem, you won’t get stuck.

## Rotate a Matrix Clockwise / Counterclockwise

Rotating a 2D array is a common interview test question. LeetCode 48, “[Rotate Image](<https://leetcode.com/problems/rotate-image/>)”, is a classic one:

**48\. Rotate Image** |[LeetCode](<https://leetcode.com/problems/rotate-image/>)

You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image [**in-place**](<https://en.wikipedia.org/wiki/In-place_algorithm>), which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/28/mat1.jpg)

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
``` 

**Example 2:**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/28/mat2.jpg)

```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
``` 

**Constraints:**

  * `n == matrix.length == matrix[i].length`
  * `1 <= n <= 20`
  * `-1000 <= matrix[i][j] <= 1000`

The problem is from [LeetCode 48. Rotate Image](<https://leetcode.com/problems/rotate-image/>).

The problem is easy to understand: rotate a 2D matrix 90 degrees clockwise. The hard part is: **you must modify it in-place**. The function signature is:

```python
def rotate(matrix: List[List[int]]) -> None:
``` 

How do we rotate a 2D matrix in-place? If you think a bit, it feels complicated. You may think you need to rotate it “layer by layer”:

![diagram](https://labuladong.online/images/algo/2d-array/1.png)

**But for this problem, you need a different idea.** Before we talk about the smart solution, let’s warm up with another problem that Google once asked:

You are given a string `s` with words and spaces. Write an algorithm to reverse the order of words **in-place**.

For example:

```
s = "hello world labuladong"
``` 

You need to make it:

```
s = "labuladong world hello"
``` 

A common way is: split by spaces, reverse the word list, then join. But that uses extra space, so it is not “in-place”.

**The correct trick is: first reverse the whole string`s`:**

```
s = "gnodalubal dlrow olleh"
``` 

**Then reverse each word by itself:**

```
s = "labuladong world hello"
``` 

Now you reversed the word order in-place. LeetCode 151, “[Reverse Words in a String](<https://leetcode.com/problems/reverse-words-in-a-string/>)”, is a similar problem.

This trick can be used in other problems too. For example, LeetCode 61, “[Rotate List](<https://leetcode.com/problems/rotate-list/>)”: given a singly linked list, rotate it so every node moves right by `k` positions.

Example: `1 -> 2 -> 3 -> 4 -> 5`, `k = 2`. The result is `4 -> 5 -> 1 -> 2 -> 3`.

For this problem, don’t move nodes one by one. Let me translate it: it really means “move the last `k` nodes to the head”, right?

Still not clear? Moving the last `k` nodes to the head means you split the list into the first `n - k` nodes and the last `k` nodes, then reverse them in-place, right?

This is the same idea as reversing words in-place. You first reverse the whole list, then reverse the first `n - k` nodes and the last `k` nodes.

There are some details. For example, `k` can be larger than the list length. So you should compute the length `n` first, then do `k = k % n`. Then `k` will be valid and the result will be correct.

If you have time, try this problem yourself. It is not hard, so I won’t show the code here.

Why did I talk about these two problems?

**The point is: our “natural” idea is not always the best for a computer; and the computer’s clean idea is not always natural for us.** That may be the fun part of algorithms.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
