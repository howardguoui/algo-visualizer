# Golang Basics

> Source: https://labuladong.online/algo/en/programming-language-basic/golang/
> Archived: labuladong.online

---

# Golang Basics

This article is aimed at beginners, covering the basics of Golang—control flow, commonly used data structures from the standard library, and everything you need to start solving algorithm problems.

## Standard Output

Golang uses the `Println` and `Printf` functions from the `fmt` package for console output. `Println` prints values followed by a newline, while `Printf` supports formatted output.

```
package main

import (
    "fmt"
)

func main() {
    a := 10

    // Output: 10
    fmt.Println(a)

    // You can concatenate strings
    // Output: Hello, World!
    fmt.Println("Hello" + ", " + "World!")

    s := "abc"
    // Output: abc 10
    fmt.Println(s, a)

    // Formatted output
    // Output: abc 10
    fmt.Printf("%s %d\n", s, a)
}
``` 

## Control Flow

Control flow statements in programming languages are pretty straightforward. The most common ones are conditionals and loops—let's take a quick look.

### Conditionals: if else

```
package main

import (
    "fmt"
)

func main() {
    a := 10

    if a > 5 {
        fmt.Println("a > 5")
    } else if a == 5 {
        fmt.Println("a == 5")
    } else {
        fmt.Println("a < 5")
    }
    // Output: a > 5
}
``` 

### Loops: for

Many languages have both `for` and `while` keywords, but Golang only has `for`. It covers the functionality of `while` as well:

```
package main

import (
    "fmt"
)

func main() {
    // Output: 0 1 2 3 4
    for i := 0; i < 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    num := 100
    // Output: 100 50 25 12 6 3 1
    for num > 0 {
        fmt.Print(num, " ")
        num /= 2
    }
    fmt.Println()
}
``` 

## Basic Data Structures

Golang's standard library provides several commonly used data structures like slices, linked lists (`List`), and maps. Here's an overview of each and how to use them.

### Dynamic Array: `Slice`

In Golang, a slice is the dynamic array implementation. Unlike fixed-size arrays, slices can grow and shrink as needed.

Initialization:

```
package main

import (
	"fmt"
)

func main() {
	// Initialize an empty slice nums
	var nums []int

	// Initialize a slice nums of size 7, all elements default to 0
	nums = make([]int, 7)

	// Initialize a slice nums containing elements 1, 3, 5
	nums = []int{1, 3, 5}

	// Initialize a slice nums of size 7, all values set to 2
	nums = make([]int, 7)
	for i := range nums {
		nums[i] = 2
	}

	fmt.Println(nums)

	// Initialize a 3x3 boolean slice dp, all values initialized to true
	var dp [][]bool
	dp = make([][]bool, 3)
	for i := 0; i < len(dp); i++ {
		row := make([]bool, 3)
		for j := range row {
			row[j] = true
		}
		dp[i] = row
	}

	fmt.Println(dp)
}
``` 

Other common operations:

```
package main

import (
	"fmt"
)

func main() {
	n := 10
	// Initialize a slice of size 10, all elements are 0
	nums := make([]int, n)

	// Output: false
	fmt.Println(len(nums) == 0)

	// Output: 10
	fmt.Println(len(nums))

	// Append an element 20 to the end of the slice
	// append returns a new slice, so you need to reassign the result to nums
	nums = append(nums, 20)
	// Output: 11
	fmt.Println(len(nums))

	// Get the last element of the slice
	// Output: 20
	fmt.Println(nums[len(nums)-1])

	// Remove the last element of the slice
	nums = nums[:len(nums)-1]
	// Output: 10
	fmt.Println(len(nums))

	// Access or modify elements directly by index
	nums[0] = 11
	// Output: 11
	fmt.Println(nums[0])

	// Insert element 99 at index 3
	// ... is the spread operator, which unpacks slice elements
	nums = append(nums[:3], append([]int{99}, nums[3:]...)...)

	// Remove the element at index 2
	nums = append(nums[:2], nums[3:]...)

	// Swap nums[0] and nums[1]
	nums[0], nums[1] = nums[1], nums[0]

	// Traverse the slice
	// Output: 0 11 99 0 0 0 0 0 0 0
	for _, num := range nums {
		fmt.Print(num, " ")
	}
	fmt.Println()
}
``` 

Note that when using `append` to insert elements into a slice, you must reassign the return value back to the original slice. This is because appending may trigger a reallocation of the underlying array, so you need to capture the new slice reference.

