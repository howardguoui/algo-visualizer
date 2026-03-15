# Ball and Box: Two Perspectives of Backtracking Enumeration

> Source: https://labuladong.online/algo/en/practice-in-action/two-views-of-backtrack/
> Archived: labuladong.online

---

# Ball and Box: Two Perspectives of Backtracking Enumeration

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[78\. Subsets](https://leetcode.com/problems/subsets/)|   
[46\. Permutations](https://leetcode.com/problems/permutations/)|   
  
Prerequisites

Before reading this article, you should familiarize yourself with:

  * [Binary Tree Series Algorithms (Overview)](/en/algo/essential-technique/binary-tree-summary/)
  * [Backtracking Algorithm Core Framework](/en/algo/essential-technique/backtrack-framework/)
  * [Backtracking Algorithm to Solve All Permutations/Combinations/Subsets](/en/algo/essential-technique/permutation-combination-subset-all-in-one/)


Before diving into this article, you need to be familiar with the [Backtracking Algorithm Core Framework](/en/algo/essential-technique/backtrack-framework/) and [Backtracking Algorithm to Solve All Permutations/Combinations/Subsets](/en/algo/essential-technique/permutation-combination-subset-all-in-one/).

In these two articles, readers have suggested different ways to write permutation/combination/subset code, such as using `swap` to achieve full permutations and subset solutions without for loops. I previously avoided discussing these alternative methods to maintain consistency in problem-solving approaches. Introducing too many options early on can be confusing.

In this article, I will not only introduce the backtracking algorithm methods I haven't covered before but also explain why they work and what the essential differences are between the two approaches.

Key Takeaways

  1. The essence of the backtracking algorithm's exhaustive thinking is the "Ball-Box Model." All backtracking algorithms stem from this model; there is no other way.

  2. The Ball-Box Model inherently offers two exhaustive perspectives: the "ball" perspective and the "box" perspective, corresponding to two different coding approaches.

  3. Theoretically, both perspectives are fundamentally the same. However, in terms of specific code implementation, one method may be more efficient than the other. You should choose the more efficient approach.


The term "Ball-Box Model" is something I coined casually. I will use the "ball" and "box" perspectives to explain, so just understand the concept.

## ¶Brute-Force Enumeration Method: The Ball and Box Model

**All brute-force enumeration algorithms start with the ball and box model, without exception**.

Once you understand this, you can effortlessly apply brute-force enumeration algorithms. Please read the following content carefully and think deeply.

First, let's review some previously learned knowledge about permutations and combinations:

  1. `P(n, k)` (often written as `A(n, k)` in many texts) represents the total number of permutations (or arrangements) of selecting `k` elements from `n` distinct elements; `C(n, k)` represents the total number of combinations of selecting `k` elements from `n` distinct elements.

  2. The main difference between "permutation" and "combination" is whether the order of elements is considered.

  3. The formulas for calculating the total number of permutations and combinations:


![](/images/algo/set-split/math.png)

### ¶Permutation `P(n, k)`

Now, let me ask a question: how is the permutation formula `P(n, k)` derived? To clarify this, I need to discuss some concepts from combinatorial mathematics.

Various variations of permutation and combination problems can be abstracted into the "ball and box model." The permutation `P(n, k)` can be represented by the following scenario:

![](/images/algo/set-split/7-en.jpeg)

That is, placing `n` balls, each with a different number to indicate order, into `k` boxes, each also numbered differently (where `n >= k`, and each box ends up with exactly one ball). There are `P(n, k)` different ways to do this.

Now, when you place balls into boxes, how would you do it? There are two perspectives to consider.

**First, from the perspective of the boxes** , each box must choose one ball.

In this view, the first box can choose any of the `n` balls, and then the remaining `k - 1` boxes need to choose from the `n - 1` balls left (this is the subproblem `P(n - 1, k - 1)`):

![](/images/algo/set-split/8-en.jpeg)

**Alternatively, from the perspective of the balls** , not every ball will be placed in a box, so there are two situations:

  1. The first ball might not be placed in any box, leaving you to place the remaining `n - 1` balls into `k` boxes.

  2. The first ball could be placed in any of the `k` boxes, so you would then place the remaining `n - 1` balls into `k - 1` boxes.


Combining these two situations, we obtain:

![](/images/algo/set-split/9-en.jpeg)

As you can see, the two perspectives yield two different recursive formulas, but both lead to the factorial form we are familiar with:

![](/images/algo/set-split/math1.png)

The process of solving these recursive formulas involves more mathematical content, which we will not delve into here. Interested readers are encouraged to study combinatorial mathematics on their own.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
