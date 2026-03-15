# JavaScript 语言基础

> Source: https://labuladong.online/zh/algo/intro/js/
> Archived: labuladong.online — 算法笔记

---

# JavaScript 语言基础

因为我的 [算法可视化面板](</zh/algo/intro/visualize/>) 目前只支持 JavaScript 语言，所以这个教程不仅面向 JavaScript 初学者，也面向其他编程语言的读者，帮助大家快速上手算法可视化面板。

对使用其他语言的读者，本文为选学内容

每道题的可视化代码我都提前写好了，甚至我会在文章或者注释中告诉你应该如何操作可视化面板来观察算法的执行过程。所以就算你不了解 JavaScript，也能从每道题目配套的可视化面板中受益。

但是，有些读者想修改我的预设代码，或者对自己的一些奇思妙想进行可视化验证，那么就需要了解一些 JavaScript 的基本语法，本文就是为这些读者准备的。

现在 AI 工具这么发达，一般也不需要你从头写 JS，可以让 AI 工具帮你把其他语言的代码翻译成 JS，你只需要了解 JS 基础语法，能看懂代码就够了。所以只要你有任意其他熟悉的编程语言，花 5 分钟看看下面的内容，就能把可视化面板用起来了。

## JavaScript 基本语法

### 变量声明

首先说一下 JavaScript 的变量声明，它有三种声明变量的方式，分别是 `var, let, const`。

`const` 声明的是常量，一旦声明就不能再修改，这个没什么好说的，一般在工程代码中才有使用场景，在算法代码中用不用都无所谓。

```
const a = 1;
// 报错
a = 2;
``` 

`var` 和 `let` 都可以声明一般的变量，但它俩声明出来的变量可见性不一样，`var` 应该算是历史遗留问题，总之你可以认为在可视化面板中它俩的效果是一样的。

```
let str = "hello world";
str = "world"
// 输出 world
console.log(str);

if (true) {
    // 这里的 str 和外面的 str 是两个不同的变量
    let str = "hello";
    // 输出 hello
    console.log(str);
}
``` 

我的可视化代码中的顶层函数一般是用 `var` 声明的，这是因为 LeetCode 上给的 JS 函数签名都是用 `var` 声明的，所以我也沿用 `var` 了，不过你非要改成 `let` 也是没问题的。

### 函数声明

JavaScript 的函数声明也很简单，就是这样：

```
function add(a, b) {
    return a + b;
}
// 输出 3
console.log(add(1, 2));
``` 

这个函数的声明和其他编程语言的声明是一样的，不过 JavaScript 中可能还会见到下面的匿名函数声明方式，相当于是用变量接收了一个匿名函数，不过使用起来都是一样的：

```
// 把 let 换成 var 也是一样的效果
let add2 = function(a, b) {
    return a + b;
}
// 输出 3
console.log(add2(1, 2));

// 用 ES6 的箭头函数声明
let add3 = (a, b) => {
    return a + b;
}
// 输出 3
console.log(add3(1, 2));
``` 

用 `function` 关键词声明的函数和用 `() => {}` 这种方式声明的箭头函数有一些关键差别，主要是函数体内使用 `this` 指针的行为不同，但是在算法题中基本不会用到这个特性，所以你可以认为这两种方式是一样的。

### 循环控制

JavaScript 的循环控制和其他编程语言也是一样的，常见的就是 `for` 和 `while`。

以遍历数组为例，先讲最常见的方式，用索引遍历：

```
// 遍历数组
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
// 输出 1 2 3 4 5
``` 

然后是用 `for...of` 方式，可以直接遍历元素：

```
// 遍历数组
let arr = [1, 2, 3, 4, 5];
for (let item of arr) {
    console.log(item);
}
// 输出 1 2 3 4 5
``` 

用 `for ... of` 遍历元素

注意 JavaScript 用的是 `of` 来遍历数组元素，不要用 `in`。`in` 有其他的作用，不过我们做算法题基本用不到，我就不啰嗦了。

我知道有些其他语言会用 `in` 遍历数组元素，所以特此提醒，不要搞错了。

`while` 循环和其他语言一样，举个简单例子：

```
let arr = [1, 2, 3, 4, 5];
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}
// 输出 1 2 3 4 5
``` 

### 条件判断

`if else` 的用法和其他语言完全一致，没啥可说的，举个简单的例子：

```
let a = 1;
if (a === 1) {
    console.log("a 等于 1");
} else {
    console.log("a 不等于 1");
}
``` 

`===` 和 `==` 的区别

这里也有一个小坑，就是 JavaScript 中的 `==` 和 `===` 的区别，`==` 是值相等返回 `true`，`===` 是值和类型都相等才返回 `true`。反之亦然，`!=` 是值不相等返回 `true`，`!==` 是值和类型都不相等才返回 `true`。

比如 JavaScript 中的 `null` 和 `undefined` 都表示空值，`null == undefined` 是 `true`，但是 `null === undefined` 是 `false`。

这两种写法的区别也算是 JavaScript 的历史遗留问题，在做算法题的场景中，基本不会涉及到这么细节的问题，所以可以认为两种写法都是一样的。

## JavaScript 基本数据结构

### 字符串

