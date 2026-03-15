# Explore Selection Sort in Depth

> Source: https://labuladong.online/algo/en/data-structure-basic/select-sort/
> Archived: labuladong.online

---

# Explore Selection Sort in Depth

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Key Metrics of Sorting Algorithms](</en/algo/data-structure-basic/sort-basic/>)

Summary in One Sentence

Selection sort is the simplest and most straightforward sorting algorithm, but it has a high time complexity and is not a stable sort. Other basic sorting algorithms are optimizations based on selection sort.

You can open the visualization panel, click the play button, and then adjust the speed using the accelerate/decelerate buttons to intuitively understand the process of selection sort:

Algorithm Visualization

If you are a beginner who has never been exposed to sorting algorithms, that's great; don't rush to look at definitions or similar materials. If you have studied sorting algorithms before, now please forget the definitions and the algorithm code you have memorized.

With the groundwork laid earlier, you have a certain level of programming ability and can solve some basic algorithm problems. On this premise, I would like to share a learning method for your reference:

When encountering a new problem, do not rush to ask someone for a standard answer. Instead, initiate your own thinking. Being spoon-fed a standard answer means missing an opportunity and losing a bit of creativity. If you are spoon-fed too often, you become dull.

There are always some readers who come to me with a worried look, complaining about forgetting algorithm problems after solving them. I actually think this is a good thing. Constant remembrance indicates obsession; forgetting is good, as it means the mind is not yet full, which is an opportunity for independent thinking.

So, returning to the issue, let's seize this opportunity. Now, given an array as input, you're asked to write a sorting algorithm to sort all elements in ascending order. How would you write it? If you have never thought about this problem before, take a few minutes to think about it now.

```
void sort(int[] nums) {
    // your code to sort the elements in nums in ascending order
}
``` 

The first time I thought about this problem, the most straightforward method that came to mind was this:

First, go through the array to find the smallest value and swap it with the first element of the array. Then, iterate through the array again to find the second smallest element and swap it with the second element of the array. Continue this process until the entire array is sorted.

This algorithm is commonly known as "**Selection Sort** ," where you repeatedly traverse to select the smallest element. Here is how it looks in code:

```python
def sort(nums: List[int]) -> None:
    n = len(nums)
    # sortedIndex is a boundary
    # elements with index < sortedIndex are sorted
    # elements with index >= sortedIndex are unsorted
    # initialized to 0, meaning the whole array is unsorted
    sortedIndex = 0
    while sortedIndex < n:
        # find the minimum in the unsorted part [sortedIndex, n)
        minIndex = sortedIndex
        for i in range(sortedIndex + 1, n):
            if nums[i] < nums[minIndex]:
                minIndex = i
        # swap the minimum value with the element at sortedIndex
        nums[sortedIndex], nums[minIndex] = nums[minIndex], nums[sortedIndex]

        # increment sortedIndex by one
        sortedIndex += 1
``` 

The visualization process of the above algorithm is as follows:

Algorithm Visualization

This algorithm is correct and with slight modifications, it can be used as the solution code for LeetCode problem 912, "[Sort an Array](<https://leetcode.com/problems/sort-an-array/>)."

However, this algorithm cannot pass all test cases of problem 912, eventually resulting in a timeout error. This indicates that the algorithm's logic is correct, but the time complexity is too high, exceeding the problem's constraints.

For now, let's set aside how to solve problem 912 and analyze this sorting algorithm according to [Key Indicators of Sorting Algorithms](</en/algo/data-structure-basic/sort-basic/>).

## Is it In-Place Sorting

Yes. The algorithm does not use additional array space for assistance; it only uses a few variables, so the space complexity is O(1)O(1)O(1).

## Time and Space Complexity Analysis

The `sort` function contains a while loop nested within a for loop, which is equivalent to:

```
for (int sortedIndex = 0; sortedIndex < n; sortedIndex++) {
    for (int i = sortedIndex + 1; i < n; i++) {
        // ...
    }
}
``` 

As you can see, this is a nested for loop. The total number of iterations is `(n - 1) + (n - 2) + (n - 3) +... + 1`, which is the sum of an arithmetic sequence, approximately `n^2 / 2`. Therefore, the time complexity of this sorting algorithm in Big O notation is O(n2)O(n^2)O(n2), where `n` is the number of elements in the array to be sorted.

Moreover, note a characteristic of this algorithm: even if the entire array is already sorted, it will still perform `n^2 / 2` operations, meaning the order of the original data has no impact on the algorithm's time complexity.

Focus on the Actual Execution Count of Sorting Algorithms

For general algorithm time and space complexity analysis, we only need to analyze from the perspective of Big O notation, focusing on the magnitude of the highest-order term, and not the coefficients or lower-order terms.

However, when analyzing different sorting algorithms, it is necessary to pay attention to the actual execution count and certain special conditions (such as when the array is already sorted).

Since multiple sorting algorithms may have a complexity of O(n2)O(n^2)O(n2) from the Big O perspective, we need to analyze their merits based on their actual execution counts and performance in special cases.

## Where Does the Time Go? Optimization Ideas?

Now, take a moment to observe the logic of this algorithm and think carefully for a few minutes: is there any possibility to optimize the time complexity?

**Don't underestimate this basic chapter. The thought process I discuss here is the same for any problem you'll face in the future when optimizing time complexity.**

First, if the code is correct but the algorithm's time complexity is still too high, there's only one possibility: **there is redundant computation**.

The redundancy in the above algorithm is quite obvious:

