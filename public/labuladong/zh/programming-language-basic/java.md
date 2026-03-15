# Java 语言基础

> Source: https://labuladong.online/zh/algo/programming-language-basic/java/
> Archived: labuladong.online — 算法笔记

---

# Java 语言基础

本文针对初学者，介绍 Java 的基本使用，包括控制语句、标准库的常用数据结构等，以便快速上手刷题。

## ¶标准输出

Java 的标准输出是 `System.out.println`，用于在控制台打印内容并换行。`System.out.print` 可以用于不换行的输出。
    
    
    int a = 10;
    
    // 输出：10
    System.out.println(a);
    
    // 可以串联输出
    // 输出：Hello, World!
    System.out.println("Hello" + ", " + "World!");
    
    String s = "abc";
    // 输出：abc 10
    System.out.println(s + " " + a);
    
    // 格式化输出
    // 输出：abc 10
    System.out.printf("%s %d\n", s, a);

## ¶控制语句

编程语言的控制语句一般都比较简单，最常见的无非就是条件判断和循环，下面简单介绍一下。

### ¶条件判断 if else
    
    
    int a = 10;
    
    if (a > 5) {
        System.out.println("a > 5");
    } else if (a == 5) {
        System.out.println("a == 5");
    } else {
        System.out.println("a < 5");
    }
    // 输出：a > 5

### ¶循环 for/while

`for` 和 `while` 都可以用来做循环，`for` 循环一般用于已知循环次数的情况，`while` 循环一般用于未知循环次数的情况。
    
    
    // 输出：0 1 2 3 4 
    for (int i = 0; i < 5; i++) {
        System.out.print(i + " ");
    }
    System.out.println();
    
    int num = 100;
    // 输出：100 50 25 12 6 3 1 
    while (num > 0) {
        System.out.print(num + " ");
        num /= 2;
    }
    System.out.println();

## ¶基本数据结构

Java 的标准库提供了多种常用数据结构，如 `ArrayList`、`LinkedList`、`HashMap`、`HashSet` 等。以下是一些常用数据结构的介绍及其使用方法。

### ¶动态数组 `ArrayList`

`ArrayList` 是 Java 标准库中的动态数组实现。相比于固定大小的数组，`ArrayList` 可以根据需要动态调整大小。

初始化方法：
    
    
    import java.util.ArrayList;
    
    // 初始化一个空的 ArrayList nums
    ArrayList<Integer> nums = new ArrayList<>();
    
    // 初始化一个包含元素 1, 3, 5 的 ArrayList nums
    ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 3, 5));

