# Fast-Track Learning Plan

> Source: https://labuladong.online/algo/en/intro/quick-learning-plan/
> Archived: labuladong.online

---

# Fast-Track Learning Plan

Some readers told me: the content on this site is solid. If you study it seriously, you can fully master data structures and algorithms. But their problem is: they don’t have that much time. What can they do?

Can we focus on the most important parts first? Learn the must-know skills first, do a quick boost before the deadline, and study the rest later when we have time? I think many readers need this, so I wrote this simplified Quick Mastery plan.

If you have enough time and you are interested in algorithms, you can follow the full site plan: [Beginner Plan](/en/algo/intro/beginner-learning-plan/).

**If you don’t have much time, or you can’t decide which plan to choose, don’t think too much—just follow the Quick Mastery plan**. Don’t try to learn too much at once. First master the content in this plan. If you still have time and interest, you can come back and study other parts of the site. There is no conflict.

The articles and problems in the Quick Mastery plan are organized into this roadmap. Click the nodes in the graph to expand tutorials and problem lists. This helps you track progress and review:

Tip

The roadmap is a tree structure, while the table of contents below is a linear list. So the order in the roadmap is slightly different from the order below, but **the content is exactly the same**. Choose the format you like.

Quick Mastery Roadmap for Algorithms

## ¶About the problem lists

Many readers ask about company problem lists, so I will say a bit more.

**This Quick Mastery plan includes must-know algorithm patterns + classic algorithm problems. It is not limited to any one company’s list**. The goal is to solve the core algorithm skill problem, so you can solve common medium-level interview problems by yourself, instead of relying on luck and memory to cram one specific list.

**Some readers start by grinding a company problem list right away. That is not right. My advice: first learn the common algorithm frameworks. Then consider doing specific problem lists.**

Different companies have different lists and difficulty levels. But algorithms only have a few main frameworks. If you master the frameworks, you can finish a problem list in at most a couple of hours. There is nothing magical about it.

A company problem list has only two values:

**1) Know the difficulty and algorithm types in advance.** For example, if a company clearly says they will not test dynamic programming, you can skip the DP part here and spend time on other skills.

**2) Make review easier.** After you learn the frameworks, you can solve problems on your own. Then you can redo a problem list a few times to check your results and strengthen key points.

This Quick Mastery plan seems to include many problems, but most of them are “framework problems”. After you learn the tutorials, you can finish them naturally. You don’t need extra time to grind.

The site plugin integrates the problems in this plan. After you install the [Chrome extension](/en/algo/intro/leetcode/), when you open a LeetCode problem page, you will see the explanation from this site. The [vscode extension](/en/algo/intro/vscode/) and the [Jetbrains extension](/en/algo/intro/jetbrains/) also include the problem list for this plan.

![](/images/algo/intro/plugin_problemlist.jpeg)

## ¶Why this Quick Mastery plan works

Why can this plan improve your algorithm skills in a short time?

  1. Use template frameworks, with one consistent style.


This plan is not just a list of problems. For each algorithm topic, it summarizes a framework template. Exercises all follow the same solving process. You learn real problem-solving skill, not rote memorization. So you won’t be stuck on a fixed list—you can solve new problems you have never seen.

  2. Step by step, from easy to hard, and it includes both data structures and algorithms.


A technique A may come from combining technique B and C. If I teach A directly with no background, it will feel hard and mysterious. But if you learn B and C first, you can even derive A by yourself. Then it becomes simple.

For example, many readers fear recursion. I often say: the core of algorithms is brute-force search, and recursion is a classic brute-force method based on tree structure. If you really understand binary trees, you can understand all recursion algorithms. So this plan starts from key data structures, then moves to problems. Build the base first, and practice will become smooth and fast.

  3. A good learning method, with strong tools.


Examples and exercises work together: explain first, then practice. With the problem-solving plugin and visualization panels, we try our best to reduce learning cost and improve efficiency.

**Again: I understand you may be short on time, but don’t try to save time by skipping frameworks and only doing problems.**

If you only do a company list, you rely too much on luck. If you meet the exact same problem, maybe you can write the solution from memory. But if you don’t, you must rely on frameworks. If you never learned them, you will fail. If the foundation is weak, everything falls apart. Spend time early to build the base. In total, it saves time.

Now let’s begin. This Quick Mastery plan has two parts: **Data Structures** and **Algorithm Practice**. The Data Structures part is simpler and mostly has no algorithm problems. The practice part is the key—think carefully and do it by hand.

Suggested time

The suggested time for each article below is a rough and slightly large estimate. It assumes you don’t have much time, and you only study about 1–2 hours per day in small pieces.

So this is only for reference. Real time depends on each person. **If you can study in long, focused blocks, you will be much faster.**

Also, Quick Mastery readers **should not get stuck too hard**. Some things are impossible to invent fully by yourself. In the first pass, focus on understanding and copying. Follow the site’s ideas to build the full knowledge system. When you come back later, many questions will become easy.

## ¶Data Structures

### ¶Arrays and Linked Lists

This introduces basic array and linked list concepts - fairly simple. The main focus is the circular array technique, which allows you to insert and delete elements at the head of an array with O(1)O(1)O(1) time complexity.

Key Foundation, Recommended Time: 1 Day

  * [Array (Sequential Storage) Fundamentals](/en/algo/data-structure-basic/array-basic/)
  * [Linked List (Linked Storage) Fundamentals](/en/algo/data-structure-basic/linkedlist-basic/)


