# Design Pattern: Abstract Factory

> Source: https://labuladong.online/algo/en/design-pattern/abstract-factory/
> Archived: labuladong.online

---

# Design Pattern: Abstract Factory

In the last article, we talked about the [Factory Method Pattern](</en/algo/design-pattern/factory-method/>) and used an `ILogger` example to show its main idea: expose an abstract factory method for subclasses to implement. Subclasses can then create different objects as needed.

The Abstract Factory Pattern also uses the idea of a "factory," but its code is quite different from the Factory Method Pattern.

The Factory Method Pattern relies on subclass inheritance to implement abstract methods, while the Abstract Factory Pattern uses a factory class passed in through the constructor to create a group of objects.

Let’s compare with the `ILogger` example:

In the [Factory Method Pattern](</en/algo/design-pattern/factory-method/>), we created an `Application` class and provided an abstract method `createLogger()`. We made three subclasses of `Application`, and each implemented the `createLogger()` method to have their own loggers.

With the Abstract Factory Pattern, we first define an abstract factory interface:

```
interface ILoggerFactory {
    ILogger createLogger();
}
``` 

Then, we implement three concrete factory classes. Each factory creates a different logger:

```
// Console logger factory
class ConsoleLoggerFactory implements ILoggerFactory {
    @Override
    public ILogger createLogger() {
        return new ConsoleLogger();
    }
}

// File logger factory
class FileLoggerFactory implements ILoggerFactory {
    @Override
    public ILogger createLogger() {
        return new FileLogger();
    }
}

// Remote logger factory
class RemoteLoggerFactory implements ILoggerFactory {
    @Override
    public ILogger createLogger() {
        return new RemoteLogger();
    }
}
``` 

The `ILogger` interface and its classes `ConsoleLogger`, `FileLogger`, and `RemoteLogger` are the same as those in the [Factory Method Pattern](</en/algo/design-pattern/factory-method/>), so we won’t repeat them here.

Now, we can build our application by just passing in a specific factory class in the constructor:

```
class Application {
    private ILogger logger;

    public Application(ILoggerFactory loggerFactory) {
        // Use factory to create logger
        this.logger = loggerFactory.createLogger();
    }

    public void doSomething() {
        logger.log("Start doing something...");
    }

    public static void main(String[] args) {
        // Choose a different factory based on environment
        ILoggerFactory loggerFactory;
        String env = System.getenv("ENV");
        if (env.equals("dev")) {
            loggerFactory = new ConsoleLoggerFactory();
        } else if (env.equals("test")) {
            loggerFactory = new FileLoggerFactory();
        } else if (env.equals("prod")) {
            loggerFactory = new RemoteLoggerFactory();
        } else {
            throw new IllegalArgumentException("Invalid environment: " + env);
        }

        // Pass the factory to the application
        Application app = new Application(loggerFactory);
        app.doSomething();
    }
}
``` 

This simple example shows the Abstract Factory Pattern. There are a few main roles:

  * **Abstract Product** : Defines the interface for objects the factory creates, which is the `ILogger` interface.
  * **Concrete Product** : These are the real objects created, like `ConsoleLogger`, `FileLogger`, and `RemoteLogger`.
  * **Abstract Factory** : The interface for creating products, which is `ILoggerFactory`.
  * **Concrete Factory** : The classes that actually create the product objects, like `ConsoleLoggerFactory`, `FileLoggerFactory`, and `RemoteLoggerFactory`.

But in this example, the abstract factory only has one `createLogger` method, which is too simple. In this case, using the Abstract Factory Pattern is a bit overkill.

**In real situations, an abstract factory usually has several methods to create a group of "related" objects.** Let's see an example below.

## Example Scenario

Let's look at a real scenario: We need to build an app with UI components such as `IButton`, `ICheckbox`, and `IText`. These components should support different themes, like light or dark mode. When we switch to the light theme, all UI components should be in the light theme, and vice versa.

We can define an abstract factory interface `IThemeFactory`, which provides methods to create different UI components:

```
// Abstract factory interface that can create various UI components
interface IThemeFactory {
    IButton createButton();
    ICheckbox createCheckbox();
    IText createText();
}

// Abstract product interfaces for different UI components
interface IButton {
    void render();
}

interface ICheckbox {
    void render();
}

interface IText {
    void render();
}
``` 

Next, we create two concrete factory classes. Each factory will create a set of themed UI components:

```
// Light theme factory
class LightThemeFactory implements IThemeFactory {
    @Override
    public IButton createButton() {
        return new LightButton();
    }

    @Override
    public ICheckbox createCheckbox() {
        return new LightCheckbox();
    }

    @Override
    public IText createText() {
        return new LightText();
    }
}

// Light theme UI components
class LightButton implements IButton {
    @Override
    public void render() {
        System.out.println("Render Light Button");
    }
}

class LightCheckbox implements ICheckbox {
    @Override
    public void render() {
        System.out.println("Render Light Checkbox");
    }
}

class LightText implements IText {
    @Override
    public void render() {
        System.out.println("Render Light Text");
    }
}

// Dark theme factory
class DarkThemeFactory implements IThemeFactory {
    @Override
    public IButton createButton() {
        return new DarkButton();
    }

    @Override
    public ICheckbox createCheckbox() {
        return new DarkCheckbox();
    }

    @Override
    public IText createText() {
        return new DarkText();
    }
}

// Dark theme UI components
class DarkButton implements IButton {
    @Override
    public void render() {
        System.out.println("Render Dark Button");
    }
}

class DarkCheckbox implements ICheckbox {
    @Override
    public void render() {
        System.out.println("Render Dark Checkbox");
    }
}

class DarkText implements IText {
    @Override
    public void render() {
        System.out.println("Render Dark Text");
    }
}
``` 

Finally, we can build our application like this. Just pass a concrete factory in the constructor:

```
class Application {
    private IButton button;
    private ICheckbox checkbox;
    private IText text;

    public Application(IThemeFactory ThemeFactory) {
        this.button = ThemeFactory.createButton();
        this.checkbox = ThemeFactory.createCheckbox();
        this.text = ThemeFactory.createText();
    }

    public void start() {
        button.render();
        checkbox.render();
        text.render();
    }

    public static void main(String[] args) {
        Application darkApp = new Application(new DarkThemeFactory());
        darkApp.start();
        // Render Dark Button
        // Render Dark Checkbox
        // Render Dark Text

        Application lightApp = new Application(new LightThemeFactory());
        lightApp.start();
        // Render Light Button
        // Render Light Checkbox
        // Render Light Text
    }
}
``` 

If you want to add more themes, just create another class that implements `IThemeFactory` and add matching UI components. There is no need to change the code in the `Application` class.

## Summary

The main advantages of the Abstract Factory pattern:

  1. **Decouples specific classes and reduces coupling.** As you can see in the example above, the program only depends on the abstract factory interface and abstract product interface. It does not depend on concrete factories or products. This makes it easy to switch product classes without changing the business logic, reducing coupling.

  2. **Ensures product family compatibility.** A concrete factory creates a set of related products, making sure these products are compatible. For example, a dark theme factory creates UI components that all use the dark theme. This keeps the app theme consistent.

Because you need to create many classes and interfaces, **the main drawback of the abstract factory is that it increases code complexity.**

In most cases, you should only use the abstract factory pattern when the business logic is complex and you need to reuse generic code. For simple business logic, using abstract factories makes the code harder to maintain and is not worth the cost.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
