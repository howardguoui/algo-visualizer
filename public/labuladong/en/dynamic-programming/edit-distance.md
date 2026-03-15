# Classic DP: Edit Distance

> Source: https://labuladong.online/algo/en/dynamic-programming/edit-distance/
> Archived: labuladong.online

---

# Classic DP: Edit Distance

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[72\. Edit Distance](<https://leetcode.com/problems/edit-distance/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Binary Tree Algorithms (Overview)](</en/algo/essential-technique/binary-tree-summary/>)
  * [Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)

A few days ago, I saw an interview question from Tencent. Most of the algorithm section was about dynamic programming, and the last question was to write a function to calculate the edit distance. Today, I will write a dedicated article to discuss this problem.

LeetCode Problem 72 "[Edit Distance](<https://leetcode.com/problems/edit-distance/>)" is exactly about this topic. Let's look at the problem first:

**72\. Edit Distance** |[LeetCode](<https://leetcode.com/problems/edit-distance/>)

Given two strings `word1` and `word2`, return _the minimum number of operations required to convert`word1` to `word2`_.

You have the following three operations permitted on a word:

  * Insert a character
  * Delete a character
  * Replace a character

**Example 1:**

```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
``` 

**Example 2:**

```
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
``` 

**Constraints:**

  * `0 <= word1.length, word2.length <= 500`
  * `word1` and `word2` consist of lowercase English letters.

The problem is from [LeetCode 72. Edit Distance](<https://leetcode.com/problems/edit-distance/>).

```python
# The function signature is as follows
def minDistance(s1: str, s2: str) -> int:
``` 

For readers who have not encountered dynamic programming problems before, this question can be quite challenging. Does it feel like you don't know where to begin?

However, this problem is actually very practical. I have used this algorithm in real life. In the past, I wrote a public article and accidentally misplaced a section of content. I decided to fix this part to make the logic clear. But the platform only allows you to edit up to 20 characters, supporting only insert, delete, and replace operations (exactly like the edit distance problem). So, I used the algorithm to find the optimal solution and completed the modification in just 16 steps.

Another more advanced application is in DNA sequences, which are composed of A, G, C, T and can be viewed as strings. Edit distance can measure the similarity between two DNA sequences. The smaller the edit distance, the more similar the two DNA strands are. It's possible that the owners of those DNAs are ancient relatives.

Now, let's get back to the main topic and explain in detail how to calculate the edit distance. I believe this article will be helpful to you.

## I. Approach

The edit distance problem gives you two strings `s1` and `s2`. Using only three operations, you need to transform `s1` into `s2` with the minimum number of operations. Note that whether you transform `s1` into `s2` or vice versa, the result is the same. So throughout this article, we'll use transforming `s1` into `s2` as our example.

Pro Tip

When solving dynamic programming problems involving two strings, you typically use two pointers `i` and `j` pointing to either the beginning or end of both strings, then work out the state transition equation.

For example, let `i` and `j` point to the end of both strings, and define `dp[i], dp[j]` as the edit distance between substrings `s1[0..i]` and `s2[0..j]`. As `i` and `j` move forward step by step, the problem size (substring length) gradually decreases.

Of course, you could also have `i` and `j` start at the beginning and move backward—there's no fundamental difference. You just need to adjust the definition of your `dp` function/array accordingly.

Let's say the two strings are `"rad"` and `"apple"`. Have pointers `i` and `j` point to the end of `s1` and `s2` respectively. To transform `s1` into `s2`, the algorithm proceeds like this:

![diagram](https://labuladong.online/images/algo/editDistance/edit.gif)

![diagram](https://labuladong.online/images/algo/editDistance/1-en.jpg)

Remember this GIF—it shows how to compute the edit distance. The key is knowing how to make the right operation at each step, which we'll explain shortly.

From the GIF above, you'll notice there aren't just three operations—there's actually a fourth: do nothing (skip). For example, in this situation:

![diagram](https://labuladong.online/images/algo/editDistance/2.jpg)

Since these two characters are already the same, to minimize edit distance, you obviously shouldn't perform any operation on them. Just move both `i` and `j` forward.

There's another easy case to handle: when `j` finishes traversing `s2` but `i` hasn't finished `s1`, you can only use delete operations to shorten `s1` to match `s2`. Like this:

![diagram](https://labuladong.online/images/algo/editDistance/3-en.jpg)

Similarly, if `i` finishes `s1` while `j` still has characters left in `s2`, you can only use insert operations to add all remaining characters from `s2` into `s1`. As you'll see, these two situations are the algorithm's **base cases**.

Now let's dive into how to convert this thinking into code.

## 2\. Detailed Code Explanation

Let's first review the previous approach:

The base case occurs when `i` traverses through `s1` or `j` through `s2`, at which point you can directly return the remaining length of the other string.

For each pair of characters `s1[i]` and `s2[j]`, there are four possible operations:

```
if s1[i] == s2[j]:
    Do nothing (skip)
    Move both i and j forward
else:
    Choose one of three:
        Insert
        Delete
        Replace
``` 

With this framework, the problem is essentially solved. Readers might ask, how exactly should we choose among the "three options"? It's simple: try all of them, and choose the one that results in the minimum edit distance. Here, recursion is necessary. Let's first look at the brute-force solution code:

```python
class Solution:
    def minDistance(self, s1: str, s2: str) -> int:
        m = len(s1)
        n = len(s2)
        # initialize i and j to point to the last index
        return self.dp(s1, m - 1, s2, n - 1)

    # definition: return the minimum edit distance between s1[0..i] and s2[0..j]
    def dp(self, s1: str, i: int, s2: str, j: int) -> int:
        # base case
        if i == -1:
            return j + 1
        if j == -1:
            return i + 1

        if s1[i] == s2[j]:
            # do nothing
            return self.dp(s1, i - 1, s2, j - 1)

        return min(
            # insert
            self.dp(s1, i, s2, j - 1) + 1,
            # delete
            self.dp(s1, i - 1, s2, j) + 1,
            # replace
            self.dp(s1, i - 1, s2, j - 1) + 1
        )
``` 

Now, let's explain this recursive code in detail. The base case should be self-explanatory, so let's focus on the recursive part.

It's often said that recursive code is highly interpretable, and there is a reason for that. As long as you understand the function's definition, you can clearly understand the algorithm's logic. Here, the `dp` function is defined as follows:

```python
# Definition: Return the minimum edit distance between s1[0..i] and s2[0..j]
def dp(s1: str, i: int, s2: str, j: int):
``` 

**Remember this definition** , then let's look at this code:

```
if s1[i] == s2[j]:
    # Do nothing
    return dp(s1, i - 1, s2, j - 1)
# Explanation:
# They are already equal, no operation needed
# The minimum edit distance between s1[0..i] and s2[0..j] equals
# the minimum edit distance between s1[0..i-1] and s2[0..j-1]
# In other words, dp(i, j) equals dp(i-1, j-1)
``` 

If `s1[i] != s2[j]`, three operations need to be considered recursively, requiring some thought:

```
# Insert
dp(s1, i, s2, j - 1) + 1,
# Explanation:
# Insert a character identical to s2[j] after s1[i]
# This matches s2[j], move j forward, continue comparing with i
# Don't forget to add one to the operation count
``` 

![diagram](https://labuladong.online/images/algo/editDistance/insert.gif)

```
# Delete
dp(s1, i - 1, s2, j) + 1,
# Explanation:
# Delete the character s[i]
# The minimum edit distance between s1[0..i-1] and s2[0..j] equals
# Move i forward, continue comparing with j
# Add one to the operation count
``` 

![diagram](https://labuladong.online/images/algo/editDistance/delete.gif)

```
# Replace
dp(s1, i - 1, s2, j - 1) + 1
# Explanation:
# Replace s1[i] with s2[j], making them match
# Move both i and j forward, continue comparison
# Add one to the operation count
``` 

![diagram](https://labuladong.online/images/algo/editDistance/replace.gif)

Now, you should fully understand this concise code. A minor issue is that this solution is a brute-force method, with overlapping subproblems that require dynamic programming techniques for optimization.

**How to identify overlapping subproblems at a glance?** I have discussed this in [Dynamic Programming Q&A](</en/algo/dynamic-programming/faq-summary/>). To briefly mention, it is necessary to abstract the recursive framework of this algorithm:

```
int dp(i, j) {
    dp(i - 1, j - 1); // #1
    dp(i, j - 1);     // #2
    dp(i - 1, j);     // #3
}
``` 

For the subproblem `dp(i-1, j-1)`, how can it be derived from the original problem `dp(i, j)`? There is more than one path, such as `dp(i, j) -> #1` and `dp(i, j) -> #2 -> #3`. Once a duplicate path is found, it indicates a significant number of duplicate paths, meaning overlapping subproblems exist.

## 3\. Dynamic Programming Optimization

For overlapping subproblems, as covered in detail in [Dynamic Programming Explained](</en/algo/essential-technique/dynamic-programming-framework/>), optimization methods boil down to either adding memoization to the recursive solution, or implementing the dynamic programming process iteratively with a DP table. Let's cover each approach.

### Memoization Solution

Since we already have the brute-force recursive solution, adding memoization is straightforward. Just modify the original code slightly:

```python
class Solution:
    def __init__(self):
        self.memo = []

    def minDistance(self, s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        # Initialize the memoization table with a special value,
        # indicating that it has not been calculated yet
        self.memo = [[-1] * n for _ in range(m)]
        return self.dp(s1, m - 1, s2, n - 1)

    def dp(self, s1: str, i: int, s2: str, j: int) -> int:
        if i == -1:
            return j + 1
        if j == -1:
            return i + 1

        # Check the memoization table to avoid overlapping subproblems
        if self.memo[i][j] != -1:
            return self.memo[i][j]

        # State transition, store the result in the memoization table
        if s1[i] == s2[j]:
            self.memo[i][j] = self.dp(s1, i - 1, s2, j - 1)
        else:
            self.memo[i][j] = min(
                self.dp(s1, i, s2, j - 1) + 1,
                self.dp(s1, i - 1, s2, j) + 1,
                self.dp(s1, i - 1, s2, j - 1) + 1
            )

        return self.memo[i][j]
``` 

### DP Table Solution

Let's focus on the DP table approach. We need to define a `dp` array and execute the state transition equation on it.

First, clarify what the `dp` array represents. Since this problem has two states (indices `i` and `j`), the `dp` array is two-dimensional, looking something like this:

![diagram](https://labuladong.online/images/algo/editDistance/dp.jpg)

The state transition is the same as the recursive solution. `dp[..][0]` and `dp[0][..]` correspond to the base case. The meaning of `dp[i][j]` is similar to our earlier `dp` function definition:

```
int dp(String s1, int i, String s2, int j)
// returns the minimum edit distance between s1[0..i] and s2[0..j]

dp[i+1][j+1]
// stores the minimum edit distance between s1[0..i] and s2[0..j]
``` 

The base case for the `dp` function is when `i, j` equals -1, but array indices must be at least 0, so the `dp` array is offset by one.

Since the `dp` array has the same meaning as the recursive `dp` function, you can directly apply the same logic to write the code. **The only difference is that the recursive solution works top-down (starting from the original problem and breaking it down to the base case), while the DP table works bottom-up (starting from the base case and building up to the original problem)** :

```python
class Solution:
    def minDistance(self, s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        # base case
        for i in range(1, m + 1):
            dp[i][0] = i
        for j in range(1, n + 1):
            dp[0][j] = j
        # bottom-up calculation
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(
                        dp[i - 1][j] + 1, 
                        dp[i][j - 1] + 1, 
                        dp[i - 1][j - 1] + 1
                    )
        # stores the minimum edit distance between s1 and s2
        return dp[m][n]
``` 

Algorithm Visualization

## IV. Further Exploration

Generally, when dealing with dynamic programming problems involving two strings, the approach outlined in this article is used to establish a DP table. Why? Because it's easier to identify the state transitions, for example, the DP table for edit distance:

![diagram](https://labuladong.online/images/algo/editDistance/4-en.jpg)

There's another detail: since each `dp[i][j]` is only related to the three nearby states, the space complexity can be reduced to O(min(M,N))O(min(M, N))O(min(M,N)) (where M and N are the lengths of the two strings). This is not difficult, but it greatly reduces interpretability, so readers can try optimizing it themselves.

You might also ask, **this only finds the minimum edit distance, but what are the specific operations?** In the example of modifying a WeChat public account article you gave, just knowing the minimum edit distance is not enough; you also need to know the specific modifications.

This is actually quite simple. With slight modifications to the code, additional information can be added to the dp array:

```python
class Node:
    val: int
    choice: int
    # 0 represents doing nothing
    # 1 represents insertion
    # 2 represents deletion
    # 3 represents replacement

dp: List[List[Node]] = []
``` 

The `val` attribute represents the previous value of the dp array, and the `choice` attribute represents the operation. When making the optimal choice, record the operation at the same time, and then backtrack from the result to get the specific operations.

Our final result is `dp[m][n]`, where `val` stores the minimum edit distance and `choice` stores the last operation, for example, an insertion operation, allowing you to move left one step:

![diagram](https://labuladong.online/images/algo/editDistance/5-en.jpg)

By repeating this process, you can step back to the starting point `dp[0][0]`, forming a path. Following the operations on this path for editing provides the optimal solution.

![diagram](https://labuladong.online/images/algo/editDistance/6-en.jpg)

At everyone's request, I have written this approach as well, and you can try running it yourself:

```python
def minDistance(self, s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[Node() for _ in range(n + 1)] for _ in range(m + 1)]
    # base case
    for i in range(m + 1):
        # converting s1 to s2 requires only deleting one character
        dp[i][0] = Node(i, 2)
    for j in range(1, n + 1):
        # converting s1 to s2 requires only inserting one character
        dp[0][j] = Node(j, 1)
    # state transition equation
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                # if the two characters are the same, nothing needs to be done
                node = dp[i - 1][j - 1]
                dp[i][j] = Node(node.val, 0)
            else:
                # otherwise, record the operation with the minimum cost
                dp[i][j] = self.minNode(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i-1][j-1]
                )
                # and increment the edit distance by one
                dp[i][j].val += 1
    # deduce the specific operation process based on the dp table and print it
    self.printResult(dp, s1, s2)
    return dp[m][n].val

# calculate the operation with the minimum cost among delete, insert, replace
def minNode(self, a: Node, b: Node, c: Node) -> Node:
    res = Node(a.val, 2)
    
    if res.val > b.val:
        res.val = b.val
        res.choice = 1
    if res.val > c.val:
        res.val = c.val
        res.choice = 3
    return res

# deduce the result and print the specific operations
def printResult(self, dp, s1, s2):
    rows = len(dp)
    cols = len(dp[0])
    i, j = rows - 1, cols - 1
    print(f"Change s1={s1} to s2={s2}:\n")
    while i != 0 and j != 0:
        c1 = s1[i - 1]
        c2 = s2[j - 1]
        choice = dp[i][j].choice
        print(f"s1[{i - 1}]:", end='')
        if choice == 0:
            # skip, then both pointers move forward
            print(f"skip '{c1}'")
            i -= 1
            j -= 1
        elif choice == 1:
            # insert s2[j] into s1[i], then the s2 pointer moves forward
            print(f"insert '{c2}'")
            j -= 1
        elif choice == 2:
            # delete s1[i], then the s1 pointer moves forward
            print(f"delete '{c1}'")
            i -= 1
        elif choice == 3:
            # replace s1[i] with s2[j], then both pointers move forward
            print(f"replace '{c1}' with '{c2}'")
            i -= 1
            j -= 1
    # if s1 is not finished, the remaining characters need to be deleted
    while i > 0:
        print(f"s1[{i - 1}]:", end='')
        print(f"delete '{s1[i - 1]}'")
        i -= 1
    # if s2 is not finished, the remaining characters need to be inserted into s1
    while j > 0:
        print(f"s1[0]:", end='')
        print(f"insert '{s2[j - 1]}'")
        j -= 1
``` 

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
