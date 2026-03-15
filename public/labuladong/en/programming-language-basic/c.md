# C Basics

> Source: https://labuladong.online/algo/en/programming-language-basic/c/
> Archived: labuladong.online

---

# C Basics

This article is aimed at beginners, covering the basics of C programming—control statements, common data structures, and more—so you can start solving algorithm problems quickly.

C doesn't have standard library containers like C++/Java/Python, but for algorithm problems, plain arrays can handle the vast majority of cases. For more complex data structures like hash tables, the LeetCode platform comes with GLib built in, so you can just `#include <glib.h>` and go.

Suggestion

Because of its complex syntax and bare-bones standard library, solving problems in C can be pretty tedious. If you're not required to use C, I'd recommend picking up [C++ Basics](</en/algo/programming-language-basic/cpp/>) instead—it's more convenient for problem solving and more widely used in practice.

## Standard Output

C uses the `printf` function for standard output, printing content through format strings.

```
#include <stdio.h>

int main() {
    int a = 10;

    // Output: 10
    printf("%d\n", a);

    // You can format and print multiple variables
    // Output: Hello, World!
    printf("%s, %s!\n", "Hello", "World");

    char* s = "abc";
    // Output: abc 10
    printf("%s %d\n", s, a);

    return 0;
}
``` 

Common format specifiers: `%d` (integer), `%f` (float), `%s` (string), `%c` (character), `%ld` (long integer). `\n` is the newline character.

## Standard Input

C uses the `scanf` function for standard input:

```
#include <stdio.h>

int main() {
    int a;
    char s[100];

    // Read an integer
    scanf("%d", &a);

    // Read a string (delimited by space or newline)
    scanf("%s", s);

    // You can read multiple values in sequence
    int x, y;
    scanf("%d %d", &x, &y);

    return 0;
}
``` 

If you need to read an entire line (including spaces), use `fgets`:

```
char line[1000];
// Read an entire line (up to 999 characters)
fgets(line, sizeof(line), stdin);
``` 

In ACM mode, some problems have an unknown amount of input, and you need to keep reading until end-of-file (EOF). You can put `scanf` in a `while` condition—when input ends, `scanf` returns `EOF` and the loop exits automatically:

```
// Keep reading integers until input ends
int x;
while (scanf("%d", &x) != EOF) {
    printf("%d\n", x);
}

// Keep reading two integers until input ends
int a, b;
while (scanf("%d %d", &a, &b) == 2) {
    printf("%d\n", a + b);
}

// Keep reading entire lines until input ends
char line[1000];
while (fgets(line, sizeof(line), stdin)) {
    printf("%s", line);
}
``` 

Tip

On platforms like LeetCode, input and output are handled for you—you don't need to write `scanf/printf` yourself. But if you're doing ACM-style problems (like on Nowcoder), you'll need to handle I/O on your own.

## Control Statements

Control statements in programming languages are generally pretty straightforward. The most common ones are conditionals and loops—let's take a quick look.

### Conditionals: if else

```
int a = 10;

if (a > 5) {
    printf("a > 5\n");
} else if (a == 5) {
    printf("a == 5\n");
} else {
    printf("a < 5\n");
}
// Output: a > 5
``` 

### Loops: for/while

Both `for` and `while` can be used for looping. `for` loops are typically used when you know the number of iterations, while `while` loops are better when you don't.

```
// Output: 0 1 2 3 4
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
printf("\n");

int num = 100;
// Output: 100 50 25 12 6 3 1
while (num > 0) {
    printf("%d ", num);
    num /= 2;
}
printf("\n");
``` 

## String Handling

C doesn't have a dedicated string type—strings are simply character arrays terminated by `\0` (the null character). Here are the most commonly used string operations for problem solving.

### Common String Functions

```
#include <stdio.h>
#include <string.h>

int main() {
    // strlen: get string length (not counting the trailing \0)
    char s[] = "hello";
    // Output: 5
    printf("%d\n", (int)strlen(s));

    // strcpy: copy a string
    char dest[100];
    strcpy(dest, s);
    // Output: hello
    printf("%s\n", dest);

    // strcat: concatenate strings (appends src to the end of dest)
    strcat(dest, " world");
    // Output: hello world
    printf("%s\n", dest);

    // strcmp: compare strings
    // Returns 0 if equal, negative if s1 < s2, positive if s1 > s2
    // Output: 0
    printf("%d\n", strcmp("abc", "abc"));

    // strstr: find a substring, returns a pointer to
    // the first occurrence, or NULL if not found
    char* pos = strstr("hello world", "world");
    // Output: world
    printf("%s\n", pos);

    return 0;
}
``` 

