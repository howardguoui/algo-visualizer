# 常数时间删除/查找数组中的任意元素

> Source: https://labuladong.online/zh/algo/data-structure/random-set/
> Archived: labuladong.online — 算法笔记

---

# 常数时间删除/查找数组中的任意元素

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[380\. Insert Delete GetRandom O(1)](<https://leetcode.com/problems/insert-delete-getrandom-o1/>)| [380\. O(1) 时间插入、删除和获取随机元素](<https://leetcode.cn/problems/insert-delete-getrandom-o1/>)|   
[710\. Random Pick with Blacklist](<https://leetcode.com/problems/random-pick-with-blacklist/>)| [710\. 黑名单中的随机数](<https://leetcode.cn/problems/random-pick-with-blacklist/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [用数组加强哈希表](</zh/algo/data-structure-basic/hashtable-with-array/>)

本文讲两道比较有技巧性的数据结构设计题，都是和随机读取元素相关的，我在前文 [谈谈游戏中的随机算法](</zh/algo/frequency-interview/random-algorithm/>) 也写过类似的问题。

这些问题的一个技巧点在于，如何结合哈希表和数组，使得数组的删除操作时间复杂度也变成 O(1)？下面来一道道看。
