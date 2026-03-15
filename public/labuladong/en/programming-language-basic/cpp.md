# C++ Basics

> Source: https://labuladong.online/algo/en/programming-language-basic/cpp/
> Archived: labuladong.online

---

# C++ Basics

This article is aimed at beginners, covering the basics of C++ including control flow statements and commonly used data structures from the standard library—everything you need to start solving algorithm problems right away.

## Standard Output

C++ uses `cout` for standard output. You use the `<<` operator to pass what you want to print to `cout`, and `endl` inserts a newline.

```
int a = 10;

// Output: 10
cout << a << endl;

// You can chain multiple outputs together
// Output: Hello, World!
cout << "Hello" << ", " << "World!" << endl;

string s = "abc";
// Output: abc 10
cout << s << " " << a << endl;
``` 

You can also use C's `printf` function, but `cout` is more convenient, so that's what we typically use.

## Standard Input

C++ uses `cin` for standard input. The `>>` operator reads input into variables:

```
int a;
string s;

// Read an integer
cin >> a;

// Read a string (delimited by spaces or newlines)
cin >> s;

// Read multiple values in one go
int x, y;
cin >> x >> y;
``` 

If you need to read an entire line (including spaces), use `getline`:

```
string line;
// Read an entire line
getline(cin, line);
``` 

In ACM-style problems, the amount of input data may be unknown, so you need to keep reading until EOF. You can put `cin >>` in a `while` condition—when the input ends, `cin` returns `false` and the loop exits automatically:

```
// Keep reading integers until input ends
int x;
while (cin >> x) {
    cout << x << endl;
}

// Keep reading two integers until input ends
int a, b;
while (cin >> a >> b) {
    cout << a + b << endl;
}

// Keep reading entire lines until input ends
string line;
while (getline(cin, line)) {
    cout << line << endl;
}
``` 

Tip

On platforms like LeetCode, the platform handles input and output for you, so you don't need to write `cin/cout` yourself. But if you're working on ACM-style problems (like on Nowcoder), you'll need to handle I/O on your own.

## Control Flow

Control flow statements in programming languages are pretty straightforward. The most common ones are conditionals and loops—let's take a quick look.

### Conditionals: if/else

```
int a = 10;

if (a > 5) {
    cout << "a > 5" << endl;
} else if (a == 5) {
    cout << "a == 5" << endl;
} else {
    cout << "a < 5" << endl;
}
// Output: a > 5
``` 

### Loops: for/while

Both `for` and `while` can be used for looping. `for` loops are typically used when you know the number of iterations, while `while` loops are better when you don't.

```
// 0 1 2 3 4
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}

int num = 100;
// 100 50 25 12 6 3 1
while (num > 0) {
    cout << num << " ";
    num /= 2;
}
``` 

## Basic Data Structures

LeetCode automatically imports the commonly used data structures from the standard library. In other words, when you're solving problems, you can directly use keywords like `vector`, `set`, `map`, etc. to create data structures.

### Dynamic Array: `vector`

`vector` is the dynamic array from the C++ standard library.

If you've learned C before, you've probably used `malloc`, `int[n]`, and similar approaches to create static arrays. But those are cumbersome and error-prone. For algorithm problems, we typically use the dynamic array `vector`, and most problem inputs come as `vector` types anyway.

I'll cover the differences between dynamic and static arrays in detail in the [Implementing Dynamic Arrays](</en/algo/data-structure-basic/array-basic/>) section later on.

Here's how to initialize a `vector`:

```
#include <vector>

int n = 7, m = 8;

// Initialize an empty int array nums
vector<int> nums;

// Initialize an array nums of size n, all values default to 0
vector<int> nums(n);

// Initialize an array nums with elements 1, 3, 5
vector<int> nums{1, 3, 5};

// Initialize an array nums of size n, all values set to 2
vector<int> nums(n, 2);

// Initialize a 2D int array dp
vector<vector<int>> dp;

// Initialize an m * n boolean array dp,
// with all values initialized to true
vector<vector<bool>> dp(m, vector<bool>(n, true));
``` 

Common `vector` operations:

