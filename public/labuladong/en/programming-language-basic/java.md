# Java Basics

> Source: https://labuladong.online/algo/en/programming-language-basic/java/
> Archived: labuladong.online

---

# Java Basics

This article is aimed at beginners, covering the basics of Java—control flow, commonly used data structures from the standard library—so you can jump right into solving problems.

## Standard Output

Java's standard output is `System.out.println`, which prints content to the console followed by a newline. Use `System.out.print` if you don't want the newline.

```
int a = 10;

// Output: 10
System.out.println(a);

// You can concatenate output
// Output: Hello, World!
System.out.println("Hello" + ", " + "World!");

String s = "abc";
// Output: abc 10
System.out.println(s + " " + a);

// Formatted output
// Output: abc 10
System.out.printf("%s %d\n", s, a);
``` 

## Control Flow

Control flow statements in programming languages are generally straightforward. The most common ones are conditionals and loops—let's take a quick look.

### Conditionals: if else

```
int a = 10;

if (a > 5) {
    System.out.println("a > 5");
} else if (a == 5) {
    System.out.println("a == 5");
} else {
    System.out.println("a < 5");
}
// Output: a > 5
``` 

### Loops: for/while

Both `for` and `while` can be used for loops. `for` loops are typically used when you know the number of iterations in advance, while `while` loops are better when you don't.

```
// Output: 0 1 2 3 4
for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");
}
System.out.println();

int num = 100;
// Output: 100 50 25 12 6 3 1
while (num > 0) {
    System.out.print(num + " ");
    num /= 2;
}
System.out.println();
``` 

## Core Data Structures

Java's standard library provides a variety of commonly used data structures, such as `ArrayList`, `LinkedList`, `HashMap`, `HashSet`, and more. Here's an overview of the most useful ones and how to use them.

### Dynamic Array: `ArrayList`

`ArrayList` is the dynamic array implementation in Java's standard library. Unlike fixed-size arrays, an `ArrayList` can grow and shrink as needed.

Initialization:

```
import java.util.ArrayList;

// Initialize an empty ArrayList called nums
ArrayList<Integer> nums = new ArrayList<>();

// Initialize an ArrayList with elements 1, 3, 5
ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 3, 5));
``` 

`ArrayList` has many methods. Here are some of the most commonly used ones:

```
import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        int n = 10;
        // Initialize an ArrayList of size 10, all elements set to 0
        ArrayList<Integer> nums = new ArrayList<>(Collections.nCopies(n, 0));
        // Output: false
        System.out.println(nums.isEmpty());
        // Output: 10
        System.out.println(nums.size());

        // Append an element 20 to the end
        nums.add(20);
        // Output: 11
        System.out.println(nums.size());

        // Get the last element
        // Output: 20
        System.out.println(nums.get(nums.size() - 1));

        // Remove the last element
        nums.remove(nums.size() - 1);
        // Output: 10
        System.out.println(nums.size());

        // Access or modify elements by index
        nums.set(0, 11);
        // Output: 11
        System.out.println(nums.get(0));

        // Insert element 99 at index 3
        nums.add(3, 99);

        // Remove the element at index 2
        nums.remove(2);

        // Swap nums[0] and nums[1]
        Collections.swap(nums, 0, 1);

        // Traverse the array
        // Output: 0 11 99 0 0 0 0 0 0 0
        for(int num : nums) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
``` 

Those are the most commonly used `ArrayList` methods, mainly covering element access by index and adding/removing elements. These methods are more than enough for solving algorithm problems.

### Doubly Linked List: `LinkedList`

`LinkedList` is Java's standard library implementation of a doubly linked list. Compared to `ArrayList`, `LinkedList` performs better when inserting or removing elements at the head or tail.

Common `LinkedList` methods:

```
import java.util.Arrays;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        // Initialize the linked list
        LinkedList<Integer> lst = new LinkedList<>(Arrays.asList(1, 2, 3, 4, 5));

        // Check if the list is empty, Output: false
        System.out.println(lst.isEmpty());

        // Get the size of the list, Output: 5
        System.out.println(lst.size());

        // Insert element 0 at the head
        lst.addFirst(0);
        // Insert element 6 at the tail
        lst.addLast(6);

        // Get the head and tail elements, Output: 0 6
        System.out.println(lst.getFirst() + " " + lst.getLast());

        // Remove the head element
        lst.removeFirst();
        // Remove the tail element
        lst.removeLast();

        // Insert an element into the list
        // Insert at the third position
        lst.add(2, 99);

        // Remove an element from the list
        lst.remove(1);

        // Traverse the linked list
        // Output: 1 99 3 4 5
        for(int val : lst) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}
``` 

Generally, you'd use `LinkedList` when you need to insert or remove elements at the head, since it's more efficient than `ArrayList` for those operations. But when you need frequent random access by index, `ArrayList` is the way to go.

### Queue: `Queue`

`Queue` is a queue interface in Java's standard library. Common implementations include `LinkedList` and `PriorityQueue`. Here we'll use `LinkedList` as an example.

```
import java.util.Queue;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        // Initialize an empty integer queue q
        Queue<Integer> q = new LinkedList<>();

        // Add elements to the back of the queue
        q.offer(10);
        q.offer(20);
        q.offer(30);

        // Check if the queue is empty, Output: false
        System.out.println(q.isEmpty());

        // Get the size of the queue, Output: 3
        System.out.println(q.size());

        // Get the front element of the queue
        // Output: 10
        System.out.println(q.peek());

        // Remove the front element
        q.poll();

        // Output the new front element: 20
        System.out.println(q.peek());
    }
}
``` 

