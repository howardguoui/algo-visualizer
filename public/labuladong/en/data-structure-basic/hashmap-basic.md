# Basic Concept of HashMap

> Source: https://labuladong.online/algo/en/data-structure-basic/hashmap-basic/
> Archived: labuladong.online

---

# Basic Concept of HashMap

Prerequisite

Before reading this article, you should first learn:

  * [Basics of Arrays (Sequential Storage)](</en/algo/data-structure-basic/array-basic/>)

First, I want to clear up a common misunderstanding for beginners.

Are hash tables and the Map (key–value mapping) we often talk about the same thing? No.

In Java this is very clear. `Map` is a Java interface. It only declares some methods and does not give their concrete implementation:

```
interface Map<K, V> {
    V get(K key);
    void put(K key, V value);
    V remove(K key);
    // ...
}
``` 

The Map interface only defines a set of operations for key–value mappings. A data structure like `HashMap` implements these operations in its own way. Other data structures also implement this interface, such as `TreeMap`, `LinkedHashMap`, and so on.

In other words, you can say the time complexity of `get, put, remove` in `HashMap` is all O(1)O(1)O(1), but you cannot say all methods of the `Map` interface are O(1)O(1)O(1). If you change the implementation class, for example to `TreeMap` which uses a binary tree inside, the complexity of these methods becomes O(log⁡N)O(\log N)O(logN).

Why do I stress this point? Mainly for readers who do not use Java.

Other languages may not have such a clear interface definition as Java. So it is easy to mix up hash tables and key–value Maps, and assume that as long as you see key–value operations, the time for insert, delete, search, and update must be O(1)O(1)O(1). This is wrong. It depends on how the underlying data structure implements the key–value operations.

In this chapter, we will implement a hash table by hand. We will see why a hash table can support insert, delete, search, and update in O(1)O(1)O(1) on average, and we will talk about two ways to handle hash collisions.

## Basic idea of a hash table

You can think of a hash table as an enhanced array.

With an array, you can get the element by its index in O(1)O(1)O(1) time. The index is a non‑negative integer.

A hash table is similar. You can use a `key` to find the corresponding `value` in O(1)O(1)O(1) time. The type of `key` can be numbers, strings, and many other types.

How does this work? It is very simple. The bottom layer of a hash table is just an array (let’s call it `table`). It first passes the `key` into a hash function (let’s call it `hash`) to convert it into an index of the array. Then the insert, delete, search, and update operations are almost the same as operations on an array:

```java
// Pseudocode logic for a hash table
class MyHashMap {

    private Object[] table;

    // Insert/Update, complexity O(1)
    public void put(K key, V value) {
        int index = hash(key);
        table[index] = value;
    }

    // Retrieve, complexity O(1)
    public V get(K key) {
        int index = hash(key);
        return table[index];
    }

    // Delete, complexity O(1)
    public void remove(K key) {
        int index = hash(key);
        table[index] = null;
    }

    // Hash function, converting key into a valid index in the table
    // The time complexity must be O(1) to ensure that
    // the above methods all have complexity O(1)
    private int hash(K key) {
        // ...
    }
}
``` 

In a real implementation, there are many details: how to design the hash function, how to handle hash collisions, and so on. But once you understand the core idea above, you are already halfway there. The rest is just coding, which is not that hard.

Next, we will look at some key concepts in these operations and the problems that may appear.

## Key concepts and principles

### `key` is unique, `value` can repeat

In a hash table, two entries cannot have the same `key`, but `value` can be repeated.

If you understand the principle above, this is easy. Just compare it with an array:

**In an array, every index is unique. You cannot have two index 0 positions in one array. But what values you store in the array does not matter; nobody cares.**

A hash table is the same. The `key` values must be unique, but the `value` can be anything and can repeat.

### Hash Function

A hash function turns an input of any length (the key) into a fixed-length output (the index).

You have seen that all operations (insert, delete, search, update) use the hash function to compute the index. If your hash function has time complexity O(N)O(N)O(N), then all hash table operations will also be O(N)O(N)O(N). So the performance of this function is very important.

The function must also ensure that the same `key` always gives the same output, or the hash table will be broken. You cannot get `hash("123") = 5` now, and later `hash("123") = 6`.

How does a hash function turn a non-integer `key` into an integer index? How does it ensure the index is valid?

How to turn `key` into an integer

There are many ways to do this. Different hash functions use different methods. Here we use Java as an example. Other languages are similar. You can use this idea and then read the standard library docs of your language.

