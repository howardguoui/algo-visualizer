# 网站/插件问题反馈

> Source: https://labuladong.online/zh/algo/intro/bug-report/
> Archived: labuladong.online — 算法笔记

---

# 网站/插件问题反馈

背景

随着我对算法教程的持续迭代，本站以及配套插件的功能越来越丰富，但也越来越复杂，难免出现 bug。

所以我需要及时接收大家的问题反馈，快速修复问题，避免给大家带来不良的使用体验。

大部分问题可能都是本地缓存了过期的内容导致的，所以在你反馈问题前，请先查看下面的常见问题列表，看看是否已有解决方案。

## 本站常见问题

### 订单丢失了？

在 [订单页面](<https://labuladong.online/algo/user/orders/>) 可以查看之前的购买记录。若你曾经购买过网站会员，但是订单页面没有记录，一般是因为**使用了错误的登录方式** 。

例如，当时你使用 GitHub 登录完成了购买，但是现在使用 Google 登录网站，相当于创建了一个新的账号，所以订单页面没有记录。

解决办法：尝试使用其他登录方式登录网站即可找回订单。若依然无法找回订单，请邮件反馈问题。

你可以在 [用户信息](<https://labuladong.online/algo/user/profile/>) 页面绑定多种登录方式方便使用。

### 购买本站会员后，插件中的思路未解锁？

插件中的配套题解需要你手动刷新数据才能解锁，具体看 [Chrome 插件文档](</zh/algo/intro/chrome/>)，[vscode 插件文档](</zh/algo/intro/vscode/>) 和 [JetBrains 插件文档](</zh/algo/intro/jetbrains/>) 介绍的操作方法。

### 登录时报错 `仅海外 IP 可以使用 GitHub/Google 登录`

由于网络原因，登录时会进行 IP 检测，仅允许海外 IP 使用 GitHub/Google 登录方式。

如果你使用了网络代理，请确保将代理设置为**全局模式** 确保 `labuladong.online` 的域名会走代理，然后**刷新几次网页** ，应该就能使用 GitHub/Google 登录了。

你可以在 [用户信息](<https://labuladong.online/algo/user/profile/>) 页面绑定多种登录方式方便使用。

### 页面卡死/加载不出来？

这一般是网络问题，因为本站更新较为频繁，如果由于本地缓存或 CDN 缓存的原因导致未加载最新资源，就会小概率出现无法访问某些页面的情况。

**解决方法：请尝试清除浏览器缓存后刷新页面** 。如果还是不能解决问题，可以尝试切换成浏览器的无痕浏览模式或更换网络，已确定是否是本地环境的问题。

对于挂了网络代理的读者，请关闭代理访问本站，或者把本站 `labuladong.online` 移出代理规则，就不会出现这类问题了。

### 右上角搜索栏搜不到内容？

一般也是网络问题，解法同上。

### 本站会员内容一直转圈，无法加载？

一般也是网络问题，解法同上。

### 可视化面板一直黑屏？

一般也是网络问题，导致未加载最新资源，解法同上。

若依然无法解决你的问题，请向我反馈。

## 插件常见问题

插件的常见问题及解决方法在各个插件的文档中有介绍，具体见 [Chrome 插件文档](</zh/algo/intro/chrome/>)，[vscode 插件文档](</zh/algo/intro/vscode/>)，[JetBrains 插件文档](</zh/algo/intro/jetbrains/>)。

## 邮箱/微信反馈问题

**支付、权限、网站可用性，这几种直接影响使用的问题，可以通过邮件或微信反馈，我会第一时间处理** ：

  * 邮箱： `[[email protected]](</cdn-cgi/l/email-protection>)`
  * 微信：仅支持付费会员添加，在 [网站会员](</zh/algo/intro/site-vip/>) 页面可以添加我的微信或者进入本站的微信讨论群。

请具体描述你遇到的问题，最好带上截图和报错信息。支付/权限问题请带上你的 [用户 ID](<https://labuladong.online/algo/user/profile/>) 和订单号。

## Github Issue 反馈问题

网站、配套工具的任何 bug、功能建议等，可以在 GitHub Issue 进行反馈，便于其他读者查看和讨论。

点击如下链接即可查看已有的 Issue：

<https://github.com/labuladong/fucking-algorithm/issues/>[](<https://github.com/labuladong/fucking-algorithm/issues/>)

点击 Issue 列表上方的 `New Issue` 按钮即可创建新的 Issue。

提 Issue 时注意以下几点：

  * GitHub Issue 是公开访问的，切记不要暴露任何私密信息，比如用户 ID、订单号、账号密码、网站 token/cookie 等。
  * 提出 Issue 前可以先搜索，看看是否有其他人遇到类似的问题，是否已有解决方案。

## 网站留言反馈问题

本站每篇文章下方都有留言区。对于笔误、代码小 bug 等不紧急的问题，可以直接在留言区评论反馈，我会定期查看留言并修复。
