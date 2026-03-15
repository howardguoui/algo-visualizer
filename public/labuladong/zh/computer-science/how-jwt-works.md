# 深入理解 JSON Web Token (JWT)

> Source: https://labuladong.online/zh/algo/computer-science/how-jwt-works/
> Archived: labuladong.online — 算法笔记

---

# 深入理解 JSON Web Token (JWT)

前置知识

阅读本文前，你需要先学习：

  * [非对称加密的使用场景](</zh/algo/computer-science/encryption-intro/>)

JWT (JSON Web Token) 是一种将信息封装在 JSON 对象中，并通过 [数字签名](</zh/algo/computer-science/encryption-intro/>) 来保证其可信度的 Web 标准。它最大的特点是**无状态（Stateless）** 和 **自包含（Self-contained）** 。

  * **无状态** ：服务器端不需要存储任何关于用户的信息。
  * **自包含** ：JWT 本身包含了所有验证用户身份所需的信息（例如用户 ID、权限等），服务器收到 JWT 后，可以直接解析出这些信息，无需查询数据库或缓存。

这两个特点非常重要，我们用实际的例子讲解一下。

## Session-Cookie 认证流程

以 Web 服务为例，先看传统的基于 Cookie 的认证方式：

当用户登录成功后，服务端会生成一个 sessionID，比如 `abcd1234`。

同时，服务端会在数据库（一般是类似 Redis 这样的缓存数据库）中建立 sessionID 到用户信息的映射，比如这样：

```
abcd1234: {
    user_id: "test-user",
    permissions: ["read"]
}
``` 

服务端通过 `Set-Cookie` 响应头将这个 sessionID 发送给浏览器，之后浏览器每次请求服务器时，都会在请求头包含这个 sessionID：

```
Cookie: sessionID=abcd1234
``` 

这样一来，服务端就可以读取请求头的 sessionID 去数据库中查询，从而确定用户身份。

请注意，这种认证方式是**有状态** 的，因为服务器需要依赖一个数据库存储 sessionID 到用户信息的映射。

同时，这种认证方式**不是自包含的** ，因为请求头中携带的仅仅是一个 sessionID，这个 sessionID 只是一个随机字符串，并不包含任何用户信息。

下面是 Session-Cookie 认证流程的时序图：

加载图表...

## JWT 认证流程

我们来思考一下，如何实现无状态和自包含的认证方式呢？

也许可以直接把用户信息存储到请求头中，比如这样：

```
Cookie: userInfo={"user_id":"test-user","permissions":["read"]}
``` 

这种认证方式是**无状态** 的，服务器可以直接从请求头中获取用户信息，无需依赖其他的服务；同时这种认证方式是**自包含** 的，因为请求头中携带了完整的用户信息。

**但这有个严重的问题：服务端如何信任客户端发来的数据呢** ？

要知道客户端完全可以伪造这个 userInfo 字段的，比如这样：

```
Cookie: userInfo={"user_id":"admin-user","permissions":["read","write","delete"]}
``` 

任何人都可以篡改浏览器请求头声明自己是管理员，然后就可以在服务端为所欲为了。

所以说，我们需要一种更安全的方式来保证客户端发来的数据是可信的，这就是 JWT 要解决的问题。

JWT 认证的流程如下：

当用户登录成功后，服务端会查询用户的认证信息（user_id、permissions 等），**然后用私钥进行签名** ，生成一个JWT 令牌返回给客户端。

