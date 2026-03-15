# BitMap Principles and Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/bitmap/
> Archived: labuladong.online

---

# BitMap Principles and Implementation

Summary in One Sentence

A bitmap is a space-saving data structure. It uses a single bit (0 or 1) to mark whether an element exists.

When solving algorithm problems, we often use a boolean array like `boolean[] visited` to track whether elements in an array have been visited.
    
    
    // Suppose nums is an array of 1000 integers
    int[] nums = {...}
    
    // When writing algorithms,
    // we might use a boolean array to record which elements in nums have been visited
    boolean[] visited = new boolean[nums.length];
    visited[10] = true;
    visited[100] = true;

Let's look closely at this situation. Is there any room to optimize?

A boolean only has two states: `true` or `false`. In theory, we only need 1 bit (0 or 1) to store it.

But in most programming languages, because of memory alignment and other reasons, a boolean value usually takes up 1 byte (8 bits) of memory.

This means a built-in boolean array actually wastes 7 out of 8 bits of memory for each element.

So can we optimize this? The answer is yes.

Tip

When writing code or solving algorithm problems, using the built-in boolean array is good enough. **Only when the data size is very large, should you use a bitmap to save memory. Otherwise, it is not necessary to introduce extra complexity just to save some memory.**

For example, the [Bloom filter](/en/algo/data-structure-basic/bloom-filter/) needs to handle huge data. That is why it uses a bitmap for optimization.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
