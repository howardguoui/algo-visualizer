# Two Implementations of Linear Probing

> Source: https://labuladong.online/algo/en/data-structure-basic/linear-probing-code/
> Archived: labuladong.online

---

# Two Implementations of Linear Probing

Prerequisite Knowledge

Before reading this article, you should learn:

  * [Two Challenges of Linear Probing](</en/algo/data-structure-basic/linear-probing-key-point/>)

In the previous article [Core Principles of Hash Tables](</en/algo/data-structure-basic/hashmap-basic/>), I introduced the core principles and key concepts of hash tables. In [Chaining Method: Principles and Implementation](</en/algo/data-structure-basic/hashtable-chaining/>), I explained the implementation of the chaining method. [Two Challenges of Linear Probing](</en/algo/data-structure-basic/linear-probing-key-point/>) discussed the difficulties of implementing hash tables using linear probing, and provided two methods to solve the problem of "holes" when deleting elements. This article will provide reference code implementations for both methods.

This article will first present a simplified implementation with the help of a visualization panel to make it easier to understand the process of adding, deleting, updating, and searching. Finally, we'll provide a complete implementation.

In the simplified implementation, the specific simplifications are as follows:

  1. Our hash table implementation only supports `key` and `value` of type `int`. If a `key` does not exist, it returns `-1`.

  2. The `hash` function we use is simply the modulus operation: `hash(key) = key % table.length`. This also makes it easy to simulate hash collisions. For example, when `table.length = 10`, both `hash(1)` and `hash(11)` return 1.

  3. The size of the underlying `table` array is fixed when creating the hash table. We assume the `table` array will not be fully filled, and we do not consider load factor or dynamic resizing.

These simplifications help us focus on the core logic of adding, deleting, updating, and searching, and you can use the [visualization panel](</en/algo/intro/visualize/>) to assist in understanding the process.

Last updated: 03/14/2026, 12:17 AM
