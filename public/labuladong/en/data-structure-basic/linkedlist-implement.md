# Linked List Code Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/linkedlist-implement/
> Archived: labuladong.online

---

# Linked List Code Implementation

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[707\. Design Linked List](<https://leetcode.com/problems/design-linked-list/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first study:

  * [Linked List Basics (Linked Storage)](</en/algo/data-structure-basic/linkedlist-basic/>)

## Several Key Points

Below I will use both doubly linked list and singly linked list to give a simple `MyLinkedList` implementation, with basic add, delete, search, and update operations. Here are some key points you should pay special attention to when reading the code.

### Key Point 1: Keep References to Both Head and Tail

On LeetCode, problems usually only give you the head pointer of a singly linked list. But in real development, we usually use doubly linked lists, and a doubly linked list usually keeps references to both head and tail.

In software development, adding an element at the end of a container is a very common operation. If a doubly linked list holds a reference to the tail node, then adding at the tail only costs time complexity O(1)O(1)O(1).

For a singly linked list, holding a tail reference also gives optimization. For example, if you want to add a node at the tail and you do not have a tail reference, you must traverse the whole list to find the tail node, which is O(n)O(n)O(n) time. If you have the tail reference, you can finish the tail insertion in O(1)O(1)O(1) time.

You might say: even so, once you delete the tail node of a singly linked list, the old tail reference becomes invalid, and you still have to traverse the list to find the new tail.

Yes, but think more carefully: when you delete the tail node in a singly linked list, you must also traverse to the second-to-last node (the predecessor of the tail) so you can delete the tail via pointer operations. At that moment, you can just update the tail reference to this second-to-last node.

### Key Point 2: Dummy Head and Tail Nodes

In the previous article [Linked List Basics](</en/algo/data-structure-basic/linkedlist-basic/>), I mentioned the “dummy head and tail node” trick. The idea is simple: when you create a doubly linked list, you also create a dummy head node and a dummy tail node. These two nodes always exist, no matter whether the list is empty or not. This avoids null pointer problems and removes many edge cases.

For example, assume the dummy head and tail are `dummyHead` and `dummyTail`. Then an empty doubly linked list looks like this:

```
dummyHead <-> dummyTail
``` 

If you add elements `1, 2, 3`, the list becomes:

```
dummyHead <-> 1 <-> 2 <-> 3 <-> dummyTail
``` 

In the past, you had to treat inserting at the head, inserting at the tail, and inserting in the middle as three separate cases. With dummy head and tail nodes, no matter whether the list is empty, you only need to think about “insert between two nodes”. This makes the code much simpler.

Of course, dummy nodes use a little extra memory, but compared to the trouble they save you, the cost is worth it.

For singly linked lists, a dummy head can simplify the code, but a dummy tail is not very useful.

Dummy Nodes Are Internal Only

Dummy nodes are an internal trick for your data structure implementation. They are invisible to the outside.

For example, for a `get(index)` method that gets an element by index, you always count the index from real nodes, not from dummy nodes.

### Key Point 3: Memory Leak?

In the earlier article [Dynamic Array Implementation](</en/algo/data-structure-basic/array-implement/>), I said you should be careful about memory leak when deleting elements. So, will deleting nodes in a linked list also cause memory leak?

Especially with code like this — do you think there is a problem?

```
// Suppose the singly linked list head is head = 1 -> 2 -> 3 -> 4 -> 5

// Delete the head node
head = head.next;

// Now head = 2 -> 3 -> 4 -> 5
``` 

You might think this causes a memory leak, because the original head node `1` still has its `next` pointer pointing to node `2`.

But in fact this is OK. Java’s garbage collector only cares whether an object is referenced by others. It does not care whether this object still references other objects.

Node `1` still has its `next` pointer pointing to node `2`, but no other pointer refers to node `1` anymore. So node `1` will be collected and freed by the garbage collector. This is different from the array deletion case. Think about it carefully.

That said, when deleting a node, it is still a good habit to set all its pointers to `null`. This costs almost nothing and may avoid some hidden bugs. So in the code below, I will set the deleted node’s pointers to `null`, whether strictly needed or not.

How to Verify Your Implementation?

You can use LeetCode problem 707, “[Design Linked List](<https://leetcode.com/problems/design-linked-list/>)”, to test whether your implementation is correct. Note that the add/delete/search/update method names required in 707 are different from those in this article, so you need to adjust them before submitting.

## Doubly Linked List Implementation

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None

class MyLinkedList:
    # virtual head and tail nodes
    def __init__(self):
        self.head = Node(None)
        self.tail = Node(None)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    # ***** Add *****

    def add_last(self, e):
        x = Node(e)
        temp = self.tail.prev

        temp.next = x
        x.prev = temp
        # temp <-> x

        x.next = self.tail
        self.tail.prev = x
        # temp <-> x <-> tail
        self.size += 1

    def add_first(self, e):
        x = Node(e)
        temp = self.head.next
        # head <-> temp
        temp.prev = x
        x.next = temp

        self.head.next = x
        x.prev = self.head
        # head <-> x <-> temp
        self.size += 1

    def add(self, index, element):
        self.check_position_index(index)
        if index == self.size:
            self.add_last(element)
            return

        # find the Node corresponding to index
        p = self.get_node(index)
        temp = p.prev
        # temp <-> p

        # new Node to be inserted
        x = Node(element)

        p.prev = x
        temp.next = x

        x.prev = temp
        x.next = p

        # temp <-> x <-> p

        self.size += 1

    # ***** Remove *****

    def remove_first(self):
        if self.size < 1:
            raise IndexError("No elements to remove")
        # the existence of virtual nodes prevents us from having to consider null pointers
        x = self.head.next
        temp = x.next
        # head <-> x <-> temp
        self.head.next = temp
        temp.prev = self.head

        # head <-> temp

        self.size -= 1
        return x.val

    def remove_last(self):
        if self.size < 1:
            raise IndexError("No elements to remove")
        x = self.tail.prev
        temp = x.prev
        # temp <-> x <-> tail

        self.tail.prev = temp
        temp.next = self.tail

        # temp <-> tail

        self.size -= 1
        return x.val

    def remove(self, index):
        self.check_element_index(index)
        # find the Node corresponding to index
        x = self.get_node(index)
        prev = x.prev
        next = x.next
        # prev <-> x <-> next
        prev.next = next
        next.prev = prev

        self.size -= 1

        return x.val

    # ***** Get *****

    def get(self, index):
        self.check_element_index(index)
        # find the Node corresponding to index
        p = self.get_node(index)

        return p.val

    def get_first(self):
        if self.size < 1:
            raise IndexError("No elements in the list")

        return self.head.next.val

    def get_last(self):
        if self.size < 1:
            raise IndexError("No elements in the list")

        return self.tail.prev.val

    # ***** Set *****

    def set(self, index, val):
        self.check_element_index(index)
        # find the Node corresponding to index
        p = self.get_node(index)

        old_val = p.val
        p.val = val

        return old_val

    # ***** Other utility functions *****

    def size(self):
        return self.size

    def is_empty(self):
        return self.size == 0

    def get_node(self, index):
        self.check_element_index(index)
        p = self.head.next
        # TODO: Can be optimized by deciding whether to
        # traverse from head or tail based on index
        for _ in range(index):
            p = p.next
        return p

    def is_element_index(self, index):
        return 0 <= index < self.size

    def is_position_index(self, index):
        return 0 <= index <= self.size

    # Check if the index position can contain an element
    def check_element_index(self, index):
        if not self.is_element_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    # Check if the index position can add an element
    def check_position_index(self, index):
        if not self.is_position_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    def display(self):
        print(f"size = {self.size}")
        p = self.head.next
        while p != self.tail:
            print(f"{p.val} <-> ", end="")
            p = p.next
        print("null
")

if __name__ == "__main__":
    list = MyLinkedList()
    list.add_last(1)
    list.add_last(2)
    list.add_last(3)
    list.add_first(0)
    list.add(2, 100)

    list.display()
    # size = 5
    # 0 <-> 1 <-> 100 <-> 2 <-> 3 <-> null
``` 

## Singly Linked List Implementation

```python
class MyLinkedList2:

    class Node:
        def __init__(self, val):
            self.val = val
            self.next = None

    def __init__(self):
        self.head = self.Node(None)
        self.tail = self.head
        self.size = 0

    def add_first(self, e):
        new_node = self.Node(e)
        new_node.next = self.head.next
        self.head.next = new_node
        if self.size == 0:
            self.tail = new_node
        self.size += 1

    def add_last(self, e):
        new_node = self.Node(e)
        self.tail.next = new_node
        self.tail = new_node
        self.size += 1

    def add(self, index, element):
        self.check_position_index(index)

        if index == self.size:
            self.add_last(element)
            return

        prev = self.head
        for i in range(index):
            prev = prev.next
        new_node = self.Node(element)
        new_node.next = prev.next
        prev.next = new_node
        self.size += 1

    def remove_first(self):
        if self.is_empty():
            raise Exception("NoSuchElementException")
        first = self.head.next
        self.head.next = first.next
        if self.size == 1:
            self.tail = self.head
        self.size -= 1
        return first.val

    def remove_last(self):
        if self.is_empty():
            raise Exception("NoSuchElementException")

        prev = self.head
        while prev.next != self.tail:
            prev = prev.next
        val = self.tail.val
        prev.next = None
        self.tail = prev
        self.size -= 1
        return val

    def remove(self, index):
        self.check_element_index(index)

        prev = self.head
        for i in range(index):
            prev = prev.next

        node_to_remove = prev.next
        prev.next = node_to_remove.next
        # deleting the last element
        if index == self.size - 1:
            self.tail = prev
        self.size -= 1
        return node_to_remove.val

    # ***** Retrieve *****

    def get_first(self):
        if self.is_empty():
            raise Exception("NoSuchElementException")
        return self.head.next.val

    def get_last(self):
        if self.is_empty():
            raise Exception("NoSuchElementException")
        return self.tail.val

    def get(self, index):
        self.check_element_index(index)
        p = self.get_node(index)
        return p.val

    # ***** Update *****

    def set(self, index, element):
        self.check_element_index(index)
        p = self.get_node(index)

        old_val = p.val
        p.val = element

        return old_val

    # ***** Other Utility Functions *****
    def get_size(self):
        return self.size

    def is_empty(self):
        return self.size == 0

    def is_element_index(self, index):
        return 0 <= index < self.size

    def is_position_index(self, index):
        return 0 <= index <= self.size

    # Check if the index position can have an element
    def check_element_index(self, index):
        if not self.is_element_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    # Check if the index position can add an element
    def check_position_index(self, index):
        if not self.is_position_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    # Return the Node corresponding to the index
    # Note: Please ensure that the passed index is valid
    def get_node(self, index):
        p = self.head.next
        for i in range(index):
            p = p.next
        return p

if __name__ == "__main__":
    list = MyLinkedList2()
    list.add_first(1)
    list.add_first(2)
    list.add_last(3)
    list.add_last(4)
    list.add(2, 5)

    print(list.remove_first())  # 2
    print(list.remove_last())   # 4
    print(list.remove(1))       # 5

    print(list.get_first())     # 1
    print(list.get_last())      # 3
    print(list.get(1))          # 3
``` 

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
