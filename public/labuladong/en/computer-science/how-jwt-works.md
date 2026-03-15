# Understanding JSON Web Token (JWT)

> Source: https://labuladong.online/algo/en/computer-science/how-jwt-works/
> Archived: labuladong.online

---

# Understanding JSON Web Token (JWT)

Prerequisite

Before reading this article, you need to learn:

  * [Usage Scenarios of Asymmetric Encryption](</en/algo/computer-science/encryption-intro/>)

JWT (JSON Web Token) is a Web standard that wraps information in a JSON object and uses a [digital signature](</en/algo/computer-science/encryption-intro/>) to ensure its credibility. Its main features are **stateless** and **self-contained**.

  * **Stateless** : The server does not need to store any user information.
  * **Self-contained** : JWT itself contains all the information needed to verify user identity (such as user ID, permissions, etc). After the server receives the JWT, it can directly parse these details without querying a database or cache.

These two features are very important. Let's explain them with a real example.

## Session-Cookie Authentication Process

Take web service as an example. Let's look at the traditional cookie-based authentication:

When a user logs in successfully, the server generates a sessionID, for example, `abcd1234`.

At the same time, the server stores a mapping from sessionID to user information in a database (usually a cache database like Redis):

```
abcd1234: {
    user_id: "test-user",
    permissions: ["read"]
}
``` 

The server sends this sessionID to the browser through the `Set-Cookie` response header. After that, every time the browser requests the server, it includes this sessionID in the request header:

```
Cookie: sessionID=abcd1234
``` 

With this setup, the server reads the sessionID from the request header and verifies the user's identity by checking the database.

Note that this authentication method is **stateful** because the server depends on a database to store the mapping between sessionID and user info.

Also, this method is **not self-contained** , because the request header only contains the sessionID, which is just a random string and does not have any user information.

Here is a sequence diagram of the Session-Cookie authentication process:

Session StoreServerBrowserSession StoreServerBrowserPOST /login (username, password)Verify credentialsCreate sessionStore session info (sessionID -> userInfo)Response with Set-Cookie: sessionID=...GET /api/data (with sessionID cookie)Look up sessionIDReturn userInfoProcess request with userInfoResponse with requested data

## JWT Authentication Process

Let's think about how to achieve stateless and self-contained authentication.

Maybe we can put the user information directly into the request header, like this:

```
Cookie: userInfo={"user_id":"test-user","permissions":["read"]}
``` 

This method is **stateless**. The server can get user info from the request header, and does not need to rely on other services. It is also **self-contained** because all user info is inside the request.

**But there is a big problem: How can the server trust the data from the client?**

The client can fake the userInfo field, for example:

```
Cookie: userInfo={"user_id":"admin-user","permissions":["read","write","delete"]}
``` 

Anyone can change the request header and claim to be an admin, and then do anything on the server.

So, we need a safer way to be sure the data from the client is trusted. This is the problem that JWT solves.

The JWT authentication process works like this:

When a user logs in successfully, the server will check the user's authentication info (like user_id, permissions, etc.), **sign it with a private key** , and generate a JWT token to send back to the client.

