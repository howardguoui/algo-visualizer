# Backtracking in Action: Sudoku and N-Queens

> Source: https://labuladong.online/algo/en/practice-in-action/sudoku-nqueue/
> Archived: labuladong.online

---

# Backtracking in Action: Sudoku and N-Queens

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[37\. Sudoku Solver](<https://leetcode.com/problems/sudoku-solver/>)|   
[51\. N-Queens](<https://leetcode.com/problems/n-queens/>)|   
[52\. N-Queens II](<https://leetcode.com/problems/n-queens-ii/>)|   
  
Prerequisites

Before reading this article, you need to study:

  * [Backtracking Algorithm Core Framework](</en/algo/essential-technique/backtrack-framework/>)

If you have already learned the [Core Framework of Backtracking Algorithm](</en/algo/essential-technique/backtrack-framework/>), this article will explore two classic algorithm problems: Sudoku and the N-Queens problem.

I chose these two problems because their solutions are very similar, and they are both interesting applications of backtracking in real life.

## Game Introduction

### Sudoku

You may have played Sudoku before. It gives you a 9x9 board, where some cells are filled with numbers. You need to fill the rest with numbers 1 to 9, so that no number repeats in any row, column, or 3x3 sub-box.

Here is an example of a Sudoku puzzle (from [Wikipedia](<https://en.wikipedia.org/wiki/Sudoku>)):

![diagram](https://labuladong.online/images/algo/sudoku/sudoku2.png)

When I was young, I tried to play Sudoku. If the puzzle was a bit hard, I could not solve it. Later, I found out there are some tricks to solve Sudoku. Some Sudoku apps can teach you these tricks, but I found them too complicated and lost interest.

Now, after learning backtracking, even hard Sudoku problems can’t stop me. As long as there are rules, we can use brute-force to find a solution, right?

Here is an example of solving Sudoku with backtracking:

![diagram](https://labuladong.online/images/algo/sudoku/sudoku_slove.gif)

I will explain the solution in detail later.

### N-Queens Problem

In chess, the queen can attack any unit in the same row, column, or diagonal. The N-Queens problem asks you to place N queens on an N×N chessboard, so that no two queens attack each other.

In other words, put N queens on an N×N board so that each row, column, and diagonal has only one queen.

Here is a solution to the 8-Queens problem (from [Wikipedia](<https://en.wikipedia.org/wiki/Eight_queens_puzzle>)):

![diagram](https://labuladong.online/images/algo/sudoku/8queue.jpg)

You can see, for any queen, there is no other queen in its row, column, or diagonals (top-left, top-right, bottom-left, bottom-right). So this is a valid solution.

Before talking about these problems, I want to show you a simple backtracking problem as a warm up. It will make it easier to understand how to solve Sudoku and N-Queens.

## All Possible n-bit Binary Numbers

Let’s try a simple problem. Please write a function:

```python
def generateBinaryNumber(n: int) -> List[str]:
``` 

The function takes a positive integer `n` and returns all binary numbers (made of 0 and 1) of length `n`. You can return the answers in any order.

For example, if `n = 3`, you need to return the following 23=82^3=823=8 binary numbers as strings:

```
000
001
010
011
100
101
110
111
``` 

You can think of this problem as a simpler version of Sudoku and N-Queens:

This problem asks you to brute-force every position in a 1D array of length `n`. Each position can be 0 or 1.

Sudoku asks you to brute-force every position in a 9x9 2D array. Each cell can be 1~9, and no repeats in any row, column, or 3x3 box.

N-Queens asks you to brute-force every position in an N x N 2D array. Each cell can be empty or have a queen (like 0 or 1). No two queens can be in the same row, column, or diagonal.

So, if you understand how to brute-force this simple problem, the other problems are similar, just with more rules.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