```
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 10;
    // Array of size 10, all elements initialized to 0
    vector<int> nums(n);
    // Output: 0 (false)
    cout << nums.empty() << endl;
    // Output: 10
    cout << nums.size() << endl;

    // Append an element 20 to the end
    nums.push_back(20);
    // You might also see the emplace_back method
    // It does the same thing as push_back, just slightly more efficient
    // nums.emplace_back(20);

    // Output: 11
    cout << nums.size() << endl;

    // Get a reference to the last element
    // Output: 20
    cout << nums.back() << endl;

    // Remove the last element (no return value)
    nums.pop_back();
    // Output: 10
    cout << nums.size() << endl;

    // Access or modify elements directly with brackets
    nums[0] = 11;
    // Output: 11
    cout << nums[0] << endl;

    // Insert element 99 at index 3
    nums.insert(nums.begin() + 3, 99);

    // Remove the element at index 2
    nums.erase(nums.begin() + 2);

    // Swap nums[0] and nums[1]
    swap(nums[0], nums[1]);

    // Traverse the array
    // 0 11 99 0 0 0 0 0 0 0
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
}
``` 

Those are the most commonly used `vector` methods in this book—basically accessing elements by index plus `push_back` and `pop_back`. For solving algorithm problems, that's all you need.

Here's why: due to how arrays work, accessing elements by index is very efficient, and adding/removing elements at the end is fast too. But inserting or deleting elements in the middle or at the front requires shifting data, which is slow. I'll explain the details in [Array Basics](</en/algo/data-structure-basic/array-basic/>) later on.

### Doubly Linked List: `list`

`list` is the doubly linked list container from the C++ standard library.

Here's how to initialize one:

```
#include <list>

int n = 7;

// Initialize an empty doubly linked list lst
std::list<int> lst;

// Initialize a linked list lst of size n, all values default to 0
std::list<int> lst(n);

// Initialize a linked list lst containing elements 1, 3, 5
std::list<int> lst{1, 3, 5};

// Initialize a linked list lst of size n, all values set to 2
std::list<int> lst(n, 2);
``` 

Common `list` methods:

```
#include <iostream>
#include <list>
using namespace std;

int main() {
    // Initialize the linked list
    list<int> lst{1, 2, 3, 4, 5};

    // Check if the list is empty, Output: false
    cout << lst.empty() << endl;

    // Get the size of the list, Output: 5
    cout << lst.size() << endl;

    // Insert element 0 at the front
    lst.push_front(0);
    // Insert element 6 at the back
    lst.push_back(6);
    // You might also see emplace_front/emplace_back methods
    // They do the same thing as push_front/push_back, just slightly more efficient
    // lst.emplace_front(0);
    // lst.emplace_back(6);

    // Get the front and back elements, Output: 0 6
    cout << lst.front() << " " << lst.back() << endl;

    // Remove the front element
    lst.pop_front();
    // Remove the back element
    lst.pop_back();

    // Insert an element in the list
    auto it = lst.begin();
    // Move to the third position
    advance(it, 2);
    // Insert 99 at the third position
    lst.insert(it, 99);

    // Remove an element from the list
    it = lst.begin();
    // Move to the second position
    advance(it, 1);
    // Remove the element at the second position
    lst.erase(it);

    // Traverse the linked list
    // Output: 1 99 3 4 5
    for (int val : lst) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}
``` 

Generally, you'd use a doubly linked list when you need to add or remove elements at the front, since it's more efficient than `vector` for that. But when you need to access elements by index, `vector` is the way to go.

I'll cover the characteristics of linked lists and when to use them versus `vector` in [Implementing a Linked List](</en/algo/data-structure-basic/linkedlist-basic/>)—here we'll just go over the common API.

### Queue `queue`

`queue` is the queue container in the C++ standard library, based on the First-In-First-Out (FIFO) principle. Queues are useful when you only need to add elements at one end (the back) and remove them from the other end (the front).

We'll cover the implementation details and use cases of queues in later chapters. For now, let's just look at its commonly used APIs.

```
#include <iostream>
#include <queue>
using namespace std;

int main() {
    // initialize an empty integer queue q
    queue<int> q;

    // add elements to the back of the queue
    q.push(10);
    q.push(20);
    q.push(30);
    // you might also see the emplace method
    // it works the same as push, just slightly more efficient
    // q.emplace(10);

    // check if the queue is empty, output: false
    cout << q.empty() << endl;

    // get the size of the queue, output: 3
    cout << q.size() << endl;

    // get the front and back elements, output: 10 and 30
    cout << q.front() << " " << q.back() << endl;

    // remove the front element
    q.pop();

    // output the new front element: 20
    cout << q.front() << endl;

    return 0;
}
``` 

### Priority Queue `priority_queue`

