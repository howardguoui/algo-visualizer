# Python Basics

> Source: https://labuladong.online/algo/en/programming-language-basic/python/
> Archived: labuladong.online

---

# Python Basics

This article is a beginner-friendly introduction to the basics of Python, covering standard output, control flow, and commonly used data structures—everything you need to start solving problems.

## Standard Output

In Python, you use the `print` function to output content to the console. By default, `print` adds a newline at the end. If you want to suppress the newline, pass `end=""` as a parameter.

```
a = 10

# Output: 10
print(a)

# Concatenated output (via string concatenation or comma separation)
# Output: Hello, World!
print("Hello" + ", " + "World!")
# Use sep to specify a separator
print("Hello", "World!", sep=", ")

s = "abc"
# Output: abc 10
print(s, a)

# Formatted output
# Output: abc 10
print(f"{s} {a}")
``` 

## Control Flow

Python's control flow includes conditionals and loops. Let's take a quick look.

### Conditionals: `if`, `elif`, `else`

```
a = 10

if a > 5:
    print("a > 5")
elif a == 5:
    print("a == 5")
else:
    print("a < 5")
# Output: a > 5
``` 

### Loops: `for` / `while`

`for` loops are typically used to traverse iterables or sequences with a known range, while `while` loops repeatedly execute a block of code as long as a condition is met.

```
# Output: 0 1 2 3 4
for i in range(5):
    print(i, end=" ")
print()

num = 100
# Output: 100 50 25 12 6 3 1
while num > 0:
    print(num, end=" ")
    num //= 2
print()
``` 

## Essential Data Structures

Python comes with a rich set of built-in data structures like `list`, `deque`, `dict`, `set`, and more. Here's an overview of the most commonly used ones and how to work with them.

### List `list` (Dynamic Array)

`list` is Python's mutable sequence type and can be used as a dynamic array.

Initialization:

```
# Initialize an empty list
nums = []

# Initialize a list with elements 1, 3, 5
nums = [1, 3, 5]

# Initialize a list of size n, filled with 0s
n = 10
nums = [0] * n

# 2D list with m rows and n columns, filled with 1s
m, n = 3, 4
matrix = [[1] * n for _ in range(m)]
``` 

Common list methods:

```
nums = [0] * 10

# Output: False
print(len(nums) == 0)
# Output: 10
print(len(nums))

# Append an element 20 to the end
nums.append(20)
# Output: 11
print(len(nums))

# Get the last element, Output: 20
print(nums[-1])

# Remove the last element
nums.pop()
# Output: 10
print(len(nums))

# Access and modify by index
nums[0] = 11
# Output: 11
print(nums[0])

# Insert element 99 at index 3
nums.insert(3, 99)

# Remove the element at index 2
nums.pop(2)

# Swap nums[0] and nums[1]
nums[0], nums[1] = nums[1], nums[0]

# Traverse the list
# Sample output:
# 0 11 99 0 0 0 0 0 0 0
for num in nums:
    print(num, end=" ")
print()
``` 

### Deque `deque` (Double-Ended Queue)

`deque` from the `collections` module is a double-ended queue that supports efficient insertion and deletion at both ends.

```
from collections import deque

# Initialize a deque
lst = deque([1, 2, 3, 4, 5])

# Check if empty, Output: False
print(len(lst) == 0)

# Get size, Output: 5
print(len(lst))

# Insert 0 at the front, 6 at the back
lst.appendleft(0)
lst.append(6)

# Get front and back elements, Output: 0 6
print(lst[0], lst[-1])

# Remove front and back elements
lst.popleft()
lst.pop()

# Insert 99 at index 2
lst.insert(2, 99)

# Remove the element at index 1
del lst[1]

# Traverse the deque
# Output: 1 99 3 4 5
for val in lst:
    print(val, end=" ")
print()
``` 

### Queue `Queue`

A queue is a restricted data structure: you can only insert elements at the back and remove elements from the front.

Python doesn't have a dedicated queue type, but you can use `deque` to simulate one—`append` acts as enqueue and `popleft` acts as dequeue.

