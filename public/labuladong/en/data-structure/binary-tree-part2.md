# Binary Tree in Action (Construction)

> Source: https://labuladong.online/algo/en/data-structure/binary-tree-part2/
> Archived: labuladong.online

---

# Binary Tree in Action (Construction)

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[654\. Maximum Binary Tree](<https://leetcode.com/problems/maximum-binary-tree/>)|   
[105\. Construct Binary Tree from Preorder and Inorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/>)|   
[106\. Construct Binary Tree from Inorder and Postorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/>)|   
[889\. Construct Binary Tree from Preorder and Postorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/>)|   
  
Prerequisite Knowledge

Before reading this article, you should first learn:

  * [Basics of Binary Tree Structure](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [DFS/BFS Traversal of Binary Trees](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [Binary Tree Key Ideas (Overview)](</en/algo/essential-technique/binary-tree-summary/>)

This article follows [Binary Tree Key Ideas (Overview)](</en/algo/essential-technique/binary-tree-summary/>). Let's review the main points for solving binary tree problems:

Note

There are two main ways to solve binary tree problems:

**1\. Can you get the answer by traversing the binary tree once?** If yes, use a `traverse` function with external variables. This is called the "traversal" approach.

**2\. Can you define a recursive function that uses the answers of subproblems (subtrees) to get the answer of the original problem?** If yes, write this recursive function and use its return value. This is the "divide and conquer" approach.

No matter which way you use, you should think about:

**If you take out a single tree node, what should it do? When should it do it (preorder, inorder, postorder)?** You don't need to worry about other nodes. The recursive function will handle all nodes for you.

The first article [Binary Tree Key Ideas (Thinking)](</en/algo/data-structure/binary-tree-part1/>) talked about the "traversal" and "divide and conquer" approaches. This article explains construction problems for binary trees.

**Most binary tree construction problems use the "divide and conquer" idea: build the whole tree = root node + build left subtree + build right subtree.**

Let's look at some problems.

## Construct Maximum Binary Tree

Let's start with an easy one. This is LeetCode 654 "[Maximum Binary Tree](<https://leetcode.com/problems/maximum-binary-tree/>)". Here is the problem:

**654\. Maximum Binary Tree** |[LeetCode](<https://leetcode.com/problems/maximum-binary-tree/>)

You are given an integer array `nums` with no duplicates. A **maximum binary tree** can be built recursively from `nums` using the following algorithm:

  1. Create a root node whose value is the maximum value in `nums`.
  2. Recursively build the left subtree on the **subarray prefix** to the **left** of the maximum value.
  3. Recursively build the right subtree on the **subarray suffix** to the **right** of the maximum value.

Return _the**maximum binary tree** built from _`nums`.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2020/12/24/tree1.jpg)

```
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
        - Empty array, so no child.
        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
            - Empty array, so no child.
            - Only one element, so child is a node with value 1.
    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
        - Only one element, so child is a node with value 0.
        - Empty array, so no child.
``` 

**Example 2:**

![diagram](https://labuladong.online/images/lc/uploads/2020/12/24/tree2.jpg)

```
Input: nums = [3,2,1]
Output: [3,null,2,null,1]
``` 

**Constraints:**

  * `1 <= nums.length <= 1000`
  * `0 <= nums[i] <= 1000`
  * All integers in `nums` are **unique**.

The problem is from [LeetCode 654. Maximum Binary Tree](<https://leetcode.com/problems/maximum-binary-tree/>).

```python
# The function signature is as follows
def constructMaximumBinaryTree(nums: List[int]) -> TreeNode:
``` 

Each binary tree node can be seen as the root of a subtree. For the root, we first need to build the root itself, then build its left and right subtrees.

So, we scan the array to find the maximum value `maxVal`. This becomes the root node `root`. Then, we recursively build the left subtree with the subarray to the left of `maxVal`, and the right subtree with the subarray to the right.

For example, if the input is `[3,2,1,6,0,5]`, the root does this:

```python
def constructMaximumBinaryTree([3,2,1,6,0,5]) -> TreeNode:
    # find the maximum value in the array
    root = TreeNode(6)
    # recursively construct the left and right subtrees
    root.left = constructMaximumBinaryTree([3,2,1])
    root.right = constructMaximumBinaryTree([0,5])
    return root

# the current maximum value in nums is the root node, then recursively
# construct the left and right subtrees based on the indices of the subarrays
# in more detail, the pseudocode is as follows
def constructMaximumBinaryTree(nums: List[int]) -> TreeNode:
    if not nums: 
        return None

    # find the maximum value in the array
    maxVal = max(nums)
    index = nums.index(maxVal)

    root = TreeNode(maxVal)
    # recursively construct the left and right subtrees
    root.left = constructMaximumBinaryTree(nums[:index])
    root.right = constructMaximumBinaryTree(nums[index+1:])
    return root
``` 

**The maximum value in`nums` is the root. Then, recursively build the left and right subtrees using the left and right parts of the array.**

With this idea, let's write a helper function `build` to control the indices:

```python
class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        return self.build(nums, 0, len(nums) - 1)

    # Definition: Construct the tree that meets the
    # requirements from nums[lo..hi] and return the root node
    def build(self, nums: List[int], lo: int, hi: int) -> TreeNode:
        # base case
        if lo > hi:
            return None

        # Find the maximum value in the array and its corresponding index
        index = -1
        maxVal = float('-inf')
        for i in range(lo, hi + 1):
            if maxVal < nums[i]:
                index = i
                maxVal = nums[i]

        # First, construct the root node
        root = TreeNode(maxVal)
        # Recursively construct the left and right subtrees
        root.left = self.build(nums, lo, index - 1)
        root.right = self.build(nums, index + 1, hi)
        
        return root
``` 

Algorithm Visualization

That's it for this problem. It's pretty simple. Now let's look at two harder problems.

## Build a Binary Tree from Preorder and Inorder Traversal

LeetCode problem 105 “[Construct Binary Tree from Preorder and Inorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/>)” is a classic question often asked in interviews and written tests:

**105\. Construct Binary Tree from Preorder and Inorder Traversal** |[LeetCode](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/>)

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return _the binary tree_.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2021/02/19/tree.jpg)

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
``` 

**Example 2:**

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
``` 

**Constraints:**

  * `1 <= preorder.length <= 3000`
  * `inorder.length == preorder.length`
  * `-3000 <= preorder[i], inorder[i] <= 3000`
  * `preorder` and `inorder` consist of **unique** values.
  * Each value of `inorder` also appears in `preorder`.
  * `preorder` is **guaranteed** to be the preorder traversal of the tree.
  * `inorder` is **guaranteed** to be the inorder traversal of the tree.

The problem is from [LeetCode 105. Construct Binary Tree from Preorder and Inorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/>).

```python
# the function signature is as follows
def buildTree(preorder: List[int], inorder: List[int]):
``` 

Let’s get straight to the main idea. First, think about what the root node should do.

**Like the previous question, we need to find the value of the root node, build the root, and then use recursion to build the left and right subtrees.**

First, let’s review the characteristics of preorder and inorder traversal results.

```python
def traverse(root):
    if not root:
        return
    # pre-order traversal
    preorder.append(root.val)
    traverse(root.left)
    traverse(root.right)

def traverse(root):
    if not root:
        return
    traverse(root.left)
    # in-order traversal
    inorder.append(root.val)
    traverse(root.right)
``` 

In the article [Binary Tree Frameworks](</en/algo/data-structure/flatten-nested-list-iterator/>), we discussed how different traversal orders affect the arrangement of elements in the `preorder` and `inorder` arrays:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/1.jpeg)

It’s easy to find the root node; the first value in preorder, `preorder[0]`, is the root.

The key is how to use the root value to split the `preorder` and `inorder` arrays and build the left and right subtrees.

In other words, what should be put in the `?` parts of the following code:

```python
def buildTree(preorder, inorder):
    # According to the function definition, use
    # preorder and inorder to construct the binary tree
    return build(preorder, 0, len(preorder) - 1,
                inorder, 0, len(inorder) - 1)

# Definition of build function:
# If the preorder traversal array is preorder[preStart..preEnd],
# and the inorder traversal array is inorder[inStart..inEnd],
# construct the binary tree and return its root node
def build(preorder, preStart, preEnd, 
            inorder, inStart, inEnd):
    # The value of the root node is the first element in the preorder traversal array
    rootVal = preorder[preStart]
    # The index of rootVal in the inorder traversal array
    index = 0
    for i in range(inStart, inEnd + 1):
        if inorder[i] == rootVal:
            index = i
            break

    root = TreeNode(rootVal)
    # Recursively construct the left and right subtrees
    root.left = build(preorder, ?, ?,
                    inorder, ?, ?)

    root.right = build(preorder, ?, ?,
                    inorder, ?, ?)
    return root
``` 

In the code, the variables `rootVal` and `index` correspond to this situation:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/2.jpeg)

Some readers may notice that using a for loop to find `index` is not very efficient. It can be improved.

Since the values in the tree are unique, we can use a HashMap to map values to their indexes. Then we can quickly find the `index` for `rootVal`:

```python
# store the mapping from values to indices in inorder
val_to_index = {}

def build_tree(preorder, inorder):

    for i in range(len(inorder)):
        val_to_index[inorder[i]] = i

    return build(preorder, 0, len(preorder) - 1,
                 inorder, 0, len(inorder) - 1)

def build(preorder, pre_start, pre_end, 
          inorder, in_start, in_end):
  
    root_val = preorder[pre_start]
    # avoid using for loop to find rootVal
    index = val_to_index[root_val]
    # ...
``` 

Now, let’s look at the diagram and fill in the blanks. What should be filled in for these question marks:

```
root.left = build(preorder, ?, ?,
                  inorder, ?, ?);

root.right = build(preorder, ?, ?,
                   inorder, ?, ?);
``` 

The start and end indexes for the left and right subtrees in the `inorder` array are easy to figure out:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/3.jpeg)

```
root.left = build(preorder, ?, ?,
                  inorder, inStart, index - 1);

root.right = build(preorder, ?, ?,
                   inorder, index + 1, inEnd);
``` 

What about the `preorder` array? How do we find the start and end indexes for the left and right subtrees?

We can figure this out by counting the number of nodes in the left subtree. Let’s call this number `leftSize`. Here is how the indexes look in the `preorder` array:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/4.jpeg)

