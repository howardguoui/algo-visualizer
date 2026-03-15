# Classic DP: Minimum Path Sum

> Source: https://labuladong.online/algo/en/dynamic-programming/minimum-path-sum/
> Archived: labuladong.online

---

# Classic DP: Minimum Path Sum

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[64\. Minimum Path Sum](<https://leetcode.com/problems/minimum-path-sum/>)|   
  
Prerequisite

Before reading this article, you should first learn:

  * [The Core Framework of Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>)

Today, let's discuss a classic dynamic programming problem. It is LeetCode problem 64: ["Minimum Path Sum"](<https://leetcode.com/problems/minimum-path-sum/>):

**64\. Minimum Path Sum** |[LeetCode](<https://leetcode.com/problems/minimum-path-sum/>)

Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/11/05/minpath.jpg)

```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
``` 

**Example 2:**

```
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
``` 

**Constraints:**

  * `m == grid.length`
  * `n == grid[i].length`
  * `1 <= m, n <= 200`
  * `0 <= grid[i][j] <= 200`

The problem is from [LeetCode 64. Minimum Path Sum](<https://leetcode.com/problems/minimum-path-sum/>).

The function signature is as follows:

```python
def minPathSum(grid: List[List[int]]) -> int
``` 

This problem is not very hard, but you may meet harder variations. So let's talk about the general idea for this kind of problem.

**Usually, when you need to solve an optimization problem (find the maximum or minimum) in a 2D grid, you should use recursion + memoization, which is the dynamic programming technique.**

Let's use the example in the problem. I will give numbers to some cells in the picture for easier explanation:

![diagram](https://labuladong.online/images/algo/shortest-path/minpath.jpg)

Suppose we want to calculate the minimum path sum from the start `D` to `B`. How can we reach `B`?

The problem says you can only move right or down, so you can only get to `B` from `A` or from `C`.

But how does the algorithm know whether going from `A` to `B` gives a smaller path sum than going from `C` to `B`?

Is it because the value at `A` is 1 and at `C` is 2, so since 1 < 2, we must choose `A`?

Actually, that's not the real reason. **The real reason is that the minimum path sum from`D` to `A` is 6, and from `D` to `C` is 8. Since 6 < 8, we should go through `A` to get the smallest path sum to `B`.**

In other words, we turn the problem of "minimum path sum from `D` to `B`" into the problems of "minimum path sum from `D` to `A`" and "minimum path sum from `D` to `C`".

If you understand this, you can see this is the state transition formula. So this problem can be solved with dynamic programming.

For example, we define a `dp` function like this:

```python
def dp(grid: List[List[int]], i: int, j: int) -> int:
``` 

The `dp` function is defined as:

**The minimum path sum from the top-left position`(0, 0)` to position `(i, j)` is `dp(grid, i, j)`.**

Based on this, we can get the minimum path sum by calling this `dp` function:

```python
def minPathSum(grid: List[List[int]]) -> int:
    m = len(grid)
    n = len(grid[0])
    # calculate the minimum path sum from the top-left corner to the bottom-right corner
    return dp(grid, m - 1, n - 1)
``` 

From what we just discussed, it's easy to see that the value of `dp(grid, i, j)` depends on the values returned by `dp(grid, i - 1, j)` and `dp(grid, i, j - 1)`.

Now let's write the code directly:

```python
def dp(grid: List[List[int]], i: int, j: int) -> int:
    # base case
    if i == 0 and j == 0:
        return grid[0][0]

    # if the index is out of bounds, return a very large value,
    # ensuring it won't be chosen when taking the minimum
    if i < 0 or j < 0:
        return float('inf')

    # the minimum path sum from the left and above plus grid[i][j]
    # is the minimum path sum to reach (i, j)
    return min(
            dp(grid, i - 1, j), 
            dp(grid, i, j - 1)
        ) + grid[i][j]
``` 

The logic of the code above is complete. Next, let's analyze if this recursive algorithm has overlapping subproblems. Do we need to use memoization to improve efficiency?

**As mentioned before, the way to check for overlapping subproblems is to first abstract the recursive structure:**

```
int dp(int i, int j) {
    dp(i - 1, j); // #1
    dp(i, j - 1); // #2
}
``` 

If we want to go from `dp(i, j)` to `dp(i-1, j-1)`, how many different recursive paths are there?

It could be `dp(i, j) -> #1 -> #2` or `dp(i, j) -> #2 -> #1`. There is more than one way, so `dp(i-1, j-1)` will be calculated many times. This means there are overlapping subproblems.

So, we can use memoization to optimize:

```python
class Solution:
    def __init__(self):
        self.memo = None

    def minPathSum(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        # construct memo, initialize all values to -1
        self.memo = [[-1 for _ in range(n)] for _ in range(m)]

        return self.dp(grid, m - 1, n - 1)

    def dp(self, grid: List[List[int]], i: int, j: int) -> int:
        # base case
        if i == 0 and j == 0:
            return grid[0][0]
        if i < 0 or j < 0:
            return float('inf')
        # avoid redundant calculations
        if self.memo[i][j] != -1:
            return self.memo[i][j]
        # record the calculation result in memo
        self.memo[i][j] = min(
            self.dp(grid, i - 1, j),
            self.dp(grid, i, j - 1)
        ) + grid[i][j]

        return self.memo[i][j]
``` 

Algorithm Visualization

Now, this problem is solved. Both time and space complexity are O(MN)O(MN)O(MN). This is the standard top-down dynamic programming solution.

Some readers may ask, can we solve this problem with a bottom-up iterative approach? Yes, we can.

First, similar to the `dp` function above, we need a 2D `dp` array, defined as:

**The minimum path sum from the top-left`(0, 0)` to `(i, j)` is `dp[i][j]`.**

The state transition rule does not change. `dp[i][j]` still depends on `dp[i-1][j]` and `dp[i][j-1]`. Let's look at the code:

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        dp = [[0] * n for _ in range(m)]

        # **** base case ****
        dp[0][0] = grid[0][0]

        for i in range(1, m):
            dp[i][0] = dp[i - 1][0] + grid[i][0]
        
        for j in range(1, n):
            dp[0][j] = dp[0][j - 1] + grid[0][j]        
        # *******************
        
        # state transition
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = min(
                    dp[i - 1][j],
                    dp[i][j - 1]
                ) + grid[i][j]

        return dp[m - 1][n - 1]
``` 

**The base case of this solution looks a bit different from the recursive solution, but actually it's the same.**

Because the state transition is:

```
dp[i][j] = Math.min(
    dp[i - 1][j],
    dp[i][j - 1]
) + grid[i][j];
``` 

If `i` or `j` is 0, there will be an index out of bounds error.

So we need to fill `dp[0][..]` and `dp[..][0]` first, then let `i` and `j` start from 1.

How do we calculate `dp[0][..]` and `dp[..][0]`? It's simple. The path for the first row and first column only has one way:

![diagram](https://labuladong.online/images/algo/shortest-path/1.jpeg)

So, by definition, `dp[i][0] = sum(grid[0..i][0])`, `dp[0][j] = sum(grid[0][0..j])`. The code is:

```
// **** base case ****
dp[0][0] = grid[0][0];

for (int i = 1; i < m; i++)
    dp[i][0] = dp[i - 1][0] + grid[i][0];

for (int j = 1; j < n; j++)
    dp[0][j] = dp[0][j - 1] + grid[0][j];        
// *******************
``` 

Now, the bottom-up iterative solution is done. Some readers may ask, can we optimize the space complexity?

In the previous article, [Dynamic Programming: Space Optimization](</en/algo/dynamic-programming/space-optimization/>), we talked about how to reduce the size of the `dp` array. It also works here, but it's a bit more complex. Because of length limits, I won't write it here, but you can try it yourself.

That's the end of this article. In the next one, we will solve a more advanced and interesting problem. Stay tuned!

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
