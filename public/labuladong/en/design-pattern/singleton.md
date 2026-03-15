# Design Pattern: Singleton

> Source: https://labuladong.online/algo/en/design-pattern/singleton/
> Archived: labuladong.online

---

# Design Pattern: Singleton

The Singleton Pattern is a commonly used design pattern. Its core idea is to **ensure a class can only have one instance throughout the entire application lifecycle, and provide a global access point to retrieve that single instance**.

## ¶Code Implementation

There are a few key elements to implementing the Singleton Pattern:

  * **Private constructor** : Prevents external code from creating instances, so only the class itself can instantiate its one and only instance.
  * **Global access point** : Provides a static method that lets external code retrieve this unique instance.
  * **Thread safety** : Ensures that creating and retrieving the instance is thread-safe in a multi-threaded environment.


Let's walk through a simplified **database connection manager** example to demonstrate how the Singleton Pattern works and where it's useful.

In a web application, there are typically many business methods that read from and write to the database. If every database operation creates a new connection, you'd waste resources and put unnecessary strain on both the app and the database.

In this scenario, you can use the Singleton Pattern to create a single, globally shared database manager instance. All business code goes through this one instance to access the database, avoiding redundant connection creation.

There are several ways to implement the Singleton Pattern, and I'll cover them one by one. The implementation varies slightly across programming languages—detailed explanations are in the code comments.

### ¶1\. Eager Initialization

Eager initialization creates the singleton instance when the class is first loaded. It's the simplest way to implement the Singleton Pattern:

C++GoJavaJavaScriptPython
    
    
    public class DatabaseManager {
        // Create a globally unique instance when the class is loaded
        // JVM initializes static variables when the class is loaded, ensuring thread safety
        private static final DatabaseManager INSTANCE = new DatabaseManager();
        private Connection connection;
        
        // Private constructor, external code cannot create an instance
        private DatabaseManager() {
            // Initialize database connection
            this.connection = getConnection("mysql://...", "user", "password");
            System.out.println("Connection established.");
        }
        
        // Provide a public static global access point
        // External code can get the unique instance through this method
        public static DatabaseManager getInstance() {
            return INSTANCE;
        }
        
        // Business methods
        public ResultSet execute(String sql) throws SQLException {
            ...
        }
    }

### ¶2\. Lazy Initialization (Double-Checked Locking)

Compared to eager initialization, lazy initialization delays instance creation until the first time it's actually needed.

The upside of lazy loading is that if the singleton is never used, the instance is never created—saving memory and speeding up startup. The downside is that you need extra code to ensure thread safety during lazy initialization.

C++GoJavaJavaScriptPython
    
    
    public class DatabaseManager {
        // Use volatile to ensure visibility
        private static volatile DatabaseManager instance;
        private Connection connection;
        
        private DatabaseManager() {
            // Initialize database connection
            this.connection = getConnection("mysql://...", "user", "password");
            System.out.println("Connection established.");
        }
        
        public static DatabaseManager getInstance() {
            // First check, return if instance is already created
            if (instance == null) {
                synchronized (DatabaseManager.class) {
                    // Second check, only the first thread enters the
                    // synchronized block will create the instance
                    if (instance == null) {
                        instance = new DatabaseManager();
                    }
                }
            }
            return instance;
        }
        
        // Business methods
        public ResultSet execute(String sql) throws SQLException {
            ...
        }
    }

About Thread Safety

The Singleton Pattern only guarantees that concurrent calls to `getInstance` are thread-safe, correctly creating and sharing one global singleton object.

Thread safety for other methods (like `execute`) is outside the scope of the Singleton Pattern—you'll need to handle that yourself.

## ¶More Use Cases

### ¶Configuration Management

**Scenario** :

When an application starts, it needs to read a configuration file (database URLs, API keys, etc.). These settings don't change during the application's lifetime and need to be accessible globally.

**Why use a singleton** :

A singleton provides globally consistent configuration data while avoiding redundant file reads, which improves performance.
    
    
    // Usage scenario pseudocode
    public class DatabaseService {
        public void connect() {
            // Get config from the singleton
            ConfigManager config = ConfigManager.getInstance();
            String dbUrl = config.get("database.url");
            String dbUser = config.get("database.user");
            // Establish database connection...
        }
    }
    
    public class EmailService {
        public void sendEmail() {
            // Same config instance, no redundant config loading
            ConfigManager config = ConfigManager.getInstance();
            String apiKey = config.get("email.api.key");
            String smtpHost = config.get("email.smtp.host");
            // Send email...
        }
    }

### ¶Logger

**Scenario** :

In a large application, every module needs to log information. These logs typically need to be written to the same file or sent to the same log server.

**Why use a singleton** :

If each module creates its own Logger instance to write to the same log file, you'll run into file write conflicts that corrupt or lose log entries. A singleton Logger ensures all logging goes through a single entry point, writing to the target in an orderly fashion.

Mature logging frameworks like Log4j and SLF4J use singleton or similar patterns to keep log configuration unified and output coordinated.
    
    
    public class AppLogger {
        private static final AppLogger instance = new AppLogger();
        private FileWriter fileWriter;
    
        private AppLogger() {
            // All logs are written to this single file
            fileWriter = new FileWriter("application.log", true);
        }
    
        public static AppLogger getInstance() {
            return instance;
        }
    
        public void log(String level, String message) {
            ...
        }
    }

### ¶Things to Watch Out For

The Singleton Pattern is powerful and widely used, but be careful not to overuse it.

It introduces global state, increases coupling in your code, and makes unit testing harder. So before reaching for a singleton, make sure the object truly needs to be globally shared.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
