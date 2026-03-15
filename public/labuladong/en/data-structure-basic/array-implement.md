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

```java
import java.util.Arrays;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class MyArrayList<E> {
    // The underlying array that actually stores data
    private E[] data;
    // Tracks the current number of elements
    private int size;
    // Default initial capacity
    private static final int INIT_CAP = 1;

    public MyArrayList() {
        this(INIT_CAP);
    }

    public MyArrayList(int initCapacity) {
        data = (E[]) new Object[initCapacity];
        size = 0;
    }

    // Add
    public void addLast(E e) {
        int cap = data.length;
        // Check if the array capacity is sufficient
        if (size == cap) {
            resize(2 * cap);
        }
        // Insert the element at the end
        data[size] = e;
        size++;
    }

    public void add(int index, E e) {
        // Check for index out of bounds
        checkPositionIndex(index);

        int cap = data.length;
        // Check if the array capacity is sufficient
        if (size == cap) {
            resize(2 * cap);
        }

        // Shift data from data[index..] to data[index+1..]
        // Make space for the new element
        for (int i = size - 1; i >= index; i--) {
            data[i + 1] = data[i];
        }

        // Insert the new element
        data[index] = e;

        size++;
    }

    public void addFirst(E e) {
        add(0, e);
    }

    // Remove
    public E removeLast() {
        if (size == 0) {
            throw new NoSuchElementException();
        }
        int cap = data.length;
        // Can shrink to save space
        if (size == cap / 4) {
            resize(cap / 2);
        }

        E deletedVal = data[size - 1];
        // Remove the last element
        // Must set the last element to null to avoid memory leaks
        data[size - 1] = null;
        size--;

        return deletedVal;
    }

    public E remove(int index) {
        // Check for index out of bounds
        checkElementIndex(index);

        int cap = data.length;
        // Can shrink to save space
        if (size == cap / 4) {
            resize(cap / 2);
        }

        E deletedVal = data[index];

        // Shift data from data[index+1..] to data[index..]
        for (int i = index + 1; i < size; i++) {
            data[i - 1] = data[i];
        }

        data[size - 1] = null;
        size--;

        return deletedVal;
    }

    public E removeFirst() {
        return remove(0);
    }

    // Get
    public E get(int index) {
        // Check for index out of bounds
        checkElementIndex(index);

        return data[index];
    }

    // Set
    public E set(int index, E element) {
        // Check for index out of bounds
        checkElementIndex(index);
        // Modify the data
        E oldVal = data[index];
        data[index] = element;
        return oldVal;
    }

    // Utility methods
    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    // Resize the array to newCap
    private void resize(int newCap) {
        E[] temp = (E[]) new Object[newCap];

        for (int i = 0; i < size; i++) {
            temp[i] = data[i];
        }

        data = temp;
    }

    private boolean isElementIndex(int index) {
        return index >= 0 && index < size;
    }

    private boolean isPositionIndex(int index) {
        return index >= 0 && index <= size;
    }

    
    // Check if the index position can hold an element
    private void checkElementIndex(int index) {
        if (!isElementIndex(index))
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
    }

    
    // Check if the index position can add an element
    private void checkPositionIndex(int index) {
        if (!isPositionIndex(index))
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
    }

    private void display() {
        System.out.println("size = " + size + " cap = " + data.length);
        System.out.println(Arrays.toString(data));
    }

    public static void main(String[] args) {
        // Set initial capacity to 3
        MyArrayList<Integer> arr = new MyArrayList<>(3);

        // Add 5 elements
        for (int i = 1; i <= 5; i++) {
            arr.addLast(i);
        }

        arr.remove(3);
        arr.add(1, 9);
        arr.addFirst(100);
        int val = arr.removeLast();

        for (int i = 0; i < arr.size(); i++) {
            System.out.println(arr.get(i));
        }
    }

}
``` 

Last updated: 03/14/2026, 12:17 AM