For arrays, there's a classic technique called circular arrays that allows you to insert and delete elements at the head with O(1)O(1)O(1) time complexity.

Key Foundation, Recommended Time: 0.5 Day

  * [Circular Array Technique](/en/algo/data-structure-basic/cycle-array/)


### ¶Queues and Stacks

Queues and stacks are very simple. They're implemented using arrays or linked lists under the hood, but only expose APIs for operating on elements at the head or tail. That's why we often call them restricted-operation data structures.

Key Foundation, Recommended Time: 0.5 Day

  * [Queue/Stack Fundamentals](/en/algo/data-structure-basic/queue-stack-basic/)


### ¶Hash Table Principles and Applications

As a quick mastery course, we can skip the code implementations for the two collision resolution methods, but you must understand the principles of hash tables.

Hash tables can be combined with arrays and doubly linked lists to form more powerful data structures like `LinkedHashMap` and `ArrayHashMap`. These add new capabilities to hash tables. You need to understand how they work so that when you encounter the right use case, you'll know these tools are available.

Key Foundation, Recommended Time: 1-2 Days

  * [Hash Table Core Principles](/en/algo/data-structure-basic/hashmap-basic/)
  * [Enhancing Hash Tables with Linked Lists (LinkedHashMap)](/en/algo/data-structure-basic/hashtable-with-linked-list/)
  * [Enhancing Hash Tables with Arrays (ArrayHashMap)](/en/algo/data-structure-basic/hashtable-with-array/)


### ¶Binary Tree Fundamentals and Traversal

Even though this is just the fundamentals section, you must pay attention to binary trees - **especially binary tree traversal**. It's the key to developing recursive thinking. Once you start solving problems, you'll see that all recursive algorithms are essentially binary tree traversals.

Key Foundation, Recommended Time: 1-2 Days

  * [Binary Tree Fundamentals and Common Types](/en/algo/data-structure-basic/binary-tree-basic/)
  * [Binary Tree Recursive/Level-Order Traversal](/en/algo/data-structure-basic/binary-tree-traverse-basic/)
  * [N-ary Tree Recursive/Level-Order Traversal](/en/algo/data-structure-basic/n-ary-tree-traverse-basic/)
  * [Use Cases for DFS and BFS](/en/algo/data-structure-basic/use-case-of-dfs-bfs/)

Level-Order Traversal: Three Template Approaches

First approach - the simplest:

CC++GoJavaJavaScriptPython
    
    
    void levelOrderTraverse(TreeNode root) {
        if (root == null) {
            return;
        }
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode cur = q.poll();
            // visit the cur node
            System.out.println(cur.val);
    
            // add the left and right children of cur to the queue
            if (cur.left != null) {
                q.offer(cur.left);
            }
            if (cur.right != null) {
                q.offer(cur.right);
            }
        }
    }

Second approach - uses `step` to track level information, more commonly used:

CC++GoJavaJavaScriptPython
    
    
    void levelOrderTraverse(TreeNode root) {
        if (root == null) {
            return;
        }
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        // record the current level being traversed (root node is considered as level 1)
        int depth = 1;
    
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode cur = q.poll();
                // visit the cur node and know its level
                System.out.println("depth = " + depth + ", val = " + cur.val);
    
                // add the left and right children of cur to the queue
                if (cur.left != null) {
                    q.offer(cur.left);
                }
                if (cur.right != null) {
                    q.offer(cur.right);
                }
            }
            depth++;
        }
    }

Third approach - uses a custom `State` class to maintain node information, more complex but most flexible, seen in graph algorithms or complex BFS problems:

CC++GoJavaJavaScriptPython
    
    
    class State {
        TreeNode node;
        int depth;
    
        State(TreeNode node, int depth) {
            this.node = node;
            this.depth = depth;
        }
    }
    
    void levelOrderTraverse(TreeNode root) {
        if (root == null) {
            return;
        }
        Queue<State> q = new LinkedList<>();
        // the path weight sum of the root node is 1
        q.offer(new State(root, 1));
    
        while (!q.isEmpty()) {
            State cur = q.poll();
            // visit the cur node, while knowing its path weight sum
            System.out.println("depth = " + cur.depth + ", val = " + cur.node.val);
    
            // add the left and right child nodes of cur to the queue
            if (cur.node.left != null) {
                q.offer(new State(cur.node.left, cur.depth + 1));
            }
            if (cur.node.right != null) {
                q.offer(new State(cur.node.right, cur.depth + 1));
            }
        }
    }

Key Foundation, Recommended Time: 0.5 Day

Binary search trees are a special type of binary tree. For now, just get a general understanding of their use cases - later exercises will help you master the problem-solving techniques.

  * [Binary Search Tree Applications and Visualization](/en/algo/data-structure-basic/tree-map-basic/)


### ¶Binary Heap Principles

The key application of binary heaps is priority queues. As a quick mastery course, we can skip the implementation details, but you need to understand these key points:

  1. Priority queues are data structures that maintain automatic ordering, with O(log⁡N)O(\log N)O(logN) complexity for insertion and deletion. They're implemented using binary heaps.

  2. Binary heaps are complete binary trees with special properties.

  3. The core operations of priority queues (binary heaps) are `swim` and `sink`, which maintain the heap property.


Key Foundation, Recommended Time: 0.5 Day

  * [Binary Heap Core Principles and Visualization](/en/algo/data-structure-basic/binary-heap-basic/)


