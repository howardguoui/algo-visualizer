# Circular Array Technique and Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/cycle-array/
> Archived: labuladong.online

---

# Circular Array Technique and Implementation

Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Array (Sequential Storage) Basics](</en/algo/data-structure-basic/array-basic/>)

One-Sentence Summary

The circular array trick uses the modulo (remainder) operation to turn a normal array into a logical circular array. This allows us to add and remove elements at the head of the array in O(1)O(1)O(1) time.

## How Circular Arrays Work

Can an array really be circular? Of course not. An array is a block of linear, continuous memory. There is no real “circle” in memory.

But we can make an array circular in a _logical_ way. For example, look at this code:

```java
// array of length 5
int[] arr = new int[]{1, 2, 3, 4, 5};
int i = 0;
// simulate a circular array, this loop will never end
while (i < arr.length) {
    System.out.println(arr[i]);
    i = (i + 1) % arr.length;
}
``` 

**The key of this code is the modulo operator`%`, which means remainder.** When `i` reaches the last element of the array, `(i + 1) % arr.length` becomes `0` again. That means we jump back to the first element, and we can keep looping forever. This creates a circular array in logic.

This is the circular array trick. How can it help us add or remove elements at the head of the array in O(1)O(1)O(1) time?

Like this: suppose we have an array of length 6, and it currently has only 3 elements. We mark empty positions with `_`:

```
[1, 2, 3, _, _, _]
``` 

Now we want to delete the head element `1`. We can change the array to:

```
[_, 2, 3, _, _, _]
``` 

We only mark the position of `1` as empty. We do not move any data.

Now, if we want to add elements `4` and `5` at the head, we can change the array to:

```
[4, 2, 3, _, _, 5]
``` 

You can see that when there is no space at the head, it goes around and puts the new element at the tail.

Core Idea

The above is just to give you an intuitive feeling. The key of a circular array is that it maintains two pointers: `start` and `end`. `start` points to the index of the first valid element, and `end` points to the index of the next position after the last valid element.

So, when we add or remove elements at the head, we only move `start`. When we add or remove elements at the tail, we only move `end`.

When `start` or `end` moves out of the array range (`< 0` or `>= arr.length`), we use the modulo operator `%` to make them wrap around to the head or tail of the array and keep working. This is how we get the effect of a circular array.

## Hands-On Practice

Reading about it only gets you so far—you really need to try it yourself.

I've built a simple circular array in the visualization panel. Try clicking `arr.addLast` or `arr.addFirst` in the code below, and pay attention to how the `start, end` pointers and the elements in `arr` change:

Algorithm Visualization

## Code Implementation

Key Point: Pay Attention to Interval Boundaries

In my code, the circular array's range is defined as a left-closed, right-open interval—that is, the interval `[start, end)` contains the array elements. All other methods are built on top of this left-closed, right-open convention.

You might be wondering: why left-closed, right-open? What if I want both ends open, or both ends closed?

**In theory, you can design the interval however you like, but left-closed, right-open is generally the most convenient to work with.**

Here's why: when you initialize `start = end = 0`, the interval `[0, 0)` contains no elements. But as soon as you move `end` one position to the right, the interval `[0, 1)` contains exactly one element at index `0`.

If you use a fully open interval instead, moving `end` one position to the right gives you `(0, 1)`, which still contains no elements. If you use a fully closed interval, the initial interval `[0, 0]` already contains one element. Both of these cases introduce unnecessary headaches for boundary handling, and you'd need special-case logic in your code to deal with them.

Finally, here's the code implementation:

