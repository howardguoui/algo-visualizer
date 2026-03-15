# 深入理解 OAuth 2.0 授权框架

> Source: https://labuladong.online/zh/algo/computer-science/oauth2-explained/
> Archived: labuladong.online — 算法笔记

---

# 深入理解 OAuth 2.0 授权框架

前置知识

阅读本文前，你需要先学习：

  * [认证与授权的区别与联系](</zh/algo/computer-science/authentication-vs-authorization/>)

OAuth 2.0 是一种行业标准的**授权框架** （Authorization Framework）。

这里面有两个关键点：

  * 基于前文讲过的 [认证与授权的区别与联系](</zh/algo/computer-science/authentication-vs-authorization/>)，我们要知道 OAuth2.0 是专门处理 **授权** 的，授权是认证完成后的一个流程，为了确认「你能做什么」。
  * OAuth 2.0 框架并不是具体的代码，而是一套广泛使用的协议规范，遵循这套规范编写代码，就可以接入支持 OAuth 2.0 的第三方服务。

再来纠正一个常见的误区：**很多人听到 OAuth 2.0 的第一反应是「第三方登录」，但实际上这么理解是不准确的** 。

因为登录这个行为是为了「认证」，而 OAuth 2.0 是专门处理「授权」的，如果用标准的 OAuth 2.0 流程来实现登录，是不标准、不安全的。

那为什么第三方登录的功能确实经常和 OAuth 2.0 一起出现呢？

这是因为第三方登录使用的是 OpenID Connect（OIDC）技术，而 OIDC 是构建在 OAuth 2.0 之上的**认证协议** ，所以容易把 OAuth 2.0 和 OIDC 混为一谈。

那么本文就来用实际的例子讲解 OAuth 2.0 的授权流程，下个章节 [OIDC 认证](</zh/algo/computer-science/oidc/>) 会讲解 OAuth 2.0 为什么不能用来做登录认证，以及 OIDC 是如何解决这个问题的。

## 为什么需要 OAuth 2.0

假设现在有一个笔记软件 `ExampleNote`，它想要帮你把 Google Drive 里的文件导入到笔记软件中。

最直接的办法是什么？`ExampleNote` 让你输入 Google 账号和密码，然后它用你的账号密码登录 Google，从你的 Google Drive 读取文件。

显然，这绝对是不安全的，用户当然不能轻易地把自己的账号密码交给第三方应用。

OAuth 2.0 就是为了解决这个问题：让第三方应用获得有限的访问权限，而不需要知道你的密码。

它的核心是：**用临时的、受限的凭证（Access Token）代替永久的、全能的凭证（密码）** 。

## OAuth 2.0 的四个角色

在正式讲解流程之前，先明确 OAuth 2.0 定义的四个角色（这些是 RFC 6749 标准中的规范术语）：

  1. **Resource Owner（资源所有者）** ：通常就是你，用户。因为你拥有 Google Drive 里的文件。

  2. **Resource Server（资源服务器）** ：存储受保护资源的服务器，比如 Google Drive 的服务器。

  3. **Client（客户端）** ：想要访问资源的第三方应用，比如 ExampleNote。

  4. **Authorization Server（授权服务器）** ：负责验证用户身份，并给 Client 颁发 Access Token 的服务器，比如 Google 的授权服务器。

关于这几个角色，有两个注意点：

  * Resource Server 和 Authorization Server 通常是同一家公司（比如都是 Google），但在架构上是分开的两个服务。

  * 我们容易习惯性地认为 Client 是指坐在电脑前的终端用户，而在 OAuth 2.0 中，Client 是指想要访问资源的第三方应用程序，而终端用户是 Resource Owner，即资源所有者。

## OAuth 2.0 授权码流程

OAuth 2.0 有多种授权方式，最常用、最安全的是**授权码流程（Authorization Code Flow）** 。

我们用 ExampleNote 访问 Google Drive 的例子来演示完整流程。

首先，ExampleNote 的开发者想要通过 OAuth 2.0 流程访问用户的 Google Drive，需要提前在 Google 的开发者平台申请 Client ID 和 Client Secret，这是 ExampleNote 在 Google 系统中的唯一身份标识和访问凭证。

接下来是 OAuth 2.0 授权流程的时序图：

加载图表...

### 第 1 步：用户点击授权

你（用户）在 ExampleNote 上点击"导入 Google Drive 文件"按钮。

ExampleNote 将你的浏览器重定向到 Google 的授权页面，URL 类似这样：

```
https://accounts.google.com/oauth/authorize?
  response_type=code&
  client_id=examplenote_client_id&
  redirect_uri=https://examplenote.com/callback&
  scope=drive.readonly
``` 

参数说明：

  * `response_type=code`：告诉 Google 使用授权码流程。
  * `client_id`：ExampleNote 在 Google 那里的身份标识（ExampleNote 需要提前在 Google 那里注册）。
  * `redirect_uri`：授权完成后，Google 把用户重定向回哪个地址。
  * `scope`：ExampleNote 想要的权限范围，这里申请的是 Google Drive 文件的只读权限。

### 第 2 步：用户同意授权

Google 的授权页面会显示：

> ExampleNote 想要访问你的 Google Drive（只读权限），你同意吗？
> 
> [ 同意 ] [ 拒绝 ]

你点击"同意"。

### 第 3 步：Google 返回授权码

Google 将你的浏览器重定向回 ExampleNote 的回调地址，并在 URL 中带上一个**授权码（Authorization Code）** ：

```
https://examplenote.com/callback?code=AUTH_CODE_12345
``` 

注意，这个授权码只是一个中间凭证，有效期很短（通常不到 30 秒），而且只能使用一次。

