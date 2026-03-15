# Weighted Random Selection Algorithm

> Source: https://labuladong.online/algo/en/frequency-interview/random-pick-with-weight/
> Archived: labuladong.online

---

# Weighted Random Selection Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[528\. Random Pick with Weight](<https://leetcode.com/problems/random-pick-with-weight/>)|   
  
Prerequisites

Before reading this article, you should be familiar with:

  * [Prefix Sum Techniques](</en/algo/data-structure/prefix-sum/>)
  * [Binary Search Explained](</en/algo/essential-technique/binary-search-framework/>)

I got inspired to write this article while playing League of Legends mobile. A friend of mine was complaining about getting terrible teammates in ranked matches. I told him I thought my ranked teammates were pretty solid—they didn't seem that bad to me.

He gave me this knowing look and said: "Usually, when players with high MMR can't find teammates at their skill level, they get matched with... weaker players."

Wait, what? I thought about it for a second. Something didn't add up. Was he saying my MMR was low, or was he calling me the weak player?

I immediately challenged him to duo queue with me to prove I wasn't the weak link—he was. I'll let you guess how that went.

After that game, I came here to write this article because it got me thinking about how matchmaking systems work.

![diagram](https://labuladong.online/images/algo/random-weight/images.png)

**I don't know if "hidden MMR" is actually a thing. Matchmaking is the backbone of any competitive game, so it's probably way more complex than a few simple metrics.**

But if we simplify this whole hidden MMR concept, it becomes an interesting algorithmic problem: how does the system randomly match players with different probabilities?

Or to put it more simply: how do you make weighted random selections?

Don't think it's trivial. Sure, if you have an array of length `n` and need to randomly pick an element with equal probability, that's easy—just generate a random index in `[0, n-1]` and each element has a `1/n` chance of being selected.

But what if each element has a different weight, where the weight determines the probability of selecting that element? How would you write an algorithm to randomly pick elements based on those weights?

LeetCode problem 528, "[Random Pick with Weight](<https://leetcode.cn/problems/random-pick-with-weight/>)," is exactly this problem:

**528\. Random Pick with Weight** |[LeetCode](<https://leetcode.com/problems/random-pick-with-weight/>)

You are given a **0-indexed** array of positive integers `w` where `w[i]` describes the **weight** of the `ith` index.

You need to implement the function `pickIndex()`, which **randomly** picks an index in the range `[0, w.length - 1]` (**inclusive**) and returns it. The **probability** of picking an index `i` is `w[i] / sum(w)`.

  * For example, if `w = [1, 3]`, the probability of picking index `0` is `1 / (1 + 3) = 0.25` (i.e., `25%`), and the probability of picking index `1` is `3 / (1 + 3) = 0.75` (i.e., `75%`).

**Example 1:**

```
Input
["Solution","pickIndex"]
[[[1]],[]]
Output
[null,0]

Explanation
Solution solution = new Solution([1]);
solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.
``` 

**Example 2:**

```
Input
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
Output
[null,1,1,1,1,0]

Explanation
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.

Since this is a randomization problem, multiple answers are allowed.
All of the following outputs can be considered correct:
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......
and so on.
``` 

**Constraints:**

  * `1 <= w.length <= 104`
  * `1 <= w[i] <= 105`
  * `pickIndex` will be called at most `104` times.

The problem is from [LeetCode 528. Random Pick with Weight](<https://leetcode.com/problems/random-pick-with-weight/>).

Let's think through this problem and solve weighted random selection.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
