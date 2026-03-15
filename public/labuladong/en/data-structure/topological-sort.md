# Topological Sort Algorithm

> Source: https://labuladong.online/algo/en/data-structure/topological-sort/
> Archived: labuladong.online

---

# Topological Sort Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[210\. Course Schedule II](<https://leetcode.com/problems/course-schedule-ii/>)|   
  
Prerequisites

Before reading this article, you need to learn:

  * [DFS/BFS Traversal of Graph Structures](</en/algo/data-structure-basic/graph-traverse-basic/>)
  * [Cycle Detection in Directed Graphs](</en/algo/data-structure/cycle-detection/>)

One-Sentence Summary

The reverse postorder of a graph's DFS traversal, or the BFS traversal order using an in-degree array, gives you the topological sort result.

Topological sort is another classic algorithm in graph theory. Before performing a topological sort, you must first ensure the graph has no cycles. For cycle detection, refer to [Cycle Detection in Directed Graphs](</en/algo/data-structure/cycle-detection/>).

**This article uses specific algorithm problems to implement topological sort using both DFS and BFS approaches**.

The BFS solution is somewhat cleaner in terms of code, but the DFS solution helps you better understand the essence of recursive data structure traversal. So in this article, I'll cover the DFS approach first, then the BFS approach.

## Topological Sort (DFS Version)

Take a look at LeetCode problem 210, "[Course Schedule II](<https://leetcode.cn/problems/course-schedule-ii/>)":

