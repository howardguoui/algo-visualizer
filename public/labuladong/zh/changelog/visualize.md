# 可视化面板更新日志

> Source: https://labuladong.online/zh/algo/changelog/visualize/
> Archived: labuladong.online — 算法笔记

---

# 可视化面板更新日志

## 2025/2/9

  * 支持 `@visualize transition dp` 注释，用于可视化递推形式的动态规划状态转移过程。
  * 支持自动识别递归函数，并生成递归树。

## 2025/2/3

重大更新

递归算法将提前显示递归树，更直观地展示递归过程。

## 2024/12/28

  * 在 [可视化面板速查表](<https://labuladong.online/zh/visualization/>) 点开可视化页面时，添加相关力扣题目的链接和题解链接。

## 2024/12/22

  * 修复部分题目的可视化面板突然黑屏的问题。

## 2024/12/3

重大更新

新增颜色设置面板，现在可以方便地在可视化面板中直接调整变量的颜色了。

同时也添加了字体大小等通用设置，优化使用体验。

## 2024/11/20

  * 链表、哈希表等结构由于 API 变动导致的可视化出错，现已修复。

## 2024/11/6

  * 修复 [线段树](</zh/algo/data-structure-basic/segment-tree-basic/>) 的 Bug。
  * 优化几种树结构的创建方法。

## 2024/11/3

  * 可视化面板支持 [红黑树](</zh/algo/data-structure-basic/rbtree-basic/>) 结构。

## 2024/10/31

重大升级

可视化面板支持颜色系统，同时支持通过注释关键词和页面调色板修改任意对象的颜色。

详见 [可视化面板的颜色系统](<../%E7%AE%80%E4%BB%8B/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%AE%80%E4%BB%8B.md#color-system>)。

## 2024/10/21

  * 修复可视化面板不能显示排序算法的 bug。

## 2024/10/19

  * 支持可视化 [并查集 Union Find](</zh/algo/data-structure-basic/union-find-basic/>) 结构。
  * 支持可视化 [线段树](</zh/algo/data-structure-basic/segment-tree-basic/>) 结构。
  * 支持可视化 [Trie 树](</zh/algo/data-structure-basic/trie-map-basic/>) 结构。
  * 支持变量绑定、设置节点颜色等功能。

具体用法参见 [可视化面板使用说明](</zh/algo/intro/visualize/>)。

## 2024/10/13

  * 优化体验：点击代码跳转到下次执行时，数据结构不再会闪动。
  * 二叉堆结构可以使用 `showArray` 展示底层数组。

## 2024/10/3

重大更新

添加 `@visualize cert` 注释支持按照直方图的形式显示数组元素，辅助本站 [排序算法章节](</zh/algo/data-structure-basic/sort-basic/>) 的学习。

算法可视化

## 2024/7/17

重大更新

添加 `@visualize bfs` 注释支持可视化 BFS 算法，具体使用方法参见 [可视化面板简介](</zh/algo/intro/visualize/>)。

算法可视化

## 2024/7/17

重大 bug 修复

修复构建二叉树/多叉树时，节点不显示的问题。

## 2024/6/10

重大更新

使用 `@visualize` 标签对递归函数生成的递归树支持区分「已完成」和「未完成」状态，更直观地显示当前递归函数是否已经计算完成：

算法可视化

## 2024/6/2

重大更新

支持可视化 [二叉堆](</zh/algo/data-structure-basic/binary-heap-basic/>) 结构，具体使用方法参见 [可视化面板简介](</zh/algo/intro/visualize/>)。

## 2024/5/19

  * 点击 Console Log 面板后，对齐辅助线的颜色更加明显，方便查看递归层级。
  * 给面板的各个部分添加滚动条，可以用鼠标拖动查看。

## 2024/5/1

重大更新

支持查看 console 输出，在代码中直接使用 `console.log` 即可。

原生的 `console.log` 方法被我加强了，**可以自动根据递归深度给输出内容加上缩进** ，方便你观察递归过程。如果你不希望自动添加缩进，可以使用 `console._log` 方法。

具体介绍见 [可视化面板简介](</zh/algo/intro/visualize/>)。

## 2024/4/6

重大更新

鼠标悬停在代码上方，支持跳转到上一次执行位置。

## 2024/4/3

  * 支持 `@visualize hide` 和 `@visualize global` 注释，具体介绍见 [可视化面板简介](</zh/algo/intro/visualize/>)。

## 2024/3/18

  * 支持 GitHub 登录。

## 2024/3/12

  * 优化编译器效率，优化动画渲染速度。
  * 提升动画的稳定性。

## 2024/3/5

  * 可视化面板右下角添加刷新和全屏按钮，方便读者在插件中刷新面板或全屏显示。
  * 优化高亮代码的跳转逻辑，当播放算法执行步骤时，避免左侧代码跳来跳去影响体验。

## 2024/2/17

bug 修复

修复部分代码编译时出现报错：`Error: No substitution given for "__X34"` 的 bug。

## 2024/2/1

重大更新

新网站 [labuladong.online](<https://labuladong.online/algo/>)、[vscode 刷题插件](</zh/algo/intro/vscode/>)、[Jetbrains 插件](</zh/algo/intro/jetbrains/>)、[Chrome 插件](</zh/algo/intro/chrome/>) 中的算法可视化面板添加「编辑」按钮，读者可以直接修改算法可视化面板的代码并执行。

## 2024/1/10

重大更新

支持 `@visualize choice(nums[i])` 和 `@visualize unchoice(nums[i])` 注释，用于可视化回溯/动态规划算法的选择和撤销选择过程。鼠标移动到递归树节点上，会显示递归路径上所做的所有选择：

![diagram](https://labuladong.online/images/algo/changelog/editor-choose.jpg)

网站/插件所有的可视化面板已更新这个新功能。具体介绍见 [可视化面板简介](</zh/algo/intro/visualize/>)。

  * `@visualize` 关键词会用蓝色显示，方便用户确认递归追踪是否生效。

## 2024/1/7

  * 修复可视化面板「上一步」按钮导致数据结构错乱的 bug。

  * 模仿 IDE 代码调试的实用体验，优化可视化面板的代码显示效果：注释用灰色表示，已完成执行的代码用暗黄色显示，当前执行到的代码用绿色高亮显示，还未执行到的代码用白色显示。 ![diagram](https://labuladong.online/images/algo/changelog/editor-code-color.jpg)

  * 支持双链表的可视化。 ![diagram](https://labuladong.online/images/algo/visualize_intro/editor-double-list.jpg)

## 2024/1/1

可视化面板正式上线，使用地址：

<https://labuladong.online/algo-visualize/>[](<https://labuladong.online/algo-visualize/>)

## 评论

请登录后查看/发表评论
