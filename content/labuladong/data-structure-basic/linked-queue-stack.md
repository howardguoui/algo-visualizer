# 用链表实现队列/栈

> Source: https://labuladong.online/zh/algo/data-structure-basic/linked-queue-stack/
> Archived: labuladong.online — 算法笔记

---

# 用链表实现队列/栈

前置知识

阅读本文前，你需要先学习：

  * [队列/栈基本原理](</zh/algo/data-structure-basic/queue-stack-basic/>)
  * [数组基本原理](</zh/algo/data-structure-basic/array-basic/>)


## ¶用链表实现栈

一些读者应该已经知道该怎么用链表作为底层数据结构实现队列和栈了。因为实在是太简单了，直接调用双链表的 API 就可以了。

注意我这里是直接用标准库的链表容器，如果你用之前我们实现的 `MyLinkedList`，也是一样的。

CC++GoJavaJavaScriptPython
    
    
    import java.util.LinkedList;
    
    // 用链表作为底层数据结构实现栈
    public class MyLinkedStack<E> {
        private final LinkedList<E> list = new LinkedList<>();
    
        // 向栈顶加入元素，时间复杂度 O(1)
        public void push(E e) {
            list.addLast(e);
        }
    
        // 从栈顶弹出元素，时间复杂度 O(1)
        public E pop() {
            return list.removeLast();
        }
    
        // 查看栈顶元素，时间复杂度 O(1)
        public E peek() {
            return list.getLast();
        }
    
        // 返回栈中的元素个数，时间复杂度 O(1)
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

提示

上面这段代码相当于是把双链表的尾部作为栈顶，在双链表尾部增删元素的时间复杂度都是 O(1)，符合要求。

当然，你也可以把双链表的头部作为栈顶，因为双链表头部增删元素的时间复杂度也是 O(1)，所以这样实现也是一样的。只要做几个修改 `addLast -> addFirst`，`removeLast -> removeFirst`，`getLast -> getFirst` 就行了。

## ¶用链表实现队列

同理，用链表实现队列也是一样的，也直接调用双链表的 API 就可以了：

CC++GoJavaJavaScriptPython
    
    
    import java.util.LinkedList;
    
    // 用链表作为底层数据结构实现队列
    public class MyLinkedQueue<E> {
        private final LinkedList<E> list = new LinkedList<>();
    
        // 向队尾插入元素，时间复杂度 O(1)
        public void push(E e) {
            list.addLast(e);
        }
    
        // 从队头删除元素，时间复杂度 O(1)
        public E pop() {
            return list.removeFirst();
        }
    
        // 查看队头元素，时间复杂度 O(1)
        public E peek() {
            return list.getFirst();
        }
    
        // 返回队列中的元素个数，时间复杂度 O(1)
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

提示

上面这段代码相当于是把双链表的尾部作为队尾，把双链表的头部作为队头，在双链表的头尾增删元素的复杂度都是 O(1)，符合队列 API 的要求。

当然，你也可以反过来，把双链表的头部作为队尾，双链表的尾部作为队头。类似栈的实现，只要改一改 list 的调用方法就行了。

更新时间：2026/03/14 00:17

Loading comments...
