# How to Think About Data Structure and Algorithm

> Source: https://labuladong.online/algo/en/essential-technique/algorithm-summary/
> Archived: labuladong.online

---

# How to Think About Data Structure and Algorithm

How to read this article

This article will abstract and sum up many algorithms, so it includes many links to other articles.

**If this is your first time reading and you see an algorithm you have not learned, or you don’t understand something, skip it. Just remember the main ideas.** When you learn more skills later on this site, you will slowly understand the key points. If you come back and read again, you will understand more.

The summary in this article is the core outline of all content on this site. It has two parts:

  1. my understanding of the nature of data structures and algorithms
  2. a summary of common algorithms

There is no heavy code in this article. It is mostly my experience. It will help you avoid wrong paths and understand algorithms better.

dynamic array

string

hash table

...

Array  
(stored in order)

singly / doubly linked list

many kinds of trees

...

Linked list  
(stored by links)

Data structures  
(the core is insert / delete / search / update)

backtracking

dynamic programming

DFS/BFS

...

How to brute-force  
(no missing cases)

binary search

sliding window

greedy

...

How to brute-force smartly  
(no repeated work)

Algorithm problems  
(the core is brute-force)

Learning mindset

## One summary for all data structures and algorithms

All data structures are transformations of **arrays** (stored in order) and **linked lists** (stored by links).

The key of data structures is **traversal and access** , which means basic actions like insert, delete, search, and update.

All algorithms are **brute-force**.

The key of brute-force is **no missing cases and no repeated work**. If you master the algorithm frameworks, you can avoid missing cases. If you use extra information well, you can avoid repeated work.

If you truly understand these lines, you don’t need to read the 7000 words of this article. You don’t even need to read the many tutorials and do the exercises on this site.

If you don’t understand, then I will use the following thousands of words, plus the many later articles and exercises, to explain these two summaries. When you study, keep thinking about these two lines. It will greatly improve your learning speed.

## How data structures are stored

**There are only two ways to store data structures:[arrays (stored in order)](</en/algo/data-structure-basic/array-basic/>) and [linked lists (stored by links)](</en/algo/data-structure-basic/linkedlist-basic/>).**

How to understand this? Aren’t there hash tables, stacks, queues, heaps, trees, graphs, and many other data structures?

When we analyze a problem, we should think in a recursive way: top-down, from abstract to concrete. If you list all those structures first, they are higher-level designs. Arrays and linked lists are the base. All those different structures are special operations on arrays or linked lists. They just have different APIs.

For example, [queues and stacks](</en/algo/data-structure-basic/queue-stack-basic/>) can be implemented with either a linked list or an array. With an array, you need to handle growing and shrinking. With a linked list, you don’t have this problem, but you need more memory for node pointers.

A [graph](</en/algo/data-structure-basic/graph-basic/>) has two common storage ways. An adjacency list is a linked list. An adjacency matrix is a 2D array. An adjacency matrix is fast for checking connections, and you can use matrix operations to solve some problems. But if the graph is sparse, it wastes a lot of space. An adjacency list saves space, but many operations are slower than an adjacency matrix.

A [hash table](</en/algo/data-structure-basic/hashmap-basic/>) uses a hash function to map keys into a large array. For hash collisions, [separate chaining](</en/algo/data-structure-basic/hashtable-chaining/>) needs linked list features. It is simple, but needs extra space for pointers. [linear probing](</en/algo/data-structure-basic/linear-probing-key-point/>) needs array features for continuous addressing. It does not need pointer space, but the operations are a bit more complex.

For [trees](</en/algo/data-structure-basic/binary-tree-basic/>): if you use an array, it becomes a “heap”, because a heap is a complete binary tree. With an array, you don’t need node pointers, and operations are simpler. A classic example is the [binary heap](</en/algo/data-structure-basic/binary-heap-basic/>). If you use a linked list, it is the common “tree” form. Because it may not be a complete binary tree, it is not good to store it in an array. Based on this linked-list “tree”, people created many designs, like [binary search tree](</en/algo/data-structure-basic/tree-map-basic/>), AVL tree, [red-black tree](</en/algo/data-structure-basic/rbtree-basic/>), [segment tree](</en/algo/data-structure-basic/segment-tree-basic/>), B-tree, and so on, for different problems.