Looking at the diagram, we can write the indexes for the `preorder` array:

```
int leftSize = index - inStart;

root.left = build(preorder, preStart + 1, preStart + leftSize,
                  inorder, inStart, index - 1);

root.right = build(preorder, preStart + leftSize + 1, preEnd,
                   inorder, index + 1, inEnd);
``` 

Now, the whole algorithm is complete. We just need to add the base case to finish the solution:

```python
class Solution:
    # store the mapping from values in inorder to their indices
    valToIndex = dict()

    def buildTree(self, preorder, inorder):
        for i in range(len(inorder)):
            self.valToIndex[inorder[i]] = i
        return self.build(preorder, 0, len(preorder) - 1,
                          inorder, 0, len(inorder) - 1)

    # definition of the build function:
    # if the preorder traversal array is preorder[preStart..preEnd],
    # and the inorder traversal array is inorder[inStart..inEnd],
    # construct the binary tree and return its root node
    def build(self, preorder, preStart, preEnd,
               inorder, inStart, inEnd):
        if preStart > preEnd:
            return None

        # the root node's value is the first element in the preorder array
        rootVal = preorder[preStart]
        # the index of rootVal in the inorder array
        index = self.valToIndex[rootVal]

        leftSize = index - inStart

        # first construct the current root node
        root = TreeNode(rootVal) 

        # recursively construct the left and right subtrees
        root.left = self.build(preorder, preStart + 1, preStart + leftSize,
                               inorder, inStart, index - 1)

        root.right = self.build(preorder, preStart + leftSize + 1, preEnd,
                                inorder, index + 1, inEnd)

        return root
``` 

