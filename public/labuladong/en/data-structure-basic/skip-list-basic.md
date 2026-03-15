# Skip List Basics

> Source: https://labuladong.online/algo/en/data-structure-basic/skip-list-basic/
> Archived: labuladong.online

---

# Skip List Basics

Prerequisite Knowledge

Before reading this article, you should first study:

  * [Basic Knowledge of Linked Lists (Linked Storage)](</en/algo/data-structure-basic/linkedlist-basic/>)

In actual interviews, you are unlikely to be asked to write the implementation code of a skip list by hand, but you may be asked about the basic principles and complexity analysis of skip lists, so this site needs to explain this data structure.

This article is in the foundational chapter and will not delve into the implementation details of skip lists, but will only introduce the core principles. Beginners should learn this article to know that such a data structure exists, and understand its basic principles and time complexity. The specific code implementation will be placed in the data structure design chapter.

In [Basic Knowledge of Linked Lists](</en/algo/data-structure-basic/linkedlist-basic/>), we mentioned that in a singly linked list, the time complexity for adding, deleting, or modifying elements at a **specified index** is O(N)O(N)O(N).

In fact, if you have the node of the linked list to be operated on, you can complete delete, modify, or insert operations with a few pointer operations, and the time complexity is O(1)O(1)O(1).

The main time consumption is in the query operation because querying a node by index requires starting from the head node and traversing to the target node before performing delete, modify, or insert operations.

So, can we find some optimization methods to enable quick search operations in linked lists?

One way is to use key-value mapping to directly obtain the target node in O(1)O(1)O(1) time, avoiding the time consumption of traversal search. This idea will be introduced in detail in the [Hash Linked List (LinkedHashMap)](</en/algo/data-structure-basic/hashtable-with-linked-list/>).

Another method is the skip list introduced in this article, which utilizes the concept of **space for time**. By using additional space to record extra information, the time complexity for add, delete, search, and modify operations can be optimized to O(log⁡N)O(\log N)O(logN).

## Core Principle of Skip Lists

Let's take querying a specific index element as an example to see how skip lists optimize singly linked lists.

A regular singly linked list looks like this:

```
index  0  1  2  3  4  5  6  7  8  9
node   a->b->c->d->e->f->g->h->i->j
``` 

If we want to query the element at index 7, we have to traverse from the head node at index 0 until we reach index 7 and find the target node `h`.

A skip list, however, looks like this:

```
indexLevel   0-----------------------8-----10
indexLevel   0-----------4-----------8-----10
indexLevel   0-----2-----4-----6-----8-----10
indexLevel   0--1--2--3--4--5--6--7--8--9--10
nodeLevel    a->b->c->d->e->f->g->h->i->j->k
``` 

A skip list adds multiple layers of indices on top of the original linked list. Each higher level has half the number of index nodes, and the index interval doubles, so the height of the index is log⁡N\log NlogN, where NNN is the number of elements in the list.

Now, if we want to query the element at index 7, we can start from the highest index level and search downwards layer by layer:

First, the highest level index range is `[0, 8]`, confirming index 7 is within this range, so we begin searching from node 0 on the next level.

On the second level starting from node 0, the index range `[0, 4]` does not include index 7, so we move right to node 4. The index range `[4, 8]` includes index 7, so we search from node 4 on the next level.

On the third level starting from node 4, the index range `[4, 6]` does not include index 7, so we move right to node 6. The index range `[6, 8]` includes index 7, so we search from node 6 on the next level.

On the fourth level starting from node 6, the index range `[6, 7]` includes index 7, and we finally find the target node `h`.

During this search process, we traverse through log⁡N\log NlogN levels of indices, and the number of moves per level does not exceed 2 (as each upper index range is split in half at the next level), so the query time complexity of skip lists is O(log⁡N)O(\log N)O(logN).

## Summary

The simplified example above should give you an intuitive understanding of the core principles of skip lists. Skip lists are a classic example of the **space-time tradeoff** design approach, where additional layers of indexes are maintained to increase space complexity while reducing the time complexity of operations like insertion, deletion, and search.

The actual implementation of skip lists is somewhat more complex and differs from the simplified example above. Here are a few additional points:

  1. The example above only demonstrates the search operation, but skip lists must also support insertion and deletion. This involves dynamically adjusting nodes in the index layers, ensuring that each layer's index intervals are as close to binary as possible. This ensures that the height of the index layers remains log⁡N\log NlogN, otherwise the time complexity would degrade.

  2. Skip lists are not just for finding nodes corresponding to indexes; they can also be applied to more general scenarios, such as storing and searching ordered key-value pairs. In fact, the use cases for skip lists are very similar to those of binary search trees, which we will study later. However, the code implementation of skip lists is much simpler compared to self-balancing binary search trees.

For the specific implementation of skip lists, I will update the data structure design chapter. Stay tuned.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
