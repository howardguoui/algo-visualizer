# Trie, Digital Tree, Prefix Tree Basics and Visualization

> Source: https://labuladong.online/algo/en/data-structure-basic/trie-map-basic/
> Archived: labuladong.online

---

# Trie, Digital Tree, Prefix Tree Basics and Visualization

Prerequisite Knowledge

Before reading this article, you need to first learn:

  * [Fundamentals and Common Types of Binary Trees](</en/algo/data-structure-basic/binary-tree-basic/>)

Summary in One Sentence

A Trie tree is an extension of a [multi-way tree structure](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>) and is a specially optimized data structure for handling strings.

Trie trees offer many advantages in string operations, such as saving memory space for common string prefixes, facilitating prefix operations, and supporting wildcard matching.

The visual panel below illustrates the structure and main API of a Trie tree. You can click through the code line by line to observe the changes in the console output and the Trie tree structure on the right:

Algorithm Visualization

This article is only an introduction to the principles of Trie trees (also known as dictionary trees or prefix trees). The hands-on implementation of [TrieMap/TrieSet](</en/algo/data-structure-basic/trie-map-basic/>) is placed in the data structure design section following the [Introduction to Binary Tree Exercises](</en/algo/intro/binary-tree-practice/>). The reason is the same as in the previous [Principles of TreeMap/TreeSet](</en/algo/data-structure-basic/tree-map-basic/>); I do not plan to explain the specific implementation of such complex structures in the basic knowledge section, and beginners do not need to understand the code implementation of Trie trees at this stage.

However, I am still explaining the principles of Trie trees here for two purposes:

  1. To give you an intuitive sense of the various transformations of binary tree structures, and perhaps you will understand why my tutorial emphasizes binary tree structures.

  2. To let you know about this data structure, understand its API and applicable scenarios. In the future, if you encounter related problems, you might think of using a Trie tree to solve them, at least having an idea. If not, you can come back and copy the code template. The implementation of such data structures is fixed, and in written or oral exams, you won't be required to manually construct a Trie tree from scratch. You can simply copy and paste it for use.

Alright, let's get started without further ado.

This site will guide you in implementing a `TrieMap` and `TrieSet`. Let's first review the Map/Set types we have implemented:

  * The standard [Hash Table `HashMap`](</en/algo/data-structure-basic/hashmap-basic/>), which uses a hash function to store key-value pairs in a `table` array, offers two methods for resolving hash collisions. Its main feature is speed, as basic operations like addition, deletion, query, and update have a time complexity of O(1)O(1)O(1). The [Hash Set `HashSet`](</en/algo/data-structure-basic/hash-set/>) is a simple wrapper around the `HashMap`.

  * [Linked Hash Map `LinkedHashMap`](</en/algo/data-structure-basic/hashtable-with-linked-list/>) is an enhancement of the standard hash table using a [doubly linked list structure](</en/algo/data-structure-basic/linkedlist-basic/>). It inherits the operation complexity of a hash table and can maintain all keys in "insertion order." The `LinkedHashSet` is a simple wrapper around the `LinkedHashMap`.

  * [Array Hash Map `ArrayHashMap`](</en/algo/data-structure-basic/hashtable-with-array/>) enhances the standard hash table using an [array structure](</en/algo/data-structure-basic/array-basic/>). It inherits the operation complexity of a hash table and provides an additional `randomKey` function, which can return a random key in O(1)O(1)O(1) time. The `ArrayHashSet` is a simple wrapper around the `ArrayHashMap`.

  * [`TreeMap`](</en/algo/data-structure-basic/tree-map-basic/>), whose underlying structure is a binary search tree (typically a self-balancing [red-black tree](</en/algo/data-structure-basic/rbtree-basic/>) in standard libraries), has a basic operation complexity of O(logN)O(logN)O(logN). Its features include dynamically maintaining the size relationship of key-value pairs and offering many additional API operations on key-value pairs. The `TreeSet` is a simple wrapper around the `TreeMap`.

The `TrieSet` is also a simple wrapper around the `TrieMap`, so we will focus on understanding the implementation principles of the `TrieMap` below.

## Main Use Cases of Trie Trees

**Trie is a data structure specially optimized for strings.** This is why it is also called a "dictionary tree". Trie has several advantages when dealing with strings, which we will list below.

### Saving Storage Space

Let's compare it with `HashMap`. For example, if you store several key-value pairs like this:

```
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("app", 2);
map.put("appl", 3);
``` 

Remember how a hash table works: the key-value pairs are stored in a `table` array. So, it really creates the three strings `"apple"`, `"app"`, and `"appl"`, which takes up 12 characters of memory.

Notice that these three strings have a common prefix. The prefix `"app"` is stored three times, and `"l"` is stored twice.

If you use a TrieMap instead:

```
// The key type of Trie is always String, the value type can be generic
TrieMap<Integer> map = new TrieMap<>();
map.put("apple", 1);
map.put("app", 2);
map.put("appl", 3);
``` 

The Trie does not store the common prefixes multiple times. So it only needs 5 characters of memory to store these keys.

This example has very little data, so the benefit may not seem obvious. But if you have many and very long keys with a lot of common prefixes (like ID numbers in real life), Trie can save a lot of memory.

### Easy to Handle Prefix Operations

Here is an example:

```
// The key type of Trie is always String, the value type can be generic
TrieMap<Integer> map = new TrieMap<>();
map.put("that", 1);
map.put("the", 2);
map.put("them", 3);
map.put("apple", 4);

// "the" is the shortest prefix of "themxyz"
System.out.println(map.shortestPrefixOf("themxyz")); // "the"

// "them" is the longest prefix of "themxyz"
System.out.println(map.longestPrefixOf("themxyz")); // "them"

// "tha" is a prefix of "that"
System.out.println(map.hasKeyWithPrefix("tha")); // true

// No key with prefix "thz"
System.out.println(map.hasKeyWithPrefix("thz")); // false

// "that", "the", "them" all have "th" as a prefix
System.out.println(map.keysWithPrefix("th")); // ["that", "the", "them"]
``` 

Except for the `keysWithPrefix` method, whose complexity depends on the number of returned results, other prefix operations have a time complexity of O(L)O(L)O(L), where LLL is the length of the prefix string.

Think about it. Can you do these operations easily with HashMap or TreeMap? Usually, you would have to check every key and compare prefixes one by one, which is very slow.

By the way, doesn't the `keysWithPrefix` method look perfect for building an autocomplete feature?

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