For example, this JWT stores the information `{"user_id":"test-user","permissions":["read"]}`:

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ.lZln8NiYZACSKVLSCzSTB8_VnDUp4WJHiuzO0CUrSw_QagnNTqyGppRG8HoFsRqnpjaxNNTEoqIgwVl6ib0kUO-m9JMnIj4cQKIpZXGYPP8cO-PmvvbWCWr8yqMv_481lS2_XgyXMbo4ZjmpZIca-MSxLETY1wQcLrrzS_r75oukItpmnjAnePtD-cp0bcgRVmrCW3DQrxA6FQw1WSM2Fwz9MvYDGxBu8D8s0aBDqlPceK0W7IC2J-hktcxX5FK9qr76GeYRAFC71DH05e68cxqOCwSxJ-JJLE5uzA-AIAXy9gReY4lkzreFEl2LtwsFg7zM3Tv39CUHgxuitd0mog
``` 

In every request after logging in, the client will send the JWT token in the `Authorization` field of the HTTP request header:

```
Authorization: Bearer <JWT Token>
``` 

When the server receives the JWT token, it can directly get the user's authentication info by decoding it. Then, **the server uses the public key to verify the signature**. If the verification passes, the authentication info is trusted; otherwise, it means the info has been tampered with.

Here is a flowchart showing the JWT authentication process:

ServerBrowser/ClientServerBrowser/ClientPOST /login (username, password)Verify credentialsCreate JWT with user info payloadSign JWT with private keyResponse with JWTGET /api/data (Authorization: Bearer <JWT>)Verify JWT signature with public keyExtract user info from payloadProcess request with userInfoResponse with requested data

## Structure of JWT

Let's look at the example JWT above. It has three parts, separated by `.`:

```
<Header>.<Payload>.<Signature>
``` 

![diagram](https://labuladong.online/images/algo/jwt/example.png)

Each part is Base64 encoded. You can decode them to get their plain JSON content.

JWT is not encrypted

A JWT looks like random characters, but it is just Base64 encoding. Anyone can decode it and see the content. **Do not put any sensitive information into a JWT**.

JWTs are not meant to hide secrets with encryption. They use digital signatures to make sure the data is real and unmodified.

The Header part is a JSON string. It describes the metadata of the JWT, usually with two fields: the token type (`typ`) and the signature algorithm (`alg`).

The Header of our example JWT, decoded from Base64, is:

```
$ echo "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9" | base64 -d
{ 
  "alg": "RS256",
  "typ": "JWT"
}
``` 

  * `alg`: Signature algorithm, e.g., `RS256` means using RSA private key to sign.
  * `typ`: Token type, always `JWT`.

### Payload

The Payload is also a JSON string. It stores the data you want to pass.

JWT standard defines some official fields:

  * `jti`: Unique ID (JWT ID)
  * `iss`: Issuer
  * `sub`: Subject
  * `aud`: Audience
  * `iat`: Issued At
  * `nbf`: Not Before
  * `exp`: Expiration Time

These fields are **optional**. Later, in the [OIDC third-party login section](</en/algo/computer-science/oidc/>), we will talk about their use. For now, they are just listed here.

You can also define your own fields. For example, the Payload in our JWT, decoded from Base64, is:

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

Here, the Payload saves `user_id` and `permissions`. The `iss` field is the issuer `labuladong.online`. `iat` and `exp` are the issue and expire times. If the issuer does not match, or the token is expired, the JWT is not valid.

### Signature

The Signature is the core of JWT. It keeps the JWT safe from tampering.

For example, the above JWT uses the `RS256` signature algorithm. The server signs the Base64 encoded `<Header>.<Payload>` string using the RSA private key:

```
# Data part to be signed: <Header>.<Payload>
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ
``` 

After signing, the result is also encoded in Base64 and attached at the end. Now you get the full `<Header>.<Payload>.<Signature>` JWT token.

## Verify JWT Token

When the server receives this JWT token, it can use the matching public key to check if the JWT has been tampered with.

You can verify this JWT on the [jwt.io](<https://jwt.io/>) website.

Paste the JWT I provided on the left side:

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyIiwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpc3MiOiJsYWJ1bGFkb25nLm9ubGluZSIsImlhdCI6MTc1ODk3NDU3OCwiZXhwIjoxNzU5MTQ3Mzc4fQ.lZln8NiYZACSKVLSCzSTB8_VnDUp4WJHiuzO0CUrSw_QagnNTqyGppRG8HoFsRqnpjaxNNTEoqIgwVl6ib0kUO-m9JMnIj4cQKIpZXGYPP8cO-PmvvbWCWr8yqMv_481lS2_XgyXMbo4ZjmpZIca-MSxLETY1wQcLrrzS_r75oukItpmnjAnePtD-cp0bcgRVmrCW3DQrxA6FQw1WSM2Fwz9MvYDGxBu8D8s0aBDqlPceK0W7IC2J-hktcxX5FK9qr76GeYRAFC71DH05e68cxqOCwSxJ-JJLE5uzA-AIAXy9gReY4lkzreFEl2LtwsFg7zM3Tv39CUHgxuitd0mog
``` 

Paste the public key I provided on the lower right:

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

You will see `Valid JWT` and `Signature Verified`, which means this JWT token is valid. The fields inside, like `user_id` and `permissions`, are trustworthy.

![diagram](https://labuladong.online/images/algo/jwt/verify.jpg)

If you change any data in the JWT payload, the verification will fail.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
