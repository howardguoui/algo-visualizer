# Understanding OAuth 2.0 Authorization Framework

> Source: https://labuladong.online/algo/en/computer-science/oauth2-explained/
> Archived: labuladong.online

---

# Understanding OAuth 2.0 Authorization Framework

Prerequisite

Before reading this article, you should first learn:

  * [The Difference and Connection Between Authentication and Authorization](</en/algo/computer-science/authentication-vs-authorization/>)

OAuth 2.0 is an industry standard **authorization framework**.

There are two key points here:

  * As mentioned in the [difference and connection between authentication and authorization](</en/algo/computer-science/authentication-vs-authorization/>), OAuth 2.0 is designed for **authorization**. Authorization happens after authentication. It is used to decide "what you can do."
  * OAuth 2.0 is not a piece of code, but a widely used protocol standard. If you follow this standard, you can write code that connects to third-party services that support OAuth 2.0.

Let’s clear up a common misunderstanding: **Many people think OAuth 2.0 means "third-party login", but this is not correct.**

Logging in is about “authentication,” but OAuth 2.0 is about “authorization.” If you use standard OAuth 2.0 flow for login, it is not correct and not safe.

So why do we often see third-party login features together with OAuth 2.0?

This is because third-party login uses OpenID Connect (OIDC), which is an **authentication protocol** built on top of OAuth 2.0. Because of this, people often get OAuth 2.0 and OIDC mixed up.

In this article, we will use real examples to explain the OAuth 2.0 authorization process. In the next chapter, [OIDC Authentication](</en/algo/computer-science/oidc/>), we will explain why OAuth 2.0 cannot be used for login authentication and how OIDC solves this problem.

## Why Do We Need OAuth 2.0

Suppose there is a notes app called `ExampleNote`. It wants to help you import files from Google Drive into the notes app.

What is the simplest way? `ExampleNote` asks you for your Google account and password. Then it uses your account to log in to Google and read files from your Google Drive.

Clearly, this is not safe at all. Users should never give their account and password to a third-party app.

OAuth 2.0 exists to solve this problem: it lets third-party apps get limited access without knowing your password.

The key idea is: **Use a temporary and limited credential (Access Token) instead of your permanent and powerful credential (password).**

## The Four Roles in OAuth 2.0

Before we talk about the process, let's make clear the four roles defined by OAuth 2.0 (these are standard terms in RFC 6749):

  1. **Resource Owner** : Usually you, the user. Because you own the files in Google Drive.

  2. **Resource Server** : The server that stores the protected resource, for example, Google Drive's server.

  3. **Client** : The third-party app that wants to access the resource, like ExampleNote.

  4. **Authorization Server** : The server that checks the user's identity and gives the Client an Access Token. For example, Google’s authorization server.

There are two extra notes about these roles:

  * The Resource Server and Authorization Server are usually run by the same company (like Google), but are separate services in the system.

  * People often think the Client means the user sitting in front of the computer. But in OAuth 2.0, the Client means the third-party app that wants to access the resource. The end user is the Resource Owner.

## OAuth 2.0 Authorization Code Flow

OAuth 2.0 has several ways to authorize. The most common and secure one is the **Authorization Code Flow**.

Let's use an example. Suppose ExampleNote wants to access a user's Google Drive. To do this, ExampleNote first needs to get a Client ID and a Client Secret from the Google developer platform. These are the unique identity and credentials for ExampleNote on Google.

Here is a sequence diagram for the OAuth 2.0 authorization process:

Google DriveResource ServerGoogleAuth ServerExampleNoteServerUser BrowserGoogle DriveResource ServerGoogleAuth ServerExampleNoteServerUser Browser1\. Click "Import Google Drive Files"2\. Redirect to Google Authorization Page3\. Visit Auth Page4\. Show Authorization Confirmation Page5\. User clicks "Allow"6\. Redirect Back to ExampleNote(with auth code)7\. Browser visits callback URL(URL contains code)8\. Use code + client_secretto get Access Token9\. Return Access Token10\. Use Access Tokento request user file list11\. Return file list12\. Show imported files

### Step 1: User Clicks Authorize

You (the user) click on the "Import Google Drive Files" button in ExampleNote.

ExampleNote redirects your browser to Google's authorization page. The URL looks like this:

```
https://accounts.google.com/oauth/authorize?
  response_type=code&
  client_id=examplenote_client_id&
  redirect_uri=https://examplenote.com/callback&
  scope=drive.readonly
``` 

Parameter explanation:

  * `response_type=code`: Tells Google to use the authorization code flow.
  * `client_id`: The identity of ExampleNote on Google (gotten by registering ExampleNote with Google).
  * `redirect_uri`: Where to send the user after authorization is finished.
  * `scope`: What permissions ExampleNote wants. Here it wants read-only access to Google Drive files.

### Step 2: User Agrees to Authorize

Google shows this page:

> ExampleNote wants to access your Google Drive (read-only). Do you agree?
> 
> [ Allow ] [ Deny ]