So there are many data structures. You can even invent your own. But at the storage level, it is still just arrays or linked lists. Their pros and cons are:

**[Array](</en/algo/data-structure-basic/array-basic/>)** stores data in a tight, continuous block. You can do random access and quickly find an element by index, and it saves space. But because it must be continuous, memory must be allocated in one piece. So if you need to grow the array, you must allocate a bigger block and copy all data, which is O(N)O(N)O(N). Also, if you insert or delete in the middle, you must move all later elements to keep it continuous, which is also O(N)O(N)O(N).

**[Linked list](</en/algo/data-structure-basic/linkedlist-basic/>)** does not store elements continuously. Each node uses pointers to the next node, so there is no “grow array” problem. If you know the previous and next node, you can delete or insert by changing pointers, which is O(1)O(1)O(1). But because memory is not continuous, you cannot compute an element’s address from an index, so you cannot do random access. Also, each element needs pointers (to previous/next), so it uses more space.

## Basic operations of data structures

**For any data structure, the basic operations are traversal + access. More specifically: insert, delete, search, update.**

There are many data structures, but their purpose is the same: in different scenarios, do insert/delete/search/update as efficiently as possible. That is the job of data structures.

How to do traversal + access? From a high level, there are only two types: linear and non-linear.

Linear is like for/while loops. Non-linear is like recursion. More specifically, there are only these common frameworks:

Array traversal framework, a typical linear loop:

```python
def traverse(arr: List[int]):
    for i in range(len(arr)):
        # iterate over arr[i]
``` 

Linked list traversal framework, has both loop and recursion:

```python
# basic single linked list node
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

def traverse(head: ListNode) -> None:
    p = head
    while p is not None:
        # iteratively access p.val
        p = p.next

def traverse(head: ListNode) -> None:
    # recursively access head.val
    traverse(head.next)
``` 

Binary tree traversal framework, a typical non-linear recursive traversal:

```python
# basic binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
def traverse(root: TreeNode):
    traverse(root.left)
    traverse(root.right)
``` 

The recursive traversal of a binary tree and the recursive traversal of a linked list look similar, right? And the structure of a binary tree and a singly linked list also looks similar, right? If we add more branches, can you traverse an N-ary tree?

The binary tree framework can be extended to an N-ary tree traversal framework:

```python
# basic N-ary tree node
class TreeNode:
    val: int
    children: List[TreeNode]

def traverse(root: TreeNode) -> None:
    for child in root.children:
        traverse(child)
``` 

Traversal of an `N`-ary tree can be extended to graph traversal, because a graph is like many `N`-ary trees combined. You may say a graph can have cycles. That is easy: use a boolean array `visited` to mark nodes. See [graph traversal](</en/algo/data-structure-basic/graph-traverse-basic/>) for details.

**A “framework” is a pattern. No matter insert/delete/search/update, this structure never changes.** You can treat it as an outline. For a specific problem, you just add code into the framework.

## The Essence of Algorithms

**If I had to sum it up in one sentence, I'd say the essence of algorithms is "enumeration."**

I'm sure some people will push back on this—is every algorithm problem really just about enumeration? Are there no exceptions?

Of course there are exceptions. For instance, [Algorithm Problems Solvable in One Line of Code](</en/algo/frequency-interview/one-line-solutions/>) covers problems that are more like brain teasers—you observe a pattern, spot a trick, and arrive at the optimal solution. But these types of problems are relatively rare, so don't get hung up on them. Another example: cryptographic algorithms and machine learning algorithms aren't really about enumeration—they're programmatic implementations of mathematical principles. Their essence is math, which falls outside the scope of what we're discussing here under "data structures and algorithms."

