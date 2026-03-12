import { TopicContent } from '../../types';

export const bstContent: TopicContent = {
  id: 'trees-bst',
  title: {
    en: 'Binary Search Tree (BST)',
    zh: '二叉搜索树'
  },
  description: {
    en: 'Understand BST properties and master search, insert, and delete operations',
    zh: '理解二叉搜索树特性，掌握搜索、插入和删除操作'
  },
  timeEstimate: '50 minutes',
  contentType: 'content+practice',
  hasVisualizer: false,
  content: {
    en: `# Binary Search Tree (BST)

A Binary Search Tree is a binary tree where for every node: all values in the left subtree are smaller, and all values in the right subtree are larger. This property enables efficient searching and operations.

## Core BST Property

For every node in a BST:
- **Left subtree**: All values < node.val
- **Right subtree**: All values > node.val
- **Inorder traversal**: Returns values in ascending sorted order

This property is the foundation of all BST operations.

## BST Search

Searching leverages the BST property to eliminate half the remaining nodes at each step:

\`\`\`javascript
function searchBST(root, val) {
  let current = root;

  while (current) {
    if (current.val === val) {
      return current;
    } else if (val < current.val) {
      // Go left - smaller values are on left
      current = current.left;
    } else {
      // Go right - larger values are on right
      current = current.right;
    }
  }

  return null; // Not found
}
\`\`\`

**Time Complexity**: O(log n) average case (balanced), O(n) worst case (skewed tree)

## BST Insertion

Insert maintains the BST property by finding the correct position:

\`\`\`javascript
function insertIntoBST(root, val) {
  if (!root) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
\`\`\`

Insertion always creates a new leaf node. The key is recursively finding the position where the new value belongs.

## BST Deletion

Deletion is the most complex operation. Three cases:

**Case 1: Node is a leaf** - Simply delete it.

**Case 2: Node has one child** - Replace node with its child.

**Case 3: Node has two children** - Find successor (minimum in right subtree) or predecessor (maximum in left subtree), replace node's value, then delete the successor/predecessor.

\`\`\`javascript
function deleteNode(root, val) {
  if (!root) return null;

  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    // Found the node to delete

    // Case 1 & 2: No left child or no right child
    if (!root.left) {
      return root.right;
    }
    if (!root.right) {
      return root.left;
    }

    // Case 3: Two children - find successor
    let minRight = root.right;
    while (minRight.left) {
      minRight = minRight.left;
    }

    root.val = minRight.val;
    root.right = deleteNode(root.right, minRight.val);
  }

  return root;
}
\`\`\`

## BST Validation

Validate that a tree is a valid BST by checking the range constraint:

\`\`\`javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;

    // Current node must be within range
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Left subtree must have all values < node.val
    // Right subtree must have all values > node.val
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}
\`\`\`

**Key insight**: Use min/max bounds to track the valid range for each subtree. This prevents invalid BSTs that might pass simpler checks.

## Common Patterns

- **Inorder Traversal**: Produces sorted sequence
- **Finding Kth Smallest**: Use inorder traversal and count
- **Range Queries**: Leverage BST property to prune branches
- **Successor/Predecessor**: Standard BST navigation

## Performance Characteristics

- **Balanced BST**: Search/Insert/Delete = O(log n)
- **Skewed BST**: Operations = O(n)
- **Self-balancing variants**: AVL trees, Red-Black trees maintain O(log n)`,
    zh: `# 二叉搜索树（BST）

二叉搜索树是一种二叉树，其中对于每个节点，左子树的所有值都小于节点值，右子树的所有值都大于节点值。这个特性使得高效的搜索和操作成为可能。

## 核心BST特性

对于BST中的每个节点：
- **左子树**：所有值 < 节点值
- **右子树**：所有值 > 节点值
- **中序遍历**：按升序返回所有值

这个特性是所有BST操作的基础。

## BST搜索

搜索利用BST特性在每个步骤消除一半的剩余节点：

\`\`\`javascript
function searchBST(root, val) {
  let current = root;

  while (current) {
    if (current.val === val) {
      return current;
    } else if (val < current.val) {
      // 向左 - 较小的值在左侧
      current = current.left;
    } else {
      // 向右 - 较大的值在右侧
      current = current.right;
    }
  }

  return null; // 未找到
}
\`\`\`

**时间复杂度**：O(log n) 平均情况（平衡树），O(n) 最坏情况（倾斜树）

## BST插入

插入通过找到正确位置来维持BST特性：

\`\`\`javascript
function insertIntoBST(root, val) {
  if (!root) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
\`\`\`

插入总是创建新的叶子节点。关键是递归找到新值应该所在的位置。

## BST删除

删除是最复杂的操作。有三种情况：

**情况1：节点是叶子** - 直接删除。

**情况2：节点只有一个子节点** - 用子节点替换该节点。

**情况3：节点有两个子节点** - 找到后继节点（右子树中的最小值）或前驱节点（左子树中的最大值），替换节点的值，然后删除后继/前驱节点。

\`\`\`javascript
function deleteNode(root, val) {
  if (!root) return null;

  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    // 找到要删除的节点

    // 情况1和2：无左子节点或无右子节点
    if (!root.left) {
      return root.right;
    }
    if (!root.right) {
      return root.left;
    }

    // 情况3：两个子节点 - 找到后继节点
    let minRight = root.right;
    while (minRight.left) {
      minRight = minRight.left;
    }

    root.val = minRight.val;
    root.right = deleteNode(root.right, minRight.val);
  }

  return root;
}
\`\`\`

## BST验证

通过检查范围约束来验证树是否为有效的BST：

\`\`\`javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;

    // 当前节点必须在范围内
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // 左子树的所有值必须 < 节点值
    // 右子树的所有值必须 > 节点值
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}
\`\`\`

**关键洞察**：使用最小/最大边界来跟踪每个子树的有效范围。这防止可能通过简单检查但无效的BST。

## 常见模式

- **中序遍历**：产生排序序列
- **查找第K小**：使用中序遍历并计数
- **范围查询**：利用BST特性修剪分支
- **后继/前驱**：标准BST导航

## 性能特点

- **平衡BST**：搜索/插入/删除 = O(log n)
- **倾斜BST**：操作 = O(n)
- **自平衡变体**：AVL树、红黑树维持O(log n)`
  },
  leetcode: [
    { id: 700, title: 'Search in a Binary Search Tree', titleZh: '二叉搜索树中的搜索', difficulty: 'Easy' },
    { id: 701, title: 'Insert into a Binary Search Tree', titleZh: '二叉搜索树中的插入操作', difficulty: 'Medium' },
    { id: 450, title: 'Delete Node in a BST', titleZh: '删除二叉搜索树中的节点', difficulty: 'Medium' },
    { id: 98, title: 'Validate Binary Search Tree', titleZh: '验证二叉搜索树', difficulty: 'Medium' }
  ]
};
