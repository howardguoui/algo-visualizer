# TreeMap Structure and Visualization

> Source: https://labuladong.online/algo/en/data-structure-basic/tree-map-basic/
> Archived: labuladong.online

---

# TreeMap Structure and Visualization

Prerequisites

Before reading this article, you need to learn:

  * [Basics and Common Types of Binary Trees](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Recursion and Level-Order Traversal of N-ary Trees](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

Summary

A binary search tree is a special kind of [binary tree](</en/algo/data-structure-basic/binary-tree-basic/>). Its main use is to implement `TreeMap` and `TreeSet`.

In the previous article [Common Types of Binary Trees](</en/algo/data-structure-basic/binary-tree-basic/>), we introduced binary search trees. Next, I will show you how to implement a structure like Java's `TreeMap` and `TreeSet`. This will help you understand both the theory and practice.

**However, since this article is still in the basics section, I will only explain the idea behind`TreeMap/TreeSet` for now. The hands-on implementation is in [TreeMap Implementation](</en/algo/data-structure-basic/tree-map-implement/>), which is at the end of [Binary Tree Practice Problems](</en/algo/intro/binary-tree-practice/>).**

Unlike hash tables and queues, tree-related data structures need more understanding of recursion, and are harder. If your recursion skills are not strong, it will be tough to follow along, and even if you understand the code after a lot of effort, you might still find it hard to solve real problems. This can be discouraging.

So I suggest you take it step by step. In the binary tree practice section, we will use over 100 real algorithm problems to help you build your recursion skills. After that, you will be able to solve all binary tree problems easily. Then, when you look at the tree data structure code, it will seem simple. You might even be able to implement `TreeMap/TreeSet` by yourself without looking at my code.

Alright, let's get started.

## Advantages of Binary Search Trees

In the previous article [Common Types of Binary Trees](</en/algo/data-structure-basic/binary-tree-basic/>), we explained the main feature of a binary search tree (BST): the left child is smaller, the right child is bigger.

For every node in the tree, all nodes in its **left subtree** have smaller values, and all nodes in its **right subtree** have larger values.

Here is an example of a BST:

loading...

**This "left smaller, right bigger" feature helps us quickly find a node or all nodes in a certain range. This is the advantage of a BST.**

You should have already learned about [binary tree traversal](</en/algo/data-structure-basic/binary-tree-traverse-basic/>). Next, I will use standard traversal functions and visual panels to compare BST and normal binary tree operations.

You can open the two panels below and click on the line `if (targetNode !== null)` to see the difference in efficiency between the two search algorithms:

Algorithm Visualization

Algorithm Visualization

Here we show how to find a target node. You can see that, thanks to the BST property, we can quickly locate the target node. The best time complexity is the height of the tree, O(logN)O(logN)O(logN). For a normal binary tree, you need O(N)O(N)O(N) time to check all nodes.

For other operations like add, delete, and update, you also need to find the target node first. These operations just change pointers, so their time complexity is also O(logN)O(logN)O(logN).

## How TreeMap/TreeSet Work

From the name `TreeMap`, you can see that it is similar to [HashMap](</en/algo/data-structure-basic/hashmap-basic/>). Both store key-value pairs. `HashMap` stores them in an array called `table`, while `TreeMap` stores them in the nodes of a binary search tree.

As for `TreeSet`, its relationship with `TreeMap` is just like the relationship between `HashSet` and `HashMap`. In simple terms, `TreeSet` is a wrapper around `TreeMap`. So here, I will mainly explain how `TreeMap` works.

The classic `TreeNode` structure in LeetCode looks like this:

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
}
``` 

If we change this classic `TreeNode` structure a little, we can use it for `TreeMap`:

```java
// Capital K is the type for keys, capital V is the type for values
class TreeNode<K, V> {
    K key;
    V value;

    TreeNode<K, V> left;
    TreeNode<K, V> right;
    TreeNode(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
``` 

The `TreeMap` we will implement has the following API:

```
// Main interface of TreeMap
class MyTreeMap<K, V> {

    // ****** Basic methods for key-value mapping ******

    // Add/Update, complexity O(logN)
    public void put(K key, V value) {}

    // Get, complexity O(logN)
    public V get(K key) {}

    // Remove, complexity O(logN)
    public void remove(K key) {}

    // Check if contains key, complexity O(logN)
    public boolean containsKey(K key) {}

    // Return a collection of all keys in order, complexity O(N)
    public List<K> keys() {}

    // ****** Additional methods provided by TreeMap ******

    // Find the smallest key, complexity O(logN)
    public K firstKey() {}

    // Find the largest key, complexity O(logN)
    public K lastKey() {}

    // Find the largest key less than or equal to the given key, complexity O(logN)
    public K floorKey(K key) {}

    // Find the smallest key greater than or equal to the given key, complexity O(logN)
    public K ceilingKey(K key) {}

    // Find the key with rank k, complexity O(logN)
    public K selectKey(int k) {}

    // Find the rank of the key, complexity O(logN)
    public int rank(K key) {}

    // Range search, complexity O(logN + M), where M is the size of the range
    public List<K> rangeKeys(K low, K high) {}
}
``` 

In addition to the standard methods for adding, deleting, searching, and modifying such as `get, put, remove, containsKey`, `TreeMap` offers many additional methods, primarily related to the size of keys. Isn't it impressive?

Hash tables are practical, but they can't effectively handle the size relationships between keys. The `LinkedHashMap` implemented in the previous article [Strengthening Hash Tables with Linked Lists](</en/algo/data-structure-basic/hashtable-with-linked-list/>) only arranges keys in the hash table by "insertion order" and still cannot arrange them by "size order."

Last updated: 03/14/2026, 12:17 AM
