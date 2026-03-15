# OAuth 2.0 和 OIDC 认证

> Source: https://labuladong.online/zh/algo/computer-science/oidc/
> Archived: labuladong.online — 算法笔记

---

# OAuth 2.0 和 OIDC 认证

前置知识

阅读本文前，你需要先学习：

  * [认证与授权的区别与联系](</zh/algo/computer-science/authentication-vs-authorization/>)
  * [深入理解 OAuth 2.0 授权框架](</zh/algo/computer-science/oauth2-explained/>)
  * [Session 和 Cookie 如何协同](</zh/algo/other-skills/session-and-cookie/>)
  * [深入理解 JSON Web Token (JWT)](</zh/algo/computer-science/how-jwt-works/>)


在 [深入理解 OAuth 2.0 授权框架](</zh/algo/computer-science/oauth2-explained/>) 这篇文章中，我们讲到了一个关键问题：**标准的 OAuth 2.0 只能做授权，不能做认证** 。

具体来说，OAuth 2.0 可以让第三方应用（比如 ExampleNote）获得访问用户资源（比如 Google Drive）的权限，但无法安全地确认用户的身份，因为授权码可能被截获，导致黑客冒充用户登录。

那么，如何才能安全地实现「用 Google 账号登录」这种第三方登录功能呢？答案就是 **OpenID Connect (OIDC)** 。

不只是第三方登录

第三方登录是典型的跨组织认证的场景（ExampleNote 借用 Google 的认证服务来实现用户登录）。

那么同一个组织内部也可能用到 OIDC，比如 Google 内部有很多子系统，如 Gmail、Google Drive、Google Docs 等，它们也可以使用 Google 认证服务进行统一的登录认证。

这就是单点登录 (SSO) 的场景，为企业内部的众多服务提供安全灵活的统一登录服务。现代 SSO 也基于 OIDC，[深入理解单点登录 (SSO)](</zh/algo/computer-science/sso/>) 这篇文章会详细介绍。

术语

在 OIDC 中，有以下几个术语：

  * **OP** (OpenID Provider)：认证服务器，负责验证用户身份（相当于 OAuth 2.0 中的 Authorization Server）。
  * **RP** (Relying Party)：依赖方，就是各个应用（相当于 OAuth 2.0 中的 Client）。
  * **ID Token** ：存储用户身份信息的 JWT 令牌。


## ¶OIDC 和 OAuth 2.0 的关系

OIDC 是构建在 OAuth 2.0 之上的**认证协议层** ，它在 OAuth 2.0 的授权流程基础上，增加了身份认证的能力，解决了 OAuth 2.0 不能用于登录的问题。

首先，OIDC 复用了 OAuth 2.0 的授权码流程、Access Token 等核心概念，所以整体流程和 OAuth 2.0 是一样的。

区别在于，OIDC 在 OAuth 2.0 基础上增加了 nonce 参数和 ID Token，专门用来防止重放攻击和证明用户身份。

接下来是 OIDC 授权码流程的时序图：

加载图表...

具体到流程上，主要的区别在 [OAuth 2.0 授权流程](</zh/algo/computer-science/oauth2-explained/>) 中重定向到 Google 授权页面时，URL 中的参数不同。

更新时间：2026/03/14 00:17

Loading comments...
