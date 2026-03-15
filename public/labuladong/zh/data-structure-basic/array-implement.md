# 动态数组代码实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/array-implement/
> Archived: labuladong.online — 算法笔记

---

# 动态数组代码实现

前置知识

阅读本文前，你需要先学习：

  * [数组（顺序存储）基础](</zh/algo/data-structure-basic/array-basic/>)

## 几个关键点

下面我会直接给出一个简单的动态数组代码实现，包含了基本的增删查改功能。这里先给出几个关键点，等会你看代码的时候可以着重注意一下。

### 关键点一、自动扩缩容

在上一章 [数组基础](</zh/algo/data-structure-basic/array-basic/>) 中只提到了数组添加元素时可能需要扩容，并没有提到缩容。

在实际使用动态数组时，缩容也是重要的优化手段。比方说一个动态数组开辟了能够存储 1000 个元素的连续内存空间，但是实际只存了 10 个元素，那就有 990 个空间是空闲的。为了避免资源浪费，我们其实可以适当缩小存储空间，这就是缩容。

我们这里就实现一个简单的扩缩容的策略：

  * 当数组元素个数达到底层静态数组的容量上限时，扩容为原来的 2 倍；
  * 当数组元素个数缩减到底层静态数组的容量的 1/4 时，缩容为原来的 1/2。

### 关键点二、索引越界的检查

下面的代码实现中，有两个检查越界的方法，分别是 `checkElementIndex` 和 `checkPositionIndex`，你可以看到它俩的区别仅仅在于 `index < size` 和 `index <= size`。

为什么 `checkPositionIndex` 可以允许 `index == size` 呢，因为这个 `checkPositionIndex` 是专门用来处理在数组中插入元素的情况。

比方说有这样一个 `nums` 数组，对于每个元素来说，合法的索引一定是 `index < size`：

```
nums = [5, 6, 7, 8]
index   0  1  2  3
``` 

但如果是要在数组中插入新元素，那么新元素可能的插入位置并不是元素的索引，而是索引之间的空隙：

```
nums = [ | 5 | 6 | 7 | 8 | ]
index    0   1   2   3   4
``` 

这些空隙都是合法的插入位置，所以说 `index == size` 也是合法的。这就是 `checkPositionIndex` 和 `checkElementIndex` 的区别。

### 关键点三、删除元素谨防内存泄漏

单从算法的角度，其实并不需要关心被删掉的元素应该如何处理，但是具体到代码实现，我们需要注意可能出现的内存泄漏。

在我给出的代码实现中，删除元素时，我都会把被删除的元素置为 `null`，以 Java 为例：

```
// 删
public E removeLast() {
    E deletedVal = data[size - 1];
    // 删除最后一个元素
    // 必须给最后一个元素置为 null，否则会内存泄漏
    data[size - 1] = null;
    size--;

    return deletedVal;
}
``` 

Java 的垃圾回收机制是基于 [图算法](</zh/algo/data-structure-basic/graph-basic/>) 的可达性分析，如果一个对象再也无法被访问到，那么这个对象占用的内存才会被释放；否则，垃圾回收器会认为这个对象还在使用中，就不会释放这个对象占用的内存。

如果你不执行 `data[size - 1] = null` 这行代码，那么 `data[size - 1]` 这个引用就会一直存在，你可以通过 `data[size - 1]` 访问这个对象，所以这个对象被认为是可达的，它的内存就一直不会被释放，进而造成内存泄漏。

其他带垃圾回收功能的语言应该也是类似的，你可以具体了解一下你使用的编程语言的垃圾回收机制，这是写出无 bug 代码的基本要求。

### 其他细节优化

下面的代码当然不会是一个很完善的实现，会有不少可以进一步优化的点。比方说，我是用 for 循环复制数组数据的，实际上这种方式复制的效率比较差，大部分编程语言会提供更高效的数组复制方法，比如 Java 的 `System.arraycopy`。