It first traverses `nums[0..]` to find the minimum value, then traverses `nums[1..]` to find the minimum, and then `nums[2..]`, and so on.

But when you traverse `nums[0..]`, you've already gone through all the elements of `nums[1..]` and `nums[2..]`. Why traverse them again?

In theory, you should be able to find the minimum elements of `nums[1..]` and `nums[2..]` while traversing `nums[0..]`, right? If you can do this, wouldn't it eliminate the inner for loop and reduce the time complexity by one order?

Now, we've identified the root of the redundant computation and have an optimization idea. Can this idea be implemented? Can you find the minimum elements of `nums[1..]` and `nums[2..]` while traversing `nums[0..]`?

**I will abstract this and transform the optimization scenario into a new problem** :

Given an array `nums`, calculate a new array `suffixMin` where `suffixMin[i]` represents the minimum value in `nums[i..]`.

If you think forward, if I know the minimum element in `nums[0..]`, can I deduce the minimum in `nums[1..]`?

The answer is no. There's not enough information to deduce `min(nums[1..])` from `min(nums[0..])`, so you'd have to traverse `nums[1..]` again.

But it seems unbelievable that calculating a minimum value is so difficult. Is my brain locked by some invisible force??

If you think backward, if I know the minimum element in `nums[1..]`, can I deduce the minimum in `nums[0..]`?

The answer is yes, `min(nums[0..]) = min(nums[0], min(nums[1..]))`.

With this idea, you can calculate the `suffixMin` array by working backward:

```
int[] nums = new int[]{3, 1, 4, 2};
// suffixMin[i] indicates the minimum value in nums[i..]
int[] suffixMin = new int[nums.length];

// calculate suffixMin from back to front
suffixMin[nums.length - 1] = nums[nums.length - 1];
for (int i = nums.length - 2; i >= 0; i--) {
    suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
}

// [1, 1, 2, 2]
System.out.println(suffixMin);
``` 

Now that we've resolved the issue with computing the `suffixMin` array, let's return to optimizing selection sort. By spending O(n)O(n)O(n) time to traverse the `nums` array and compute the `suffixMin` array, we can obtain the minimum value of any subarray like `nums[1..], nums[2..], ...` in O(1)O(1)O(1) time.

Logically, it seems possible to eliminate the inner for loop of selection sort and optimize the time complexity to O(n)O(n)O(n), right? **The answer is no**.

Take a few minutes to think about why this is not feasible. What is the key issue?

Click to see my thoughts

Some readers might say that selection sort requires the index of the smallest element for swapping, and the `suffixMin` array only stores the minimum element's value, not the index, so it cannot optimize selection sort.

However, we can easily create a new array `minIndex` to record the index of the minimum element while calculating the `suffixMin` array, so this is not the key issue.

**The real issue lies in the swapping operation**.

The `suffixMin` array works correctly under the premise that the `nums` array is immutable. If the value of `nums[i]` changes, all the minimum values stored in `suffixMin[0..i]` become invalid and need to be recalculated.

This is quite understandable. For example, if your `suffixMin[3] = 6`, it means the minimum value in `nums[3..]` is 6. If you change `nums[5] = 2`, then the values in `suffixMin[0..5]` should all become 2, not 6.

The swapping operation in selection sort changes the positions of elements in `nums`, causing the `suffixMin` array to become invalid. This is the essence of the problem.

In summary, all attempts were incorrect, and selection sort cannot be optimized in any way.

So, we spent so much time and tried various methods, yet achieved nothing. Does that mean we failed?

No, I believe this is effective thinking that truly helps readers grasp algorithmic thinking.

For example, the method of precomputing `suffixMin` mentioned above is a classic algorithmic thought, which will be used later in the [Prefix Sum Technique](</en/algo/data-structure/prefix-sum/>). The issue of `suffixMin` becoming invalid due to changes in the `nums` array is also a classic algorithm problem, which will be addressed in [Basics of Segment Trees](</en/algo/data-structure-basic/segment-tree-basic/>).

In the tutorials on this site, I will frequently showcase this thought process. When learning about sorting algorithms later, you can also ponder what fundamentally distinguishes them from selection sort? Why can they reduce the time complexity to below O(n2)O(n^2)O(n2)?

## Stability of Sorting

Please analyze whether this algorithm is stable according to the definition of stability in [Key Metrics of Sorting Algorithms](</en/algo/data-structure-basic/sort-basic/>).

If this algorithm is not stable, what operation causes it to lose its stability? Is it possible to optimize this algorithm to make it stable? Think about it for a few minutes, and then see my understanding.

Click to view the answer

**Selection sort is not a stable sorting algorithm**.

According to the definition of stable sorting, the relative position of identical elements must remain unchanged. A simple example will reveal the instability of this algorithm:

```
[2', 2''', 2'', 1]
``` 

In this example, there are multiple duplicate elements `2`. I use `2'`, `2'''`, `2''` to differentiate these three elements. If this sorting algorithm is stable, the sorted result should maintain the relative order of the three `2`s:

```
[1, 2', 2''', 2'']
``` 

However, in reality, if you mentally run through this algorithm, you'll realize that during the first search for the minimum value, it will definitely swap element `2'` with `1`, disrupting the relative order among the `2`s:

```
[1, 2''', 2'', 2']
``` 

**It is the swap operation that causes selection sort to lose its stability**.

Is there a way to optimize this algorithm to make it stable? The time complexity is already O(n2)O(n^2)O(n2), placing it among the worst sorting algorithms. Can we at least make it stable?

You can think about this problem yourself. In the following sorting algorithms, we will attempt to solve this issue.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
