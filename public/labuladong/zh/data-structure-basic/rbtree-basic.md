# 红黑树的完美平衡及可视化

> Source: https://labuladong.online/zh/algo/data-structure-basic/rbtree-basic/
> Archived: labuladong.online — 算法笔记

---

# 红黑树的完美平衡及可视化

前置知识

阅读本文前，你需要先学习：

  * [二叉树基础及常见类型](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [多叉树的递归/层序遍历](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)
  * [二叉搜索树的应用及可视化](</zh/algo/data-structure-basic/tree-map-basic/>)

一句话总结

红黑树是自平衡的二叉搜索树，它的树高在任何时候都能保持在 O(log⁡N)O(\log N)O(logN)（完美平衡），这样就能保证增删查改的时间复杂度都是 O(log⁡N)O(\log N)O(logN)。

可视化面板支持创建红黑树：

算法可视化

[二叉搜索树的应用及可视化](</zh/algo/data-structure-basic/tree-map-basic/>) 讲了普通的二叉搜索树存储键值对实现 `TreeMap/TreeSet` 的思路。

二叉搜索树的操作效率取决于树高，树结构越平衡，树高就接近 log⁡N\log NlogN，增删查改的效率就比较高。而普通二叉搜索树最关键的问题是它不会自动对树进行平衡，特殊的情况下会退化成链表，增删查改的时间复杂度退化为 O(N)O(N)O(N)。

下面这个可视化面板就是一个例子，如果插入若干个有序的键值对，你就能发现每次新增的键都会被插入到最右侧，导致这棵二叉搜索树退化成了链表：

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
