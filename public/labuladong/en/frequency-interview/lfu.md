# Implementing LFU Cache like Building a Lego

> Source: https://labuladong.online/algo/en/frequency-interview/lfu/
> Archived: labuladong.online

---

# Implementing LFU Cache like Building a Lego

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[460\. LFU Cache](<https://leetcode.com/problems/lfu-cache/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Hash Table Basics](</en/algo/data-structure-basic/hashmap-basic/>)
  * [Implementing Hash Tables](</en/algo/data-structure-basic/hashtable-chaining/>)

In the previous article [Implement LRU by Hand](</en/algo/data-structure/lru-cache/>), we wrote the implementation of the LRU cache eviction algorithm. In this article, we will write another famous cache eviction algorithm: the LFU algorithm.

The eviction policy of LRU is Least Recently Used, which means each time it removes the data that has not been used for the longest time. The eviction policy of LFU is Least Frequently Used, which means each time it removes the data that is used the least often.

The core data structure of the LRU algorithm is the hash linked list `LinkedHashMap`. We use the order of the linked list to keep elements in insertion order, and use the fast access of the hash map to visit any element in O(1) time.

In terms of implementation difficulty, LFU is harder than LRU. LRU is basically sorting data by time, which is easy to do with a linked list. If you always insert at the head of the list, the closer to the head, the newer the data; the closer to the tail, the older the data. When we need to evict, we just remove the element at the tail.

LFU, on the other hand, is like sorting data by access frequency. This is not as simple. There is another condition: if multiple keys have the same frequency, we must remove the one that was inserted earliest. In other words, LFU removes the data with the lowest access frequency. If there are several with the same lowest frequency, we remove the oldest one.

So LFU is much more complex and often appears in interviews. LFU cache is widely used in real systems. It might also be because LRU is too simple. However, for these classic algorithms, the general pattern is fixed. The main difficulty is that the logic is complex, so it is hard to write clean and bug-free code.

In this article, we will break down the LFU algorithm, using a top-down, step-by-step refinement method. This is the key way to solve complex problems.

## 1\. Algorithm Description

You are asked to write a class that takes a `capacity` parameter and implements `get` and `put` methods:

```python
class LFUCache:
    def __init__(self, capacity: int):
        # construct a cache with capacity
        pass

    def get(self, key: int) -> int:
        # query key in the cache
        pass

    def put(self, key: int, val: int) -> None:
        # store key and val in the cache
        pass
``` 

The `get(key)` method looks up key `key` in the cache. If `key` exists, return its `val`; otherwise, return -1.

The `put(key, value)` method inserts or updates the cache. If `key` already exists, update its value to `val`. If `key` does not exist, insert the pair `(key, val)`.

When the cache reaches the capacity `capacity`, and you need to insert a new key-value pair, you must first delete the pair with the lowest frequency (we use `freq` below). If there are multiple pairs with the lowest `freq`, delete the oldest one.

```python
# Construct an LFU cache with a capacity of 2
cache = LFUCache(2)

# Insert two pairs (key, val), both with a frequency of 1
cache.put(1, 10)
cache.put(2, 20)

# Query the value corresponding to key 1
# Return 10, and the frequency of key 1 becomes 2
cache.get(1)

# Capacity is full, evict the key with the smallest frequency, which is 2
# Insert the key-value pair (3, 30), with a frequency of 1
cache.put(3, 30)   

# Key 2 has already been evicted, return -1
cache.get(2)
``` 

## 2\. Idea Analysis

We start from the simplest part. Based on the LFU rules, we can list a few obvious facts during execution:

  1. When calling `get(key)`, we should return the `val` for that `key`.

  2. Each time we access a `key` by `get` or `put`, its `freq` should increase by one.

  3. When the capacity is full and we insert a new key, we must remove the key with the smallest `freq`. If several keys share this smallest `freq`, we remove the oldest among them.

We hope to support all of these in O(1) time. We can use basic data structures to solve them one by one:

  1. Use a `HashMap` to store the mapping from `key` to `val`, so we can quickly do `get(key)`.

```python
keyToVal = {}
``` 

  2. Use another `HashMap` to store the mapping from `key` to `freq`, so we can quickly update the frequency of each `key`.

```python
keyToFreq = {}
``` 

  3. This requirement is the core of the LFU algorithm, so we will discuss it separately:

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