**210\. Course Schedule II** |[LeetCode](<https://leetcode.com/problems/course-schedule-ii/>)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

  * For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return _the ordering of courses you should take to finish all courses_. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.

**Example 1:**

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
``` 

**Example 2:**

```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
``` 

**Example 3:**

```
Input: numCourses = 1, prerequisites = []
Output: [0]
``` 

**Constraints:**

  * `1 <= numCourses <= 2000`
  * `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
  * `prerequisites[i].length == 2`
  * `0 <= ai, bi < numCourses`
  * `ai != bi`
  * All the pairs `[ai, bi]` are **distinct**.

The problem is from [LeetCode 210. Course Schedule II](<https://leetcode.com/problems/course-schedule-ii/>).

This problem is an advanced version of the one in [Cycle Detection](</en/algo/data-structure/cycle-detection/>). Instead of just determining whether you can complete all courses, it asks you to return a valid course order that ensures all prerequisites are completed before starting each course.

The function signature is:

```python
def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
``` 

Let me first explain the term Topological Sorting. The definitions you find online tend to be very mathematical, so let me just use this diagram from Baidu Baike to give you an intuitive feel:

![diagram](https://labuladong.online/images/algo/topological-sort/top.jpg)

**Intuitively, topological sorting means "flattening" a graph such that all arrows point in the same direction** — for example, all arrows point to the right in the diagram above.

Clearly, if a directed graph contains a cycle, topological sorting is impossible because you can't make all arrows point in the same direction. Conversely, if a graph is a DAG (Directed Acyclic Graph), topological sorting is always possible.

But what does this problem have to do with topological sorting?

**It's not hard to see: if you treat courses as nodes and dependencies between courses as directed edges, the topological sort of this graph gives you a valid course order**.

First, let's check whether the input course dependencies contain a cycle. If there's a cycle, topological sorting is impossible, so we can reuse the logic from [Cycle Detection](</en/algo/data-structure/cycle-detection/>):

```python
def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    if not canFinish(numCourses, prerequisites):
        # It's not possible to complete all courses
        return []
    # ...
``` 

Now here's the key question: how do you actually perform topological sorting? Do you need some fancy technique?

**It's actually very simple: reverse the postorder traversal result of the graph, and that's your topological sort**.

Is Reversal Necessary?

Some readers have mentioned that the topological sort algorithms they've seen online use the postorder traversal result directly without reversal. Why is that?

You can indeed find such solutions. The reason is that they define edges differently when building the graph. In my graph, the arrow direction represents "depended upon" — for example, node `1` points to `2`, meaning node `1` is depended upon by node `2`, i.e., you must finish `1` before doing `2`. This feels more intuitive.

If you reverse this and define directed edges as "depends on," then all edges in the graph are flipped, and you don't need to reverse the postorder result. Specifically, just change `graph[from].add(to);` to `graph[to].add(from);` in my solution, and no reversal is needed.

Let's look at the solution code directly. It builds on the cycle detection code by adding logic to record the postorder traversal result:

```python
class Solution:

    def __init__(self):
        # record postorder traversal result
        self.postorder = []
        # record if there is a cycle
        self.hasCycle = False
        self.visited = []
        self.onPath = []

    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = self.buildGraph(numCourses, prerequisites)
        self.visited = [False] * numCourses
        self.onPath = [False] * numCourses
        # traverse the graph
        for i in range(numCourses):
            self.traverse(graph, i)
        # cannot perform topological sort if there's a cycle
        if self.hasCycle:
            return []
        # reverse postorder traversal result is the topological sort result
        self.postorder.reverse()
        return self.postorder

    # graph traversal function
    def traverse(self, graph: List[List[int]], s: int):
        if self.onPath[s]:
            # found a cycle
            self.hasCycle = True
        if self.visited[s] or self.hasCycle:
            return
        # pre-order traversal position
        self.onPath[s] = True
        self.visited[s] = True
        for t in graph[s]:
            self.traverse(graph, t)
        # post-order traversal position
        self.postorder.append(s)
        self.onPath[s] = False

    # build graph function
    def buildGraph(self, numCourses: int, prerequisites: List[List[int]]) -> List[List[int]]:
        # code as described above
        pass
``` 

Nodes with `visited` set to true are shown in green, and nodes with `onPath` set to true are shown in orange.

You can open the visualization panel and click `if (onPath[s])` multiple times to watch the DFS traversal of the graph.

Algorithm Visualization

The code may look long, but the logic should be clear. As long as the graph has no cycle, we call `traverse` to perform DFS on the graph, record the postorder traversal result, and then reverse it to get the final answer.

**So why is the reverse of the postorder traversal the topological sort?**

Instead of a mathematical proof, let me explain with an intuitive example using binary trees. Here's the binary tree traversal framework we've discussed many times:

```python
def traverse(root: TreeNode):
    # code position for pre-order traversal
    traverse(root.left)
    # code position for in-order traversal
    traverse(root.right)
    # code position for post-order traversal
``` 

When does postorder traversal execute? Only after both the left and right subtrees have been fully traversed. In other words, the child nodes are added to the result list before the root node.

**This property of postorder traversal is crucial. Topological sort is based on postorder traversal because a task can only begin after all the tasks it depends on have been completed**.

Think of a binary tree as a directed graph where edges point from parent nodes to child nodes, like this:

![diagram](https://labuladong.online/images/algo/topological-sort/2.jpeg)

In the standard postorder traversal result, the root node appears last. Simply reverse the traversal result, and you get the topological sort:

![diagram](https://labuladong.online/images/algo/topological-sort/3.jpeg)

I know some readers will ask: what's the relationship between the reversed postorder result and the preorder traversal result?

For binary trees, they might look related, but in reality they have no relationship whatsoever. Do not assume that reversing the postorder result gives you the preorder result.

The key difference was already explained in [Binary Tree Thinking (Master Plan)](</en/algo/essential-technique/binary-tree-summary/>): postorder code executes only after both subtrees are fully traversed. Only postorder traversal can capture the "dependency" relationship — no other traversal order can do this.

## Topological Sort (BFS Version)

Make sure you understand the BFS algorithm from [Cycle Detection](</en/algo/data-structure/cycle-detection/>) that uses an `indegree` array to determine whether a directed graph contains a cycle.

**If you can understand the BFS version of the cycle detection algorithm, the BFS version of topological sort is easy to grasp, because the node traversal order is the topological sort result**.

For example, in the cycle detection example, the value in each node below represents its enqueue order:

![diagram](https://labuladong.online/images/algo/topological-sort/13.jpeg)

Clearly, this order is a valid topological sort result.

So we just need to slightly modify the BFS cycle detection algorithm to record the node traversal order, and we get the topological sort result:

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # build the graph, same as in the cycle detection algorithm
        graph = self.buildGraph(numCourses, prerequisites)
        # calculate in-degrees, same as in the cycle detection algorithm
        indegree = [0] * numCourses
        for edge in prerequisites:
            from_arc, to = edge[1], edge[0]
            indegree[to] += 1

        # initialize the queue with nodes of in-degree 0,
        # same as in the cycle detection algorithm
        q = collections.deque()
        for i in range(numCourses):
            if indegree[i] == 0:
                q.append(i)
                
        # record the topological sorting result
        res = [0] * numCourses
        # record the order of traversed nodes (index)
        count = 0
        # start executing the BFS algorithm
        while q:
            cur = q.popleft()
            # the order of nodes popped is the topological sorting result
            res[count] = cur
            count += 1
            for next_arc in graph[cur]:
                indegree[next_arc] -= 1
                if indegree[next_arc] == 0:
                    q.append(next_arc)

        if count != numCourses:
            # a cycle exists, topological sorting is not possible
            return []
          
        return res

    def buildGraph(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # see previous text
        pass
``` 

In principle, [graph traversal](</en/algo/data-structure-basic/graph-basic/>) requires a `visited` array to prevent revisiting nodes. Here, the BFS algorithm effectively uses the `indegree` array to serve the same purpose as a `visited` array — only nodes with an in-degree of 0 can enter the queue, which prevents infinite loops.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
