# Linked List (Chain Storage)

> Source: https://labuladong.online/algo/en/data-structure-basic/linkedlist-basic/
> Archived: labuladong.online

---

# Linked List (Chain Storage)

If you've done any LeetCode problems, you're probably familiar with singly linked lists. Here's how LeetCode defines a linked list node:

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}
``` 

This is just the simplest possible **singly linked list node** , designed for algorithm problems. In real programming languages, the linked list nodes you'll use are a bit more sophisticated, looking something like this:

```java
class Node<E> {
    E val;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.val = element;
        this.next = next;
        this.prev = prev;
    }
}
``` 

There are two main differences:

  1. Standard libraries typically support generics, meaning you can make the `val` field any type you want. LeetCode's linked list node only supports `int`.

  2. Standard libraries usually implement doubly linked lists, not singly linked lists. A singly linked list node only has a `next` pointer pointing to the next node. A doubly linked list node has two pointers: `prev` pointing to the previous node, and `next` pointing to the next node.

With a `prev` pointer, linked lists support bidirectional traversal. The tradeoff is that maintaining an extra pointer makes insertions, deletions, lookups, and updates slightly more complex. We'll dive into the details when we implement a doubly linked list later.

## Why Do We Need Linked Lists?

Earlier, we covered [how arrays (sequential storage) work under the hood](</en/algo/data-structure-basic/array-basic/>). Basically, an array is just a contiguous block of memory. With the starting address of that memory block, you can calculate the address of any element directly using its index.

Linked lists work differently. A linked list doesn't need a contiguous chunk of memory to store its elements. The elements can be scattered all over memory, and the `next, prev` pointers on each node stitch these scattered memory blocks together into a chain.

The benefits are obvious. First, it improves memory utilization—linked list nodes don't need to sit next to each other. Just allocate a bit of memory, create a new node, and you're good to go. The operating system loves this kind of low-maintenance data structure.

Another benefit: nodes can be attached when needed and detached when not. You never have to worry about resizing or moving data around. Theoretically, a linked list has no capacity limit (unless you somehow fill up all available memory, which is pretty unlikely).

Of course, there's no free lunch. The biggest advantage of arrays is random access by index, and linked lists don't support that.

This makes sense if you think about it—since elements aren't stored contiguously, if you want to access the 3rd element in a linked list, you have to start from the head node and follow the `next` pointers until you reach the 3rd node.

That covers the basics of linked lists as a data structure. Now let's look at implementing the fundamental operations for singly and doubly linked lists.

## Basic Operations on Singly Linked Lists

First, let me write a utility function to create a singly linked list. This will come in handy for the examples that follow:

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

// input an array, convert it to a singly linked list
ListNode createLinkedList(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }
    ListNode head = new ListNode(arr[0]);
    ListNode cur = head;
    for (int i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
``` 

### Lookup/Update

Traversing/Searching/Updating a Singly Linked List

Say I want to visit every node in a singly linked list and print its value. Here's how:

```java
// create a single linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// traverse the single linked list
for (ListNode p = head; p != null; p = p.next) {
    System.out.println(p.val);
}
``` 

Similarly, if you need to access or modify a node at a specific index, you have to use a for loop starting from the head and work your way forward until you reach the target index.

The worst-case time complexity for this operation is O(n)O(n)O(n), where nnn is the length of the linked list.

### Insert

Inserting at the Head of a Singly Linked List

Since we hold a reference to the head node, we just need to connect the new node before the current head, then make the new node the head.

```java
// create a single linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// insert a new node with value 0 at the head of the single linked list
ListNode newNode = new ListNode(0);
newNode.next = head;
head = newNode;

// now the linked list becomes 0 -> 1 -> 2 -> 3 -> 4 -> 5
``` 

This operation has O(1)O(1)O(1) time complexity.

Inserting at the Tail of a Singly Linked List

Let's just look at the code—it's straightforward:

```java
// create a singly linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// insert a new node with value 6 at the end of the linked list
ListNode p = head;
// first, go to the last node of the linked list
while (p.next != null) {
    p = p.next;
}
// now p is the last node of the linked list
// insert a new node after p
p.next = new ListNode(6);

// now the linked list becomes 1 -> 2 -> 3 -> 4 -> 5 -> 6
``` 

This operation has O(n)O(n)O(n) time complexity because we need to traverse to the end of the list first. If we kept a reference to the tail node, inserting at the tail would become trivial—no need to traverse from the head every time. We'll cover this optimization when we implement a doubly linked list later.

Inserting at the Tail of a Singly Linked List

Inserting in the Middle of a Singly Linked List

This one's a bit trickier. We still need to find the predecessor of the target position first, then use that predecessor node to insert the new node:

```java
// create a singly linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// insert a new node 66 after the 3rd node
// first, find the predecessor node, i.e., the 3rd node
ListNode p = head;
for (int i = 0; i < 2; i++) {
    p = p.next;
}
// now p points to the 3rd node
// set the next pointer of the new node
ListNode newNode = new ListNode(66);
newNode.next = p.next;

// insert the new node
p.next = newNode;

// now the linked list becomes 1 -> 2 -> 3 -> 66 -> 4 -> 5
``` 

This operation has O(n)O(n)O(n) time complexity because we need to find the predecessor of the insertion position first.

Inserting in the Middle of a Singly Linked List

### Delete

Deleting a Node from a Singly Linked List

To delete a node, first find the predecessor of the node to be deleted, then point the predecessor's `next` pointer to the node after the one being deleted. This effectively removes the target node from the list.

```java
// create a singly linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// to delete the 4th node, we need to operate on the predecessor node
ListNode p = head;
for (int i = 0; i < 2; i++) {
    p = p.next;
}

// at this point, p points to the 3rd node, which is the predecessor of the node to be deleted
// remove the 4th node from the linked list
p.next = p.next.next;

// now the linked list becomes 1 -> 2 -> 3 -> 5
``` 

This operation has O(n)O(n)O(n) time complexity because we need to find the predecessor of the node being deleted first.

Deleting a Node from a Singly Linked List

Deleting from the Tail of a Singly Linked List

This is pretty simple—find the second-to-last node and set its `next` pointer to null:

```java
// create a singly linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// delete the tail node
ListNode p = head;
// find the second to last node
while (p.next.next != null) {
    p = p.next;
}

// now p points to the second to last node
// remove the tail node from the linked list
p.next = null;

// now the linked list becomes 1 -> 2 -> 3 -> 4
``` 

This operation has O(n)O(n)O(n) time complexity because we need to traverse to the second-to-last node first.

Deleting from the Tail of a Singly Linked List

Deleting from the Head of a Singly Linked List

This is simple—just move `head` to the next node. Let's look at the code:

```java
// create a singly linked list
ListNode head = createLinkedList(new int[]{1, 2, 3, 4, 5});

// delete the head node
head = head.next;

// now the linked list becomes 2 -> 3 -> 4 -> 5
``` 

This operation has O(1)O(1)O(1) time complexity.

You might be wondering: the old head node `1` still has its next pointer pointing to node `2`. Could this cause a memory leak?

Nope. It doesn't matter that node `1` points to other nodes. As long as nothing else points to node `1`, the garbage collector will clean it up.

That said, if you want to explicitly set node `1`'s next pointer to null, that's a good habit. In other scenarios, it can help prevent potential issues with dangling pointers.

In the visualization below, I explicitly set the deleted node's next pointer to null:

Deleting from the Head of a Singly Linked List

Feeling Overwhelmed?

Linked list operations are definitely more complex than array operations. Since linked list nodes aren't stored contiguously, inserting or deleting a node requires finding its predecessor and successor first, then coordinating pointer updates.

The code above only covers the simplest cases. Notice how inserting at the head, tail, and middle all require different code. If you want to implement a production-ready linked list, you'll also need to handle many edge cases—like when the list is empty, or when the predecessor or successor nodes are null.

And remember, we've only covered singly linked lists. In the next chapter, we'll implement a doubly linked list, which requires maintaining both predecessor and successor pointers. The pointer manipulation gets even more involved.

Scared yet? Don't be. It's not as hard as it sounds, for a few reasons:

  1. There are really only a handful of operations to learn. Once you implement the linked list API yourself, it'll click.

  2. I've included visualizations for the complex operations. Use the code and animations together to build your understanding.

  3. Most importantly, we'll use the **dummy head node** technique. This unifies head, tail, and middle operations, and also eliminates the need to handle edge cases where head or tail pointers might be null.

The dummy node technique also comes up frequently in [Classic Singly Linked List Techniques](</en/algo/essential-technique/linked-list-skills-summary/>). I'm just mentioning it briefly here—we'll cover the implementation details later.

## Basic Operations on Doubly Linked Lists

Let's start with a utility function to create a doubly linked list—this will come in handy for the examples below:

```java
class DoublyListNode {
    int val;
    DoublyListNode next, prev;
    DoublyListNode(int x) { val = x; }
}

DoublyListNode createDoublyLinkedList(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }
    DoublyListNode head = new DoublyListNode(arr[0]);
    DoublyListNode cur = head;
    // use a for loop to iteratively create the doubly linked list
    for (int i = 1; i < arr.length; i++) {
        DoublyListNode newNode = new DoublyListNode(arr[i]);
        cur.next = newNode;
        newNode.prev = cur;
        cur = cur.next;
    }
    return head;
}
``` 

### Read/Update

Traversing, Searching, and Modifying a Doubly Linked List

To traverse or search a doubly linked list, you can start from either the head or tail and move in whichever direction you need:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});
DoublyListNode tail = null;

// traverse the doubly linked list from the head node to the end
for (DoublyListNode p = head; p != null; p = p.next) {
    System.out.println(p.val);
    tail = p;
}

