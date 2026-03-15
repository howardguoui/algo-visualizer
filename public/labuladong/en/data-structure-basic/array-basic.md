# Array (Sequential Storage)

> Source: https://labuladong.online/algo/en/data-structure-basic/array-basic/
> Archived: labuladong.online

---

# Array (Sequential Storage)

When we talk about "arrays," we may mean different things, because different programming languages offer different types of arrays and APIs. So, let's clarify what we mean by "array" to make things easier to follow later.

I think arrays can be divided into two main types: **static arrays** and **dynamic arrays**.

**A static array is a block of continuous memory, and we can access each element by using its index. This is the most original form of an array.**

Dynamic arrays are more convenient for coding. Programming languages add useful APIs to static arrays, such as `push`, `insert`, `remove`, and more. With these, you can easily change the array without writing extra code for basic actions.

In this chapter, we will use the most basic static array and try to build our own dynamic array by hand. We will implement the common APIs for add, delete, find, and update. After this, when you use built-in data structures, you will know how they work inside.

With dynamic arrays, you can also build more complex data structures later, like queues, stacks, and hash tables.

## Static Array

You must decide the element type and amount when you create a static array. Only languages like C++, Java, and Golang let you make a static array. Languages like Python and JavaScript do not.

Static arrays are low-level and rarely used in everyday software development or coding problems. Usually, we use dynamic arrays. But it's important to learn the basics.

Here’s how to define a static array:

```java
// define a static array of size 10
int[] arr = new int[10];

// assign values using indices
arr[0] = 1;
arr[1] = 2;

// retrieve values using indices
int a = arr[0];
``` 

That's it. There is not much more you can do with it.

Let’s look at C++ as an example. What happens when we write `int arr[10]`? Here’s what this does:

  1. It creates a continuous piece of memory in RAM, with a size of `10 * sizeof(int)` bytes. In most systems, one int is 4 bytes, so the block uses 40 bytes.
  2. It defines a variable called `arr` that holds the address of the start of this memory.

So what does `arr[1] = 2` do? Here’s how it works:

  1. It calculates the address by taking the array’s starting address and adding `1 * sizeof(int)` bytes (4 bytes) to reach the second item.
  2. It writes the number `2` into the 4 bytes that start at this address.

For Beginners

When I first started college and learned C, some people struggled with the difference between arrays of pointers and pointers to arrays. But once you understand this simple process, it gets much clearer.

  1. Why does an array’s index start at 0? It makes it easy to get the address. `arr[0]` is just the array's starting address. The first 4 bytes from that address store the first item. `arr[1]` is the starting address plus `1 * 4` bytes; from there, the next 4 bytes store the second item, and so on for `arr[2]`, `arr[3]`, etc.

  2. The name of the array, like `arr`, is really the pointer to the start of the memory block. If you use this address directly, you get the first item. In other words, `*arr` is the same as `arr[0]`.

  3. If you don’t use something like `memset` to set the initial values, the values in the array will be random. That's because `int arr[10]` only asks the operating system for a memory block—it doesn’t know what was stored there before. So we usually use `memset` to fill the array with a known value before using it.

All of this is about C/C++. When you use Java or Golang, the system will set all new array items to 0 for you, so you don't need to initialize them yourself.

Let me organize the logic. A static array is a **continuous block of memory**. The statement `int arr[10]` tells us:

  1. We know the starting address of the memory. The array name `arr` points to this address.
  2. We know the type of each element (e.g. int), so we know the size (for int, 4 bytes or 32 bits).
  3. The block is continuous, and total size is `10 * sizeof(int)`, or 40 bytes.

**Because of this, we get the special power of arrays: random access. As long as we know the index, we can get its value in O(1)O(1)O(1) time.**

That is, we use the start address and the index to find the memory location of any element. Memory lookup is considered O(1)O(1)O(1) in computers, so arrays allow O(1)O(1)O(1) random access.

