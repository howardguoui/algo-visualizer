# 编程语言刷题实践

> Source: https://labuladong.online/zh/algo/programming-language-basic/lc-practice/
> Archived: labuladong.online — 算法笔记

---

# 编程语言刷题实践

前面的编程语言基础章节，我已经介绍了每种语言的基本语法和常用数据结构的使用方法，下面我们来写几道简单的算法题，一方面实操编程语言的使用，另一方面也熟悉一下在力扣上刷题的流程。

如果你是第一次刷题，下面的代码务必亲自动手去力扣上提交一遍，体验一下。

本文解法可能不是最优解

**本文的重点是帮助初学者运用前面所学的编程语言基础，而不是讲解算法思路** 。所以我给出的思路和解法代码都比较简单直接，可能不是最优解。

这些算法题在后面的章节中会有更详细的讲解和优化，随着你对数据结构和算法的深入学习，自然会对它们有更深的理解。

## 1\. 两数之和

**1\. 两数之和** |[力扣](<https://leetcode.cn/problems/two-sum/>)|[LeetCode](<https://leetcode.com/problems/two-sum/>)

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** _`target`_ 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
``` 

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
``` 

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
``` 

**提示：**

  * `2 <= nums.length <= 104`
  * `-109 <= nums[i] <= 109`
  * `-109 <= target <= 109`
  * **只会存在一个有效答案**

**进阶：** 你可以想出一个时间复杂度小于 `O(n2)` 的算法吗？

题目来源：[力扣 1. 两数之和](<https://leetcode.cn/problems/two-sum/>)。

作为力扣的第一道题，这道题还是非常经典的，我们来尝试解决。

最简单的办法就是穷举嘛，用嵌套 for 循环，外层循环固定第一个数，内层循环找另一个数，看看它们的和是否等于目标值。

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
``` 

这就是 for 循环和 if 条件的简单运用，需要注意我们遍历 `j` 的时候，是从 `i+1` 开始的，不能从 `i` 开始，因为不能重复使用同一个元素；也没必要从 0 开始，因为 `i` 前面的元素和 `nums[i]` 的组合在之前的循环中已经被穷举过了。

## 217\. 存在重复元素

**217\. 存在重复元素** |[力扣](<https://leetcode.cn/problems/contains-duplicate/>)|[LeetCode](<https://leetcode.com/problems/contains-duplicate/>)

给你一个整数数组 `nums` 。如果任一值在数组中出现 **至少两次** ，返回 `true` ；如果数组中每个元素互不相同，返回 `false` 。 

**示例 1：**

```
输入：nums = [1,2,3,1]
输出：true
``` 

**示例 2：**

```
输入：nums = [1,2,3,4]
输出：false
``` 

**示例 3：**

```
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
``` 

**提示：**

  * `1 <= nums.length <= 105`
  * `-109 <= nums[i] <= 109`

题目来源：[力扣 217. 存在重复元素](<https://leetcode.cn/problems/contains-duplicate/>)。

这道题让你判断数组中是否存在重复元素，元素去重是哈希集合的经典应用场景，因为哈希集合可以快速地判断一个元素是否存在集合中。

我们可以把数组中的元素逐个放入哈希集合中，如果发现某个元素已经存在，就直接返回 `true`。

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        count = set()
        for num in nums:
            # 如果元素已经存在，直接返回 True
            if num in count:
                return True
            # 将元素放入哈希集合
            count.add(num)
        return False
``` 

## 136\. 只出现一次的数字

**136\. 只出现一次的数字** |[力扣](<https://leetcode.cn/problems/single-number/>)|[LeetCode](<https://leetcode.com/problems/single-number/>)

给你一个 **非空** 整数数组 `nums` ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

**示例 1 ：**

```
输入：nums = [2,2,1]
输出：1
``` 

**示例 2 ：**

```
输入：nums = [4,1,2,1,2]
输出：4
``` 

**示例 3 ：**

```
输入：nums = [1]
输出：1
``` 

**提示：**

  * `1 <= nums.length <= 3 * 104`
  * `-3 * 104 <= nums[i] <= 3 * 104`
  * 除了某个元素只出现一次以外，其余每个元素均出现两次。

题目来源：[力扣 136. 只出现一次的数字](<https://leetcode.cn/problems/single-number/>)。

这道题让你找出数组中只出现一次的数字，对于元素计数相关的问题，我们一般要用键值对来存储元素和其出现次数的对应关系，也就是要用到哈希表这种数据结构。

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        count = {}
        # 遍历数组，统计每个数字出现的次数
        for num in nums:
            count[num] = count.get(num, 0) + 1

        # 找到只出现一次的数字
        for num in nums:
            if count[num] == 1:
                return num
        return -1
``` 

## 20\. 有效的括号

**20\. 有效的括号** |[力扣](<https://leetcode.cn/problems/valid-parentheses/>)|[LeetCode](<https://leetcode.com/problems/valid-parentheses/>)

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

  1. 左括号必须用相同类型的右括号闭合。
  2. 左括号必须以正确的顺序闭合。
  3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```
输入：s = "()"
输出：true
``` 

**示例 2：**

```
输入：s = "()[]{}"
输出：true
``` 

**示例 3：**

```
输入：s = "(]"
输出：false
``` 

**提示：**

  * `1 <= s.length <= 104`
  * `s` 仅由括号 `'()[]{}'` 组成

题目来源：[力扣 20. 有效的括号](<https://leetcode.cn/problems/valid-parentheses/>)。

这是一道经典的括号问题，这类问题一般都可以用栈来解决，思路是：**遇到左括号则把左括号入栈，遇到右括号则把栈顶的左括号拿出来，看是否和右括号匹配** 。

```python
class Solution:
    def isValid(self, s: str) -> bool:
        # 用列表模拟栈
        left = []
        for c in s:
            if c in '({[':
                # 字符 c 是左括号，入栈
                left.append(c)
            else:
                # 字符 c 是右括号
                if left and self.leftOf(c) == left[-1]:
                    left.pop()
                else:
                    # 和最近的左括号不匹配
                    return False
        # 是否所有的左括号都被匹配了
        return not left

    def leftOf(self, c: str) -> str:
        if c == '}': return '{'
        if c == ')': return '('
        return '['
``` 

## 2073\. 买票需要的时间

**2073\. 买票需要的时间** |[力扣](<https://leetcode.cn/problems/time-needed-to-buy-tickets/>)|[LeetCode](<https://leetcode.com/problems/time-needed-to-buy-tickets/>)

有 `n` 个人前来排队买票，其中第 `0` 人站在队伍 **最前方** ，第 `(n - 1)` 人站在队伍 **最后方** 。

给你一个下标从 **0** 开始的整数数组 `tickets` ，数组长度为 `n` ，其中第 `i` 人想要购买的票数为 `tickets[i]` 。

每个人买票都需要用掉 **恰好 1 秒** 。一个人 **一次只能买一张票** ，如果需要购买更多票，他必须走到 **队尾** 重新排队（**瞬间** 发生，不计时间）。如果一个人没有剩下需要买的票，那他将会 **离开** 队伍。

返回位于位置 `k`（下标从 **0** 开始）的人完成买票需要的时间（以秒为单位）。

**示例 1：**

```
输入：tickets = [2,3,2], k = 2
输出：6
解释： 
- 第一轮，队伍中的每个人都买到一张票，队伍变为 [1, 2, 1] 。
- 第二轮，队伍中的每个都又都买到一张票，队伍变为 [0, 1, 0] 。
位置 2 的人成功买到 2 张票，用掉 3 + 3 = 6 秒。
``` 

**示例 2：**

```
输入：tickets = [5,1,1,1], k = 0
输出：8
解释：
- 第一轮，队伍中的每个人都买到一张票，队伍变为 [4, 0, 0, 0] 。
- 接下来的 4 轮，只有位置 0 的人在买票。
位置 0 的人成功买到 5 张票，用掉 4 + 1 + 1 + 1 + 1 = 8 秒。
``` 

**提示：**

  * `n == tickets.length`
  * `1 <= n <= 100`
  * `1 <= tickets[i] <= 100`
  * `0 <= k < n`

题目来源：[力扣 2073. 买票需要的时间](<https://leetcode.cn/problems/time-needed-to-buy-tickets/>)。

这是一个实际场景的算法题，比较有意思。我们如果直接用队列来模拟整个过程，肯定可以解决这个问题。直接看代码吧：

```python
class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        # 用队列模拟整个过程
        queue = collections.deque()
        for i in range(len(tickets)):
            queue.append(i)

        time = 0
        while queue:
            # 队头的人买票
            front = queue.popleft()
            time += 1
            tickets[front] -= 1
            
            if front == k and tickets[front] == 0:
                # 如果是 k 号买完票了，返回总时间
                return time

            if tickets[front] == 0:
                continue

            # 如果还要继续买票，重新排到队尾
            queue.append(front)
        return time
``` 

## 总结 & 展望

通过上面这些题目实践，你应该已经知道了如何在力扣上刷题，以及如何用你所学的编程语言来解决问题。

虽然上面有些解法代码并不是最优解，但无所谓，算法优化都有固定的套路，随着你往后学习，也可以随手写出最优解，没什么困难的。

对于初学者来说，迈出这第一步就已经很了不起了，千里之行始于足下，干就完事了。

接下来的内容主要分两大块：

1、我们会先深入理解数据结构的原理，以及一些特殊数据结构的使用场景。因为数据结构是求解算法题的有效工具，就以上面的题目为例，如果没有哈希表，你怎么对数组中的元素进行计数呢？所以想搞定算法，就要了解常见的数据结构有哪些，它们的优势和局限性是什么，它们的每个操作的时间复杂度是多少。

2、结合算法模板，大量地刷题，让你熟练掌握各种算法的解题思路并运用自如。上面的这些算法难度相对简单，后面的题目会逐渐增加难度，但是不用怕，算法本质都是穷举，只要你掌握了几种常见的穷举思维，我们见招拆招，总能找到解题的突破口。

最后，祝你早日能够独自遨游题海！

## 评论

请登录后查看/发表评论
