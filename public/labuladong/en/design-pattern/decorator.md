# Design Pattern: Decorator

> Source: https://labuladong.online/algo/en/design-pattern/decorator/
> Archived: labuladong.online

---

# Design Pattern: Decorator

The Decorator Pattern is a common design pattern. It lets you add new features to an object without changing its original code.

Note the difference between the decorator pattern and the [Adapter Pattern](</en/algo/design-pattern/adapter/>):

  * The adapter pattern means that the original object uses interface A, but you need interface B. So you use an adapter to convert interface A to interface B.
  * The decorator pattern means that the original object already uses interface A, and you want to add new features to it. You wrap the original object with a decorator, so you can add extra functions.

This may be a bit abstract. Let's look at a simple example.

## Caching Scenario

Suppose we have a data access object (DAO) that queries a username from a database by user ID.

```
// Data access interface
interface UserDao {
    String getUserNameBy(int id);
}

// Implementation of the data access object
class UserDaoImpl implements UserDao {
    @Override
    public String getUserNameBy(int id) {
        // Simulate database query
        String userName = "User" + id;
        System.out.println("Query database: id = " + id + ", username = " + userName);
        return userName;
    }
}
``` 

Right now, every time the client calls `getUserNameBy`, it goes to the database:

```
// Business code
public class Main {
    public static void main(String[] args) {
        UserDao dao = new UserDaoImpl();
        
        dao.getUserNameBy(1);
        // Output: Query database: id = 1, username = User1

        dao.getUserNameBy(1);
        // Output: Query database: id = 1, username = User1
    }
}
``` 

If the same user is queried many times, going to the database every time is a waste. We want to add a cache, so if we already queried a user, we return the result from cache to avoid extra database queries.

The simplest way is to change the code in `UserDaoImpl` and add cache code inside the `getUserNameBy` method. But doing this breaks the Open-Closed Principle (open for extension, closed for modification). Changing old code may cause bugs. If we want to remove the cache later, we have to change the code again.

We also should not write caching logic in business code. Business code should focus on business logic, not low-level data access details.

This is where the decorator pattern helps. We can write a decorator class to wrap the original `UserDaoImpl` object, adding cache without changing `UserDaoImpl` or the business code.

```
// Decorator
class UserDaoCacheDecorator implements UserDao {
    private final UserDao decoratedDao;
    // Use a hashmap as cache. Key is user ID, value is username.
    private final Map<Integer, String> cache = new HashMap<>();

    public UserDaoCacheDecorator(UserDao decoratedDao) {
        this.decoratedDao = decoratedDao;
    }

    @Override
    public String getUserNameBy(int id) {
        // Check cache first
        if (cache.containsKey(id)) {
            String userName = cache.get(id);
            System.out.println("Cache hit, username = " + userName);
            return userName;
        }

        // Not in cache, query database
        String userName = decoratedDao.getUserNameBy(id);
        System.out.println("Query database: id = " + id + ", username = " + userName);

        // Put result into cache
        cache.put(id, userName);
        return userName;
    }
}
``` 

`UserDaoCacheDecorator` is a decorator. It also implements the `UserDao` interface, so the client code uses it the same way as `UserDaoImpl`.

Now the client can use it like this:

```
public class Main {
    public static void main(String[] args) {
        // Wrap the original DAO with a cache decorator
        UserDao cachedDao = new UserDaoCacheDecorator(new UserDaoImpl());

        cachedDao.getUserNameBy(1);
        // Output: Query database: id = 1, username = User1

        cachedDao.getUserNameBy(1);
        // Output: Cache hit, username = User1
    }
}
``` 

As you can see, we did not change any code in `UserDaoImpl`, but we added a cache function to it with no changes. The database query logic is only in `UserDaoImpl`, and all the cache logic is inside `UserDaoCacheDecorator`.

