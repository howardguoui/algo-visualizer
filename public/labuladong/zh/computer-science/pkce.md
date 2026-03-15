# OAuth 2.0 与 PKCE

> Source: https://labuladong.online/zh/algo/computer-science/pkce/
> Archived: labuladong.online — 算法笔记

---

# OAuth 2.0 与 PKCE

前置知识

阅读本文前，你需要先学习：

  * [认证与授权的区别与联系](</zh/algo/computer-science/authentication-vs-authorization/>)
  * [深入理解 OAuth 2.0 授权框架](</zh/algo/computer-science/oauth2-explained/>)

在前面的 [OAuth 2.0](</zh/algo/computer-science/oauth2-explained/>) 和 [OIDC](</zh/algo/computer-science/oidc/>) 文章中，我们详细讲解了授权码流程，其中有一个关键步骤：

> ExampleNote 的服务器用授权码 + `client_secret` 换取 Access Token。

这个流程看起来很完美，**但它有一个隐含的前提：客户端能够安全地保管`client_secret`**。

对于服务器端 Web 应用来说，这个前提是成立的，因为 `client_secret` 存储在服务器上，用户和黑客都无法访问。

但对于移动应用（Android、iOS）、SPA 单页应用（只有前端，没有后端的 Web 应用）、桌面应用等，这个前提就不成立了。

比如你开发了一个 Android App，想要接入 Google 登录，按照标准的 OAuth 2.0 流程，你需要在代码里写入 `client_secret`。

但 Android APK 可以被反编译，任何人都能从你的 App 中提取出这个 `client_secret`。

这就引出了 OAuth 2.0 中的一个核心概念：**客户端类型（Client Types）** ，主要分为两类：

**可信客户端（Confidential Client）** ：能够安全保管 `client_secret` 的客户端。

典型例子是服务器端 Web 应用，`client_secret` 存储在服务器上，用户和黑客都无法访问。

**不可信客户端（Public Client）** ：无法安全保管 `client_secret` 的客户端，比如移动端、SPA 应用、桌面应用等。

## 不可信客户端的困境

不可信客户端面临两难：

**困境 1：带`client_secret` 会泄露**

如果在 Android App 中硬编码 `client_secret`，APK 被反编译后，黑客可以提取出密钥，冒充你的应用。

即便移动端应用有各种保护措施，比如代码混淆、加固等，也无非是增加了反编译的难度。把 `client_secret` 包含在客户端代码本身就是一个巨大的安全隐患，应该彻底避免。

**困境 2：不带`client_secret` 不安全**

如果不用 `client_secret`，直接用授权码换 Token，会面临**授权码拦截攻击** ：黑客获取授权码后直接就可以换取 Access Token，从而获取用户的资源访问权限。

那么，带静态密钥会泄露，不带又不安全，怎么办？这就是专门为不可信客户端设计的安全方案：**PKCE（Proof Key for Code Exchange）** 。

下面是 PKCE 授权码流程的完整时序图：

Google Drive资源服务器Google授权服务器Android App用户Google Drive资源服务器Google授权服务器Android App用户点击"连接 Google Drive"生成随机 code_verifier计算 code_challenge跳转到 Google 授权页面(URL 中包含 code_challenge)访问授权页面记住 code_challenge登录并同意授权重定向URL 中包含授权码带着授权码跳转到 App用 code + code_verifier换取 Access Token验证SHA256(code_verifier) == code_challenge返回 Access Token用 Access Token访问 Google Drive返回文件列表

成为会员即可解锁全部内容

[了解会员权益](</zh/algo/intro/site-vip/?int_source=article-lock>)
