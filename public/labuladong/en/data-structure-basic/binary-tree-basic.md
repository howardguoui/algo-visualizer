# Binary Tree Basic and Common Types

> Source: https://labuladong.online/algo/en/data-structure-basic/binary-tree-basic/
> Archived: labuladong.online

---

# Binary Tree Basic and Common Types

Prerequisites

Before reading this article, you need to learn:

  * [Linked List Basics (Linked Storage)](</en/algo/data-structure-basic/linkedlist-basic/>)

**I think the binary tree is the most important basic data structure. Nothing else comes close.**

If you are a beginner, it is hard for me to fully explain why right now. You need to study the later content on this site to slowly understand it. For now, I will sum it up in two points:

  1. A binary tree itself is a simple basic data structure. But many complex data structures are built on it, such as [Red-Black Tree](</en/algo/data-structure-basic/rbtree-basic/>) (a binary search tree), [Multiway Tree](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>), [Binary Heap](</en/algo/data-structure-basic/binary-heap-basic/>), [Graph](</en/algo/data-structure-basic/graph-basic/>), [Trie](</en/algo/data-structure-basic/trie-map-basic/>), [Union-Find](</en/algo/data-structure-basic/union-find-basic/>), [Segment Tree](</en/algo/data-structure-basic/segment-tree-basic/>), and so on. If you truly understand binary trees, these data structures will not be a problem. If you don’t, these advanced structures will be hard to handle.

  2. A binary tree is not only a data structure. It is also a common way of thinking for algorithms. All brute-force algorithms, like [Backtracking](</en/algo/essential-technique/backtrack-framework/>), [BFS](</en/algo/essential-technique/bfs-framework/>), and [Dynamic Programming](</en/algo/essential-technique/dynamic-programming-framework/>), are basically turning a problem into a tree. Once you can model it as a tree, it becomes a binary tree problem again. Also, when you read code, other people may only see plain text. They know each word, but they don’t understand it as a whole. If you see the code as a tree, you can change it any way you want, and still change it correctly. It becomes much easier.

The later data structure chapters have many explanations and exercises about binary trees. If you learn in the order of this site’s table of contents, I will help you fully understand binary trees. Then you will know why I care so much about them.

## Common Types of Binary Trees

The main difficulty of binary trees is in solving algorithm problems. The tree itself is not hard. It is just a tree structure like this:

12435768

This is a normal binary tree. You should know a few terms:

  1. The nodes directly connected below a node are its **children**. The node directly connected above is its **parent**. For example, node `3` has parent `1`, left child `5`, and right child `6`. Node `5` has parent `3`, left child `7`, and no right child.

  2. A tree rooted at a child node is called a **subtree**. For example, the left subtree of node `3` is the tree made of nodes `5` and `7`. The right subtree is the tree made of nodes `6` and `8`.

  3. The top node with no parent, node `1`, is the **root**. The bottom nodes with no children, `4`, `7`, and `8`, are **leaf nodes**.

  4. The number of nodes on the path from the root to the lowest leaf is the max depth / height of the tree. For this tree, the max depth is `4`, because the path from root `1` to leaf `7` (or `8`) has 4 nodes.

That’s it. It’s that simple.

Some binary trees are a bit special and have their own names. You should know them. Later, when you see these terms in problems, you will understand what they mean.

### Perfect Binary Tree

A perfect binary tree means every level is full. The whole tree looks like a triangle:

124895101136121371415

**A nice thing about a perfect binary tree is that its node count is easy to compute.**  
If the depth is `h`, then the total number of nodes is `2^h - 1`. This is just a geometric series sum.

### Complete Binary Tree

A complete binary tree means: on every level, nodes are packed to the left. And except for the last level, every level must be full:

124895101136127

It’s easy to see that a perfect binary tree is a special kind of complete binary tree.

**A key feature of a complete binary tree: because nodes are packed, if you number nodes from left to right and top to bottom, the parent/child indexes follow clear rules.**

This will be used in [Binary Heap Core Ideas](</en/algo/data-structure-basic/binary-heap-basic/>) and [Segment Tree Core Ideas](</en/algo/data-structure-basic/segment-tree-basic/>): a complete binary tree can be stored in an array, without building real linked nodes.

A complete binary tree also has a property that is harder to notice: **its left and right subtrees are also complete binary trees**.

More accurately: **in the left and right subtrees of a complete binary tree, at least one of them is a perfect binary tree**.

