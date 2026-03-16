# Jetbrain 刷题插件更新日志

> Source: https://labuladong.online/zh/algo/changelog/jetbrain/
> Archived: labuladong.online — 算法笔记

---

# Jetbrain 刷题插件更新日志

Info

本页面为 Jetbrain 插件的更新日志，插件的详细使用指南见 [Jetbrain 插件说明书](</zh/algo/intro/jetbrains/>)。

## ¶v3.1.2

  * 修复新版 IDE 中无法显示插件菜单栏的 bug。


## ¶v3.1.0

重大更新

支持 Java/C++/Python/JavaScript/Golang 算法代码的本地调试，详细配置方法见 [Jetbrain 插件说明书](</zh/algo/intro/jetbrains/>)。

## ¶v3.0.0

  * 添加了 [速成目录](</zh/algo/intro/quick-learning-plan/>) 和 [初学者目录](</zh/algo/intro/beginner-learning-plan/>) 的题目列表，方便速成读者和初学者进行复习。
  * 修复了有时点击刷新、登录按钮 IDE 会短暂卡住的问题。


## ¶v2.0.3

  * 修复题解 markdown 无法渲染的问题 [#2088](<https://github.com/labuladong/fucking-algorithm/issues/2088>)
  * 优化算法可视化面板缓存出错的问题。


## ¶v2.0.2

  * 将登录方式统一为 cookie 登录，修复了部分用户无法登录的问题。
  * 提升海外用户拉取网站数据的速度。


## ¶v2.0.0

  * 国际化：支持将 labuladong 题解及思路设置为英文。


## ¶v1.9.1

重大 bug 修复

  * 修复了之前版本无法正常登录/提交代码的问题。
  * 修复了拉取网站会员数据报错 `labuladong 网站会员 专属题解拉取失败，可能是网站 cookie 格式错误或者已过期，请更新网站 cookie 后尝试 ❌` 的问题。


兼容性改变

插件兼容性改变为 `2022.2+`，即不再支持 `2022.2` 以下版本的 IDE。如无法更新插件，请升级 IDE 版本。

## ¶v1.8.9

  * 修复部分情况下登录力扣账号速度较慢的问题。


## ¶2024/6/29

重大提升

大幅提升思路中多语言解法的准确性。

## ¶2024/6/25

  * 修复了插件思路中，文章链接还引用旧版课程链接的问题。按照 [Jetbrain 插件说明书](</zh/algo/intro/jetbrains/>) 中的方法，重新拉取数据即可。


## ¶v1.8.8

  * 部分用户反馈 IDE 中可视化面板无法使用鼠标滚动。暂时不知道原因，但是我在可视化面板上添加了滚动条，如果你遇到这个问题，可以尝试用鼠标拖动滚动条滚动页面。

  * 优化用户体验，提升数据拉取速度。


## ¶v1.8.6

重大 bug 修复

由于英文版 leetcode.com 添加了 cloudfare 的保护，导致插件原先的网络请求被拦截，无法正常登录和使用。本次更新修复了这个问题。

## ¶v1.8.4

重大 bug 修复

修复部分情况下无法点开插件配置页面的 bug。

## ¶v1.8.1

重大 bug 修复

修复部分情况下可视化面板加载时会意外跳转到浏览器的情况！

## ¶v1.8.0

Breaking Change

放弃小鹅通和旧网站的支持，适配新网站 [labuladong.online](<https://labuladong.online/algo/>)。在插件中解锁课程专属题解的方法有些变化，课程的第一章有具体介绍。

重大更新

可视化面板新增「编辑」按钮，支持修改我的解法代码后直接在面板上运行，方便验证你的奇思妙想：

![](/images/algo/changelog/jetbrain-viz-editor.jpg)

## ¶v1.7.6

重大 bug 修复

修复最新版 2023.3 IDE 开启 new UI 后无法使用插件的 bug。

## ¶v1.7.5

  * 优化部分用户提示，比如课程数据拉取失败时给出更用户友好的提示指引。
  * 有用户反馈，编辑器打开的代码题目页面的标题是力扣的题号和题目，不方便摸鱼刷题 😅。本次更新后，代码文件名的模板（Code File Name 配置）将同时作用于打开的页面标题。


## ¶v1.7.3

重大 bug 修复

修复可视化面板样式错乱的问题

![](/images/algo/visualize_intro/jetbrain_example.jpg)

## ¶v1.7.2

  * 优化了可视化面板的展示逻辑，优化了数据拉取逻辑。


## ¶v1.7.0

  * 支持了算法可视化，但是还是有些偶发性 bug，未来逐步优化。


## ¶v1.6.2

  * 思路中支持显示所有主流编程语言的解法。


更新时间：2026/03/14 00:17

Loading comments...