**I should also clarify: what an "ML engineer" (or "algorithm engineer" in Chinese tech) does with "algorithms" is a completely different thing from "data structures and algorithms."** I don't want any beginners to get confused.

For the former, the focus is on mathematical modeling and parameter-tuning experience—the computer is literally just a calculation tool. For the latter, the focus is on computational thinking: you need to see problems from the computer's perspective, abstract and simplify real-world problems, and solve them using appropriate data structures.

So don't assume that mastering data structures and algorithms qualifies you to be an ML engineer. And don't assume that if you're not going into ML, you don't need to learn data structures and algorithms.

Honestly, most development jobs involve working with existing frameworks, and you rarely run into low-level data structure and algorithm problems. But here's the reality: if you want any technical role, data structures and algorithms are unavoidable in the interview process, because this knowledge is universally recognized as a fundamental skill for programmers.

**To keep things clear, let's call what ML engineers study "mathematical algorithms" and what we practice for coding interviews "computer algorithms." My content focuses primarily on "computer algorithms."**

With that distinction, things should be pretty clear. I'm guessing most of you are trying to pass coding interviews and land a development job. You really don't need a strong math background—you just need to learn how to solve problems with computational thinking.

Computational thinking isn't anything fancy, either. Think about it: what's a computer's superpower? It's fast. Your brain can only process one thought per second, but a CPU can crunch tens of thousands of operations without breaking a sweat. So the way computers solve problems is beautifully simple: **enumeration**.

Say you need to find the maximum value in an array. How do you do it? You loop through every element and track the largest one. There's no better way, right? That's enumeration. That's algorithms. Easy.

When I was first starting out, I thought computer algorithms were something super sophisticated. Every time I saw a problem, I'd try to derive some mathematical formula that would magically spit out the answer.

For example, if you told someone who's never studied computer algorithms that you wrote an algorithm for generating permutations and combinations, they'd probably assume you invented a formula that directly computes all of them.

But what's the reality? There's no fancy formula. As [Backtracking Solves Permutation/Combination/Subset Problems](</en/algo/essential-technique/permutation-combination-subset-all-in-one/>) explains, you just model all possible permutations and combinations as an n-ary tree, then write code to traverse that tree and collect all the results. What's so magical about that?

This misconception about algorithms probably comes from how we learned math in school. Math problems are typically about careful observation—find geometric relationships, set up equations, and compute the answer. If you had to resort to large-scale enumeration to find an answer, something was probably wrong with your approach.

Computer problem-solving is the exact opposite: deriving mathematical formulas? That's your job, humans. If we can find some clever theorem, great. But if not, we'll just enumerate. As long as the complexity is manageable, there's nothing that enumeration can't find.

Theoretically, if you keep randomly shuffling an array, you'll eventually end up with a sorted result! Of course, that's a terrible algorithm, because who knows how long it would take.

Those algorithm questions on coding interviews—finding the max, the min, whatever—how do you solve them? Enumerate all feasible solutions and you'll find the optimal one. When you boil it down, that's all there is to it.

## The Hard Parts of Enumeration

Two Keys to Enumeration

Don't underestimate enumeration. There are two key challenges: **no omissions and no redundancy**.

Omissions lead directly to wrong answers. If you're looking for the minimum value but your enumeration happens to skip it, you'll get the wrong result. Simple as that.

Redundancy slows your algorithm down. If your code repeats the exact same computation ten times, your algorithm runs ten times slower, and you might exceed the judge's time limit.

**Why do omissions happen?** Because you haven't mastered the algorithmic framework well enough and don't know how to write correct enumeration code.

**Why does redundancy happen?** Because you're not making full use of available information, leading to repeated computations.

So when you encounter an algorithm problem, think about it from these two angles:

**1\. How to enumerate?** That is, how to enumerate all possible solutions without missing any.

