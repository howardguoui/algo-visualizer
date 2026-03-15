# LSM Tree in Storage System

> Source: https://labuladong.online/algo/en/other-skills/lsm-tree/
> Archived: labuladong.online

---

# LSM Tree in Storage System

Let's dive into the structure of LSM trees (Log Structured Merge Tree) and understand how they're designed.

You're probably familiar with B+ trees—relational databases like MySQL use them under the hood to store data. LSM trees are just another way to structure storage, commonly seen in logging systems.

First, let's talk about storage systems.

### ¶In-Memory vs Disk-Based Data Structures

As I covered in [A Framework for Learning Data Structures and Algorithms](/en/algo/essential-technique/algorithm-summary/), every data structure boils down to create, read, update, and delete operations. But when it comes to implementation, disk-based and memory-based data structures differ quite a bit.

With in-memory data structures, you just instantiate them and you're done—the OS and programming language handle how they're laid out in memory.

Disk is a different story. Since disk I/O is relatively slow and you can only read fixed-size chunks at a time, you need to design the storage layout yourself—defining what each byte represents, then implementing CRUD APIs based on that layout. It's pretty tedious work.

For example, if you've studied MySQL, you're probably familiar with B+ trees. But understanding the actual code? That's a different challenge. B+ trees are disk-based structures—conceptually they're just souped-up BSTs, but the actual implementation is incredibly complex because of how the data file format is designed.

So generally speaking, understanding the principles of disk-based data structures and their time complexities is enough—no need to get too hung up on implementation details.

### ¶Mutable vs Immutable Data

**Storage structures can be roughly divided into two categories: mutable and immutable.** Mutable means you can modify data in place after insertion; immutable means once data is inserted, it can't be modified.

**B-trees are the poster child for mutable structures** (B+ trees and other variants all fall under the B-tree family). Think about BSTs—data sits in nodes, and you can freely insert, delete, or modify any node.

Theoretically, B-trees have O(log N) performance for CRUD operations, just like BSTs. But in practice, their write performance isn't particularly great:

For one, B-trees need to split and merge nodes to stay balanced, which involves lots of random disk I/O—that's slow. Plus, in concurrent scenarios, modifying a B-tree requires complex locking mechanisms to ensure thread safety, which also drags down performance.

**The challenges with B-trees boil down to balancing and concurrency control, which is why they're typically used in read-heavy scenarios.**

**LSM trees are the poster child for immutable structures.** You can only append new data to the end—you can't modify previously inserted data.

If you can't modify old data, does that mean you can't provide delete, read, or update APIs? Actually, you can.

All you need are two APIs: `set(key, val)` and `get(key)`. Read operations use `get(key)`, and create/update/delete operations all go through `set(key, val)`:

If the `key` in `set` doesn't exist, it creates a new key-value pair. If it already exists, it updates the pair. And if you set `val` to a special value (like null), it marks the `key` as deleted (tombstone mechanism).

After performing a series of operations on a `key`, you just need to find the most recent operation to know its current value.

From a disk perspective, appending to the end is super efficient since you don't need to maintain complex tree structures like B-trees do. The tradeoff? Read performance suffers because you can only find operation records through linear scanning.

I'll explain later how real LSM trees optimize for reads, but no matter how much you optimize, they'll never match B-trees' read efficiency.

LSM trees also have an obvious downside: space amplification. In a B-tree, a key-value pair occupies one node—update it 100 times and it still only takes up one node. In an LSM tree, updating a key 100 times means writing 100 records, consuming way more space.

The solution to this, which I'll cover later, is compaction—eliminating obsolete historical operations from the sequence and keeping only the most recent records.

**The challenges with LSM trees lie in compaction and optimizing read performance, which is why they're typically used in write-heavy scenarios.**

### ¶Ordered vs Unordered

You could say that how ordered a storage structure is directly determines its performance ceiling. **The more ordered, the better the read performance—but maintaining that order costs more, so write performance suffers.**

Take B-trees—as an enhanced BST, they maintain complete ordering of all data. Read performance is excellent, but don't expect much from writes.

LSM trees can't maintain total ordering like B-trees, but they can maintain partial ordering, which helps improve read performance to some extent.

### ¶LSM Tree Design

From my understanding, LSM trees aren't really a data structure—they're more of a storage strategy. Three key components are involved: `memtable`, `log`, and `SSTable`, as shown in this diagram from Apache Pulsar's architecture:

![](/images/algo/pulsar/10.jpg)

In the diagram, `Journal` is the `log`, and `Entry Log` is a collection of `SSTables`—just different terminology.

The `memtable` is an ordered in-memory data structure like a red-black tree or skip list. It acts as a cache and sorts incoming data by key. When the `memtable` reaches a certain size, it's converted to `SSTable` format and flushed to disk for persistent storage.

`SSTable` (Sorted String Table) is basically just a specially formatted file where data is sorted by key—think of it like a sorted array. And an LSM tree? It's just a collection of `SSTables`.

The `log` file records operation logs. When data is written to the `memtable`, it's also flushed to the `log` file for recovery purposes. If power goes out before the `memtable` data is converted to `SSTable` and persisted to disk, the `memtable` data would be lost—but the `log` file lets you recover it. Once the `memtable` data is successfully converted to `SSTable` and written to disk, the corresponding operation logs in the `log` file are no longer needed and can be deleted.

The `set` write process in LSM trees is pretty straightforward: write to the `log` and `memtable`, then convert it to an `SSTable` and persist it to disk.

The real key is the read and compaction process: how should `SSTables` be organized so you can quickly `get` the `val` for a given `key`? And how do you periodically compact all the SSTables to slim them down?

There are actually multiple approaches, but a common one is organizing `SSTables` into levels:

![https://github.com/facebook/rocksdb/wiki/Leveled-Compaction](/images/algo/lsm/1.png)

Each green box in the diagram represents an `SSTable`. Multiple `SSTables` form a level, and there are multiple levels total, with each level's capacity increasing as you go down.

Newly flushed `SSTables` start at level 0. When a level exceeds its capacity, it triggers a compaction operation—based on key ranges, several `SSTables` from that level and the next are selected, merged into a larger `SSTable`, and moved to the next level down:

![https://github.com/facebook/rocksdb/wiki/Leveled-Compaction](/images/algo/lsm/2.png)

Each `SSTable` is like a sorted array or linked list, and merging multiple `SSTables` follows the same logic as merging multiple sorted linked lists, which I covered in [Linked List Two-Pointer Techniques](/en/algo/essential-technique/linked-list-skills-summary/).

This way, upper levels contain newer data and lower levels contain older data. The algorithm also ensures that `SSTables` within the same level have non-overlapping key ranges:

![https://github.com/facebook/rocksdb/wiki/Leveled-Compaction](/images/algo/lsm/3.png)

So if we're looking for a target key like `key27`, we just traverse levels from top to bottom, using [binary search](/en/algo/essential-technique/binary-search-framework/) at each level to find the `SSTable` whose key range contains `key27`, then quickly check with a Bloom filter whether `key27` actually exists in that `SSTable`.

If it exists, since keys within an `SSTable` are also sorted, we can use [binary search](/en/algo/essential-technique/binary-search-framework/) again to find the corresponding value.

This way, leveraging the LSM tree's level structure and the sorted nature of `SSTables`, we can use binary search to boost lookup efficiency and avoid linear scanning for key-value pairs.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
