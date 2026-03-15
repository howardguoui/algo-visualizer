# Binary Tree in Action (Post-order)

> Source: https://labuladong.online/algo/en/data-structure/binary-tree-part3/
> Archived: labuladong.online

---

# Binary Tree in Action (Post-order)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[652\. Find Duplicate Subtrees](<https://leetcode.com/problems/find-duplicate-subtrees/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Binary Tree Structure Basics](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Binary Tree DFS/BFS Traversal](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Binary Tree Principles (Summary)](</en/algo/essential-technique/binary-tree-summary/>)

This article is the fourth in the series after [Binary Tree Principles (Summary)](</en/algo/essential-technique/binary-tree-summary/>). It mainly talks about the special usage of the postorder position in binary trees. Let me repeat what was said before about postorder traversal:

> Code in the preorder position can only get data passed from the parent node through function parameters. But code in the postorder position can get both parameter data and data returned from the left and right subtrees through the function return values.
> 
> **In other words, if you notice that the problem is related to subtrees, you probably need to set a suitable function definition and return value, and write code in the postorder position.**

Let’s look at an example. This is LeetCode problem 652 "[Find Duplicate Subtrees](<https://leetcode.com/problems/find-duplicate-subtrees/>)":

**652\. Find Duplicate Subtrees** |[LeetCode](<https://leetcode.com/problems/find-duplicate-subtrees/>)

Given the `root` of a binary tree, return all **duplicate subtrees**.

For each kind of duplicate subtrees, you only need to return the root node of any **one** of them.

Two trees are **duplicate** if they have the **same structure** with the **same node values**.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e1.jpg)

```
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
``` 

**Example 2:**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e2.jpg)

```
Input: root = [2,1,1]
Output: [[1]]
``` 

**Example 3:**

![diagram](https://labuladong.online/images/lc/uploads/2020/08/16/e33.jpg)

```
Input: root = [2,2,2,3,null,3,null]
Output: [[2,3],[3]]
``` 

**Constraints:**

  * The number of the nodes in the tree will be in the range `[1, 5000]`
  * `-200 <= Node.val <= 200`

The problem is from [LeetCode 652. Find Duplicate Subtrees](<https://leetcode.com/problems/find-duplicate-subtrees/>).

```python
# The function signature is as follows
def findDuplicateSubtrees(self, root: TreeNode) -> List[TreeNode]:
``` 

Let me explain the problem simply. The input is the root node `root` of a binary tree. You need to return a list containing several tree nodes. Each of these nodes is the root of a subtree that appears more than once in the original binary tree.

It may sound a bit confusing. Let’s look at an example. The input is this binary tree:

![diagram](https://labuladong.online/images/algo/binary-tree-iii/1.png)

First, the node with value 4 itself can be seen as a subtree. There are several nodes with value 4 in the tree:

![diagram](https://labuladong.online/images/algo/binary-tree-iii/2.png)

Similarly, there are two duplicate subtrees with root value 2:

![diagram](https://labuladong.online/images/algo/binary-tree-iii/3.png)

So, in the `List` we return, there should be two `TreeNode`, with values 4 and 2. (It doesn’t matter which specific nodes.)

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