### ¶Graph Structures

Graph algorithms are a large topic, but in this fundamentals section, you only need to understand how graphs are logically represented, how they're implemented, and how graph traversal algorithms work.

It's actually not that complex. Graphs are essentially an extension of the binary tree structure we covered earlier. The articles below cover key graph terminology, general implementations, and traversal algorithm templates.

Key Foundation, Recommended Time: 1 Day

  * [Basic Graph Theory Terminology](/en/algo/data-structure-basic/graph-terminology/)
  * [Graph Structure Fundamentals and General Implementation](/en/algo/data-structure-basic/graph-basic/)
  * [Graph DFS/BFS Traversal](/en/algo/data-structure-basic/graph-traverse-basic/)


## ¶Start Solving Problems

Time to start solving problems! If this is your first time using an online coding platform, check out [LeetCode Problem-Solving Guide](/en/algo/intro/leetcode/) to learn the basics of how LeetCode works.

Core Framework, Suggested Time: 0.5 Days

This article serves as the guiding outline for the entire site. It not only summarizes the data structures introduced above but also cuts straight to the essence of all algorithms.

You'll encounter tons of links to other articles throughout. Don't worry if you can't fully grasp everything on your first read—there's no need to get stuck. Just get a general sense of the thinking methods described here, and the insights will click as you work through later content.

  * [A Framework for Learning Data Structures and Algorithms](/en/algo/essential-technique/algorithm-summary/)


### ¶Linked Lists

Linked list problems follow fairly predictable patterns, mostly revolving around two-pointer techniques.

Core Framework, Suggested Time: 1 Day

  * [Two-Pointer Techniques to Solve Seven Linked List Problems](/en/algo/essential-technique/linked-list-skills-summary/)


Exercise, Suggested Time: 1 Day

  * [Classic Linked List Two-Pointer Exercises](/en/algo/problem-set/linkedlist-two-pointers/)


An advanced technique for singly linked lists is recursive manipulation. In practice, this approach is more of an interview talking point—for coding assessments, stick with standard pointer operations.

Core Framework, Suggested Time: 1 Day

  * [How to Check if a Linked List is a Palindrome](/en/algo/data-structure/palindrome-linked-list/)
  * [A Complete Guide to Reversing Linked Lists](/en/algo/data-structure/reverse-linked-list-recursion/)


### ¶Arrays

Array techniques also center on two pointers, but they come in different flavors: fast/slow pointers, left/right pointers, and so on. Classic array two-pointer algorithms include binary search and sliding window.

Some readers have asked why I don't have a dedicated section on string algorithms. The reason is simple: strings are just character arrays, so string algorithms are fundamentally array algorithms.

Core Framework, Suggested Time: 0.5 Days

  * [Two-Pointer Techniques to Solve Seven Array Problems](/en/algo/essential-technique/array-two-pointers-summary/)


Exercise, Suggested Time: 1~2 Days

  * [Creative Traversal Techniques for 2D Arrays](/en/algo/practice-in-action/2d-array-traversal-summary/)
  * [Classic Array Two-Pointer Exercises](/en/algo/problem-set/array-two-pointers/)


Core Framework, Suggested Time: 1 Day

  * [Sliding Window Algorithm Core Template](/en/algo/essential-technique/sliding-window-framework/)

Sliding Window Code Template (Pseudocode)

CC++GoJavaJavaScriptPython
    
    
    // Pseudocode framework of sliding window algorithm
    void slidingWindow(String s) {
        // Use an appropriate data structure to record the data in the
        // window, which can vary according to the specific scenario
        // For example, if I want to record the frequency of
        // elements in the window, I would use a map
        // If I want to record the sum of elements in the window, I could just use an int
        Object window = ...
        
        int left = 0, right = 0;
        while (right < s.length()) {
            // c is the character that will be added to the window
            char c = s[right];
            window.add(c)
            // Expand the window
            right++;
            // Perform a series of updates to the data within the window
            ...
    
            // *** Position of debug output ***
            // Note that in the final solution code, do not use print
            // Because IO operations are time-consuming and may cause timeouts
            printf("window: [%d, %d)\n", left, right);
            // ***********************
    
            // Determine whether the left side of the window needs to shrink
            while (left < right && window needs shrink) {
                // d is the character that will be removed from the window
                char d = s[left];
                window.remove(d)
                // Shrink the window
                left++;
                // Perform a series of updates to the data within the window
                ...
            }
        }
    }

Exercise, Suggested Time: 1 Day

  * [Classic Sliding Window Exercises](/en/algo/problem-set/sliding-window/)


Core Framework, Suggested Time: 1~2 Days

  * [Binary Search Algorithm Core Template](/en/algo/essential-technique/binary-search-framework/)
  * [A Thinking Framework for Applying Binary Search](/en/algo/frequency-interview/binary-search-in-action/)

Three Binary Search Code Templates

CC++GoJavaJavaScriptPython
    
    
    int binary_search(int[] nums, int target) {
        int left = 0, right = nums.length - 1; 
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid - 1; 
            } else if(nums[mid] == target) {
                // return directly
                return mid;
            }
        }
        // return directly
        return -1;
    }
    
    int left_bound(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] == target) {
                // do not return, lock the left boundary
                right = mid - 1;
            }
        }
        // determine if target exists in nums
        if (left < 0 || left >= nums.length) {
            return -1;
        }
        // check if nums[left] is the target
        return nums[left] == target ? left : -1;
    }
    
    int right_bound(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] == target) {
                // do not return, lock the right boundary
                left = mid + 1;
            }
        }
        // since the while loop ends with right == left - 1
        // and we are now looking for the right boundary
        // it's easier to remember to use right instead of left - 1
        if (right < 0 || right >= nums.length) {
            return -1;
        }
        return nums[right] == target ? right : -1;
    }

