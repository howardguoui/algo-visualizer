# LeetCode Guide

> Source: https://labuladong.online/algo/en/intro/leetcode/
> Archived: labuladong.online

---

# LeetCode Guide

All practice problems and example problems on this site are selected from LeetCode's free public problems. We also give links to the original problems, so you can jump to LeetCode and practice there.

To help beginners, we will briefly introduce how online judge platforms work and some tips to use them.

## Core Code Mode

On LeetCode, you are given a function signature and you need to implement the function. This is usually called **core code mode**.

For example, LeetCode problem 1, Two Sum, asks you to implement a `twoSum` function:

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}
``` 

This means you are given an input array `nums` and a target value `target`. You need to write the algorithm and finally return an array as the result.

When you submit your code, the system will call your `twoSum` function on several predefined test cases. It compares your return values with the correct answers to judge whether your code is correct.

For users, core code mode is the most convenient form, because you only need to focus on the algorithm logic.

## ACM Mode

Some companies still use ACM mode in their coding tests, so we need to talk about it.

ACM mode is more troublesome: the input is a string with a specific format. You must parse this string by yourself, then print the result to standard output.

After you submit your code, the system will format each test case as a string and pass it to your program. Then it compares the output your program prints with the expected output to judge correctness.

All problems in [our problem set](<https://labuladong.online/zh/problemset/core/>) support both core code mode and ACM mode. Here is an example of ACM mode for one problem:

![diagram](https://labuladong.online/images/algo/acm/acm-mode-en.jpg)

You can see that the code editor does not contain any starter code. You must import libraries, read input, and print the answer by yourself.

In [ACM Mode I/O Template](</en/algo/intro/acm-mode/>), I will give a general input/output template to turn ACM mode into core code mode. So when you learn, just use core code mode. It is simple and lets you focus on understanding the algorithm logic. Before interviews or written tests, spend one or two hours to get used to ACM mode, and mainly remember how your programming language reads input.

Next, we will look at tips for using online judges and how they check whether your solution is correct.

## How to Read the Problem

Take LeetCode #704, "[Binary Search](<https://leetcode.cn/problems/binary-search/>)," for example:

**704\. Binary Search** |[LeetCode](<https://leetcode.com/problems/binary-search/>)

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
``` 

**Example 2:**

```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
``` 

**Constraints:**

  * `1 <= nums.length <= 104`
  * `-104 < nums[i], target < 104`
  * All the integers in `nums` are **unique**.
  * `nums` is sorted in ascending order.

