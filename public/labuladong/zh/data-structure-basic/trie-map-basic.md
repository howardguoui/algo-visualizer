# Trie/字典树/前缀树原理及可视化

> Source: https://labuladong.online/zh/algo/data-structure-basic/trie-map-basic/
> Archived: labuladong.online — 算法笔记

---

# Trie/字典树/前缀树原理及可视化

前置知识

阅读本文前，你需要先学习：

  * [二叉树基础及常见类型](</zh/algo/data-structure-basic/binary-tree-basic/>)

一句话总结

Trie 树就是 [多叉树结构](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>) 的延伸，是一种针对字符串进行特殊优化的数据结构。

Trie 树在处理字符串相关操作时有诸多优势，比如节省公共字符串前缀的内存空间、方便处理前缀操作、支持通配符匹配等。

下面这个可视化面板展示了 Trie 树的结构和主要 API，你可以逐行点击代码，观察 console 输出和右侧的 Trie 树结构变化：

算法可视化

本文仅是 Trie 树（也叫做字典树、前缀树）的原理介绍，[动手实现 TrieMap/TrieSet](</zh/algo/data-structure-basic/trie-map-basic/>) 我放到了[二叉树系列习题章节](</zh/algo/intro/binary-tree-practice/>) 后面的数据结构设计章节。理由和上篇 [TreeMap/TreeSet 原理](</zh/algo/data-structure-basic/tree-map-basic/>) 相同，在基础知识章节我不准备讲解这种复杂结构的具体实现，初学者也没必要在这个阶段理解 Trie 树的代码实现。

但是我依然把 Trie 树的原理讲解放在这里，有两个目的：

1、让你直观地感受到二叉树结构的种种幻化，你也许能理解我的教程特别强调二叉树结构的原因了。

2、在开头让你知道有这么一种数据结构，了解它的 API 以及适用的场景。未来你遇到相关的问题，也许就能想到用 Trie 树来解决，最起码有个思路，大不了回来复制代码模板嘛。这种数据结构的实现都是固定的，笔试面试也不会让你从头手搓 Trie 树，复制粘贴直接拿去用就可以了。

好了，废话不多说，让我们开始吧。

本站将会带你实现一个 `TrieMap` 和 `TrieSet`，先来梳理一下我们已经实现过的 Map/Set 类型：

  * 标准的 [哈希表 `HashMap`](</zh/algo/data-structure-basic/hashmap-basic/>)，底层借助一个哈希函数把键值对存在 `table` 数组中，有两种解决哈希冲突的方法。它的特点是快，即基本的增删查改操作时间复杂度都是 O(1)O(1)O(1)。[哈希集合 `HashSet`](</zh/algo/data-structure-basic/hash-set/>) 是 `HashMap` 的简单封装。

  * [哈希链表 `LinkedHashMap`](</zh/algo/data-structure-basic/hashtable-with-linked-list/>)，是 [双链表结构](</zh/algo/data-structure-basic/linkedlist-basic/>) 对标准哈希表的加强。它继承了哈希表的操作复杂度，并且可以让哈希表中的所有键保持「插入顺序」。`LinkedHashSet` 是 `LinkedHashMap` 的简单封装。

  * [哈希数组 `ArrayHashMap`](</zh/algo/data-structure-basic/hashtable-with-array/>)，是 [数组结构](</zh/algo/data-structure-basic/array-basic/>) 对标准哈希表的加强。它继承了哈希表的操作复杂度，并且提供了一个额外的 `randomKey` 函数，可以在 O(1)O(1)O(1) 的时间返回一个随机键。`ArrayHashSet` 是 `ArrayHashMap` 的简单封装。

  * [`TreeMap` 映射](</zh/algo/data-structure-basic/tree-map-basic/>)，底层是一棵二叉搜索树（编程语言标准库一般使用经过改良的自平衡 [红黑树](</zh/algo/data-structure-basic/rbtree-basic/>)），基本增删查改操作复杂度是 O(logN)O(logN)O(logN)，它的特点是可以动态维护键值对的大小关系，有很多额外的 API 操作键值对。`TreeSet` 集合是 `TreeMap` 映射的简单封装。

`TrieSet` 也是 `TrieMap` 的简单封装，所以下面我们聚焦 `TrieMap` 的实现原理即可。

## Trie 树的主要应用场景

**Trie 树是一种针对字符串有特殊优化的数据结构** ，这也许它又被叫做字典树的原因。Trie 树针对字符串的处理有若干优势，下面一一列举。

### 节约存储空间

用 `HashMap` 对比吧，比如说这样存储几个键值对：

```
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("app", 2);
map.put("appl", 3);
``` 

回想哈希表的实现原理，键值对会被存到 `table` 数组中，也就是说它真的创建 `"apple"`、`"app"`、`"appl"` 这三个字符串，占用了 12 个字符的内存空间。

但是注意，这三个字符串拥有共同的前缀，`"app"` 这个前缀被重复存储了三次，`"l"` 也被重复存储了两次。

如果换成 TrieMap 来存储：

```
// Trie 树的键类型固定为 String 类型，值类型可以是泛型
TrieMap<Integer> map = new TrieMap<>();
map.put("apple", 1);
map.put("app", 2);
map.put("appl", 3);
``` 

Trie 树底层并不会重复存储公共前缀，所以只需要 `"apple"` 这 5 个字符的内存空间来存储键。

这个例子数据量很小，你感觉重复存储几次没啥大不了，但如果键非常多、非常长，且存在大量公共前缀（现实中确实经常有这种情况，比如证件号），那么 Trie 树就能节约大量的内存空间。

### 方便处理前缀操作

举个例子就明白了：

```
// Trie 树的键类型固定为 String 类型，值类型可以是泛型
TrieMap<Integer> map = new TrieMap<>();
map.put("that", 1);
map.put("the", 2);
map.put("them", 3);
map.put("apple", 4);

// "the" 是 "themxyz" 的最短前缀
System.out.println(map.shortestPrefixOf("themxyz")); // "the"

// "them" 是 "themxyz" 的最长前缀
System.out.println(map.longestPrefixOf("themxyz")); // "them"

// "tha" 是 "that" 的前缀
System.out.println(map.hasKeyWithPrefix("tha")); // true

// 没有以 "thz" 为前缀的键
System.out.println(map.hasKeyWithPrefix("thz")); // false

// "that", "the", "them" 都是 "th" 的前缀
System.out.println(map.keysWithPrefix("th")); // ["that", "the", "them"]
``` 

除了 `keysWithPrefix` 方法的复杂度取决于返回结果的长度，其他前缀操作的复杂度都是 O(L)O(L)O(L)，其中 LLL 是前缀字符串长度。

你想想上面这几个操作，用 HashMap 或者 TreeMap 能做到吗？应该只能强行遍历所有键，然后一个个比较字符串前缀，复杂度非常高。

话说，这个 `keysWithPrefix` 方法，是不是很适合做自动补全功能呢？

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
