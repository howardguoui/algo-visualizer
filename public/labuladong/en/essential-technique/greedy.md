# Greedy Algorithms Principles and Techniques

> Source: https://labuladong.online/algo/en/essential-technique/greedy/
> Archived: labuladong.online

---

# Greedy Algorithms Principles and Techniques

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[55\. Jump Game](<https://leetcode.com/problems/jump-game/>)|   
[45\. Jump Game II](<https://leetcode.com/problems/jump-game-ii/>)|   
  
Prerequisite

Before reading this article, you should first learn:

  * [Dynamic Programming: Framework and Patterns](</en/algo/essential-technique/dynamic-programming-framework/>)

In One Sentence

Pruning in the backtracking algorithm tries to cut off impossible answers early, so the tree is as small as possible. Usually, the time complexity is exponential. Memoization in dynamic programming is used to avoid repeating calculations, turning the tree structure into a linear one. Its time complexity is usually polynomial.

Both optimizations only reduce invalid brute-force, but both still consider all possible solutions to try to find the best answer.

The difference with greedy algorithms is: sometimes, you don't need to try every possible solution to get the best result. This cuts down the search space even more, making greedy algorithms more efficient.

Let's look at a simple example to understand greedy algorithms.

Suppose you have two types of banknotes. One is 1 yuan and the other is 100 yuan. There are unlimited notes of each type. But you can only take 10 notes. How should you pick the notes to get the largest total amount?

You probably will say, that's easy! Of course, just take 10 notes of 100 yuan each. That will be 1000 yuan, which is the best way. If you hesitate, you are not thinking straight.

You are right, but also not quite right.

You are right because this is indeed the best answer.

But you are not correct because this way just shows you want the most money, and you skipped the process of coming up with and optimizing the algorithm. That is not how computer algorithms work.

Now, let's ask the computer way: [All algorithms are essentially brute force](</en/algo/essential-technique/algorithm-summary/>). Right now, you have not tried all possible ways. So how do you know this is really the best answer?

From an algorithm's view, the problem is to make 10 choices. Each choice can be 1 yuan or 100 yuan. All together, there are 2102^{10}210 ways to choose.

**So in your head, you should first imagine a binary tree of height 10 that goes through all possible answers. After going through this tree, you can find the best answer.**

For example, below is a visual panel showing this recursive tree. Since a tree for 10 choices would be too huge, here is what it looks like for just 3 choices:

Algorithm Visualization

If you can imagine this binary tree, you can write the code:

```
// Define: make n choices, return the maximum amount of money you can get
int findMax(int n) {
    if (n == 0) return 0;
    
    // This time choose 1 yuan, then recursively solve the
    // maximum value of the remaining n - 1 choices
    int result1 = 1 + findMax(n - 1);
    // This time choose 100 yuan, then recursively solve
    // the maximum value of the remaining n - 1 choices
    int result2 = 100 + findMax(n - 1);

    // Return the maximum value of the two choices
    return Math.max(result1, result2);
}
``` 

The complexity of this algorithm is the number of nodes in a binary tree, which is exponential and very high. However, by this point, you should have noticed that the value of `findMax(n - 1)` is always the same. Therefore, `100 + findMax(n - 1)` is definitely greater than `1 + findMax(n - 1)`, allowing for optimization:

```
// Optimization 1, no need to compare the two choices
int findMax(int n) {
    if (n == 0) return 0;
    int result = 100 + findMax(n - 1);
    return result;
}

// Optimization 2, change recursion to iteration
int findMax(int n) {
    int result = 0;
    for (int i = 0; i < n; i++) {
        result += 100;
    }
    return result;
}

// Optimization 3, calculate the result directly
int findMax(int n) {
    return 100 * n;
}
``` 

This is the greedy algorithm, which reduces the complexity from O(2n)O(2^n)O(2n) to O(1)O(1)O(1), a remarkable improvement.

You might think this example is too simple?

In fact, algorithms are inherently simple; they are essentially brute-force methods. What makes them valuable are the various optimization techniques derived from brute-force, often given complex names. Those unfamiliar with these techniques might get misled by the terminology, but fundamentally, there's not much difference—it's all about countering challenges as they arise.

Although the example above is simple, it embodies the essence of the greedy algorithm. Next, we will explore further how to identify the greedy choice property and apply greedy algorithms to solve real-world algorithmic problems.

Last updated: 03/14/2026, 12:17 AM
