# One Article to Solve All Ugly Number Problems on LeetCode

> Source: https://labuladong.online/algo/en/frequency-interview/ugly-number-summary/
> Archived: labuladong.online

---

# One Article to Solve All Ugly Number Problems on LeetCode

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[263\. Ugly Number](https://leetcode.com/problems/ugly-number/)|   
[264\. Ugly Number II](https://leetcode.com/problems/ugly-number-ii/)|   
[313\. Super Ugly Number](https://leetcode.com/problems/super-ugly-number/)|   
[1201\. Ugly Number III](https://leetcode.com/problems/ugly-number-iii/)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Summary of Linked List Two Pointer Techniques](/en/algo/essential-technique/linked-list-skills-summary/)
  * [Binary Search Framework Explained](/en/algo/essential-technique/binary-search-framework/)


Recently, a reader from our community messaged me privately, saying they were completely stumped by a series of math-related algorithm problems during a Microsoft interview. I looked at the problems and found they were actually modified versions of the "Ugly Number" series on LeetCode.

First, the "Ugly Number" series belongs to the type of problems that are easy if you know them, hard if you don't, because they involve some mathematical theorems. If you haven't studied them specifically, you probably won't figure them out on your own.

Additionally, these problems really test your ability to think abstractly. They not only require mathematical theorems, but also need you to abstract the problem into linked list problems using two-pointer techniques, or into array problems using binary search techniques.

So today I'll use this one article to tackle all ugly number related problems comprehensively, and see how these problems can vary and how to solve them.

## ¶Ugly Number I

First is LeetCode problem 263 "[Ugly Number](https://leetcode.cn/problems/ugly-number/)". The problem gives you a number `n` and asks you to determine whether `n` is an "ugly number". An "ugly number" is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

The function signature is:
    
    
    boolean isUgly(int n)

For example, 12 = 2 × 2 × 3 is an ugly number, while 42 = 2 × 3 × 7 is not an ugly number.

This problem is actually very simple, provided you know the Fundamental Theorem of Arithmetic (Unique Prime Factorization Theorem):

**Any natural number greater than 1 is either a prime number itself, or it can be decomposed into a product of prime numbers**.

Since any positive integer greater than one can be decomposed into a product of prime numbers, an ugly number can also be decomposed into a product of prime numbers, and these primes can only be 2, 3, or 5.

With this idea, you can implement the `isUgly` function:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        public boolean isUgly(int n) {
            if (n <= 0) return false;
            // If n is an ugly number, its prime factors should only be 2, 3, 5
            while (n % 2 == 0) n /= 2;
            while (n % 3 == 0) n /= 3;
            while (n % 5 == 0) n /= 5;
            return n == 1;
        }
    }

## ¶Ugly Number II

Now let's increase the difficulty and look at LeetCode problem 264 "[Ugly Number II](https://leetcode.cn/problems/ugly-number-ii/)". This time, the problem doesn't ask you to determine whether a number is ugly, but instead gives you an input `n` and asks you to calculate what the `n`-th ugly number is. The function signature is:

CC++GoJavaJavaScriptPython
    
    
    int nthUglyNumber(int n)

Last updated: 03/14/2026, 12:17 AM

Loading comments...