`priority_queue` is a priority queue in the C++ standard library, implemented using a binary heap. By default, it's a **max-heap** (the top element is the largest). If you need a **min-heap** (the top element is the smallest), you'll need to pass additional template parameters.

Priority queues come up a lot in algorithm problems—classic examples include Dijkstra's shortest path algorithm, merging K sorted linked lists, and more.

```
#include <iostream>
#include <queue>
using namespace std;

int main() {
    // max-heap (default), top element is the largest
    priority_queue<int> maxHeap;
    maxHeap.push(30);
    maxHeap.push(10);
    maxHeap.push(20);
    // get the top element, output: 30
    cout << maxHeap.top() << endl;

    // min-heap, top element is the smallest
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(20);

    // get the top element (minimum), output: 10
    cout << minHeap.top() << endl;

    // remove the top element
    minHeap.pop();

    // new top element, output: 20
    cout << minHeap.top() << endl;

    // get the heap size, output: 2
    cout << minHeap.size() << endl;

    // check if the heap is empty, output: 0 (i.e., false)
    cout << minHeap.empty() << endl;

    return 0;
}
``` 

### Stack `stack`

A stack is a Last-In-First-Out (LIFO) data structure where you can only add or remove elements from one end (the top).

`stack` is the stack container in the C++ standard library. We'll cover its implementation details and use cases in later chapters—here we'll just go over its commonly used APIs.

```
#include <iostream>
#include <stack>
using namespace std;

int main() {

    // initialize an empty integer stack s
    stack<int> s;

    // push elements onto the stack
    s.push(10);
    s.push(20);
    s.push(30);
    // you might also see the emplace method
    // it works the same as push, just slightly more efficient
    // s.emplace(10);

    // check if the stack is empty, output: false
    cout << s.empty() << endl;

    // get the size of the stack, output: 3
    cout << s.size() << endl;

    // get the top element, output: 30
    cout << s.top() << endl;

    // remove the top element
    s.pop();

    // output the new top element: 20
    cout << s.top() << endl;

    return 0;
}
``` 

### Hash Map `unordered_map`

`unordered_map` is a hash map implementation in the C++ standard library. It provides key-value pair storage with constant time complexity for lookups, insertions, and deletions.

Hash maps are a classic data structure. I'll cover the implementation details in [Hash Table Fundamentals](</en/algo/data-structure-basic/hashmap-basic/>)—here we'll just go over its commonly used APIs.

Initialization:

```
#include <unordered_map>
using namespace std;

// initialize an empty hash map
unordered_map<int, string> hashmap;

// initialize a hash map with some key-value pairs
unordered_map<int, string> hashmap{{1, "one"}, {2, "two"}, {3, "three"}};
``` 

Here are the commonly used methods for `unordered_map`.

Heads Up: Accessing a Non-Existent Key Automatically Inserts It

**In C++ hash maps, accessing a key that doesn't exist will automatically create that key with a default-constructed value.**

This is different from most other languages, so pay close attention. Always check whether a key exists before accessing its value—otherwise you might accidentally create new entries and break your algorithm. See the example below.

```
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    // initialize the hash map
    unordered_map<int, string> hashmap{{1, "one"}, {2, "two"}, {3, "three"}};

    // check if the hash map is empty, output: 0 (false)
    cout << hashmap.empty() << endl;

    // get the size of the hash map, output: 3
    cout << hashmap.size() << endl;

    // check if a key exists
    // note that contains is new in C++20
    // output: Key 2 -> two
    if (hashmap.contains(2)) {
        cout << "Key 2 -> " << hashmap[2] << endl;
    } else {
        cout << "Key 2 not found." << endl;
    }

    // get the value for a key; returns a default-constructed value if not found
    // outputs an empty string
    cout << hashmap[4] << endl;

    // insert a new key-value pair
    hashmap[4] = "four";

    // get the newly inserted value, output: four
    cout << hashmap[4] << endl;

    // delete a key-value pair
    hashmap.erase(3);

    // check if key 3 still exists after deletion
    // output: Key 3 not found.
    if (hashmap.contains(3)) {
        cout << "Key 3 -> " << hashmap[3] << endl;
    } else {
        cout << "Key 3 not found." << endl;
    }

    // iterate over the hash map
    // output (order may vary):
    // 4 -> four
    // 2 -> two
    // 1 -> one
    for (const auto &pair: hashmap) {
        cout << pair.first << " -> " << pair.second << endl;
    }

    // important: accessing a non-existent key automatically creates it
    unordered_map<int, string> hashmap2;

    // number of key-value pairs is 0
    cout << hashmap2.size() << endl; // 0

    // accessing non-existent keys creates them with default-constructed values
    cout << hashmap2[1] << endl; // empty string
    cout << hashmap2[2] << endl; // empty string

    // now there are 2 key-value pairs
    cout << hashmap2.size() << endl; // 2

    return 0;
}
``` 

