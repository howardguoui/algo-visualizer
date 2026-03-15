# Linked List Code Implementation

> Source: https://labuladong.online/algo/en/data-structure-basic/linkedlist-implement/
> Archived: labuladong.online

---

# Linked List Code Implementation

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[707\. Design Linked List](https://leetcode.com/problems/design-linked-list/)|   
  
Prerequisite Knowledge

Before reading this article, you should first study:

  * [Linked List Basics (Linked Storage)](/en/algo/data-structure-basic/linkedlist-basic/)


## ¶Several Key Points

Below I will use both doubly linked list and singly linked list to give a simple `MyLinkedList` implementation, with basic add, delete, search, and update operations. Here are some key points you should pay special attention to when reading the code.

### ¶Key Point 1: Keep References to Both Head and Tail

On LeetCode, problems usually only give you the head pointer of a singly linked list. But in real development, we usually use doubly linked lists, and a doubly linked list usually keeps references to both head and tail.

In software development, adding an element at the end of a container is a very common operation. If a doubly linked list holds a reference to the tail node, then adding at the tail only costs time complexity O(1)O(1)O(1).

For a singly linked list, holding a tail reference also gives optimization. For example, if you want to add a node at the tail and you do not have a tail reference, you must traverse the whole list to find the tail node, which is O(n)O(n)O(n) time. If you have the tail reference, you can finish the tail insertion in O(1)O(1)O(1) time.

You might say: even so, once you delete the tail node of a singly linked list, the old tail reference becomes invalid, and you still have to traverse the list to find the new tail.

Yes, but think more carefully: when you delete the tail node in a singly linked list, you must also traverse to the second-to-last node (the predecessor of the tail) so you can delete the tail via pointer operations. At that moment, you can just update the tail reference to this second-to-last node.

### ¶Key Point 2: Dummy Head and Tail Nodes

In the previous article [Linked List Basics](/en/algo/data-structure-basic/linkedlist-basic/), I mentioned the “dummy head and tail node” trick. The idea is simple: when you create a doubly linked list, you also create a dummy head node and a dummy tail node. These two nodes always exist, no matter whether the list is empty or not. This avoids null pointer problems and removes many edge cases.

For example, assume the dummy head and tail are `dummyHead` and `dummyTail`. Then an empty doubly linked list looks like this:
    
    
    dummyHead <-> dummyTail

If you add elements `1, 2, 3`, the list becomes:
    
    
    dummyHead <-> 1 <-> 2 <-> 3 <-> dummyTail

In the past, you had to treat inserting at the head, inserting at the tail, and inserting in the middle as three separate cases. With dummy head and tail nodes, no matter whether the list is empty, you only need to think about “insert between two nodes”. This makes the code much simpler.

Of course, dummy nodes use a little extra memory, but compared to the trouble they save you, the cost is worth it.

For singly linked lists, a dummy head can simplify the code, but a dummy tail is not very useful.

Dummy Nodes Are Internal Only

Dummy nodes are an internal trick for your data structure implementation. They are invisible to the outside.

For example, for a `get(index)` method that gets an element by index, you always count the index from real nodes, not from dummy nodes.

### ¶Key Point 3: Memory Leak?

In the earlier article [Dynamic Array Implementation](/en/algo/data-structure-basic/array-implement/), I said you should be careful about memory leak when deleting elements. So, will deleting nodes in a linked list also cause memory leak?

Especially with code like this — do you think there is a problem?
    
    
    // Suppose the singly linked list head is head = 1 -> 2 -> 3 -> 4 -> 5
    
    // Delete the head node
    head = head.next;
    
    // Now head = 2 -> 3 -> 4 -> 5

You might think this causes a memory leak, because the original head node `1` still has its `next` pointer pointing to node `2`.

But in fact this is OK. Java’s garbage collector only cares whether an object is referenced by others. It does not care whether this object still references other objects.

Node `1` still has its `next` pointer pointing to node `2`, but no other pointer refers to node `1` anymore. So node `1` will be collected and freed by the garbage collector. This is different from the array deletion case. Think about it carefully.

That said, when deleting a node, it is still a good habit to set all its pointers to `null`. This costs almost nothing and may avoid some hidden bugs. So in the code below, I will set the deleted node’s pointers to `null`, whether strictly needed or not.

How to Verify Your Implementation?

You can use LeetCode problem 707, “[Design Linked List](https://leetcode.com/problems/design-linked-list/)”, to test whether your implementation is correct. Note that the add/delete/search/update method names required in 707 are different from those in this article, so you need to adjust them before submitting.

## ¶Doubly Linked List Implementation

CC++GoJavaJavaScriptPython
    
    
    import java.util.NoSuchElementException;
    
    public class MyLinkedList<E> {
        // virtual head and tail nodes
        final private Node<E> head, tail;
        private int size;
    
        // doubly linked list node
        private static class Node<E> {
            E val;
            Node<E> next;
            Node<E> prev;
    
            Node(E val) {
                this.val = val;
            }
        }
    
        // constructor initializes virtual head and tail nodes
        public MyLinkedList() {
            this.head = new Node<>(null);
            this.tail = new Node<>(null);
            head.next = tail;
            tail.prev = head;
            this.size = 0;
        }
    
    
        // ***** Add *****
    
        public void addLast(E e) {
            Node<E> x = new Node<>(e);
            Node<E> temp = tail.prev;
            // temp <-> x
            temp.next = x;
            x.prev = temp;
    
            x.next = tail;
            tail.prev = x;
            // temp <-> x <-> tail
            size++;
        }
    
        public void addFirst(E e) {
            Node<E> x = new Node<>(e);
            Node<E> temp = head.next;
            // head <-> temp
            temp.prev = x;
            x.next = temp;
    
            head.next = x;
            x.prev = head;
            // head <-> x <-> temp
            size++;
        }
    
        public void add(int index, E element) {
            checkPositionIndex(index);
            if (index == size) {
                addLast(element);
                return;
            }
    
            // find the Node corresponding to index
            Node<E> p = getNode(index);
            Node<E> temp = p.prev;
            // temp <-> p
    
            // new Node to be inserted
            Node<E> x = new Node<>(element);
    
            p.prev = x;
            temp.next = x;
    
            x.prev = temp;
            x.next = p;
    
            // temp <-> x <-> p
    
            size++;
        }
    
        // ***** Remove *****
    
        public E removeFirst() {
            if (size < 1) {
                throw new NoSuchElementException();
            }
            // the existence of virtual nodes prevents us from having to consider null pointers
            Node<E> x = head.next;
            Node<E> temp = x.next;
            // head <-> x <-> temp
            head.next = temp;
            temp.prev = head;
    
            E val = x.val;
            x.prev = null;
            x.next = null;
            // head <-> temp
    
            size--;
            return val;
        }
    
        public E removeLast() {
            if (size < 1) {
                throw new NoSuchElementException();
            }
            Node<E> x = tail.prev;
            Node<E> temp = tail.prev.prev;
            // temp <-> x <-> tail
    
            tail.prev = temp;
            temp.next = tail;
    
            E val = x.val;
            x.prev = null;
            x.next = null;
            // temp <-> tail
    
            size--;
            return val;
        }
    
        public E remove(int index) {
            checkElementIndex(index);
            // find the Node corresponding to index
            Node<E> x = getNode(index);
            Node<E> prev = x.prev;
            Node<E> next = x.next;
            // prev <-> x <-> next
            prev.next = next;
            next.prev = prev;
    
            E val = x.val;
            x.prev = null;
            x.next = null;
            // prev <-> next
    
            size--;
            return val;
        }
    
        // ***** Get *****
    
        public E get(int index) {
            checkElementIndex(index);
            // find the Node corresponding to index
            Node<E> p = getNode(index);
    
            return p.val;
        }
    
        public E getFirst() {
            if (size < 1) {
                throw new NoSuchElementException();
            }
    
            return head.next.val;
        }
    
        public E getLast() {
            if (size < 1) {
                throw new NoSuchElementException();
            }
    
            return tail.prev.val;
        }
    
        // ***** Set *****
    
        public E set(int index, E val) {
            checkElementIndex(index);
            // find the Node corresponding to index
            Node<E> p = getNode(index);
    
            E oldVal = p.val;
            p.val = val;
    
            return oldVal;
        }
    
        // ***** Other utility functions *****
    
        public int size() {
            return size;
        }
    
        public boolean isEmpty() {
            return size == 0;
        }
    
        private Node<E> getNode(int index) {
            checkElementIndex(index);
            Node<E> p = head.next;
            // TODO: Can be optimized by deciding whether to
            // traverse from head or tail based on index
            for (int i = 0; i < index; i++) {
                p = p.next;
            }
            return p;
        }
    
        private boolean isElementIndex(int index) {
            return index >= 0 && index < size;
        }
    
        private boolean isPositionIndex(int index) {
            return index >= 0 && index <= size;
        }
    
        // Check if the index position can contain an element
        private void checkElementIndex(int index) {
            if (!isElementIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // Check if the index position can add an element
        private void checkPositionIndex(int index) {
            if (!isPositionIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        private void display() {
            System.out.println("size = " + size);
            for (Node<E> p = head.next; p != tail; p = p.next) {
                System.out.print(p.val + " <-> ");
            }
            System.out.println("null");
            System.out.println();
        }
    
        public static void main(String[] args) {
            MyLinkedList<Integer> list = new MyLinkedList<>();
            list.addLast(1);
            list.addLast(2);
            list.addLast(3);
            list.addFirst(0);
            list.add(2, 100);
    
            list.display();
            // size = 5
            // 0 <-> 1 <-> 100 <-> 2 -> 3 -> null
        }
    }

## ¶Singly Linked List Implementation

CC++GoJavaJavaScriptPython
    
    
    import java.util.NoSuchElementException;
    
    public class MyLinkedList2<E> {
    
        private static class Node<E> {
            E val;
            Node<E> next;
    
            Node(E val) {
                this.val = val;
                this.next = null;
            }
        }
    
        private Node<E> head;
        // actual reference to the tail node
        private Node<E> tail;
        private int size;
    
        public MyLinkedList2() {
            this.head = new Node<>(null);
            this.tail = head;
            this.size = 0;
        }
    
        public void addFirst(E e) {
            Node<E> newNode = new Node<>(e);
            newNode.next = head.next;
            head.next = newNode;
            if (size == 0) {
                tail = newNode;
            }
            size++;
        }
    
        public void addLast(E e) {
            Node<E> newNode = new Node<>(e);
            tail.next = newNode;
            tail = newNode;
            size++;
        }
    
        public void add(int index, E element) {
            checkPositionIndex(index);
    
            if (index == size) {
                addLast(element);
                return;
            }
    
            Node<E> prev = head;
            for (int i = 0; i < index; i++) {
                prev = prev.next;
            }
            Node<E> newNode = new Node<>(element);
            newNode.next = prev.next;
            prev.next = newNode;
            size++;
        }
    
        public E removeFirst() {
            if (isEmpty()) {
                throw new NoSuchElementException();
            }
            Node<E> first = head.next;
            head.next = first.next;
            if (size == 1) {
                tail = head;
            }
            size--;
            return first.val;
        }
    
        public E removeLast() {
            if (isEmpty()) {
                throw new NoSuchElementException();
            }
    
            Node<E> prev = head;
            while (prev.next != tail) {
                prev = prev.next;
            }
            E val = tail.val;
            prev.next = null;
            tail = prev;
            size--;
            return val;
        }
    
        public E remove(int index) {
            checkElementIndex(index);
    
            Node<E> prev = head;
            for (int i = 0; i < index; i++) {
                prev = prev.next;
            }
    
            Node<E> nodeToRemove = prev.next;
            prev.next = nodeToRemove.next;
            // deleting the last element
            if (index == size - 1) {
                tail = prev;
            }
            size--;
            return nodeToRemove.val;
        }
    
        // ***** Retrieve *****
    
        public E getFirst() {
            if (isEmpty()) {
                throw new NoSuchElementException();
            }
            return head.next.val;
        }
    
        public E getLast() {
            if (isEmpty()) {
                throw new NoSuchElementException();
            }
            return tail.val;
        }
    
        public E get(int index) {
            checkElementIndex(index);
            Node<E> p = getNode(index);
            return p.val;
        }
    
        // ***** Update *****
    
        public E set(int index, E element) {
            checkElementIndex(index);
            Node<E> p = getNode(index);
    
            E oldVal = p.val;
            p.val = element;
    
            return oldVal;
        }
    
        // ***** Other Utility Functions *****
        public int size() {
            return size;
        }
    
        public boolean isEmpty() {
            return size == 0;
        }
    
        private boolean isElementIndex(int index) {
            return index >= 0 && index < size;
        }
    
        private boolean isPositionIndex(int index) {
            return index >= 0 && index <= size;
        }
    
        // Check if the index position can have an element
        private void checkElementIndex(int index) {
            if (!isElementIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // Check if the index position can add an element
        private void checkPositionIndex(int index) {
            if (!isPositionIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // Return the Node corresponding to the index
        // Note: Please ensure that the passed index is valid
        private Node<E> getNode(int index) {
            Node<E> p = head.next;
            for (int i = 0; i < index; i++) {
                p = p.next;
            }
            return p;
        }
    
        public static void main(String[] args) {
            MyLinkedList2<Integer> list = new MyLinkedList2<>();
            list.addFirst(1);
            list.addFirst(2);
            list.addLast(3);
            list.addLast(4);
            list.add(2, 5);
    
            System.out.println(list.removeFirst()); // 2
            System.out.println(list.removeLast()); // 4
            System.out.println(list.remove(1)); // 5
    
            System.out.println(list.getFirst()); // 1
            System.out.println(list.getLast()); // 3
            System.out.println(list.get(1)); // 3
        }
    }

Last updated: 03/14/2026, 12:17 AM

Loading comments...