The main function only needs to call the `buildTree` function. The solution may look long and the function has many parameters, but all these parameters do is control the range in the arrays. Drawing a diagram makes everything clear.

## Build a Binary Tree from Postorder and Inorder Traversal

This problem is similar to the previous one. This time, we use the **postorder** and **inorder** traversal arrays to build a binary tree. This is LeetCode Problem 106: [Construct Binary Tree from Inorder and Postorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/>):

**106\. Construct Binary Tree from Inorder and Postorder Traversal** |[LeetCode](<https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/>)

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return _the binary tree_.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2021/02/19/tree.jpg)

```
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
``` 

**Example 2:**

```
Input: inorder = [-1], postorder = [-1]
Output: [-1]
``` 

**Constraints:**

  * `1 <= inorder.length <= 3000`
  * `postorder.length == inorder.length`
  * `-3000 <= inorder[i], postorder[i] <= 3000`
  * `inorder` and `postorder` consist of **unique** values.
  * Each value of `postorder` also appears in `inorder`.
  * `inorder` is **guaranteed** to be the inorder traversal of the tree.
  * `postorder` is **guaranteed** to be the postorder traversal of the tree.

The problem is from [LeetCode 106. Construct Binary Tree from Inorder and Postorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/>).

```python
# The function signature is as follows
def buildTree(inorder: List[int], postorder: List[int]) -> TreeNode:
``` 

