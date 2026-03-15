# 用数组实现队列/栈

> Source: https://labuladong.online/zh/algo/data-structure-basic/array-queue-stack/
> Archived: labuladong.online — 算法笔记

---

# 用数组实现队列/栈

前置知识

阅读本文前，你需要先学习：

  * [队列/栈基本原理](</zh/algo/data-structure-basic/queue-stack-basic/>)

这篇文章带大家用数组作为底层数据结构实现队列和栈。

## 用数组实现栈

先用数组实现栈，这个不难，你把动态数组的尾部作为栈顶，然后调用动态数组的 API 就行了。因为数组尾部增删元素的时间复杂度都是 O(1)O(1)O(1)，符合栈的要求。

我这里直接用标准库提供的动态数组，如果你想用之前我们实现的 `MyArrayList`，也是一样的：

```python
# 用数组作为底层数据结构实现栈
class MyArrayStack:
    def __init__(self):
        self.arr = []

    # 向栈顶加入元素，时间复杂度 O(1)
    def push(self, e):
        self.arr.append(e)

    # 从栈顶弹出元素，时间复杂度 O(1)
    def pop(self):
        return self.arr.pop()

    # 查看栈顶元素，时间复杂度 O(1)
    def peek(self):
        return self.arr[-1]

    # 返回栈中的元素个数，时间复杂度 O(1)
    def size(self):
        return len(self.arr)
``` 

能否让数组的头部作为栈顶？

按照我们之前实现 `MyArrayList` 的逻辑，是不行的。因为数组头部增删元素的时间复杂度都是 O(n)O(n)O(n)，不符合要求。

但是我们可以改用前文 [环形数组技巧](</zh/algo/data-structure-basic/cycle-array/>) 中实现的 `CycleArray` 类，这个数据结构在头部增删元素的时间复杂度是 O(1)O(1)O(1)，符合栈的要求。

你直接调用 `CycleArray` 的 `addFirst` 和 `removeFirst` 方法实现栈的 API 就行，我这里就不写了。

## 用数组实现队列

有了前文 [环形数组](</zh/algo/data-structure-basic/cycle-array/>) 中实现的 `CycleArray` 类，用数组作为底层数据结构实现队列就不难了吧。直接复用我们实现的 `CycleArray`，就可以实现标准队列了。当然，一些编程语言也有内置的环形数组实现，你也可以自行搜索使用：

```python
class MyArrayQueue:
    def __init__(self):
        self.arr = CycleArray()

    def push(self, t):
        self.arr.add_last(t)

    def pop(self):
        return self.arr.remove_first()

    def peek(self):
        return self.arr.get_first()

    def size(self):
        return self.arr.size()
``` 

## 评论

请登录后查看/发表评论
