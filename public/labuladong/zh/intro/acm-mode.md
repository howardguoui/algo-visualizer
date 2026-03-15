# ACM 模式代码模板

> Source: https://labuladong.online/zh/algo/intro/acm-mode/
> Archived: labuladong.online — 算法笔记

---

# ACM 模式代码模板

本站的教程文章中大部分以力扣题目作为例题，力扣题目采用的是「核心代码」模式，但是在面试和笔试中，很多公司会采用「ACM 模式」。

所以本文具体介绍一下 ACM 模式和核心代码模式的区别，并提供一套通用的 ACM 模式代码模板，帮你把 ACM 模式转化成熟悉的核心代码模式代码。

另外，本站 [配套题库](<https://labuladong.online/zh/problemset/core/>) 中的所有题目同时支持核心代码模式和 ACM 模式，大家也可以在题库中练习，理解两种模式的区别和联系。

## ¶ACM 模式 vs 核心代码模式

ACM 模式和力扣刷题主要有三个区别：左下方题目示例、右下方自测用例区域、右上方代码区域。

如下图所示，是 leetcode 模式（核心代码模式）：

![](/images/algo/acm/core-light.jpg)

注意以下几点：

  1. 左下方题目示例直接描述函数入参。
  2. 右下方自测用例的输入就是入参的值，和题目示例类似。
  3. 右上方代码区域仅需编写算法函数，把结果通过返回值返回。


如下图所示，是 ACM 模式：

![](/images/algo/acm/acm-light.jpg)

注意以下几点：

  1. 左下方题目示例就是若干行字符串，告诉你这些字符串的格式以及结构。
  2. 右下方自测用例的输入也是多行字符串，和题目示例类似。
  3. 右上方代码区域需要自己导包，自己读取解析字符串，然后才是写算法求解，最后还要把结果打印出来。


接下来看 ACM 模式的代码，最关键的是：**一定要读取到输入的 EOF 才能停，因为你不知道题目输入多少组测试用例** 。

如上图，其实你把数据读取的逻辑和算法逻辑解耦，就可以完全转化成 leetcode 模式了。理论上，你不用这样解耦，可以一遍读取数据一边计算结果，但是那样代码会比较混乱，不利于调试和理解。

所以我建议按照上图那样，把数据读取的逻辑和算法逻辑解耦，既方便调试和理解，又和 leetcode 的核心代码模式相似。

## ¶ACM 模式代码模板

Java/C++/Python/JS/Go 的 ACM 代码模板如下，重点记忆如何读输入读到 EOF 就行：

C++GoJavaJavaScriptPython
    
    
    import java.util.*;
    
    class Solution {
        public int add(int a, int b) {
            return a + b;
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            // 读取到 EOF
            while (sc.hasNext()) {
                int a = sc.nextInt();
                int b = sc.nextInt();
                int result = new Solution().add(a, b);
                System.out.println(result);
            }
            sc.close();
        }
    }

ACM 本身没啥难的，花半个小时就能学会了，算法本身才是重点啊！

所以我的建议是，大家平时完全可以用核心代码模式来刷题、学习算法。面试笔试前夕，在 [本站配套题库](<https://labuladong.online/zh/problemset/core/>) 中练习一下 ACM 模式就可以了。

更新时间：2026/03/14 00:17

Loading comments...
