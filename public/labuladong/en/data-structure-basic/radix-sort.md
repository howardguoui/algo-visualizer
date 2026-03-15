# Radix Sort

> Source: https://labuladong.online/algo/en/data-structure-basic/radix-sort/
> Archived: labuladong.online

---

# Radix Sort

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](https://leetcode.com/problems/sort-an-array/)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Key Metrics of Sorting Algorithms](/en/algo/data-structure-basic/sort-basic/)
  * [Counting Sort](/en/algo/data-structure-basic/counting-sort/)


Summary in One Sentence

Radix Sort is an extension of the [Counting Sort](/en/algo/data-structure-basic/counting-sort/) algorithm. Its main idea is to perform counting sort on each digit of the elements to be sorted, one at a time. Since counting sort is stable, once counting sort is completed for each digit, all elements are sorted.

Click on the line of code `let maxLen = 0` to see how the algorithm converts array elements into non-negative numbers; click multiple times on the line `countSort(nums, k)` to perform counting sort on each digit; finally, click on the line `nums[i] -= offset` to convert the array elements back to their original values, completing the sort:

Algorithm Visualization

First, let us clarify the term Radix Sort.

The term "Radix" refers to the base of a number system. For example, the radix of the decimal system is 10, while for the binary system, it is 2. From the name, we can infer that this sorting algorithm is related to numerical bases, which means it is not a general-purpose sorting algorithm. The data to be sorted must be integers or convertible to integers through some rule to use radix sort.

I have noticed that many online sources group radix sort with bucket sort, considering radix sort as an application of bucket sort.

However, I disagree with this view. I believe radix sort is an extension of counting sort, used to address the high space complexity of counting sort, and has little to do with bucket sort.

Now that you have already learned [Counting Sort](/en/algo/data-structure-basic/counting-sort/) and [Bucket Sort](/en/algo/data-structure-basic/bucket-sort/), you can reflect on whether radix sort is an extension of counting sort or bucket sort after I explain its principles.

## ¶Principles of Radix Sort

The principle of radix sort is quite simple. For example, if the input array consists of three-digit numbers, `nums = [329, 457, 839, 439, 720, 355, 350]`, we first sort by the units digit, then by the tens digit, and finally by the hundreds digit. This completes the sorting of the entire array.

**The key here is that the sorting of each digit must be stable; otherwise, the final result will be incorrect.**

Let's use the `nums` array as an example to demonstrate the process of radix sort. I will write each number vertically to make it easier to see the effect of sorting each digit.

First, the initial state:
    
    
    329
    457
    839
    439
    720
    355
    350

Performing a stable sort based on the unit digit results in:
    
    
    720
    350
    355
    457
    329
    839
    439
      ^

Next, perform a stable sort based on the tens digit to obtain:
    
    
    720
    329
    839
    439
    350
    355
    457
     ^

Finally, perform a stable sort based on the hundreds place to obtain:
    
    
    329
    350
    355
    439
    457
    720
    839
    ^

The above is the process of radix sort. Before providing the solution code, let's address some questions about radix sort:

  1. Why must a stable sort be used for each digit?

  2. What stable sorting method is preferable, and why?

  3. What if the numbers in the array to be sorted are not all three-digit numbers? What if there are negative numbers?

  4. Must sorting be done from the least significant digit to the most significant digit? Can it be reversed, sorting from the most significant digit to the least significant digit?


### ¶Why a Stable Sort is Necessary for Each Digit

Here's a simple example:
    
    
    56
    57

The units place is already sorted, and now we need to sort by the tens place.

The tens digit is 5 for both numbers. A stable sort ensures that the order of these two 5s remains unchanged, resulting in a correct final order. However, if an unstable sort is used, the order of these 5s might get disrupted, leading to an incorrect result.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
