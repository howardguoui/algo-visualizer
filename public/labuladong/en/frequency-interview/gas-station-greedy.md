# Two Approaches for Gas Station Problem

> Source: https://labuladong.online/algo/en/frequency-interview/gas-station-greedy/
> Archived: labuladong.online

---

# Two Approaches for Gas Station Problem

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[134\. Gas Station](<https://leetcode.com/problems/gas-station/>)|   
  
Today, we discuss a story of a greedy old driver, specifically LeetCode problem 134 ["Gas Station"](<https://leetcode.com/problems/gas-station/>):

**134\. Gas Station** |[LeetCode](<https://leetcode.com/problems/gas-station/>)

There are `n` gas stations along a circular route, where the amount of gas at the `ith` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `ith` station to its next `(i + 1)th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return _the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return_ `-1`. If there exists a solution, it is **guaranteed** to be **unique**

**Example 1:**

```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
``` 

**Example 2:**

```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
``` 

**Constraints:**

  * `n == gas.length == cost.length`
  * `1 <= n <= 105`
  * `0 <= gas[i], cost[i] <= 104`

The problem is from [LeetCode 134. Gas Station](<https://leetcode.com/problems/gas-station/>).

The problem is straightforward: at each station `i`, you can add `gas[i]` liters to your tank, but leaving station `i` requires `cost[i]` liters. The question is from which station can you start to complete a loop and return.

For the brute-force solution, it's easy to think of using a for loop to traverse all stations, assuming each as the starting point, and then embedding another for loop to check if you can make a full circle back to the start:

```
int n = gas.length;
for (int start = 0; start < n; start++) {
    int tank = 0;
    for (int step = 0; step < n; step++) {
        int i = (start + step) % n;
        tank += gas[i];
        tank -= cost[i];
        // If the fuel in the tank is less than 0, it means the next station cannot be reached
        if (tank < 0) {
            break;
        }
    }
}
``` 

Obviously, the time complexity is O(N2)O(N^2)O(N2). Such a straightforward method is not optimal, and we should analyze if there is room for optimization.

Does the brute-force solution involve repeated calculations? Can we abstract a "state," and are we recalculating the same "state" multiple times?

In our previous article [Dynamic Programming Explained](</en/algo/essential-technique/dynamic-programming-framework/>), we mentioned that variables represent "states." In the brute-force process, the variables are "starting point" and "current fuel in the tank." However, the combination of these two states can easily exceed O(N2)O(N^2)O(N2), leaving no space for optimization.

**Thus, this problem cannot be solved by simply pruning to improve the efficiency of the brute-force solution. Instead, we need to discover some deeper hidden patterns to reduce redundant calculations**.

Below, we introduce two clever methods to solve this problem: the mathematical graph method and the greedy method.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
