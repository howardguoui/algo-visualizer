# Implement Queue/Stack with Linked List

> Source: https://labuladong.online/algo/en/data-structure-basic/linked-queue-stack/
> Archived: labuladong.online

---

# Implement Queue/Stack with Linked List

Prerequisites

Before reading this article, you need to learn:

  * [The basics of Queue/Stack](/en/algo/data-structure-basic/queue-stack-basic/)
  * [The basics of Arrays](/en/algo/data-structure-basic/array-basic/)


## ¶Implementing a Stack with a Linked List

Some of you may already know how to use a linked list as the base data structure for implementing a queue or a stack. It is very simple — you can just use the API of the standard doubly linked list.

Here I use the standard library's linked list container. If you use the `MyLinkedList` we wrote before, the logic is the same.

CC++GoJavaJavaScriptPython
    
    
    import java.util.LinkedList;
    
    // Implement a stack using linked list as the underlying data structure
    public class MyLinkedStack<E> {
        private final LinkedList<E> list = new LinkedList<>();
    
        // Add an element to the top of the stack, time complexity O(1)
        public void push(E e) {
            list.addLast(e);
        }
    
        // Pop an element from the top of the stack, time complexity O(1)
        public E pop() {
            return list.removeLast();
        }
    
        // Look at the top element of the stack, time complexity O(1)
        public E peek() {
            return list.getLast();
        }
    
        // Return the number of elements in the stack, time complexity O(1)
        public int size() {
            return list.size();
        }
    
        public static void main(String[] args) {
            MyLinkedStack<Integer> stack = new MyLinkedStack<>();
            stack.push(1);
            stack.push(2);
            stack.push(3);
    
            System.out.println(stack.peek()); // 3
            System.out.println(stack.pop()); // 3
            System.out.println(stack.peek()); // 2
        }
    }

Note

The code above uses the tail of the doubly linked list as the top of the stack. Adding or removing elements at the tail (stack top) has time complexity O(1), which meets the requirement.

Of course, you can also use the head of the doubly linked list as the top of the stack. Since adding or removing elements at the head is also O(1), this method works too. You only need to make a few changes, such as changing `addLast` to `addFirst`, `removeLast` to `removeFirst`, and `getLast` to `getFirst`.

## ¶Implementing a Queue with a Linked List

Similarly, you can use a linked list to implement a queue — just use the API of the doubly linked list:

CC++GoJavaJavaScriptPython
    
    
    import java.util.LinkedList;
    
    // use LinkedList as the underlying data structure to implement the queue
    public class MyLinkedQueue<E> {
        private final LinkedList<E> list = new LinkedList<>();
    
        // insert element to the end of the queue, time complexity O(1)
        public void push(E e) {
            list.addLast(e);
        }
    
        // remove element from the front of the queue, time complexity O(1)
        public E pop() {
            return list.removeFirst();
        }
    
        // view the front element of the queue, time complexity O(1)
        public E peek() {
            return list.getFirst();
        }
    
        // return the number of elements in the queue, time complexity O(1)
        public int size() {
            return list.size();
        }
    
        public static void main(String[] args) {
            MyLinkedQueue<Integer> queue = new MyLinkedQueue<>();
            queue.push(1);
            queue.push(2);
            queue.push(3);
    
            System.out.println(queue.peek()); // 1
            System.out.println(queue.pop()); // 1
            System.out.println(queue.pop()); // 2
            System.out.println(queue.peek()); // 3
        }
    }

Note

The code above uses the tail of the doubly linked list as the queue tail, and the head as the queue head. Adding or removing elements at either end has time complexity O(1), which matches the requirements of a queue.

You can also do the opposite: use the head as the queue tail and the tail as the queue head. Just like with the stack implementation, you only need to change how you call the list methods.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
