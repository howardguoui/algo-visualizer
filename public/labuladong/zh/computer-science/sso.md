# 深入理解单点登录 (SSO)

> Source: https://labuladong.online/zh/algo/computer-science/sso/
> Archived: labuladong.online — 算法笔记

---

# 深入理解单点登录 (SSO)

前置知识

阅读本文前，你需要先学习：

  * [Session 和 Cookie 如何协同](</zh/algo/other-skills/session-and-cookie/>)
  * [深入理解 OAuth 2.0 授权框架](</zh/algo/computer-science/oauth2-explained/>)
  * [OAuth 2.0 和 OIDC 认证](</zh/algo/computer-science/oidc/>)

假设你在一家公司工作，每天要用到很多不同的系统：

  * 企业邮箱 `mail.company.com`
  * 代码仓库 `git.company.com`
  * 项目管理工具 `pm.company.com`
  * 文档系统 `docs.company.com`
  * 人事系统 `hr.company.com`

你可以使用同一个公司账号（比如带有员工 ID 的邮箱账号 `[[email protected]](</cdn-cgi/l/email-protection>)`）登录所有系统，但由于每个系统使用不同的子域名，你需要在每个系统重复登录。

我们在 [Session 和 Cookie](</zh/algo/other-skills/session-and-cookie/>) 中讲过，当你登录 `git.company.com` 后，服务器会设置一个 Session Cookie：

```
Set-Cookie: sessionID=abc123; domain=git.company.com; path=/
``` 

这个 Cookie 只对 `git.company.com` 有效，当你访问 `mail.company.com` 时，浏览器不会发送这个 Cookie，所以 `mail.company.com` 不知道你已经登录过了，要求你重新登录。

那么最简单的一个方案就是，让 `git.company.com` 的服务器直接对主域名 `company.com` 设置 Cookie，这样所有 `*.company.com` 子域名都能读取这个 Cookie，不就实现"共享登录状态"了吗？

```
Set-Cookie: sessionID=abc123; domain=.company.com; path=/
``` 

技术上确实可以，但这种做法有严重的安全隐患和架构问题：

**1、安全问题：一个服务的漏洞会危及所有服务** 。

如果 `git.company.com` 设置了 `domain=.company.com` 的 Session Cookie，那么所有子域名的服务（`mail.company.com`、`hr.company.com` 等）都能读取和修改这个 Cookie。

假设 `mail.company.com` 存在安全漏洞漏洞，攻击者可以通过这个漏洞窃取 Session Cookie，那么就可以冒充用户访问所有其他系统（邮箱、代码仓库、人事系统等）。

**2、架构问题：Session 的数据结构需要统一**

共享 Cookie 意味着共享 Session ID，但不同服务需要访问同一个 Session 数据，这要求：

  * 所有服务共享同一个 Session 存储（比如 Redis）
  * 所有服务的 Session 数据结构必须兼容
  * 不同团队开发的服务需要协调 Session 字段

这显现是不现实的，每个团队的业务不同，Session 中记录的数据结构也不同，强行共享会导致紧耦合，任何一个服务修改 Session 结构都可能影响其他服务。

**3、无法集成第三方服务**

如果你的公司想要集成一些第三方 SaaS 服务，这些服务有自己的域名（如 `yourcompany.slack.com`），无法通过这种简单的共享 Cookie 方案来实现。

解决这个问题的现代化方案是使用 **SSO (Single Sign-On，单点登录)** 。

SSO 通过引入一个独立的认证中心（比如 `op.company.com`）来解决前面提到的问题：

  * **安全隔离** ：每个子系统有自己的 Session，一个子系统被攻击不会影响其他子系统。
  * **跨域名支持** ：可以集成不同域名的服务，包括第三方 SaaS。
  * **统一的认证逻辑** ：所有子系统只需专注业务逻辑，不需要各自实现用户登录逻辑。
  * **统一的账号管理** ：用户只需要在认证中心登录一次，就可以访问所有相关的子系统，无需重复登录。

## SSO 的工作原理

要实现 SSO，核心是要有一个**统一的认证中心 (Authentication Server)** ，所有应用都信任这个认证中心。

架构图大概是这样的：

```
           认证中心
              ↓ 信任关系
      ┌───────┼───────┬───────┐
      ↓       ↓       ↓       ↓
   应用 A    应用 B   应用 C  应用 D
``` 

涉及的主要角色有三个：

  1. **认证中心 (Authentication Server / Identity Provider)**

     * 统一管理用户的账号和密码
     * 负责验证用户身份（检查用户名密码是否正确）
     * 为用户颁发"身份凭证"
  2. **应用 (Application / Service Provider)**

     * 各种业务系统，比如邮箱、CRM、文档系统
     * 信任认证中心
     * 通过验证"身份凭证"来确认用户身份
  3. **用户 (User)**

     * 想要访问多个应用
     * 只需要在认证中心登录一次

下面我们看看完整的 SSO 流程。

### 第一次访问应用 A

加载图表...

到这里，你成功登录了应用 A，而且认证中心 `op.company.com` 在你浏览器里设置了一个 Session Cookie，记录了你的登录状态。

### 第二次访问应用 B（SSO 的关键）

现在你想访问应用 B（比如 CRM 系统）：

加载图表...

注意第 3-4 步，这就是 SSO 的关键：**认证中心通过 Session Cookie 知道用户已经登录了，不需要再输入密码** 。

从用户的角度看，访问应用 B 时只是跳转了一下页面，然后就自动登录了，体验非常流畅。