```java
public class CycleArray<T> {
    private T[] arr;
    private int start;
    private int end;
    private int count;
    private int size;

    public CycleArray() {
        this(1);
    }

    @SuppressWarnings("unchecked")
    public CycleArray(int size) {
        this.size = size;
        // Since Java does not support direct creation of
        // generic arrays, type casting is used here
        this.arr = (T[]) new Object[size];
        // start points to the index of the first valid element, closed interval
        this.start = 0;
        // remember that end is an open interval,
        // that is, end points to the next position index of the last valid element
        this.end = 0;
        this.count = 0;
    }

    // Helper function for automatic resizing
    @SuppressWarnings("unchecked")
    private void resize(int newSize) {
        // Create a new array
        T[] newArr = (T[]) new Object[newSize];
        // Copy elements from the old array to the new array
        for (int i = 0; i < count; i++) {
            newArr[i] = arr[(start + i) % size];
        }
        arr = newArr;
        // Reset start and end pointers
        start = 0;
        end = count;
        size = newSize;
    }

    // Add element to the start of the array, time complexity O(1)
    public void addFirst(T val) {
        // When the array is full, expand to twice its original size
        if (isFull()) {
            resize(size * 2);
        }
        // Since start is a closed interval, move left first, then assign value
        start = (start - 1 + size) % size;
        arr[start] = val;
        count++;
    }

    // Remove element from the start of the array, time complexity O(1)
    public void removeFirst() {
        if (isEmpty()) {
            throw new IllegalStateException("Array is empty");
        }
        // Since start is a closed interval, assign value first, then move right
        arr[start] = null;
        start = (start + 1) % size;
        count--;
        // If the number of elements in the array is reduced to one-fourth
        // of the original size, reduce the array size by half
        if (count > 0 && count == size / 4) {
            resize(size / 2);
        }
    }

    // Add element to the end of the array, time complexity O(1)
    public void addLast(T val) {
        if (isFull()) {
            resize(size * 2);
        }
        // Since end is an open interval, assign value first, then move right
        arr[end] = val;
        end = (end + 1) % size;
        count++;
    }

    // Remove element from the end of the array, time complexity O(1)
    public void removeLast() {
        if (isEmpty()) {
            throw new IllegalStateException("Array is empty");
        }
        // Since end is an open interval, move left first, then assign value
        end = (end - 1 + size) % size;
        arr[end] = null;
        count--;
        // Shrink
        if (count > 0 && count == size / 4) {
            resize(size / 2);
        }
    }

    // Get the first element of the array, time complexity O(1)
    public T getFirst() {
        if (isEmpty()) {
            throw new IllegalStateException("Array is empty");
        }
        return arr[start];
    }

    // Get the last element of the array, time complexity O(1)
    public T getLast() {
        if (isEmpty()) {
            throw new IllegalStateException("Array is empty");
        }
        // end is an open interval, pointing to the next element's position, so subtract 1
        return arr[(end - 1 + size) % size];
    }

    public boolean isFull() {
        return count == size;
    }
    
    public int size() {
        return count;
    }

    public boolean isEmpty() {
        return count == 0;
    }
}
``` 

## Food for Thought

Does inserting or removing elements at the head of an array really have to be O(N)O(N)O(N)?

The conventional wisdom is that inserting or removing at the head of an array costs O(N)O(N)O(N) time because you need to shift elements. But with a circular array, you can actually achieve O(1)O(1)O(1) time complexity for head insertions and deletions.

Of course, the circular array we implemented above only provides `addFirst, removeFirst, addLast, removeLast`. It doesn't include some of the methods from [our earlier dynamic array implementation](</en/algo/data-structure-basic/array-implement/>), like deleting an element at a specific index, accessing an element at a specific index, or inserting at a specific index.

But think about it—can't a circular array support these operations too? And would the time complexity be any worse than a regular array?

Not really.

A circular array can delete an element at a given index. It still requires shifting elements, just like a regular array, so the complexity is O(N)O(N)O(N).

A circular array can access an element at a given index (random access). The only difference is that instead of accessing the index directly, you compute the real index using `start`. But both the computation and the access are still O(1)O(1)O(1).

A circular array can insert an element at a given index. Again, this requires shifting elements, same as a regular array, so the complexity is O(N)O(N)O(N).

Think about whether this is true. And if it is, why don't the standard library dynamic array implementations in most programming languages use the circular array technique under the hood?

Last updated: 03/14/2026, 12:17 AM
