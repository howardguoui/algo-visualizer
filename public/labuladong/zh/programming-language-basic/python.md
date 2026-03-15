# Python 语言基础

> Source: https://labuladong.online/zh/algo/programming-language-basic/python/
> Archived: labuladong.online — 算法笔记

---

# Python 语言基础

本文针对初学者，介绍 Python 基本用法，包括标准输出、控制语句以及常用的数据结构，以便快速上手刷题。

## 标准输出

在 Python 中，标准输出使用 `print` 函数在控制台打印内容。`print` 默认会在末尾换行，如果想取消换行，可以使用参数 `end=""`。

```
a = 10

# 输出：10
print(a)

# 串联输出（通过字符串拼接或逗号分隔）
# 输出：Hello, World!
print("Hello" + ", " + "World!")
# 使用 sep 指定分隔符
print("Hello", "World!", sep=", ")

s = "abc"
# 输出：abc 10
print(s, a)

# 格式化输出
# 输出：abc 10
print(f"{s} {a}")
``` 

## 控制语句

Python 中的控制语句包括条件判断和循环，下面简单介绍一下。

### 条件判断 `if`, `elif`, `else`

```
a = 10

if a > 5:
    print("a > 5")
elif a == 5:
    print("a == 5")
else:
    print("a < 5")
# 输出：a > 5
``` 

### 循环 `for` / `while`

`for` 循环通常用于遍历可迭代对象或已知范围的序列，`while` 循环用于满足条件时反复执行代码块。

```
# 输出：0 1 2 3 4 
for i in range(5):
    print(i, end=" ")
print()

num = 100
# 输出：100 50 25 12 6 3 1 
while num > 0:
    print(num, end=" ")
    num //= 2
print()
``` 

## 基本数据结构

Python 提供了丰富的内置数据结构，如 `list`、`deque`、`dict`、`set` 等。以下是一些常用数据结构的介绍及其使用方法。

### 列表 `list`（动态数组）

`list` 是 Python 的可变序列类型，可以用作动态数组。

初始化方法：

```
# 初始化一个空列表
nums = []

# 初始化一个包含元素 1, 3, 5 的列表
nums = [1, 3, 5]

# 初始化大小为 n，元素都为0的列表
n = 10
nums = [0] * n

# 二维列表，m 行 n 列，元素都为 1
m, n = 3, 4
matrix = [[1] * n for _ in range(m)]
``` 

Python 列表的常用方法：

```
nums = [0] * 10

# 输出：False
print(len(nums) == 0)
# 输出：10
print(len(nums))

# 在列表尾部插入一个元素 20
nums.append(20)
# 输出：11
print(len(nums))

# 得到列表最后一个元素，输出：20
print(nums[-1])

# 删除列表的最后一个元素
nums.pop()
# 输出：10
print(len(nums))

# 索引访问与修改
nums[0] = 11
# 输出：11
print(nums[0])

# 在索引 3 处插入一个元素 99
nums.insert(3, 99)

# 删除索引 2 处的元素
nums.pop(2)

# 交换 nums[0] 和 nums[1]
nums[0], nums[1] = nums[1], nums[0]

# 遍历列表
# 输出示例：
# 0 11 99 0 0 0 0 0 0 0
for num in nums:
    print(num, end=" ")
print()
``` 

### 双端队列 `deque`

`deque` 是 `collections` 模块提供的双端队列，可以高效地在两端插入和删除元素。

```
from collections import deque

# 初始化双端队列
lst = deque([1, 2, 3, 4, 5])

# 检查是否为空，输出：False
print(len(lst) == 0)

# 获取大小，输出：5
print(len(lst))

# 在头部插入 0，尾部插入 6
lst.appendleft(0)
lst.append(6)

# 获取头部和尾部元素，输出：0 6
print(lst[0], lst[-1])

# 删除头部和尾部元素
lst.popleft()
lst.pop()

# 在索引 2 处插入 99
lst.insert(2, 99)

# 删除索引 1 处的元素
del lst[1]

# 遍历双端队列
# 输出：1 99 3 4 5
for val in lst:
    print(val, end=" ")
print()
``` 

### 队列 `Queue`

队列是一种操作受限制的数据结构：只允许在队尾插入元素，在队头删除元素。

Python 没有专门的队列类型，但可以使用 `deque` 来模拟队列，`append` 相当于入队，`popleft` 相当于出队。