// traverse the doubly linked list from the tail node to the front
for (DoublyListNode p = tail; p != null; p = p.prev) {
    System.out.println(p.val);
}
``` 

The worst-case time complexity is O(n)O(n)O(n). When accessing or modifying a node, you can choose which direction to traverse based on whether the index is closer to the head or tail—a nice little optimization.

### Insert

Inserting at the Head of a Doubly Linked List

To insert at the head, you need to update the pointers for both the new node and the original head:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

// insert a new node 0 at the head of the doubly linked list
DoublyListNode newHead = new DoublyListNode(0);
newHead.next = head;
head.prev = newHead;
head = newHead;
// now the list becomes 0 -> 1 -> 2 -> 3 -> 4 -> 5
``` 

Time complexity is O(1)O(1)O(1).

Inserting at the Head of a Doubly Linked List

Inserting at the Tail of a Doubly Linked List

Inserting at the tail is straightforward if you have a reference to the tail node:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

DoublyListNode tail = head;
// first, go to the last node of the linked list
while (tail.next != null) {
    tail = tail.next;
}

// insert a new node with value 6 at the end of the doubly linked list
DoublyListNode newNode = new DoublyListNode(6);
tail.next = newNode;
newNode.prev = tail;
// update the tail node reference
tail = newNode;

// now the linked list becomes 1 -> 2 -> 3 -> 4 -> 5 -> 6
``` 

Time complexity is O(n)O(n)O(n) since you need to traverse to the tail first. If you already have a reference to the tail, it's O(1)O(1)O(1).

Inserting at the Tail of a Doubly Linked List

Inserting in the Middle of a Doubly Linked List

To insert at a specific position, you need to update the pointers of both the predecessor and successor nodes.

For example, here's how to insert element 66 at index 3 (the 4th position):

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

// if we want to insert at index 3 (4th node)
// we need to operate the node at index 2
DoublyListNode p = head;
for (int i = 0; i < 2; i++) {
    p = p.next;
}

// assemble the new node
DoublyListNode newNode = new DoublyListNode(66);
newNode.next = p.next;
newNode.prev = p;

// insert the new node
p.next.prev = newNode;
p.next = newNode;

// now the linked list becomes 1 -> 2 -> 3 -> 66 -> 4 -> 5
``` 

Time complexity is O(n)O(n)O(n) because you need to find the insertion point first.

Inserting in the Middle of a Doubly Linked List

### Delete

Deleting a Node from a Doubly Linked List

To delete a node, you need to update the predecessor and successor pointers to remove the target node from the chain:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

// delete the 4th node
// first find the 3rd node
DoublyListNode p = head;
for (int i = 0; i < 2; i++) {
    p = p.next;
}

// now p points to the 3rd node, we remove the node after it
DoublyListNode toDelete = p.next;

// remove toDelete from the list
p.next = toDelete.next;
toDelete.next.prev = p;

// setting toDelete's previous and next pointers to null is a good habit (optional)
toDelete.next = null;
toDelete.prev = null;

// now the list becomes 1 -> 2 -> 3 -> 5
``` 

Time complexity is O(n)O(n)O(n) because you need to find the node first. If you already have a reference to the node, the deletion itself is O(1)O(1)O(1).

Deleting a Node from a Doubly Linked List

Deleting from the Head of a Doubly Linked List

To delete from the head, just update the head pointer:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

// delete the head node
DoublyListNode toDelete = head;
head = head.next;
head.prev = null;

// clear the pointers of the deleted node
toDelete.next = null;

// now the linked list becomes 2 -> 3 -> 4 -> 5
``` 

Time complexity is O(1)O(1)O(1).

Deleting from the Head of a Doubly Linked List

Deleting from the Tail of a Doubly Linked List

In a singly linked list, deleting the tail is tricky—you have to traverse to the second-to-last node and manipulate its `next` pointer to remove the tail.

With a doubly linked list, since each node stores a pointer to its predecessor, you can work directly with the tail node to remove itself from the list:

```java
// create a doubly linked list
DoublyListNode head = createDoublyLinkedList(new int[]{1, 2, 3, 4, 5});

// delete the tail node
DoublyListNode p = head;
// find the tail node
while (p.next != null) {
    p = p.next;
}

// now p points to the tail node
// remove the tail node from the list
p.prev.next = null;

// it's a good habit to disconnect all pointers of the deleted node (optional)
p.prev = null;

// now the list becomes 1 -> 2 -> 3 -> 4
``` 

Time complexity is O(n)O(n)O(n) since you need to traverse to the tail first. If you already have a reference to the tail, it's O(1)O(1)O(1).

Deleting from the Tail of a Doubly Linked List

## What's Next

In the next article, we'll implement a `MyLinkedList` class with full CRUD operations using both singly and doubly linked lists. We'll also introduce the "dummy head" technique to simplify our code and avoid those annoying edge cases when the head or tail pointers are null.

Last updated: 03/14/2026, 12:17 AM