The decorator pattern includes these main roles:

  * **Component interface** : This defines a common interface for both the decorated object and the decorator. In this example, it's the `UserDao` interface.
  * **Concrete Component** : The real object that implements the component interface. Here, it's the `UserDaoImpl` class.
  * **Decorator** : Also implements the component interface and holds a reference to another component. The decorator adds extra logic before or after calling methods of the real object. Here, it's the `UserDaoCacheDecorator` class.

In business code, you only use the `UserDao` interface. You do not need to care whether it is `UserDaoImpl` or `UserDaoCacheDecorator`. This is the key of decorator pattern: **You can add new features to objects without changing their code, by wrapping them with a decorator at runtime.**

## Middleware Scenario

The decorator pattern is widely used in real development, especially for middleware. For example, in a web server, before an HTTP request reaches the actual business logic, it may pass through several middleware, such as logging, user authentication, data compression, and more.

These middleware are like layers of an onion, wrapping the main business logic inside. Each middleware does its job, then passes the request to the next middleware, and finally to the business handler.

This structure lets us combine and reuse different features easily, without affecting the main business logic.

Let’s see an example. First, we define simplified `Request` and `Response` classes to hold HTTP request and response data:

```
public class Request {
    private final String path;
    private final Map<String, String> headers = new HashMap<>();

    public Request(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public void addHeader(String key, String value) {
        this.headers.put(key, value);
    }

    public String getHeader(String key) {
        return this.headers.get(key);
    }

    @Override
    public String toString() {
        return "Request [path=" + path + ", headers=" + headers + "]";
    }
}

public class Response {
    private String body;
    private int statusCode;

    public void setBody(String body) {
        this.body = body;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public String toString() {
        return "Response [statusCode=" + statusCode + ", body='" + body + "']";
    }
}
``` 

Next, we define a `Handler` interface. All handlers, including middleware and business logic, must follow this interface:

```
// Component
public interface Handler {
    void handle(Request request, Response response);
}
``` 

Now, let’s define the core business logic handler:

```
// Concrete Component
public class BusinessHandler implements Handler {
    @Override
    public void handle(Request request, Response response) {
        System.out.println(">>> Entering BusinessHandler...");
        // Simulate business logic
        if ("/api/user".equals(request.getPath())) {
            response.setStatusCode(200);
            response.setBody("{ \"name\": \"Alice\", \"email\": \"alice@example.com\" }");
        } else {
            response.setStatusCode(404);
            response.setBody("Not Found");
        }
        System.out.println("Business logic finished.");
        System.out.println("<<< Exiting BusinessHandler...");
    }
}
``` 

Next, we create two middleware (decorators): `LoggingMiddleware` and `AuthenticationMiddleware`.

The `LoggingMiddleware` records important request info and time spent, then passes the request to the next handler:

```
// Concrete Decorator
public class LoggingMiddleware implements Handler {
    private final Handler next;

    public LoggingMiddleware(Handler next) {
        this.next = next;
    }

    @Override
    public void handle(Request request, Response response) {
        System.out.println(">>> Entering LoggingMiddleware...");
        long startTime = System.currentTimeMillis();
        System.out.println("Request received: " + request.getPath());

        // Pass to next handler
        this.next.handle(request, response);

        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Response sent with status: " + response.getStatusCode() + ". Request took " + duration + "ms.");
        System.out.println("<<< Exiting LoggingMiddleware...");
    }
}
``` 

The `AuthenticationMiddleware` checks if the request has a valid token. If yes, it passes the request to the next handler. If not, it stops the request:

```
// Concrete Decorator
public class AuthenticationMiddleware implements Handler {
    private final Handler next;

    public AuthenticationMiddleware(Handler next) {
        this.next = next;
    }

    @Override
    public void handle(Request request, Response response) {
        System.out.println(">>> Entering AuthenticationMiddleware...");

        String authToken = request.getHeader("Authorization");
        if ("valid-token".equals(authToken)) {
            System.out.println("Authentication successful. Passing to next handler.");
            // Auth success
            this.next.handle(request, response);
        } else {
            // Auth failed
            System.out.println("Authentication failed. Stop the request.");
            response.setStatusCode(401);
            response.setBody("Unauthorized");
        }

        System.out.println("<<< Exiting AuthenticationMiddleware...");
    }
}
``` 

