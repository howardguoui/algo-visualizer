# Classic DP: Egg Drop

> Source: https://labuladong.online/algo/en/dynamic-programming/egg-drop/
> Archived: labuladong.online

---

# Classic DP: Egg Drop

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[887\. Super Egg Drop](<https://leetcode.com/problems/super-egg-drop/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Dynamic Programming Core Framework](</en/algo/essential-technique/dynamic-programming-framework/>)

This article discusses a classic algorithm problem: given several floors and several eggs, you need to determine the minimum number of attempts required to find the highest floor from which an egg can be dropped without breaking. This problem is frequently asked in interviews at major Chinese companies as well as Google and Facebook. However, they often change the context to throwing cups or bowls instead of eggs to avoid wastage.

We'll get to the specific problem shortly. This problem has numerous solution techniques, including several different dynamic programming approaches with varying efficiencies, and finally, an extremely efficient mathematical solution. Consistent with the style of this book, we avoid overly complex techniques that are not broadly applicable, as they are not worth the effort to learn.

Let's now use the general dynamic programming approach we've emphasized to analyze this problem.

## 1\. Understanding the Problem

This is LeetCode problem 887: [Super Egg Drop](<https://leetcode.com/problems/super-egg-drop/>). I will explain the problem:

You have a building with floors numbered from 1 to `N`. You are given `K` eggs (`K` is at least 1). There is a floor `F` (where `0 <= F <= N`). If you drop an egg from floor `F`, it will **not break**. If you drop an egg from any floor higher than `F`, it will break. If you drop an egg from any floor lower than `F`, it will not break. If the egg does not break, you can pick it up and use it again.

Now, the question is: In the **worst case** , what is the **minimum** number of tries needed to find floor `F`?

In other words, you need to find the highest floor `F` where the egg does not break. But what does "minimum number of tries in the worst case" mean? Let’s look at some examples.

First, let’s ignore the limit on the number of eggs. If there are 7 floors, how do you find the floor where the egg just breaks?

The most basic way is linear search: drop the egg from the 1st floor. If it does not break, try the 2nd floor. If it does not break, try the 3rd floor, and so on.

With this method, the **worst case** is when you reach the 7th floor and the egg still does not break (`F = 7`). So you need to drop the egg 7 times.

Now you should understand what "worst case" means. **The egg only breaks when you have tried all possible floors**. If the egg breaks on the 1st floor, you are just lucky; that is not the worst case.

Now, what does "minimum number of tries" mean? Still ignoring the egg limit, if there are 7 floors, we can use a better strategy.

The best idea is to use binary search. First, drop the egg from the middle floor: `(1 + 7) / 2 = 4`.

If the egg breaks, then `F` is less than 4. Try the middle of 1 to 3.

If the egg does not break, then `F` is at least 4. Try the middle of 5 to 7.

With this strategy, the **worst case** is either when `F = 7` and the egg never breaks, or when `F = 0` and the egg always breaks. But in both worst cases, you only need to try `log7` rounded up, which is 3. This is fewer than 7, so this is the **minimum** number of tries.

Actually, if there is no limit on the number of eggs, binary search is clearly the best strategy. But in this problem, you **have a limit on the number of eggs`K`, so you cannot always use binary search**.

For example, if you have only 1 egg and 7 floors, can you use binary search? If you drop the egg from the 4th floor and it does not break, you can try higher floors. But if it breaks, you have no eggs left and cannot test any more floors, so you cannot find the exact floor `F`.

In this case, you can only use linear search, try floors one by one from the bottom. In the worst case, you need 7 tries, so the answer is 7.

Some readers may think: Binary search eliminates floors the fastest. What if you use binary search first, and only switch to linear search when there is 1 egg left? Is this the best way?

Unfortunately, no. For example, if there are 100 floors and 2 eggs, you drop the first egg at floor 50. If it breaks, you must do linear search from floor 1 to 49. In the worst case, you need 50 tries.

If you don’t do "binary search", but do "divide by 5" or "divide by 10", you can reduce the number of tries. For example, drop the first egg every 10 floors. When it breaks, use the second egg to check the floors one by one. In this way, you need at most 20 tries. The best answer is actually 14. There are many possible good strategies, but there is no simple rule.

After all this explanation, the goal is to make sure you understand the problem. This problem is really complex, even for humans. So how can we solve it with an algorithm?

Last updated: 03/14/2026, 12:17 AM
