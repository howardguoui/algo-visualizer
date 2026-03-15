# Deque Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/deque-implement/
> Archived: labuladong.online

---

# Deque Implementation

Prerequisites

Before reading this article, you should first study:

  * [Queue/Stack Basics](</en/algo/data-structure-basic/queue-stack-basic/>)
  * [Circular Array Techniques](</en/algo/data-structure-basic/cycle-array/>)

## Basic Principle

If you have understood the previous content, there is not much new to discuss about the deque. A double-ended queue (deque) is just a queue that allows more operations compared to a standard queue (FIFO):

```python
class MyDeque:
    # insert an element at the front, time complexity O(1)
    def add_first(self, e):
        pass

    # insert an element at the back, time complexity O(1)
    def add_last(self, e):
        pass

    # remove an element from the front, time complexity O(1)
    def remove_first(self):
        pass

    # remove an element from the back, time complexity O(1)
    def remove_last(self):
        pass

    # peek at the front element, time complexity O(1)
    def peek_first(self):
        pass

    # peek at the back element, time complexity O(1)
    def peek_last(self):
        pass
``` 

A [standard queue](</en/algo/data-structure-basic/queue-stack-basic/>) only allows inserting elements at the tail and removing elements from the head. In contrast, a deque allows inserting and removing elements from both the head and the tail.

A normal queue is like lining up to buy tickets: first come, first served. A deque is like a pedestrian bridge where you can enter or exit from either end. Of course, the elements in a deque no longer follow the "first in, first out" rule, because it is more flexible.

In algorithm problems, deques are not used very often. They are a bit more common in Python because the Python standard library does not provide built-in stack and queue types, so a deque is often used to simulate a standard queue.

## Implementing a Deque with a Linked List

This is simple. Just reuse the [`MyLinkedList`](</en/algo/data-structure-basic/linkedlist-implement/>) class we implemented earlier, or use the doubly linked list structure provided by your programming language's standard library. A doubly linked list naturally supports O(1)O(1)O(1) time complexity for adding and removing elements at the head and tail:

```python
class MyListDeque:
    def __init__(self):
        # use the `MyLinkedList` class we implemented before
        self.list = MyLinkedList()

    # insert element at the front, time complexity O(1)
    def add_first(self, e):
        self.list.add_first(e)

    # insert element at the back, time complexity O(1)
    def add_last(self, e):
        self.list.add_last(e)

    # remove element from the front, time complexity O(1)
    def remove_first(self):
        return self.list.remove_first()

    # remove element from the back, time complexity O(1)
    def remove_last(self):
        return self.list.remove_last()

    # peek at the front element, time complexity O(1)
    def peek_first(self):
        return self.list.get_first()

    # peek at the back element, time complexity O(1)
    def peek_last(self):
        return self.list.get_last()

# usage example
my_deque = MyListDeque()

my_deque.add_first(1)
my_deque.add_first(2)
my_deque.add_last(3)
my_deque.add_last(4)

print(my_deque.remove_first())  # 2
print(my_deque.remove_last())  # 4
print(my_deque.peek_first())  # 1
print(my_deque.peek_last())  # 3
``` 

## Implementing a Deque with an Array

This is also straightforward. Just reuse the methods we wrote for `CycleArray` in [Circular Array Techniques](</en/algo/data-structure-basic/cycle-array/>). Both adding and removing elements at the head and tail of a circular array are O(1)O(1)O(1) operations:

```python
class MyArrayDeque:
    def __init__(self):
        self.arr = CycleArray()

    # insert element from the front, time complexity O(1)
    def add_first(self, e):
        self.arr.add_first(e)

    # insert element from the back, time complexity O(1)
    def add_last(self, e):
        self.arr.add_last(e)

    # remove element from the front, time complexity O(1)
    def remove_first(self):
        return self.arr.remove_first()

    # remove element from the back, time complexity O(1)
    def remove_last(self):
        return self.arr.remove_last()

    # peek at the front element, time complexity O(1)
    def peek_first(self):
        return self.arr.get_first()

    # peek at the back element, time complexity O(1)
    def peek_last(self):
        return self.arr.get_last()
``` 

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