Any Java object has an `int hashCode()` method. If you do not override it in your custom class, the default return value can be seen as the memory address of the object. A memory address is a globally unique integer.

So if we just call `key.hashCode()`, we can turn `key` into an integer, and this integer is globally unique.

Of course, this method has some problems. We will talk about them later. But at least we now have a way to turn any object into an integer.

How to ensure the index is valid

`hashCode` returns an int. First problem: this int may be negative, but array indices must be non-negative.

You may want to write code like this to make it non-negative:

```
int h = key.hashCode();
if (h < 0) h = -h;
``` 

But this has a problem. The smallest int is `-2^31`, and the largest is `2^31 - 1`. So if `h = -2^31`, then `-h = 2^31`, which is larger than the max int. This is integer overflow. It can cause errors or even undefined results.

Why is the minimum `-2^31` and the maximum `2^31 - 1`? This comes from how two’s complement works. Simply put, an int has 32 bits. The highest (leftmost) bit is the sign bit. If it is 0, the number is positive; if it is 1, the number is negative.

Now we want `h` to be non-negative, but we cannot just use the minus sign. A simple way is to use the two’s complement rule and clear the highest sign bit to 0. Then `h` must be non-negative:

```
int h = key.hashCode();
// Bit operation to clear the highest sign bit
// Bit operations are usually faster than arithmetic operations
h = h & 0x7fffffff;
// 0x7fffffff in binary is 0111 1111 ... 1111
// The highest bit is 0, all other bits are 1
// After & with any int, the highest bit becomes 0, so h is non-negative
``` 

We will not go deeper into two’s complement here. You can search and learn it if you are interested.

Now we solved the negative `hashCode` problem. But another problem remains: `hashCode` is usually very large. We need to map it into a valid index of the `table` array.

This should not be hard for you. In [Circular Array Principles and Implementation](</en/algo/data-structure-basic/cycle-array/>), we used `%` (mod) to keep the index inside the array range. Here we can also use `%` to make the index valid. The full `hash` function is:

```
int hash(K key) {
    int h = key.hashCode();
    // Make it non-negative
    h = h & 0x7fffffff;
    // Map it to a valid index in table
    return h % table.length;
}
``` 

Of course, using `%` directly also has a downside. The `%` operation is slower. In performance-critical standard library code, they try to avoid `%` and use bit operations instead.

But in this chapter, our goal is to help you understand how to build a simple hash table, so we ignore such optimizations. If you are interested, you can read the Java HashMap source and see how it implements the `hash` function.

### Hash Collision

We have defined the `hash` function. Now, what if two different `key`s get the same index from the hash function? This is called a hash collision.

Can hash collisions be avoided?

Hash collisions cannot be avoided. We can only handle them correctly in the algorithm.

Collisions must happen, because the `hash` function maps an infinite key space into a finite index space. Different `key`s will inevitably map to the same index.

It is like mapping a 3D object to a 2D shadow. This is lossy compression. Information is lost, so you cannot keep a perfect one-to-one mapping.

How do we handle collisions? Two common methods are **separate chaining** and **linear probing** (also called **open addressing**).

The idea is simple: one is extending vertically, the other is extending horizontally:

![diagram](https://labuladong.online/images/algo/ds-basic/hash-collision-en.jpeg)

In separate chaining, the hash table array does not directly store the `value`. It stores a linked list. If multiple different `key`s map to the same index, all these `key -> value` pairs are stored in the linked list at that index. This solves the collision.

In linear probing, if one `key` finds that its `index` is already used by another `key`, it goes to `index + 1`. If that is also used, it keeps going forward until it finds an empty slot.

For example, in the figure, the insert order of keys is `k2, k4, k5, k3, k1`. Then the bottom array of the hash table looks like this:

![diagram](https://labuladong.online/images/algo/ds-basic/hash-collision-with-key-en.jpeg)

Here we only talk about the idea. In later sections, we will implement both methods step by step to handle hash collisions.

### Resizing and Load Factor

You may have heard the term “load factor”. Now that you understand hash collisions, you can also understand what load factor means.

Both separate chaining and linear probing can solve hash collisions, but they will hurt performance.

For example, with separate chaining: you compute `index = hash(key)`, then go to that index. You find a linked list there, so you must scan that list to find the `value` you want. This takes time O(K)O(K)O(K), where `K` is the length of that list.

Linear probing is similar. You compute `index = hash(key)`, go to that index, but the stored `key` is not the one you want. Because of linear probing, you cannot be sure the `key` does not exist. You must keep moving forward until you find an empty slot or find that `key`. This also takes time O(K)O(K)O(K), where `K` is the number of steps you probe.

So if hash collisions happen often, `K` becomes large, and the hash table becomes slow. We want to avoid this.

Why do hash collisions happen frequently? Two reasons:

  1. The hash function is not good, so the hash values are not evenly spread, and many `key`s map to the same index.

  2. The hash table already stores too many `key-value` pairs. Even if the hash function is perfect, collisions cannot be avoided.

There is nothing much we can do about the first problem. The authors of language standard libraries have already designed good hash functions. You just call them.

The second problem is under our control. We can avoid making the hash table too full. This leads to the idea of “load factor”.

Load Factor

The load factor measures how full a hash table is. In general, the larger the load factor, the more `key-value` pairs there are in the table, the higher the chance of collisions, and the worse the performance.

**The formula for load factor is`size / table.length`.** Here `size` is the number of `key-value` pairs in the hash table, and `table.length` is the capacity of the underlying array.

For a hash table using separate chaining, the load factor can be arbitrarily large, because the linked lists can grow without limit. For a hash table using linear probing, the load factor cannot be greater than 1.

In Java’s `HashMap`, you can set the load factor when you create the hash table. If you do not set it, the default is `0.75`. This value comes from experience; usually you just keep the default.

**When the number of elements reaches the load factor threshold, the hash table will resize.** This is similar to what we did when we implemented a [dynamic array](</en/algo/data-structure-basic/array-implement/>): we increase the capacity of the underlying `table` array and move all data to the new bigger array. `size` stays the same, `table.length` grows, so the load factor becomes smaller.

### Why You Cannot Rely on Hash Table Traversal Order

There is a common rule: the order of keys when you iterate over a hash table is not fixed. You should not depend on this order in your code. Why?

Iterating a hash table is, in essence, iterating the underlying `table` array:

```
// Pseudocode: iterate all keys

// The underlying table array of the hash table
KVNode[] table = new KVNode[1000];

// Get all keys in the hash table
// We cannot rely on the order of this keys list
List<KeyType> keys = new ArrayList<>();

for (int i = 0; i < table.length; i++) {
    KVNode node = table[i];
    if (node != null) {
        keys.add(node.key);
    }
}
``` 

If you understood what we discussed earlier, you can already see the reason.

First, because the `hash` function maps your `key` to an index, the positions of keys in the `table` array look random. It is not like an array or linked list, where elements have a clear order.

Second, we just said that when a hash table reaches the load factor threshold, it resizes: `table.length` changes and elements are moved.

When we move data, we must use the `hash` function again to compute the index of each `key` in the new `table` array.

**The index produced by the`hash` function depends on `table.length`. So after automatic resizing, the same `key` may be stored at a different index than before. As a result, the traversal order will also change.**

In practice, you may see this: the first key from one traversal is `key1`, but after inserting or deleting some elements, you traverse again and `key1` might appear near the end.

So you do not need to memorize this rule. Once you understand the principles, you can reason it out yourself.

### Why You Should Not Add/Delete Keys During a for Loop

Note: I say “not recommended”, not “never allowed”. Different languages implement hash tables differently. Some languages have special handling for this case. Whether it is allowed or not must be checked in the documentation.

Here, we only look at the principle. Adding or deleting keys during a for loop over a hash table can easily cause problems, for the same reason as above: resizing changes hash results.

Iterating over the keys of a hash table is really just iterating over the `table` array. If you change elements (insert or delete) while iterating, and these operations trigger resizing halfway, then the entire `table` will change. What should the code do after that? Also, should the new or deleted elements be included in the same traversal?

Resizing and changing key order is a behavior special to hash tables, but even if we ignore this, for any data structure, it is not recommended to modify it while you are iterating it. This easily leads to unexpected behavior.

If you really want to do this, read the documentation carefully and make sure you understand exactly what will happen.

### `key` must be immutable

**Only immutable types can be used as hash table`key`. This is very important.**

Immutable type means: once the object is created, its value cannot change.  
For example, in Java, `String` and `Integer` are immutable. After you create them, you can only read the value, not change it.

In contrast, Java’s `ArrayList` and `LinkedList` are mutable. After creation, you can freely add or remove elements, so they are mutable types.

So you can use `String` as the `key` of a hash table, but you should not use `ArrayList` as a `key`:

```
// You can use immutable types as key
Map<String, AnyOtherType> map1 = new HashMap<>();
Map<Integer, AnyOtherType> map2 = new HashMap<>();

// You should not use mutable types as key
// Note: this is valid syntax, but the code is very likely to have bugs
Map<ArrayList<Integer>, AnyOtherType> map3 = new HashMap<>();
``` 

Why is it not recommended to use a mutable type as `key`?  
Take `ArrayList` as an example. Its `hashCode` is implemented roughly like this:

```
public int hashCode() {
    int h = 0;
    for (int i = 0; i < elementData.length; i++) {
        h = 31 * h + elementData[i];
    }
}
``` 

**First problem: performance.**  
Each time you compute `hashCode`, you must scan the whole array. Time complexity is O(N)O(N)O(N).  
Then all operations (insert, delete, search, update) on the hash table will also become O(N)O(N)O(N).

A more serious problem: the `hashCode` of an `ArrayList` depends on its elements.  
If you add or remove elements, or if some element’s `hashCode` changes, then the `ArrayList`’s `hashCode` will also change.

For example, you use an `ArrayList` variable `arr` as a key and store a value in the hash table.  
Later, some code modifies `arr`. Then `arr`’s `hashCode` changes.  
If you now use this `arr` to query the hash table, you won’t find the value.

**In other words, the`key-value` pair you put into the hash table has “disappeared”.  
This is a very serious bug and can also cause memory leak.**

```
public class Test {
    public static void main(String[] args) {
        // Wrong example:
        // Use a mutable type as HashMap key
        Map<ArrayList<Integer>, Integer> map = new HashMap<>();

        ArrayList<Integer> arr = new ArrayList<>();
        arr.add(1);
        arr.add(2);

        map.put(arr, 999);
        System.out.println(map.containsKey(arr)); // true
        System.out.println(map.get(arr)); // 999

        arr.add(3);
        // Serious bug: key-value pair is "lost"
        System.out.println(map.containsKey(arr)); // false
        System.out.println(map.get(arr)); // null

        // In fact, the key-value pair for arr is still in the underlying table of map.
        // But because arr's hashCode has changed, this pair can no longer be found.
        // This can also cause memory leak, because arr is still
        // referenced by map and cannot be garbage-collected.
    }
}
``` 

This is a simple wrong example.  
You may think: if we remove the element `3`, won’t the pair `arr -> 999` come back?  
Or we can just iterate the internal `table` array of the hash table to see the pair.

Come on, are you writing code or writing a ghost story?  
The key-value pair appears and disappears. Is your hash table haunted?

Joking aside: mutability itself brings uncertainty.  
In a huge messy codebase, how can you know where `arr` was changed?

So the right way is: use immutable types as hash table `key`.  
For example, use `String` as `key`. A `String` in Java cannot change after it is created, so the above problem will not happen.

The `hashCode` of `String` also needs to scan all characters.  
But because `String` is immutable, once the hash is computed, it can be cached.  
So the [average time complexity](</en/algo/essential-technique/complexity-analysis/>) is still O(1)O(1)O(1).

I used Java as an example, but other languages are similar.  
You should read the documentation of your language’s standard library.  
Understand how the hash table computes hash values for objects. This helps you avoid such bugs.

## Summary

Now we have connected all the key ideas behind hash tables.  
Let’s summarize with a few typical interview questions:

**1\. Why do we say insert, delete, search, and update in a hash table are O(1)O(1)O(1)?**

Because a hash table is basically operating on an array.  
The main cost is computing the index using the hash function and dealing with collisions.  
If the hash function is O(1)O(1)O(1) and collisions are handled well, then all operations are O(1)O(1)O(1).

**2\. Why can the iteration order of a hash table change?**

When the load factor is reached, the hash table expands.  
This changes the size of the underlying array, so the index computed by the hash function changes.  
As a result, the traversal order also changes.

**3\. Are insert, delete, search, and update always O(1)O(1)O(1)?**

No. Only if the hash function is O(1)O(1)O(1) and collisions are handled well.  
If you use a wrong `key` type, like `ArrayList` as in the example, the complexity can degrade to O(N)O(N)O(N).

**4\. Why must we use immutable types as hash table`key`?**

Because all main operations depend on the index from the hash function.  
If the key’s hash value can change, key-value pairs can “disappear” and cause serious bugs.

You need to know some source code details of your language’s standard library.  
Only then can you write correct and efficient code.

Next, I will show you step by step how to implement simple hash tables using separate chaining and linear probing to deepen your understanding of hash tables.

Last updated: 03/14/2026, 12:17 AM