不过它再怎么优化，本质上也是要搬移数据，时间复杂度都是 O(n)O(n)O(n)。本文的重点在于让你理解数组增删查改 API 的基本实现思路以及时间复杂度，如果对这些细节感兴趣，可以找到编程语言标准库的源码深入研究。

如何验证你的实现？

你可以借助力扣第 707 题「[设计链表](<https://leetcode.cn/problems/design-linked-list/>)」来验证自己的实现是否正确。虽然这道题是关于链表的，但是它其实也不知道你底层到底是不是用链表实现的。咱主要是借用它的测试用例，来验证你的增删查改功能是否正确。

## 动态数组代码实现

```python
class MyArrayList:
    # 默认初始容量
    INIT_CAP = 1

    def __init__(self, init_capacity=None):
        self.data = [None]
        self.size = 0
    
    # 增
    def add_last(self, e):
        cap = len(self.data)
        # 看 data 数组容量够不够
        if self.size == cap:
            self._resize(2 * cap)
        # 在尾部插入元素
        self.data[self.size] = e
        self.size += 1

    def add(self, index, e):
        # 检查索引越界
        self._check_position_index(index)

        cap = len(self.data)
        # 看 data 数组容量够不够
        if self.size == cap:
            self._resize(2 * cap)

        # 搬移数据 data[index..] -> data[index+1..]
        # 给新元素腾出位置
        for i in range(self.size-1, index-1, -1):
            self.data[i+1] = self.data[i]
        
        # 插入新元素
        self.data[index] = e

        self.size += 1

    def add_first(self, e):
        self.add(0, e)

    # 删
    def remove_last(self):
        if self.size == 0:
            raise Exception("NoSuchElementException")
        cap = len(self.data)
        # 可以缩容，节约空间
        if self.size == cap // 4:
            self._resize(cap // 2)

        deleted_val = self.data[self.size - 1]
        # 删除最后一个元素
        self.data[self.size - 1] = None
        self.size -= 1

        return deleted_val

    def remove(self, index):
        # 检查索引越界
        self._check_element_index(index)

        cap = len(self.data)
        # 可以缩容，节约空间
        if self.size == cap // 4:
            self._resize(cap // 2)

        deleted_val = self.data[index]

        # 搬移数据 data[index+1..] -> data[index..]
        for i in range(index + 1, self.size):
            self.data[i - 1] = self.data[i]

        self.data[self.size - 1] = None
        self.size -= 1

        return deleted_val

    def remove_first(self):
        return self.remove(0)

    # 查
    def get(self, index):
        # 检查索引越界
        self._check_element_index(index)

        return self.data[index]

    # 改
    def set(self, index, element):
        # 检查索引越界
        self._check_element_index(index)
        # 修改数据
        old_val = self.data[index]
        self.data[index] = element
        return old_val

    # 工具方法
    def get_size(self):
        return self.size

    def is_empty(self):
        return self.size == 0

    # 将 data 的容量改为 newCap
    def _resize(self, new_cap):
        temp = [None] * new_cap
        for i in range(self.size):
            temp[i] = self.data[i]
        self.data = temp

    def _is_element_index(self, index):
        return 0 <= index < self.size

    def _is_position_index(self, index):
        return 0 <= index <= self.size

    def _check_element_index(self, index):
        if not self._is_element_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    def _check_position_index(self, index):
        if not self._is_position_index(index):
            raise IndexError(f"Index: {index}, Size: {self.size}")

    def display(self):
        print(f"size = {self.size}, cap = {len(self.data)}")
        print(self.data)

# Usage example
if __name__ == "__main__":
    arr = MyArrayList(init_capacity=3)

    # 添加 5 个元素
    for i in range(1, 6):
        arr.add_last(i)

    arr.remove(3)
    arr.add(1, 9)
    arr.add_first(100)
    val = arr.remove_last()

    # 100 1 9 2 3
    for i in range(arr.get_size()):
        print(arr.get(i))
``` 

## 评论

请登录后查看/发表评论