Let's look at the features of postorder and inorder traversals:

```python
def traverse(root):
    if root:
        traverse(root.left)
        traverse(root.right)
        # postorder traversal
        postorder.append(root.val)

def traverse(root):
    if root:
        traverse(root.left)
        # inorder traversal
        inorder.append(root.val)
        traverse(root.right)
``` 

Because of the difference in traversal orders, the elements in the `postorder` and `inorder` arrays have the following layout:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/5.jpeg)

The key difference from the previous problem is that postorder is the opposite of preorder, so the root node is the last element in the `postorder` array.

The overall algorithm structure is very similar to the previous problem. We still write a helper function called `build`:

```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        # store the mapping from value to index in inorder
        valToIndex = {val: idx for idx, val in enumerate(inorder)}

        # definition of build function:
        # postorder traversal array is postorder[postStart..postEnd],
        # inorder traversal array is inorder[inStart..inEnd],
        # construct the binary tree, return the root node of this tree
        def build(in_left, in_right, post_left, post_right):
            if in_left > in_right: return
            
            # the value of the root node is the last element of the postorder traversal array
            root_val = postorder[post_right]
            # the index of rootVal in the inorder traversal array
            index = valToIndex[root_val]

            root = TreeNode(root_val)
            # recursively construct the left and right subtrees
            size_left_subtree = index - in_left
            root.left = build(inorder, ?, ?,
                               postorder, ?, ?)
            root.right = build(inorder, ?, ?,
                                postorder, ?, ?)
            
            return root

        return build(0, len(inorder) - 1, 0, len(postorder) - 1)
``` 

Now, the status of `postorder` and `inorder` is as follows:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/6.jpeg)

We can fill in the missing indices as shown above:

```
int leftSize = index - inStart;

root.left = build(inorder, inStart, index - 1,
                  postorder, postStart, postStart + leftSize - 1);

root.right = build(inorder, index + 1, inEnd,
                   postorder, postStart + leftSize, postEnd - 1);
``` 

Here is the complete solution code:

```python
class Solution:
    # store the mapping from value to index in inorder
    val_to_index = {}

    def buildTree(self, inorder, postorder):
        for i in range(len(inorder)):
            self.val_to_index[inorder[i]] = i
        return self.build(inorder, 0, len(inorder) - 1,
                          postorder, 0, len(postorder) - 1)

    # Definition: the inorder array is inorder[inStart..inEnd],
    # the postorder array is postorder[postStart..postEnd],
    # the build function constructs this binary tree
    # and returns the root node of the binary tree
    def build(self, inorder, in_start, in_end,
              postorder, post_start, post_end):

        if in_start > in_end:
            return None
        # the value of the root node is the last element in the postorder array
        root_val = postorder[post_end]
        # the index of rootVal in the inorder array
        index = self.val_to_index[root_val]
        # the number of nodes in the left subtree
        left_size = index - in_start
        root = TreeNode(root_val) 
        # recursively construct the left and right subtrees
        root.left = self.build(inorder, in_start, index - 1,
                               postorder, post_start, post_start + left_size - 1)
        
        root.right = self.build(inorder, index + 1, in_end,
                                postorder, post_start + left_size, post_end - 1)
        return root
``` 

Algorithm Visualization

With the foundation from the previous problem, this one is easy to solve. The only difference is that `rootVal` is now the last element, and we need to adjust the function parameters a bit. As long as you understand the features of a binary tree, this problem is not hard to write.

