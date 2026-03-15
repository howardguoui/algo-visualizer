# JavaScript Basics

> Source: https://labuladong.online/algo/en/intro/js/
> Archived: labuladong.online

---

# JavaScript Basics

Since my [algorithm visualization panel](</en/algo/intro/visualize/>) currently only supports JavaScript, this tutorial is designed not just for JavaScript beginners, but also for readers who use other programming languages—helping everyone get up to speed with the visualization panel quickly.

For readers using other languages, this article is optional

I've already written the visualization code for every problem, and I even tell you in the articles or comments how to interact with the visualization panel to observe the algorithm in action. So even if you don't know JavaScript, you can still benefit from the visualization panel that comes with each problem.

That said, some readers want to modify my preset code or visually verify their own creative ideas, and that requires knowing some basic JavaScript syntax. This article is for those readers.

With today's AI tools being so powerful, you generally don't need to write JS from scratch—you can have AI translate code from another language into JS. All you need is enough JS knowledge to read and understand the code. So if you're comfortable with any other programming language, spend 5 minutes reading through the content below and you'll be ready to use the visualization panel.

## JavaScript Basics

### Variable Declarations

Let's start with variable declarations. JavaScript has three ways to declare variables: `var, let, const`.

`const` declares a constant—once assigned, it can't be changed. Nothing fancy here. It's mostly useful in production code; in algorithm code, it doesn't really matter whether you use it or not.

```
const a = 1;
// Error
a = 2;
``` 

Both `var` and `let` can declare regular variables, but they differ in scoping. `var` is kind of a legacy thing. For our purposes in the visualization panel, you can treat them as interchangeable.

```
let str = "hello world";
str = "world"
// Output: world
console.log(str);

if (true) {
    // this str is a different variable from the outer str
    let str = "hello";
    // Output: hello
    console.log(str);
}
``` 

In my visualization code, top-level functions are usually declared with `var`. That's because the JS function signatures on LeetCode use `var`, so I kept the same convention. But if you want to change it to `let`, that works fine too.

### Function Declarations

Function declarations in JavaScript are straightforward:

```
function add(a, b) {
    return a + b;
}
// Output: 3
console.log(add(1, 2));
``` 

This looks the same as in most other languages. However, you might also see anonymous function declarations in JavaScript, where a variable holds a function. They work the same way:

```
// replacing let with var has the same effect
let add2 = function(a, b) {
    return a + b;
}
// Output: 3
console.log(add2(1, 2));

// ES6 arrow function syntax
let add3 = (a, b) => {
    return a + b;
}
// Output: 3
console.log(add3(1, 2));
``` 

There are some key differences between functions declared with the `function` keyword and arrow functions declared with `() => {}`, mainly around how `this` behaves inside the function body. But you'll almost never need this in algorithm problems, so you can treat both styles as equivalent.

### Loops

Loops in JavaScript work just like in other languages. The most common ones are `for` and `while`.

Let's use array traversal as an example. The most common approach is index-based iteration:

```
// traverse the array
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
// Output: 1 2 3 4 5
``` 

You can also use `for...of` to iterate over elements directly:

```
// traverse the array
let arr = [1, 2, 3, 4, 5];
for (let item of arr) {
    console.log(item);
}
// Output: 1 2 3 4 5
``` 

Use `for ... of` to iterate over elements

Note that JavaScript uses `of` to iterate over array elements—don't use `in`. `in` serves a different purpose, but it's rarely needed for algorithm problems, so I won't go into it here.

I know some other languages use `in` to iterate over array elements, so just a heads-up: don't mix them up.

`while` loops work the same as in other languages. Here's a quick example:

```
let arr = [1, 2, 3, 4, 5];
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}
// Output: 1 2 3 4 5
``` 

### Conditionals

`if else` works exactly the same as in other languages, so there's not much to say. Here's a simple example:

```
let a = 1;
if (a === 1) {
    console.log("a equals 1");
} else {
    console.log("a does not equal 1");
}
``` 

Difference between `===` and `==`

Here's a small gotcha: in JavaScript, `==` checks for value equality and returns `true`, while `===` checks for both value and type equality. Similarly, `!=` returns `true` when values differ, while `!==` returns `true` only when both value and type differ.

For example, `null` and `undefined` in JavaScript both represent empty values. `null == undefined` is `true`, but `null === undefined` is `false`.

This distinction is another legacy quirk of JavaScript. In algorithm problems, you'll rarely run into situations where this matters, so you can effectively treat both operators as the same.

## Basic Data Structures in JavaScript

### Strings

Strings in JavaScript work pretty much the same as in other languages—nothing special here. Let's look at an example:

```
let str = "hello world";
// Output: 11
console.log(str.length);
// Output: h
console.log(str[0]);
// Output: true
console.log(str === "hello world");

// split a string
let arr = str.split(" ");
// Output: ["hello", "world"]
console.log(arr);

// get a substring, multiple ways work
// Output: hello
console.log(str.substring(0, 5));
// Output: hello
console.log(str.slice(0, 5));
// Output: hello
console.log(str.substring(0, 5));

// string concatenation
let str2 = "world";
// Output: hello world world
console.log(str + " " + str2);
``` 

### Arrays

There are several ways to create arrays:

```
let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(1, 2, 3, 4, 5);

// create an array of length 5, each element is undefined
let arr3 = new Array(5);

// create an array of length 5, each element is 0
let arr4 = new Array(5).fill(0);
``` 

Common array operations:

```
let arr = [1, 2, 3, 4, 5];

// get array length
// Output: 5
console.log(arr.length);

// access an element
// Output: 1
console.log(arr[0]);

// modify an element
arr[0] = 100;

// copy all elements into a new array
let arr2 = arr.slice();
// another way to copy an array
let arr3 = [...arr];

// append an element to the end
arr.push(6);

// remove the last element
arr.pop();

// insert element 888 at the beginning
// rarely used, since in algorithms we generally avoid inserting/removing at non-tail positions
arr.unshift(888);

// remove the first element
// rarely used, since in algorithms we generally avoid inserting/removing at non-tail positions
arr.shift();
``` 

That covers the basics—these operations are all you need for working with arrays in algorithm problems.

### Hash Maps

In simple terms, a JavaScript object can be thought of as a hash map since it's just a collection of key-value pairs. However, ES6 introduced the `Map` type, so let's do things properly and use `Map` for hash maps.

Basic `Map` operations:

```
let map = new Map();

// add key-value pairs
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

// get a value by key
// Output: 1
console.log(map.get("a"));

// delete a key-value pair
map.delete("a");

// check if a key exists
// Output: false
console.log(map.has("a"));
// Output: true
console.log(map.has("b"));

// iterate over key-value pairs
for (let key of map.keys()) {
    console.log(key, map.get(key));
}
// Output: b 2 and c 3
``` 

That's pretty much what you need to know. If you run into something unfamiliar, just look it up in the docs.

### Hash Sets

The `Set` type introduced in ES6 is a hash set—it stores unique elements. Here are the basic operations:

```
let set = new Set();

// add elements
set.add(1);
set.add(2);
set.add(3);

// remove an element
set.delete(1);

// check if an element exists
// Output: false
console.log(set.has(1));
// Output: true
console.log(set.has(2));

// iterate over elements
for (let item of set) {
    console.log(item);
}
// Output: 2 and 3
``` 

### Priority Queue (`PriorityQueue`)

JavaScript doesn't have a built-in priority queue, but LeetCode has the `@datastructures-js/priority-queue` third-party library built in, so you can use it directly without any `require` statement.

Priority queues are heavily used in algorithm problems—classic examples include Dijkstra's shortest path algorithm and merging K sorted linked lists.

```
// Built into LeetCode, use directly without require
// For local development, install first: npm install @datastructures-js/priority-queue

// Min-heap: pass a comparator where a - b means smaller values have higher priority
const minHeap = new PriorityQueue((a, b) => a - b);
minHeap.push(30);
minHeap.push(10);
minHeap.push(20);

// get the top element (minimum value), Output: 10
console.log(minHeap.front());

// pop the top element
minHeap.pop();

// new top element, Output: 20
console.log(minHeap.front());

// get the heap size, Output: 2
console.log(minHeap.size());

// check if the heap is empty, Output: false
console.log(minHeap.isEmpty());

// Max-heap: b - a means larger values have higher priority
const maxHeap = new PriorityQueue((a, b) => b - a);
maxHeap.push(30);
maxHeap.push(10);
maxHeap.push(20);
// get the top element (maximum value), Output: 30
console.log(maxHeap.front());
``` 

Custom Sorting

If you need to store complex elements (like arrays or objects), you can specify the sorting logic in the comparator function:

```
// store arrays, sorted by the first element in ascending order
const pq = new PriorityQueue((a, b) => a[0] - b[0]);
pq.push([3, 'apple']);
pq.push([1, 'banana']);
pq.push([2, 'cherry']);
// top element is [1, 'banana']
console.log(pq.front());
``` 

### Other Special Data Structures

In algorithm problems, you'll also encounter special data structures like linked lists and trees. These aren't built into JavaScript, but my algorithm visualization panel has implementations for all of them. Check out my [Introduction to the Algorithm Visualization Panel](</en/algo/intro/visualize/>) for details on how to use them.

Last updated: 03/14/2026, 12:17 AM
