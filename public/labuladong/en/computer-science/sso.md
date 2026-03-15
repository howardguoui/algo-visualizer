# Understanding Single Sign-On (SSO)

> Source: https://labuladong.online/algo/en/computer-science/sso/
> Archived: labuladong.online

---

# Understanding Single Sign-On (SSO)

Prerequisite Knowledge

Before reading this article, you need to first learn:

  * [How Session and Cookie Work Together](</en/algo/other-skills/session-and-cookie/>)
  * [Understanding OAuth 2.0 Authorization Framework](</en/algo/computer-science/oauth2-explained/>)
  * [OAuth 2.0 and OIDC Authentication](</en/algo/computer-science/oidc/>)

Suppose you work at a company and use many different systems every day:

  * Company email: `mail.company.com`
  * Code repository: `git.company.com`
  * Project management tool: `pm.company.com`
  * Document system: `docs.company.com`
  * HR system: `hr.company.com`

You can log in to all these systems with the same company account (for example, an email account with your employee ID like `[[email protected]](</cdn-cgi/l/email-protection>)`). But since each system uses a different subdomain, you have to log in repeatedly for each system.

We talked about [Session and Cookie](</en/algo/other-skills/session-and-cookie/>) before. When you log in to `git.company.com`, the server sets a Session Cookie like this:

```
Set-Cookie: sessionID=abc123; domain=git.company.com; path=/
``` 

This Cookie is only valid for `git.company.com`. When you visit `mail.company.com`, your browser will not send this Cookie, so `mail.company.com` does not know you are already logged in, and asks you to log in again.

The simplest idea is: let the server of `git.company.com` set a Cookie for the main domain `company.com`. This way, all `*.company.com` subdomains can read this Cookie and "share login state".

```
Set-Cookie: sessionID=abc123; domain=.company.com; path=/
``` 

Technically, this works. But there are serious security risks and architecture problems:

**1\. Security Issue: A vulnerability in one service can affect all services**

If `git.company.com` sets a Session Cookie with `domain=.company.com`, then all subdomain services (`mail.company.com`, `hr.company.com`, etc.) can read and change this Cookie.

If `mail.company.com` has a security bug, an attacker could steal the Session Cookie and then access all other systems (email, code repository, HR system, etc.) pretending to be you.

**2\. Architecture Issue: Session data structure must be unified**

Sharing a Cookie means sharing a Session ID. All services need to access the same Session data. This means:

  * All services have to share the same Session storage (like Redis)
  * All services' Session data structures must be compatible
  * Services developed by different teams need to agree on Session fields

This is not practical. Each team has its own needs and stores different data in Session. Forcing everyone to use the same Session makes things tightly coupled. If one service changes the Session structure, it could break others.

**3\. Cannot integrate third-party services**

If your company wants to use third-party SaaS services, these services have their own domains (like `yourcompany.slack.com`). Simple Cookie sharing cannot cover them.

The modern way to solve this is **SSO (Single Sign-On)**.

SSO uses a separate authentication center (like `op.company.com`) to solve the problems above:

  * **Security isolation** : Each subsystem has its own Session. If one is attacked, others are safe.
  * **Cross-domain support** : Can integrate services with different domains, including third-party SaaS.
  * **Unified authentication logic** : Subsystems can focus on business logic; they don't need to write their own login logic.
  * **Unified account management** : Users only need to log in once at the authentication center. Then they can access all related subsystems without logging in again.

## How SSO Works

To use SSO, the key is to have a **central authentication server (Authentication Server)**. All applications trust this authentication server.

The architecture looks like this:

```
          Authentication Server
                ↓ Trust
    ┌───────────┼─────────┬─────────┐
    ↓           ↓         ↓         ↓
  App A       App B     App C     App D
``` 

There are three main roles:

  1. **Authentication Server (Identity Provider)**

     * Manages all users’ accounts and passwords
     * Checks if username and password are correct
     * Gives users an "identity credential"
  2. **Application (Service Provider)**

     * Different business systems, like Email, CRM, Document System
     * Trusts the authentication server
     * Confirms user’s identity by checking the "identity credential"
  3. **User**

     * Wants to use more than one application
     * Only needs to log in once at the authentication server

Now, let’s look at the full SSO process.

### First Time Accessing App A

加载图表...

Now, you are logged in to App A. The authentication server `op.company.com` has set a Session Cookie in your browser to record your login state.

### Second Time Accessing App B (Key Point of SSO)

Now you want to use App B (for example, the CRM system):

加载图表...

Notice steps 3 and 4: **The authentication server knows from the Session Cookie that the user is already logged in, so no need to enter password again.**

From the user's view, when visiting App B, there is just a quick jump, and you are logged in automatically. The experience is very smooth.

Last updated: 03/14/2026, 12:17 AM
