# C 语言基础

> Source: https://labuladong.online/zh/algo/programming-language-basic/c/
> Archived: labuladong.online — 算法笔记

---

# C 语言基础

本文针对初学者，介绍 C 语言的基本使用，包括控制语句、常用数据结构等，以便快速上手刷题。

C 语言没有像 C++/Java/Python 那样的标准库容器，但做算法题时，绝大多数场景用数组就能搞定。对于哈希表等较复杂的数据结构，力扣平台内置了 GLib 库，可以直接 `#include <glib.h>` 使用。

建议

由于语法复杂、标准库简陋，C 语言刷题还是比较麻烦的。如果不是必须使用 C 语言，还是建议学一下 [C++ 基础](</zh/algo/programming-language-basic/cpp/>)，用 C++ 刷题也更方便，而且在实际工作中也更常用。

## 标准输出

C 语言的标准输出使用 `printf` 函数，通过格式化字符串来打印内容。

```
#include <stdio.h>

int main() {
    int a = 10;

    // 输出：10
    printf("%d\n", a);

    // 可以格式化输出多个变量
    // 输出：Hello, World!
    printf("%s, %s!\n", "Hello", "World");

    char* s = "abc";
    // 输出：abc 10
    printf("%s %d\n", s, a);

    return 0;
}
``` 

常用的格式化占位符：`%d`（整数）、`%f`（浮点数）、`%s`（字符串）、`%c`（字符）、`%ld`（长整数）。`\n` 是换行符。

## 标准输入

C 语言的标准输入使用 `scanf` 函数：

```
#include <stdio.h>

int main() {
    int a;
    char s[100];

    // 读取一个整数
    scanf("%d", &a);

    // 读取一个字符串（以空格或换行分隔）
    scanf("%s", s);

    // 可以连续读取多个值
    int x, y;
    scanf("%d %d", &x, &y);

    return 0;
}
``` 

如果需要读取一整行（包括空格），可以用 `fgets`：

```
char line[1000];
// 读取一整行（最多 999 个字符）
fgets(line, sizeof(line), stdin);
``` 

在 ACM 模式中，有些题目的输入数据量不确定，需要一直读取到输入结束（EOF）。这时可以把 `scanf` 放到 `while` 的条件中，当输入结束时 `scanf` 会返回 `EOF`，循环自动退出：

```
// 不断读取整数，直到输入结束
int x;
while (scanf("%d", &x) != EOF) {
    printf("%d\n", x);
}

// 不断读取两个整数，直到输入结束
int a, b;
while (scanf("%d %d", &a, &b) == 2) {
    printf("%d\n", a + b);
}

// 不断读取一整行，直到输入结束
char line[1000];
while (fgets(line, sizeof(line), stdin)) {
    printf("%s", line);
}
``` 

提示

一般在力扣等平台刷题时，输入输出都由平台处理，你不需要自己写 `scanf/printf`。但如果你做 ACM 模式的题目（如牛客网），就需要自己处理输入输出了。

## 控制语句

编程语言的控制语句一般都比较简单，最常见的无非就是条件判断和循环，下面简单介绍一下。

### 条件判断 if else

```
int a = 10;

if (a > 5) {
    printf("a > 5\n");
} else if (a == 5) {
    printf("a == 5\n");
} else {
    printf("a < 5\n");
}
// 输出：a > 5
``` 

### 循环 for/while

for 和 while 都可以用来做循环，for 循环一般用于已知循环次数的情况，while 循环一般用于未知循环次数的情况。

```
// 输出：0 1 2 3 4
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
printf("\n");

int num = 100;
// 输出：100 50 25 12 6 3 1
while (num > 0) {
    printf("%d ", num);
    num /= 2;
}
printf("\n");
``` 

## 字符串处理

C 语言没有独立的字符串类型，字符串就是以 `\0`（空字符）结尾的字符数组。下面介绍刷题中最常用的字符串操作。

### 常用字符串函数

```
#include <stdio.h>
#include <string.h>

int main() {
    // strlen：获取字符串长度（不包含末尾的 \0）
    char s[] = "hello";
    // 输出：5
    printf("%d\n", (int)strlen(s));

    // strcpy：复制字符串
    char dest[100];
    strcpy(dest, s);
    // 输出：hello
    printf("%s\n", dest);

    // strcat：拼接字符串（将 src 追加到 dest 末尾）
    strcat(dest, " world");
    // 输出：hello world
    printf("%s\n", dest);

    // strcmp：比较字符串
    // 相等返回 0，s1 < s2 返回负数，s1 > s2 返回正数
    // 输出：0
    printf("%d\n", strcmp("abc", "abc"));

    // strstr：查找子串，返回首次出现位置的指针，找不到返回 NULL
    char* pos = strstr("hello world", "world");
    // 输出：world
    printf("%s\n", pos);

    return 0;
}
``` 

