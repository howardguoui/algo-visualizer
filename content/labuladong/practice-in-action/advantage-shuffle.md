# 田忌赛马背后的算法决策

> Source: https://labuladong.online/zh/algo/practice-in-action/advantage-shuffle/
> Archived: labuladong.online — 算法笔记

---

# 田忌赛马背后的算法决策

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[870\. Advantage Shuffle](<https://leetcode.com/problems/advantage-shuffle/>)| [870\. 优势洗牌](<https://leetcode.cn/problems/advantage-shuffle/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [数组双指针技巧汇总](</zh/algo/essential-technique/array-two-pointers-summary/>)
  * [二叉堆原理](</zh/algo/data-structure-basic/binary-heap-basic/>)
  * [二叉堆实现优先级队列](</zh/algo/data-structure-basic/binary-heap-implement/>)


田忌赛马的故事大家应该都听说过：

田忌和齐王赛马，两人的马分上中下三等，如果同等级的马对应着比赛，田忌赢不了齐王。但是田忌遇到了孙膑，孙膑就教他用自己的下等马对齐王的上等马，再用自己的上等马对齐王的中等马，最后用自己的中等马对齐王的下等马，结果三局两胜，田忌赢了。

当然，这段历史也挺有意思的，那个讽齐王纳谏，自恋的不行的邹忌和田忌是同一时期的人，他俩后来就杠上了。不过这是题外话，我们这里就打住。

以前学到田忌赛马课文的时，我就在想，如果不是三匹马比赛，而是一百匹马比赛，孙膑还能不能合理地安排比赛的顺序，赢得齐王呢？

当时没想出什么好的点子，只觉得这里面最核心问题是要尽可能让自己占便宜，让对方吃亏。总结来说就是，**打得过就打，打不过就拿自己的垃圾和对方的精锐互换** 。

不过，我一直没具体把这个思路实现出来，直到最近刷到力扣第 870 题「[优势洗牌](<https://leetcode.cn/problems/advantage-shuffle/>)」，一眼就发现这是田忌赛马问题的加强版：

给你输入两个**长度相等** 的数组 `nums1` 和 `nums2`，请你重新组织 `nums1` 中元素的位置，使得 `nums1` 的「优势」最大化。

如果 `nums1[i] > nums2[i]`，就是说 `nums1` 在索引 `i` 上对 `nums2[i]` 有「优势」。优势最大化也就是说让你重新组织 `nums1`，**尽可能多的让`nums1[i] > nums2[i]`**。

算法签名如下：

CC++GoJavaJavaScriptPython
    
    
    int[] advantageCount(int[] nums1, int[] nums2);

比如输入：
    
    
    nums1 = [12,24,8,32]
    nums2 = [13,25,32,11]

你的算法应该返回 `[24,32,8,12]`，因为这样排列 `nums1` 的话有三个元素都有「优势」。

**这就像田忌赛马的情景，`nums1` 就是田忌的马，`nums2` 就是齐王的马，数组中的元素就是马的战斗力，你就是孙膑，展示你真正的技术吧**。

更新时间：2026/03/14 00:17

Loading comments...