```
from collections import deque

# Initialize a queue
q = deque()

# Enqueue elements
q.append(10)
q.append(20)
q.append(30)

# Check if empty, Output: False
print(len(q) == 0)

# Get size, Output: 3
print(len(q))

# Peek at the front element without dequeuing, Output: 10
print(q[0])

# Dequeue the front element
q.popleft()

# New front element, Output: 20
print(q[0])
``` 

### Priority Queue `heapq`

Python's standard library `heapq` module provides priority queue functionality based on a binary heap. By default, `heapq` is a **min-heap** (the top element is the smallest). If you need a **max-heap** , just negate the values when inserting.

Priority queues are used extensively in algorithm problems—classic examples include Dijkstra's shortest path algorithm and merging K sorted linked lists.

```
import heapq

# Min-heap (default), top element is the smallest
min_heap = []
heapq.heappush(min_heap, 30)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 20)

# Get the top element (minimum), Output: 10
print(min_heap[0])

# Pop the top element
heapq.heappop(min_heap)

# New top element, Output: 20
print(min_heap[0])

# Get heap size, Output: 2
print(len(min_heap))

# Check if heap is empty, Output: False
print(len(min_heap) == 0)

# Max-heap: negate values on insert, negate again on retrieval
max_heap = []
heapq.heappush(max_heap, -30)
heapq.heappush(max_heap, -10)
heapq.heappush(max_heap, -20)
# Get the top element (maximum), Output: 30
print(-max_heap[0])
``` 

### Stack `Stack`

Python doesn't have a dedicated stack type, but you can use `list` or `deque` to simulate one. `append` acts as push and `pop` acts as pop.

```
# Use a list as a stack
s = []

# Push
s.append(10)
s.append(20)
s.append(30)

# Check if empty, Output: False
print(len(s) == 0)

# Get size, Output: 3
print(len(s))

# Top element, Output: 30
print(s[-1])

# Pop
s.pop()

# New top element, Output: 20
print(s[-1])
``` 

### Dictionary `dict` (Hash Map)

`dict` is Python's hash map implementation. It stores data as key-value pairs, with average O(1) time complexity for lookups, insertions, and deletions.

```
# Initialize a dictionary
hashmap = {1: "one", 2: "two", 3: "three"}

# Check if empty, Output: False
print(len(hashmap) == 0)

# Get size, Output: 3
print(len(hashmap))

# Look up a key
# Output: Key 2 -> two
if 2 in hashmap:
    print(f"Key 2 -> {hashmap[2]}")
else:
    print("Key 2 not found.")

# Get value for a key, returns None if not found
# Output: None
print(hashmap.get(4))

# Insert a new key-value pair
hashmap[4] = "four"

# Get the newly inserted value, Output: four
print(hashmap[4])

# Delete key 3
del hashmap[3]

# Verify deletion
if 3 in hashmap:
    print(f"Key 3 -> {hashmap[3]}")
else:
    print("Key 3 not found.")
# Output: Key 3 not found.

# Traverse the dictionary
# Output:
# 1 -> one
# 2 -> two
# 4 -> four
for k, v in hashmap.items():
    print(f"{k} -> {v}")
``` 

### Set `set` (Hash Set)

`set` is Python's hash set, used to store unique elements. It's commonly used for deduplication and fast membership testing.

```
# Initialize a set
hashset = {1, 2, 3, 4}

# Check if empty, Output: False
print(len(hashset) == 0)

# Get size, Output: 4
print(len(hashset))

# Look up an element
if 3 in hashset:
    print("Element 3 found.")
else:
    print("Element 3 not found.")
# Output: Element 3 found.

# Insert a new element
hashset.add(5)

# Remove element 2
# discard won't raise an error if the element doesn't exist
hashset.discard(2)

# Verify deletion
if 2 in hashset:
    print("Element 2 found.")
else:
    print("Element 2 not found.")
# Output: Element 2 not found.

# Traverse the set, Output:
# 1
# 3
# 4
# 5
for element in hashset:
    print(element)
``` 

## Summary

The basics above are all you need to get started with solving problems.

Of course, Python offers many more data structures and handy APIs that we haven't covered here. More advanced data structures will be introduced gradually in later chapters, and you can always look up the API docs for each one when you need them—no need to memorize everything upfront.

Next, I'll walk you through some LeetCode problems so you can put these data structures into practice and get familiar with how the problem-solving platform works.

Last updated: 03/14/2026, 12:17 AM