### 字符串与数字的转换

```
#include <stdio.h>
#include <stdlib.h>

int main() {
    // atoi：字符串转 int
    int n = atoi("123");
    // 输出：123
    printf("%d\n", n);

    // atol / atoll：字符串转 long / long long
    long long big = atoll("1234567890123");
    // 输出：1234567890123
    printf("%lld\n", big);

    // sprintf：将格式化内容写入字符串（非常实用）
    char buf[100];
    sprintf(buf, "num=%d", 42);
    // 输出：num=42
    printf("%s\n", buf);

    // sscanf：从字符串中按格式解析
    int x, y;
    sscanf("3 7", "%d %d", &x, &y);
    // 输出：3 7
    printf("%d %d\n", x, y);

    return 0;
}
``` 

### 字符判断与转换

`<ctype.h>` 提供了一组判断和转换单个字符的函数，处理字符串时经常用到：

```
#include <stdio.h>
#include <ctype.h>

int main() {
    // isdigit：判断是否为数字字符 '0'-'9'
    // 输出：1
    printf("%d\n", isdigit('3') != 0);

    // isalpha：判断是否为字母 'a'-'z' 或 'A'-'Z'
    // 输出：1
    printf("%d\n", isalpha('a') != 0);

    // toupper / tolower：大小写转换
    // 输出：A
    printf("%c\n", toupper('a'));
    // 输出：a
    printf("%c\n", tolower('A'));

    return 0;
}
``` 

## 内存管理

C 语言需要手动管理内存。在刷题中，主要用 `malloc`/`calloc` 分配内存，用 `free` 释放内存。

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n = 10;

    // malloc：分配内存（不初始化，内容是随机值）
    int* arr = (int*)malloc(n * sizeof(int));

    // calloc：分配内存并初始化为 0（推荐）
    int* arr2 = (int*)calloc(n, sizeof(int));

    // memset：按字节设置内存值
    // 常用于将数组整体初始化为 0 或 -1
    memset(arr, 0, n * sizeof(int));
    // 输出：0
    printf("%d\n", arr[0]);

    // memcpy：复制内存
    arr[0] = 42;
    memcpy(arr2, arr, n * sizeof(int));
    // 输出：42
    printf("%d\n", arr2[0]);

    // realloc：调整已分配内存的大小
    arr = (int*)realloc(arr, 2 * n * sizeof(int));

    // free：释放内存
    free(arr);
    free(arr2);

    // 分配二维数组
    int m = 3;
    int** grid = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) {
        grid[i] = (int*)calloc(n, sizeof(int));
    }

    // 释放二维数组（先释放每一行，再释放行指针数组）
    for (int i = 0; i < m; i++) {
        free(grid[i]);
    }
    free(grid);

    return 0;
}
``` 

提示

在力扣等平台刷题时，程序运行完毕后系统会自动回收所有内存，所以即使不写 `free` 也不会有问题。但养成 `malloc` 和 `free` 配对使用的好习惯是很重要的，尤其是在 ACM 模式或实际开发中。

## 基本数据结构

C 语言没有像其他语言那样丰富的标准库容器，但做算法题时，数组 + 手动管理就能覆盖大多数场景。

力扣 C 环境内置 GLib 库

力扣（LeetCode）平台的 C 语言环境内置了 GLib 2.0 库，只需 `#include <glib.h>` 即可使用哈希表 `GHashTable`、动态数组 `GArray`、队列 `GQueue` 等数据结构，无需自己手搓。本文后面介绍哈希表、动态数组时会用到。

下面介绍 C 语言刷题中最常用的数据结构及其实现方式。

### 静态数组

C 语言刷算法题最常用的就是静态数组。题目一般都会给出数据范围（比如 `1 <= n <= 10^5`），直接开一个足够大的数组 `int arr[100001]`，配合一个 `size` 变量记录当前有效元素的数量即可。

初始化方法：