`ArrayList` 有很多方法，下面举几个常用方法的例子：
    
    
    import java.util.ArrayList;
    import java.util.Collections;
    
    public class Main {
        public static void main(String[] args) {
            int n = 10;
            // 初始化 ArrayList，大小为 10，元素值都为 0
            ArrayList<Integer> nums = new ArrayList<>(Collections.nCopies(n, 0));
            // 输出：false
            System.out.println(nums.isEmpty());
            // 输出：10
            System.out.println(nums.size());
    
            // 在数组尾部插入一个元素 20
            nums.add(20);
            // 输出：11
            System.out.println(nums.size());
    
            // 得到数组最后一个元素
            // 输出：20
            System.out.println(nums.get(nums.size() - 1));
    
            // 删除数组的最后一个元素
            nums.remove(nums.size() - 1);
            // 输出：10
            System.out.println(nums.size());
    
            // 可以通过索引直接取值或修改
            nums.set(0, 11);
            // 输出：11
            System.out.println(nums.get(0));
    
            // 在索引 3 处插入一个元素 99
            nums.add(3, 99);
    
            // 删除索引 2 处的元素
            nums.remove(2);
    
            // 交换 nums[0] 和 nums[1]
            Collections.swap(nums, 0, 1);
    
            // 遍历数组
            // 输出：0 11 99 0 0 0 0 0 0 0
            for(int num : nums) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }

以上就是 Java `ArrayList` 的常用方法，主要包括通过索引访问元素以及添加、删除元素的方法。在算法题中，`ArrayList` 的这些方法已经足够使用。

### ¶双链表 `LinkedList`

`LinkedList` 是 Java 标准库中的双向链表实现。相比于 `ArrayList`，`LinkedList` 在头部和尾部插入和删除元素时性能更好。

`LinkedList` 的常用方法：
    
    
    import java.util.Arrays;
    import java.util.LinkedList;
    
    public class Main {
        public static void main(String[] args) {
            // 初始化链表
            LinkedList<Integer> lst = new LinkedList<>(Arrays.asList(1, 2, 3, 4, 5));
    
            // 检查链表是否为空，输出：false
            System.out.println(lst.isEmpty());
    
            // 获取链表的大小，输出：5
            System.out.println(lst.size());
    
            // 在链表头部插入元素 0
            lst.addFirst(0);
            // 在链表尾部插入元素 6
            lst.addLast(6);
    
            // 获取链表头部和尾部元素，输出：0 6
            System.out.println(lst.getFirst() + " " + lst.getLast());
    
            // 删除链表头部元素
            lst.removeFirst();
            // 删除链表尾部元素
            lst.removeLast();
    
            // 在链表中插入元素
            // 移动到第三个位置
            lst.add(2, 99);
    
            // 删除链表中某个元素
            lst.remove(1);
    
            // 遍历链表
            // 输出：1 99 3 4 5
            for(int val : lst) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }

一般来说，当我们想在头部增删元素时会使用 `LinkedList`，因为它在头部增删元素的效率比 `ArrayList` 高。但当需要频繁通过索引访问元素时，我们会使用 `ArrayList`。

### ¶队列 `Queue`

`Queue` 是 Java 标准库中的队列接口，常用的实现类有 `LinkedList` 和 `PriorityQueue`。这里以 `LinkedList` 为例。
    
    
    import java.util.Queue;
    import java.util.LinkedList;
    
    public class Main {
        public static void main(String[] args) {
            // 初始化一个空的整型队列 q
            Queue<Integer> q = new LinkedList<>();
    
            // 在队尾添加元素
            q.offer(10);
            q.offer(20);
            q.offer(30);
    
            // 检查队列是否为空，输出：false
            System.out.println(q.isEmpty());
    
            // 获取队列的大小，输出：3
            System.out.println(q.size());
    
            // 获取队列的队头元素
            // 输出：10
            System.out.println(q.peek());
    
            // 删除队头元素
            q.poll();
    
            // 输出新的队头元素：20
            System.out.println(q.peek());
        }
    }

### ¶优先级队列 `PriorityQueue`

`PriorityQueue` 是 Java 标准库中基于二叉堆实现的优先级队列。它默认是**小顶堆** （堆顶元素最小），如果需要**大顶堆** （堆顶元素最大），可以传入反序比较器。

在算法题中优先级队列被大量使用，比如 Dijkstra 最短路径算法、合并 K 个有序链表等经典问题都需要用到它。
    
    
    import java.util.PriorityQueue;
    import java.util.Collections;
    
    public class Main {
        public static void main(String[] args) {
            // 小顶堆（默认），堆顶是最小值
            PriorityQueue<Integer> minHeap = new PriorityQueue<>();
            minHeap.offer(30);
            minHeap.offer(10);
            minHeap.offer(20);
    
            // 获取堆顶元素（最小值），输出：10
            System.out.println(minHeap.peek());
    
            // 删除堆顶元素
            minHeap.poll();
    
            // 新的堆顶元素，输出：20
            System.out.println(minHeap.peek());
    
            // 获取堆的大小，输出：2
            System.out.println(minHeap.size());
    
            // 检查堆是否为空，输出：false
            System.out.println(minHeap.isEmpty());
    
            // 大顶堆，堆顶是最大值
            PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
            maxHeap.offer(30);
            maxHeap.offer(10);
            maxHeap.offer(20);
            // 获取堆顶元素（最大值），输出：30
            System.out.println(maxHeap.peek());
        }
    }

### ¶栈 `Stack`

栈是一种后进先出（LIFO）的数据结构，Java 提供了 `Stack` 类来实现栈的功能：
    
    
    import java.util.Stack;
    
    public class Main {
        public static void main(String[] args) {
            // 初始化一个空的整型栈 s
            Stack<Integer> s = new Stack<>();
    
            // 向栈顶添加元素
            s.push(10);
            s.push(20);
            s.push(30);
    
            // 检查栈是否为空，输出：false
            System.out.println(s.isEmpty());
    
            // 获取栈的大小，输出：3
            System.out.println(s.size());
    
            // 获取栈顶元素，输出：30
            System.out.println(s.peek());
    
            // 删除栈顶元素
            s.pop();
    
            // 输出新的栈顶元素：20
            System.out.println(s.peek());
        }
    }

### ¶哈希表 `HashMap`

`HashMap` 是 Java 标准库中的哈希表实现，提供了基于键值对（key-value）的存储，可以高效的完成键值对的增删查改操作。

`HashMap` 的常用方法如下：
    
    
    import java.util.HashMap;
    import java.util.Map;
    
    public class Main {
        public static void main(String[] args) {
            // 初始化哈希表
            HashMap<Integer, String> hashmap = new HashMap<>();
            hashmap.put(1, "one");
            hashmap.put(2, "two");
            hashmap.put(3, "three");
    
            // 检查哈希表是否为空，输出：false
            System.out.println(hashmap.isEmpty());
    
            // 获取哈希表的大小，输出：3
            System.out.println(hashmap.size());
    
            // 查找指定键值是否存在
            // 输出：Key 2 -> two
            if(hashmap.containsKey(2)) {
                System.out.println("Key 2 -> " + hashmap.get(2));
            } else {
                System.out.println("Key 2 not found.");
            }
    
            // 获取指定键对应的值，若不存在会返回 null
            // 输出：null
            System.out.println(hashmap.get(4));
    
            // 获取指定键对应的值，若不存在则返回默认值
            // 输出：defaultVal
            System.out.println(hashmap.getOrDefault(4, "defaultVal"));
    
            // 插入一个新的键值对
            hashmap.put(4, "four");
    
            // 获取新插入的值，输出：four
            System.out.println(hashmap.get(4));
    
            // 删除键值对
            hashmap.remove(3);
    
            // 检查删除后键 3 是否存在
            // 输出：Key 3 not found.
            if(hashmap.containsKey(3)) {
                System.out.println("Key 3 -> " + hashmap.get(3));
            } else {
                System.out.println("Key 3 not found.");
            }
    
            // 遍历哈希表
            // 输出（顺序可能不同）：
            // 1 -> one
            // 2 -> two
            // 4 -> four
            for(Map.Entry<Integer, String> pair : hashmap.entrySet()) {
                System.out.println(pair.getKey() + " -> " + pair.getValue());
            }
        }
    }

### ¶哈希集合 `HashSet`

`HashSet` 是 Java 标准库中的哈希集合实现，用于存储不重复的元素，常见使用场景是对元素进行去重。

`HashSet` 的常用方法：
    
    
    import java.util.Arrays;
    import java.util.HashSet;
    
    public class Main {
        public static void main(String[] args) {
            // 初始化哈希集合
            HashSet<Integer> hashset = new HashSet<>(Arrays.asList(1, 2, 3, 4));
    
            // 检查哈希集合是否为空，输出：false
            System.out.println(hashset.isEmpty());
    
            // 获取哈希集合的大小，输出：4
            System.out.println(hashset.size());
    
            // 查找指定元素是否存在
            // 输出：Element 3 found.
            if(hashset.contains(3)) {
                System.out.println("Element 3 found.");
            } else {
                System.out.println("Element 3 not found.");
            }
    
            // 插入一个新的元素
            hashset.add(5);
    
            // 删除一个元素
            hashset.remove(2);
            // 输出：Element 2 not found.
            if(hashset.contains(2)) {
                System.out.println("Element 2 found.");
            } else {
                System.out.println("Element 2 not found.");
            }
    
            // 遍历哈希集合
            // 输出（顺序可能不同）：
            // 1
            // 3
            // 4
            // 5
            for(int element : hashset) {
                System.out.println(element);
            }
        }
    }

## ¶总结

上面这些基础知识就够你开始刷题了。

当然，Java 还提供很多其他数据结构，它们还有很多其他方法和 API，本文都没有介绍。因为一些高级数据结构会在后面的数据结构章节逐步介绍，而每个结构的 API 也是可以在需要的时候查文档的，没必要一开始就全部记住。

下面我会带你做一些力扣的算法题，让你快速把这些数据结构用起来，同时也熟悉一下刷题系统的使用。

更新时间：2026/03/14 00:17

Loading comments...