### Hash Set `unordered_set`

`unordered_set` is a hash set implementation in the C++ standard library. It stores unique elements and is commonly used for deduplication.

We'll cover the implementation details of hash sets in later chapters. For now, let's just look at its commonly used APIs.

Initialization:

```
#include <unordered_set>
using namespace std;

// initialize an empty hash set
unordered_set<int> uset;

// initialize a hash set with some elements
unordered_set<int> uset{1, 2, 3, 4};
``` 

Commonly used methods for `unordered_set`:

```
#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    // initialize the hash set
    unordered_set<int> hashset{1, 2, 3, 4};

    // check if the hash set is empty, output: 0 (false)
    cout << hashset.empty() << endl;

    // get the size of the hash set, output: 4
    cout << hashset.size() << endl;

    // check if an element exists
    // output: Element 3 found.
    if (hashset.contains(3)) {
        cout << "Element 3 found." << endl;
    } else {
        cout << "Element 3 not found." << endl;
    }

    // insert a new element
    hashset.insert(5);

    // remove an element
    hashset.erase(2);
    // output: Element 2 not found.
    if (hashset.contains(2)) {
        cout << "Element 2 found." << endl;
    } else {
        cout << "Element 2 not found." << endl;
    }

    // iterate over the hash set
    // output (order may vary):
    // 1
    // 3
    // 4
    // 5
    for (const auto &element : hashset) {
        cout << element << endl;
    }

    return 0;
}
``` 

## Pass by Value vs. Pass by Reference

In C++, there are two main ways to pass function arguments: **pass by value** and **pass by reference**. Understanding the difference is crucial for writing efficient algorithm code, especially when dealing with large datasets or when you need to modify the original data.

### Pass by Value

**Pass by value** means a copy of the argument is passed to the function. Any modifications to this copy inside the function won't affect the original data.

Here's an example:

```
#include <iostream>
using namespace std;

void modifyValue(int x) {
    // only modifies the copy, doesn't affect the original
    x = 10;
}

int main() {
    int num = 5;
    modifyValue(num);
    // output: 5
    cout << "After modifyValue, num = " << num << endl;
    return 0;
}
``` 

In the code above, `num` remains unchanged after calling `modifyValue` because only a copy of `num` was passed in—the function's modification only affected the copy.

#### Pass by Reference

**Pass by reference** means the address of the actual argument is passed to the function, allowing it to directly operate on the original data. Any changes to the parameter will directly affect the original.

Here's an example:

```
#include <iostream>
using namespace std;

void modifyReference(int &x) {
    // modifies the original data
    x = 10;
}

int main() {
    int num = 5;
    modifyReference(num);
    // output: 10
    cout << "After modifyReference, num = " << num << endl;
    return 0;
}
``` 

Here, `num` gets changed to 10 because we passed a reference to `num`—the modification to `x` inside the function directly affected `num`.

### Which to Use for Algorithm Problems

In my experience, for primitive types like `int`, `bool`, etc., pass by value is more common since you typically don't need to modify them inside the function, and copying them is cheap.

For container types like `vector`, `unordered_map`, etc., pass by reference is the way to go. It avoids the overhead of copying data, and you usually need to modify containers within the function anyway.

One important gotcha: when a recursive function takes a container as a parameter, **never** pass it by value. Otherwise, every recursive call creates a full copy, eating up massive amounts of memory and time. This is a very common cause of TLE (Time Limit Exceeded) or MLE (Memory Limit Exceeded) errors.

## Summary

The basics covered above are enough to get you started with problem solving.

Of course, C++ offers many more data structures with plenty of additional methods and APIs that we haven't covered here. More advanced data structures will be introduced gradually in later chapters, and you can always look up specific APIs in the documentation when you need them—no need to memorize everything upfront.

C++ official documentation: <https://en.cppreference.com/w/>[](<https://en.cppreference.com/w/>)

Next, I'll walk you through some LeetCode problems so you can quickly put these data structures to use while getting familiar with the problem-solving platform.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