![diagram](https://labuladong.online/images/algo/complete_tree/1-en.jpg)

This property is useful in algorithm problems, for example [Counting Nodes in a Complete Binary Tree (Smart Way)](</en/algo/data-structure/count-complete-tree-nodes/>). I just mention it here for now.

### Binary Search Tree

A Binary Search Tree (BST) is a very common binary tree. It is defined like this:

For every node in the tree, the value of **every node in its left subtree** is smaller than the node’s value, and the value of **every node in its right subtree** is larger than the node’s value. You can remember it as “left smaller, right larger”.

I made “every node in the subtree” bold because beginners often make this mistake. Do not only check the direct child nodes. You must check all nodes in the whole subtree.

For example, the tree below is a BST:

7415910

All nodes in the left subtree of node `7` are smaller than `7`, and all nodes in the right subtree are larger than `7`. For node `4`, it is the same, and so on.

In contrast, the tree below is NOT a BST:

7418910

If you only look at the left and right child of each node, it may look fine. But you should look at the whole subtree. In the left subtree of node `7`, there is a node `8`, which is larger than `7`. This breaks the BST rule.

**BST is a very useful data structure. Because of “left smaller, right larger”, we can quickly find a node, or find all nodes in a value range. This is the main advantage of BST.**

For a normal binary tree, node values have no order. If you want to find a node with value `x`, you have to traverse the whole tree from the root.

But for a BST, you can compare `x` with the root. If `x` is larger than the root, you can directly ignore the whole left subtree, and search in the right subtree. This helps you find the node with value `x` much faster.

There will be a full chapter about BST later, with many exercises. Here, these basic ideas are enough.

### Height-Balanced Binary Tree

A Height-Balanced Binary Tree is a special binary tree. **For every node, the height difference between its left subtree and right subtree is not more than 1.**

Note: it is for every node, not only for the root.

For example, in the tree below: for root `1`, left height is 2 and right height is 3. For node `2`, left height is 1 and right height is 0. For node `3`, left height is 2 and right height is 1, and so on. Every node satisfies the rule, so this is a height-balanced binary tree:

1243576

The tree below is NOT height-balanced. For node `2`, the left height is 2 and the right height is 0. The difference is larger than 1:

12483576

**If a height-balanced binary tree has NNN nodes, then its height is O(log⁡N)O(\log N)O(logN).** This is very important. Later chapters will introduce several tree-based data structures. If we can keep the tree height at O(log⁡N)O(\log N)O(logN), then insert, delete, search, and update will all be fast.

On the other hand, if the tree is very unbalanced, like this extreme case:

12345

Then this tree is basically the same as a singly linked list, and operations become much slower.

### Self-Balanced Binary Tree

Above we talked about height-balanced binary trees. Their height is O(log⁡N)O(\log N)O(logN), so insert, delete, search, and update are efficient.

If we can adjust the tree structure when we insert or delete nodes, we can keep the tree balanced all the time. This is a Self-Balanced Binary Tree.

There are many ways to build a self-balanced tree. The most classic one is the [Red-Black Tree](</en/algo/data-structure-basic/rbtree-basic/>), which is a self-balanced BST.

To keep a tree balanced, the most important operation is “rotation”. The visual panel below shows rotations in a red-black tree. You can click the left rotation and right rotation code to see the effect:

Algorithm Visualization

## How to Implement a Binary Tree

The most common way is like a linked structure. Each node has pointers to its left and right child. This is simple and clear.

On LeetCode, input binary trees are usually built in this way. The binary tree node class `TreeNode` often looks like this:

```python
class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

# You can build a binary tree like this:
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.right.left = TreeNode(5)
root.right.right = TreeNode(6)

# The constructed binary tree looks like this:
#     1
#    / \
#   2   3
#  /   / \
# 4   5   6
``` 

Since this is “common”, it means there are other ways too.

Yes. In [Binary Heap: Theory and Implementation](</en/algo/data-structure-basic/binary-heap-basic/>) and [Union-Find Algorithm Explained](</en/algo/data-structure/union-find/>), we will choose to store a binary tree in an array, based on the real needs.

When the [visual panel](</en/algo/intro/visualize/>) shows a recursive function, it builds a recursion tree from the call stack. This can also be seen as a way to “implement” a binary tree.

Also, in many algorithm problems, we may **abstract** a real problem into a binary tree, but we do not need to really create a tree with `TreeNode`. We can use a structure like a [hash table](</en/algo/data-structure-basic/hashmap-basic/>) to represent a binary tree / multi-way tree.

For example, this binary tree:

124356

We can use a hash table: the key is the parent node id, and the value is a list of child node ids (each node id is unique). Then each key-value pair is one node in a multi-way tree. This multi-way tree can be written like this:

```python
# 1 -> [2, 3]
# 2 -> [4]
# 3 -> [5, 6]

tree = {
    1: [2, 3],
    2: [4],
    3: [5, 6]
}
``` 

This lets us simulate and operate on a binary tree / multi-way tree. Later, when we talk about graph theory, you will learn it has a new name: the [Adjacency List](</en/algo/data-structure-basic/graph-basic/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
