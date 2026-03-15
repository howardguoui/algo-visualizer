# Tricks to Reverse a Linked List Recursively

> Source: https://labuladong.online/algo/en/data-structure/reverse-linked-list-recursion/
> Archived: labuladong.online

---

# Tricks to Reverse a Linked List Recursively

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[206\. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)|   
[92\. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)|   
[24\. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)|   
[25\. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)|   
  
Reversing a singly linked list with iteration is not hard, but the recursive solution is a bit tricky. If we add more difficulty and only reverse part of a linked list, can you solve it with both iteration and recursion? Going further, if you need to reverse the list in groups of k, how would you handle that?

This article will go from easy to hard and solve these linked list problems step by step. I will use both recursive and iterative methods, and use visual panels to help you understand. This will strengthen your recursive thinking and your skill in operating linked list pointers.

## ¶Reverse the entire singly linked list

On LeetCode, the common structure of a singly linked list is like this:

CC++GoJavaJavaScriptPython
    
    
    class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

Reversing a singly linked list is a basic algorithm problem. LeetCode 206 “[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)” is exactly this problem:

**206\. Reverse Linked List** |[LeetCode](https://leetcode.com/problems/reverse-linked-list/)

Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

**Example 1:**

![](/images/lc/uploads/2021/02/19/rev1ex1.jpg)
    
    
    **Input:** head = [1,2,3,4,5]
    **Output:** [5,4,3,2,1]
    

**Example 2:**

![](/images/lc/uploads/2021/02/19/rev1ex2.jpg)
    
    
    **Input:** head = [1,2]
    **Output:** [2,1]
    

**Example 3:**
    
    
    **Input:** head = []
    **Output:** []
    

**Constraints:**

  * The number of nodes in the list is the range `[0, 5000]`.
  * `-5000 <= Node.val <= 5000`


**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?

The problem is from [LeetCode 206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/).

Now let’s try several methods to solve this problem.

### ¶Iterative solution

The standard way to solve this problem is the iterative solution. We operate several pointers to reverse the direction of each node’s `next` pointer. There is no big difficulty, the key is to handle pointer details correctly.

Here is the code. With the comments and the visual panel, it should be easy to understand:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        // Reverse the linked list starting from head
        public ListNode reverseList(ListNode head) {
            if (head == null || head.next == null) {
                return head;
            }
            // Due to the structure of a singly linked list, at least three
            // pointers are needed to complete the iterative reversal
            // cur is the current node being traversed, pre is the
            // predecessor node of cur, nxt is the successor node of cur
            ListNode pre, cur, nxt;
            pre = null; cur = head; nxt = head.next;
            while (cur != null) {
                // Reverse each node
                cur.next = pre;
                // Update pointer positions
                pre = cur;
                cur = nxt;
                if (nxt != null) {
                    nxt = nxt.next;
                }
            }
            // Return the head node after reversal
            return pre;
        }
    }

You can open the visual panel below, and click the line `cur.next = pre` many times. Then you can clearly see the reversing process of the singly linked list:

Algorithm Visualization

Small tips for pointer operations

The logic of the code above is not complicated, and there is more than one correct way to write it. But when working with pointers, there are some very basic and simple tips that can make your thinking clearer:

  1. Once you see an operation like `nxt.next`, you should immediately think: first check whether `nxt` is null, otherwise you may get a null pointer exception.

  2. Pay attention to the loop end condition. You must know where each pointer is when the loop ends. Then you can return the correct answer. If you feel it is complicated, draw the simplest case and run the algorithm by hand. For example, in this problem you can draw a list with only two nodes `1->2`. Then you can figure out exactly where each pointer is when the loop finishes.


### ¶Recursive Solution

The iterative solution above is a bit tedious because of pointer operations, but the idea is still clear. Now, what if you are asked to reverse a singly linked list using recursion? Do you have any ideas?

For beginners, it might be hard to think of a recursive way. That is normal. If you learn the way of thinking in binary tree algorithms later, you may be able to come up with this algorithm yourself.

A binary tree is actually an extension of a singly linked list—it's like a "binary linked list". So the recursive thinking for binary trees also works for linked lists.

