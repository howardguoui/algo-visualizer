# Design Pattern: Factory Method

> Source: https://labuladong.online/algo/en/design-pattern/factory-method/
> Archived: labuladong.online

---

# Design Pattern: Factory Method

The Factory Method Pattern is a creational design pattern. Its main idea is to **define an interface for creating objects (a factory method), but let subclasses decide which class to instantiate**. This means the creation of objects is handed over to the subclasses.

In simple terms, the parent class gives an abstract factory method, and the child classes implement it. Different subclasses can create different objects as needed.

It's easier to understand with an example.

## ¶Example Scenario

Suppose we have an application that needs to log messages in different ways depending on the environment:

  * **Local development** : Print logs as plain text to the console for easy debugging.
  * **Test environment** : Write logs as plain text to a file for checking historical logs.
  * **Production environment** : Combine logs and other information (like thread ID, timestamp, etc.) into JSON format, and send them to a remote server for monitoring and alerting.


No matter which environment, the business logic code stays the same. We want to change the logging behavior for different environments without changing our main code.

First, we define an interface called `ILogger`. It has a `log()` method for logging:
    
    
    interface ILogger {
        void log(String message);
    }

Next, we can implement three types of loggers:
    
    
    // Console logger
    class ConsoleLogger implements ILogger {
        @Override
        public void log(String message) {
            System.out.println("CONSOLE: " + message);
        }
    }
    
    // File logger
    class FileLogger implements ILogger {
        private String filePath;
    
        public FileLogger(String filePath) {
            this.filePath = filePath;
        }
    
        @Override
        public void log(String message) {
            // In actual application, it will be written to a file
            System.out.println("WRITE TO " + filePath + ": " + message);
        }
    }
    
    // Remote logger
    class RemoteLogger implements ILogger {
        private String remoteServer;
        
        public RemoteLogger(String remoteServer) {
            this.remoteServer = remoteServer;
        }
    
        @Override
        public void log(String message) {
            // In actual application, it will collect other system information and
            // serialize it to JSON format, and send it to a remote server
            String payload = "{\"message\":\"" + message + "\",\"timestamp\":\"" + System.currentTimeMillis() + "\"}";
            System.out.println("SEND TO " + remoteServer + ": " + payload);
        }
    }

Next, we need to implement the business logic of our application and use the factory method to create a logger:
    
    
    abstract class Application {
    
        private ILogger logger;
        
        public Application() {
            // Call the factory method to get the object
            this.logger = createLogger();
        }
    
        // Business method
        public void doSomething() {
            logger.log("Start doing something...");
        }
    
        // The abstract factory method, to be implemented by subclasses
        public abstract ILogger createLogger();
    }

Finally, for different environments, we implement different subclasses:
    
    
    // Development environment
    class DevelopmentApplication extends Application {
        @Override
        public ILogger createLogger() {
            return new ConsoleLogger();
        }
    }
    
    // Testing environment
    class TestingApplication extends Application {
        @Override
        public ILogger createLogger() {
            return new FileLogger("application.log");
        }
    }
    
    // Production environment
    class ProductionApplication extends Application {
        @Override
        public ILogger createLogger() {
            return new RemoteLogger("http://remote-server.com");
        }
    }

This way, we can use different loggers in different environments:
    
    
    class Main {
        public static void main(String[] args) {
            // Select the application based on the environment variable
            Application app;
            String env = System.getenv("ENV");
            if (env.equals("dev")) {
                app = new DevelopmentApplication();
            } else if (env.equals("test")) {
                app = new TestingApplication();
            } else if (env.equals("prod")) {
                app = new ProductionApplication();
            } else {
                throw new IllegalArgumentException("Invalid environment: " + env);
            }
    
            app.doSomething();
        }
    }

Based on the example above, we can summarize the key roles in the Factory Method pattern:

  * **Product** : Defines the interface for objects created by the factory method, which is the `ILogger` interface.
  * **ConcreteProduct** : The specific objects created by the factory, such as `ConsoleLogger`, `FileLogger`, and `RemoteLogger`.
  * **Creator** : The parent class that declares the factory method, which is the `Application` class.
  * **ConcreteCreator** : The subclasses that override the factory method, including `DevelopmentApplication`, `TestingApplication`, and `ProductionApplication`.


**The logger example above is just to help you understand the Factory Method pattern. In real development, this pattern is not often used for logging.**

Most programming languages have powerful third-party logging libraries that give you flexible options. You don't need to make things so complicated.

Also, in modern software design, especially in application development, one important principle is "composition over inheritance". It's not recommended to use inheritance to add new features.

However, the Factory Method pattern is common in UI frameworks. UI frameworks often use inheritance to reuse common rendering logic, so the Factory Method helps to decouple subclasses from parent classes.

## ¶Summary

Let's quickly summarize the Factory Method pattern with the example above.

Advantages:

  * Decoupling: `Application` just uses the `ILogger` interface and doesn't care about the details of classes like `ConsoleLogger`.
  * Easy to extend: You can add new `ILogger` or `Application` subclasses to add new features without changing the main logic.
  * Single responsibility: Each `Application` subclass only creates one kind of `ILogger` implementation, so the roles are clear.


Disadvantages:

  * More classes: Every new `ILogger` implementation means you need to add a new `Application` subclass. This makes the system have more classes and adds complexity.


So, in practice, you need to balance scalability and the number of classes when deciding to use the Factory Method pattern.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