```
from collections import deque

# 初始化队列
q = deque()

# 向队尾插入元素
q.append(10)
q.append(20)
q.append(30)

# 是否为空，输出：False
print(len(q) == 0)

# 大小，输出：3
print(len(q))

# 获取队头元素，不出队，输出：10
print(q[0])

# 队头元素出队
q.popleft()

# 新的队头元素，输出：20
print(q[0])
``` 

### 优先级队列 `heapq`

Python 标准库的 `heapq` 模块提供了基于二叉堆的优先级队列功能。`heapq` 默认是**小顶堆** （堆顶元素最小），如果需要**大顶堆** ，可以在插入时对值取负。

在算法题中优先级队列被大量使用，比如 Dijkstra 最短路径算法、合并 K 个有序链表等经典问题都需要用到它。

```
import heapq

# 小顶堆（默认），堆顶是最小值
min_heap = []
heapq.heappush(min_heap, 30)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 20)

# 获取堆顶元素（最小值），输出：10
print(min_heap[0])

# 弹出堆顶元素
heapq.heappop(min_heap)

# 新的堆顶元素，输出：20
print(min_heap[0])

# 获取堆的大小，输出：2
print(len(min_heap))

# 检查堆是否为空，输出：False
print(len(min_heap) == 0)

# 大顶堆：插入时取负，取出时再取负
max_heap = []
heapq.heappush(max_heap, -30)
heapq.heappush(max_heap, -10)
heapq.heappush(max_heap, -20)
# 获取堆顶元素（最大值），输出：30
print(-max_heap[0])
``` 

### 栈 `Stack`

虽然 Python 没有专门的栈类型，但可以使用 `list` 或 `deque` 来模拟栈。`append` 相当于压栈，`pop` 相当于出栈。

```
# 使用 list 作为栈
s = []

# 压栈
s.append(10)
s.append(20)
s.append(30)

# 是否为空，输出：False
print(len(s) == 0)

# 大小，输出：3
print(len(s))

# 栈顶元素，输出：30
print(s[-1])

# 出栈
s.pop()

# 新的栈顶元素，输出：20
print(s[-1])
``` 

### 字典 `dict`（哈希表）

`dict` 是 Python 的哈希表实现，通过键值对存储数据，查找、插入和删除操作平均时间复杂度为 O(1)。

```
# 初始化字典
hashmap = {1: "one", 2: "two", 3: "three"}

# 是否为空，输出：False
print(len(hashmap) == 0)

# 大小，输出：3
print(len(hashmap))

# 查找键
# 输出：Key 2 -> two
if 2 in hashmap:
    print(f"Key 2 -> {hashmap[2]}")
else:
    print("Key 2 not found.")

# 获取键对应的值，不存在则返回 None
# 输出：None
print(hashmap.get(4))

# 插入新键值对
hashmap[4] = "four"

# 获取新插入的值，输出：four
print(hashmap[4])

# 删除键 3
del hashmap[3]

# 检查删除后
if 3 in hashmap:
    print(f"Key 3 -> {hashmap[3]}")
else:
    print("Key 3 not found.")
# 输出：Key 3 not found.

# 遍历字典
# 输出：
# 1 -> one
# 2 -> two
# 4 -> four
for k, v in hashmap.items():
    print(f"{k} -> {v}")
``` 

### 集合 `set`（哈希集合）

`set` 是 Python 的哈希集合，用于存储不重复元素，常用于去重和快速查询元素是否存在。

```
# 初始化集合
hashset = {1, 2, 3, 4}

# 是否为空，输出：False
print(len(hashset) == 0)

# 大小，输出：4
print(len(hashset))

# 查找元素
if 3 in hashset:
    print("Element 3 found.")
else:
    print("Element 3 not found.")
# 输出：Element 3 found.

# 插入新元素
hashset.add(5)

# 删除元素 2
# discard 不存在的元素不会报错
hashset.discard(2)

# 检查删除后
if 2 in hashset:
    print("Element 2 found.")
else:
    print("Element 2 not found.")
# 输出：Element 2 not found.

# 遍历集合，输出：
# 1
# 3
# 4
# 5
for element in hashset:
    print(element)
``` 

## 总结

上面这些基础知识就够你开始刷题了。

当然，Python 还提供很多其他数据结构和实用 API，本文都没有介绍。因为一些高级数据结构会在后面的数据结构章节逐步介绍，而每个结构的 API 也是可以在需要的时候查文档的，没必要一开始就全部记住。

下面我会带你做一些力扣的算法题，让你快速把这些数据结构用起来，同时也熟悉一下刷题系统的使用。