### Priority Queue: `PriorityQueue`

`PriorityQueue` is a priority queue in Java's standard library, implemented with a binary heap. By default it's a **min-heap** (the top element is the smallest). If you need a **max-heap** (the top element is the largest), pass in a reverse-order comparator.

Priority queues come up all the time in algorithm problems—classic examples include Dijkstra's shortest path algorithm and merging K sorted linked lists.

```
import java.util.PriorityQueue;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        // Min-heap (default), top element is the smallest
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(30);
        minHeap.offer(10);
        minHeap.offer(20);

        // Get the top element (minimum), Output: 10
        System.out.println(minHeap.peek());

        // Remove the top element
        minHeap.poll();

        // New top element, Output: 20
        System.out.println(minHeap.peek());

        // Get the heap size, Output: 2
        System.out.println(minHeap.size());

        // Check if the heap is empty, Output: false
        System.out.println(minHeap.isEmpty());

        // Max-heap, top element is the largest
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(30);
        maxHeap.offer(10);
        maxHeap.offer(20);
        // Get the top element (maximum), Output: 30
        System.out.println(maxHeap.peek());
    }
}
``` 

### Stack: `Stack`

A stack is a Last-In-First-Out (LIFO) data structure. Java provides the `Stack` class for this:

```
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        // Initialize an empty integer stack s
        Stack<Integer> s = new Stack<>();

        // Push elements onto the stack
        s.push(10);
        s.push(20);
        s.push(30);

        // Check if the stack is empty, Output: false
        System.out.println(s.isEmpty());

        // Get the size of the stack, Output: 3
        System.out.println(s.size());

        // Get the top element, Output: 30
        System.out.println(s.peek());

        // Remove the top element
        s.pop();

        // Output the new top element: 20
        System.out.println(s.peek());
    }
}
``` 

### Hash Map: `HashMap`

`HashMap` is Java's standard library hash table implementation. It provides key-value pair storage and supports efficient insertion, deletion, lookup, and update operations.

Common `HashMap` methods:

```
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // Initialize the hash map
        HashMap<Integer, String> hashmap = new HashMap<>();
        hashmap.put(1, "one");
        hashmap.put(2, "two");
        hashmap.put(3, "three");

        // Check if the hash map is empty, Output: false
        System.out.println(hashmap.isEmpty());

        // Get the size of the hash map, Output: 3
        System.out.println(hashmap.size());

        // Check if a specific key exists
        // Output: Key 2 -> two
        if(hashmap.containsKey(2)) {
            System.out.println("Key 2 -> " + hashmap.get(2));
        } else {
            System.out.println("Key 2 not found.");
        }

        // Get the value for a key; returns null if not found
        // Output: null
        System.out.println(hashmap.get(4));

        // Get the value for a key with a default fallback
        // Output: defaultVal
        System.out.println(hashmap.getOrDefault(4, "defaultVal"));

        // Insert a new key-value pair
        hashmap.put(4, "four");

        // Get the newly inserted value, Output: four
        System.out.println(hashmap.get(4));

        // Remove a key-value pair
        hashmap.remove(3);

        // Check if key 3 still exists after removal
        // Output: Key 3 not found.
        if(hashmap.containsKey(3)) {
            System.out.println("Key 3 -> " + hashmap.get(3));
        } else {
            System.out.println("Key 3 not found.");
        }

        // Traverse the hash map
        // Output (order may vary):
        // 1 -> one
        // 2 -> two
        // 4 -> four
        for(Map.Entry<Integer, String> pair : hashmap.entrySet()) {
            System.out.println(pair.getKey() + " -> " + pair.getValue());
        }
    }
}
``` 

### Hash Set: `HashSet`

`HashSet` is Java's standard library hash set implementation. It stores unique elements, making it great for deduplication.

Common `HashSet` methods:

```
import java.util.Arrays;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        // Initialize the hash set
        HashSet<Integer> hashset = new HashSet<>(Arrays.asList(1, 2, 3, 4));

        // Check if the hash set is empty, Output: false
        System.out.println(hashset.isEmpty());

        // Get the size of the hash set, Output: 4
        System.out.println(hashset.size());

        // Check if a specific element exists
        // Output: Element 3 found.
        if(hashset.contains(3)) {
            System.out.println("Element 3 found.");
        } else {
            System.out.println("Element 3 not found.");
        }

        // Insert a new element
        hashset.add(5);

        // Remove an element
        hashset.remove(2);
        // Output: Element 2 not found.
        if(hashset.contains(2)) {
            System.out.println("Element 2 found.");
        } else {
            System.out.println("Element 2 not found.");
        }

        // Traverse the hash set
        // Output (order may vary):
        // 1
        // 3
        // 4
        // 5
        for(int element : hashset) {
            System.out.println(element);
        }
    }
}
``` 

## Summary

The basics above are all you need to start solving problems.

Of course, Java offers many more data structures with plenty of additional methods and APIs that we haven't covered here. More advanced data structures will be introduced gradually in later chapters, and you can always look up API details in the docs when you need them—no need to memorize everything upfront.

Next, I'll walk you through some LeetCode problems so you can put these data structures into practice and get familiar with how the problem-solving platform works.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
