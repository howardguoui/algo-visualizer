# Cycle Detection Algorithm

> Source: https://labuladong.online/algo/en/data-structure/cycle-detection/
> Archived: labuladong.online

---

# Cycle Detection Algorithm

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[207\. Course Schedule](https://leetcode.com/problems/course-schedule/)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Graph Basics and General Implementation](/en/algo/data-structure-basic/graph-basic/)
  * [DFS/BFS Traversal of Graphs](/en/algo/data-structure-basic/graph-traverse-basic/)


One-Sentence Summary

You can detect cycles in a directed graph using either the `onPath` array in DFS or the in-degree array in BFS.

Cycle detection in directed graphs is one of the most fundamental and practical algorithms in graph theory. For example, when you import packages in your code, the compiler throws an error if there's a circular dependency—internally, it uses a cycle detection algorithm just like this. Another example: in a task scheduling system, if the dependency relationships between tasks form a cycle, those tasks can never be executed.

**In this article, we'll implement directed graph cycle detection using both DFS and BFS, working through concrete algorithm problems along the way**.

The BFS approach is a bit cleaner in terms of code, but the DFS approach helps you develop a deeper understanding of recursive traversal. So I'll cover the DFS approach first, then the BFS approach.

## ¶Cycle Detection (DFS Version)

Let's start with LeetCode problem 207, "[Course Schedule](https://leetcode.com/problems/course-schedule/)":

**207\. Course Schedule** |[LeetCode](https://leetcode.com/problems/course-schedule/)

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

  * For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.


Return `true` if you can finish all courses. Otherwise, return `false`.

**Example 1:**
    
    
    **Input:** numCourses = 2, prerequisites = [[1,0]]
    **Output:** true
    **Explanation:** There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0. So it is possible.
    

**Example 2:**
    
    
    **Input:** numCourses = 2, prerequisites = [[1,0],[0,1]]
    **Output:** false
    **Explanation:** There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
    

**Constraints:**

  * `1 <= numCourses <= 2000`
  * `0 <= prerequisites.length <= 5000`
  * `prerequisites[i].length == 2`
  * `0 <= ai, bi < numCourses`
  * All the pairs prerequisites[i] are **unique**.


The problem is from [LeetCode 207. Course Schedule](https://leetcode.com/problems/course-schedule/).

CC++GoJavaJavaScriptPython
    
    
    // The function signature is as follows
    boolean canFinish(int numCourses, int[][] prerequisites);

The problem should be straightforward to understand. When is it impossible to finish all courses? When there's a circular dependency.

**When you see a dependency problem, the first thing to think of is modeling it as a directed graph. If the graph contains a cycle, there's a circular dependency**.

Specifically, we can treat each course as a node in the directed graph, numbered `0, 1, ..., numCourses-1`, and treat the dependency relationships between courses as directed edges between nodes.

For example, if you must complete course `1` before taking course `3`, there's a directed edge from node `1` to node `3`.

So we can build a graph like this from the input `prerequisites` array:

![](/images/algo/topological-sort/1.jpeg)

**If we find a cycle in this directed graph, it means there's a circular dependency among courses and it's impossible to finish them all. Conversely, if there's no cycle, we can definitely complete all courses**.

Alright, to solve this problem, we first need to convert the input into a directed graph, then check whether the graph contains a cycle.

In a previous article on [Graph Storage](/en/algo/data-structure-basic/graph-basic/), I covered two ways to store graphs: adjacency matrix and adjacency list. Here I'll use the adjacency list representation and write a graph-building function:

CC++GoJavaJavaScriptPython
    
    
    List<Integer>[] buildGraph(int numCourses, int[][] prerequisites) {
        // There are numCourses nodes in the graph
        List<Integer>[] graph = new LinkedList[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new LinkedList<>();
        }
        for (int[] edge : prerequisites) {
            int from = edge[1], to = edge[0];
            // Add a directed edge from 'from' to 'to'
            // The direction of the edge represents a dependency, i.e.,
            // course 'to' can only be taken after course 'from'
            graph[from].add(to);
        }
        return graph;
    }

Now that we've built the graph, how do we check if it contains a cycle?

It's pretty simple—it comes down to traversing all paths in the graph. If you can traverse all paths, you can definitely figure out whether any of them form a cycle.

[DFS/BFS Graph Traversal Basics](/en/algo/data-structure-basic/graph-traverse-basic/) covered how to use DFS to traverse all paths in a graph. If you've forgotten, go review it—we'll need it below.

I'll start by directly applying the DFS code template for traversing all paths, using a `hasCycle` variable to track whether a cycle exists. **When we revisit a node that's already in`onPath`, we've found a cycle, so we set `hasCycle = true`**.

Based on this idea, here's the first version of the code (which will TLE):

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        // record the nodes in the recursion stack
        boolean[] onPath;
        // record whether there is a cycle in the graph
        boolean hasCycle = false;
    
        public boolean canFinish(int numCourses, int[][] prerequisites) {
            List<Integer>[] graph = buildGraph(numCourses, prerequisites);
            
            onPath = new boolean[numCourses];
            
            for (int i = 0; i < numCourses; i++) {
                // traverse all the nodes in the graph
                traverse(graph, i);
            }
            // as long as there are no cyclic dependencies, all courses can be finished
            return !hasCycle;
        }
    
        // graph traversal function, traverse all paths
        void traverse(List<Integer>[] graph, int s) {
            if (hasCycle) {
                // if a cycle has been found, no need to continue traversing
                return;
            }
    
            if (onPath[s]) {
                // s is already on the recursion path, indicating a cycle
                hasCycle = true; ![](/images/algo/topological-sort/4.jpeg)
                return;
            }
            
            // pre-order code position
            onPath[s] = true;
            for (int t : graph[s]) {
                traverse(graph, t);
            }
            // post-order code position
            onPath[s] = false;
        }
    
        List<Integer>[] buildGraph(int numCourses, int[][] prerequisites) {
            // code as seen previously
        }
    }

Note that not all nodes in the graph are connected, so we need a for loop to start a DFS search from every node.

This solution is actually correct—since it traverses all paths, it can definitely determine whether there's a cycle. But it can't pass all test cases because it times out. You can probably guess why: **redundant computation**.

Where's the redundancy? Let me give you an example.

Suppose you start from node `2` and traverse all reachable paths, ultimately finding no cycle.

Now suppose another node `5` has an edge pointing to `2`. When you start from `5` and traverse all reachable paths, you'll inevitably reach `2` again. Do you still need to re-traverse all of `2`'s reachable paths?

No, you don't. Since the first time around you found no cycle, there's no way you'll find one this time either. See the redundancy now? If you think there's a counterexample, try drawing one out—there actually isn't one.

The fix is straightforward: if we find that a node has already been traversed before, we can skip it and avoid redundant work.

Here's the optimized code:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        // record nodes in the recursion stack
        boolean[] onPath;
        // record whether a node has been visited
        boolean[] visited;
        // record whether there is a cycle in the graph
        boolean hasCycle = false;
    
        public boolean canFinish(int numCourses, int[][] prerequisites) {
            List<Integer>[] graph = buildGraph(numCourses, prerequisites);
            
            onPath = new boolean[numCourses];
            visited = new boolean[numCourses];
            
            for (int i = 0; i < numCourses; i++) {
                // traverse all nodes in the graph
                traverse(graph, i);
            }
            // as long as there are no cyclic dependencies, all courses can be finished
            return !hasCycle;
        }
    
        // graph traversal function, traverse all paths
        void traverse(List<Integer>[] graph, int s) {
            if (hasCycle) {
                // if a cycle has been found, no need to traverse further
                return;
            }
    
            if (onPath[s]) {
                // s is already in the recursion path, indicating a cycle
                hasCycle = true; ![](/images/algo/topological-sort/4.jpeg)
                return;
            }
            
            if (visited[s]) {
                // no need to traverse already visited nodes
                return;
            }
    
            // pre-order code position
            visited[s] = true;
            onPath[s] = true;
            for (int t : graph[s]) {
                traverse(graph, t);
            }
            // post-order code position
            onPath[s] = false;
        }
    
    
        List<Integer>[] buildGraph(int numCourses, int[][] prerequisites) {
            // code as seen previously
        }
    }

Nodes where `visited` is true are shown in green, and nodes where `onPath` is true are shown in orange.

You can open the visualization panel and click on `if (onPath[s])` multiple times to watch the DFS traversal process.

Algorithm Visualization

And that solves the problem. The core idea is checking whether a directed graph contains a cycle.

But what if the interviewer follows up and asks you not only to detect whether a cycle exists, but also to return the specific nodes that form the cycle?

You might think: aren't the indices that are true in `onPath` exactly the nodes in the cycle?

Not quite. Suppose we start traversing from node `0`. In the diagram below, the green nodes are on the recursive path—they all have `onPath` set to true—but clearly only some of them actually form the cycle:

![](/images/algo/topological-sort/4.jpeg)

Take a moment to think about this. There are certainly many ways to solve it; I'll just show one common approach.

Click to reveal the answer

The simplest and most direct approach is to maintain a `Stack<Integer> path` alongside the `boolean[] onPath` array, recording the order of nodes visited during traversal.

For example, following the green traversal order in the diagram above, `path` from bottom to top would be `[0,4,5,9,8,7,6]`. When we encounter node `5` again, we know that the portion `[5,9,8,7,6]` forms the cycle.

## ¶Cycle Detection (BFS Version)

Above, we covered how DFS uses the `onPath` array to detect cycles. Now let's see how to solve this with BFS.

**BFS uses an`indegree` array to record each node's [in-degree](/en/algo/data-structure-basic/graph-terminology/), which enables cycle detection**. If you're not familiar with BFS, check out [BFS Graph Traversal](/en/algo/data-structure-basic/graph-traverse-basic/).

Here's the BFS solution code:

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        public boolean canFinish(int numCourses, int[][] prerequisites) {
            // build the graph, directed edges represent "dependency" relationship
            List<Integer>[] graph = buildGraph(numCourses, prerequisites);
            // construct the indegree array
            int[] indegree = new int[numCourses];
            for (int[] edge : prerequisites) {
                int from = edge[1], to = edge[0];
                // increase the indegree of node 'to'
                indegree[to]++;
            }
    
            // initialize the queue with nodes having zero indegree
            Queue<Integer> q = new LinkedList<>();
            for (int i = 0; i < numCourses; i++) {
                if (indegree[i] == 0) {
                    // node 'i' has no indegree, i.e., no dependencies
                    // can be used as a starting point for topological sort, add to queue
                    q.offer(i); ![](/images/algo/topological-sort/6-en.jpeg)
                }
            }
    
            // record the number of nodes traversed
            int count = 0;
            // start the BFS loop
            while (!q.isEmpty()) {
                // dequeue node 'cur' and decrease the indegree of its adjacent nodes
                int cur = q.poll();
                count++;
                for (int next : graph[cur]) { ![](/images/algo/topological-sort/7-en.jpeg)
                    indegree[next]--;
                    if (indegree[next] == 0) {
                        // if the indegree becomes zero, it means all
                        // dependencies of 'next' have been visited
                        q.offer(next);
                    }
                }
            }
    
            // if all nodes have been traversed, it means there is no cycle
            return count == numCourses;
        }
    
        // function to build the graph
        List<Integer>[] buildGraph(int n, int[][] edges) {
            // see above
        }
    }

