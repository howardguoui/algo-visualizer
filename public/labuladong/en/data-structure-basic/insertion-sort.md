# Insertion Sort with Reverse Thinking

> Source: https://labuladong.online/algo/en/data-structure-basic/insertion-sort/
> Archived: labuladong.online

---

# Insertion Sort with Reverse Thinking

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](<https://leetcode.com/problems/sort-an-array/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Problems of Selection Sort](</en/algo/data-structure-basic/select-sort/>)
  * [Array Operations: Add, Delete, Search, and Update](</en/algo/data-structure-basic/array-basic/>)
  * [Stability: Bubble Sort](</en/algo/data-structure-basic/bubble-sort/>)

Summary

Insertion sort is an optimization based on [Selection Sort](</en/algo/data-structure-basic/select-sort/>), inserting `nums[sortedIndex]` into the sorted array on the left. For arrays with high orderliness, insertion sort is quite efficient.

You can open the visualization panel, click the play button, and then adjust the speed with the accelerate/decelerate buttons to visually experience the insertion sort process:

Algorithm Visualization

In the previous article [Problems of Selection Sort](</en/algo/data-structure-basic/select-sort/>), we analyzed several issues faced by selection sort, then gradually optimized it to develop [Bubble Sort](</en/algo/data-structure-basic/bubble-sort/>), making the sorting algorithm stable and capable of terminating early when the input array is highly ordered, thereby improving efficiency.

To recap, the key point of bubble sort is the optimization of the following code segment:

```python
# Perform the first wave of optimization on selection sort to achieve stability
def sort(nums):
    n = len(nums)
    sortedIndex = 0
    while sortedIndex < n:
        # Find the smallest value nums[minIndex] in the unsorted part
        minIndex = sortedIndex
        for i in range(sortedIndex + 1, n):
            if nums[i] < nums[minIndex]:
                minIndex = i

        # Optimization: Insert nums[minIndex] into the position of nums[sortedIndex]
        # Move the elements of nums[sortedIndex..minIndex] one position backward
        minVal = nums[minIndex]
        # Array data moving operation
        for i in range(minIndex, sortedIndex, -1):
            nums[i] = nums[i - 1]
        nums[sortedIndex] = minVal

        sortedIndex += 1
``` 

Algorithm Visualization

To avoid having two for loops inside the while loop, we used a bubble-like method to gradually swap the inversely ordered pairs in `nums[sortedIndex..]`, placing the smallest value at `nums[sortedIndex]`.

Alright, let's pause here. Forget about the optimization method of bubble sort for a moment, and consider whether there are other ways to optimize the above code, turning the two for loops within the while loop into a single for loop?

## Reverse Thinking

The algorithm above follows this idea: find the minimum value in `nums[sortedIndex..]` and insert it at the position `nums[sortedIndex]`.

**Can we reverse this thinking and instead find the position where`nums[sortedIndex]` should be inserted in the already sorted array `nums[0..sortedIndex-1]`, and then insert it**?

Years ago, when I considered optimizing insertion sort, this approach came to mind because I wanted to take advantage of the array's orderliness: since `nums[0..sortedIndex-1]` is already sorted, I could use binary search to find the position where `nums[sortedIndex]` should be inserted.

In this way, the first inner loop in the above code could be optimized to logarithmic complexity.

However, thinking it over, using binary search seems redundant. Even if I find the position where `nums[sortedIndex]` should be inserted using binary search, I still need to shift elements to perform the insertion. It might be simpler and more efficient to just traverse and swap elements:

```python
# further optimize selection sort by inserting elements into the left sorted array
# this algorithm has another name, called insertion sort
def sort(nums):
    n = len(nums)
    # maintain [0, sorted_index) as a sorted array
    sorted_index = 0
    while sorted_index < n:
        # insert nums[sorted_index] into the sorted array [0, sorted_index)
        for i in range(sorted_index, 0, -1):
            if nums[i] < nums[i - 1]:
                # swap(nums[i], nums[i - 1])
                tmp = nums[i]
                nums[i] = nums[i - 1]
                nums[i - 1] = tmp
            else:
                break
        sorted_index += 1
``` 

Algorithm Visualization

Insertion Sort

This algorithm is called **Insertion Sort** , and its process is akin to inserting a newly drawn card into your hand of already sorted cards while playing poker.

Insertion Sort has a space complexity of O(1)O(1)O(1), making it an in-place sorting algorithm. The time complexity is O(n2)O(n^2)O(n2). The number of operations is similar to selection sort, following an arithmetic progression summing to approximately n2/2n^2/2n2/2 operations.

Insertion Sort is a stable sort because it only swaps elements when `nums[i] < nums[i - 1]`, thus preserving the relative order of equal elements.

## The Higher the Initial Order, the Higher the Efficiency

Clearly, the efficiency of insertion sort is greatly related to the order of the input array. Consider extreme cases to understand:

If the input array is already sorted or only a few elements are out of order, the inner for loop of insertion sort barely needs to execute element swaps, so the time complexity is close to O(n)O(n)O(n).

If the input array is completely reversed, the efficiency of insertion sort becomes very low, as the inner for loop must swap all elements in `nums[0..sortedIndex-1]` each time, making the total time complexity approach O(n2)O(n^2)O(n2).

Compared to bubble sort, **the overall performance of insertion sort should be higher than bubble sort**.

Intuitively, the inner for loop of insertion sort only needs to traverse and swap elements in the ordered part `nums[0..sortedIndex-1]` on the left side of `sortedIndex`. In most non-extreme cases, it may not need to traverse all elements of `nums[0..sortedIndex-1]`. In contrast, the inner for loop of bubble sort needs to traverse all elements on the right side `nums[sortedIndex..]` of `sortedIndex` each time.

Thus, the number of operations for bubble sort is approximately n2/2n^2/2n2/2, whereas for insertion sort it is less than n2/2n^2/2n2/2.

You can submit the insertion sort code to LeetCode Problem 912 "[Sort an Array](<https://leetcode.com/problems/sort-an-array/>)". It will still eventually time out, but it demonstrates that the logic of the algorithm is correct. In subsequent articles, we will continue to explore how to optimize sorting algorithms.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
