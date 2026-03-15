# 链表代码实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/linkedlist-implement/
> Archived: labuladong.online — 算法笔记

---

# 链表代码实现

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[707\. Design Linked List](<https://leetcode.com/problems/design-linked-list/>)| [707\. 设计链表](<https://leetcode.cn/problems/design-linked-list/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [链表（链式存储）基础](</zh/algo/data-structure-basic/linkedlist-basic/>)


## ¶几个关键点

下面我会分别用双链表和单链给出一个简单的 `MyLinkedList` 代码实现，包含了基本的增删查改功能。这里给出几个关键点，等会你看代码的时候可以着重注意一下。

### ¶关键点一、同时持有头尾节点的引用

在力扣做题时，一般题目给我们传入的就是单链表的头指针。但是在实际开发中，用的都是双链表，而双链表一般会同时持有头尾节点的引用。

因为在软件开发中，在容器尾部添加元素是个非常高频的操作，双链表持有尾部节点的引用，就可以在 O(1)O(1)O(1) 的时间复杂度内完成尾部添加元素的操作。

对于单链表来说，持有尾部节点的引用也有优化效果。比如你要在单链表尾部添加元素，如果没有尾部节点的引用，你就需要遍历整个链表找到尾部节点，时间复杂度是 O(n)O(n)O(n)；如果有尾部节点的引用，就可以在 O(1)O(1)O(1) 的时间复杂度内完成尾部添加元素的操作。

细心的读者可能会说，即便如此，如果删除一次单链表的尾结点，那么之前尾结点的引用就失效了，还是需要遍历一遍链表找到尾结点。

是的，但你再仔细想想，删除单链表尾结点的时候，是不是也得遍历到倒数第二个节点（尾结点的前驱），才能通过指针操作把尾结点删掉？那么这个时候，你不就可以顺便把尾结点的引用给更新了吗？

### ¶关键点二、虚拟头尾节点

在上一篇文章 [链表基础](</zh/algo/data-structure-basic/linkedlist-basic/>) 中我提到过「虚拟头尾节点」技巧，它的原理很简单，就是在创建双链表时就创建一个虚拟头节点和一个虚拟尾节点，无论双链表是否为空，这两个节点都存在。这样就不会出现空指针的问题，可以避免很多边界情况的处理。

举例来说，假设虚拟头尾节点分别是 `dummyHead` 和 `dummyTail`，那么一条空的双链表长这样：
    
    
    dummyHead <-> dummyTail

如果你添加 `1,2,3` 几个元素，那么链表长这样：
    
    
    dummyHead <-> 1 <-> 2 <-> 3 <-> dummyTail

你以前要把在头部插入元素、在尾部插入元素和在中间插入元素几种情况分开讨论，现在有了头尾虚拟节点，无论链表是否为空，都只需要考虑在中间插入元素的情况就可以了，这样代码会简洁很多。

当然，虚拟头结点会多占用一点内存空间，但是比起给你解决的麻烦，这点空间消耗是划算的。

对于单链表，虚拟头结点有一定的简化作用，但虚拟尾节点没有太大作用。

虚拟节点是内部实现，对外不可见

虚拟节点是你内部实现数据结构的技巧，对外是不可见的。比如按照索引获取元素的 `get(index)` 方法，都是从真实节点开始计算索引，而不是从虚拟节点开始计算。

### ¶关键点三、内存泄露？

在前文 [动态数组实现](</zh/algo/data-structure-basic/array-implement/>) 中，我提到了删除元素时，要注意内存泄露的问题。那么在链表中，删除元素会不会也有内存泄露的问题呢？

尤其是这样的写法，你觉得有没有问题：
    
    
    // 假设单链表头结点 head = 1 -> 2 -> 3 -> 4 -> 5
    
    // 删除单链表头结点
    head = head.next;
    
    // 此时 head = 2 -> 3 -> 4 -> 5

细心的读者可能认为这样写会有内存泄露的问题，因为原来的那个头结点 `1` 的 `next` 指针没有断开，依然指向着节点 `2`。

但实际上这样写是 OK 的，因为 Java 的垃圾回收的判断机制是看这个对象是否被别人引用，而并不会 care 这个对象是否还引用着别人。

那个节点 `1` 的 `next` 指针确实还指向着节点 `2`，但是并没有别的指针引用节点 `1` 了，所以节点 `1` 最终会被垃圾回收器回收释放。所以说这个场景和数组中删除元素的场景是不一样的，你可以再仔细思考一下。

不过呢，删除节点时，最好还是把被删除节点的指针都置为 null，这是个好习惯，不会有什么代价，还可能避免一些潜在的问题。所以在下面的实现中，无论是否有必要，我都会把被删除节点上的指针置为 null。

如何验证你的实现？

你可以借助力扣第 707 题「[设计链表](<https://leetcode.cn/problems/design-linked-list/>)」来验证自己的实现是否正确。注意 707 题要求的增删查改 API 名字和本文给出的不一样，所以需要修改一下才能通过。

## ¶双链表代码实现

CC++GoJavaJavaScriptPython
    
    
    import java.util.NoSuchElementException;
    
    public class MyLinkedList<E> {
        // 虚拟头尾节点
        final private Node<E> head, tail;
        private int size;
    
        // 双链表节点
        private static class Node<E> {
            E val;
            Node<E> next;
            Node<E> prev;
    
            Node(E val) {
                this.val = val;
            }
        }
    
        // 构造函数初始化虚拟头尾节点
        public MyLinkedList() {
            this.head = new Node<>(null);
            this.tail = new Node<>(null);
            head.next = tail;
            tail.prev = head;
            this.size = 0;
        }
    
    
        // ***** 增 *****
    
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
    
            // 找到 index 对应的 Node
            Node<E> p = getNode(index);
            Node<E> temp = p.prev;
            // temp <-> p
    
            // 新要插入的 Node
            Node<E> x = new Node<>(element);
    
            p.prev = x;
            temp.next = x;
    
            x.prev = temp;
            x.next = p;
    
            // temp <-> x <-> p
    
            size++;
        }
    
        // ***** 删 *****
    
        public E removeFirst() {
            if (size < 1) {
                throw new NoSuchElementException();
            }
            // 虚拟节点的存在是我们不用考虑空指针的问题
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
            // 找到 index 对应的 Node
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
    
        // ***** 查 *****
    
        public E get(int index) {
            checkElementIndex(index);
            // 找到 index 对应的 Node
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
    
        // ***** 改 *****
    
        public E set(int index, E val) {
            checkElementIndex(index);
            // 找到 index 对应的 Node
            Node<E> p = getNode(index);
    
            E oldVal = p.val;
            p.val = val;
    
            return oldVal;
        }
    
        // ***** 其他工具函数 *****
    
        public int size() {
            return size;
        }
    
        public boolean isEmpty() {
            return size == 0;
        }
    
        private Node<E> getNode(int index) {
            checkElementIndex(index);
            Node<E> p = head.next;
            // TODO: 可以优化，通过 index 判断从 head 还是 tail 开始遍历
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
    
        // 检查 index 索引位置是否可以存在元素
        private void checkElementIndex(int index) {
            if (!isElementIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // 检查 index 索引位置是否可以添加元素
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

## ¶单链表代码实现

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
        // 实际的尾部节点引用
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
            // 删除的是最后一个元素
            if (index == size - 1) {
                tail = prev;
            }
            size--;
            return nodeToRemove.val;
        }
    
        // ***** 查 *****
    
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
    
        // ***** 改 *****
    
        public E set(int index, E element) {
            checkElementIndex(index);
            Node<E> p = getNode(index);
    
            E oldVal = p.val;
            p.val = element;
    
            return oldVal;
        }
    
        // ***** 其他工具函数 *****
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
    
        // 检查 index 索引位置是否可以存在元素
        private void checkElementIndex(int index) {
            if (!isElementIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // 检查 index 索引位置是否可以添加元素
        private void checkPositionIndex(int index) {
            if (!isPositionIndex(index))
                throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
    
        // 返回 index 对应的 Node
        // 注意：请保证传入的 index 是合法的
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

更新时间：2026/03/14 00:17

Loading comments...
