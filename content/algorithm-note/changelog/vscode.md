# vscode 刷题插件更新日志

> Source: https://labuladong.online/zh/algo/changelog/vscode/
> Archived: labuladong.online — 算法笔记

---

# vscode 刷题插件更新日志

Info

本页面为 vscode 插件的更新日志，插件的详细使用指南见[vscode 插件说明书](</zh/algo/intro/vscode/>)。

## ¶v3.3.1

  * 修复 cursor 2.0 中登录 leetcode 报错的问题。


## ¶v3.3.0

  * 将 [刷题路线图](</zh/algo/intro/quick-learning-plan/>) 集成入插件。
  * 简化登录 labuladong.online 的流程，详见 [vscode 插件说明书](</zh/algo/intro/vscode/>)。


## ¶v3.2.3

  * 优化若干日志提示。


## ¶v3.2.1

  * 使用 iframe 渲染思路弹窗，优化用户体验，提供和网站相同的使用体验。


## ¶v3.1.3

  * 修复了少部分用户无法拉取网站会员数据的 bug。


## ¶v3.1.0

重大更新

支持 Java/C++/Python/JavaScript/Golang 算法代码的本地调试，详细配置方法见 [vscode 插件说明书](</zh/algo/intro/vscode/>)。

## ¶3.0.5

  * 修复了最新版 Chrome 浏览器复制的 cURL 命令无法登录的问题 [#2462](<https://github.com/labuladong/fucking-algorithm/issues/2462>)。


## ¶3.0.0

  * 添加了 [速成目录](</zh/algo/intro/quick-learning-plan/>) 和 [初学者目录](</zh/algo/intro/beginner-learning-plan/>) 的题目列表，方便速成读者和初学者进行复习。


## ¶v2.0.4

  * 修复部分题目思路的可视化面板显示不全的问题。
  * 优化算法可视化面板缓存出错的问题。


## ¶v2.0.3

  * 修复中文力扣无法登录的问题 [#1825](<https://github.com/labuladong/fucking-algorithm/issues/1825>)。
  * 修复了每次都会弹出报错窗口的问题 [#1739](<https://github.com/labuladong/fucking-algorithm/issues/1739>)。


## ¶v2.0.2

  * 修复优化了若干细节问题。
  * 默认代码文件的命名规范改为题目名称，并在 [vscode 插件说明书](</zh/algo/intro/vscode/>) 中添加了相关说明。
  * 提升海外用户拉取网站数据的速度。


## ¶v2.0.0

  * 借鉴了开源插件 [ccagml/leetcode-extension](<https://github.com/ccagml/leetcode-extension>) 中的部分功能，包括自运行自定义测试用例、curl 登录等，修复英文版 LeetCode 无法登录的问题。
  * 国际化：支持将 labuladong 题解及思路设置为英文。


Breaking Change

现在 vscode 统一使用 curl 命令登录 力扣/LeetCode 账号，具体操作方法见 [vscode 插件说明书](</zh/algo/intro/vscode/>)。

请使用 Chrome/Edge 等主流浏览器复制 curl 命令，因为非主流浏览器的开发者工具不完善，复制的 curl 命令可能是错的。

## ¶2024/6/29

重大提升

大幅提升思路中多语言解法的准确性。

## ¶2024/6/25

bug 修复

修复了插件思路中，文章链接还引用旧版课程链接的问题。按照 [vscode 插件说明书](</zh/algo/intro/vscode/>) 中的方法，重新拉取数据即可。

## ¶v1.5.6

优化插件数据拉取速度。

## ¶v1.5.5

支持 [新版网站会员](</zh/algo/intro/site-vip/>)。

## ¶v1.5.4

重大 bug 修复

由于英文版 leetcode.com 添加了 cloudfare 的保护，导致插件原先的网络请求被拦截，无法正常登录和使用。本次更新修复了这个问题。

## ¶v1.5.3

  * 优化文章跳转链接的响应速度，修复部分用户反馈题解链接无法跳转的问题。
  * 可视化面板支持全屏和刷新按钮。


## ¶v1.5.1

Breaking Change

放弃小鹅通和旧网站的支持，适配新网站 [labuladong.online](<https://labuladong.online/algo/>)。在插件中解锁课程专属题解的方法有些变化，课程的第一章有具体介绍。

重大更新

可视化面板新增「编辑」按钮，支持修改我的解法代码后直接在面板上运行，方便验证你的奇思妙想：

![](/images/algo/changelog/vscode-viz-editor.jpg)

## ¶v1.4.5

  * 自动测网速，选择拉取可视化数据最快的端点。
  * 修复了课程数据拉取无效的问题，优化用户提示。


## ¶v1.4.3

  * 优化部分用户提示，比如课程数据拉取失败时给出更用户友好的提示指引。
  * 根据网速情况自动选择 labuladong.gitee.io 和 labuladong.github.io 作为数据源，解决部分国内用户拉取数据太慢的问题。


## ¶v1.4.2

  * 给中文力扣添加了 cookie 登录的方式，解决部分用户反馈在登录时遇到 `invalid password` 的问题。
  * 修复小鹅通 cookie 无法拉取课程题解的 bug。


## ¶v1.4.0

重大更新

支持算法代码可视化： ![](/images/algo/visualize_intro/vscode_example.jpg)

## ¶v1.3.3

  * 多语言解法上面给出提示语，允许用户提交 pr 修正错误
  * 添加 `codeTemplate` 设置，允许用户自定义代码模板进行本地调试： ![](/images/algo/intro/vscode-code-template.jpg)


## ¶v1.3.2

  * 每道题的思路都支持所有主流编程语言的代码。
  * 修复了无法解锁课程题目思路的问题。


更新时间：2026/03/14 00:17

Loading comments...
