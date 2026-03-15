# Sliding Window: Rabin Karp Algorithm

> Source: https://labuladong.online/algo/en/practice-in-action/rabinkarp/
> Archived: labuladong.online

---

# Sliding Window: Rabin Karp Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[187\. Repeated DNA Sequences](<https://leetcode.com/problems/repeated-dna-sequences/>)|   
[28\. Find the Index of the First Occurrence in a String](<https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/>)|   
  
Prerequisite

Before reading this article, you need to learn:

  * [Hash Table Basics](</en/algo/data-structure-basic/hashmap-basic/>)
  * [Sliding Window Algorithm Framework](</en/algo/essential-technique/sliding-window-framework/>)

Many readers ask me to explain some classic algorithms. I think this is important for a few reasons:

  1. Classic algorithms are classic because they have unique and interesting ideas. So we should learn them together.

  2. I will start from the simplest and most basic ideas, and guide you to understand how these classic algorithms are designed. This can help you write the solutions naturally, remove your fear of algorithms, and avoid the bad habit of memorizing algorithms without understanding.

Today, let's talk about the classic Rabin-Karp string matching algorithm.

In this article, I will explain the main idea of this algorithm in a simple way. First, we start from converting a string to a number. Then, we will look at a LeetCode problem. In the end, you will see that the Rabin-Karp algorithm is actually using the sliding window technique, just like the [Sliding Window Algorithm Framework](</en/algo/essential-technique/sliding-window-framework/>) we discussed before. There is no need to memorize it.

Let's get started.

First, let me ask you a basic question: If you are given a string that represents a positive integer, how do you convert it to a number? It's very simple. The code below does this:

```python
s = "8264"
number = 0
for i in range(len(s)):
    # convert character to number
    number = 10 * number + (ord(s[i]) - ord('0'))
    print(number)
# print output:
# 8
# 82
# 826
# 8264
``` 

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
