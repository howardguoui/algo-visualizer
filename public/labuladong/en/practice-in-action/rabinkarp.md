# Sliding Window: Rabin Karp Algorithm

> Source: https://labuladong.online/algo/en/practice-in-action/rabinkarp/
> Archived: labuladong.online

---

# Sliding Window: Rabin Karp Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[187\. Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/)|   
[28\. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)|   
  
Prerequisite

Before reading this article, you need to learn:

  * [Hash Table Basics](/en/algo/data-structure-basic/hashmap-basic/)
  * [Sliding Window Algorithm Framework](/en/algo/essential-technique/sliding-window-framework/)


Many readers ask me to explain some classic algorithms. I think this is important for a few reasons:

  1. Classic algorithms are classic because they have unique and interesting ideas. So we should learn them together.

  2. I will start from the simplest and most basic ideas, and guide you to understand how these classic algorithms are designed. This can help you write the solutions naturally, remove your fear of algorithms, and avoid the bad habit of memorizing algorithms without understanding.


Today, let's talk about the classic Rabin-Karp string matching algorithm.

In this article, I will explain the main idea of this algorithm in a simple way. First, we start from converting a string to a number. Then, we will look at a LeetCode problem. In the end, you will see that the Rabin-Karp algorithm is actually using the sliding window technique, just like the [Sliding Window Algorithm Framework](/en/algo/essential-technique/sliding-window-framework/) we discussed before. There is no need to memorize it.

Let's get started.

First, let me ask you a basic question: If you are given a string that represents a positive integer, how do you convert it to a number? It's very simple. The code below does this:

CC++GoJavaJavaScriptPython
    
    
    String s = "8264";
    int number = 0;
    for (int i = 0; i < s.length(); i++) {
        // convert the character to a number
        number = 10 * number + (s.charAt(i) - '0');
        System.out.println(number);
    }
    // print output:
    // 8
    // 82
    // 826
    // 8264

Last updated: 03/14/2026, 12:17 AM

Loading comments...
