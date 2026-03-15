# Bloom Filter Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/bloom-filter/
> Archived: labuladong.online

---

# Bloom Filter Implementation

Prerequisites

Before reading this article, you need to first learn:

  * [Core Principles of Hash Table](/en/algo/data-structure-basic/hashmap-basic/)
  * [Core Principles and Implementation of Bitmap](/en/algo/data-structure-basic/bitmap/)


In a Nutshell

The core abilities of the Bloom filter are:

  * In very large datasets, it can quickly check if an element exists using very little memory.
  * It can keep data private. That means you can check if an element exists without showing the real data.


The core idea is not to store the real data, but only to store the data fingerprints (hash values), and use these fingerprints to check if the data exists.

Some typical big data scenarios:

  * For example, to check if the URL of a HTTP request is in a blacklist of bad URLs. This list can have hundreds of millions of URLs. We can use a Bloom filter to make sure the lookup uses very little memory and is fast. Otherwise, it would affect user experience.

  * In big data storage systems, huge amounts of data are stored in many different files. To find a piece of data, you might have to search several files on disk, which is slow. We can keep a Bloom filter in memory for each file, so we can quickly check if the target data might be inside a file and avoid unnecessary disk reads.


When we want to check if an element exists, we should first think of [hash set](/en/algo/data-structure-basic/hash-set/) as explained earlier. It allows you to add, delete, and check an element in O(1)O(1)O(1) time.

But if the data is very large, it doesn't work so well.

Because a hash set is built from a hash table. In [How Hash Table Code Works](/en/algo/data-structure-basic/hashtable-chaining/), we have to use a `KVNode` class to store the real data in memory to handle hash collisions.

So, the space complexity for a hash set is O(N)O(N)O(N), and as you store more elements, it uses more memory. For huge data sets, you may not have enough memory to store everything.

Also, a hash set stores the real data, so it does not keep the data private.

So, how does the Bloom filter work? And with the Bloom filter, do we still need hash sets?

Last updated: 03/14/2026, 12:17 AM

Loading comments...