**The key to reversing a linked list recursively is that this problem has a subproblem structure.**

For example, suppose you have a singly linked list `1->2->3->4` with `1` as the head. If you ignore the head node `1` and just look at the sublist `2->3->4`, it is still a singly linked list, right?

So, your `reverseList` function should be able to reverse any linked list given as input. Can you use this function to reverse the sublist `2->3->4` first, and then think about how to attach `1` to the end of the reversed list `4->3->2`? This way, you will finish reversing the whole list.
    
    
    reverseList(1->2->3->4) = reverseList(2->3->4) -> 1

**This is the idea of "breaking down the problem". Using the definition of the recursive function, we break the original problem into smaller, similar subproblems, and then combine their results to solve the original problem.**

There will be special chapters and exercises about this idea later, so we won’t go into more detail here.

Let's look at the code for recursively reversing a singly linked list:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        // Definition: Input the head node of a singly linked
        // list, reverse the list, and return the new head node
        public ListNode reverseList(ListNode head) {
            if (head == null || head.next == null) {
                return head;
            }
            ListNode last = reverseList(head.next); ![](/images/algo/reverse-linked-list/3.jpg)
            head.next.next = head; ![](/images/algo/reverse-linked-list/4.jpg)
            head.next = null; ![](/images/algo/reverse-linked-list/5.jpg)
            return last;
        }
    }

This algorithm often shows the beauty and cleverness of recursion. Next, let's explain this code in detail. We will also provide a visual panel so you can explore the recursion yourself.

For recursive algorithms that "break down the problem", the most important thing is to be clear about the definition of the recursive function. Specifically, our `reverseList` function is defined as:

**Given a node`head`, reverse the list starting from `head` and return the new head of the reversed list.**

Once you understand the function definition, let's look at the problem. For example, we want to reverse this list:

![](/images/algo/reverse-linked-list/1.jpg)

When you call `reverseList(head)`, recursion happens here:
    
    
    ListNode last = reverseList(head.next);

Don’t get lost in recursion (your brain can only hold so many stacks!). Instead, use the function definition to understand what this code does:

![](/images/algo/reverse-linked-list/2.jpg)

After `reverseList(head.next)` finishes, the whole list becomes:

![](/images/algo/reverse-linked-list/3.jpg)

And according to the function definition, the `reverseList` function returns the new head of the reversed list, which we store in the variable `last`.

Now, look at the next line:
    
    
    head.next.next = head;

![](/images/algo/reverse-linked-list/4.jpg)

Next:
    
    
    head.next = null;
    return last;

![](/images/algo/reverse-linked-list/5.jpg)

Amazing! Now the whole linked list is reversed. Recursive code is simple and elegant, but there are two things to pay attention to:

  1. The recursive function needs a base case, which is this line:


    
    
    if (head == null || head.next == null) {
        return head;
    }

This means if the list is empty or only has one node, the reversed result is itself, so just return it.

  2. After the list is reversed recursively, the new head is `last`, and the old `head` becomes the last node. Don't forget to set its `next` to null:


    
    
    head.next = null;

This way, the whole linked list is reversed. Isn’t it amazing? Here is a visual process of recursive reversal:

Algorithm Visualization

Do not get lost in recursion details

The visual panel can show all the steps of the recursion, but I do not suggest beginners focus too much on the details. First, use the way of thinking explained above to understand recursion, then use the visual panel to deepen your understanding.

Recursion is less efficient than iteration for linked lists

It is worth mentioning that recursion is not very efficient for linked lists.

The recursive and iterative solutions both have time complexity O(N), but the iterative one uses O(1) space, while the recursive one needs stack space, so its space complexity is O(N).

So, recursion is good for practicing thinking, but for efficiency, iteration is better.

## ¶Reverse the First N Nodes of a Linked List

Now let’s implement a function like this:

CC++GoJavaJavaScriptPython
    
    
    // Reverse the first n nodes of the linked list (n <= length of the list)
    ListNode reverseN(ListNode head, int n)

For example, for the linked list below, if you run `reverseN(head, 3)`:

![](/images/algo/reverse-linked-list/6-en.jpg)

Last updated: 03/14/2026, 12:17 AM

Loading comments...
