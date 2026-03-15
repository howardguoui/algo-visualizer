# 双端队列（Deque）原理及实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/deque-implement/
> Archived: labuladong.online — 算法笔记

---

# 双端队列（Deque）原理及实现

前置知识

阅读本文前，你需要先学习：

  * [队列/栈基本原理](</zh/algo/data-structure-basic/queue-stack-basic/>)
  * [环形数组技巧](</zh/algo/data-structure-basic/cycle-array/>)

## 基本原理

如果你理解了前面讲解的内容，这个双端队列其实没啥可讲的了。所谓双端队列，主要是对比标准队列（FIFO 先进先出队列）多了一些操作罢了：

```python
class MyDeque:
    # 从队头插入元素，时间复杂度 O(1)
    def add_first(self, e):
        pass

    # 从队尾插入元素，时间复杂度 O(1)
    def add_last(self, e):
        pass

    # 从队头删除元素，时间复杂度 O(1)
    def remove_first(self):
        pass

    # 从队尾删除元素，时间复杂度 O(1)
    def remove_last(self):
        pass

    # 查看队头元素，时间复杂度 O(1)
    def peek_first(self):
        pass

    # 查看队尾元素，时间复杂度 O(1)
    def peek_last(self):
        pass
``` 

[标准队列](</zh/algo/data-structure-basic/queue-stack-basic/>) 只能在队尾插入元素，队头删除元素，而双端队列的队头和队尾都可以插入或删除元素。

普通队列就好比排队买票，先来的先买，后来的后买；而双端队列就好比一个过街天桥，两端都可以随意进出。当然，双端队列的元素就不再满足「先进先出」了，因为它比较灵活嘛。

在做算法题的场景中，双端队列用的不算很多。感觉只有 Python 用到的多一些，因为 Python 标准库没有提供内置的栈和队列，一般会用双端队列来模拟标准队列。

## 用链表实现双端队列

很简单吧，直接复用我们之前实现的 [`MyLinkedList`](</zh/algo/data-structure-basic/linkedlist-implement/>) 类，或者使用编程语言标准库提供的双链表结构就行了。因为双链表本就支持 O(1)O(1)O(1) 时间复杂度在链表的头尾增删元素：

```python
class MyListDeque:
    def __init__(self):
        # 使用我们之前实现的 `MyLinkedList` 类
        self.list = MyLinkedList()

    # 从队头插入元素，时间复杂度 O(1)
    def add_first(self, e):
        self.list.add_first(e)

    # 从队尾插入元素，时间复杂度 O(1)
    def add_last(self, e):
        self.list.add_last(e)

    # 从队头删除元素，时间复杂度 O(1)
    def remove_first(self):
        return self.list.remove_first()

    # 从队尾删除元素，时间复杂度 O(1)
    def remove_last(self):
        return self.list.remove_last()

    # 查看队头元素，时间复杂度 O(1)
    def peek_first(self):
        return self.list.get_first()

    # 查看队尾元素，时间复杂度 O(1)
    def peek_last(self):
        return self.list.get_last()

# 使用示例
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

## 用数组实现双端队列

也很简单吧，直接复用我们在 [环形数组技巧](</zh/algo/data-structure-basic/cycle-array/>) 中实现的 `CycleArray` 提供的方法就行了。环形数组头尾增删元素的复杂度都是 O(1)O(1)O(1)：

```python
class MyArrayDeque:
    def __init__(self):
        self.arr = CycleArray()

    # 从队头插入元素，时间复杂度 O(1)
    def add_first(self, e):
        self.arr.add_first(e)

    # 从队尾插入元素，时间复杂度 O(1)
    def add_last(self, e):
        self.arr.add_last(e)

    # 从队头删除元素，时间复杂度 O(1)
    def remove_first(self):
        return self.arr.remove_first()

    # 从队尾删除元素，时间复杂度 O(1)
    def remove_last(self):
        return self.arr.remove_last()

    # 查看队头元素，时间复杂度 O(1)
    def peek_first(self):
        return self.arr.get_first()

    # 查看队尾元素，时间复杂度 O(1)
    def peek_last(self):
        return self.arr.get_last()
``` 

## 评论

请登录后查看/发表评论