Core Framework, Suggested Time: 1~2 Days

  * [Elegant Algorithm Technique: Prefix Sum Arrays](/en/algo/data-structure/prefix-sum/)
  * [Elegant Algorithm Technique: Difference Arrays](/en/algo/data-structure/diff-array/)

Prefix Sum Array Code Template

1D Prefix Sum:

CC++GoJavaJavaScriptPython
    
    
    class NumArray {
        // prefix sum array
        private int[] preSum;
    
        // input an array to construct the prefix sum
        public NumArray(int[] nums) {
            // preSum[0] = 0, to facilitate the calculation of accumulated sums
            preSum = new int[nums.length + 1];
            // calculate the accumulated sums of nums
            for (int i = 1; i < preSum.length; i++) {
                preSum[i] = preSum[i - 1] + nums[i - 1];
            }
        }
    
        // query the sum of the closed interval [left, right]
        public int sumRange(int left, int right) {
            return preSum[right + 1] - preSum[left];
        }
    }

2D Prefix Sum:

CC++GoJavaJavaScriptPython
    
    
    class NumMatrix {
        // preSum[i][j] records the sum of elements in the matrix [0, 0, i-1, j-1]
        private int[][] preSum;
    
        public NumMatrix(int[][] matrix) {
            int m = matrix.length, n = matrix[0].length;
            if (m == 0 || n == 0) return;
            // construct the prefix sum matrix
            preSum = new int[m + 1][n + 1];
            for (int i = 1; i <= m; i++) {
                for (int j = 1; j <= n; j++) {
                    // calculate the sum of elements for each matrix [0, 0, i, j]
                    preSum[i][j] = preSum[i-1][j] + preSum[i][j-1] + matrix[i - 1][j - 1] - preSum[i-1][j-1];
                }
            }
        }
    
        // calculate the sum of elements in the submatrix [x1, y1, x2, y2]
        public int sumRegion(int x1, int y1, int x2, int y2) {
            // the sum of the target matrix is obtained by operations on four adjacent matrices
            return preSum[x2+1][y2+1] - preSum[x1][y2+1] - preSum[x2+1][y1] + preSum[x1][y1];
        }
    }

Difference Array Code Template

CC++GoJavaJavaScriptPython
    
    
    // Difference Array Utility Class
    class Difference {
        // difference array
        private int[] diff;
        
        // input an initial array, range operations will be performed on this array
        public Difference(int[] nums) {
            diff = new int[nums.length];
            // construct the difference array based on the initial array
            diff[0] = nums[0];
            for (int i = 1; i < nums.length; i++) {
                diff[i] = nums[i] - nums[i - 1];
            }
        }
    
        // increment the closed interval [i, j] by val (can be negative)
        public void increment(int i, int j, int val) {
            diff[i] += val;
            if (j + 1 < diff.length) {
                diff[j + 1] -= val;
            }
        }
    
        // return the result array
        public int[] result() {
            int[] res = new int[diff.length];
            // construct the result array based on the difference array
            res[0] = diff[0];
            for (int i = 1; i < diff.length; i++) {
                res[i] = res[i - 1] + diff[i];
            }
            return res;
        }
    }

### ¶Queues/Stacks

Queues and stacks are relatively simple data structures on their own, but using them effectively in algorithm problems takes dedicated practice.

Core Framework, Suggested Time: 0.5 Days

  * [Implementing a Stack with Queues and Vice Versa](/en/algo/data-structure/stack-queue/)


Exercise, Suggested Time: 1~2 Days

  * [Classic Stack Exercises](/en/algo/problem-set/stack/)
  * [Classic Queue Exercises](/en/algo/problem-set/queue/)


Monotonic stacks and monotonic queues are variants of stacks and queues that can solve certain specialized problems. You need to know these.

Core Framework, Suggested Time: 1~2 Days

  * [Monotonic Stack Template with Three Example Problems](/en/algo/data-structure/monotonic-stack/)
  * [Using Monotonic Queues to Solve Sliding Window Problems](/en/algo/data-structure/monotonic-queue/)


Exercise, Suggested Time: 1~2 Days

  * [Monotonic Stack Variants and Classic Exercises](/en/algo/problem-set/monotonic-stack/)


### ¶Binary Trees & Recursive Thinking

At their core, all recursive algorithms are essentially binary tree traversals. Binary tree problems also show up frequently in interviews and coding assessments, so I've included extra articles in this section. Please study them carefully and practice hands-on.

Core Framework, Suggested Time: 0.5 Days

This article uses a few simple classic problems to help you understand all recursive algorithms from a tree perspective, and categorizes them into two thinking patterns.

  * [One Perspective + Two Thinking Patterns to Master Recursion](/en/algo/essential-technique/understand-recursion/)


Core Framework, Suggested Time: 1 Day

This core outline covers two main parts: the first part explains how to understand preorder, inorder, and postorder positions in binary trees when solving actual problems; the second part introduces algorithms like backtracking and dynamic programming from a binary tree perspective.