Let me summarize the logic of this BFS algorithm:

  1. Build an adjacency list, same as before, where edge direction represents the "depended on" relationship.

  2. Build an `indegree` array recording each node's in-degree, where `indegree[i]` stores the in-degree of node `i`.

  3. Initialize the BFS queue by adding all nodes with an in-degree of 0.


**4\. Run the BFS loop: keep popping nodes from the queue, decrement the in-degree of their neighbors, and add any neighbors whose in-degree drops to 0 to the queue**.

**5\. If all nodes have been visited (`count` equals the number of nodes), there's no cycle. Otherwise, a cycle exists**.

A picture will make this clearer. In the graph below, the number inside each node represents its in-degree:

![](/images/algo/topological-sort/5-en.jpeg)

After initializing the queue, nodes with an in-degree of 0 are added first:

![](/images/algo/topological-sort/6-en.jpeg)

The BFS loop begins—pop a node from the queue, decrement its neighbors' in-degrees, and add any newly zero-in-degree nodes to the queue:

![](/images/algo/topological-sort/7-en.jpeg)

Continue popping nodes and decrementing neighbors' in-degrees. This time, no new zero-in-degree nodes are produced:

![](/images/algo/topological-sort/8-en.jpeg)

Continue popping nodes and decrementing neighbors' in-degrees, adding newly zero-in-degree nodes to the queue:

![](/images/algo/topological-sort/9-en.jpeg)

Keep popping nodes until the queue is empty:

![](/images/algo/topological-sort/10-en.jpeg)

At this point, all nodes have been visited, which means the graph contains no cycle.

On the flip side, if running BFS leaves some nodes unvisited, that means there's a cycle.

For example, in the following scenario, the queue initially contains only one node with in-degree 0:

![](/images/algo/topological-sort/11-en.jpeg)

After popping this node and decrementing its neighbors' in-degrees, the queue becomes empty. No new zero-in-degree nodes are produced, so BFS terminates:

![](/images/algo/topological-sort/12-en.jpeg)

As you can see, if some nodes remain unvisited, the graph contains a cycle. Now go back and look at the BFS code—it should be much easier to understand.

Normally, [graph traversal](/en/algo/data-structure-basic/graph-traverse-basic/) requires a `visited` array to avoid revisiting nodes. Here, the BFS algorithm effectively uses the `indegree` array as the `visited` array—only nodes with an in-degree of 0 can enter the queue, which prevents infinite loops.

One last exercise to think about:

For the BFS cycle detection algorithm, if you're asked to identify exactly which nodes form the cycle, how would you implement that?

Last updated: 03/14/2026, 12:17 AM

Loading comments...