But, a person’s best strength is also sometimes their biggest weakness. This feature of continuous memory makes arrays powerful, but also causes some problems, which we will talk about next.

## Add, Delete, Query, and Update

**The main job of a data structure is to add, delete, search, and update elements.**

Earlier, we talked about the basic idea behind arrays and mainly explained how to read or change the value at a given index—that is, "query" and "update". Now, let's see how "add" and "delete" are done in arrays.

### Add

Adding elements to a static array can be a bit tricky, depending on where you want to add them.

Case 1: Append an element to the end of the array

For example, I have an array of size 10 with 4 elements. If I want to add a new element at the end, what should I do?

It's simple. Just set the value at the next available index. Here is how the code usually looks:

```java
// An array of size 10 already contains 4 elements
int[] arr = new int[10];
for (int i = 0; i < 4; i++) {
    arr[i] = i;
}

// Now want to append an element 4 at the end of the array
arr[4] = 4;

// Then append an element 5 at the end of the array
arr[5] = 5;

// And so on
// ...
``` 

**Since we are just setting a value at a specific index, appending an element to the end of the array takes O(1)O(1)O(1) time.**

Case 2: Insert an element in the middle of the array

Suppose I have an array `arr` of size 10, and the first 4 spots have values. If I want to insert a new element at the 3rd position (index 2 `arr[2]`), what should I do?

Now, we need to "move data", making space for the new element. The steps are as follows:

```java
// An array of size 10 already has 4 elements
int[] arr = new int[10];
for (int i = 0; i < 4; i++) {
    arr[i] = i;
}

// Insert element 666 at the index 2
// Need to move the elements from the index 2 and onwards one step back
// Note that we should traverse the array backwards to avoid
// overwriting existing elements, refer to the visual panel below if unclear
for (int i = 4; i > 2; i--) {
    arr[i] = arr[i - 1];
}

// Now the 3rd position is open, and we can insert the new element
arr[2] = 666;
``` 

Algorithm Visualization

**So, inserting an element in the middle of the array takes O(N)O(N)O(N) time, because you have to shift elements to make space.**

Case 3: The array is full

When you create a static array, its size is fixed. For example, if I create `int arr[10]` (using a 40-byte block of memory), and store 10 elements, what if I want to add one more? There's no room, whether at the end or the middle.

Some may think, "Just add 4 more bytes after the 40 bytes to fit in the new element, right?"

**That won't work. A block of continuous memory must be allocated all at once. You can't simply grow it later.** The space after your array may be used by another program, so you can't just take it.

So, what should we do? You need to get a new, bigger block of memory, copy the original data there, and then add the new element. This is called "expanding" the array.

For example, I create a new, larger array `int arr[20]`. I copy over the old 10 elements. Now there's room for more.

The code logic is something like this:

```java
// the array of size 10 is already full
int[] arr = new int[10];
for (int i = 0; i < 10; i++) {
    arr[i] = i;
}

// now want to append an element 10 at the end of the array
// need to expand the array first
int[] newArr = new int[20];
// copy the original 10 elements
for (int i = 0; i < 10; i++) {
    newArr[i] = arr[i];
}

// the old array's memory space will be handled by the garbage collector
// ...

// append the new element in the new larger array
newArr[10] = 10;
``` 

**So, expanding an array means creating a new bigger array and copying all the values, which takes O(N)O(N)O(N) time.**

### Delete

Deleting elements is similar to adding elements. Different situations need different approaches.

Case 1: Delete the last element in the array

Suppose I have an array of size 10 with 5 elements. If I want to delete the last element, what should I do?

This is easy. Just set the last element to a special value to show it is deleted. For this example, let's use -1 as the special value. When we talk about dynamic arrays later, we’ll learn better ways to delete elements. **The key point is, deleting the last element is just a random access, which takes O(1)O(1)O(1) time.**

Here’s how the code looks:

```java
// An array of size 10 already contains 5 elements
int[] arr = new int[10];
for (int i = 0; i < 5; i++) {
    arr[i] = i;
}

// Delete the last element, temporarily use -1 to represent the deleted element
arr[4] = -1;
``` 