**2\. How to enumerate smartly?** That is, how to avoid redundant computation during enumeration and find the answer using as few resources as possible.

### How to Enumerate

**Which algorithms are hard because of the "how to enumerate" part? Typically recursive problems—things like backtracking and dynamic programming.**

Let's start with backtracking. Take the permutation and combination problems you learned in high school. Back then, you could work them out on scratch paper: pick a possibility for the first position, fix it, then look at what's available for the second position, fix that... and so on. But without training, it's really hard to write code that enumerates all permutations and combinations, because it's hard to abstract that manual process into a programmable pattern.

First, you need to model the permutation/combination problem as a tree. Then you need to precisely **traverse** every node of that tree—no more, no less—to produce correct code. In later chapters, I'll introduce the [Backtracking Algorithm Core Framework](</en/algo/essential-technique/backtrack-framework/>), and then in [Backtracking Solves Subset/Permutation/Combination Problems](</en/algo/essential-technique/permutation-combination-subset-all-in-one/>), we'll tackle all subset, permutation, and combination problems in one go.

Dynamic programming is a step harder than backtracking. Both are fundamentally about enumeration, but the thinking patterns differ. Backtracking uses a "**traversal** " mindset, while dynamic programming uses a "**problem decomposition** " mindset.

What does "problem decomposition" thinking mean?

I don't even need a formal example. Just look at a tree and tell me: how many leaves are on it?

How would you enumerate them? Go branch by branch, counting one leaf at a time? Sure, that works, but that's the traversal mindset—like manually working out permutations and combinations. That's backtracking territory.

**If you have a problem decomposition mindset, your answer should be: the tree has one leaf, plus the rest of the leaves.**

When I hear that answer, I know I'm talking to someone who gets algorithms.

If a confused student follows up with "well, how many are 'the rest'?", the answer is: one leaf, plus the rest. Don't keep asking—the answer is embedded in the question itself. When you reach the end, you'll naturally know how many are left.

Now you see why I say the hard part of dynamic programming is "how to enumerate," right? A normal person wouldn't naturally think this way. But this mindset, combined with a computer, is a killer combo. You just have to practice. Once you've got it down, you can write algorithms effortlessly—and they'll be correct no matter how you approach them.

In the [Dynamic Programming Core Framework](</en/algo/essential-technique/dynamic-programming-framework/>), I walk through the process of solving DP problems. It's really just: first write out the brute-force enumeration (the state transition equation), add memoization and you've got a top-down recursive solution, tweak it a bit more and you've got a bottom-up iterative solution. [Space Optimization in Dynamic Programming](</en/algo/dynamic-programming/space-optimization/>) also covers how to use space compression techniques to optimize the space complexity of DP algorithms.

Adding memoization and applying space compression are both standard patterns—they're not the hard part. When you actually try DP problems yourself, you'll find that you simply can't come up with the state transition equation—you can't even write the brute-force solution in the first step. That's why finding the state transition equation (i.e., how to enumerate) is the real challenge.

I wrote [DP Design Method: Mathematical Induction](</en/algo/dynamic-programming/longest-increasing-subsequence/>) specifically to explain that the core of enumeration is mathematical induction: clearly define your function, decompose the problem, and then use that definition to recursively solve subproblems.

### Smart Enumeration

**What algorithms focus on "smart enumeration"? A lot of well-known non-recursive techniques fall into this category.**

The simplest example: if you need to find an element in a sorted array, anyone can brute-force it with a for loop. But [binary search](</en/algo/essential-technique/binary-search-framework/>) is a smarter way to enumerate, with better time complexity.

Another example: [Union Find Explained](</en/algo/data-structure/union-find/>) shows you an efficient way to compute connected components. In theory, you could use DFS/BFS brute-force to check if two nodes are connected, but Union Find uses arrays to simulate tree structures and brings connectivity operations down to O(1)O(1)O(1).

That's smart enumeration. These techniques were invented by brilliant people—if you've learned them, you can use them. If you haven't, you'd probably never think of them on your own.