```
#include <string.h>

int n = 7, m = 8;

// 一维数组，大小为 n，元素值都为 0
int nums[7];
memset(nums, 0, sizeof(nums));

// 也可以用 calloc 在堆上分配并初始化为 0
int* nums2 = (int*)calloc(n, sizeof(int));

// 二维数组（静态），大小为 m * n
int dp[8][7];
memset(dp, 0, sizeof(dp));

// 二维数组（动态）
int** dp2 = (int**)malloc(m * sizeof(int*));
for (int i = 0; i < m; i++) {
    dp2[i] = (int*)calloc(n, sizeof(int));
}
``` 

静态数组的常用操作：

```
#include <stdio.h>
#include <string.h>

int main() {
    int n = 10;
    // 数组大小为 20，预留空间方便演示插入操作
    // 用 size 变量记录有效元素个数为 10，元素值都为 0
    int nums[20];
    memset(nums, 0, sizeof(nums));
    int size = n;
    // 输出：0 (false)
    printf("%d\n", size == 0);
    // 输出：10
    printf("%d\n", size);

    // 在数组尾部插入一个元素 20
    nums[size++] = 20;
    // 输出：11
    printf("%d\n", size);

    // 得到数组最后一个元素
    // 输出：20
    printf("%d\n", nums[size - 1]);

    // 删除数组的最后一个元素
    size--;
    // 输出：10
    printf("%d\n", size);

    // 可以通过索引直接取值或修改
    nums[0] = 11;
    // 输出：11
    printf("%d\n", nums[0]);

    // 在索引 3 处插入一个元素 99（需要手动搬移数据）
    for (int i = size; i > 3; i--) {
        nums[i] = nums[i - 1];
    }
    nums[3] = 99;
    size++;

    // 删除索引 2 处的元素（需要手动搬移数据）
    for (int i = 2; i < size - 1; i++) {
        nums[i] = nums[i + 1];
    }
    size--;

    // 交换 nums[0] 和 nums[1]
    int tmp = nums[0];
    nums[0] = nums[1];
    nums[1] = tmp;

    // 遍历数组
    // 输出：0 11 99 0 0 0 0 0 0 0
    for (int i = 0; i < size; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
``` 

以上就是 C 语言静态数组的常用操作。在算法题中，主要用索引访问元素和尾部增删元素。中间插入和删除需要手动搬移数据，效率低，应尽量避免。具体的原因会在后文 [数组基础](</zh/algo/data-structure-basic/array-basic/>) 中详细介绍。

### 动态数组 `GArray`

如果你需要一个像 C++ `vector` 或 Java `ArrayList` 那样能自动扩容的动态数组，可以使用 GLib 提供的 `GArray`。不过大多数算法题直接用静态数组就够了，`GArray` 仅在少数场景有用（如返回的二维结果每行大小不同）。

```
#include <stdio.h>
#include <glib.h>

int main() {
    // 创建一个存储 int 的动态数组
    GArray* arr = g_array_new(FALSE, FALSE, sizeof(int));

    int val;

    // 在数组尾部追加元素
    // 注意：g_array_append_val 的参数必须是变量，不能直接传字面量
    val = 1; g_array_append_val(arr, val);
    val = 3; g_array_append_val(arr, val);
    val = 5; g_array_append_val(arr, val);

    // 获取数组长度，输出：3
    printf("%d\n", arr->len);

    // 通过索引访问元素，输出：1
    printf("%d\n", g_array_index(arr, int, 0));

    // 通过索引访问最后一个元素，输出：5
    printf("%d\n", g_array_index(arr, int, arr->len - 1));

    // 删除索引 1 处的元素（保持顺序）
    g_array_remove_index(arr, 1);
    // 输出：2
    printf("%d\n", arr->len);

    // 遍历数组
    // 输出：1 5
    for (guint i = 0; i < arr->len; i++) {
        printf("%d ", g_array_index(arr, int, i));
    }
    printf("\n");

    // 释放数组
    g_array_free(arr, TRUE);
    return 0;
}
``` 

### 栈（用数组模拟）

栈是一种后进先出（LIFO）的数据结构。C 语言没有内置的栈类型，但可以用数组非常简单地模拟：

```
#include <stdio.h>

int main() {
    // 根据题目数据范围开足够大的数组
    int stk[10001];
    int top = -1;

    // 向栈顶添加元素
    stk[++top] = 10;
    stk[++top] = 20;
    stk[++top] = 30;

    // 检查栈是否为空，输出：0 (false)
    printf("%d\n", top == -1);

    // 获取栈的大小，输出：3
    printf("%d\n", top + 1);

    // 获取栈顶元素，输出：30
    printf("%d\n", stk[top]);

    // 删除栈顶元素
    top--;

    // 输出新的栈顶元素：20
    printf("%d\n", stk[top]);

    return 0;
}
``` 