### Converting Between Strings and Numbers

```
#include <stdio.h>
#include <stdlib.h>

int main() {
    // atoi: string to int
    int n = atoi("123");
    // Output: 123
    printf("%d\n", n);

    // atol / atoll: string to long / long long
    long long big = atoll("1234567890123");
    // Output: 1234567890123
    printf("%lld\n", big);

    // sprintf: write formatted content into a string (very handy)
    char buf[100];
    sprintf(buf, "num=%d", 42);
    // Output: num=42
    printf("%s\n", buf);

    // sscanf: parse values from a string using a format
    int x, y;
    sscanf("3 7", "%d %d", &x, &y);
    // Output: 3 7
    printf("%d %d\n", x, y);

    return 0;
}
``` 

### Character Testing and Conversion

`<ctype.h>` provides a set of functions for testing and converting individual characters, which come up a lot when working with strings:

```
#include <stdio.h>
#include <ctype.h>

int main() {
    // isdigit: check if a character is a digit '0'-'9'
    // Output: 1
    printf("%d\n", isdigit('3') != 0);

    // isalpha: check if a character is a letter 'a'-'z' or 'A'-'Z'
    // Output: 1
    printf("%d\n", isalpha('a') != 0);

    // toupper / tolower: case conversion
    // Output: A
    printf("%c\n", toupper('a'));
    // Output: a
    printf("%c\n", tolower('A'));

    return 0;
}
``` 

## Memory Management

C requires manual memory management. When solving problems, you'll mainly use `malloc`/`calloc` to allocate memory and `free` to release it.

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n = 10;

    // malloc: allocate memory (uninitialized, contents are garbage)
    int* arr = (int*)malloc(n * sizeof(int));

    // calloc: allocate memory and initialize to 0 (recommended)
    int* arr2 = (int*)calloc(n, sizeof(int));

    // memset: set memory byte by byte
    // Commonly used to initialize an entire array to 0 or -1
    memset(arr, 0, n * sizeof(int));
    // Output: 0
    printf("%d\n", arr[0]);

    // memcpy: copy memory
    arr[0] = 42;
    memcpy(arr2, arr, n * sizeof(int));
    // Output: 42
    printf("%d\n", arr2[0]);

    // realloc: resize previously allocated memory
    arr = (int*)realloc(arr, 2 * n * sizeof(int));

    // free: release memory
    free(arr);
    free(arr2);

    // Allocate a 2D array
    int m = 3;
    int** grid = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) {
        grid[i] = (int*)calloc(n, sizeof(int));
    }

    // Free a 2D array (free each row first, then the row pointer array)
    for (int i = 0; i < m; i++) {
        free(grid[i]);
    }
    free(grid);

    return 0;
}
``` 

Tip

On platforms like LeetCode, the system automatically reclaims all memory after your program finishes, so skipping `free` won't cause issues. But it's still good practice to always pair `malloc` with `free`, especially in ACM mode or real-world development.

## Basic Data Structures

C doesn't have the rich standard library containers that other languages offer, but for algorithm problems, arrays plus manual management cover most scenarios.

LeetCode's C Environment Includes GLib

LeetCode's C environment comes with GLib 2.0 built in. Just `#include <glib.h>` and you can use hash tables (`GHashTable`), dynamic arrays (`GArray`), queues (`GQueue`), and more—no need to implement them from scratch. We'll use some of these later when discussing hash tables and dynamic arrays.

Here are the most commonly used data structures and how to implement them in C.

### Static Arrays

Static arrays are the workhorse of C algorithm problems. Problems usually specify a data range (e.g., `1 <= n <= 10^5`), so you can just declare an array large enough like `int arr[100001]` and use a `size` variable to track the number of valid elements.

Initialization methods:

```
#include <string.h>

int n = 7, m = 8;

// 1D array of size n, all elements initialized to 0
int nums[7];
memset(nums, 0, sizeof(nums));

// You can also use calloc to allocate on the heap and initialize to 0
int* nums2 = (int*)calloc(n, sizeof(int));

// 2D array (static), size m * n
int dp[8][7];
memset(dp, 0, sizeof(dp));

// 2D array (dynamic)
int** dp2 = (int**)malloc(m * sizeof(int*));
for (int i = 0; i < m; i++) {
    dp2[i] = (int*)calloc(n, sizeof(int));
}
``` 

Common operations on static arrays:

```
#include <stdio.h>
#include <string.h>

int main() {
    int n = 10;
    // Array size is 20, with extra space for demonstrating insertions
    // Use a size variable to track 10 valid elements, all initialized to 0
    int nums[20];
    memset(nums, 0, sizeof(nums));
    int size = n;
    // Output: 0 (false)
    printf("%d\n", size == 0);
    // Output: 10
    printf("%d\n", size);

    // Append element 20 to the end
    nums[size++] = 20;
    // Output: 11
    printf("%d\n", size);

    // Get the last element
    // Output: 20
    printf("%d\n", nums[size - 1]);

    // Remove the last element
    size--;
    // Output: 10
    printf("%d\n", size);

    // Access or modify elements by index
    nums[0] = 11;
    // Output: 11
    printf("%d\n", nums[0]);

    // Insert element 99 at index 3 (requires manually shifting data)
    for (int i = size; i > 3; i--) {
        nums[i] = nums[i - 1];
    }
    nums[3] = 99;
    size++;

    // Delete the element at index 2 (requires manually shifting data)
    for (int i = 2; i < size - 1; i++) {
        nums[i] = nums[i + 1];
    }
    size--;

    // Swap nums[0] and nums[1]
    int tmp = nums[0];
    nums[0] = nums[1];
    nums[1] = tmp;

    // Traverse the array
    // Output: 0 11 99 0 0 0 0 0 0 0
    for (int i = 0; i < size; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
``` 

Those are the common operations for static arrays in C. In algorithm problems, you'll mostly access elements by index and add/remove from the end. Inserting or deleting in the middle requires shifting data manually, which is slow and should be avoided when possible. The reasons behind this are covered in detail in [Array Basics](</en/algo/data-structure-basic/array-basic/>).

### Dynamic Arrays: `GArray`

If you need a dynamically resizing array like C++'s `vector` or Java's `ArrayList`, you can use GLib's `GArray`. That said, plain static arrays are sufficient for most algorithm problems—`GArray` is only useful in a few scenarios (like when each row of a 2D result has a different size).

```
#include <stdio.h>
#include <glib.h>

int main() {
    // Create a dynamic array that stores ints
    GArray* arr = g_array_new(FALSE, FALSE, sizeof(int));

    int val;

    // Append elements to the end
    // Note: g_array_append_val requires a variable, you can't pass a literal directly
    val = 1; g_array_append_val(arr, val);
    val = 3; g_array_append_val(arr, val);
    val = 5; g_array_append_val(arr, val);

    // Get array length, Output: 3
    printf("%d\n", arr->len);

    // Access element by index, Output: 1
    printf("%d\n", g_array_index(arr, int, 0));

    // Access the last element by index, Output: 5
    printf("%d\n", g_array_index(arr, int, arr->len - 1));

    // Remove element at index 1 (preserving order)
    g_array_remove_index(arr, 1);
    // Output: 2
    printf("%d\n", arr->len);

    // Traverse the array
    // Output: 1 5
    for (guint i = 0; i < arr->len; i++) {
        printf("%d ", g_array_index(arr, int, i));
    }
    printf("\n");

    // Free the array
    g_array_free(arr, TRUE);
    return 0;
}
``` 

### Stack (Array-Based)

A stack is a Last-In-First-Out (LIFO) data structure. C doesn't have a built-in stack type, but you can simulate one very easily with an array:

```
#include <stdio.h>

int main() {
    // Allocate a large enough array based on the problem's data range
    int stk[10001];
    int top = -1;

    // Push elements onto the stack
    stk[++top] = 10;
    stk[++top] = 20;
    stk[++top] = 30;

    // Check if the stack is empty, Output: 0 (false)
    printf("%d\n", top == -1);

    // Get the stack size, Output: 3
    printf("%d\n", top + 1);

    // Get the top element, Output: 30
    printf("%d\n", stk[top]);

    // Pop the top element
    top--;

    // Print the new top element: 20
    printf("%d\n", stk[top]);

    return 0;
}
``` 

