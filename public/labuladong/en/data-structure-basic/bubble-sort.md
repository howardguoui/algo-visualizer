# Bubble Sort with Stability

> Source: https://labuladong.online/algo/en/data-structure-basic/bubble-sort/
> Archived: labuladong.online

---

# Bubble Sort with Stability

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[912\. Sort an Array](https://leetcode.com/problems/sort-an-array/)|   
  
Prerequisites

Before reading this article, you need to learn:

  * [Problems Faced by Selection Sort](/en/algo/data-structure-basic/select-sort/)
  * [Array Operations: Adding, Removing, Searching, Modifying](/en/algo/data-structure-basic/array-basic/)


Summary in One Sentence

The bubble sort algorithm is an optimization of [selection sort](/en/algo/data-structure-basic/select-sort/), sorting by swapping inverted pairs to the right of `nums[sortedIndex]`, making it a stable sorting algorithm.

You can open the visualization panel, click the play button, and adjust the speed with the accelerate/decelerate buttons to intuitively experience the bubble sort process:

Algorithm Visualization

The previous article explained [selection sort](/en/algo/data-structure-basic/select-sort/), the simplest and most straightforward sorting algorithm, and analyzed several issues that need optimization:

  1. The selection sort algorithm is unstable because it swaps the smallest element with the current element, which may change the relative position of identical elements.

  2. The time complexity of selection sort is unaffected by the initial order of the data. Even if the input is an already sorted array, the time complexity remains O(n2)O(n^2)O(n2).

  3. The time complexity of selection sort is O(n2)O(n^2)O(n2), with approximately n2/2n^2/2n2/2 operations. Conventional optimization strategies cannot reduce this time complexity.


This article will focus on the various shortcomings of selection sort and explore possible solutions.

## ¶Regaining Sorting Stability

Previously, we analyzed the reason for the loss of stability in selection sort, which is that each time it swaps the smallest element (`nums[minIndex]`) with the current element (`nums[sortedIndex]`). This can alter the relative position of identical elements.

If you think carefully about this swapping process, its goal is to place `nums[minIndex]` at `nums[sortedIndex]`. It does not concern itself with where the element at `nums[sortedIndex]` should go. **The reason it uses the swap operation is simply that swapping is the easiest method and doesn't involve data shifting**.

During the swap, placing `nums[minIndex]` at `nums[sortedIndex]` does not affect the relative order of identical elements:
    
    
    [2, 2', 2'', 1, 1']
     ^           ^
    [1, 2', 2'', _, 1']
     ^           ^
    sortedIndex  minIndex

The actual disruption of stability occurs when `nums[sortedIndex]` is moved to `nums[minIndex]`:
    
    
    [1, 2', 2'', 2, 1']
     ^           ^

As you can see, the relative order of `2, 2', 2''` is disrupted.

**Therefore, the direction for optimization lies here. Instead of simply swapping`nums[sortedIndex]` to `nums[minIndex]`, mimic the operation of [inserting an element into the middle of an array](/en/algo/data-structure-basic/array-implement/)**. Shift the elements from `nums[sortedIndex..minIndex]` one position to the right, leaving the position `nums[sortedIndex + 1]` open for `nums[sortedIndex]`.
    
    
    [2, 2', 2'', 1, 1']
     ^           ^
    [1, 2', 2'', _, 1']
     ^           ^
    [1, _, 2', 2'', 1']
     ^           ^
    [1, 2, 2', 2'', 1']
     ^           ^
    sortedIndex  minIndex

As you can see, the relative order of `2, 2', 2''` and `1, 1'` remains unchanged, making selection sort a stable sort.

The specific code is as follows. You only need to modify the part of the [selection sort](/en/algo/data-structure-basic/select-sort/) code where elements are swapped:

CC++GoJavaJavaScriptPython
    
    
    // Perform the first wave of optimization on selection sort to achieve stability
    void sort(int[] nums) {
        int n = nums.length;
        int sortedIndex = 0;
        while (sortedIndex < n) {
            // Find the smallest value nums[minIndex] in the unsorted part
            int minIndex = sortedIndex;
            for (int i = sortedIndex + 1; i < n; i++) {
                if (nums[i] < nums[minIndex]) {
                    minIndex = i;
                }
            }
    
            // Swap the smallest value with the element at sortedIndex
            // int tmp = nums[sortedIndex];
            // nums[sortedIndex] = nums[minIndex];
            // nums[minIndex] = tmp;
    
            // Optimization: Insert nums[minIndex] into the position of nums[sortedIndex]
            // Move the elements of nums[sortedIndex..minIndex] one position backward
            int minVal = nums[minIndex];
            // Array data moving operation
            for (int i = minIndex; i > sortedIndex; i--) {
                nums[i] = nums[i - 1];
            }
            nums[sortedIndex] = minVal;
    
            sortedIndex++;
        }
    }

You can submit this algorithm to LeetCode problem 912 "[Sort an Array](https://leetcode.com/problems/sort-an-array/)". Although it will eventually time out and fail to pass, it can prove the correctness of this algorithm.

**Compared to the standard selection sort, this algorithm gains stability at the cost of reduced execution efficiency.** Although the time complexity of the two nested loops remains O(n2)O(n^2)O(n2) in Big O notation, an additional for loop is added, so the actual number of executions will certainly exceed the n2/2n^2/2n2/2 times of standard selection sort.

Let's see if we can optimize further to avoid this extra for loop.

## ¶Optimizing Time Complexity

Carefully observe the algorithm code above. The while loop mainly does two things:

  1. The first for loop searches for the minimum value in `nums[sortedIndex..]`.

  2. The second for loop inserts this minimum value at the position `nums[sortedIndex]`.


Can we combine these two steps? Specifically, when you're searching for the minimum value in `nums[sortedIndex..]`, can you do something to ensure that once the minimum value is found, it is already in the correct position without needing additional data movement?

The answer is yes. Watch my demonstration:

CC++GoJavaJavaScriptPython
    
    
    // perform a second wave of optimization on selection sort
    // to achieve stability while avoiding additional for loops
    // this algorithm has another name, called bubble sort
    void sort(int[] nums) {
        int n = nums.length;
        int sortedIndex = 0;
        while (sortedIndex < n) {
            // find the minimum value in nums[sortedIndex..]
            // simultaneously move this minimum value step by
            // step to the position of nums[sortedIndex]
            for (int i = n - 1; i > sortedIndex; i--) {
                if (nums[i] < nums[i - 1]) {
                    // swap(nums[i], nums[i - 1])
                    int tmp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = tmp;
                }
            }
            sortedIndex++;
        }
    }

Algorithm Visualization

This optimization is quite clever. It involves reverse traversing `nums[sortedIndex..]`, and swapping if an inversion pair is found, which gradually moves the minimum value to the position `nums[sortedIndex]`.

Moreover, since we only swap adjacent inversion pairs and do not touch elements with the same value, this algorithm is a stable sort.

The time complexity of this algorithm remains O(n2)O(n^2)O(n2), similar to selection sort in terms of actual execution count, also a summation of an arithmetic sequence, approximately n2/2n^2/2n2/2 times.

Bubble Sort

This algorithm is called **Bubble Sort** , because its execution process resembles bubbles rising from the end of the array to the head, each time pushing the minimum value to the correct position.

## ¶Early Termination of the Algorithm

A problem with selection sort mentioned above is that its time complexity is completely unrelated to the initial order of the data. Even if the input array is already sorted, selection sort will still perform O(n2)O(n^2)O(n2) operations.

After a series of optimizations above, this problem can be solved. See the code:

CC++GoJavaJavaScriptPython
    
    
    // further optimize by terminating the algorithm early when the array is sorted
    void sort(int[] nums) {
        int n = nums.length;
        int sortedIndex = 0;
        while (sortedIndex < n) {
            // add a boolean variable to record if a swap operation has been performed
            boolean swapped = false;
            for (int i = n - 1; i > sortedIndex; i--) {
                if (nums[i] < nums[i - 1]) {
                    // swap(nums[i], nums[i - 1])
                    int tmp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = tmp;
                    swapped = true;
                }
            }
            // if no swap operation is performed, it indicates that the array is
            // already sorted, and the algorithm can terminate early
            if (!swapped) {
                break;
            }
            sortedIndex++;
        }
    }

Algorithm Visualization

Thus, the above are a series of optimizations for selection sort, ultimately achieving sorting stability and supporting early termination when the array is sorted. The only regret is that the time complexity remains O(n2)O(n^2)O(n2), without reduction.

Next, we will continue to explore other methods to improve selection sort.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
