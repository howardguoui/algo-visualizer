# 单链表的花式反转方法汇总

> Source: https://labuladong.online/zh/algo/data-structure/reverse-linked-list-recursion/
> Archived: labuladong.online — 算法笔记

---

# 单链表的花式反转方法汇总

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[206\. Reverse Linked List](<https://leetcode.com/problems/reverse-linked-list/>)| [206\. 反转链表](<https://leetcode.cn/problems/reverse-linked-list/>)|   
[92\. Reverse Linked List II](<https://leetcode.com/problems/reverse-linked-list-ii/>)| [92\. 反转链表 II](<https://leetcode.cn/problems/reverse-linked-list-ii/>)|   
[24\. Swap Nodes in Pairs](<https://leetcode.com/problems/swap-nodes-in-pairs/>)| [24\. 两两交换链表中的节点](<https://leetcode.cn/problems/swap-nodes-in-pairs/>)|   
[25\. Reverse Nodes in k-Group](<https://leetcode.com/problems/reverse-nodes-in-k-group/>)| [25\. K 个一组翻转链表](<https://leetcode.cn/problems/reverse-nodes-in-k-group/>)|   
  
反转单链表的迭代解法不是一个困难的事情，但是递归实现就有点难度了。如果再加一点难度，让你仅仅反转单链表中的一部分，你是否能够同时用迭代和递归实现呢？再进一步，如果让你 k 个一组反转链表，阁下又应如何应对？

本文就来由浅入深，一次性解决这些链表操作的问题。我会同时使用递归和迭代的方式，并结合可视化面板帮助你理解，以此强化你的递归思维以及操作链表指针的能力。

## 反转整个单链表

在 力扣/LeetCode 中，单链表的通用结构是这样的：

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}
``` 

单链表反转是一个比较基础的算法题，力扣第 206 题「[反转链表](<https://leetcode.cn/problems/reverse-linked-list/>)」就是这个问题：

**206\. 反转链表** |[力扣](<https://leetcode.cn/problems/reverse-linked-list/>)|[LeetCode](<https://leetcode.com/problems/reverse-linked-list/>)

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。 

**示例 1：**

![diagram](https://labuladong.online/images/lc/uploads/2021/02/19/rev1ex1.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
``` 

**示例 2：**

![diagram](https://labuladong.online/images/lc/uploads/2021/02/19/rev1ex2.jpg)

```
输入：head = [1,2]
输出：[2,1]
``` 

**示例 3：**

```
输入：head = []
输出：[]
``` 

**提示：**

  * 链表中节点的数目范围是 `[0, 5000]`
  * `-5000 <= Node.val <= 5000`

**进阶：** 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

题目来源：[力扣 206. 反转链表](<https://leetcode.cn/problems/reverse-linked-list/>)。

下面我们来尝试用多种方法解决这个问题。

### 迭代解法

这道题的常规做法就是迭代解法，通过操作几个指针，将链表中的每个节点的指针方向反转，没什么难点，主要是指针操作的细节问题。

这里直接给出代码，结合注释和可视化面板应该不难理解：

```java
class Solution {
    // 反转以 head 为起点的单链表
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        // 由于单链表的结构，至少要用三个指针才能完成迭代反转
        // cur 是当前遍历的节点，pre 是 cur 的前驱结点，nxt 是 cur 的后继结点
        ListNode pre, cur, nxt;
        pre = null; cur = head; nxt = head.next;
        while (cur != null) {
            // 逐个结点反转
            cur.next = pre;
            // 更新指针位置
            pre = cur;
            cur = nxt;
            if (nxt != null) {
                nxt = nxt.next;
            }
        }
        // 返回反转后的头结点
        return pre;
    }
}
``` 

你可以点开下面的可视化面板，多次点击 `cur.next = pre` 这一行代码，即可直观地看到单链表的反转过程：

算法可视化

操作指针的小技巧

上面操作单链表的代码逻辑不复杂，而且也不止我这一种正确的写法。但是操作指针的时候，有一些很基本、很简单的小技巧，可以让你写代码的思路更清晰：

1、一旦出现类似 `nxt.next` 这种操作，就要条件反射地想到，先判断 `nxt` 是否为 null，否则容易出现空指针异常。

2、注意循环的终止条件。你要知道循环终止时，各个指针的位置，这样才能保返回正确的答案。如果你觉得有点复杂想不清楚，那就动手画一个最简单的场景跑一下算法，比如这道题就可以画一个只有两个节点的单链表 `1->2`，然后就能确定循环终止后各个指针的位置了。

### 递归解法

上面的迭代解法操作指针虽然有些繁琐，但是思路还是比较清晰的。如果现在让你用递归来反转单链表，你有啥想法没？

对于初学者来说可能很难想到，这很正常。如果你学习了后文的二叉树系列算法思维，回头再来看这道题，才有可能自己想出这个算法。

因为二叉树结构本身就是单链表的延伸，相当于是二叉链表嘛，所以二叉树上的递归思维，套用到单链表上是一样的。

**递归反转单链表的关键在于，这个问题本身是存在子问题结构的** 。

比方说，现在给你输入一个以 `1` 为头结点单链表 `1->2->3->4`，那么如果我忽略这个头结点 `1`，只拿出 `2->3->4` 这个子链表，它也是个单链表对吧？

那么你这个 `reverseList` 函数，只要输入一个单链表，就能给我反转对吧？那么你能不能用这个函数先来反转 `2->3->4` 这个子链表呢，然后再想办法把 `1` 接到反转后的 `4->3->2` 的最后面，是不是就完成了整个链表的反转？

```
reverseList(1->2->3->4) = reverseList(2->3->4) -> 1
``` 

**这就是「分解问题」的思路，通过递归函数的定义，把原问题分解成若干规模更小、结构相同的子问题，最后通过子问题的答案组装原问题的解** 。

在后面的教程中会有专门的章节讲解和练习这种思维，这里不展开。

先来看看递归反转单链表的代码实现：

```java
class Solution {
    // 定义：输入一个单链表头结点，将该链表反转，返回新的头结点
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode last = reverseList(head.next); 
        head.next.next = head; 
        head.next = null; 
        return last;
    }
}
``` 

这个算法常常拿来显示递归的巧妙和优美，我们下面来详细解释一下这段代码，最后在给出可视化面板，你可以自己动手探究一下递归过程。

对于「分解问题」思路的递归算法，最重要的就是明确递归函数的定义。具体来说，我们的 `reverseList` 函数定义是这样的：

**输入一个节点`head`，将「以 `head` 为起点」的链表反转，并返回反转之后的头结点**。

明白了函数的定义，再来看这个问题。比如说我们想反转这个链表：

![diagram](https://labuladong.online/images/algo/reverse-linked-list/1.jpg)

那么输入 `reverseList(head)` 后，会在这里进行递归：

```
ListNode last = reverseList(head.next);
``` 

不要跳进递归（你的脑袋能压几个栈呀？），而是要根据刚才的函数定义，来弄清楚这段代码会产生什么结果：

![diagram](https://labuladong.online/images/algo/reverse-linked-list/2.jpg)

这个 `reverseList(head.next)` 执行完成后，整个链表就成了这样：

![diagram](https://labuladong.online/images/algo/reverse-linked-list/3.jpg)

并且根据函数定义，`reverseList` 函数会返回反转之后的头结点，我们用变量 `last` 接收了。

现在再来看下面的代码：

```
head.next.next = head;
``` 

![diagram](https://labuladong.online/images/algo/reverse-linked-list/4.jpg)

接下来：

```
head.next = null;
return last;
``` 

![diagram](https://labuladong.online/images/algo/reverse-linked-list/5.jpg)

神不神奇，这样整个链表就反转过来了！递归代码就是这么简洁优雅，不过其中有两个地方需要注意：

1、递归函数要有 base case，也就是这句：

```
if (head == null || head.next == null) {
    return head;
}
``` 

意思是如果链表为空或者只有一个节点的时候，反转结果就是它自己，直接返回即可。

2、当链表递归反转之后，新的头结点是 `last`，而之前的 `head` 变成了最后一个节点，别忘了链表的末尾要指向 null：

```
head.next = null;
``` 

这样，整个单链表就完成反转了，神不神奇？下面是递归反转链表的可视化过程：

算法可视化

不建议陷入递归细节

虽然可视化面板可以展示整个递归过程的所有细节，但我不建议初学者过于执着于细节。建议先依照上面图示讲解的思维方式理解递归，然后再通过可视化面板加深理解。

递归操作链表的效率不如迭代

值得一提的是，递归操作链表并不高效。

递归解法和迭代解法相比，时间复杂度都是 O(N)，但是迭代解法的空间复杂度是 O(1)，而递归解法需要堆栈，空间复杂度是 O(N)。

所以递归操作链表可以用来练习递归思维，但是考虑效率的话还是使用迭代算法更好。

## 反转链表前 N 个节点

这次我们实现一个这样的函数：

```java
// 将链表的前 n 个节点反转（n <= 链表长度）
ListNode reverseN(ListNode head, int n)
``` 

比如说对于下图链表，执行 `reverseN(head, 3)`：

![diagram](https://labuladong.online/images/algo/reverse-linked-list/6.jpg)
