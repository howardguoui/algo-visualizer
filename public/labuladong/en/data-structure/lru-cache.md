# Implementing LRU Cache like Building a Lego

> Source: https://labuladong.online/algo/en/data-structure/lru-cache/
> Archived: labuladong.online

---

# Implementing LRU Cache like Building a Lego

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[146\. LRU Cache](<https://leetcode.com/problems/lru-cache/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Linked List Basics](</en/algo/data-structure-basic/linkedlist-basic/>)
  * [Hash Table Basics](</en/algo/data-structure-basic/hashmap-basic/>)

The LRU algorithm is a cache eviction strategy. Its principle is not difficult, but writing a bug-free algorithm in an interview requires skill, involving multiple layers of abstraction and breakdown of data structures. This article will guide you to write elegant code.

The key data structure used in the LRU algorithm is the hash-linked list, `LinkedHashMap`. The [Hands-on Guide to Implementing Hash Linked List](</en/algo/data-structure-basic/hashtable-with-linked-list/>) in the data structure basics section explains the principles and code implementation of hash-linked lists. If you haven't read it, it's okay; this article will explain the core principles of hash-linked lists again to facilitate the implementation of the LRU algorithm.

Computer cache capacity is limited. If the cache is full, some content needs to be deleted to make space for new content. But the question is, what content should be deleted? We want to remove the cache that is not useful and keep the useful data in the cache for future use. So, what kind of data do we consider "useful"?

The LRU cache eviction algorithm is a common strategy. LRU stands for Least Recently Used, meaning that we consider recently used data to be "useful" and data that hasn't been used for a long time to be useless. When the memory is full, we delete the data that hasn't been used for the longest time.

For example, Android phones allow apps to run in the background. If I open "Settings," "Phone Manager," and "Calendar" one after another, the order in the background is like this:

![diagram](https://labuladong.online/images/algo/lru/1.jpg)

But if I then access the "Settings" interface, "Settings" will be moved to the front, like this:

![diagram](https://labuladong.online/images/algo/lru/2.jpg)

Assume my phone only allows three apps to run simultaneously, and it's already full. If I open a new app "Clock," I must close one app to free up space for "Clock." Which one should be closed?

According to the LRU strategy, the bottom "Phone Manager" is closed because it is the least recently used, and the new app is placed at the top:

![diagram](https://labuladong.online/images/algo/lru/3.jpg)

Now you should understand the LRU (Least Recently Used) strategy. Of course, there are other cache eviction strategies, such as evicting based on access frequency (LFU strategy) rather than access order. Each has its application scenarios. This article explains the LRU algorithm strategy, and I will explain the LFU algorithm in [LFU Algorithm Details](</en/algo/frequency-interview/lfu/>).

## 1\. LRU Algorithm Description

LeetCode Problem 146 "[LRU Cache](<https://leetcode.com/problems/lru-cache/>)" requires you to design a data structure:

First, it should accept a `capacity` parameter as the maximum cache capacity, then implement two APIs: a `put(key, val)` method to store key-value pairs and a `get(key)` method to retrieve the `val` corresponding to `key`. If `key` does not exist, it returns -1.

Note that the `get` and `put` methods must have a time complexity of O(1)O(1)O(1). Let's look at a specific example to see how the LRU algorithm works:

```python
# the cache capacity is 2
cache = LRUCache(2)

# you can understand cache as a queue
# assume the left is the head of the queue and the right is the tail
# the most recently used is at the head of the
# queue, and the least recently used is at the tail
# parentheses represent key-value pairs (key, val)

cache.put(1, 1)
# cache = [(1, 1)]

cache.put(2, 2)
# cache = [(2, 2), (1, 1)]

# return 1
cache.get(1)
# explanation: because key 1 was recently accessed, it is moved to the head of the queue
# return the value corresponding to key 1
# cache = [(1, 1), (2, 2)]

cache.put(3, 3)
# cache = [(3, 3), (1, 1)]
# explanation: the cache is full, need to delete content to make space
# priority is given to deleting the least recently
# used data, which is the data at the tail of the queue
# then insert the new data at the head of the queue

# return -1 (not found)
cache.get(2)
# explanation: there is no data with key 2 in the cache
# cache = [(3, 3), (1, 1)]

cache.put(1, 4)
# cache = [(1, 4), (3, 3)]
# explanation: key 1 already exists, overwrite the original value 1 with 4
# don't forget to also move the key-value pair to the head of the queue
``` 

## II. LRU Algorithm Design

Analyzing the above operations, to ensure that the time complexity of the `put` and `get` methods is O(1), we can summarize the necessary conditions for the `cache` data structure:

  1. Clearly, the elements in the `cache` must have a sequence to distinguish between recently used and long-unused data. When the capacity is full, the least recently used element should be removed to make space.

  2. We need to quickly find whether a certain `key` exists in the `cache` and obtain the corresponding `val`.

  3. Each time a `key` in the `cache` is accessed, this element needs to be made the most recently used, which means the `cache` must support quick insertion and deletion of elements at any position.

So, what data structure meets these conditions? A hash table allows fast lookup, but the data is unordered. A linked list is ordered and allows fast insertion and deletion, but lookup is slow. Therefore, combining them forms a new data structure: a hash-linked list, `LinkedHashMap`.

The core data structure of the LRU cache algorithm is this hash-linked list, a combination of a doubly linked list and a hash table. It looks like this:

![diagram](https://labuladong.online/images/algo/lru/4-en.jpg)

Using this structure, let's analyze the three conditions one by one:

  1. If we always add elements to the end of the list, then obviously, the closer to the end an element is, the more recently it's been used. The closer to the head an element is, the less recently it's been used.

  2. For a specific `key`, we can quickly locate the node in the linked list via the hash table and obtain the corresponding `val`.

  3. A linked list naturally supports quick insertion and deletion at any position by adjusting pointers. However, a traditional linked list cannot quickly access an element at a specific index. Here, with the help of a hash table, we can quickly map a `key` to any linked list node for insertion and deletion.

**Readers might ask why a doubly linked list is needed instead of a singly linked list? Also, since the`key` is already stored in the hash table, why does the linked list need to store both `key` and `val`? Wouldn't storing just `val` suffice?**

These questions can only be answered through implementation. The rationale behind this design will become clear once we personally implement the LRU algorithm, so let's start coding!

## Three: Code Implementation

Many programming languages have built-in linked hashmaps or library functions with LRU-like functionality. But to help you understand the nuts and bolts of the algorithm, let's build an LRU cache from scratch first, then implement it again using Java's built-in `LinkedHashMap`.

First, let's define the node class for our [doubly linked list](</en/algo/data-structure-basic/linkedlist-basic/>). For simplicity, both `key` and `val` are int types:

```python
class Node:
    def __init__(self, k: int, v: int):
        self.key = k
        self.val = v
        self.next = None
        self.prev = None
``` 

Next, we'll use our `Node` type to build a doubly linked list with the essential APIs that our LRU algorithm needs:

```python
class DoubleList:
    # virtual head and tail nodes
    def __init__(self):
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0
    
    # add node x to the end of the list, time complexity O(1)
    def addLast(self, x: Node):
        x.prev = self.tail.prev
        x.next = self.tail
        self.tail.prev.next = x
        self.tail.prev = x
        self.size += 1
    
    # remove node x from the list (x is guaranteed to exist)
    # since it's a doubly linked list and the target Node is given, time complexity O(1)
    def remove(self, x: Node):
        x.prev.next = x.next
        x.next.prev = x.prev
        self.size -= 1
    
    # remove the first node of the list and return it, time complexity O(1)
    def removeFirst(self) -> Node:
        if self.head.next == self.tail:
            return None
        first = self.head.next
        self.remove(first)
        return first
    
    # return the size of the list, time complexity O(1)
    def size(self) -> int:
        return self.size
``` 

If you're not comfortable with linked list operations, check out [Hands-On Guide to Implementing a Doubly Linked List](</en/algo/data-structure-basic/linkedlist-basic/>).

Now we can answer the earlier question: "Why do we need a doubly linked list?" It's because we need to perform deletions. Deleting a node requires not only a pointer to the node itself, but also access to its predecessor's pointer. Only a doubly linked list lets you find the predecessor directly, keeping the operation at O(1) time complexity.

Important

Note that our doubly linked list API only inserts at the tail. This means data near the tail was recently used, while data near the head is the least recently used.

With the doubly linked list in place, all we need to do is combine it with a hash map in our LRU algorithm. Let's start with the code skeleton:

```python
class LRUCache:
    def __init__(self, capacity: int):
        # key -> Node(key, val)
        self.map = {}
        # Node(k1, v1) <-> Node(k2, v2)...
        self.cache = DoubleList()
        # maximum capacity
        self.cap = capacity
``` 

Don't rush into implementing the `get` and `put` methods just yet. Since we're maintaining both a doubly linked list `cache` and a hash map `map` simultaneously, it's easy to miss an operation—for example, when deleting a `key`, you might remove the corresponding `Node` from `cache` but forget to also remove the `key` from `map`.

**The best way to avoid this kind of bug is to provide an abstraction layer of APIs on top of these two data structures.**

The idea is to keep the main `get` and `put` methods from directly manipulating the details of `map` and `cache`. Let's implement a few helper functions first:

```python
class LRUCache:
    # For the sake of brevity, the previous part of the code is omitted...

    # Promote a certain key to recently used
    def makeRecently(self, key: int):
        x = self.map[key]
        # First, remove this node from the linked list
        self.cache.remove(x)
        # Reinsert it at the end of the queue
        self.cache.addLast(x)

    # Add the most recently used element
    def addRecently(self, key: int, val: int):
        x = Node(key, val)
        # The tail of the linked list is the most recently used element
        self.cache.addLast(x)
        # Don't forget to add the key mapping in the map
        self.map[key] = x

    # Delete a certain key
    def deleteKey(self, key: int):
        x = self.map[key]
        # Remove it from the linked list
        self.cache.remove(x)
        # Delete it from the map
        self.map.pop(key)

    # Remove the least recently used element
    def removeLeastRecently(self):
        # The first element at the head of the linked list is the least recently used
        deletedNode = self.cache.removeFirst()
        # Also, don't forget to delete its key from the map
        deletedKey = deletedNode.key
        self.map.pop(deletedKey)
``` 

This also answers the earlier question: "Why store both key and val in the linked list node instead of just val?" Look at the `removeLeastRecently` function—we need to get `deletedKey` from `deletedNode`.

Here's the thing: when the cache is full, we don't just delete the last `Node`—we also need to remove the corresponding `key` from `map`. And the only way to get that `key` is from the `Node` itself. If the `Node` only stored `val`, we'd have no way to know which `key` to delete from `map`, and that would cause bugs.

These helper methods are simple wrappers that let us avoid directly touching the `cache` linked list and `map` hash table. Now let's implement the `get` method for the LRU algorithm:

```python
class LRUCache:
    # To save space, the previous code part is omitted...

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        
        # promote this data to most recently used
        self.makeRecently(key)
        return self.map[key].val
``` 

The `put` method is a bit more involved. Let's draw a diagram to clarify its logic:

![diagram](https://labuladong.online/images/algo/lru/put-en.jpg)

With that clear picture, we can easily write the code for `put`:

```python
class LRUCache:
    # To save space, the previous code part is omitted...

    def put(self, key: int, val: int) -> None:
        if key in self.map:
            # delete the old data
            self.deleteKey(key)
            # the newly inserted data is the most recently used data
            self.addRecently(key, val)
            return
        
        if self.cap == self.cache.size():
            # delete the least recently used element
            self.removeLeastRecently()
        # add as the most recently used element
        self.addRecently(key, val)
``` 

At this point, you should have a solid grasp of both the theory and implementation of the LRU algorithm. Here's the complete implementation:

```python
class Node:
    def __init__(self, k, v):
        self.key = k
        self.val = v
        self.next = None
        self.prev = None

class DoubleList:
    def __init__(self):
        # head and tail dummy nodes
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        # number of elements in the list
        self._size = 0

        # initialize the doubly linked list
        self.head.next = self.tail
        self.tail.prev = self.head

    # add node x to the end of the list, time complexity O(1)
    def addLast(self, x):
        x.prev = self.tail.prev
        x.next = self.tail
        self.tail.prev.next = x
        self.tail.prev = x
        self._size += 1

    # remove node x from the list (x must exist)
    # since it's a doubly linked list and x is the target node, time complexity O(1)
    def remove(self, x):
        x.prev.next = x.next
        x.next.prev = x.prev
        self._size -= 1

    # remove the first node in the list and return it, time complexity O(1)
    def removeFirst(self):
        if self.head.next == self.tail:
            return None
        first = self.head.next
        self.remove(first)
        return first

    # return the length of the list, time complexity O(1)
    def size(self):
        return self._size
    

class LRUCache:
    def __init__(self, capacity: int):
        # key -> Node(key, val)
        self.map = {}
        # Node(k1, v1) <-> Node(k2, v2)...
        self.cache = DoubleList()
        # maximum capacity
        self.cap = capacity

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        
        # promote this data to the most recently used
        self.makeRecently(key)
        return self.map[key].val

    def put(self, key: int, val: int) -> None:
        if key in self.map:
            # delete old data
            self.deleteKey(key)
            # insert the new data as the most recently used
            self.addRecently(key, val)
            return
        
        if self.cap == self.cache.size():
            # remove the least recently used element
            self.removeLeastRecently()
        # add as the most recently used element
        self.addRecently(key, val)

    def makeRecently(self, key: int):
        x = self.map[key]
        # first remove this node from the list
        self.cache.remove(x)
        # reinsert it at the end of the list
        self.cache.addLast(x)

    def addRecently(self, key: int, val: int):
        x = Node(key, val)
        # the end of the list is the most recently used element
        self.cache.addLast(x)
        # don't forget to add the key mapping in the map
        self.map[key] = x

    def deleteKey(self, key: int):
        x = self.map[key]
        # remove from the list
        self.cache.remove(x)
        # remove from the map
        self.map.pop(key)

    def removeLeastRecently(self):
        # the first element at the head of the list is the least recently used
        deletedNode = self.cache.removeFirst()
        # also don't forget to remove its key from the map
        deletedKey = deletedNode.key
        self.map.pop(deletedKey)
``` 

You can also use Java's built-in `LinkedHashMap` or the `MyLinkedHashMap` from [Hands-On Guide to Implementing a Linked HashMap](</en/algo/data-structure-basic/hashtable-with-linked-list/>) to implement LRU. The logic is exactly the same:

```
class LRUCache {
    int cap;
    LinkedHashMap<Integer, Integer> cache = new LinkedHashMap<>();
    public LRUCache(int capacity) {
        this.cap = capacity;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }
        // mark key as recently used
        makeRecently(key);
        return cache.get(key);
    }

    public void put(int key, int val) {
        if (cache.containsKey(key)) {
            // update the value for key
            cache.put(key, val);
            // mark key as recently used
            makeRecently(key);
            return;
        }

        if (cache.size() >= this.cap) {
            // the head of the list is the least recently used key
            int oldestKey = cache.keySet().iterator().next();
            cache.remove(oldestKey);
        }
        // add the new key at the tail of the list
        cache.put(key, val);
    }

    private void makeRecently(int key) {
        int val = cache.get(key);
        // remove key and re-insert at the tail
        cache.remove(key);
        cache.put(key, val);
    }
}
``` 

And there you have it—nothing mysterious about the LRU algorithm anymore. For more data structure design problems, check out [Classic Data Structure Design Exercises](</en/algo/problem-set/ds-design/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