That covers the most commonly used slice operations—accessing elements by index, adding elements, and removing elements. These are more than enough for solving algorithm problems.

### Doubly Linked List: `container/list`

The `container/list` package in Golang's standard library provides a doubly linked list implementation. Compared to slices, linked lists are more efficient for inserting and removing elements at the head and tail.

Common operations:

```
package main

import (
    "container/list"
    "fmt"
)

func main() {
    // Initialize a linked list
    lst := list.New()
    lst.PushBack(1)
    lst.PushBack(2)
    lst.PushBack(3)
    lst.PushBack(4)
    lst.PushBack(5)

    // Check if the list is empty, Output: false
    fmt.Println(lst.Len() == 0)

    // Get the size of the list, Output: 5
    fmt.Println(lst.Len())

    // Insert element 0 at the head
    lst.PushFront(0)
    // Insert element 6 at the tail
    lst.PushBack(6)

    // Get the head and tail elements, Output: 0 6
    front := lst.Front().Value.(int)
    back := lst.Back().Value.(int)
    fmt.Println(front, back)

    // Remove the head element
    lst.Remove(lst.Front())
    // Remove the tail element
    lst.Remove(lst.Back())

    // Insert an element into the list
    // Navigate to the third position
    third := lst.Front().Next().Next()
    lst.InsertBefore(99, third)

    // Remove a specific element from the list
    second := lst.Front().Next()
    lst.Remove(second)

    // Traverse the linked list
    // Output: 1 99 3 4 5
    for e := lst.Front(); e != nil; e = e.Next() {
        fmt.Print(e.Value.(int), " ")
    }
    fmt.Println()
}
``` 

Generally, you'd use `container/list` when you need to insert or remove elements at the head, since it's more efficient than slices (arrays) for those operations. When you need frequent random access by index, stick with slices.

### Queue

Golang doesn't have a dedicated queue type, but you can use the doubly linked list `container/list` to simulate one. Since linked lists handle insertions and removals at both ends efficiently, they're a natural fit.

```
package main

import (
    "container/list"
    "fmt"
)

func main() {
    // Initialize an empty queue q
    q := list.New()

    // Enqueue elements
    q.PushBack(10)
    q.PushBack(20)
    q.PushBack(30)

    // Check if the queue is empty, Output: false
    fmt.Println(q.Len() == 0)

    // Get the size of the queue, Output: 3
    fmt.Println(q.Len())

    // Get the front element of the queue
    // Output: 10
    front := q.Front().Value.(int)
    fmt.Println(front)

    // Remove the front element
    q.Remove(q.Front())

    // Output the new front element: 20
    newFront := q.Front().Value.(int)
    fmt.Println(newFront)
}
``` 

### Priority Queue

Golang's standard library `container/heap` provides heap operations, but you need to implement the `heap.Interface` yourself. It's a bit more verbose than other languages, but you can just copy the template code below and use it directly.

Priority queues come up a lot in algorithm problems—classic examples include Dijkstra's shortest path algorithm and merging K sorted linked lists.

```
package main

import (
    "container/heap"
    "fmt"
)

// intHeap implements heap.Interface, min-heap by default
type intHeap []int

func (h intHeap) Len() int            { return len(h) }
func (h intHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *intHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

func main() {
    // Initialize a min-heap
    h := &intHeap{}
    heap.Init(h)

    // Insert elements
    heap.Push(h, 30)
    heap.Push(h, 10)
    heap.Push(h, 20)

    // Get the top element (minimum value), Output: 10
    fmt.Println((*h)[0])

    // Pop the top element
    heap.Pop(h)

    // New top element, Output: 20
    fmt.Println((*h)[0])

    // Get the size of the heap, Output: 2
    fmt.Println(h.Len())

    // Check if the heap is empty, Output: false
    fmt.Println(h.Len() == 0)
}
``` 

Max-Heap

To create a max-heap, just change `<` to `>` in the `Less` method:

```
// Switch to max-heap by modifying the Less method
func (h intHeap) Less(i, j int) bool { return h[i] > h[j] }
``` 

### Stack

A stack is a last-in, first-out (LIFO) data structure. Golang's standard library doesn't provide a dedicated stack type, but you can use a slice or a doubly linked list to simulate one, since both are efficient at adding and removing elements from the tail.

Here's an example using a slice:

