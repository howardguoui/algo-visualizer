# 动态规划和回溯算法的思维转换

> Source: https://labuladong.online/zh/algo/dynamic-programming/word-break/
> Archived: labuladong.online — 算法笔记

---

# 动态规划和回溯算法的思维转换

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[139\. Word Break](<https://leetcode.com/problems/word-break/>)| [139\. 单词拆分](<https://leetcode.cn/problems/word-break/>)|   
[140\. Word Break II](<https://leetcode.com/problems/word-break-ii/>)| [140\. 单词拆分 II](<https://leetcode.cn/problems/word-break-ii/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>)

之前 [手把手带你刷二叉树（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>) 把递归穷举划分为「遍历」和「分解问题」两种思路，其中「遍历」的思路扩展延伸一下就是 [回溯算法](</zh/algo/essential-technique/backtrack-framework/>)，「分解问题」的思路可以扩展成 [动态规划算法](</zh/algo/essential-technique/dynamic-programming-framework/>)。

这种思维转换不止局限于二叉树相关的算法，本文就跳出二叉树类型问题，来看看实际算法题中如何把问题抽象成树形结构，见招拆招逐步优化，从而进行「遍历」和「分解问题」的思维转换，从回溯算法顺滑地切换到动态规划算法。

先说句题外话，前文 [动态规划核心框架详解](</zh/algo/essential-technique/dynamic-programming-framework/>) 说，**标准的动态规划问题一定是求最值的** ，因为动态规划类型问题有一个性质叫做「最优子结构」，即从子问题的最优解推导出原问题的最优解。

但在我们平常的语境中，就算不是求最值的题目，只要看见使用备忘录消除重叠子问题，我们一般都称它为动态规划算法。严格来讲这是不符合动态规划问题的定义的，说这种解法叫做「带备忘录的 DFS 算法」可能更准确些。不过咱也不用太纠结这种名词层面的细节，既然大家叫的顺口，就叫它动态规划也无妨。

本文讲解的两道题目也不是求最值的，但依然会把他们的解法称为动态规划解法，这里提前跟大家说下这个变通，免得严谨的读者疑惑。其他不多说了，直接看题目吧。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
