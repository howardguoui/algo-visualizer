# Binary Search Follow-up

> Source: https://labuladong.online/algo/en/essential-technique/binary-search-left-open/
> Archived: labuladong.online

---

# Binary Search Follow-up

Prerequisites

Before reading this article, it is recommended to first learn:

  * [Core Binary Search Template](</en/algo/essential-technique/binary-search-framework/>)

This article is a supplement to [Core Binary Search Template](</en/algo/essential-technique/binary-search-framework/>). It introduces another common way to write binary search: using a left-closed, right-open search interval.

The first article recommends the left-closed, right-closed style `[left, right]`. It is easier to remember and unifies the three main cases. But many codes online use the left-closed, right-open style `[left, right)`. This article helps you understand the logic of this style, so you will not be confused when you see other people's code.

There is no absolute advantage between the two styles. Use whichever you like. As long as you fully understand the idea of a **search interval** , you can write both styles correctly.

## Left-Closed, Right-Open Search Interval

The key difference in the left-closed, right-open style is how you initialize `right`:

```
// Left-closed, right-closed style
int right = nums.length - 1;  // right is the last index

// Left-closed, right-open style
int right = nums.length;      // right is an out-of-bounds index
``` 

We set `right` to `nums.length`. Since index `nums.length` is out of bounds, the right side is an open interval. The search interval becomes `[left, right)`.

The `while` loop condition must change accordingly.

In the left-closed, right-closed style `[left, right]`, when the loop `while (left <= right)` ends, we have `left == right + 1`, so the interval `[right+1, right]` is empty. That is correct.

In the left-closed, right-open style `[left, right)`, to make sure the search interval is empty when the algorithm stops, we should use `while (left < right)`. When the loop ends we have `left == right`, so the interval `[left, left)` is empty.

The boundary updates are also different.

In the left-closed, right-closed style, index `mid` has already been checked, so we must remove it from the search interval. The next interval is `[left, mid-1]` or `[mid+1, right]`.

In the left-closed, right-open style, index `mid` is also removed from the interval, but the next interval becomes `[left, mid)` or `[mid+1, right)`.

If you understand these changes, you are ready to write correct binary search code. Next we will look at three cases: searching for a value, searching for the left boundary, and searching for the right boundary.

## Search for a Value

Based on the left-closed, right-open interval, we can write the code to find the index of a target value.

Search for `target` in `nums`. If it exists, return its index; otherwise return -1:

```
int binary_search(int[] nums, int target) {
    // right is initialized to nums.length
    // search interval is [left, right)
    int left = 0, right = nums.length;

    // use < instead of <=, because when left == right, the interval is empty
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            // next search interval is [mid+1, right)
            left = mid + 1;
        } else if (nums[mid] > target) {
            // next search interval is [left, mid)
            right = mid;
        }
    }
    return -1;
}
``` 

## Search for the Left Boundary

Here is the left-closed, right-open version for searching the left boundary:

```python
def left_bound(nums: List[int], target: int) -> int:
    # search for the left boundary
    if len(nums) == 0:
        return -1
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            # when target is found, shrink the right boundary
            right = mid
        elif nums[mid] < target:
            left = mid + 1
        elif nums[mid] > target:
            right = mid
    return left
``` 

The `while` condition and the updates of `left` and `right` are the same as above, so we will not repeat them. We only explain the differences.

### Why does this code find the left boundary?

The key is how we handle `nums[mid] == target`:

```
if (nums[mid] == target) {
    // shrink the right boundary
    right = mid;
}
``` 

Each time we find `target`, we do not return. Instead, we move the right boundary to the left and continue searching in `[left, mid)`. This keeps shrinking to the left side and finally locks the left boundary.

### What is returned if `target` does not exist?

If `target` does not exist, `left_bound` returns the index of the **smallest element greater than`target`**.

You do not need to memorize this. Just look at an example: `nums = [2,3,5,7], target = 4`. The return value is 2, because 5 is the smallest element greater than 4.

If you want to return -1 when `target` does not exist, just add an extra check on `nums[left]` before returning:

```
// if out of bounds, target does not exist, return -1
if (left < 0 || left >= nums.length) {
    return -1;
}
// check whether nums[left] equals target
if (nums[left] != target) {
    return -1;
}
// nums[left] == target, this is the answer
return left;
``` 

## Search for the Right Boundary

Here is the left-closed, right-open version for the right boundary:

```python
# Search for the right boundary
def right_bound(nums: list[int], target: int) -> int:
    if len(nums) == 0:
        return -1
    left, right = 0, len(nums)

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            # When target is found, shrink the left boundary
            left = mid + 1
        elif nums[mid] < target:
            left = mid + 1
        elif nums[mid] > target:
            right = mid
    return left - 1
``` 

### Why does this code find the right boundary?

Again, the key is how we handle `nums[mid] == target`:

```
if (nums[mid] == target) {
    // shrink the left boundary
    left = mid + 1;
}
``` 

When we find `target`, we do not return. Instead, we move the left boundary to the right with `left = mid + 1` and keep searching in `[mid+1, right)`. This keeps shrinking to the right side and finally locks the right boundary.

### Why do we return `left - 1`?

Because we must update `left` using `left = mid + 1`. So when the `while` loop ends, `nums[left]` is guaranteed to be not equal to `target`. But `nums[left - 1]` may be equal to `target`.

![diagram](https://labuladong.online/images/algo/binary-search/3.jpg)

Since the loop ends when `left == right`, we can return either `left - 1` or `right - 1`.

### What is returned if `target` does not exist?

This is the opposite of `left_bound`: if `target` does not exist, `right_bound` returns the index of the **largest element smaller than`target`**.

Example: `nums = [2,3,5,7], target = 4`. The return value is 1, because 3 is the largest element smaller than 4.

If you want to return -1 when `target` does not exist:

```
if (left - 1 < 0 || left - 1 >= nums.length) {
    return -1;
}
if (nums[left - 1] != target) {
    return -1;
}
return left - 1;
``` 

## Comparison of the Two Styles

| Left-closed, right-closed `[left, right]`| Left-closed, right-open `[left, right)`  
---|---|---  
`right` initialized| `nums.length - 1`| `nums.length`  
`while` condition| `left <= right`| `left < right`  
when loop ends| `left == right + 1`| `left == right`  
shrink right boundary| `right = mid - 1`| `right = mid`  
shrink left boundary| `left = mid + 1`| `left = mid + 1`  
  
As long as you understand the idea of a “search interval”, you will not miss elements, and both styles will work correctly.

Personally I prefer the [left-closed, right-closed style](</en/algo/essential-technique/binary-search-framework/>) from the earlier article. All three cases can share one template, and you only need to change the code inside the `nums[mid] == target` condition.

For more practice and use cases of binary search, see [Binary Search In Real World](</en/algo/frequency-interview/binary-search-in-action/>) and [More Binary Search Exercises](</en/algo/problem-set/binary-search/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