You click "Allow".

### Step 3: Google Returns Authorization Code

Google redirects your browser back to ExampleNote's callback URL, with an **authorization code** in the URL:

```
https://examplenote.com/callback?code=AUTH_CODE_12345
``` 

Note: This code is only a temporary credential. It is valid for only a short time (usually less than 30 seconds) and can be used only once.

### Step 4: Exchange Code for Access Token

Your browser goes to `https://examplenote.com/callback?code=AUTH_CODE_12345`, so ExampleNote's server gets the authorization code from the URL.

Then, **ExampleNote's server** (not the browser) sends a request to Google's token endpoint:

```
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE_12345&
redirect_uri=https://examplenote.com/callback&
client_id=examplenote_client_id&
client_secret=examplenote_secret
``` 

Key parameters:

  * `code`: The authorization code just received.
  * `client_secret`: The secret of ExampleNote. Google will check that `client_id` matches this `client_secret`.

### Step 5: Google Returns Access Token

After Google verifies the authorization code and `client_secret`, it sends a JSON response to the ExampleNote server:

```
{
  "access_token": "example.abcdefg...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "drive.readonly"
}
``` 

  * `access_token`: This is a temporary access credential. ExampleNote can use it to access your Google Drive.
  * `expires_in`: The valid time for this access token.
  * `scope`: What permissions this access token has.

Some services also return a `refresh_token`. If the `access_token` expires, ExampleNote can use the `refresh_token` to get a new one without making the user authorize again.

### Step 6: Access Protected Resources

ExampleNote takes the `access_token` and requests your file list from Google Drive API:

```
GET https://www.googleapis.com/drive/v3/files
Authorization: Bearer example.abcdefg...
``` 

The Google Drive server checks if the token is valid and sends the file list back to the ExampleNote server.

This is the complete OAuth 2.0 authorization flow. It allows ExampleNote to access your Google Drive accurately, without your Google password being leaked.

## Why Use Authorization Code?

You might ask: why not return the Access Token directly in Step 3? Why use an authorization code first, then exchange it for an Access Token?

This is for **security** , to avoid leaking the Access Token.

The authorization code in step 3 is passed as a parameter in the callback URL. URLs are not secure—it's easy for them to be seen by others (for example, JavaScript code or browser extensions can read URL parameters).

If the Access Token is passed directly in the URL and is stolen, a hacker can use it to access a user's Google Drive directly—this has serious risks.

But the authorization code is just a middle credential. Even if a hacker gets it, it's useless, because in step 4, **the server must also provide the`client_secret`** to get the Access Token. Only the ExampleNote server knows this secret. Browsers and hackers do not know it.

This design is called the **Back Channel exchange**. It keeps the Access Token away from the unsecure browser environment.

## Why Can't This be Used for Third-Party Login?

First, make sure you understand the [difference between authentication and authorization](</en/algo/computer-science/authentication-vs-authorization/>). Authentication is "who you are," authorization is "what you can do."

The flow above is a standard **authorization** flow, between the ExampleNote server (the Client) and Google's authorization server.

But a "login" needs an **authentication** flow: the ExampleNote server must confirm who the real user is.

For example, with Google third-party login, ExampleNote needs to make sure the user truly owns the Google account, and is not a hacker, before letting them log in.

You might think:

If ExampleNote gets a valid access token, doesn't it mean the user is the real owner of the Google account? After all, they had to log in and click agree.

The answer is: just getting an access token does not fully prove the user is the account owner. **This is because the authorization code is passed in the URL and can be stolen.**

For example, in Step 3 above, if a hacker intercepts the authorization code from the URL before the user, they could visit `https://examplenote.com/callback?code=AUTH_CODE_12345`. The ExampleNote server exchanges it for an access token and mistakes the hacker for the user. **The hacker can then log in as the user.**

Since the authorization code is one-time and can only be used once, the real user just gets a message saying the code is used, and cannot log in.

So, using standard OAuth 2.0 for authorization is safe—it helps keep the Access Token safe from hackers.

But, because the authorization code is not very secure, we cannot be sure the person giving the right code is the real Google user, so standard OAuth 2.0 should not be used for third-party login authentication.

To solve this, we need to use OpenID Connect (OIDC), which is a layer of authentication built on top of OAuth 2.0. I will explain OIDC in the next article: [OIDC Authentication](</en/algo/computer-science/oidc/>).

## Summary

  * **OAuth 2.0 is an authorization framework**. It lets third-party apps request limited access without getting your password.
  * **Four Roles** : Resource Owner (the user), Resource Server, Client (third-party app), Authorization Server.
  * **Authorization Code Flow** : User gives permission → Authorization Code is returned → Backend exchanges code for Access Token → Access Token used to get resources.
  * **Key Output** : Access Token, a temporary, limited access credential.
  * **OAuth 2.0 only takes care of authorization, not authentication**. If you want secure third-party login, you need OpenID Connect (OIDC) authentication.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
