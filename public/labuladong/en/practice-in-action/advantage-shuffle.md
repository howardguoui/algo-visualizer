# Advantage Shuffle Algorithm

> Source: https://labuladong.online/algo/en/practice-in-action/advantage-shuffle/
> Archived: labuladong.online

---

# Advantage Shuffle Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[870\. Advantage Shuffle](<https://leetcode.com/problems/advantage-shuffle/>)|   
  
Prerequisites

Before reading this article, you should learn:

  * [Two Pointers Tips Summary](</en/algo/essential-technique/array-two-pointers-summary/>)
  * [Binary Heap Basics](</en/algo/data-structure-basic/binary-heap-basic/>)
  * [Using a Binary Heap to Build a Priority Queue](</en/algo/data-structure-basic/binary-heap-implement/>)

You may have heard the story of Tian Ji horse racing:

Tian Ji and the King of Qi raced horses. Each side had three levels of horses: top, middle, and low. If they race the same level, Tian Ji cannot beat the King of Qi. But Tian Ji met Sun Bin. Sun Bin told him to use Tian Ji’s low horse against the King’s top horse, then use Tian Ji’s top horse against the King’s middle horse, and finally use Tian Ji’s middle horse against the King’s low horse. Tian Ji won 2 out of 3.

This history story is also interesting. Zou Ji, the person who advised the King of Qi, lived in the same time as Tian Ji, and they later became rivals. But that is off topic, so we stop here.

When I learned this story, I wondered: if it was not 3 horses, but 100 horses, could Sun Bin still arrange the order and help Tian Ji win?

At that time I had no good idea. I only felt the key is: try to get an advantage for yourself and cause a loss for the other side. In short:

**If you can win, then fight. If you cannot win, use your worst one to trade with the other side’s best one.**

I did not turn this idea into a real method until I saw LeetCode 870: [Advantage Shuffle](<https://leetcode.com/problems/advantage-shuffle/>). I knew at once this is a stronger version of the Tian Ji horse racing problem:

You are given two arrays `nums1` and `nums2` with the **same length**. Reorder `nums1` to maximize its “advantage”.

If `nums1[i] > nums2[i]`, then `nums1` has an “advantage” at index `i`. Maximizing advantage means: reorder `nums1` so that **as many positions as possible satisfy`nums1[i] > nums2[i]`**.

The function signature is:

```java
int[] advantageCount(int[] nums1, int[] nums2);
``` 

Example input:

```
nums1 = [12,24,8,32]
nums2 = [13,25,32,11]
``` 

Your algorithm should return `[24,32,8,12]`, because in this order, `nums1` has advantage in 3 positions.

**This is like Tian Ji horse racing:`nums1` is Tian Ji’s horses, `nums2` is the King of Qi’s horses. Each number is a horse’s power. You are Sun Bin. Show your real skills.**

Last updated: 03/14/2026, 12:17 AM
