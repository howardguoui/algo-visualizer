# 二叉搜索树的应用及可视化

> Source: https://labuladong.online/zh/algo/data-structure-basic/tree-map-basic/
> Archived: labuladong.online — 算法笔记

---

# 二叉搜索树的应用及可视化

前置知识

阅读本文前，你需要先学习：

  * [二叉树基础及常见类型](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [多叉树的递归/层序遍历](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

一句话总结

二叉搜索树是特殊的 [二叉树结构](</zh/algo/data-structure-basic/binary-tree-basic/>)，其主要的实际应用是 `TreeMap` 和 `TreeSet`。

前文 [几种常见的二叉树类型](</zh/algo/data-structure-basic/binary-tree-basic/>) 介绍二叉搜索树，接下来我会带你亲自实现一个类似 Java 标准库的 `TreeMap` 和 `TreeSet` 结构，帮助你知行合一。

**不过呢，考虑到本文还处在数据结构基础的章节，本文仅讲解`TreeMap/TreeSet` 的原理，[动手实现 `TreeMap/TreeSet`](</zh/algo/data-structure-basic/tree-map-implement/>) 我放到了 [二叉树系列习题](</zh/algo/intro/binary-tree-practice/>) 的后面**。

因为和前面的哈希表、队列这些数据结构不同，树相关的数据结构需要比较强的递归思维，难度会上一个层级。如果你对递归的理解不够深入，现在给你讲的话不仅学习曲线有些陡峭，而且意义不大，就算你费了半天劲看懂了，遇到实际的题目还是不会，这很打击信心。

所以我建议循序渐进，后面二叉树的习题章节，用 100 多道实际的算法题手把手带你培养递归思维。刷完后你就可以秒杀所有二叉树相关的算法题了，再去看树相关的数据结构实现，就会感觉非常简单。甚至你都不用看我的代码，自己凭感觉就能实现 `TreeMap/TreeSet`。

好了，废话不多说，让我们开始吧。

## 二叉搜索树的优势

前文 [几种常见的二叉树类型](</zh/algo/data-structure-basic/binary-tree-basic/>) 介绍过二叉搜索树（BST）的特点，即左小右大：

对于树中的每个节点，其**左子树的每个节点** 的值都要小于这个节点的值，**右子树的每个节点** 的值都要大于这个节点的值。

比方说下面这棵树就是一棵 BST：

loading...

**这个左小右大的特性，可以让我们在 BST 中快速找到某个节点，或者找到某个范围内的所有节点，这是 BST 的优势所在** 。

你应该已经学过前文 [二叉树的遍历](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)，下面用标准的二叉树遍历函数结合可视化面板来对比展示一下 BST 和普通二叉树的操作差别。

你可以展开下面的两个面板，点击其中 `if (targetNode !== null)` 这一行代码，直观感受一下两个搜索算法的效率差别：

算法可视化

算法可视化

这里展示的是查找目标元素的场景，可以看到，利用 BST 左小右大的特性，可以迅速定位到目标节点，理想的时间复杂度是树的高度 O(logN)O(logN)O(logN)，而普通的二叉树遍历函数则需要 O(N)O(N)O(N) 的时间遍历所有节点。

至于其他增、删、改的操作，你首先查到目标节点，才能进行增删改的操作对吧？增删改的操作无非就是改一改指针，所以增删改的时间复杂度也是 O(logN)O(logN)O(logN)。

## TreeMap/TreeSet 实现原理

你看 `TreeMap` 这个名字，应该就能看出来，它和前文介绍的 [哈希表 `HashMap`](</zh/algo/data-structure-basic/hashmap-basic/>) 的结构是类似的，都是存储键值对的，`HashMap` 底层把键值对存储在一个 `table` 数组里面，而 `TreeMap` 底层把键值对存储在一棵二叉搜索树的节点里面。

至于 `TreeSet`，它和 `TreeMap` 的关系正如哈希表 `HashMap` 和哈希集合 `HashSet` 的关系一样，说白了就是 `TreeMap` 的简单封装，所以下面主要讲解 `TreeMap` 的实现原理。

力扣经典的 `TreeNode` 结构长这样：

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
}
``` 

我们只要改一改这个经典的 `TreeNode` 结构，就可以用来实现 `TreeMap` 了：

```java
// 大写 K 为键的类型，大写 V 为值的类型
class TreeNode<K, V> {
    K key;
    V value;

    TreeNode<K, V> left;
    TreeNode<K, V> right;
    TreeNode(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
``` 

我们将实现的 `TreeMap` 结构有如下 API：

```
// TreeMap 主要接口
class MyTreeMap<K, V> {

    // ****** Map 键值映射的基本方法 ******

    // 增/改，复杂度 O(logN)
    public void put(K key, V value) {}

    // 查，复杂度 O(logN)
    public V get(K key) {}

    // 删，复杂度 O(logN)
    public void remove(K key) {}

    // 是否包含键 key，复杂度 O(logN)
    public boolean containsKey(K key) {}

    // 返回所有键的集合，结果有序，复杂度 O(N)
    public List<K> keys() {}

    // ****** TreeMap 提供的额外方法 ******

    // 查找最小键，复杂度 O(logN)
    public K firstKey() {}

    // 查找最大键，复杂度 O(logN)
    public K lastKey() {}

    // 查找小于等于 key 的最大键，复杂度 O(logN)
    public K floorKey(K key) {}

    // 查找大于等于 key 的最小键，复杂度 O(logN)
    public K ceilingKey(K key) {}

    // 查找排名为 k 的键，复杂度 O(logN)
    public K selectKey(int k) {}

    // 查找键 key 的排名，复杂度 O(logN)
    public int rank(K key) {}

    // 区间查找，复杂度 O(logN + M)，M 为区间大小
    public List<K> rangeKeys(K low, K high) {}
}
``` 

除了标准的增删查改方法 `get, put, remove, containsKey` 之外，`TreeMap` 还提供了很多额外方法，主要和 key 的大小相关。怎么样，是不是感觉很强大？

哈希表很实用，但是它确实没办法很好地处理键之间的大小关系。前文 [用链表加强哈希表](</zh/algo/data-structure-basic/hashtable-with-linked-list/>) 中实现的 `LinkedHashMap` 也只是做到按「**插入顺序** 」排列哈希表中的键，依然做不到按「**大小顺序** 」排列。
