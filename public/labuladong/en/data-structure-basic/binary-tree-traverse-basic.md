# Binary Tree Recursive/Level Traversal

> Source: https://labuladong.online/algo/en/data-structure-basic/binary-tree-traverse-basic/
> Archived: labuladong.online

---

# Binary Tree Recursive/Level Traversal

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[144\. Binary Tree Preorder Traversal](<https://leetcode.com/problems/binary-tree-preorder-traversal/>)|   
[94\. Binary Tree Inorder Traversal](<https://leetcode.com/problems/binary-tree-inorder-traversal/>)|   
[145\. Binary Tree Postorder Traversal](<https://leetcode.com/problems/binary-tree-postorder-traversal/>)|   
[102\. Binary Tree Level Order Traversal](<https://leetcode.com/problems/binary-tree-level-order-traversal/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Basic concepts of binary trees and some special types of binary trees](</en/algo/data-structure-basic/binary-tree-basic/>)

One Sentence Summary

There are only two ways to traverse a binary tree: **recursive traversal** and **level-order traversal**. Recursive traversal leads to DFS algorithms, and level-order traversal leads to BFS algorithms.

The order of recursive traversal in a binary tree is fixed, but there are three key places to insert code. Placing code in different positions will produce different effects.

The order of level-order traversal is also fixed, but there are three different ways to write it, suitable for different situations.

Preorder position

Inorder position

Postorder position

Recursive Traversal (DFS)  
Three special positions, code runs at different times

First way is the simplest  
Cannot record depth

Second way is most common  
Can record depth

Third way is the most flexible  
Good for complex problems

Level-order Traversal (BFS)  
Three different ways, for different scenarios

Binary Tree Traversal

After learning [basic concepts of binary trees and special types of binary trees](</en/algo/data-structure-basic/binary-tree-basic/>), this article will show you how to traverse and visit nodes in a binary tree.

There are two main traversal algorithms for binary trees: recursive traversal and level-order traversal. Each has a code template. The recursive template can be used for later DFS and backtracking algorithms. The level-order template can be used for BFS algorithms. That's why I often say binary tree structures are very important.

Preorder, inorder, and postorder traversals are all recursive traversals. The difference is just where you put your custom code in the template. I will explain this with a visual panel below.

## Recursive Traversal (DFS)

Here is the code template for recursive traversal of a binary tree:

```python
# basic binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# recursive traversal framework for binary tree
def traverse(root: TreeNode):
    if root is None:
        return
    traverse(root.left)
    traverse(root.right)
``` 

Why can this short and simple code traverse a binary tree? In what order does it visit the nodes?

You can think of the `traverse` recursive function as a pointer moving around the binary tree. The visualization panel below shows how this algorithm works step by step.

Open this panel. On the right, the `root` pointer shows the current node for the `traverse` function. You can click the line `console.log("enter"` several times to watch how the `root` pointer moves through the tree:

Recursive Traversal of a Binary Tree

Take your time. Watch the visualization as many times as you need until you fully understand the order in which the `traverse` function visits the nodes of the binary tree.

The order is: always go left first until you hit a null pointer and can't go further, then try to go right once; then keep going left again, and so on. If both left and right are done, return to the parent node.

From the code, you can see that `root.left` is called first, then `root.right`. Each time the `traverse` function is called, it goes to the left child first, until it cannot go further, then it tries the right child.

Now, let's try a small change. If we modify the `traverse` function to call `root.right` first, then `root.left`, what will happen?

```python
# modify the standard binary tree traversal framework
def traverseFlip(root: TreeNode) -> None:
    if root is None:
        return
    # traverse the right subtree first, then traverse the left subtree
    traverseFlip(root.right)
    traverseFlip(root.left)
``` 

Think about the order in which this function visits the tree nodes. Then, open the visualization below and click the line `if (root === null)` several times. Watch how the `root` pointer moves. Is it what you expected?

Algorithm Visualization

You can see that the `traverseFlip` function also visits all nodes in the tree, but the order is the opposite of the standard `traverse` function.

This example shows:

**The order of recursive traversal (the way the`root` moves through the tree) only depends on the order of the left and right recursive calls, and nothing else.**

Normally, we don't traverse a binary tree like `traverseFlip`. By default, we use the left-first, right-second order. So when we talk about the code template for tree traversal, we mean left first, right second:

```python
# basic binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# recursive traversal framework for binary tree
def traverse(root: TreeNode):
    if root is None:
        return
    traverse(root.left)
    traverse(root.right)
``` 

As long as this left-first, right-second order doesn't change, the order in which `traverse` visits the nodes is fixed, no matter how many extra lines you add.

Some readers with data structure background may feel confused:

Wait, if you have taken a data structure course, you know binary trees have preorder, inorder, and postorder traversals, which give different orders. Why do you say the recursive traversal order is fixed?

That's a good question. Let's explain it next.

### Understanding Preorder, Inorder, and Postorder Traversal

The order of recursive traversal, that is, the order in which the `traverse` function visits nodes, is fixed. As shown in the visual panel, the `root` pointer moves around the tree in a fixed order:

Algorithm Visualization

**However, where you write your code inside the`traverse` function can make a difference. The results of preorder, inorder, and postorder traversals are different because you place the code at different positions in the function.**

For example, when you just enter a node, you do not know anything about its child nodes. But when you are about to leave a node, all its child nodes have been visited. So, code written in these two situations will behave differently.

Preorder, inorder, and postorder traversal are really about where you put your code in the binary tree traversal framework:

```python
# Binary tree traversal framework
def traverse(root):
    if root is None:
        return
    # Pre-order position
    traverse(root.left)
    # In-order position
    traverse(root.right)
    # Post-order position
``` 

**Code at the preorder position runs when you enter the node. Code at the inorder position runs after the left subtree is done but before the right subtree starts. Code at the postorder position runs after both left and right subtrees are done:**

![diagram](https://labuladong.online/images/algo/binary-tree-summary/2-en.jpeg)

With the visualization, you can easily understand this.

Open the visual panel below. Click the line `if (root == null)` several times. You will see the `root` pointer moving around the tree in a fixed order. The order in which nodes turn green is the result of preorder traversal, because the code runs as soon as you enter a node. So the preorder sequence matches the order in which the `root` moves through the tree.

Preorder Traversal of a Binary Tree

Code at the inorder position runs after the left subtree is done but before the right subtree. Open the visual panel below. Click `if (root == null)` several times. You will see the `root` pointer movement is the same as before, but the order in which nodes turn blue is the result of inorder traversal—nodes turn blue when their left subtree is fully visited.

Inorder Traversal of a Binary Tree

Code at the postorder position runs after both the left and right subtrees are finished, right before leaving the node. Open the visual panel below. Click `if (root == null)` several times. The order in which nodes turn red is the result of postorder traversal—nodes only turn red after both left and right subtrees are done.

Postorder Traversal of a Binary Tree

It is very important to understand preorder, inorder, and postorder positions. Please carefully study the visual panels above, so you can figure out the preorder, inorder, and postorder results in your head for any binary tree.

Key Points

The main difference between the three positions is when the code is run.

In real algorithm problems, you won't just be asked to calculate preorder, inorder, or postorder results. You need to put the correct code in the correct position to solve problems. So, you must fully understand what effect code in each position has to write accurate solutions.

I will discuss the framework of binary tree traversal and how to use preorder, inorder, and postorder positions for backtracking and dynamic programming in [Binary Tree Algorithm Ideas](</en/algo/essential-technique/binary-tree-summary/>) and the related exercises.

Now, you should be able to finish these LeetCode problems: [144\. Binary Tree Preorder Traversal](<https://leetcode.com/problems/binary-tree-preorder-traversal/>), [94\. Binary Tree Inorder Traversal](<https://leetcode.com/problems/binary-tree-inorder-traversal/>), [145\. Binary Tree Postorder Traversal](<https://leetcode.com/problems/binary-tree-postorder-traversal/>).

One more important point: for [Binary Search Trees (BST)](</en/algo/data-structure-basic/binary-tree-basic/>), the result of an inorder traversal is always sorted. This is a key property of BST.

Check out the visual panel below. Click the line `res.push(root.val);`. You will see the order in which nodes are visited during an inorder traversal.

Inorder Traversal of BST Is Sorted

Later, in the [BST Exercise Collection](</en/algo/problem-set/bst1/>), you will find problems that use this property.

## Level-Order Traversal (BFS)

The recursive traversal we talked about before uses the call stack to traverse the binary tree. The order is from the leftmost node to the right, column by column.

Level-order traversal means we visit the tree level by level:

![diagram](https://labuladong.online/images/algo/dijkstra/1.jpeg)

To do level-order traversal, we need a queue. Based on different needs, there are three common ways to write it. We will see them one by one.

### Version 1

This is the simplest version:

```python
from collections import deque

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    q.append(root)
    while q:
        cur = q.popleft()
        # visit cur node
        print(cur.val)

        # add cur's left and right children to the queue
        if cur.left is not None:
            q.append(cur.left)
        if cur.right is not None:
            q.append(cur.right)
``` 

Open this visual panel, click the line `while (q.length > 0)`, and watch how the variable `cur` moves on the tree. You will see that the traversal visits nodes level by level, from left to right:

Level-Order Traversal of a Binary Tree

Pros and Cons of This Version

The biggest advantage is its simplicity. Each time, you take the front node from the queue, then add its left and right children to the queue. That’s it.

But the drawback is: you cannot know which level the current node is on. Knowing the level is a common need, for example:

  * collect all nodes of each level
  * compute the minimum depth of a binary tree

So this version is simple but not used very often. The next version is more common.

### Version 2

If we slightly change the first version, we get this:

```python
from collections import deque

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    q.append(root)
    # record the current depth being traversed (root node is considered as level 1)
    depth = 1

    while q:
        sz = len(q)
        for i in range(sz):
            cur = q.popleft()
            # visit cur node and know its depth
            print(f"depth = {depth}, val = {cur.val}")

            # add cur's left and right children to the queue
            if cur.left is not None:
                q.append(cur.left)
            if cur.right is not None:
                q.append(cur.right)
        depth += 1
``` 

Notice the inner for loop:

```
int sz = q.size();
for (int i = 0; i < sz; i++) {
    ...
}
``` 

The variable `i` records the index of `cur` in the current level. In most problems, you do not need this index, so you can write it like this:

```
int sz = q.size();
while (sz-- > 0) {
    ...
}
``` 

This is just a style choice. Use whichever you like.

**But be careful: you must save the queue size`sz` before the loop starts**, because the size of the queue will change inside the loop. You cannot use `q.size()` directly as the loop condition.

Open this visual panel, click the line `console.log`, and watch how `cur` moves on the tree. You will still see a level-by-level, left-to-right traversal, but now it also prints the level of each node:

Level-Order Traversal of a Binary Tree 2

With this version, you can record the level of every node. This can solve problems like the minimum depth of a binary tree. This is our most common level-order template.

### Version 3

If version 2 is the most common, why do we still need version 3? Because we want to prepare for advanced topics.

Now we only talk about binary tree level-order traversal. But based on this, we can extend to:

  * [Level-order traversal of N-ary trees](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [BFS traversal of graphs](</en/algo/data-structure-basic/graph-traverse-basic/>)
  * The classic [BFS brute-force algorithm template](</en/algo/essential-technique/bfs-framework/>)

So we need to generalize a bit here.

**In version 2, every time we go down one level, we add 1 to`depth`. You can think of each edge having weight 1. The depth of a node is the sum of edge weights from the root to that node. All nodes on the same level have the same path sum.**

Now assume each edge can have any weight. You need to do level-order traversal of the whole tree and print the path sum for each node. How would you do this?

In this case, nodes on the same level may have different path sums. Keeping only one global `depth` variable (like version 2) is not enough.

Version 3 solves this. Based on version 1, we add a `State` class so each node keeps its own path sum:

```python
class State:
    def __init__(self, node, depth):
        self.node = node
        self.depth = depth

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    # the path weight sum of the root node is 1
    q.append(State(root, 1))

    while q:
        cur = q.popleft()
        # visit the cur node, and know its path weight sum
        print(f"depth = {cur.depth}, val = {cur.node.val}")

        # add the left and right child nodes of cur to the queue
        if cur.node.left is not None:
            q.append(State(cur.node.left, cur.depth + 1))
        if cur.node.right is not None:
            q.append(State(cur.node.right, cur.depth + 1))
``` 

Open this visual panel, click the line `console.log`, and you will see the traversal is still level by level, from left to right, and it also prints the level of each node:

Level-Order Traversal of a Binary Tree 3

**With this design, each node has its own`depth` (or distance). This is the most flexible form and can handle all BFS needs.** But since defining a `State` class is a bit more work, we usually still use version 2 if we do not need this flexibility.

Soon you will learn that this “edge with weight” setting is a typical graph problem. In the later chapters [BFS Exercise Set](</en/algo/problem-set/bfs/>) and [Dijkstra Algorithm](</en/algo/data-structure/dijkstra/>), we will use this style.

## Other Traversals?

There are only two essential traversal methods for binary trees: the recursive (DFS) kind and the level-order (BFS) kind. There may be many code styles, but they all fall into these two categories.

For example, you may see code that uses an explicit stack to iterate over a tree. In essence, this is still recursive traversal, just with a manually maintained stack instead of the call stack.

Another example: you may see recursive code that visits the tree level by level. This is still level-order traversal; it just replaces the for loop of level-order traversal with recursion.

In short, do not be fooled by the surface form. Binary tree traversal is just these two types. Once you really understand them, with the help of later tutorials and exercises, all brute-force search algorithms will become easy for you.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
