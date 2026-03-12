import { TopicContent } from '../../types';

export const traversalContent: TopicContent = {
  id: 'trees-traversal',
  title: {
    en: 'Binary Tree Traversal',
    zh: '二叉树遍历'
  },
  description: {
    en: 'Master preorder, inorder, and postorder traversals - the foundation of all tree algorithms',
    zh: '掌握前序、中序、后序遍历 - 所有树算法的基础'
  },
  timeEstimate: '45 minutes',
  contentType: 'all',
  hasVisualizer: false,
  content: {
    en: `# Binary Tree Traversal Fundamentals

Binary tree traversal is the cornerstone of all tree problems. There are three classical traversal orders, each revealing different information about the tree structure.

## The Three Traversal Orders

**Preorder (Root-Left-Right)**: Visit the root first, then traverse left subtree, then right subtree. Use when you need to process a node before its children, such as building a copy of the tree or serializing it.

**Inorder (Left-Root-Right)**: Visit left subtree, then root, then right subtree. For binary search trees, inorder traversal produces values in sorted order. Essential for BST validation.

**Postorder (Left-Right-Root)**: Visit left subtree, then right subtree, then root. Use when you need to process children before the parent, such as calculating tree height or deleting nodes.

## Recursive Framework

All tree problems follow the same recursive pattern:

\`\`\`javascript
function traverseTree(root) {
  if (root === null) return;

  // Preorder: process root first
  process(root.val);

  // Recurse on left subtree
  traverseTree(root.left);

  // Recurse on right subtree
  traverseTree(root.right);

  // Postorder: process root last
  // process(root.val);
}
\`\`\`

## The Key Insight

**Every tree problem is a variation of traversal.** The three orders handle different processing needs:
- Need to process parent before children? → Preorder
- Need left-root-right order? → Inorder (especially for BST)
- Need to process children first? → Postorder

## Iterative Traversal

Using explicit stacks to simulate recursion:

**Preorder (Stack-based)**:
\`\`\`javascript
function preorderIterative(root) {
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    result.push(node.val);
    // Push right first so left is processed first
    stack.push(node.right);
    stack.push(node.left);
  }
  return result;
}
\`\`\`

**Inorder (One-pass with flag)**:
\`\`\`javascript
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}
\`\`\`

## Practice Pattern

When solving tree problems, ask yourself:
1. Do I process the node before visiting children? (Preorder)
2. Do I need sorted order for BST? (Inorder)
3. Do I aggregate results from children? (Postorder)

This question guides which traversal order to use.`,
    zh: `# 二叉树遍历基础

二叉树遍历是所有树问题的基石。有三种经典遍历顺序，每种都能以不同方式展现树的结构。

## 三种遍历顺序

**前序（根-左-右）**：先访问根节点，再遍历左子树，最后遍历右子树。在需要先处理节点再处理子节点时使用，如复制树或序列化。

**中序（左-根-右）**：先遍历左子树，再访问根节点，最后遍历右子树。对于二叉搜索树，中序遍历产生排序后的序列。对验证二叉搜索树至关重要。

**后序（左-右-根）**：先遍历左子树，再遍历右子树，最后访问根节点。在需要先处理子节点再处理父节点时使用，如计算树高或删除节点。

## 递归框架

所有树问题都遵循相同的递归模式：

\`\`\`javascript
function traverseTree(root) {
  if (root === null) return;

  // 前序：先处理根
  process(root.val);

  // 递归左子树
  traverseTree(root.left);

  // 递归右子树
  traverseTree(root.right);

  // 后序：后处理根
  // process(root.val);
}
\`\`\`

## 关键洞察

**每个树问题都是遍历的变体。** 三种顺序处理不同的需求：
- 需要先处理父节点？ → 前序
- 需要左-根-右的顺序？ → 中序（特别是对于二叉搜索树）
- 需要先处理子节点？ → 后序

## 迭代遍历

使用显式栈模拟递归：

**前序（基于栈）**:
\`\`\`javascript
function preorderIterative(root) {
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    result.push(node.val);
    // 先push右子树，后push左子树，保证左先处理
    stack.push(node.right);
    stack.push(node.left);
  }
  return result;
}
\`\`\`

**中序（一次遍历）**:
\`\`\`javascript
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}
\`\`\`

## 练习模式

解决树问题时，问自己：
1. 我是否在访问子节点前处理节点？（前序）
2. 对于二叉搜索树，我是否需要排序顺序？（中序）
3. 我是否需要从子节点汇总结果？（后序）

这个问题会指导你选择正确的遍历顺序。`
  },
  leetcode: [
    { id: 144, title: 'Binary Tree Preorder Traversal', titleZh: '二叉树前序遍历', difficulty: 'Easy' },
    { id: 94, title: 'Binary Tree Inorder Traversal', titleZh: '二叉树中序遍历', difficulty: 'Easy' },
    { id: 145, title: 'Binary Tree Postorder Traversal', titleZh: '二叉树后序遍历', difficulty: 'Easy' },
    { id: 104, title: 'Maximum Depth of Binary Tree', titleZh: '二叉树的最大深度', difficulty: 'Easy' },
    { id: 226, title: 'Invert Binary Tree', titleZh: '翻转二叉树', difficulty: 'Easy' }
  ]
};
