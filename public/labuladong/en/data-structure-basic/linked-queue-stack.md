# Implement Queue/Stack with Linked List

> Source: https://labuladong.online/algo/en/data-structure-basic/linked-queue-stack/
> Archived: labuladong.online

---

# Implement Queue/Stack with Linked List

Prerequisites

Before reading this article, you need to learn:

  * [The basics of Queue/Stack](</en/algo/data-structure-basic/queue-stack-basic/>)
  * [The basics of Arrays](</en/algo/data-structure-basic/array-basic/>)

## Implementing a Stack with a Linked List

Some of you may already know how to use a linked list as the base data structure for implementing a queue or a stack. It is very simple — you can just use the API of the standard doubly linked list.

Here I use the standard library's linked list container. If you use the `MyLinkedList` we wrote before, the logic is the same.

```python
from collections import deque

# Implement stack using linked list as underlying data structure
# Python's deque is a double-ended linked list
class MyLinkedStack:
    def __init__(self):
        self.list = deque()

    # Add element to the top of the stack, time complexity O(1)
    def push(self, e):
        self.list.append(e)

    # Pop element from the top of the stack, time complexity O(1)
    def pop(self):
        return self.list.pop()

    # Peek at the top element of the stack, time complexity O(1)
    def peek(self):
        return self.list[-1]

    # Return the number of elements in the stack, time complexity O(1)
    def size(self):
        return len(self.list)

if __name__ == "__main__":
    stack = MyLinkedStack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(stack.pop())
    print(stack.peek())
    print(stack.size())
``` 

Note

The code above uses the tail of the doubly linked list as the top of the stack. Adding or removing elements at the tail (stack top) has time complexity O(1), which meets the requirement.

Of course, you can also use the head of the doubly linked list as the top of the stack. Since adding or removing elements at the head is also O(1), this method works too. You only need to make a few changes, such as changing `addLast` to `addFirst`, `removeLast` to `removeFirst`, and `getLast` to `getFirst`.

## Implementing a Queue with a Linked List

Similarly, you can use a linked list to implement a queue — just use the API of the doubly linked list:

```python
# deque is a doubly linked list in Python
from collections import deque

# use a linked list as the underlying data structure to implement the queue
# Python's deque is a doubly linked list
class MyLinkedQueue:
    def __init__(self):
        self.list = deque()

    # insert an element at the end of the queue, time complexity O(1)
    def push(self, e):
        self.list.append(e)

    # remove an element from the head of the queue, time complexity O(1)
    def pop(self):
        return self.list.popleft()

    # view the element at the head of the queue, time complexity O(1)
    def peek(self):
        return self.list[0]

    # return the number of elements in the queue, time complexity O(1)
    def size(self):
        return len(self.list)

if __name__ == "__main__":
    queue = MyLinkedQueue()
    queue.push(1)
    queue.push(2)
    queue.push(3)
    print(queue.peek()) # 1
    print(queue.pop()) # 1
    print(queue.pop()) # 2
    print(queue.peek()) # 3
``` 

Note

The code above uses the tail of the doubly linked list as the queue tail, and the head as the queue head. Adding or removing elements at either end has time complexity O(1), which matches the requirements of a queue.

You can also do the opposite: use the head as the queue tail and the tail as the queue head. Just like with the stack implementation, you only need to change how you call the list methods.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