Take greedy algorithms, for example. [When Veterans Learn Greedy Algorithms](</en/algo/frequency-interview/gas-station-greedy/>) explains that greedy algorithms are all about spotting patterns (formally called the greedy choice property) that let you find the answer without enumerating every possible solution.

Dynamic programming at least enumerates all solutions without redundancy and finds the optimal value. Greedy algorithms? They don't even need to enumerate all solutions to find the answer. That's why in [Greedy Algorithms for Jump Game](</en/algo/essential-technique/greedy/>), greedy beats dynamic programming in efficiency. Of course, not every problem has a greedy choice property you can exploit. Full enumeration might be plain and boring, but it works in any situation.

Below, I'll cover some common algorithm techniques for your reference.

## Array and Linked List Algorithms

**The most common linked list technique is the two-pointer pattern, which falls under "smart enumeration".** [Linked List Two-Pointer Techniques](</en/algo/essential-technique/linked-list-skills-summary/>) covers everything you need—easy if you know it, tricky if you don't.

Take cycle detection in a linked list. The obvious brute-force? Use a `HashSet` to track visited nodes—if you see a duplicate, there's a cycle. But with fast and slow pointers, you can avoid extra space. That's smart enumeration.

**Arrays also rely heavily on two-pointer techniques, all of which fall under "smart enumeration".** [Array Two-Pointer Techniques](</en/algo/essential-technique/array-two-pointers-summary/>) has you covered—easy if you know it, tricky if you don't.

**First up: binary search** , which is essentially two pointers moving from both ends toward the center. If you need to search for an element in an array, a for loop takes O(N)O(N)O(N) time and will definitely work. But binary search says: if the array is sorted, I only need O(logN)O(logN)O(logN). That's a smarter way to search.

[Binary Search Framework Explained](</en/algo/essential-technique/binary-search-framework/>) gives you a code template that guarantees you won't run into boundary issues. [Binary Search in Practice](</en/algo/frequency-interview/binary-search-in-action/>) summarizes common patterns in binary search problems and how to apply binary search thinking to real algorithms.

**Next up:[Sliding Window Techniques](</en/algo/essential-technique/sliding-window-framework/>)**, a classic fast-slow pointer pattern. You could use nested for loops to enumerate all subarrays in O(N2)O(N^2)O(N2) time, which would definitely find the subarray you're looking for. But sliding window says: in certain scenarios, I can use one fast and one slow pointer to find the answer in just O(N)O(N)O(N) time. That's smarter enumeration.

[Sliding Window Framework Explained](</en/algo/essential-technique/sliding-window-framework/>) covers when to use sliding window and provides a universal code template to ensure you write correct code. [Sliding Window Exercises](</en/algo/problem-set/sliding-window/>) walks you through applying the sliding window framework to various problems.

**Finally, let's talk about[Prefix Sum Techniques](</en/algo/data-structure/prefix-sum/>) and [Difference Array Techniques](</en/algo/data-structure/diff-array/>).**

If you're constantly computing subarray sums, traversing with a for loop each time will work, but the prefix sum technique pre-computes a `preSum` array to avoid the loop.

Similarly, if you're frequently incrementing or decrementing subarrays, you could use a for loop each time, but the difference array technique maintains a `diff` array to avoid the loop.

That covers most array and linked list techniques. They're pretty standard patterns—once you've seen them, they're not that hard to apply. Now let's talk about slightly trickier algorithms.

## Binary Tree Algorithms

Long-time readers know I've stressed the importance of binary trees countless times. Binary tree models are the foundation for almost all advanced algorithms. If you struggle with recursion, you should definitely grind through binary tree problems.

Tip

In the binary tree section, I'll walk through 150 binary tree problems using consistent patterns and thinking modes. I'll guide you step-by-step through the entire binary tree category to quickly master recursive thinking.

