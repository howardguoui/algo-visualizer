# 解答回溯算法/DFS算法的若干疑问

> Source: https://labuladong.online/zh/algo/essential-technique/backtrack-vs-dfs/
> Archived: labuladong.online — 算法笔记

---

# 解答回溯算法/DFS算法的若干疑问

前置知识

阅读本文前，你需要先学习：

  * [二叉树系列算法（纲领篇）](</zh/algo/essential-technique/binary-tree-summary/>)
  * [回溯算法核心框架](</zh/algo/essential-technique/backtrack-framework/>)

本文用最简单的示例，一次性解答读者关于回溯算法、DFS 算法的若干疑问：

1、回溯算法和 DFS 算法有何区别？

2、[回溯算法核心框架](</zh/algo/essential-technique/backtrack-framework/>) 中说到回溯算法模板是在递归前做选择，递归后撤销选择，为什么有时候会看到代码在 for 循环的前面「做选择」，在 for 循环的后面「撤销选择」呢？

3、`backtrack/dfs/traverse` 函数可以有返回值吗？

4、base case 和剪枝应该写递归调用之前比较好，还是写在函数开头比较好？

## 回溯算法和 DFS 算法有何区别？

经常有读者问我，网站上为啥只写了回溯算法，却没有写过 DFS 算法呢？

还有些读者有疑问，[回溯算法核心框架](</zh/algo/essential-technique/backtrack-framework/>) 中说到回溯算法模板是在递归前做选择，递归后撤销选择，即这样：

```
void backtrack(...) {
    if (reached the leaf node) {
        // 到达叶子节点，结束递归
        return;
    }

    for (int i = 0; i < n; i++) {
        // 做选择
        ...

        backtrack(...)

        // 撤销选择
        ...
    }
}
``` 

但是为什么有些时候会看到代码在 for 循环的前面「做选择」，在 for 循环的后面「撤销选择」呢：

```
void backtrack(...) {
    if (reached the leaf node) {
        // 到达叶子节点，结束递归
        return;
    }
    // 做选择
    ...

    for (int i = 0, i < n; i++) {
        backtrack(...)
    }

    // 撤销选择
    ...
}
``` 

这两种写法的区别是什么？

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