You can see, these middleware implement the `Handler` interface and keep a `Handler next` field. In `handle`, they run their own code and decide whether to call `next.handle()`.

Finally, let’s see how to combine them in the client:

```
public class Main {
    public static void main(String[] args) {
        // 1. Core business handler
        Handler businessHandler = new BusinessHandler();
        // 2. Wrap business handler with auth middleware
        Handler authMiddleware = new AuthenticationMiddleware(businessHandler);
        // 3. Wrap auth middleware with logging middleware
        Handler handlerChain = new LoggingMiddleware(authMiddleware);
        
        // Call order:
        // LoggingMiddleware -> AuthenticationMiddleware -> BusinessHandler

        // Request with valid authentication
        Request successfulRequest = new Request("/api/user");
        successfulRequest.addHeader("Authorization", "valid-token");
        Response response1 = new Response();
        handlerChain.handle(successfulRequest, response1);
        System.out.println("Final Response: " + response1);

        System.out.println("\n");

        // Request with invalid authentication
        Request failedRequest = new Request("/api/user");
        failedRequest.addHeader("Authorization", "invalid-token");
        Response response2 = new Response();
        handlerChain.handle(failedRequest, response2);
        System.out.println("Final Response: " + response2);
    }
}
``` 

Output:

```
>>> Entering LoggingMiddleware...
Request received: /api/user
>>> Entering AuthenticationMiddleware...
Authentication successful. Passing to next handler.
>>> Entering BusinessHandler...
Business logic finished.
<<< Exiting BusinessHandler...
<<< Exiting AuthenticationMiddleware...
Response sent with status: 200. Request took 1ms.
<<< Exiting LoggingMiddleware...
Final Response: Response [statusCode=200, body='{ "name": "Alice", "email": "alice@example.com" }']

>>> Entering LoggingMiddleware...
Request received: /api/user
>>> Entering AuthenticationMiddleware...
Authentication failed. Stop the request.
<<< Exiting AuthenticationMiddleware...
Response sent with status: 401. Request took 0ms.
<<< Exiting LoggingMiddleware...
Final Response: Response [statusCode=401, body='Unauthorized']
``` 

Pay attention to the call order. The outer middleware runs first and exits last.

This is actually similar to [preorder and postorder traversal in singly linked lists](</en/algo/data-structure/palindrome-linked-list/>). Write your code before the recursive call for preorder (forward order), after the call for postorder (reverse order).

This example clearly shows the power of the decorator pattern:

  * **Chain of calls** : Requests go through many middleware one by one, and each can handle the request.
  * **Separation of responsibilities** : Each middleware has its own job (logging, authentication, etc). The business logic is not affected.
  * **Flexible combination** : You can easily add, remove, or change the order of middleware, without changing any middleware or business handler code. For example, if you want to add a compression middleware, just write a `CompressionMiddleware` and add it in the chain.

## Summary

The decorator pattern and adapter pattern are both about wrapping another object, but are used for different reasons:

  * The **adapter pattern** is for **converting interfaces** , to make two incompatible objects work together.
  * The **decorator pattern** is for **adding features** , to give an object more abilities, without changing its original interface.

Main advantages of decorator pattern:

  1. **Open/closed principle** : You can add new features without changing old code.
  2. **High flexibility** : You can add or remove features for an object as you need, and combine many decorators in different ways.
  3. **Separation of responsibilities** : Core jobs and added jobs are split, making code cleaner. Each class has a simple, clear job.

The main downside is, if you have many kinds of features to add, you might end up with many decorator classes, making the code base bigger.

In short, if you want to add features to a class without subclassing it, the decorator pattern is a great choice.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