Since you already know binary tree traversal, focus on the first part. The second part covers advanced algorithms you haven't learned yet—just get a general impression for now. Once you've studied backtracking and dynamic programming later, come back to this article for a much deeper understanding.

  * [Core Outline for Binary Tree Algorithms](/en/algo/essential-technique/binary-tree-summary/)


Core Framework, Suggested Time: 2~3 Days

The example problems in these tutorials are must-know classic binary tree questions. Study and master them.

  * [Binary Tree Essentials (Thinking)](/en/algo/data-structure/binary-tree-part1/)
  * [Binary Tree Essentials (Construction)](/en/algo/data-structure/binary-tree-part2/)
  * [Binary Tree Essentials (Serialization)](/en/algo/data-structure/serialize-and-deserialize-binary-tree/)


Exercise, Suggested Time: 1 Day

  * [Extension: Lowest Common Ancestor Problem-Solving Framework](/en/algo/practice-in-action/lowest-common-ancestor-summary/)
  * [Extension: How to Count Nodes in a Complete Binary Tree](/en/algo/data-structure/count-complete-tree-nodes/)


Exercise, Suggested Time: 2 Days

I can't stress enough how important binary tree problems are. The essence of algorithms is enumeration, and tree structures are the core abstraction behind all brute-force enumeration algorithms. Once you've mastered binary trees, the advanced algorithms that follow will be much easier to grasp.

This site's [Binary Tree Exercise Collection](/en/algo/intro/binary-tree-practice/) dedicates an entire chapter to practicing binary tree algorithms. Following the classification in [Binary Tree Algorithms (Outline)](/en/algo/essential-technique/binary-tree-summary/), the exercises are divided into three main parts:

  1. Recursive solutions using the "traversal" thinking pattern.

  2. Recursive solutions using the "decompose the problem" thinking pattern.

  3. Non-recursive solutions using the "level-order traversal" thinking pattern.


The "traversal" pattern is the prototype for DFS and backtracking algorithms covered later. The "decompose the problem" pattern is the prototype for dynamic programming and divide-and-conquer. "Level-order traversal" is the prototype for BFS.

So it's essential to practice these types of binary tree algorithms. The [Binary Tree Exercise Collection](/en/algo/intro/binary-tree-practice/) is quite large, so here are just the moderately difficult, high-frequency exercises for Quick Mastery readers:

  * [Solving Problems with "Traversal" Thinking I](/en/algo/problem-set/binary-tree-traverse-i/)
  * [Solving Problems with "Decompose the Problem" Thinking I](/en/algo/problem-set/binary-tree-divide-i/)
  * [Solving Problems with Level-Order Traversal I](/en/algo/problem-set/binary-tree-level-i/)


If you have the time and interest, feel free to explore the other exercise chapters on your own.

### ¶Binary Search Trees

A binary search tree (BST) is a special type of binary tree. The key thing to remember is its property: "left is smaller, right is larger." Make good use of this property to optimize your tree traversal.

Core Framework, Suggested Time: 1~2 Days

  * [BST Essentials (Properties)](/en/algo/data-structure/bst-part1/)
  * [BST Essentials (Basic Operations)](/en/algo/data-structure/bst-part2/)


Core Framework, Suggested Time: 1 Day

  * [BST Essentials (Construction)](/en/algo/data-structure/bst-part3/)


### ¶Trie (Prefix Tree)

Tries are purpose-built for string-related problems. Their special abilities include fast string prefix matching, wildcard matching, prefix-based counting, and more. A trie is essentially a special kind of N-ary tree—once you understand N-ary tree traversal, you can handle tries with ease.

Core Framework, Suggested Time: 1~2 Days

  * [Trie Fundamentals](/en/algo/data-structure-basic/trie-map-basic/)
  * [Trie Implementation](/en/algo/data-structure/trie-implement/)


### ¶Data Structure Design

LRU is a classic data structure design problem that you must master. LFU is harder and can be treated as optional.

Exercise, Suggested Time: 1 Day

  * [Algorithms Are Like LEGO: Building an LRU Cache from Scratch](/en/algo/data-structure/lru-cache/)


Exercise, Suggested Time: 1 Day

Implementing a calculator is a classic data structure design problem. If you're short on time, save the calculator code provided at the end—if you encounter a string calculation problem on a coding assessment, you can copy and paste it directly.

  * [Extension: How to Implement a Calculator](/en/algo/data-structure/implement-calculator/)

General-Purpose Calculator Implementation