**As I mentioned in[Binary Tree Fundamentals](</en/algo/essential-technique/binary-tree-summary/>), recursive solutions to binary tree problems fall into two categories: the first is traversing the tree once to get the answer, and the second is decomposing the problem to compute the answer. These two approaches correspond to [Backtracking Framework](</en/algo/essential-technique/backtrack-framework/>) and [Dynamic Programming Framework](</en/algo/essential-technique/dynamic-programming-framework/>) respectively.**

### The Traversal Mindset

**What does it mean to get the answer by traversing the tree once?**

Take the problem of computing the maximum depth of a binary tree. If you need to implement the `maxDepth` function, this code works perfectly:

```python
class Solution:
    def __init__(self):
        # record the maximum depth
        self.res = 0
        # record the depth of the current traversal node
        self.depth = 0
        
    def maxDepth(self, root: TreeNode) -> int:
        self.traverse(root)
        return self.res
        
    def traverse(self, root: TreeNode) -> None:
        if not root:
            # reached a leaf node
            self.res = max(self.res, self.depth)
            return
        # pre-order traversal position
        self.depth += 1
        self.traverse(root.left)
        self.traverse(root.right)
        # post-order traversal position
        self.depth -= 1
``` 

The logic here is to use the `traverse` function to visit all nodes in the tree, maintain a `depth` variable, and update the maximum depth at leaf nodes.

Does this code look familiar? Can you map it to the backtracking algorithm template?

Check out the permutation problem code in [Backtracking Framework](</en/algo/essential-technique/backtrack-framework/>). The `backtrack` function is just the `traverse` function—same thing, different name. The overall logic is very similar:

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # record all permutations
        res = []
        # record the current permutation being enumerated
        track = []

        # elements in track will be marked as true to avoid reuse
        used = [False] * len(nums)

        # main function, input a set of unique numbers, return all their permutations
        def backtrack(nums):
            # reach a leaf node, elements in track form a permutation
            if len(track) == len(nums):
                res.append(track[:])
                return

            for i in range(len(nums)):
                # exclude invalid choices
                if used[i]:
                    # nums[i] is already in track, skip
                    continue
                # make a choice
                track.append(nums[i])
                used[i] = True

                # enter the next level of the recursion tree
                backtrack(nums)

                # undo the choice
                track.pop()
                used[i] = False

        backtrack(nums)
        return res
``` 

This code might look long, but isn't it just traversing an n-ary tree? Backtracking is essentially n-ary tree traversal. If you can abstract a problem into a tree structure, you can definitely solve it with backtracking.

### The Problem Decomposition Mindset

**So what does it mean to compute the answer by decomposing the problem?**

For the same maximum depth problem, you can also write a solution like this:

```python
# Definition: input the root node, return the maximum depth of this binary tree
def maxDepth(root: TreeNode) -> int:
    if root is None:
        return 0
    # Recursively calculate the maximum depth of the left and right subtrees
    leftMax = maxDepth(root.left)
    rightMax = maxDepth(root.right)
    # The maximum depth of the entire tree is the maximum
    # depth of the left and right subtrees plus one
    res = max(leftMax, rightMax) + 1

    return res
``` 

Does this code look familiar? Does it remind you of dynamic programming solutions?

Check out the brute-force solution to the coin change problem in [Dynamic Programming Framework](</en/algo/essential-technique/dynamic-programming-framework/>):

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # the final result required by the problem is dp(amount)
        return self.dp(coins, amount)

    # definition: to make up the `amount`, at least dp(coins, amount) coins are needed
    def dp(self, coins, amount):
        # base case
        if amount == 0: 
            return 0
        if amount < 0: 
            return -1

        res = float('inf')
        for coin in coins:
            # calculate the result of the subproblem
            subProblem = self.dp(coins, amount - coin)
            # skip if the subproblem has no solution
            if subProblem == -1: 
                continue
            # choose the optimal solution in the subproblem, then add one
            res = min(res, subProblem + 1)

        return res if res != float('inf') else -1
``` 