### 第 4 步：用授权码换 Access Token

你的浏览器被重定向到 `https://examplenote.com/callback?code=AUTH_CODE_12345`，ExampleNote 的服务器可以从 URL 中拿到授权码。

然后，**ExampleNote 的服务器** （注意不是浏览器）向 Google 的 Token 端点发起请求：

```
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE_12345&
redirect_uri=https://examplenote.com/callback&
client_id=examplenote_client_id&
client_secret=examplenote_secret
``` 

关键参数：

  * `code`：刚才拿到的授权码。
  * `client_secret`：ExampleNote 的密钥，Google 会检测 `client_id` 和 `client_secret` 是否匹配。

### 第 5 步：Google 返回 Access Token

Google 验证授权码和 `client_secret` 后，会给 ExampleNote 的服务器返回一个 JSON：

```
{
  "access_token": "example.abcdefg...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "drive.readonly"
}
``` 

  * `access_token`：这是一个临时的访问凭证，ExampleNote 可以用它访问你的 Google Drive。
  * `expires_in`：这个 access token 的有效期。
  * `scope`：这个 access token 的权限范围。

有些服务可能还会返回一个 `refresh_token` 字段，当 `access_token` 过期时，ExampleNote 可以用它获取新的 access token，而不用让用户重新授权。

### 第 6 步：访问受保护资源

ExampleNote 带着 `access_token` 去 Google Drive API 查询用户的文件列表：

```
GET https://www.googleapis.com/drive/v3/files
Authorization: Bearer example.abcdefg...
``` 

Google Drive 服务器验证这个 Token 有效，给 ExampleNote 的服务器返回用户的文件列表。

这就是 OAuth 2.0 授权流程的完整过程，既没有暴露用户的 Google 密码，又精确地授予了 ExampleNote 访问用户 Google Drive 的权限。

## 为什么要用授权码？

你可能会问：为什么第 3 步不直接返回 Access Token，而是要返回一个授权码，再让 ExampleNote 去换 Access Token？

这是为了**安全** ，避免 Access Token 泄露。

因为第 3 步的授权码是通过回调 URL 的参数传递的，而 URL 是没有任何安全保障的，很容易被截获（比如 JavaScript 代码、浏览器插件等都可以读到 URL 参数）。

如果直接在 URL 里传递 Access Token 这种机密信息，一旦被窃取，黑客就能直接用它访问用户的 Google Drive，后果不堪设想。

但授权码只是一个中间凭证，黑客拿到授权码也没用，因为第 4 步换 Access Token 时，**必须提供`client_secret`**，而这个密钥只有 ExampleNote 的服务器知道，浏览器和黑客都不知道。

这种设计叫做**后端通道（Back Channel）交换** ，保证了 Access Token 不会暴露在不安全的浏览器环境中。

## 为什么不能用来做第三方登录？

首先请确保你理解了 [认证与授权的区别与联系](</zh/algo/computer-science/authentication-vs-authorization/>)，认证是为了证明「你是谁」，授权是为了确认「你能做什么」。

上述的流程是标准的 **授权** 流程，发生在 ExampleNote 服务器（Client）和 Google 授权服务器（Authorization Server）之间。

而对于「登录」这个操作，我们需要的是 **认证** 流程，即确定用户是谁，发生在用户和 ExampleNote 服务器之间。

以 Google 的第三方登录为例，认证流程的关键是，ExampleNote 要确保用户是这个 Google 账号的所有者，而不是黑客假冒的，然后才能允许用户登录。

也许你可以说：

如果 ExampleNote 应用能够成功获取到 access token，是不是就可以说明这个用户是该 Google 账号的所有者？毕竟需要用户本人登录他的 Google 账号，且点击同意授权，才可能获取到 access token。

答案是，能获取到 access token，并不一定能确信用户是该 Google 账号的所有者。**其原因在于，授权码 Authorization Code 通过 URL 参数传递，很容易被窃取** 。

比方说上述的第 3 步中，有黑客从 URL 参数中截获了授权码，在用户访问之前抢先访问 `https://examplenote.com/callback?code=AUTH_CODE_12345`，ExampleNote 的服务端用这个授权码成功换取到了 access token，错误地认为这个黑客就是用户本人，**于是黑客就成功地冒充用户身份登录了 ExampleNote 应用** 。

由于授权码是一次性使用的，真正的用户只会得到一个授权码已被使用的错误提示，登录失败。

所以说，标准的 OAuth 2.0 用来授权是没问题的，它能确保 Access Token 不会泄露到黑客手里。

但由于授权码的不安全性，我们不能确定给出正确授权码的人，就一定是该 Google 账号的所有者，所以标准的 OAuth 2.0 不能用来做第三方登录认证。

要解决这个问题，我们需要引入 OpenID Connect（OIDC）技术，它是在 OAuth 2.0 基础上构建的一个身份认证协议层，在下一篇文章 [OIDC 认证](</zh/algo/computer-science/oidc/>) 中会详细讲解。

## 总结

  * **OAuth 2.0 是一个授权框架** ，核心是让第三方应用获得有限的访问权限，而不需要用户的密码。
  * **四个角色** ：Resource Owner（用户）、Resource Server（资源服务器）、Client（第三方应用）、Authorization Server（授权服务器）。
  * **授权码流程** ：用户授权 → 返回授权码 → 后端用授权码换 Access Token → 用 Token 访问资源。
  * **核心产物** ：Access Token，一个临时的、受限的访问凭证。
  * **OAuth 2.0 只管授权，不管认证** 。如果你想实现安全的第三方登录，需要 OpenID Connect（OIDC）认证。
