# Some Questions About Backtracking and DFS Algorithms

> Source: https://labuladong.online/algo/en/essential-technique/backtrack-vs-dfs/
> Archived: labuladong.online

---

# Some Questions About Backtracking and DFS Algorithms

Prerequisites

Before reading this article, you need to learn:

  * [Binary Tree Algorithms (Overview)](</en/algo/essential-technique/binary-tree-summary/>)
  * [Backtracking Algorithm Core Framework](</en/algo/essential-technique/backtrack-framework/>)

In this article, we use simple examples to answer several common questions readers have about backtracking and DFS algorithms:

  1. What is the difference between backtracking and DFS algorithms?

  2. In the [Backtracking Algorithm Core Framework](</en/algo/essential-technique/backtrack-framework/>), it says you make a choice before recursion and undo the choice after recursion. But why do some codes make the choice before the for loop and undo the choice after the for loop?

  3. Can the `backtrack/dfs/traverse` functions have a return value?

  4. Should base case and pruning be written before the recursive call or at the start of the function?

## What is the difference between backtracking and DFS algorithms?

Many readers ask me why the website only talks about backtracking, but not DFS algorithms.

Some readers are also confused. In the [Backtracking Algorithm Core Framework](</en/algo/essential-technique/backtrack-framework/>), it says the template is to make a choice before recursion and undo the choice after recursion, like this:

```
void backtrack(...) {
    if (reached the leaf node) {
        // reached the leaf node, end recursion
        return;
    }

    for (int i = 0; i < n; i++) {
        // make a choice
        ...

        backtrack(...)

        // undo the choice
        ...
    }
}
``` 

But sometimes you see code that makes the choice before the for loop and undoes the choice after the for loop:

```
void backtrack(...) {
    if (reached the leaf node) {
        // reached the leaf node, end recursion
        return;
    }
    // make a choice
    ...

    for (int i = 0; i < n; i++) {
        backtrack(...)
    }

    // undo the choice
    ...
}
``` 

What is the difference between these two ways of writing code?

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
