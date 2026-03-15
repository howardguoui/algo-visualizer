# Design Pattern: Builder

> Source: https://labuladong.online/algo/en/design-pattern/builder/
> Archived: labuladong.online

---

# Design Pattern: Builder

When we create a complex object, we often run into this problem: the object's constructor needs a lot of parameters. Some parameters are required, while others are optional.

For example, you want to create a `Resume` object that must have name, age, and education. But it can also include awards, work experience, and company name, which are optional.

If you use a constructor to pass in these parameters, it might look like this:
    
    
    class Resume {
        private String name;
        private int age;
        private String education;
        private String awards;
        private String workExperience;
        private String companyName;
    
        public Resume(String name, int age, String education, String awards, 
                String workExperience, String companyName) {
            this.name = name;
            this.age = age;
            this.education = education;
            this.awards = awards;
            this.workExperience = workExperience;
            this.companyName = companyName;
        }
    }

You would use it like this:
    
    
    // Tom does not have work experience or company name
    Resume resume1 = new Resume("Tom", 23, "Bachelor", "Some Award", null, null);
    
    // Jack has work experience and company name
    Resume resume2 = new Resume("Jack", 30, "Master", null, "XX Engineer", "Company A");

This way can create objects, but there are some clear problems:

  1. The parameter list in the constructor is too long.

  2. When you do not have an optional parameter, you have to pass `null`. This makes the code hard to read and maintain.

  3. If you want to add a new parameter, you need to change the constructor. This means you also have to change all code that uses this constructor.


**To solve these problems, we can use the Builder Pattern.**

The builder pattern is a type of design pattern. It means you use a `Builder` class to set each field step by step, and then call a `build()` method to create the object.

Let’s see how to use builder pattern to improve the `Resume` class. First, create a `ResumeBuilder` class to help build the `Resume` object.
    
    
    class ResumeBuilder {
        private String name;
        private int age;
        private String education;
        private String awards;
        private String workExperience;
        private String companyName;
    
        public ResumeBuilder setBasicInfo(String name, int age, String education) {
            this.name = name;
            this.age = age;
            this.education = education;
            return this;
        }
    
        public ResumeBuilder setAwards(String awards) {
            this.awards = awards;
            return this;
        }
    
        public ResumeBuilder setWorkExperience(String workExperience) {
            this.workExperience = workExperience;
            return this;
        }
    
        public ResumeBuilder setCompanyName(String companyName) {
            this.companyName = companyName;
            return this;
        }
    
        public Resume build() {
            if (name == null || age == 0 || education == null) {
                throw new IllegalArgumentException("Name, age and education are required");
            }
            return new Resume(name, age, education, awards, workExperience, companyName);
        }
    }

The key point of the `ResumeBuilder` class is that each method returns `this`, so you can call methods one after another in a chain to create a `Resume` object:
    
    
    Resume resume1 = new ResumeBuilder()
            .setBasicInfo("Tom", 23, "Bachelor")
            .setAwards("Some Award")
            .build();
    
    Resume resume2 = new ResumeBuilder()
            .setBasicInfo("Jack", 30, "Master")
            .setWorkExperience("XX Engineer")
            .setCompanyName("Company A")
            .build();

With this way, the code is much easier to read. You can clearly see which property you are setting, and you do not need to pass lots of `null` for optional properties.

This example shows the simple use of the builder pattern. The key roles include:

  * **Product** : This is the complex object being built, in this case the `Resume` class.
  * **Builder** : This is the `ResumeBuilder` class. It provides chain methods to set each field of the `Resume` and a `build()` method to create it.


This is the simplest and most common way to use the builder pattern. Of course, you can make some changes based on your needs.

For example, you can make the fields and constructor of `Resume` private, so that the only way to create a `Resume` is through the `ResumeBuilder`.

Or, you can make `ResumeBuilder` an inner class inside `Resume`, and provide a `builder()` method to get the builder. This makes the code even more compact:
    
    
    class Resume {
        // ...
    
        private static class ResumeBuilder {
            // ...
        }
    
        public static ResumeBuilder builder() {
            return new ResumeBuilder();
        }
    }
    
    // Use it like this
    Resume resume = Resume.builder()
            .setBasicInfo("Tom", 23, "Bachelor")
            .setAwards("Some Award")
            .build();

## ¶More Scenarios

### ¶SQL Builder

In Java's MyBatis framework, the builder pattern is used often. It helps us build SQL statements by code, instead of manual string concatenation. This avoids problems like SQL injection and syntax errors:
    
    
    // Use fluent API to build a query statement
    SelectStatementProvider selectStatement = select(order.allColumns())
        .from(order)
        // Condition 1: order name exact match 
        .where(name, isEqualTo("example"))
            // Condition 2: order status exact match 
            .and(status, isEqualTo("finished"))
            // Condition 3: create time later than 2025-01-01 
            .and(createTime, isGreaterThan(LocalDate.of(2025, 1, 1)))
        .build();
    
    // SELECT * FROM order WHERE name = 'example' AND
    // status = 'finished' AND create_time > '2025-01-01'

### ¶HTTP Request Builder

In modern apps, network communication with servers is very common. Building an HTTP request usually needs to set the URL, method (GET, POST), headers, body, and more.

The popular Java HTTP client library OkHttp uses the builder pattern to create `Request` objects:
    
    
    RequestBody body = RequestBody.create(
        "{\"name\":\"labuladong\",\"age\":30}",
        MediaType.get("application/json; charset=utf-8")
    );
    
    // Build HTTP Request object using builder pattern
    Request request = new Request.Builder()
            .url("https://api.example.com/users")
            .header("User-Agent", "My-Awesome-App")
            .post(body)
            .build();

## ¶Summary

Main advantages of the builder pattern:

  1. **Improves code readability.** Chain calls and clear method names make the build process easy to understand.

  2. **Flexible object building.** You can freely combine and set optional parameters, without passing lots of `null` values.

  3. **Encapsulates building logic.** Complex construction logic is put inside the Builder class, so the main product class stays simple and focuses on its core job.


Main disadvantages of the builder pattern:

  1. **Increases code complexity.** You need to write extra Builder classes, which adds more classes to your project.

  2. **Code redundancy.** Fields in the Builder class usually repeat the fields in the product class, leading to duplicate code.


In general, when a class has too many parameters in its constructor (usually more than four) or has many optional parameters, the builder pattern is a very good design pattern to use.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