JavaScript 中的字符串和其他语言一样，没啥特别的，举个例子：

```
let str = "hello world";
// 输出 11
console.log(str.length);
// 输出 h
console.log(str[0]);
// 输出 true
console.log(str === "hello world");

// 字符串分割
let arr = str.split(" ");
// 输出 ["hello", "world"]
console.log(arr);

// 获取子串，多种方式都可以
// 输出 hello
console.log(str.substring(0, 5));
// 输出 hello
console.log(str.slice(0, 5));
// 输出 hello
console.log(str.substring(0, 5));

// 字符串拼接
let str2 = "world";
// 输出 hello world world
console.log(str + " " + str2);
``` 

### 数组

有以下几种方法创建数组：

```
let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(1, 2, 3, 4, 5);

// 创建一个长度为 5 的数组，每个元素都是 undefined
let arr3 = new Array(5);

// 创建一个长度为 5 的数组，每个元素都是 0
let arr4 = new Array(5).fill(0);
``` 

数组的常见操作：

```
let arr = [1, 2, 3, 4, 5];

// 获取数组长度
// 输出 5
console.log(arr.length);

// 获取数组元素
// 输出 1
console.log(arr[0]);

// 修改数组元素
arr[0] = 100;

// 复制数组的所有元素到一个新数组
let arr2 = arr.slice();
// 这也是一种复制数组的方法
let arr3 = [...arr];

// 在数组末尾添加一个元素
arr.push(6);

// 删除数组尾部的元素
arr.pop();

// 在数组开头添加一个元素 888
// 不常用，因为算法中都尽量避免在数组的非末尾位置增删元素
arr.unshift(888);

// 删除数组开头的元素
// 不常用，因为算法中都尽量避免在数组的非末尾位置增删元素
arr.shift();
``` 

好了，了解上述基本操作完全足够你在算法题中使用数组了。

### 哈希表

通俗来讲，JavaScript 中的对象就可以理解为是哈希表，因为 JavaScript 对象就是若干键值对。不过 ES6 中引入了 `Map` 类型，所以我们就规范一些，用 `Map` 类型来创建哈希表。

`Map` 的基本操作：

```
let map = new Map();

// 添加键值对
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

// 获取键值对
// 输出 1
console.log(map.get("a"));

// 删除键值对
map.delete("a");

// 判断是否存在某个键
// 输出 false
console.log(map.has("a"));
// 输出 true
console.log(map.has("b"));

// 遍历键值对
for (let key of map.keys()) {
    console.log(key, map.get(key));
}
// 输出 b 2 和 c 3
``` 

了解这些就差不多了，遇到不会处理的场景再查查文档就行了。

### 哈希集合

ES6 中引入的 `Set` 类型就是哈希集合，它用来存储不重复的元素，基本操作如下：

```
let set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(3);

// 删除元素
set.delete(1);

// 判断是否存在某个元素
// 输出 false
console.log(set.has(1));
// 输出 true
console.log(set.has(2));

// 遍历元素
for (let item of set) {
    console.log(item);
}
// 输出 2 和 3
``` 

### 优先级队列 `PriorityQueue`

JavaScript 没有内置的优先级队列，但 LeetCode 和力扣已经内置了 `@datastructures-js/priority-queue` 这个第三方库，可以直接使用，不需要 `require` 引入。

在算法题中优先级队列被大量使用，比如 Dijkstra 最短路径算法、合并 K 个有序链表等经典问题都需要用到它。

```
// LeetCode/力扣已内置，可直接使用，无需 require
// 本地运行需要先安装：npm install @datastructures-js/priority-queue

// 小顶堆，传入比较函数，a - b 表示较小的值优先
const minHeap = new PriorityQueue((a, b) => a - b);
minHeap.push(30);
minHeap.push(10);
minHeap.push(20);

// 获取堆顶元素（最小值），输出：10
console.log(minHeap.front());

// 弹出堆顶元素
minHeap.pop();

// 新的堆顶元素，输出：20
console.log(minHeap.front());

// 获取堆的大小，输出：2
console.log(minHeap.size());

// 检查堆是否为空，输出：false
console.log(minHeap.isEmpty());

// 大顶堆，b - a 表示较大的值优先
const maxHeap = new PriorityQueue((a, b) => b - a);
maxHeap.push(30);
maxHeap.push(10);
maxHeap.push(20);
// 获取堆顶元素（最大值），输出：30
console.log(maxHeap.front());
``` 

自定义排序

如果需要存储复杂元素（比如数组或对象），可以在比较函数中指定排序规则：

```
// 存储数组，按第一个元素从小到大排列
const pq = new PriorityQueue((a, b) => a[0] - b[0]);
pq.push([3, 'apple']);
pq.push([1, 'banana']);
pq.push([2, 'cherry']);
// 堆顶是 [1, 'banana']
console.log(pq.front());
``` 

### 其他特殊数据结构

在算法题中，还会用到一些特殊的数据结构，比如链表、树等，这些数据结构不是 JavaScript 内置的，不过我的算法可视化面板中已经实现了这些特殊数据结构，具体用法可以参考我的 [算法可视化面板简介](</zh/algo/intro/visualize/>)。
