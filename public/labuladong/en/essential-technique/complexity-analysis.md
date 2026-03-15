# Time and Space Complexity Analysis Practical Guide

> Source: https://labuladong.online/algo/en/essential-technique/complexity-analysis/
> Archived: labuladong.online

---

# Time and Space Complexity Analysis Practical Guide

My previous articles mostly focused on explaining algorithm principles and problem-solving thinking, often glossing over time and space complexity analysis. There were two main reasons:

  1. For beginners, I wanted you to focus on understanding algorithm principles. Throwing in too much math-heavy content would scare people off.

  2. A solid understanding of how common algorithms work under the hood is a prerequisite for complexity analysis. Especially for recursive algorithms—you can only analyze their complexity correctly when you think about them from a tree perspective.


Now that my earlier articles have covered the core principles of all common algorithms, I'm writing a dedicated guide on time and space complexity analysis. Rather than giving you a fish, I'd rather teach you how to fish—here's a general method you can use to analyze the complexity of any algorithm.

This article is going to be long. Here's what it covers:

  1. Using time complexity to work backward to a solution approach, saving trial-and-error time.

  2. Where does the time go? Common coding mistakes that cause TLE (Time Limit Exceeded).

  3. Key properties of Big O notation.

  4. Time complexity analysis for non-recursive algorithms.

  5. Measuring data structure API efficiency (amortized analysis).

  6. Analyzing time/space complexity for recursive algorithms—this is the main focus, and I'll use dynamic programming and backtracking as examples.


Before diving into the concepts and calculations, let me share some practical tips and common pitfalls.

## ¶Using Complexity to Reverse-Engineer the Solution

Pay Attention to Input Size

Don't think complexity analysis is just there to torture you—it's actually there to help you. It's secretly hinting at the solution.

**You should look at the input size constraints before writing any code** , because complexity analysis can save you from wasting time on the wrong approach. Sometimes it can even tell you directly which algorithm to use.

Why? Because problems typically specify the data scale for test cases. From that, we can figure out the acceptable time complexity range, which in turn tells us what algorithms are viable.

For example, if a problem gives you an array whose length can reach `10^6`, you know the time complexity needs to be less than O(N2)O(N^2)O(N2)—you need to optimize to O(NlogN)O(NlogN)O(NlogN) or O(N)O(N)O(N). Because if your algorithm is O(N2)O(N^2)O(N2), the worst case hits `10^12` operations, which won't pass on most online judges.

To keep complexity at O(NlogN)O(NlogN)O(NlogN) or O(N)O(N)O(N), your options narrow down: sorting the array, prefix sums, two pointers, 1D DP, and so on. These are the reasonable approaches. Nested for loops, 2D DP, and backtracking can be ruled out right away.

Here's an even more direct example: if the input size is very small, say array length `N` is at most `20`, then the problem almost certainly requires brute-force enumeration.

Think about it—the judge platform always tries to maximize input size to challenge you. If it's giving you an unusually small constraint, it's because the optimal solution has exponential or factorial complexity. Just go ahead and hit it with [backtracking](/en/algo/essential-technique/backtrack-framework/)—no need to look for anything fancier.

**So here's the thing—a lot of people jump straight into coding without even checking the input constraints. That's a mistake.** Consider all the information the problem gives you before writing code. It'll save you a lot of detours.

## ¶Complexity Blowups from Coding Mistakes

This section summarizes some common coding-level mistakes that people (especially beginners) make. These mistakes create unexpected time overhead, slow down your algorithm, and can even cause TLE.

### ¶Using Standard Output

When working on algorithm problems, you might use `print/console.log` to print some state for debugging.

But remember to comment out these print statements before submitting, because standard output is an I/O operation that can significantly slow down your code.

### ¶Passing by Value Instead of by Reference

In C++, function parameters are passed by value by default. If you pass a `vector` parameter, the entire data structure gets copied, causing extra time and space overhead. Especially when the function is recursive—passing by value almost guarantees TLE or memory limit exceeded.

The fix is to pass by reference, like `vector<int>&`, which avoids the copying overhead. Readers using other languages should check whether similar issues apply—make sure you understand your language's parameter passing mechanism.

### ¶Unknown Underlying Implementation of Interface Objects

This is a trickier issue that mostly shows up in object-oriented languages like Java. It's relatively uncommon, but you need to be aware of it.

In Java, `List` is an interface with multiple implementations, such as `ArrayList`, `LinkedList`, and others.

If you've read the fundamentals chapters on [Implementing a Dynamic Array from Scratch](/en/algo/data-structure-basic/array-implement/) and [Implementing a Doubly Linked List from Scratch](/en/algo/data-structure-basic/linkedlist-implement/), you know that `ArrayList` and `LinkedList` have very different complexities for many operations. For instance, `ArrayList`'s `get` method is O(1)O(1)O(1), while `LinkedList`'s `get` method is O(N)O(N)O(N).

So if a function parameter gives you a `List` type, would you dare call `list.get(i)` for random access? Probably not.

In this situation, you should create your own `ArrayList`, copy all elements from the input `List` into it, and then access by index. That's the safe play.