### Queue (Array-Based)

A queue is a First-In-First-Out (FIFO) data structure. It can also be simulated with an array:

```
#include <stdio.h>

int main() {
    // Allocate a large enough array based on the problem's data range
    int q[10001];
    int front = 0, rear = 0;

    // Enqueue elements at the back
    q[rear++] = 10;
    q[rear++] = 20;
    q[rear++] = 30;

    // Check if the queue is empty, Output: 0 (false)
    printf("%d\n", front == rear);

    // Get the queue size, Output: 3
    printf("%d\n", rear - front);

    // Get the front element, Output: 10
    printf("%d\n", q[front]);

    // Dequeue the front element
    front++;

    // Print the new front element: 20
    printf("%d\n", q[front]);

    return 0;
}
``` 

Typical Usage in Problem Solving

With this array-based queue approach, `front` only moves forward and never goes back—space from dequeued elements is never reused. So the array size should be based on the total number of enqueue operations throughout the entire process, not the maximum number of elements in the queue at any given time.

For example, when running BFS on a binary tree with `n` nodes, each node is enqueued at most once, so an array of size `n + 1` is enough. If the problem says `n <= 10^5`, just declare `int q[100001]` and you're good—no need for a circular queue.

If you're curious about how circular queues work, check out [Circular Array Techniques](</en/algo/data-structure-basic/cycle-array/>) and [Array-Based Queue/Stack Implementation](</en/algo/data-structure-basic/array-queue-stack/>).

### Priority Queue (Hand-Written Binary Heap)

Neither C nor GLib provides a built-in priority queue, so you'll need to implement a binary heap yourself. It's a bit more work than in other languages, but you can just copy the template code below and use it directly.

For the theory behind binary heaps, see [Binary Heap Core Concepts with Visualization](</en/algo/data-structure-basic/binary-heap-basic/>). Here we'll just provide the practical template code.

Priority queues are used extensively in algorithm problems—classic examples include Dijkstra's shortest path algorithm and merging K sorted linked lists.

```
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

// Min-heap: insert an element
void heapPush(int* heap, int* size, int val) {
    heap[(*size)++] = val;
    int i = *size - 1;
    while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
        swap(&heap[i], &heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

// Min-heap: pop the top element
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

// Peek at the top element
int heapPeek(int* heap) {
    return heap[0];
}

int main() {
    int heap[10001];
    int size = 0;

    // Insert elements
    heapPush(heap, &size, 30);
    heapPush(heap, &size, 10);
    heapPush(heap, &size, 20);

    // Get the top element (minimum), Output: 10
    printf("%d\n", heapPeek(heap));

    // Pop the top element
    heapPop(heap, &size);

    // New top element, Output: 20
    printf("%d\n", heapPeek(heap));

    // Get the heap size, Output: 2
    printf("%d\n", size);

    // Check if the heap is empty, Output: 0 (false)
    printf("%d\n", size == 0);

    return 0;
}
``` 

Max-Heap

To convert this to a max-heap, just reverse the comparison directions: change `<` to `>` in `heapPush`, and change `<` to `>` and `<=` to `>=` in `heapPop`.

### Hash Map (GLib `GHashTable`)

C's standard library doesn't include a hash map, but LeetCode's platform has the GLib library built in, so you can just `#include <glib.h>` and use `GHashTable` directly.

Here are the common `GHashTable` methods:

```
#include <stdio.h>
#include <glib.h>

int main() {
    // Initialize a hash map (int → int)
    GHashTable* hashmap = g_hash_table_new(g_direct_hash, g_direct_equal);
    g_hash_table_insert(hashmap, GINT_TO_POINTER(1), GINT_TO_POINTER(100));
    g_hash_table_insert(hashmap, GINT_TO_POINTER(2), GINT_TO_POINTER(200));
    g_hash_table_insert(hashmap, GINT_TO_POINTER(3), GINT_TO_POINTER(300));

    // Get the size of the hash map, Output: 3
    printf("%d\n", g_hash_table_size(hashmap));

    // Check if a key exists
    // Output: Key 2 -> 200
    if (g_hash_table_contains(hashmap, GINT_TO_POINTER(2))) {
        int val = GPOINTER_TO_INT(
            g_hash_table_lookup(hashmap, GINT_TO_POINTER(2)));
        printf("Key 2 -> %d\n", val);
    } else {
        printf("Key 2 not found.\n");
    }

    // Insert a new key-value pair
    g_hash_table_insert(hashmap, GINT_TO_POINTER(4), GINT_TO_POINTER(400));

    // Get the newly inserted value, Output: 400
    int val = GPOINTER_TO_INT(
        g_hash_table_lookup(hashmap, GINT_TO_POINTER(4)));
    printf("%d\n", val);

    // Remove a key-value pair
    g_hash_table_remove(hashmap, GINT_TO_POINTER(3));

    // Check if key 3 still exists after removal
    // Output: Key 3 not found.
    if (g_hash_table_contains(hashmap, GINT_TO_POINTER(3))) {
        printf("Key 3 found.\n");
    } else {
        printf("Key 3 not found.\n");
    }

    // Free the hash map
    g_hash_table_destroy(hashmap);
    return 0;
}
``` 

Important Note

When storing and retrieving int values with `GHashTable`, you need to use the `GINT_TO_POINTER` and `GPOINTER_TO_INT` macros for conversion. This is a fixed pattern you'll always follow.

`g_hash_table_lookup` returns `NULL` when the key doesn't exist (meaning `GPOINTER_TO_INT(NULL) == 0`). If 0 is a valid value, you should first check whether the key exists using `g_hash_table_contains`, or use `g_hash_table_lookup_extended` to distinguish between "key not found" and "value is 0".

Prefer Arrays for Small Key Ranges

When the key range is known and small (e.g., ASCII characters, integers from 0 to 10^5), using `int arr[N]` is faster and simpler than a hash map. Only reach for a hash map when the key range is large or unknown.

### Hash Set (GLib `GHashTable`)

C doesn't have a built-in hash set, but you can simulate one with `GHashTable` by using a fixed non-NULL value for all entries.

```
#include <stdio.h>
#include <glib.h>

int main() {
    // Initialize a hash set
    GHashTable* hashset = g_hash_table_new(g_direct_hash, g_direct_equal);
    g_hash_table_insert(hashset, GINT_TO_POINTER(1), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(2), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(3), GINT_TO_POINTER(1));
    g_hash_table_insert(hashset, GINT_TO_POINTER(4), GINT_TO_POINTER(1));

    // Get the size of the hash set, Output: 4
    printf("%d\n", g_hash_table_size(hashset));

    // Check if an element exists
    // Output: Element 3 found.
    if (g_hash_table_contains(hashset, GINT_TO_POINTER(3))) {
        printf("Element 3 found.\n");
    } else {
        printf("Element 3 not found.\n");
    }

    // Insert a new element
    g_hash_table_insert(hashset, GINT_TO_POINTER(5), GINT_TO_POINTER(1));

    // Remove an element
    g_hash_table_remove(hashset, GINT_TO_POINTER(2));

    // Output: Element 2 not found.
    if (g_hash_table_contains(hashset, GINT_TO_POINTER(2))) {
        printf("Element 2 found.\n");
    } else {
        printf("Element 2 not found.\n");
    }

    // Free the hash set
    g_hash_table_destroy(hashset);
    return 0;
}
``` 

## Summary

The basics covered above are enough to get you started with solving problems.

The core philosophy for algorithm problems in C is: **use arrays whenever you can**. Stacks and queues can both be simulated with arrays. Hash maps can be replaced with arrays when the key range is small—only use GLib's `GHashTable` when the key range is large or unknown.

Of course, C has more advanced topics like pointers and memory management, and GLib offers additional data structures like `GQueue` (double-ended queue) and `GTree` (balanced binary search tree) that we haven't covered here. These will come up gradually in later data structure chapters—no need to memorize everything upfront.

Next, I'll walk you through some LeetCode algorithm problems so you can put these data structures into practice and get familiar with the problem-solving platform.

Last updated: 03/14/2026, 12:17 AM
