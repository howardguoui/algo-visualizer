# Implement Queue/Stack with Array

> Source: https://labuladong.online/algo/en/data-structure-basic/array-queue-stack/
> Archived: labuladong.online

---

# Implement Queue/Stack with Array

Prerequisites

Before reading this article, you need to learn:

  * [Basic Principles of Queue/Stack](/en/algo/data-structure-basic/queue-stack-basic/)


In this article, we will use arrays as the basic data structure to implement stacks and queues.

## ¶Implementing Stack Using Array

Let's first use an array to implement a stack. This is simple. Treat the end of the dynamic array as the top of the stack, then just call the dynamic array's API. Adding or removing elements at the end of an array takes O(1)O(1)O(1) time, which fits the stack's requirements.

Here I use the standard library's dynamic array. If you want to use the `MyArrayList` we made before, it works the same way:

CC++GoJavaJavaScriptPython
    
    
    // use array as the underlying data structure to implement stack
    public class MyArrayStack<E> {
        private ArrayList<E> arr = new ArrayList<>();
    
        // add element to the top of the stack, time complexity O(1)
        public void push(E e) {
            arr.add(e);
        }
    
        // pop element from the top of the stack, time complexity O(1)
        public E pop() {
            return arr.remove(arr.size() - 1);
        }
    
        // peek the top element of the stack, time complexity O(1)
        public E peek() {
            return arr.get(arr.size() - 1);
        }
    
        // return the number of elements in the stack, time complexity O(1)
        public int size() {
            return arr.size();
        }
    }

Can We Use the Head of the Array as the Stack Top?

According to the way we implemented `MyArrayList` before, it's not possible. Adding or removing elements at the head of an array takes O(n)O(n)O(n) time, which is not good for a stack.

But we can use the `CycleArray` class from [Circular Array Technique](/en/algo/data-structure-basic/cycle-array/). In this data structure, adding and removing elements at the head takes O(1)O(1)O(1) time, which fits the stack's needs.

You can use the `addFirst` and `removeFirst` methods of `CycleArray` to make stack APIs. I won't write the code here.

## ¶Implementing Queue Using Array

With the `CycleArray` class from [Circular Array Technique](/en/algo/data-structure-basic/cycle-array/), using an array to build a queue is simple. Just use the `CycleArray` we wrote before, and you can get a standard queue. Of course, some programming languages also have built-in circular arrays, feel free to use them as well:

CC++GoJavaJavaScriptPython
    
    
    public class MyArrayQueue<E> {
        private CycleArray<E> arr;
    
        public MyArrayQueue() {
            arr = new CycleArray<>();
        }
    
        public void push(E t) {
            arr.addLast(t);
        }
    
        public E pop() {
            return arr.removeFirst();
        }
    
        public E peek() {
            return arr.getFirst();
        }
    
        public int size() {
            return arr.size();
        }
    }

Last updated: 03/14/2026, 12:17 AM

Loading comments...
