# Trie 树算法习题

> Source: https://labuladong.online/zh/algo/problem-set/trie/
> Archived: labuladong.online — 算法笔记

---

# Trie 树算法习题

前置知识

阅读本文前，你需要先学习：

  * [Trie 树原理](</zh/algo/data-structure-basic/trie-map-basic/>)
  * [TrieMap/TrieSet 代码实现](</zh/algo/data-structure/trie-implement/>)


有了 `TrieMap` 和 `TrieSet`，力扣上所有前缀树相关的题目都可以直接套用了，下面我举几个题目实践一下。

可以尝试优化

**首先，前文[TrieMap/TrieSet 代码实现](</zh/algo/data-structure/trie-implement/>) 给出的 `TrieMap/TrieSet` 执行效率在具体的题目里面肯定是有优化空间的**。

比如力扣前缀树相关题目的输入都被限制在小写英文字母 `a-z`，所以 `TrieNode` 其实不用维护一个大小为 256 的 `children` 数组，大小设置为 26 就够了，可以减小时间和空间上的复杂度。

另外，之前给出的 Java/cpp 代码带有泛型，在做算法题的时候其实不需要，去掉泛型也可以获得一定的效率提升。

更新时间：2026/03/14 00:17

Loading comments...
