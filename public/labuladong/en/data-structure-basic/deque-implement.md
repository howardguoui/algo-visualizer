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

```java
class MyDeque<E> {
    // insert element at the head, time complexity O(1)
    void addFirst(E e);

    // insert element at the tail, time complexity O(1)
    void addLast(E e);

    // remove element from the head, time complexity O(1)
    E removeFirst();

    // remove element from the tail, time complexity O(1)
    E removeLast();

    // peek at the head element, time complexity O(1)
    E peekFirst();

    // peek at the tail element, time complexity O(1)
    E peekLast();
}
``` 

A [standard queue](</en/algo/data-structure-basic/queue-stack-basic/>) only allows inserting elements at the tail and removing elements from the head. In contrast, a deque allows inserting and removing elements from both the head and the tail.

A normal queue is like lining up to buy tickets: first come, first served. A deque is like a pedestrian bridge where you can enter or exit from either end. Of course, the elements in a deque no longer follow the "first in, first out" rule, because it is more flexible.

In algorithm problems, deques are not used very often. They are a bit more common in Python because the Python standard library does not provide built-in stack and queue types, so a deque is often used to simulate a standard queue.

## Implementing a Deque with a Linked List

This is simple. Just reuse the [`MyLinkedList`](</en/algo/data-structure-basic/linkedlist-implement/>) class we implemented earlier, or use the doubly linked list structure provided by your programming language's standard library. A doubly linked list naturally supports O(1)O(1)O(1) time complexity for adding and removing elements at the head and tail:

```java
import java.util.LinkedList;

public class MyListDeque<E> {
    private LinkedList<E> list = new LinkedList<>();

    // insert element at the head of the deque, time complexity O(1)
    void addFirst(E e) {
        list.addFirst(e);
    }

    // insert element at the tail of the deque, time complexity O(1)
    void addLast(E e) {
        list.addLast(e);
    }

    // remove element from the head of the deque, time complexity O(1)
    E removeFirst() {
        return list.removeFirst();
    }

    // remove element from the tail of the deque, time complexity O(1)
    E removeLast() {
        return list.removeLast();
    }

    // peek at the head element of the deque, time complexity O(1)
    E peekFirst() {
        return list.getFirst();
    }

    // peek at the tail element of the deque, time complexity O(1)
    E peekLast() {
        return list.getLast();
    }

    public static void main(String[] args) {
        MyListDeque<Integer> deque = new MyListDeque<>();
        deque.addFirst(1);
        deque.addFirst(2);
        deque.addLast(3);
        deque.addLast(4);

        System.out.println(deque.removeFirst()); // 2
        System.out.println(deque.removeLast()); // 4
        System.out.println(deque.peekFirst()); // 1
        System.out.println(deque.peekLast()); // 3
    }
}
``` 

## Implementing a Deque with an Array

This is also straightforward. Just reuse the methods we wrote for `CycleArray` in [Circular Array Techniques](</en/algo/data-structure-basic/cycle-array/>). Both adding and removing elements at the head and tail of a circular array are O(1)O(1)O(1) operations:

```java
class MyArrayDeque<E> {
    private CycleArray<E> arr = new CycleArray<>();

    // insert element from the front of the deque, time complexity O(1)
    void addFirst(E e) {
        arr.addFirst(e);
    }

    // insert element from the end of the deque, time complexity O(1)
    void addLast(E e) {
        arr.addLast(e);
    }

    // remove element from the front of the deque, time complexity O(1)
    E removeFirst() {
        return arr.removeFirst();
    }

    // remove element from the end of the deque, time complexity O(1)
    E removeLast() {
        return arr.removeLast();
    }

    // peek at the front element of the deque, time complexity O(1)
    E peekFirst() {
        return arr.getFirst();
    }

    // peek at the end element of the deque, time complexity O(1)
    E peekLast() {
        return arr.getLast();
    }
}
``` 

Last updated: 03/14/2026, 12:17 AM
