# Key Points to Implement Linear Probing

> Source: https://labuladong.online/algo/en/data-structure-basic/linear-probing-key-point/
> Archived: labuladong.online

---

# Key Points to Implement Linear Probing

Prerequisite Knowledge

Before reading this article, you need to learn:

  * [Core Principles of Hash Tables](</en/algo/data-structure-basic/hashmap-basic/>)

In the previous article [Core Principles of Hash Tables](</en/algo/data-structure-basic/hashmap-basic/>), I introduced the core principles and key concepts of hash tables. It mentioned that there are mainly two methods to resolve hash collisions: chaining and linear probing (also known as open addressing):

![diagram](https://labuladong.online/images/algo/ds-basic/hash-collision-en.jpeg)

Since linear probing is a bit more complex, this article will first explain several challenges in implementing linear probing, and the next article will provide the actual code implementation.

## Simplified Scenario

The previously introduced chaining method is relatively straightforward, where each element in the `table` is a linked list, and when a hash collision occurs, you simply insert the element into the list.

Linear probing is more complex, primarily due to two challenges that involve various array operation techniques. Before clarifying these challenges, let's establish a simplified scenario:

Assume our hash table only supports `key` and `value` types as `int`, with a fixed `table.length` of `10`, and the `hash` function implemented as `hash(key) = key % 10`. This setup easily simulates hash collisions, such as both `hash(1)` and `hash(11)` resulting in 1.

The general logic of linear probing is as follows:

```python
# Basic logic of linear probing, pseudo-code implementation

class KVNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value

class MyLinearProbingHashMap:
    # Each element in the array stores a key-value pair
    def __init__(self):
        self.table = [None] * 10
    
    def hash(self, key):
        return key % len(self.table)

    def put(self, key, value):
        index = self.hash(key)
        node = self.table[index]
        if node is None:
            self.table[index] = KVNode(key, value)
        else:
            # Logic of linear probing
            # Probe backwards until key is found or an empty slot is found
            while index < len(self.table) and self.table[index] is not None and self.table[index].key != key:
                index += 1
            self.table[index] = KVNode(key, value)
    
    def get(self, key):
        index = self.hash(key)
        # Probe backwards until key is found or an empty slot is found
        while index < len(self.table) and self.table[index] is not None and self.table[index].key != key:
            index += 1
        if self.table[index] is None:
            return -1
        return self.table[index].value
    
    def remove(self, key):
        index = self.hash(key)
        # Probe backwards until key is found or an empty slot is found
        while index < len(self.table) and self.table[index] is not None and self.table[index].key != key:
            index += 1
        # Delete table[index]
        # ...
``` 

Based on this hypothetical scenario, let's examine the two challenges of linear probing.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
