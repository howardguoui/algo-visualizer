# Implement Stack with Queue, Implement Queue with Stack

> Source: https://labuladong.online/algo/en/data-structure/stack-queue/
> Archived: labuladong.online

---

# Implement Stack with Queue, Implement Queue with Stack

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[232\. Implement Queue using Stacks](<https://leetcode.com/problems/implement-queue-using-stacks/>)|   
[225\. Implement Stack using Queues](<https://leetcode.com/problems/implement-stack-using-queues/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Array Basics](</en/algo/data-structure-basic/array-basic/>)
  * [Linked List Basics](</en/algo/data-structure-basic/linkedlist-basic/>)
  * [Queue and Stack Basics](</en/algo/data-structure-basic/queue-stack-basic/>)

A queue is a first-in-first-out (FIFO) data structure. A stack is a last-in-first-out (LIFO) data structure. Here is a simple illustration:

![diagram](https://labuladong.online/images/algo/stack-queue/1-en.jpg)

Both of these data structures are usually implemented using arrays or linked lists. Their APIs make them different. For more details, see [Principles and Implementation of Queue/Stack](</en/algo/data-structure-basic/queue-stack-basic/>).

Today, let's see how to use a stack to build a queue, and how to use a queue to build a stack.

### 1\. Implementing a Queue Using Stacks

LeetCode Problem 232 "[Implement Queue using Stacks](<https://leetcode.com/problems/implement-queue-using-stacks/>)" asks us to implement the following API:

```python
class MyQueue:

    # add element to the back of the queue
    def push(self, x: int) -> None:
        pass

    # remove and return the front element of the queue
    def pop(self) -> int:
        pass

    # return the front element of the queue
    def peek(self) -> int:
        pass

    # check if the queue is empty
    def empty(self) -> bool:
        pass
``` 

We can use two stacks, `s1` and `s2`, to build a queue. (The diagram below shows how the stacks are arranged for better understanding.)

![diagram](https://labuladong.online/images/algo/stack-queue/2-en.jpg)

When you call `push` to add an element to the queue, just push the element onto `s1`. For example, if you `push` three elements 1, 2, and 3, the stacks look like this:

![diagram](https://labuladong.online/images/algo/stack-queue/3-en.jpg)

Now, what if you want to use `peek` to see the front element of the queue? The front of the queue should be 1, but in `s1`, the number 1 is at the bottom. This is where `s2` comes in. When `s2` is empty, you can pop all elements from `s1` and push them into `s2`. **Now the elements in`s2` are in the correct queue order (first in, first out).**

![diagram](https://labuladong.online/images/algo/stack-queue/4-en.jpg)

When `s2` has elements, you can just use `pop` on `s2` to remove the oldest element. This is how you get the `pop` operation of a queue.

Here is the complete code:

```python
class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    # Push element x to the back of the queue.
    def push(self, x: int) -> None:
        self.s1.append(x)

    # Removes the element from in front of queue and returns that element.
    def pop(self) -> int:
        # call peek first to ensure s2 is not empty
        self.peek()
        return self.s2.pop()

    # Get the front element.
    def peek(self) -> int:
        if not self.s2:
            # push elements from s1 to s2
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    # Returns whether the queue is empty.
    def empty(self) -> bool:
        return not self.s1 and not self.s2
``` 

With this method, we use two stacks to make a queue. The key idea is to let the two stacks work together.

Now, what is the time complexity of these operations?

The `peek` operation is interesting. When you call `peek`, it may trigger a `while` loop, making the time complexity O(N). But in most cases, the `while` loop is not triggered, so the time complexity is O(1). The `pop` operation also calls `peek`, so its time complexity is the same as `peek`.

In this situation, we can say the **worst-case time complexity** is O(N), because the `while` loop **might** need to move all elements from `s1` to `s2`.

But the **amortized time complexity** is O(1). Each element will be moved at most once, so on average, every `peek` operation takes O(1) time per element.

For more on analyzing time complexity, see [Practical Analysis of Time and Space Complexity](</en/algo/essential-technique/complexity-analysis/>).

### 2\. Implementing a Stack Using a Queue

If using two stacks to make a queue is clever, then using a queue to make a stack is more simple and direct. You only need one queue as the base data structure.

LeetCode Problem 225 “[Implement Stack using Queues](<https://leetcode.com/problems/implement-stack-using-queues/>)” asks us to build these APIs:

```python
class MyStack:

    # push element onto stack
    def push(self, x: int) -> None:
        pass
    
    # remove the top element and return it
    def pop(self) -> int:
        pass
    
    # return the top element
    def top(self) -> int:
        pass
    
    # check if the stack is empty
    def empty(self) -> bool:
        pass
``` 

Let's start with the `push` API. Just add the element to the queue and record the last element of the queue. The last element is like the top of the stack. If you want to use `top` to see the top element, you can return it directly:

```python
class MyStack:
    def __init__(self):
        # use a queue q to implement a stack
        self.q = []
        # top element of the stack
        self.top_elem = 0
    
    # add an element to the top of the stack
    def push(self, x: int) -> None:
        # x is the rear of the queue, which is the top of the stack
        self.q.append(x)
        self.top_elem = x
    
    # return the top element of the stack
    def top(self) -> int:
        return self.top_elem

    # check if the stack is empty
    def empty(self) -> bool:
        return len(self.q) == 0
``` 

Our base data structure is a queue, which is first in, first out. Each time you `pop`, you can only take from the front. But a stack is last in, first out, which means the `pop` API needs to take from the end:

![diagram](https://labuladong.online/images/algo/stack-queue/5-en.jpg)

The solution is simple. Take all the elements from the front of the queue and add them to the end, except the last one. This way, the original last element moves to the front, so you can take it out:

![diagram](https://labuladong.online/images/algo/stack-queue/6-en.jpg)

```python
class MyStack:
    # To save space, the code provided above is omitted...

    # Remove the top element of the stack and return it
    def pop(self):
        size = len(self.q)
        while size > 1:
            self.q.append(self.q.pop(0))
            size -= 1
        # The previous last element of the queue is now at the front
        return self.q.pop(0)
``` 

There is one small problem. The last element of the queue is moved to the front and removed, but the `top_elem` variable is not updated. We need to make a small change:

```python
class MyStack:
    # To save space, the code given above is omitted...

    # Remove the top element of the stack and return it
    def pop(self):
        size = len(self.q)
        # Keep the last 2 elements of the queue
        while size > 2:
            self.q.append(self.q.pop(0))
            size -= 1
        # Record the new last element of the queue
        self.top_elem = self.q[0]
        self.q.append(self.q.pop(0))
        # Remove the previous last element of the queue
        return self.q.pop(0)
``` 

Now it works. Here is the complete code:

```python
from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()
        self.top_elem = 0

    # Push element x onto stack
    def push(self, x: int) -> None:
        # x is the tail of the queue, which is the top of the stack
        self.q.append(x)
        self.top_elem = x

    # Removes the element on top of the stack and returns that element
    def top(self) -> int:
        return self.top_elem

    # Removes the element on top of the stack
    def pop(self) -> int:
        size = len(self.q)
        # leave the last 2 elements in the queue
        while size > 2:
            self.q.append(self.q.popleft())
            size -= 1
        # record the new tail element
        self.top_elem = self.q[0]
        self.q.append(self.q.popleft())
        # remove the previous tail element
        return self.q.popleft()

    # Returns whether the stack is empty
    def empty(self) -> bool:
        return not self.q
``` 

It is clear that when you use a queue to make a stack, the `pop` operation takes O(N) time, and the other operations are O(1).

In my opinion, using a queue to make a stack is not very interesting, but using two stacks to make a queue is a good thing to learn.

![diagram](https://labuladong.online/images/algo/stack-queue/4-en.jpg)

After moving elements from stack `s1` to `s2`, the elements in `s2` become first in, first out, just like a queue. This is a bit like “two negatives make a positive” and is not easy to think of at first.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
