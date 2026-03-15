# Union-Find Algorithm

> Source: https://labuladong.online/algo/en/data-structure/union-find/
> Archived: labuladong.online

---

# Union-Find Algorithm

Prerequisite Knowledge

Before reading this article, you should first study:

  * [Basics and Traversal of N-ary Trees](/en/algo/data-structure-basic/n-ary-tree-traverse-basic/)
  * [Basics and General Implementation of Graphs](/en/algo/data-structure-basic/graph-basic/)


The Union-Find algorithm is designed for the problem of "dynamic connectivity". It is tested very often, and you must master it.

First, let’s talk about what dynamic connectivity in a graph means.

## ¶1\. Dynamic Connectivity

Simply put, dynamic connectivity can be seen as connecting nodes in a graph. For example, in the graph below, there are 10 nodes. They are not connected to each other, and are labeled from 0 to 9:

![](/images/algo/unionfind/1.jpg)

Our Union-Find algorithm mainly needs to implement these two APIs:

CC++GoJavaJavaScriptPython
    
    
    class UF {
        // connect p and q
        public void union(int p, int q);
        // determine if p and q are connected
        public boolean connected(int p, int q);
        // return the number of connected components in the graph
        public int count();
    }

The "connected" relation here is an equivalence relation. It has these three properties:

  1. Reflexive: node `p` is connected to itself `p`.

  2. Symmetric: if node `p` is connected to `q`, then `q` is also connected to `p`.

  3. Transitive: if node `p` is connected to `q`, and `q` is connected to `r`, then `p` is connected to `r`.


For example, in the graph above, any two different nodes from 0 to 9 are not connected. Calling `connected` on any pair returns false, and there are 10 connected components.

If we call `union(0, 1)`, then 0 and 1 become connected, and the number of connected components drops to 9.

Then we call `union(1, 2)`. Now 0, 1, 2 are all connected. Calling `connected(0, 2)` will return true, and the number of connected components becomes 8.

![](/images/algo/unionfind/2.jpg)

Checking this kind of equivalence relation is very useful, like when a compiler checks different references to the same variable, or when social networks compute friend circles, and so on.

Now you should have a basic idea of what dynamic connectivity is. The key of the Union-Find algorithm is the efficiency of the `union` and `connected` functions. So, what model should we use to represent the connectivity of this graph? What data structure should we use to implement the code?

Last updated: 03/14/2026, 12:17 AM

Loading comments...