CC++GoJavaJavaScriptPython
    
    
    class Solution {
        public int calculate(String s) {
            // key is the index of the left parenthesis, value is the
            // corresponding index of the right parenthesis
            Map<Integer, Integer> rightIndex = new HashMap<>();
            // use stack structure to find the corresponding parentheses
            Stack<Integer> stack = new Stack<>();
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '(') {
                    stack.push(i);
                } else if (s.charAt(i) == ')') {
                    rightIndex.put(stack.pop(), i);
                }
            }
            return _calculate(s, 0, s.length() - 1, rightIndex);
        }
    
        // Definition: return the result of the expression within s[start..end]
        private int _calculate(String s, int start, int end, Map<Integer, Integer> rightIndex) {
            // need to convert the string to a deque for easy operation
            Stack<Integer> stk = new Stack<>();
            // record the number in the formula
            int num = 0;
            // record the sign before num, initialized to +
            char sign = '+';
            for (int i = start; i <= end; i++) {
                char c = s.charAt(i);
                if (Character.isDigit(c)) {
                    num = 10 * num + (c - '0');
                }
                if (c == '(') {
                    // recursively calculate the expression inside the parentheses
                    num = _calculate(s, i + 1, rightIndex.get(i) - 1, rightIndex);
                    i = rightIndex.get(i);
                }
                if (c == '+' || c == '-' || c == '*' || c == '/' || i == end) {
                    int pre;
                    switch (sign) {
                        case '+':
                            stk.push(num);
                            break;
                        case '-':
                            stk.push(-num);
                            break;
                        // just take out the previous number and perform
                        // the corresponding operation
                        case '*':
                            pre = stk.pop();
                            stk.push(pre * num);
                            break;
                        case '/':
                            pre = stk.pop();
                            stk.push(pre / num);
                            break;
                    }
                    // update the sign to the current sign, reset the number to zero
                    sign = c;
                    num = 0;
                }
            }
            // sum all results in the stack to get the answer
            int res = 0;
            while (!stk.isEmpty()) {
                res += stk.pop();
            }
            return res;
        }
    }

Exercise, Suggested Time: 1 Day

  * [More Classic Design Exercises](/en/algo/problem-set/ds-design/)


### ¶Graph Algorithms

Cycle detection, topological sorting, and bipartite graph checking are classic graph algorithms. They're essentially just graph traversals and aren't hard to master.

Core Framework, Suggested Time: 1~2 Days

  * [Cycle Detection Algorithm](/en/algo/data-structure/cycle-detection/)
  * [Topological Sort Algorithm](/en/algo/data-structure/topological-sort/)
  * [Bipartite Graph Detection Algorithm](/en/algo/data-structure/bipartite-graph/)


Union Find is a highly practical graph algorithm. You need to understand its principles and API.

I'd suggest saving the `UF` class provided at the end ahead of time. If your coding assessment allows an IDE, you can reuse it directly.

Core Framework, Suggested Time: 1 Day

  * [Union Find Fundamentals](/en/algo/data-structure-basic/union-find-basic/)
  * [Union-Find Algorithm](/en/algo/data-structure/union-find/)

Union Find Code Template

Here's the most efficient implementation using path compression:

CC++GoJavaJavaScriptPython
    
    
    class UF {
        // the number of connected components
        private int count;
        // store the parent of each node
        private int[] parent;
    
        // n is the number of nodes in the graph
        public UF(int n) {
            this.count = n;
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }
        
        // connect node p and node q
        public void union(int p, int q) {
            int rootP = find(p);
            int rootQ = find(q);
            
            if (rootP == rootQ)
                return;
            
            parent[rootQ] = rootP;
            // merge two connected components into one
            count--;
        }
    
        // determine if node p and node q are connected
        public boolean connected(int p, int q) {
            int rootP = find(p);
            int rootQ = find(q);
            return rootP == rootQ;
        }
    
        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
    
        // return the number of connected components in the graph
        public int count() {
            return count;
        }
    }

Minimum spanning tree is another practical graph algorithm. You need to understand its definition and use cases.

Kruskal's and Prim's are two classic minimum spanning tree algorithms. Kruskal's algorithm is essentially Union Find + sorting, which makes it relatively straightforward. For Quick Mastery readers, knowing Kruskal's algorithm is sufficient.