### 队列（用数组模拟）

队列是一种先进先出（FIFO）的数据结构。同样可以用数组来模拟：

```
#include <stdio.h>

int main() {
    // 根据题目数据范围开足够大的数组
    int q[10001];
    int front = 0, rear = 0;

    // 在队尾添加元素
    q[rear++] = 10;
    q[rear++] = 20;
    q[rear++] = 30;

    // 检查队列是否为空，输出：0 (false)
    printf("%d\n", front == rear);

    // 获取队列的大小，输出：3
    printf("%d\n", rear - front);

    // 获取队头元素，输出：10
    printf("%d\n", q[front]);

    // 删除队头元素
    front++;

    // 输出新的队头元素：20
    printf("%d\n", q[front]);

    return 0;
}
``` 

刷题中的典型用法

这种数组模拟队列的方式，`front` 只往前移动不会回退，已经出队的空间不会被复用。所以数组大小不是按「同时在队列中的最大元素数」来开，而是按「整个过程中总共入队多少次」来开。

比如 BFS 遍历一棵 `n` 个节点的二叉树，每个节点最多入队一次，数组大小开 `n + 1` 就够了；如果题目数据范围是 `n <= 10^5`，直接开 `int q[100001]` 即可，不需要考虑循环队列。

如果你对循环队列的原理感兴趣，可以参考后文 [环形数组技巧](</zh/algo/data-structure-basic/cycle-array/>) 和 [队列/栈的数组实现](</zh/algo/data-structure-basic/array-queue-stack/>)。

### 优先级队列（手写二叉堆）

C 语言和 GLib 都没有内置的优先级队列，需要手写二叉堆。虽然比其他语言繁琐一些，但可以把下面的模板代码复制过去直接使用。

关于二叉堆的原理，可以参考 [二叉堆核心原理及可视化](</zh/algo/data-structure-basic/binary-heap-basic/>)，这里只给出实用的模板代码。

在算法题中优先级队列被大量使用，比如 Dijkstra 最短路径算法、合并 K 个有序链表等经典问题都需要用到它。

```
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

// 小顶堆：向堆中插入元素
void heapPush(int* heap, int* size, int val) {
    heap[(*size)++] = val;
    int i = *size - 1;
    while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
        swap(&heap[i], &heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

// 小顶堆：弹出堆顶元素
int heapPop(int* heap, int* size) {
    int val = heap[0];
    heap[0] = heap[--(*size)];
    int i = 0;
    while (2 * i + 1 < *size) {
        int j = 2 * i + 1;
        if (j + 1 < *size && heap[j + 1] < heap[j]) j++;
        if (heap[i] <= heap[j]) break;
        swap(&heap[i], &heap[j]);
        i = j;
    }
    return val;
}

// 查看堆顶元素
int heapPeek(int* heap) {
    return heap[0];
}

int main() {
    int heap[10001];
    int size = 0;

    // 插入元素
    heapPush(heap, &size, 30);
    heapPush(heap, &size, 10);
    heapPush(heap, &size, 20);

    // 获取堆顶元素（最小值），输出：10
    printf("%d\n", heapPeek(heap));

    // 弹出堆顶元素
    heapPop(heap, &size);

    // 新的堆顶元素，输出：20
    printf("%d\n", heapPeek(heap));

    // 获取堆的大小，输出：2
    printf("%d\n", size);

    // 检查堆是否为空，输出：0 (false)
    printf("%d\n", size == 0);

    return 0;
}
``` 

大顶堆

如果需要大顶堆，只需把比较方向反转：`heapPush` 中的 `<` 改为 `>`，`heapPop` 中的 `<` 改为 `>` 且 `<=` 改为 `>=`。

### 哈希表（GLib `GHashTable`）

C 语言标准库没有哈希表，但力扣平台内置了 GLib 库，可以直接 `#include <glib.h>` 使用 `GHashTable`。

`GHashTable` 的常用方法如下：