The problem is from [LeetCode 704. Binary Search](<https://leetcode.com/problems/binary-search/>).

You're given an empty function signature, and you need to implement the `search` function:

```java
class Solution {
    public int search(int[] nums, int target) {
        // your code here
    }
}
``` 

You're given a sorted array `nums` in ascending order, and you need to return the index of `target`, or `-1` if it's not found.

Pay attention: read every detail

Read carefully and don't skip anything. It's easy to glance at the problem statement and examples, then miss the constraints and additional info below.

For this one, the constraints tell you the size of `nums`, the range of values, and—crucially—that **`nums` contains no duplicates**.

This matters because if there were duplicates, which index should you return? Details like this are usually in the constraints, so don't skip them.

## How to Solve

This problem is designed to test binary search (which we'll cover in [Binary Search Algorithm](</en/algo/essential-technique/binary-search-framework/>)), but let's start with a straightforward solution:

```java
class Solution {
    public int search(int[] nums, int target) {
        // traverse the array, return the index if found
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
``` 

Copy this into LeetCode's editor, hit "Run" to test it against the sample cases, or hit "Submit" to see if it passes all test cases.

## How to Debug

The best way to debug is to solve LeetCode problems in your local editor where you can set breakpoints and step through your code. For setup instructions, check out the companion [vscode plugin](</en/algo/intro/vscode/>) and [Jetbrains IDE plugin](</en/algo/intro/jetbrains/>).

If you're using the web editor, you can add print statements—LeetCode will show your output in the bottom-right panel. For simple bugs, checking the output is usually enough to spot the issue.

Remember to remove print statements before submitting

Print statements involve I/O operations that slow down your code, so remove them before submitting—they can tank your runtime.

## How the Judge Works

As of writing this, the solution above passes all of LeetCode's test cases.

LeetCode has a bunch of predefined test cases behind the scenes, like:

```
Test case: nums = [-1,0,3,5,9,12], target = 9
Expected output: 4

Test case: nums = [-1,0,3,5,9,12], target = 2
Expected output: -1

Test case: nums = [5], target = 5
Expected output: 0

...
``` 

These test cases get passed as arguments to your `search` function, and the system checks if your return value matches the expected output.

If they match, the test case passes. If all test cases pass, your solution is accepted.

The solution above isn't the most efficient, but it computes the right answer and runs within the time limit, so the judge accepts it.

Gaming the System

Here's the thing: the judge doesn't actually inspect your code. Your code is a black box—it only cares whether the input/output matches.

So if a problem has soft constraints like "don't use `long`" or "don't use the standard library," well... it's just a suggestion. The judge can't actually enforce it.

In online assessments, you can ignore these restrictions—if your code passes all tests, it's accepted.

That said, this is gaming the system. When you're learning, stick to the constraints—you can't pull these tricks in front of a live interviewer.

## Common Errors When Submitting Code

If the submitted code passes all the test cases in the backend, it is considered a successful submission, often referred to as AC (Accepted).

If the submitted code fails to pass all test cases, it is considered a failed submission. Common reasons for failure include:

Compile Error

The code cannot be compiled, usually due to syntax errors like spelling mistakes or missing semicolons. This kind of error often occurs when writing code directly on the webpage. Using our site's accompanying [Jetbrains IDE plugin](</en/algo/intro/jetbrains/>) or [vscode plugin](</en/algo/intro/vscode/>) can help prevent these errors with basic syntax checking features.

Runtime Error

The code compiles successfully but encounters errors like array out-of-bounds or null pointer exceptions during execution. These errors are usually due to improper handling of boundary conditions. Pay attention to boundary conditions and special test cases (also known as corner cases, such as empty input).

Wrong Answer

The code compiles and runs, but the results for some test cases do not match the correct answers. This error is generally due to a problem with your algorithm, requiring you to reflect on the failing test cases, and possibly rethink your entire approach.

Time Limit Exceeded (TLE)

In predefined test cases, the size of the data increases in later cases. If your algorithm's time complexity is too high, it may exceed the system's time limit when running large-scale test cases, leading to a timeout error.

To solve this problem, check the following:

  1. Are there redundant calculations, and is there a more efficient approach to reduce time complexity?

  2. Are there coding errors, such as incorrect boundary control leading to infinite loops, or incorrect passing of values and references causing meaningless data copying?

If you are stuck on large-scale test cases, it generally indicates your algorithm's results are correct since the smaller test cases have passed, but the time complexity needs optimization.

In written exams, scoring is usually based on the number of test cases passed. If you cannot find the optimal solution to pass all test cases, submitting a brute-force solution to pass a few test cases for partial credit is also a clever strategy.

Memory Limit Exceeded (MLE)

Similar to timeout errors, memory limit exceeded errors usually occur when the algorithm's space complexity is too high, using more memory than the system's limit when running large-scale test cases.

To solve this problem, check the following:

  1. Is there unnecessary space allocation, and is there a more efficient approach to reduce space complexity?

  2. Are there mistakes in using value parameters in recursive functions causing meaningless data copying?

## Notes for Submitting Code on LeetCode

If you are new to solving problems on LeetCode, here are some common mistakes beginners make.

### Do Not Use File-Level Global Variables

LeetCode will run your code with several predefined test cases, and check if your return values are correct. So, there is an important rule:

**Do not use file-level global variables in your code.** Otherwise, data from one test case may affect another. LeetCode also explains this here: <https://support.leetcode.cn/hc/kb/article/1194344/>[](<https://support.leetcode.cn/hc/kb/article/1194344/>)

Some readers say their code works for one test case, but fails when they submit. This usually happens because the code only works for a single test case, but when submitted, different test cases share the same global variable, causing errors.

In this tutorial, when I talk about "global variables", I mean class-level variables, not file-level global variables.

Here is an example. For the problem of preorder traversal of a binary tree, you are given the root of a binary tree and asked to return the preorder traversal result. You can write:

```java
class Solution {
    // correct example, class-level global variable
    LinkedList<Integer> res = new LinkedList<>();

    public List<Integer> preorderTraversal(TreeNode root) {
        traverse(root);
        return res;
    }

    void traverse(TreeNode root) {
        if (root == null) {
            return;
        }
        // other functions within the class can access res
        res.add(root.val);
        traverse(root.left);
        traverse(root.right);
    }
}
``` 

For languages like Java/C++/Python, which use a `Solution` class, you can put shared variables inside the class. For Go/JavaScript, which do not use classes, you can define higher-order functions and use closures to let inner functions access shared variables.

Or, you can pass the variable as a function parameter. This is also a good solution:

```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        // correct example, passed as an argument to other functions
        LinkedList<Integer> res = new LinkedList<>();
        traverse(root, res);
        return res;
    }

    void traverse(TreeNode root, LinkedList<Integer> res) {
        if (root == null) {
            return;
        }
        // access and modify the res variable
        res.add(root.val);
        traverse(root.left, res);
        traverse(root.right, res);
    }
}
``` 

Important

**For this solution, you must pay attention to how your programming language passes function parameters: by value or by reference/pointer.** If you do not handle this correctly, your code may be slow or even wrong.

For example, in the code above, in C++, the `traverse` function must use reference parameters like `vector<int>& res`. If you use `vector<int> res`, each recursion will copy the entire vector, making the code slow and possibly giving the wrong answer.

### Remove Print Statements Before Submitting

When running test cases, LeetCode will show your code's standard output. You can use print statements to debug. But, **before you submit your code, always comment out all print statements.**

Standard output is an IO operation, which is slow. If you keep print statements, your code may be optimal, but it will run slowly or even fail because of timeouts.

That's all for now. Next, I will guide you through some easy LeetCode problems for practice. Reading is not enough—you need to try it yourself!

Last updated: 03/14/2026, 12:17 AM
