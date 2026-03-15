# Backtracking Algorithm Common Patterns and Code Template

> Source: https://labuladong.online/algo/en/essential-technique/backtrack-framework/
> Archived: labuladong.online

---

# Backtracking Algorithm Common Patterns and Code Template

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[46\. Permutations](<https://leetcode.com/problems/permutations/>)|   
  
Prerequisites

Before reading this article, you should first learn:

  * [Binary Tree Basics](</en/algo/data-structure-basic/binary-tree-basic/>)
  * [Binary Tree Traversal Framework](</en/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [N-ary Tree Structure and Traversal Framework](</en/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

This article answers several questions:

What is backtracking? What techniques help with backtracking problems? How should you study backtracking? Is there a pattern to backtracking code?

Backtracking and DFS are essentially the same algorithm. I explain the subtle differences in [FAQ on DFS and Backtracking](</en/algo/essential-technique/backtrack-vs-dfs/>). This article focuses on backtracking and won't dive into that distinction.

**At a high level, solving a backtracking problem is really just traversing a decision tree. Each leaf node holds a valid answer. Traverse the entire tree, collect all the answers at the leaf nodes, and you've got every valid solution.**

Standing at any node on the backtracking tree, you only need to think about 3 things:

  1. **Path** : the choices you've already made.

  2. **Choice list** : the choices you can currently make.

  3. **Termination condition** : the point where you've reached the bottom of the decision tree and can't make any more choices.

Don't worry if these don't fully click yet—we'll use the classic "permutations" problem to make everything concrete. Just keep them in mind for now.

On the code side, here's the backtracking framework:

```
result = []
def backtrack(path, choice_list):
    if termination_condition_met:
        result.add(path)
        return

    for choice in choice_list:
        make_choice
        backtrack(path, choice_list)
        undo_choice
``` 

**The core idea is the recursion inside the for loop: "make a choice" before the recursive call, and "undo the choice" after it.** Dead simple.

But what does "make a choice" and "undo a choice" really mean? What's the underlying principle behind this framework? Let's use the "permutations" problem to clear things up!

## Permutations Problem Breakdown

LeetCode problem 46, "[Permutations](<https://leetcode.cn/problems/permutations/>)," gives you an array `nums` and asks you to return all possible permutations of those numbers.

Note

**The permutations problem we're discussing here doesn't involve duplicate numbers. I cover the extension with duplicates in[Backtracking: 9 Types of Permutation/Combination/Subset Problems](</en/algo/essential-technique/permutation-combination-subset-all-in-one/>).**

Also, some of you may have seen permutation code that uses `swap` to exchange elements, which is different from my approach here. These are two different enumeration strategies for backtracking, and I'll explain both in [Ball-in-Box Model: Two Perspectives on Backtracking Enumeration](</en/algo/practice-in-action/two-views-of-backtrack/>). It's not the right time to introduce that approach yet—just follow along with my method for now.

You probably did permutation and combination problems back in high school math. You know that `n` distinct numbers have `n!` total permutations. But how did you actually enumerate them back then?

Say you're given `[1,2,3]`. You wouldn't just randomly guess permutations—you'd do something like this:

Fix the first position as 1, then the second can be 2, which forces the third to be 3. Then change the second to 3, forcing the third to be 2. Then change the first position to 2, and enumerate the remaining two positions...

That's backtracking! You already knew how to do it intuitively in high school. Some of you might even draw out the backtracking tree like this:

![diagram](https://labuladong.online/images/algo/backtracking/1.jpg)

Just traverse this tree from the root and record the numbers along each path—those are all the permutations. **Let's call this the "decision tree" of the backtracking algorithm.**

**Why "decision tree"? Because at every node, you're making a decision.** For example, say you're standing at the red node below:

![diagram](https://labuladong.online/images/algo/backtracking/2.jpg)

You're choosing right now—you can go down the branch for 1 or the branch for 3. Why only 1 and 3? Because the branch for 2 is behind you; you already made that choice, and permutations don't allow reusing numbers.

**Now we can clarify those terms from earlier:`[2]` is the "path"—the record of choices you've already made. `[1,3]` is the "choice list"—the choices currently available to you. The "termination condition" is when you reach a leaf node at the bottom of the tree, which here means the choice list is empty.**

Once you understand these terms, you can think of "path" and "choice list" as attributes of each node in the decision tree. The diagram below shows the attributes for a few blue nodes:

![diagram](https://labuladong.online/images/algo/backtracking/3-en.jpg)

**The`backtrack` function we define is essentially a pointer walking through this tree, maintaining each node's attributes correctly. Whenever it reaches a leaf node, the "path" at that point is a complete permutation.**

Going one step further: how do you traverse a tree? That shouldn't be too hard. Recall what we discussed in [A Framework for Learning Data Structures](</en/algo/essential-technique/algorithm-summary/>)—all kinds of search problems are really tree traversal problems. The N-ary tree traversal framework looks like this:

```python
def traverse(root: TreeNode):
    for child in root.children:
        # operations needed at the preorder position
        traverse(child)
        # operations needed at the postorder position
``` 

Info

Sharp readers might wonder: shouldn't the pre-order and post-order positions in the N-ary tree DFS traversal framework be outside the for loop, not inside it? Why did they move inside the for loop in backtracking?

Good catch. The pre-order and post-order positions in DFS should indeed be outside the for loop. However, backtracking is slightly different from standard DFS. I'll explain this in detail in [FAQ on Backtracking/DFS](</en/algo/essential-technique/backtrack-vs-dfs/>). For now, you can set this question aside.

As for pre-order and post-order traversal, they're just two useful points in time. Let me draw a picture to make it clear:

![diagram](https://labuladong.online/images/algo/backtracking/4-en.jpg)

**Pre-order code executes at the moment just before entering a node; post-order code executes at the moment just after leaving a node.**

Remember what we said: "path" and "choices" are attributes of each node, and the function needs to handle these attributes correctly as it walks the tree. That means we need to take action at these two special time points:

![diagram](https://labuladong.online/images/algo/backtracking/5-en.jpg)

Now, does this core backtracking framework make sense?

```
for choice in choice_list:
    # make a choice
    remove choice from choice_list
    path.add(choice)
    backtrack(path, choice_list)
    # undo the choice
    path.remove(choice)
    add choice back to choice_list
``` 

**Just make a choice before the recursion and undo it after the recursion** , and you'll correctly maintain each node's choice list and path.

Now let's look at the actual permutations code:

```python
class Solution:
    def __init__(self):
        self.res = []

    # Main function, input a set of unique numbers, return their permutations
    def permute(self, nums):
        # Record "path"
        track = []
        # Elements in the "path" will be marked as true to avoid reuse
        used = [False] * len(nums)
        
        self.backtrack(nums, track, used)
        return self.res

    # Path: recorded in track
    # Selection list: elements in nums that are not in track (used[i] is false)
    # Termination condition: all elements in nums appear in track
    def backtrack(self, nums, track, used):
        # Trigger termination condition
        if len(track) == len(nums):
            self.res.append(track.copy())
            return

        for i in range(len(nums)):
            # Exclude invalid choices
            if used[i]: 
                # nums[i] is already in track, skip
                continue
            # Make a choice
            track.append(nums[i])
            used[i] = True
            # Enter the next level of the decision tree
            self.backtrack(nums, track, used)
            # Cancel the choice
            track.pop()
            used[i] = False
``` 

Algorithm Visualization

We made a small tweak here: instead of explicitly tracking a "choice list," we use a `used` array to exclude elements already in `track`, effectively deriving the current choice list:

![diagram](https://labuladong.online/images/algo/backtracking/6.jpg)

And that's how we've used the permutations problem to explain the underlying mechanics of backtracking. Of course, this isn't the most efficient way to solve permutations—you may have seen solutions that don't even use a `used` array and instead swap elements directly. That approach is a bit harder to understand, so I'll cover it in [Ball-in-Box Model: Two Perspectives on Backtracking Enumeration](</en/algo/practice-in-action/two-views-of-backtrack/>).

One thing to be clear about: no matter how you optimize, it still fits the backtracking framework, and the time complexity can't go below O(N!). Enumerating the entire decision tree is unavoidable—you ultimately need to produce all N! permutations.

**This is a key characteristic of backtracking: unlike dynamic programming where overlapping subproblems allow optimization, backtracking is pure brute-force enumeration, so the complexity is generally high.**

## Final Summary

Backtracking is essentially an N-ary tree traversal problem. The key is to perform operations at the pre-order and post-order traversal positions. Here's the framework:

```
def backtrack(...):
    for choice in choice_list:
        make_choice
        backtrack(...)
        undo_choice
``` 

**When writing the`backtrack` function, you need to maintain the "path" (choices made so far) and the current "choice list." When the "termination condition" is triggered, add the "path" to your result set.**

Here's something interesting to think about: doesn't backtracking look a lot like dynamic programming? We've emphasized many times in the dynamic programming series that DP requires three things: "state," "choices," and "base case." Don't those map directly to "path," "choice list," and "termination condition"?

Both dynamic programming and backtracking abstract the problem into a tree structure, but the two algorithms take completely different approaches. You'll see the deeper distinctions and connections between them in [Binary Tree Essentials (Overview)](</en/algo/essential-technique/binary-tree-summary/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
