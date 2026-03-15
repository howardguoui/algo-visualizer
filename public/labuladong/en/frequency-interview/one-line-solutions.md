# LeetCode Problems with One Line Solution

> Source: https://labuladong.online/algo/en/frequency-interview/one-line-solutions/
> Archived: labuladong.online

---

# LeetCode Problems with One Line Solution

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[292\. Nim Game](<https://leetcode.com/problems/nim-game/>)|   
[877\. Stone Game](<https://leetcode.com/problems/stone-game/>)|   
[319\. Bulb Switcher](<https://leetcode.com/problems/bulb-switcher/>)|   
  
Below are three interesting "brain teasers" I summarized during my problem-solving journey. Although they can be solved using algorithmic programming, a little thought can reveal patterns to directly find the answer.

## 1\. Nim Game

LeetCode Problem 292 "[Nim Game](<https://leetcode.com/problems/nim-game/>)" provides the following game rules:

You and your friend face a pile of stones and take turns to remove 1 to 3 stones. The player who removes the last stone wins.

Assuming both of you are very smart and you start first, write an algorithm that takes a positive integer `n` and returns whether you can win (true or false).

For example, if there are 4 stones, the algorithm should return false. No matter whether you take 1, 2, or 3 stones, your opponent can take the remainder and win, leaving you with no options to win.

At first glance, this problem can be solved using dynamic programming since the original problem clearly has subproblems that overlap. However, since both players are smart, involving strategic play against each other, dynamic programming can become complex.

**The solution to such problems often involves thinking in reverse** :

If I can win, on my last turn there must be 1 to 3 stones left so I can take them all.

How do I create such a scenario? Obviously, if the opponent faces 4 stones on their turn, no matter how they play, they will leave 1 to 3 stones for me to win.

How can I force the opponent to face 4 stones? I need to ensure that when I play, there are 5 to 7 stones left, ensuring my opponent faces the 4-stone scenario.

How do I create a situation with 5 to 7 stones? By making the opponent face 8 stones, no matter how they play, they will leave 5 to 7 stones for me to win.

This cycle continues, and we realize that stepping on a multiple of 4 is a trap. Once trapped in multiples of 4, you can never escape and will always lose. Thus, the solution to this problem is very simple:

```python
class Solution:
    def canWinNim(self, n: int) -> bool:
        # If you start on a multiple of 4, just admit defeat
        # Otherwise, you can control the opponent to a multiple of 4 and be guaranteed to win
        return n % 4 != 0
``` 

## II. Stone Game

The rules of LeetCode Problem 877 "[Stone Game](<https://leetcode.com/problems/stone-game/>)" are as follows:

You and your friend are facing a row of stone piles, represented by an array `piles`, where `piles[i]` denotes the number of stones in the `i`-th pile. You take turns to pick a pile of stones, but you can only take stones from the leftmost or rightmost pile. The winner is the one with more stones after all stones are taken.

**Assume both of you are very clever** , and you start picking first. Write an algorithm that takes an array `piles` as input and returns whether you can win (true or false).

Note that the number of piles is even, so both of you will take the same number of piles. The total number of stones is odd, meaning you cannot end up with the same amount of stones, so there is always a winner.

For example, with `piles = [2, 1, 9, 5]`, you start first and can pick 2 or 5, and you choose 2.

`piles = [1, 9, 5]`, your opponent's turn, can pick 1 or 5, and chooses 5.

`piles = [1, 9]`, your turn, you pick 9.

Finally, your opponent has to pick 1.

In this case, you have a total of `2 + 9 = 11` stones, while your opponent has `5 + 1 = 6` stones, so you can win, and the algorithm should return true.

Notice, it’s not just about picking the larger number. Why choose 2 instead of 5 initially? Because after taking 5, the 9 is exposed to your opponent, leading to a loss.

This highlights why both players being clever is crucial, as the algorithm seeks the optimal decision-making process to determine if you can win.

This problem involves a two-player game and can be approached with dynamic programming, which may seem complex. However, a deeper understanding of the rules reveals: as long as you are clever enough, you are guaranteed to win because you go first.

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        return True
``` 

The reason for this is that the problem has two important conditions: first, the total number of stone piles is even, and the total number of stones is odd. These two conditions, which seem to increase the fairness of the game, actually make it a game of exploiting others. Let's explain with `piles=[2, 1, 9, 5]`, assuming these four piles are indexed from left to right as 1, 2, 3, and 4.

If we divide these four piles into two groups based on the odd and even indices, i.e., piles 1 and 3, and piles 2 and 4, the number of stones in these two groups will definitely be different. This means one group will have more stones than the other. Because the total number of stones is odd, it cannot be evenly divided.

As the first person to take stones, you can control whether you take all the even-indexed piles or all the odd-indexed piles.

You can initially choose either pile 1 or pile 4. If you want the even-indexed piles, you take pile 4. This leaves your opponent with only piles 1 and 3 to choose from. No matter how they take, pile 2 will be exposed for you to take next. Similarly, if you want the odd-indexed piles, you take pile 1, leaving your opponent with only piles 2 and 4. No matter how they take, pile 3 will be exposed for you.

In other words, you can observe in the first step whether the total number of stones in the odd-indexed piles is greater than or less than that in the even-indexed piles. Then, by planning your moves carefully, you can control the game entirely. Knowing this loophole allows you to outsmart unsuspecting players.

## 3\. The Light Bulb Switch Problem

The rule for LeetCode Problem 319, "[Bulb Switcher](<https://leetcode.com/problems/bulb-switcher/>)," is as follows:

There are `n` light bulbs, all initially turned off. You will perform `n` rounds of operations:

In the 1st round, toggle the switch of every bulb (turn all on).

In the 2nd round, toggle the switch of every second bulb (toggle bulbs 2, 4, 6... they are turned off).

In the 3rd round, toggle the switch of every third bulb (toggle bulbs 3, 6, 9... some are turned off, like 3, and some are turned on, like 6)...

This process continues until the `n`th round, where only the `n`th bulb's switch is toggled.

Given a positive integer `n` representing the number of bulbs, how many bulbs are on after `n` rounds of operations?

We could use a boolean array to represent the switch states of the bulbs, simulate the operations, and count the results. However, this method lacks elegance; the best solution is as follows:

```python
class Solution:
    def bulbSwitch(self, n: int) -> int:
        return int(n**0.5)
``` 

What? How is this problem related to square roots? Actually, the solution is quite clever. If no one tells you the solution, it might be hard to figure out.

First, since all the lights start off, a light that ends up being on must be toggled an odd number of times.

Let's assume there are only 6 lights, and we focus on the 6th light. We need to go through 6 rounds of operations, right? So, how many times will the 6th light be toggled? It's not hard to see that it will be toggled in the 1st, 2nd, 3rd, and 6th rounds.

Why are the 1st, 2nd, 3rd, and 6th rounds toggled? Because `6=1*6=2*3`. Generally, factors come in pairs, meaning the switch is usually toggled an even number of times. However, there are special cases. For example, if there are 16 lights, how many times will the 16th light be toggled?

`16 = 1*16 = 2*8 = 4*4`

Here, the factor 4 appears twice, so the 16th light will be toggled 5 times, an odd number. Now you should understand why this problem is related to square roots.

But we want to find out how many lights are on at the end, right? What does taking the square root directly mean? Think about it a bit, and it will make sense.

Assume there are 16 lights. We take the square root of 16, which is 4. This means that at the end, 4 lights will be on. These are the lights at positions `1*1=1`, `2*2=4`, `3*3=9`, and `4*4=16`.

Even if the square root of some `n` is a decimal, converting it to an integer acts as an upper bound. All integers below this bound, when squared, will be the indices of the lights that are on at the end. So, directly converting the square root to an integer gives us the answer to this problem.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