Add a `memo` to this brute-force solution and you get top-down dynamic programming. Compare it to the binary tree maximum depth solution—see the similarity?

### Expanding the Idea

**If you understand the difference between these two approaches for the maximum depth problem, let's strike while the iron's hot: how do you write binary tree preorder traversal?**

I'm sure everyone would scoff at this question and write this code without hesitation:

```python
class Solution:
    def __init__(self):
        # create a list as the result container
        self.res = []

    # return the preorder traversal result
    def preorder(self, root: TreeNode) -> List[int]:
        self.traverse(root)
        return self.res

    # binary tree traversal function
    def traverse(self, root: TreeNode) -> None:
        if not root:
            return
        # position for preorder traversal
        self.res.append(root.val)
        self.traverse(root.left)
        self.traverse(root.right)
``` 

But given the two different thinking modes we discussed, can you also solve tree traversal using the problem decomposition approach?

Let's observe the characteristics of preorder traversal results:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/1.jpeg)

**Notice that in preorder traversal results, the root node's value comes first, followed by the preorder traversal of the left subtree, then the preorder traversal of the right subtree.**

Getting it? You can totally rewrite the preorder traversal code using the problem decomposition approach:

```python
from typing import List

# Definition: Given the root node of a binary tree,
# return the preorder traversal result of this tree
def preorder(root: TreeNode) -> List[int]:
    res = []
    if not root:
        return res
    # In the result of preorder traversal, root.val is the first
    res.append(root.val)
    # Then append the preorder traversal result of the left subtree
    res.extend(preorder(root.left))
    # Finally, append the preorder traversal result of the right subtree
    res.extend(preorder(root.right))
    return res
``` 

There you go—that's binary tree preorder traversal written with the problem decomposition mindset. Inorder and postorder traversals follow the same pattern.

### Level Order Traversal

Besides dynamic programming, backtracking (DFS), and divide-and-conquer, another common algorithm is BFS. [BFS Framework](</en/algo/essential-technique/bfs-framework/>) is adapted from this binary tree level order traversal code:

```python
# input the root of a binary tree, perform level order traversal of this binary tree
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return
        q = collections.deque()
        q.append(root)
        depth = 0
        # traverse each level of the binary tree from top to bottom
        while q:
            sz = len(q)
            # traverse each node of each level from left to right
            for i in range(sz):
                cur = q.popleft()

                # put the nodes of the next level into the queue
                if cur.left:
                    q.append(cur.left)
                if cur.right:
                    q.append(cur.right)
            depth += 1
``` 

**Going further, graph algorithms are also extensions of binary tree algorithms.**

For example, [Graph Theory Basics](</en/algo/data-structure-basic/graph-basic/>), [Cycle Detection and Topological Sort](</en/algo/data-structure/topological-sort/>), and [Bipartite Graph Detection](</en/algo/data-structure/bipartite-graph/>) all use DFS. And [Dijkstra's Algorithm Template](</en/algo/data-structure/dijkstra/>) is an improved version of BFS.

Alright, that's about it. All these algorithms essentially enumerate binary (or n-ary) trees. When possible, they reduce redundant computation through pruning or memoization to improve efficiency. That's really all there is to it.

## Final Thoughts

Many readers ask me what's the right way to practice. I believe the right approach is to solve one problem and get the benefit of solving ten. Otherwise, with LeetCode having 2000+ problems now, are you really planning to do them all?

How do you achieve this? Think in frameworks. Learn to extract key points and find what stays constant. One algorithm technique can be packaged into ten thousand problems. If you can see through to their essence at a glance, ten thousand problems become one. Why waste time doing all of them?

**That's the power of frameworks—they guarantee you can write correct code even when you're half asleep. Even if you haven't learned anything else, this way of thinking alone puts you a dimension above others.**

Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime. Algorithms really aren't that hard—anyone can learn them with the right motivation.

I hope you'll develop systematic thinking here and enjoy mastering algorithms, instead of being mastered by them.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