Case 2: Delete an element in the middle of the array

Suppose I have an array of size 10 with 5 elements, and I want to delete the second element (`arr[1]`), what should I do?

Again, we need to "move data". Move all elements after the deleted one forward by one, so the array stays in order.

Here is the code logic:

```java
// An array of size 10 already contains 5 elements
int[] arr = new int[10];
for (int i = 0; i < 5; i++) {
    arr[i] = i;
}

// delete arr[1]
// need to move all elements after arr[1] one position forward
// note that you should traverse the array forward to avoid
// overwriting, refer to the visualization panel below if you don't understand
for (int i = 1; i < 4; i++) {
    arr[i] = arr[i + 1];
}

// set the last element to -1 to indicate deletion
arr[4] = -1;
``` 

Algorithm Visualization

**So, deleting an element in the middle of the array takes O(N)O(N)O(N) time because you have to move elements for everything to stay in order.**

### Summary

To sum up, the time complexity for the main operations of static arrays is:

  * Add:
    * Add an element at the end: O(1)O(1)O(1)
    * Insert an element in the middle (not at the end): O(N)O(N)O(N)
  * Delete:
    * Remove the last element: O(1)O(1)O(1)
    * Remove an element from the middle (not the end): O(N)O(N)O(N)
  * Access: Get the value at a given index, time complexity is O(1)O(1)O(1)
  * Update: Modify the value at a given index, time complexity is O(1)O(1)O(1)

Some readers might ask: didn't we just discuss the array resizing operation? When an array expands, it needs to create a new space and copy data, which takes O(N)O(N)O(N) time. Why isn't this included in the "add" operation's complexity?

That's a good question. But resizing doesn't happen every time you add an element. We use "amortized time complexity" to explain this. I have explained this in detail in [How to Analyze Time and Space Complexity](</en/algo/essential-technique/complexity-analysis/>). I won't go further into that here.

Another thing beginners should notice: we say the access and update operations are O(1)O(1)O(1) complexity, but this is only true when you know the index. If you are given a value and asked to find its index in the array, you have to check the whole array. That takes O(N)O(N)O(N) time.

So, it is important to understand the principles, not just memorize the concepts. If you understand the principles, you can figure out the concepts by yourself.

## Dynamic Arrays

We talked about static arrays and their limitations. Now let's talk about dynamic arrays. A dynamic array is an upgrade of the static array, and it is one of the most commonly used data structures in real software development and algorithm problems.

First, do not think that dynamic arrays can solve the problem of slow insert and delete operations in the middle. That is impossible. The fast random access of an array comes from its continuous memory, which always brings the need for moving data and resizing.

**The underlying storage of dynamic arrays is still a static array. Dynamic arrays automatically handle resizing for us, and also wrap the add, delete, access, and update operations for easier use.**

Here are some ways to use dynamic arrays in different programming languages:

```java
// create a dynamic array
// no need to explicitly specify array size, it will
// automatically resize based on the number of elements stored
ArrayList<Integer> arr = new ArrayList<>();

for (int i = 0; i < 10; i++) {
    // append elements at the end, time complexity O(1)
    arr.add(i);
}

// insert elements in the middle, time complexity O(N)
// insert element 666 at index 2
arr.add(2, 666);

// insert elements at the beginning, time complexity O(N)
arr.add(0, -1);

// remove the last element, time complexity O(1)
arr.remove(arr.size() - 1);

// remove elements in the middle, time complexity O(N)
// remove element at index 2
arr.remove(2);

// query element by index, time complexity O(1)
int a = arr.get(0);

// modify element by index, time complexity O(1)
arr.set(0, 100);

// find index by element value, time complexity O(N)
int index = arr.indexOf(666);
``` 

In the following chapters, I will teach you step by step how to implement a dynamic array, so you can understand its internal workings better.

Last updated: 03/14/2026, 12:17 AM