```
#include <stdio.h>
#include <glib.h>

int main() {
    // 初始化哈希表（int → int）
    GHashTable* hashmap = g_hash_table_new(g_direct_hash, g_direct_equal);
    g_hash_table_insert(hashmap, GINT_TO_POINTER(1), GINT_TO_POINTER(100));
    g_hash_table_insert(hashmap, GINT_TO_POINTER(2), GINT_TO_POINTER(200));
    g_hash_table_insert(hashmap, GINT_TO_POINTER(3), GINT_TO_POINTER(300));

    // 获取哈希表的大小，输出：3
    printf("%d\n", g_hash_table_size(hashmap));

    // 查找指定键是否存在
    // 输出：Key 2 -> 200
    if (g_hash_table_contains(hashmap, GINT_TO_POINTER(2))) {
        int val = GPOINTER_TO_INT(
            g_hash_table_lookup(hashmap, GINT_TO_POINTER(2)));
        printf("Key 2 -> %d\n", val);
    } else {
        printf("Key 2 not found.\n");
    }

    // 插入一个新的键值对
    g_hash_table_insert(hashmap, GINT_TO_POINTER(4), GINT_TO_POINTER(400));

    // 获取新插入的值，输出：400
    int val = GPOINTER_TO_INT(
        g_hash_table_lookup(hashmap, GINT_TO_POINTER(4)));
    printf("%d\n", val);

    // 删除键值对
    g_hash_table_remove(hashmap, GINT_TO_POINTER(3));

    // 检查删除后键 3 是否存在
    // 输出：Key 3 not found.
    if (g_hash_table_contains(hashmap, GINT_TO_POINTER(3))) {
        printf("Key 3 found.\n");
    } else {
        printf("Key 3 not found.\n");
    }

    // 释放哈希表
    g_hash_table_destroy(hashmap);
    return 0;
}
``` 

特别注意

使用 `GHashTable` 存取 int 值时，需要用 `GINT_TO_POINTER` 和 `GPOINTER_TO_INT` 宏进行转换，这是固定写法。

`g_hash_table_lookup` 在 key 不存在时返回 `NULL`（即 `GPOINTER_TO_INT(NULL) == 0`）。如果 0 也是合法 value，需要先用 `g_hash_table_contains` 判断 key 是否存在，或者用 `g_hash_table_lookup_extended` 来区分。

小范围 key 优先用数组

当 key 的范围已知且较小时（如 ASCII 字符、0~10^5 的整数），直接用 `int arr[N]` 比哈希表更快更简洁。只有当 key 范围大或不确定时才需要用哈希表。

### 哈希集合（GLib `GHashTable`）

C 语言没有内置的哈希集合，但可以用 `GHashTable` 来模拟，value 固定为一个非 NULL 值即可。

```
#include <stdio.h>
#include <glib.h>

int main() {
    // 初始化哈希集合
    GHashTable* hashset = g_hash_table_new(g_direct_hash, g_direct_equal);
    g_hash_table_insert(hashset, GINT_TO_POINTER(1), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(2), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(3), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(4), GINT_TO_POINTER(1));

    // 获取哈希集合的大小，输出：4
    printf("%d\n", g_hash_table_size(hashset));

    // 查找指定元素是否存在
    // 输出：Element 3 found.
    if (g_hash_table_contains(hashset, GINT_TO_POINTER(3))) {
        printf("Element 3 found.\n");
    } else {
        printf("Element 3 not found.\n");
    }

    // 插入一个新的元素
    g_hash_table_insert(hashset, GINT_TO_POINTER(5), GINT_TO_POINTER(1));

    // 删除一个元素
    g_hash_table_remove(hashset, GINT_TO_POINTER(2));

    // 输出：Element 2 not found.
    if (g_hash_table_contains(hashset, GINT_TO_POINTER(2))) {
        printf("Element 2 found.\n");
    } else {
        printf("Element 2 not found.\n");
    }

    // 释放哈希集合
    g_hash_table_destroy(hashset);
    return 0;
}
``` 

## 总结

上面这些基础知识就够你开始刷题了。

C 语言做算法题的核心思路就是：**数组能搞定的尽量用数组** 。栈、队列都用数组模拟，哈希表在 key 范围小的时候也用数组代替，只有在 key 范围大或不确定时才用 GLib 的 `GHashTable`。

当然，C 语言还有指针、内存管理等进阶知识，以及 GLib 还提供了 `GQueue`（双端队列）、`GTree`（平衡二叉搜索树）等高级数据结构，本文都没有介绍。这些会在后面的数据结构章节逐步涉及，没必要一开始就全部记住。

下面我会带你做一些力扣的算法题，让你快速把这些数据结构用起来，同时也熟悉一下刷题系统的使用。
