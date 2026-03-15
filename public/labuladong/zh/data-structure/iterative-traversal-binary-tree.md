# 拓展：用栈模拟递归迭代遍历二叉树

> Source: https://labuladong.online/zh/algo/data-structure/iterative-traversal-binary-tree/
> Archived: labuladong.online — 算法笔记

---

# 拓展：用栈模拟递归迭代遍历二叉树

前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)

本文内容仅作为拓展

我们一般用 [递归遍历或者层序遍历的方式](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>) 处理二叉树就完全够了。

本文介绍的利用栈迭代遍历二叉树的方法，本质上还是用栈手动模拟递归过程，在本站其他习题中都用不到，面试时也几乎不会有面试官非要难为你写这种代码。

所以本文内容仅作为思维拓展，不要求必须掌握。如果不感兴趣，可以放心地跳过本文的内容。

[二叉树的 DFS/BFS 遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>) 介绍过二叉树的递归遍历和层序遍历方法，这两种方法是最简单实用的。

有些读者在后台问我如何将前中后序的递归框架改写成迭代形式。我以前背过一些迭代实现二叉树前中后序遍历的代码模板，比较短小，容易记，但通用性较差。

通用性较差的意思是说，模板只是针对「用迭代的方式返回二叉树前/中/后序的遍历结果」这个问题，函数签名类似这样，返回一个 `TreeNode` 列表：

```python
def traverse(root: TreeNode) -> List[TreeNode]:
``` 

如果给一些稍微复杂的二叉树问题，比如 [最近公共祖先](</zh/algo/practice-in-action/lowest-common-ancestor-summary/>)，[二叉搜索子树的最大键值和](</zh/algo/data-structure/bst-part4/>)，想把这些递归解法改成迭代，就无能为力了。

**而我想要的是一个万能的模板，可以把一切二叉树递归算法都改成迭代** 。

换句话说，类似二叉树的递归框架：

```python
def traverse(root):
    if not root:
        return
    # 前序遍历代码位置
    traverse(root.left)
    # 中序遍历代码位置
    traverse(root.right)
    # 后序遍历代码位置
``` 

迭代框架也应该有前中后序代码的位置：

```python
def traverse(root: TreeNode):
    while (...):
        if (...):
          # 前序遍历代码位置
        if (...):
          # 中序遍历代码位置
        if (...):
          # 后序遍历代码位置
``` 

我如果想把递归改成迭代，直接把递归解法中前中后序对应位置的代码复制粘贴到迭代框架里，就可以直接运行，得到正确的结果。

理论上，所有递归算法都可以利用栈改成迭代的形式，因为计算机本质上就是借助栈来迭代地执行递归函数的。

**所以本文就来利用「栈」模拟函数递归的过程，总结一套二叉树通用迭代遍历框架** 。

### 递归框架改为迭代

按照 [二叉树心法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>) ，二叉树的递归框架中，前中后序遍历位置就是几个特殊的时间点：

前序遍历位置的代码，会在刚遍历到当前节点 `root`，遍历 `root` 的左右子树之前执行；

中序遍历位置的代码，会在在遍历完当前节点 `root` 的左子树，即将开始遍历 `root` 的右子树的时候执行；

后序遍历位置的代码，会在遍历完以当前节点 `root` 为根的整棵子树之后执行。

![diagram](https://labuladong.online/images/algo/binary-tree-summary/2.jpeg)

如果从递归代码上来看，上述结论是很容易理解的：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
