# 实际运用二分搜索时的思维框架

> Source: https://labuladong.online/zh/algo/frequency-interview/binary-search-in-action/
> Archived: labuladong.online — 算法笔记

---

# 实际运用二分搜索时的思维框架

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[875\. Koko Eating Bananas](<https://leetcode.com/problems/koko-eating-bananas/>)| [875\. 爱吃香蕉的珂珂](<https://leetcode.cn/problems/koko-eating-bananas/>)|   
[1011\. Capacity To Ship Packages Within D Days](<https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/>)| [1011\. 在 D 天内送达包裹的能力](<https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/>)|   
[410\. Split Array Largest Sum](<https://leetcode.com/problems/split-array-largest-sum/>)| [410\. 分割数组的最大值](<https://leetcode.cn/problems/split-array-largest-sum/>)|   
  
前置知识

阅读本文前，你需要先学习：

  * [二分查找框架详解](</zh/algo/essential-technique/binary-search-framework/>)


在 [二分查找框架详解](</zh/algo/essential-technique/binary-search-framework/>) 中我们详细研究了二分搜索的细节问题，探讨了「搜索一个元素」，「搜索左侧边界」，「搜索右侧边界」这三个情况，教你如何写出正确无 bug 的二分搜索算法。

**但是前文总结的二分搜索代码框架仅仅局限于「在有序数组中搜索指定元素」这个基本场景，具体的算法问题没有这么直接，可能你都很难看出这个问题能够用到二分搜索** 。

所以本文就来总结一套二分搜索算法运用的框架套路，帮你在遇到二分搜索算法相关的实际问题时，能够有条理地思考分析，步步为营，写出答案。

## ¶原始的二分搜索代码

二分搜索的原型就是在「**有序数组** 」中搜索一个元素 `target`，返回该元素对应的索引。

如果该元素不存在，那可以返回一个什么特殊值，这种细节问题只要微调算法实现就可实现。

还有一个重要的问题，如果「**有序数组** 」中存在多个 `target` 元素，那么这些元素肯定挨在一起，这里就涉及到算法应该返回最左侧的那个 `target` 元素的索引还是最右侧的那个 `target` 元素的索引，也就是所谓的「搜索左侧边界」和「搜索右侧边界」，这个也可以通过微调算法的代码来实现。

**我们前文[二分搜索核心框架](</zh/algo/essential-technique/binary-search-framework/>) 详细探讨了上述问题，对这块还不清楚的读者建议复习前文**，已经搞清楚基本二分搜索算法的读者可以继续看下去。

**在具体的算法问题中，常用到的是「搜索左侧边界」和「搜索右侧边界」这两种场景** ，很少有让你单独「搜索一个元素」。

因为算法题一般都让你求最值，比如让你求吃香蕉的「最小速度」，让你求轮船的「最低运载能力」，求最值的过程，必然是搜索一个边界的过程，所以后面我们就详细分析一下这两种搜索边界的二分算法代码。

Note

注意，本文我写的都是左闭右开的二分搜索写法，如果你习惯两端都闭的写法，可以自行改写代码。

「搜索左侧边界」的二分搜索算法的具体代码实现如下：

CC++GoJavaJavaScriptPython
    
    
    // 搜索左侧边界
    int left_bound(int[] nums, int target) {
        if (nums.length == 0) return -1;
        int left = 0, right = nums.length;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 当找到 target 时，收缩右侧边界
                right = mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid;
            }
        }
        return left;
    }

假设输入的数组 `nums = [1,2,3,3,3,5,7]`，想搜索的元素 `target = 3`，那么算法就会返回索引 2。

如果画一个图，就是这样：

![](/images/algo/binary-search-in-action/1.jpeg)

「搜索右侧边界」的二分搜索算法的具体代码实现如下：

CC++GoJavaJavaScriptPython
    
    
    // 搜索右侧边界
    int right_bound(int[] nums, int target) {
        if (nums.length == 0) return -1;
        int left = 0, right = nums.length;
    
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 当找到 target 时，收缩左侧边界
                left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid;
            }
        }
        return left - 1;
    }

输入同上，那么算法就会返回索引 4，如果画一个图，就是这样：

![](/images/algo/binary-search-in-action/2.jpeg)

好，上述内容都属于复习，我想读到这里的读者应该都能理解。记住上述的图像，所有能够抽象出上述图像的问题，都可以使用二分搜索解决。

更新时间：2026/03/14 00:17

Loading comments...