```
package main

import (
    "fmt"
)

func main() {
    // Initialize an empty stack s
    var s []int

    // Push elements onto the stack (append to the end of the slice)
    s = append(s, 10)
    s = append(s, 20)
    s = append(s, 30)

    // Check if the stack is empty, Output: false
    fmt.Println(len(s) == 0)

    // Get the size of the stack, Output: 3
    fmt.Println(len(s))

    // Get the top element, Output: 30
    fmt.Println(s[len(s)-1])

    // Pop the top element
    s = s[:len(s)-1]

    // Output the new top element: 20
    fmt.Println(s[len(s)-1])
}
``` 

### Hash Map: `map`

Golang's built-in `map` type provides hash map functionality, supporting key-value storage with constant time complexity for lookups, insertions, and deletions.

Initialization:

```
package main

import (
    "fmt"
)

func main() {
    // Initialize an empty hash map
    var hashmap map[int]string
    hashmap = make(map[int]string)

    // Initialize a hash map with some key-value pairs
    hashmap = map[int]string{
        1: "one",
        2: "two",
        3: "three",
    }

    fmt.Println(hashmap)
}
``` 

Common operations:

```
package main

import (
    "fmt"
)

func main() {
    // Initialize a hash map
    hashmap := make(map[int]string)
    hashmap[1] = "one"
    hashmap[2] = "two"
    hashmap[3] = "three"

    // Check if the hash map is empty, Output: false
    fmt.Println(len(hashmap) == 0)

    // Get the size of the hash map, Output: 3
    fmt.Println(len(hashmap))

    // Check if a key exists
    // Output: Key 2 -> two
    if val, exists := hashmap[2]; exists {
        fmt.Println("Key 2 ->", val)
    } else {
        fmt.Println("Key 2 not found.")
    }

    // Get the value for a key; returns empty string if not found
    // Output:
    fmt.Println(hashmap[4])

    // Insert a new key-value pair
    hashmap[4] = "four"

    // Get the newly inserted value, Output: four
    fmt.Println(hashmap[4])

    // Delete a key-value pair
    delete(hashmap, 3)

    // Check if key 3 still exists after deletion
    // Output: Key 3 not found.
    if val, exists := hashmap[3]; exists {
        fmt.Println("Key 3 ->", val)
    } else {
        fmt.Println("Key 3 not found.")
    }

    // Traverse the hash map
    // Output (order may vary):
    // 1 -> one
    // 2 -> two
    // 4 -> four
    for key, value := range hashmap {
        fmt.Printf("%d -> %s\n", key, value)
    }
}
``` 

### Hash Set (a `map` Variant)

Golang doesn't have a built-in hash set type, but you can simulate one using a `map` where the keys are the elements and the values are `struct{}` or `bool`.

```
package main

import (
	"fmt"
)

func main() {
	// Initialize a hash set with some elements
	hashset := map[int]struct{}{
		1: {},
		2: {},
		3: {},
		4: {},
	}

	// Check if the hash set is empty, Output: false
	fmt.Println(len(hashset) == 0)

	// Get the size of the hash set, Output: 4
	fmt.Println(len(hashset))

	// Check if a specific element exists
	// Output: Element 3 found.
	if _, exists := hashset[3]; exists {
		fmt.Println("Element 3 found.")
	} else {
		fmt.Println("Element 3 not found.")
	}

	// Insert a new element
	hashset[5] = struct{}{}

	// Remove an element
	delete(hashset, 2)
	// Output: Element 2 not found.
	if _, exists := hashset[2]; exists {
		fmt.Println("Element 2 found.")
	} else {
		fmt.Println("Element 2 not found.")
	}

	// Traverse the hash set
	// Output (order may vary):
	// 1
	// 3
	// 4
	// 5
	for element := range hashset {
		fmt.Println(element)
	}
}
``` 

The recommended approach is to use `map[int]struct{}` for hash sets, since `struct{}` takes up zero memory, while `bool` occupies one byte.

## Summary

The basics above are all you need to start solving problems.

Of course, Golang's third-party libraries offer many more data structures and utilities that we haven't covered here. More advanced data structures will be introduced gradually in later chapters, and you can always look up the API docs when you need them—no need to memorize everything upfront.

Next, I'll walk you through some LeetCode problems so you can put these data structures into practice while getting familiar with the problem-solving platform.

Last updated: 03/14/2026, 12:17 AM