## Constructing a Binary Tree from Preorder and Postorder Traversal

This is LeetCode Problem 889: [Construct Binary Tree from Preorder and Postorder Traversal](<https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/>). You are given the preorder and postorder traversal of a binary tree. Your task is to restore the structure of the binary tree.

The function signature is:

```python
from typing import List

def constructFromPrePost(preorder: List[int], postorder: List[int]) -> TreeNode:
``` 

This problem is different from the previous two:

**Given preorder and inorder, or postorder and inorder traversal, you can restore the unique original binary tree. But with preorder and postorder, you cannot restore a unique tree.**

The problem also says, if there are multiple possible answers, you can return any of them.

Why is that? As we said before, the usual way to build a binary tree is simple: find the root node, then find and build the left and right subtrees recursively.

In the previous two problems, you could use preorder or postorder to find the root, then use inorder to know the left and right subtrees (the problem says all values are unique).

In this problem, you can find the root, but you cannot know exactly which nodes belong to the left or right subtrees.

For example, given this input:

```
preorder = [1,2,3], postorder = [3,2,1]
``` 

Both of the following trees fit the condition, but their structures are different:

![diagram](https://labuladong.online/images/algo/binary-tree-ii/7.png)

However, the logic to restore the tree from preorder and postorder is not much different from the previous problems. You still use the indexes of left and right subtrees to build the tree:

**1\. First, take the first element of preorder or the last element of postorder as the root.**

**2\. Then, take the second element of preorder as the root of the left subtree.**

**3\. In postorder, find the index of the left subtree's root, so you know the boundary for the left subtree, and then for the right subtree. Build the left and right subtrees recursively.**

![diagram](https://labuladong.online/images/algo/binary-tree-ii/8.jpeg)

For details, see the code.

```python
class Solution:
    # store the mapping from value to index in postorder
    valToIndex = dict()

    def constructFromPrePost(self, preorder, postorder):
        for i in range(len(postorder)):
            self.valToIndex[postorder[i]] = i
        return self.build(preorder, 0, len(preorder) - 1,
                          postorder, 0, len(postorder) - 1)

    # definition: construct the binary tree based on
    # preorder[preStart..preEnd] and postorder[postStart..postEnd]
    # build the binary tree and return the root node.
    def build(self, preorder, preStart, preEnd,
              postorder, postStart, postEnd):
        if preStart > preEnd:
            return None
        if preStart == preEnd:
            return TreeNode(preorder[preStart])

        # the value of the root node is the first element in the preorder array
        rootVal = preorder[preStart]
        # the value of root.left is the second element in preorder
        # the key to constructing the binary tree using preorder and postorder is to determine the
        # element range of the left and right subtrees using the root node of the left subtree
        # determine the element range of the left and right subtrees in preorder and postorder
        leftRootVal = preorder[preStart + 1]
        # the index of leftRootVal in the postorder array
        index = self.valToIndex[leftRootVal]
        # the number of elements in the left subtree
        leftSize = index - postStart + 1
     
        # first construct the current root node
        root = TreeNode(rootVal) 
        # recursively construct the left and right subtrees
        # derive the index boundaries of the left and right subtrees based on the
        # root node index and the number of elements in the left subtree
        root.left = self.build(preorder, preStart + 1, preStart + leftSize,
                               postorder, postStart, index)
        root.right = self.build(preorder, preStart + leftSize + 1, preEnd,
                                postorder, index + 1, postEnd - 1)

        return root
``` 

Algorithm Visualization

The code is very similar to the previous two problems. While reading the code, you can think about why the answer is not unique with preorder and postorder.

The key part is this line:

```
int leftRootVal = preorder[preStart + 1];
``` 

We assume the second element in preorder is the root of the left subtree. But actually, the left subtree could be empty, then this element is the root of the right subtree. Since we can't know for sure, the answer is not unique.

Now, we have solved the problem of restoring a binary tree from preorder and postorder traversal.

To sum up, **constructing a binary tree usually uses the "divide the problem" idea: build the whole tree = root node + build left subtree + build right subtree**. First find the root, then use the root's value to find the left and right subtree elements, then build them recursively.

Do you understand the trick now?

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
