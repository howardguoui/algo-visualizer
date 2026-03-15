# 二叉堆/优先级队列代码实现

> Source: https://labuladong.online/zh/algo/data-structure-basic/binary-heap-implement/
> Archived: labuladong.online — 算法笔记

---

清除阅读历史

此页内容

# 二叉堆/优先级队列代码实现

前置知识

阅读本文前，你需要先学习：

  * [二叉堆的原理](</zh/algo/data-structure-basic/binary-heap-basic/>)

前文 [二叉堆的原理](</zh/algo/data-structure-basic/binary-heap-basic/>) 介绍了二叉堆的基本性质、API 和常见应用。本文将结合 [可视化面板](</zh/algo/intro/visualize/>) 手把手带你实现一个优先级队列。

我们先实现一个简化版的优先级队列，用来帮你理解二叉堆的核心操作 `sink` 和 `swim`。最后我再用给出一个比较完整的代码实现。

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)

此页内容

  * 简化版优先级队列
  * 难点分析
  * 增：`push/swim` 方法插入元素
  * 删：`pop/sink` 方法删除元素
  * 查：`peek` 方法查看堆顶元素
  * 在数组上模拟二叉树
  * 代码实现
  * 完善版优先级队列

AI 助教

### AI 助教上线

点击右下角的按钮就能唤出网站配套的「AI 助教」答疑解惑，能大幅提升学习效率，效果非常好！ 还没用过的话可以试一试~

[了解详情](</zh/algo/intro/ai-assistant/>)