比如下面这个 JWT 存储了 `{"user_id":"test-user","permissions":["read"]}` 的信息：

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ.lZln8NiYZACSKVLSCzSTB8_VnDUp4WJHiuzO0CUrSw_QagnNTqyGppRG8HoFsRqnpjaxNNTEoqIgwVl6ib0kUO-m9JMnIj4cQKIpZXGYPP8cO-PmvvbWCWr8yqMv_481lS2_XgyXMbo4ZjmpZIca-MSxLETY1wQcLrrzS_r75oukItpmnjAnePtD-cp0bcgRVmrCW3DQrxA6FQw1WSM2Fwz9MvYDGxBu8D8s0aBDqlPceK0W7IC2J-hktcxX5FK9qr76GeYRAFC71DH05e68cxqOCwSxJ-JJLE5uzA-AIAXy9gReY4lkzreFEl2LtwsFg7zM3Tv39CUHgxuitd0mog
``` 

在之后的每次请求中，客户端都会将这个 JWT 令牌放到 HTTP 请求头中的 `Authorization` 字段发送给服务端：

```
Authorization: Bearer <JWT Token>
``` 

服务端收到 JWT 令牌后，可以直接解析出用户的认证信息，然后**用公钥验证签名** ，验证通过则认为认证信息是真实的，否则说明认证信息被篡改了。

下面是 JWT 认证流程的时序图：

加载图表...

## JWT 的结构

还是以上面的 JWT 为例，可以看到它由三部分组成，通过 `.` 分隔：

```
<Header>.<Payload>.<Signature>
``` 

![diagram](https://labuladong.online/images/algo/jwt/example.png)

其中每个部分都是用 Base64 编码的，可以直接解码出明文 JSON 对象。

JWT 不是加密的

JWT 看起来是一串乱码，实际这是 Base64 编码，任何人都可以直接解码出明文。所以**不要在 JWT 中存放任何敏感信息** 。

JWT 的设计初衷就不是通过加密算法来保护机密数据，而是通过数字签名来保证数据的完整性和可信度。

Header 部分是一个 JSON 字符串，描述了 JWT 的元数据，通常包含两部分：令牌的类型（`typ`）和所使用的签名算法（`alg`）。

上述 JWT 的 Header 部分通过 Base64 解码后是：

```
$ echo "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9" | base64 -d
{ 
  "alg": "RS256",
  "typ": "JWT"
}
``` 

  * `alg`: 签名算法，例如 `RS256` 表示使用 RSA 算法的私钥进行签名。
  * `typ`: 令牌类型，固定为 `JWT`。

### Payload

JWT 的 Payload 部分也是一个 JSON 字符串，用来存放实际需要传递的数据。

JWT 标准规定了几个官方字段：

  * `jti`: 唯一标识（JWT ID）
  * `iss`: 签发人（Issuer）
  * `sub`: 目标对象（Subject）
  * `aud`: 受众（Audience）
  * `iat`: 签发时间（Issued At）
  * `nbf`: 生效时间（Not Before）
  * `exp`: 过期时间（Expiration Time）

注意这些字段都是**可选的** ，在之后讲解 [OIDC 实现第三方登录](</zh/algo/computer-science/oidc/>) 的章节中会介绍这些字段的作用，这里暂不展开。

除了官方字段，你也可以在这里定义私有字段，例如上述 JWT 的 Payload 部分通过 Base64 解码后是：

```
$ echo "eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ" | base64 -d
{
  "user_id": "test-user",
  "permissions": ["read"],
  "iss": "labuladong.online",
  "iat": 1758974578,
  "exp": 1759147378
}
``` 

可以看到 Payload 部分存储了 `user_id`、`permissions` 字段，同时 `iss` 表示签发者为 `labuladong.online`，`iat` 和 `exp` 记录了签发时间和过期时间，如果签发者不匹配或者已过期，则可以认为这个 JWT 是无效的。

### Signature

签名部分是 JWT 的核心，用来保证 JWT 的完整性和真实性。

比如上面的 JWT 的签名算法是 `RS256`，那么就需要使用 RSA 算法生成的私钥对 Base64 编码后的 `<Header>.<Payload>` 字符串进行签名：

```
# 需要被签名的数据部分 <Header>.<Payload>
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ
``` 

签名完成后，把签名结果用 Base64 编码拼接到最后，就得到了完整的 `<Header>.<Payload>.<Signature>` JWT 令牌。

## 验证 JWT 令牌

收到这个 JWT 令牌的服务端，只要有对应的公钥，就可以验证这个 JWT 令牌是否被篡改。

你可以在 [jwt.io](<https://jwt.io/>) 网站上验证上述 JWT 的内容。

在左侧粘贴我签发的 JWT 令牌内容：

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ.lZln8NiYZACSKVLSCzSTB8_VnDUp4WJHiuzO0CUrSw_QagnNTqyGppRG8HoFsRqnpjaxNNTEoqIgwVl6ib0kUO-m9JMnIj4cQKIpZXGYPP8cO-PmvvbWCWr8yqMv_481lS2_XgyXMbo4ZjmpZIca-MSxLETY1wQcLrrzS_r75oukItpmnjAnePtD-cp0bcgRVmrCW3DQrxA6FQw1WSM2Fwz9MvYDGxBu8D8s0aBDqlPceK0W7IC2J-hktcxX5FK9qr76GeYRAFC71DH05e68cxqOCwSxJ-JJLE5uzA-AIAXy9gReY4lkzreFEl2LtwsFg7zM3Tv39CUHgxuitd0mog
``` 

在右下方粘贴我生成的公钥：

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqiVXbVKq8oaFSn7ZWFCn
FkRY3W7MUoxlSG6ONImhzh6pofe5o6SoVNJdSHwNinJaATpMz3mNW7jKq2+ySLv1
fFXNlZyKjQaT47l6LmeiKNpxoH6dmvjUofTS0Jz98jMuz0hR9yaEqKAU46wr9Fty
Q4TwmEanpRajt62zNY2CbUHHsGO9wGrfY0xOijDMg2JTriX4G66VIzanYq/fcpC+
5OmY8p8ZgPovoOcDnUOjzotnln5JDGwx53K/4NvwzX2nsdHBb2ydgkZDCbuIC9ys
ccmAUNXSCCiStxt/05UyOW4s561IQd1ajTl+oa7FGHgj7sPummRwJhj8PAjhIQRL
kwIDAQAB
-----END PUBLIC KEY-----
``` 

即可看到 `Valid JWT` 和 `Signature Verified`，说明这是个有效的 JWT 令牌，其中的 `user_id`、`permissions` 等字段是可信的。

![diagram](https://labuladong.online/images/algo/jwt/verify.jpg)

如果你修改 JWT payload 中的数据，那么验证就会失败。