Those are the main ones. They're all non-algorithmic issues—just keep an eye out for them and you'll be fine. Now let's get into the actual complexity analysis.

## ¶Big O Notation

Mathematical Definition of Big O Notation:

O(g(n))O(g(n))O(g(n)) = { f(n)f(n)f(n): there exist positive constants ccc and n0n_0n0​ such that for all n≥n0n ≥ n_0n≥n0​, 0≤f(n)≤c∗g(n)0 ≤ f(n) ≤ c*g(n)0≤f(n)≤c∗g(n) }

The symbol OOO (the uppercase letter ooo, not the digit 0) actually represents a set of functions. For example, O(n2)O(n^2)O(n2) represents a set of functions derived from g(n)=n2g(n) = n^2g(n)=n2. When we say an algorithm has time complexity O(n2)O(n^2)O(n2), we mean the function describing its complexity belongs to this set.

**In theory, if you fully understand this abstract mathematical definition, it answers every question you might have about Big O notation**.

But since most people's eyes glaze over at math definitions, let me give you two properties that come up in complexity analysis. Memorize these two and you're good to go.

**1\. Keep only the fastest-growing term; everything else can be dropped**.

First, constant factors in multiplication and addition can be ignored:
    
    
    O(2N + 100) = O(N)
    O(2^(N+1)) = O(2 * 2^N) = O(2^N)
    O(M + 3N + 99) = O(M + N)

Of course, don't blindly eliminate every constant. Some can't be removed—you might need the exponent rules from high school math:
    
    
    O(2^(2N)) = O(4^N)

Beyond constant factors, slower-growing terms are negligible compared to faster-growing ones:
    
    
    O(N^3 + 999 * N^2 + 999 * N) = O(N^3)
    O((N + 1) * 2^N) = O(N * 2^N + 2^N) = O(N * 2^N)

These are all the simplest and most common examples, and they can all be correctly explained by the definition of Big O notation. If you encounter more complex scenarios, you can always fall back on the definition to verify whether your complexity expression is correct.

**2\. Big O notation represents an "upper bound" on complexity**.

In other words, as long as what you give is an upper bound, it's technically correct in Big O notation.

For example, this code:
    
    
    for (int i = 0; i < N; i++) {
        print("hello world");
    }

If we call this an algorithm, its time complexity is obviously O(N)O(N)O(N). **But if you insist on saying its time complexity is O(N2)O(N^2)O(N2), that's technically valid**, because `O` notation represents an upper bound—this algorithm's time complexity indeed doesn't exceed N2N^2N2. The bound isn't "tight," but it satisfies the definition, so technically it's not wrong.

The above example is too simple, and inflating its upper bound seems pointless. But some algorithms have complexity that depends on the input data, making it impossible to give a very precise time complexity upfront. In those cases, using Big O notation to give a looser upper bound becomes meaningful.

For example, the brute-force recursive solution to the coin change problem from [Dynamic Programming Core Framework](/en/algo/essential-technique/dynamic-programming-framework/). The core code framework looks like this:
    
    
    // definition: to make amount n, you need at least dp(coins, n) coins
    int dp(int[] coins, int amount) {
        // base case
        if (amount <= 0) return;
        // state transition
        for (int coin : coins) {
            dp(coins, amount - coin);
        }
    }

When `amount = 11, coins = [1,2,5]`, the recursion tree looks like this:

![](/images/algo/dynamic-programming/5.jpg)

I'll explain how to calculate time complexity for recursive algorithms in detail later. For now, let's just count the number of nodes in this recursion tree.

Suppose the value of `amount` is `N` and the number of elements in `coins` is `K`. Then this recursion tree is a `K`-ary tree. But the tree's growth is directly related to the coin denominations in `coins`, so the tree shape is highly irregular, making it very hard to count the exact number of nodes.

For situations like this, the simplest approach is to approximate using the worst case:

How tall is this tree? We don't know, so assume the worst case—all coins have denomination 1, giving tree height `N`.

What's the tree's structure? We don't know, so assume the worst case—it's a complete `K`-ary tree.

How many nodes are in this tree then? Going with worst case all the way, a complete `K`-ary tree of height `N` has a total node count given by the geometric series formula `(K^N - 1)/(K - 1)`, which in Big O notation is O(KN)O(K^N)O(KN).

Sure, we know the actual node count is much smaller, but using O(KN)O(K^N)O(KN) as a rough upper bound works fine. It clearly shows this is an exponential algorithm that needs optimization.

**So sometimes your complexity estimate differs from someone else's, and that doesn't necessarily mean either of you is wrong—you might both be correct, just estimating at different levels of precision**.

Ideally, we want a tight and accurate upper bound, but getting there requires solid math skills. For interview prep purposes, it's fine to settle for getting the right order of magnitude (linear, exponential, logarithmic, quadratic, etc.).

In algorithm theory, besides Big O for asymptotic upper bounds, there are also notations for asymptotic lower bounds, tight bounds, and others—curious readers can look those up. But from a practical standpoint, the explanation above is all you need.

## ¶Non-Recursive Algorithm Analysis

Space complexity for non-recursive algorithms is usually easy to calculate—just check whether the algorithm allocates storage like arrays. So I'll focus on time complexity analysis here.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
