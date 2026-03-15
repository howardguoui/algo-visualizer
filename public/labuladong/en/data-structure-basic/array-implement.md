# Dynamic Array Code Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/array-implement/
> Archived: labuladong.online

---

# Dynamic Array Code Implementation

Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Array (Sequential Storage) Basics](</en/algo/data-structure-basic/array-basic/>)

## Several Key Points

Below I will give a simple dynamic array implementation. It supports basic add, delete, search, and update. First, here are some key points. When you read the code later, pay special attention to them.

### Key Point 1: Automatic Expansion and Shrinking

In the previous chapter [Array Basics](</en/algo/data-structure-basic/array-basic/>), we only said that when adding elements, the array might need to expand. We did not talk about shrinking.

When using a dynamic array in real code, shrinking is also an important optimization. For example, a dynamic array allocates continuous memory space for 1000 elements, but you only store 10 elements. Then 990 spaces are idle. To avoid wasting resources, we can reduce the storage space. This is shrinking.

Here we use a simple expansion and shrinking strategy:

  * When the number of elements reaches the capacity of the underlying static array, expand the capacity to 2 times;
  * When the number of elements drops to 1/4 of the capacity of the underlying static array, shrink the capacity to 1/2.

### Key Point 2: Index Out-of-Bounds Check

In the code below, there are two methods for index checking: `checkElementIndex` and `checkPositionIndex`. Their only difference is `index < size` versus `index <= size`.

Why can `checkPositionIndex` allow `index == size`? Because `checkPositionIndex` is used for insert operations.

For example, we have an array `nums`. For each existing element, a valid index must satisfy `index < size`:

```
nums = [5, 6, 7, 8]
index   0  1  2  3
``` 

But if we want to insert a new element, the valid positions are not the element indexes, but the gaps between indexes:

```
nums = [ | 5 | 6 | 7 | 8 | ]
index    0   1   2   3   4
``` 

All these gaps are valid insert positions. So `index == size` is also valid. This is the difference between `checkPositionIndex` and `checkElementIndex`.

### Key Point 3: Avoid Memory Leak When Deleting Elements

From the algorithm point of view, we do not care how to handle deleted elements. But in real code, we must be careful about possible memory leaks.

In my code, whenever I delete an element, I set it to `null`. For example in Java:

```
// delete
public E removeLast() {
    E deletedVal = data[size - 1];
    // delete the last element
    // must set the last element to null, or it will cause memory leak
    data[size - 1] = null;
    size--;

    return deletedVal;
}
``` 

Java’s garbage collection is based on reachability analysis using [graph algorithms](</en/algo/data-structure-basic/graph-basic/>). Only when an object can no longer be reached, its memory will be freed. If the GC thinks the object is still reachable, it will not free it.

If you do not run `data[size - 1] = null`, then the reference `data[size - 1]` will still exist. You can still access that object through `data[size - 1]`, so the object is reachable, and its memory will not be freed, causing a memory leak.

Other languages with garbage collection are similar. You should learn the GC mechanism of the language you use. This is the basic requirement for writing bug-free code.

### Other Detail Optimizations

The code below is not a full, production-level implementation. There are many places that can be improved. For example, I use a `for` loop to copy array data. This is not very efficient. Most languages provide faster array copy methods, such as Java’s `System.arraycopy`.

But no matter how you optimize, you still need to move data, so the time complexity is still O(n)O(n)O(n). This article focuses on helping you understand the basic ideas and time complexity of array add/delete/search/update APIs. If you are interested in these details, you can read the standard library source code of your language.

How to Verify Your Implementation?

You can use LeetCode problem 707 “[Design Linked List](<https://leetcode.com/problems/design-linked-list/>)” to test whether your implementation is correct. This problem is about linked lists, but it does not know what data structure you use under the hood. We mainly reuse its test cases to check whether your add/delete/search/update functions are correct.

## Dynamic Array Implementation

```python
class MyArrayList:
    # Default initial capacity
    INIT_CAP = 1

    def __init__(self, init_capacity=None):
        self.data = [None]
        self.size = 0
    
    # Add
    def add_last(self, e):
        cap = len(self.data)
        # Check if data array has enough capacity
        if self.size == cap:
            self._resize(2 * cap)
        # Insert element at the end
        self.data[self.size] = e
        self.size += 1

    def add(self, index, e):
        # Check for index out of bounds
        self._check_position_index(index)

        cap = len(self.data)
        # Check if data array has enough capacity
        if self.size == cap:
            self._resize(2 * cap)

        # Shift data data[index..] -> data[index+1..]
        # Make room for the new element
        for i in range(self.size-1, index-1, -1):
            self.data[i+1] = self.data[i]
        
        # Insert new element
        self.data[index] = e

        self.size += 1

    def add_first(self, e):
        self.add(0, e)

    # Remove
    def remove_last(self):
        if self.size == 0:
            raise Exception("NoSuchElementException")
        cap = len(self.data)
        # Can shrink to save space
        if self.size == cap // 4:
            self._resize(cap // 2)

        deleted_val = self.data[self.size - 1]
        # Remove the last element
        self.data[self.size - 1] = None
        self.size -= 1

        return deleted_val

    def remove(self, index):
        # Check for index out of bounds
        self._check_element_index(index)

        cap = len(self.data)
        # Can shrink to save space
        if self.size == cap // 4:
            self._resize(cap // 2)

        deleted_val = self.data[index]

        # Shift data data[index+1..] -> data[index..]
        for i in range(index + 1, self.size):
            self.data[i - 1] = self.data[i]

        self.data[self.size - 1] = None
        self.size -= 1

        return deleted_val

    def remove_first(self):
        return self.remove(0)

    # Retrieve
    def get(self, index):
        # Check for index out of bounds
        self._check_element_index(index)

        return self.data[index]

    # Update
    def set(self, index, element):
        # Check for index out of bounds
        self._check_element_index(index)
        # Modify data
        old_val = self.data[index]
        self.data[index] = element
        return old_val

    # Utility methods
    def get_size(self):
        return self.size

    def is_empty(self):
        return self.size == 0

    # Resize data capacity to newCap
    def _resize(self, new_cap):
        temp = [None] * new_cap
        for i in range(self.size):
            temp[i] = self.data[i]
        self.data = temp

    def _is_element_index(self, index):
        return 0 <= index < self.size

    def _is_position_index(self, index):
        return 0 <= index <= self.size

    def _check_element_index(self, index):
        if not self._is_element_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    def _check_position_index(self, index):
        if not self._is_position_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    def display(self):
        print(f"size = {self.size}, cap = {len(self.data)}")
        print(self.data)

# Usage example
if __name__ == "__main__":
    arr = MyArrayList(init_capacity=3)

    # Add 5 elements
    for i in range(1, 6):
        arr.add_last(i)

    arr.remove(3)
    arr.add(1, 9)
    arr.add_first(100)
    val = arr.remove_last()

    # 100 1 9 2 3
    for i in range(arr.get_size()):
        print(arr.get(i))
``` 

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