Core Framework, Suggested Time: 1 Day

  * [Minimum Spanning Tree Overview](/en/algo/data-structure-basic/graph-minimum-spanning-tree/)
  * [Kruskal's Minimum Spanning Tree Algorithm](/en/algo/data-structure/kruskal/)


Shortest path problems in graphs are a classic category of algorithm problems. This article explains the difference between single-source and multi-source shortest path algorithms, and outlines several classic shortest path approaches:

Core Framework, Suggested Time: 0.5 Days

  * [Graph Shortest Path Algorithms Overview](/en/algo/data-structure-basic/graph-shortest-path/)


Dijkstra's single-source shortest path algorithm is a commonly used graph algorithm that you must know. It's essentially an enhanced version of BFS on a binary tree. Save the template so you can quickly apply it during coding assessments.

Core Framework, Suggested Time: 1 Day

  * [Dijkstra's Algorithm Template](/en/algo/data-structure/dijkstra/)
  * [Dijkstra Extension: Shortest Path with Constraints](/en/algo/data-structure/dijkstra-follow-up/)
  * [Dijkstra's Algorithm Exercises](/en/algo/problem-set/dijkstra/)

Dijkstra's Algorithm Template (Pseudocode)

CC++GoJavaJavaScriptPython
    
    
    class State {
        // Current node ID
        int node;
        // Minimum path weight from the start node s to the current node
        int distFromStart;
    
        public State(int node, int distFromStart) {
            this.node = node;
            this.distFromStart = distFromStart;
        }
    }
    
    // Input the weighted graph (without negative weight edges) graph and the starting node src
    // Return the minimum path weight from the starting node src to other nodes
    int[] dijkstra(Graph graph, int src) {
        // Record the minimum path weight from the starting node src to other nodes
        // distTo[i] represents the minimum path weight from the starting node src to node i
        int[] distTo = new int[graph.size()];
        // Initialize all values to positive infinity, representing not calculated
        Arrays.fill(distTo, Integer.MAX_VALUE);
    
        // Priority queue, nodes with smaller distFromStart are in front
        Queue<State> pq = new PriorityQueue<>((a, b) -> {
            return a.distFromStart - b.distFromStart;
        });
    
        // Start BFS from the starting node src
        pq.offer(new State(src, 0));
        distTo[src] = 0;
    
        while (!pq.isEmpty()) {
            State state = pq.poll();
            int curNode = state.node;
            int curDistFromStart = state.distFromStart;
    
            if (distTo[curNode] < curDistFromStart) { // [!code highlight:5]
                // In Dijkstra's algorithm, the queue may contain duplicate nodes state
                // So it is necessary to check when the element leaves the
                // queue to remove the worse duplicate nodes
                continue;
            }
    
            for (Edge e : graph.neighbors(curNode)) {
                int nextNode = e.to;
                int nextDistFromStart = curDistFromStart + e.weight;
    
                if (distTo[nextNode] <= nextDistFromStart) {
                    continue;
                }
    
                // [!code highlight:6]
                // Add nextNode node to the priority queue
                pq.offer(new State(nextNode, nextDistFromStart));
                // Record the minimum path weight from the starting node to the nextNode node
                distTo[nextNode] = nextDistFromStart;
            }
        }
    
        return distTo;
    }

### ¶DFS / Backtracking

Backtracking is a pure brute-force search algorithm. You must learn it.

In written tests, your score is based on how many test cases you pass. If you cannot write the best solution for some problems, you can write a backtracking brute-force solution. It may not pass all test cases, but it can still pass some and get you some points.

The example problems in the articles below are classic backtracking problems. They are must-know topics. You should learn them well.

Core framework, suggested time: 1–2 days

  * [Backtracking Problem-Solving Framework](/en/algo/essential-technique/backtrack-framework/)
  * [Backtracking Practice: Sudoku and N-Queens](/en/algo/practice-in-action/sudoku-nqueue/)


Core framework, suggested time: 1–2 days

  * [Solve All Permutation / Combination / Subset Problems with Backtracking](/en/algo/essential-technique/permutation-combination-subset-all-in-one/)


Core framework, suggested time: 1 day

This article is about the DFS algorithm:

  * [Solve All Island Problems in One Article](/en/algo/frequency-interview/island-dfs-summary/)


DFS and backtracking are a little different. This article explains the difference and gives some coding style tips:

  * [Answering Common Questions About DFS and Backtracking](/en/algo/essential-technique/backtrack-vs-dfs/)


Exercises, suggested time: 2 days

Most backtracking problems are basically about permutations and combinations. If you fully understand [Solve All Permutation / Combination / Subset Problems with Backtracking](/en/algo/essential-technique/permutation-combination-subset-all-in-one/), you can solve many backtracking problems very fast.

The backtracking exercise chapters on this site:

  * [Classic Backtracking Exercises I](/en/algo/problem-set/backtrack-i/)
  * [Classic Backtracking Exercises II](/en/algo/problem-set/backtrack-ii/)
  * [Classic Backtracking Exercises III](/en/algo/problem-set/backtrack-iii/)


There are many problems in these exercise chapters. If you have time, you can read them all. If you are short on time, I picked a few for you. It is recommended to install the [Chrome extension](/en/algo/intro/chrome/). On each problem page, you can see this site’s ideas and solution code:

LeetCode| Difficulty  
---|---  
[967\. Numbers With Same Consecutive Differences](https://leetcode.com/problems/numbers-with-same-consecutive-differences/)|   
[491\. Non-decreasing Subsequences](https://leetcode.com/problems/non-decreasing-subsequences/)|   
[980\. Unique Paths III](https://leetcode.com/problems/unique-paths-iii/)|   
[131\. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)|   
[93\. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)|   
[17\. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)|   
[79\. Word Search](https://leetcode.com/problems/word-search/)|   
  
### ¶BFS

BFS is also a brute-force search algorithm. You must learn it. It is basically level-order traversal of a binary tree, and it is good for shortest path problems.

Core framework, suggested time: 1 day

  * [BFS Problem-Solving Framework](/en/algo/essential-technique/bfs-framework/)


Exercises, suggested time: 2 days

The BFS exercise chapters on this site:

  * [Classic BFS Exercises I](/en/algo/problem-set/bfs/)
  * [Classic BFS Exercises II](/en/algo/problem-set/bfs-ii/)


These two chapters have many problems. If you have time, you can finish them all. If you are short on time, I picked a few for you to practice. It is recommended to install the [Chrome extension](/en/algo/intro/chrome/). On each problem page, you can see this site’s ideas and solution code:

LeetCode| Difficulty  
---|---  
[919\. Complete Binary Tree Inserter](https://leetcode.com/problems/complete-binary-tree-inserter/)|   
[841\. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)|   
[433\. Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/)|   
[1926\. Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)|   
[1091\. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)|   
[994\. Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)|   
[721\. Accounts Merge](https://leetcode.com/problems/accounts-merge/)|   
[127\. Word Ladder](https://leetcode.com/problems/word-ladder/)|   
[365\. Water and Jug Problem](https://leetcode.com/problems/water-and-jug-problem/)|   
  
### ¶Dynamic Programming

Dynamic programming is also brute-force at its core. The difference is that some problems have overlapping subproblems during brute-force search, so we can optimize with a memo.

The brute-force solution for dynamic programming is usually written with recursion. The optimization is very fixed: either add a memo, or rewrite it as an iterative solution.

The hard part of dynamic programming is how to write the brute-force part (the state transition). Please read the articles below, and pay special attention to how the state transition is derived.

Core framework, suggested time: 1–2 days

  * [Dynamic Programming Framework](/en/algo/essential-technique/dynamic-programming-framework/)
  * [DP Design: Longest Increasing Subsequence](/en/algo/dynamic-programming/longest-increasing-subsequence/)


Core framework, suggested time: 1–2 days

  * [How to Set the base case and Initial Memo Values?](/en/algo/dynamic-programming/memo-fundamental/)
  * [Optimal Substructure and DP Array Traversal Order](/en/algo/dynamic-programming/faq-summary/)


Exercises, suggested time: 1–2 days

  * [Classic DP: Edit Distance](/en/algo/dynamic-programming/edit-distance/)
  * [DP Design: Maximum Subarray](/en/algo/dynamic-programming/maximum-subarray/)
  * [Classic DP: Longest Common Subsequence](/en/algo/dynamic-programming/longest-common-subsequence/)


Exercises, suggested time: 1–2 days

  * [Classic DP: 0-1 Knapsack](/en/algo/dynamic-programming/knapsack1/)
  * [Classic DP: Subset Knapsack](/en/algo/dynamic-programming/knapsack2/)
  * [Classic DP: Complete Knapsack](/en/algo/dynamic-programming/knapsack3/)


### ¶Greedy

For many algorithm problems, you need brute-force search of all solutions, then pick the best one.

But for some problems, if you use the information well, you can find the best solution without trying all solutions. This is called the greedy choice property, and this kind of algorithm is called a greedy algorithm.

So greedy does not have a fixed template. The key is careful observation: see if you can use more information to rule out cases that cannot be optimal.

Core framework, suggested time: 1 day

  * [Greedy Algorithm: Principles and Applications](/en/algo/essential-technique/greedy/)


### ¶Divide and Conquer

For some problems, divide and conquer can be more efficient. The example problem in the article below is a linked list problem that was mentioned earlier.

Core framework, suggested time: 1 day

  * [Divide and Conquer Explained](/en/algo/essential-technique/divide-and-conquer/)


### ¶Math

In written tests, math-related algorithms are not very common. But some classic tricks are still worth learning.

Exercises, suggested time: 1–2 days

  * [Algorithm Problems Solved with One Line of Code](/en/algo/frequency-interview/one-line-solutions/)
  * [Random Algorithms in Games](/en/algo/frequency-interview/random-algorithm/)


Exercises, suggested time: 1 day

  * [How to Find Prime Numbers Efficiently](/en/algo/frequency-interview/print-prime-number/)
  * [Must-Know Math Tricks](/en/algo/essential-technique/math-techniques-summary/)


### ¶Other Classic Interview Problems

Here are some classic algorithm problems. They are basically applications of the algorithms above. After you master all the algorithms above, you should be able to solve interview problems of normal difficulty.

Exercises, suggested time: 1–2 days

  * [Scanline Trick: Meeting Rooms](/en/algo/frequency-interview/scan-line-technique/)
  * [How to Solve Trapping Rain Water Efficiently](/en/algo/frequency-interview/trapping-rain-water/)
  * [Solve All Ugly Number Series Problems in One Article](/en/algo/frequency-interview/ugly-number-summary/)


Exercises, suggested time: 1–2 days

  * [Weighted Random Pick Algorithm](/en/algo/frequency-interview/random-pick-with-weight/)
  * [One Method to Solve All nSum Problems](/en/algo/practice-in-action/nsum/)

Universal nSum Function

CC++GoJavaJavaScriptPython
    
    
    // Note: you must sort the nums array before calling this function
    // n is the sum of how many numbers you want to find, start is the index to start
    // calculation (usually fill in 0), target is the target sum you want to achieve
    List<List<Integer>> nSumTarget(int[] nums, int n, int start, long target) {
        int sz = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        // at least it should be 2Sum, and the array size should not be less than n
        if (n < 2 || sz < n) return res;
        // 2Sum is the base case
        if (n == 2) {
            // the operation with two pointers
            int lo = start, hi = sz - 1;
            while (lo < hi) {
                int sum = nums[lo] + nums[hi];
                int left = nums[lo], right = nums[hi];
                if (sum < target) {
                    while (lo < hi && nums[lo] == left) lo++;
                } else if (sum > target) {
                    while (lo < hi && nums[hi] == right) hi--;
                } else {
                    res.add(new ArrayList<>(Arrays.asList(left, right)));
                    while (lo < hi && nums[lo] == left) lo++;
                    while (lo < hi && nums[hi] == right) hi--;
                }
            }
        } else {
            // when n > 2, recursively calculate the result of (n-1)Sum
            for (int i = start; i < sz; i++) {
                List<List<Integer>> sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
                for (List<Integer> arr : sub) {
                    // (n-1)Sum plus nums[i] is nSum
                    arr.add(nums[i]);
                    res.add(arr);
                }
                while (i < sz - 1 && nums[i] == nums[i + 1]) i++;
            }
        }
        return res;
    }

### ¶Sorting Algorithms

In written tests and interviews, you usually will not be asked to write sorting code. But in interviews, you may be asked about the principles, time complexity, and use cases of classic sorting algorithms. So you should know the ten classic sorting algorithms.

Sorting overview, suggested time: 1 day

It is recommended to watch the video in [Guide to Ten Sorting Algorithms](/en/algo/intro/sorting/) to learn the core ideas, complexity analysis, and use cases of the ten classic sorting algorithms.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
