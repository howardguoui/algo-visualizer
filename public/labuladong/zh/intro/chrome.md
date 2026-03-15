# 配套 Chrome 刷题插件

> Source: https://labuladong.online/zh/algo/intro/chrome/
> Archived: labuladong.online — 算法笔记

---

# 配套 Chrome 刷题插件

插件和本站的关系

**插件中的题解和思路都是本站的文章和习题讲解，所以刷题插件只是辅助大家学习本站的配套工具，并不是必须安装的，大家可以根据需求自行选择** 。

不过我会建议安装 Chrome 刷题插件，因为你在浏览器上学习本站时，可能会经常跳转到 力扣/LeetCode 的页面做题，这时候 Chrome 插件会提供一些帮助。

提示

虽然我习惯叫这款插件为「Chrome 插件」，但实际上插件并不仅限于 Chrome 浏览器安装使用。像 Edge 浏览器、360 浏览器这些使用 Chromium 内核的浏览器都可以安装，具体见安装指南。

Chrome 刷题插件的主要功能是在力扣和 LeetCode 的页面上添加「题解」和「思路」按钮，方便跳转查看本站算法文章和解题思路：

![diagram](https://labuladong.online/images/algo/intro/chrome_intro1.jpg)

## 安装方式

Chrome 刷题插件不止支持 Chrome 浏览器，像 Edge 浏览器、360 浏览器这些使用 Chromium 内核的浏览器都可以通过离线安装 crx 文件的方式安装。

**Chrome 浏览器用户** 有条件的话建议直接在 Chrome 商店下载：

<https://chrome.google.com/webstore/detail/leetcode-helper-by-labula/elafhogmnaapleckojedgipgmidneccg>[](<https://chrome.google.com/webstore/detail/leetcode-helper-by-labula/elafhogmnaapleckojedgipgmidneccg>)

**Edge 浏览器用户** 可以直接在 Edge 商店下载（中国大陆也可以访问）：

<https://microsoftedge.microsoft.com/addons/detail/leetcode-helper-by-labula/mgfjpejofejdbnillfolnnjbiefpokln>[](<https://microsoftedge.microsoft.com/addons/detail/leetcode-helper-by-labula/mgfjpejofejdbnillfolnnjbiefpokln>)

**如果无法在线安装，也可以离线安装** 。在公众号后台回复关键词「插件」下载最新版本 crx 文件。

有了 crx 插件文件，手动安装的方法可以很容易地搜到，这里随便贴一个：

<https://cloud.tencent.com/developer/article/1894180>[](<https://cloud.tencent.com/developer/article/1894180>)

安装成功后，可以在插件列表看到插件图标：

![diagram](https://labuladong.online/images/algo/intro/ch2.png)

点击插件图标可以弹出插件弹窗：

![diagram](https://labuladong.online/images/algo/intro/chrome-popup.jpg)

弹窗中包含手动刷新数据的按钮、语言设置、列表的渲染设置等。

## 功能展示

### 题目列表渲染

**力扣/LeetCode 的所有题目列表和题目详情页中会显示本站的题解/思路按钮** ：

![diagram](https://labuladong.online/images/algo/intro/chrome-lc-page.jpg)

点击「题解」按钮即可跳转到网站对应文章学习，点击「思路」按钮即可查看我精心撰写的简明解题思路和代码。

### 辅助刷题

**题目详情页也会显示题解和思路按钮** ，可以直接复制带详细注释的代码，刷题非常方便：

![diagram](https://labuladong.online/images/algo/intro/chrome-problem-idea.jpg)

对于比较复杂的解法，代码中会包含图片注释，方便理解代码逻辑。鼠标移动到小灯泡图表即可查看图片注释：

![diagram](https://labuladong.online/images/algo/intro/chrome-image-annotation.jpg)

### 算法可视化面板

「思路」展开后，解法代码下方会显示一个可交互的算法可视化面板，帮助理解算法的执行过程：

![diagram](https://labuladong.online/images/algo/intro/chrome-algo-visual.jpg)

可视化面板的具体功能请参考 [算法可视化面板简介](</zh/algo/intro/visualize/>)。

## 解锁本站思路/题单

Chrome 插件的部分内容/功能免费提供给所有用户使用。

购买 [本站会员](</zh/algo/intro/site-vip/>) 后，只需要保证你登录了本站（[labuladong.online](<https://labuladong.online/algo/user/profile/>)），插件就会自动解锁完整的学习使用权限，不需要其他额外操作。

## 更新方式

**1、在 Chrome/Edge 商店安装的** ，会在新版本发布后自动更新。

**2、通过 crx 文件离线安装的** ，我会在发布新版本之后更新百度网盘中的 crx 文件，所以你只需要重新在公众号后台回复关键词「插件」即可下载最新版本插件，再次安装即可。建议将插件固定在插件栏，有更新时会有 `new` 的提示字样。

建议

任何时候，都推荐你使用最新版本的插件，因为我会不断优化插件的功能，修复 bug，所以如果你遇到了问题，也许更新到最新版本就能解决。

## 更新日志

详见 [Chrome 插件更新日志](</zh/algo/changelog/chrome/>)。

## 常见问题解决方法

### 思路弹窗大小不合适？

思路弹窗右下角可以拖拽调整大小。

### 安装插件后没有效果？

主要原因可能是网络问题，导致插件拉取初始数据时较慢。可以点击「刷新元数据」按钮手动拉取数据，直到出现 ✅ 标记：

![diagram](https://labuladong.online/images/algo/intro/chrome-popup.jpg)

### macOS/Linux/Windows 都能安装吗？

是的，插件是寄生在浏览器里的，和操作系统无关。只要在你的操作系统安装 chromium 内核的浏览器，就能够正常安装使用插件。

### 火狐浏览器可以安装吗？

不支持，因为火狐浏览器用的不是 chromium 内核。以前还有办法安装，但现在 chromium 内核接口升级了，所以除非火狐官方适配，否则无法安装 Chrome 插件。

不过，类似 QQ 浏览器、360 浏览器这些使用 chromium 内核的浏览器是可以安装的。

## Bug 反馈

可以在 GitHub 创建 Issue 反馈问题：

<https://github.com/labuladong/fucking-algorithm/issues/>[](<https://github.com/labuladong/fucking-algorithm/issues/>)

## 评论

请登录后查看/发表评论
