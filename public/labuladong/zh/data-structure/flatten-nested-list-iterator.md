# 拓展：惰性展开多叉树

> Source: https://labuladong.online/zh/algo/data-structure/flatten-nested-list-iterator/
> Archived: labuladong.online — 算法笔记

---

# 拓展：惰性展开多叉树

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[341\. Flatten Nested List Iterator](<https://leetcode.com/problems/flatten-nested-list-iterator/>)| [341\. 扁平化嵌套列表迭代器](<https://leetcode.cn/problems/flatten-nested-list-iterator/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树结构基础](</zh/algo/data-structure-basic/binary-tree-basic/>)
  * [二叉树的遍历框架](</zh/algo/data-structure-basic/binary-tree-traverse-basic/>)
  * [多叉树结构及遍历框架](</zh/algo/data-structure-basic/n-ary-tree-traverse-basic/>)

今天来讲一道非常有启发性的设计题目，为什么说它有启发性，我们后面再说。

## 一、题目描述

这是力扣第 341 题「[扁平化嵌套列表迭代器](<https://leetcode.cn/problems/flatten-nested-list-iterator/>)」：

**341\. 扁平化嵌套列表迭代器** |[力扣](<https://leetcode.cn/problems/flatten-nested-list-iterator/>)|[LeetCode](<https://leetcode.com/problems/flatten-nested-list-iterator/>)

给你一个嵌套的整数列表 `nestedList` 。每个元素要么是一个整数，要么是一个列表；该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。

实现扁平迭代器类 `NestedIterator` ：

  * `NestedIterator(List<NestedInteger> nestedList)` 用嵌套列表 `nestedList` 初始化迭代器。
  * `int next()` 返回嵌套列表的下一个整数。
  * `boolean hasNext()` 如果仍然存在待迭代的整数，返回 `true` ；否则，返回 `false` 。

你的代码将会用下述伪代码检测：

```
initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res
``` 

如果 `res` 与预期的扁平化列表匹配，那么你的代码将会被判为正确。

**示例 1：**

```
[1,1,2,1,1]
``` 

**示例 2：**

```
[1,4,6]
``` 

**提示：**

  * `1 <= nestedList.length <= 500`
  * 嵌套列表中的整数值在范围 `[-106, 106]` 内

题目来源：[力扣 341. 扁平化嵌套列表迭代器](<https://leetcode.cn/problems/flatten-nested-list-iterator/>)。

我们的算法会被输入一个 `NestedInteger` 列表，我们需要做的就是写一个迭代器类 `NestedIterator`，将这个带有嵌套结构 `NestedInteger` 的列表「拍平」：

```java
public class NestedIterator implements Iterator<Integer> {
    // 构造器输入一个 NestedInteger 列表
    public NestedIterator(List<NestedInteger> nestedList) {}
    
    // 返回下一个整数
    public Integer next() {}

    // 是否还有下一个元素？
    public boolean hasNext() {}
}
``` 

我们写的这个 `NestedIterator` 类会被这样调用，**先调用`hasNext` 方法，后调用 `next` 方法**：

```
NestedIterator i = new NestedIterator(nestedList);
while (i.hasNext())
    print(i.next());
``` 

学过设计模式的朋友应该知道，迭代器也是设计模式的一种，目的就是为调用者屏蔽底层数据结构的细节，简单地通过 `hasNext` 和 `next` 方法有序地进行遍历。

为什么说这个题目很有启发性呢？因为我最近在用一款类似印象笔记的软件，叫做 Notion（挺有名的）。这个软件的一个亮点就是「万物皆 block」，比如说标题、页面、表格都是 block。有的 block 甚至可以无限嵌套，这就打破了传统笔记本「文件夹」->「笔记本」->「笔记」的三层结构。

回想这个算法问题，`NestedInteger` 结构实际上也是一种支持无限嵌套的结构，而且可以同时表示整数和列表两种不同类型，我想 Notion 的核心数据结构 block 估计也是这样的一种设计思路。

那么话说回来，对于这个算法问题，我们怎么解决呢？`NestedInteger` 结构可以无限嵌套，怎么把这个结构「打平」，为迭代器的调用者屏蔽底层细节，得到扁平化的输出呢？

## 二、解题思路
