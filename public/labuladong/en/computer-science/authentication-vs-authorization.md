# Authentication vs. Authorization

> Source: https://labuladong.online/algo/en/computer-science/authentication-vs-authorization/
> Archived: labuladong.online

---

# Authentication vs. Authorization

**Authentication (short for AuthN)** and **Authorization (short for AuthZ)** are two different concepts, but many people often confuse them. Let's first make clear the difference and connection.

**Authentication** is to prove "who you are." For example:

  * Username and password: If you enter the correct username and password, the system believes you are the owner of that account.
  * Phone verification code: If you enter the correct code, the system believes you own that phone number.
  * ID card/passport: If you show the right ID, the system believes you own it.


**Authorization** happens after authentication. It confirms "what you can do." For example:

  * File system: In an operating system, a regular user can only read a specific system file but cannot change or delete it. Only the admin can change it.
  * Website system: In a forum, a regular user can edit only their own posts, but an admin can delete or edit any post.


Sometimes at work, you may hear the word "Auth" (authentication). It is a broad idea, usually meaning the whole process of permission control: authentication + authorization.

In short, the authentication stage gets the user's unique ID, and the authorization stage uses that ID to check the user's permissions. Let's look at two real-life examples.

## ¶Hotel Check-in Example

Let's use an example from daily life. Suppose you booked a hotel and are now checking in at the front desk.

The front desk first asks for your ID and may check your face.

This is the **authentication stage** , getting and verifying your ID.

After confirming your identity, the staff checks your booking using your ID and gives you a room card. They tell you:

Your room is 209. Before 12:00 noon tomorrow, you can use this room and the hotel gym.

This is the **authorization stage**. The hotel gives you a key card and lets you use some of their resources for a limited time.

## ¶Website Login Example

Here is a tech example.

You use a shopping website and want to view your order. The website first asks for your correct username and password to log in.

This is the **authentication stage** , getting and verifying your user ID.

After you log in, the backend creates a unique session ID and sends it to your browser with the `Set-Cookie` response.

For later requests, your browser sends this session ID in the request header. The backend uses it to find your user ID, then gets your order information from the database.

This is the **authorization stage** , making sure you can only see your own order.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
