# Design Pattern: Strategy

> Source: https://labuladong.online/algo/en/design-pattern/strategy/
> Archived: labuladong.online

---

# Design Pattern: Strategy

You've definitely written code like this before: a function with a long chain of if-else or switch-case statements, each branch handling a different type with different logic.

It starts out with just two or three branches—looks clean enough. But as requirements grow, the branches multiply. Every new type means cracking open that function and stuffing in more code, until it snowballs into a hundreds-of-lines "if-else nightmare."

**The Strategy Pattern** is the cure for exactly this problem. It encapsulates each algorithm/behavior into its own class, making them interchangeable—while the code that uses them doesn't need to know which one it's dealing with.

This is the second behavioral design pattern we're covering, after [Observer Pattern](/en/algo/design-pattern/observer/). The Observer Pattern is about "how to notify other objects when one object changes," while the Strategy Pattern is about "how to elegantly switch between multiple ways of doing the same thing."

## ¶Scenario 1: Report Exporter

Say you're building a data analysis tool that needs to export reports in different formats. The most straightforward approach looks something like this:
    
    
    class ReportExporter {
        public String export(String title, String content, String format) {
            if ("markdown".equals(format)) {
                return "# " + title + "\n\n" + content;
            } else if ("html".equals(format)) {
                return "<h1>" + title + "</h1>\n<p>" + content + "</p>";
            } else if ("plaintext".equals(format)) {
                return title.toUpperCase() + "\n"
                        + "=".repeat(title.length()) + "\n"
                        + content;
            } else {
                throw new IllegalArgumentException("Unsupported format: " + format);
            }
        }
    }

With only three formats, this is manageable. But imagine the product manager later wants LaTeX, JSON, Confluence Wiki format... Every time, you have to open this class and tack on another branch.

There are two problems here:

  * It violates the Open-Closed Principle (open for extension, closed for modification). Every new format means modifying existing code, which risks introducing bugs.
  * All the export logic for every format is crammed into a single method, and that method just keeps getting bloated.


Let's refactor with the Strategy Pattern. First, abstract the "formatting" behavior—the part that changes—into an interface:

C++GoJavaJavaScriptPython
    
    
    // Strategy interface: defines common export behavior
    interface ExportStrategy {
        String export(String title, String content);
    }

Then write a strategy class for each format:

C++GoJavaJavaScriptPython
    
    
    // Markdown format strategy
    class MarkdownExporter implements ExportStrategy {
        @Override
        public String export(String title, String content) {
            return "# " + title + "\n\n" + content;
        }
    }
    
    // HTML format strategy
    class HtmlExporter implements ExportStrategy {
        @Override
        public String export(String title, String content) {
            return "<h1>" + title + "</h1>\n<p>" + content + "</p>";
        }
    }
    
    // Plain text format strategy
    class PlainTextExporter implements ExportStrategy {
        @Override
        public String export(String title, String content) {
            return title.toUpperCase() + "\n"
                    + "=".repeat(title.length()) + "\n"
                    + content;
        }
    }

Finally, update `ReportExporter` so it no longer cares about the specific formatting logic. It just holds a strategy object and calls it:

C++GoJavaJavaScriptPython
    
    
    class ReportExporter {
        private ExportStrategy strategy;
    
        public ReportExporter(ExportStrategy strategy) {
            this.strategy = strategy;
        }
    
        // Strategy can be switched at runtime
        public void setStrategy(ExportStrategy strategy) {
            this.strategy = strategy;
        }
    
        public String export(String title, String content) {
            return strategy.export(title, content);
        }
    }

The client code is clean and simple:

C++GoJavaJavaScriptPython
    
    
    public class Main {
        public static void main(String[] args) {
            ReportExporter exporter = new ReportExporter(new MarkdownExporter());
    
            System.out.println(exporter.export("Monthly Report", "Sales grew by 20% this month"));
            // # Monthly Report
            //
            // Sales grew by 20% this month
    
            // Need HTML format? Just switch the strategy
            exporter.setStrategy(new HtmlExporter());
            System.out.println(exporter.export("Monthly Report", "Sales grew by 20% this month"));
            // <h1>Monthly Report</h1>
            // <p>Sales grew by 20% this month</p>
        }
    }

The if-else is gone. If you need to add LaTeX support later, just create a new `LatexExporter` that implements the `ExportStrategy` interface—no need to touch any existing code. Each strategy class handles only its own formatting logic, with clear responsibilities and no interference between them.

This is the core idea behind the Strategy Pattern: **encapsulate the parts that vary (algorithms/behaviors) into independent strategy classes that are interchangeable, while the context doesn't need to know the details of any specific strategy**.

The key roles in the Strategy Pattern:

  * **Strategy Interface** : Defines the common behavior for all strategies. In our example, that's `ExportStrategy`.
  * **Concrete Strategies** : Implement the strategy interface with specific algorithms. In our example: `MarkdownExporter`, `HtmlExporter`, `PlainTextExporter`.
  * **Context** : Holds a reference to the strategy interface and delegates the actual work to the strategy object. In our example, that's `ReportExporter`.


## ¶Scenario 2: Game NPC Behavior

The report exporter showed how the Strategy Pattern eliminates if-else. Now let's look at a more fun example that demonstrates another superpower: **swapping strategies dynamically at runtime**.

Imagine you're building a turn-based combat game. NPCs have different behavior modes: aggressive types always go all-out on offense, defensive types prioritize protecting themselves, and cunning types make decisions based on the battlefield situation.

Define the strategy interface and three concrete strategies:

C++GoJavaJavaScriptPython
    
    
    // Battle strategy interface
    interface BattleStrategy {
        String decideAction(int myHp, int enemyHp);
    }
    
    // Aggressive: go all out, maximum damage
    class AggressiveStrategy implements BattleStrategy {
        @Override
        public String decideAction(int myHp, int enemyHp) {
            return "Full attack! Deal 30 damage";
        }
    }
    
    // Defensive: prioritize defense
    class DefensiveStrategy implements BattleStrategy {
        @Override
        public String decideAction(int myHp, int enemyHp) {
            return "Raise shield, reduce 50% incoming damage";
        }
    }
    
    // Cunning: adapt to the situation
    class CunningStrategy implements BattleStrategy {
        @Override
        public String decideAction(int myHp, int enemyHp) {
            if (enemyHp < 30) {
                return "Enemy is weak, go for the kill! Deal 40 damage";
            }
            return "Probe cautiously, deal 10 damage";
        }
    }

Then define the game character (the context), which holds a strategy reference:

C++GoJavaJavaScriptPython
    
    
    class GameCharacter {
        private String name;
        private int hp;
        private BattleStrategy strategy;
    
        public GameCharacter(String name, int hp, BattleStrategy strategy) {
            this.name = name;
            this.hp = hp;
            this.strategy = strategy;
        }
    
        public void setStrategy(BattleStrategy strategy) {
            this.strategy = strategy;
        }
    
        public void takeTurn(int enemyHp) {
            String action = strategy.decideAction(hp, enemyHp);
            System.out.println(name + ": " + action);
        }
    }

Here's how the client uses it:

C++GoJavaJavaScriptPython
    
    
    public class Main {
        public static void main(String[] args) {
            // Game designer assigns different behavior strategies to NPCs
            GameCharacter warrior = new GameCharacter("Warrior", 100, new AggressiveStrategy());
            GameCharacter guardian = new GameCharacter("Guardian", 120, new DefensiveStrategy());
            GameCharacter assassin = new GameCharacter("Assassin", 80, new CunningStrategy());
    
            // Each acts according to their own strategy
            warrior.takeTurn(80);
            // Warrior: Full attack! Deal 30 damage
    
            guardian.takeTurn(80);
            // Guardian: Raise shield, reduce 50% incoming damage
    
            assassin.takeTurn(100);
            // Assassin: Probe cautiously, deal 10 damage
    
            assassin.takeTurn(25);
            // Assassin: Enemy is weak, go for the kill! Deal 40 damage
    
            // Player used "Enrage" skill on Guardian, forcing aggressive mode
            System.out.println("\nPlayer used 'Enrage' on Guardian!");
            guardian.setStrategy(new AggressiveStrategy());
            guardian.takeTurn(80);
            // Guardian: Full attack! Deal 30 damage
        }
    }

The key is in the last few lines: after the player uses a "Provoke" skill, the guard's behavior switches from defensive to aggressive. `GameCharacter` doesn't care what strategy it's currently using—it just calls `strategy.decideAction()` and that's it.

If you need to add a new behavior mode later (say, a "healer" type), just create a new strategy class that implements the `BattleStrategy` interface. No changes needed to `GameCharacter` or any existing strategy code.

## ¶How It Differs from Other Patterns

The Strategy Pattern looks structurally similar to several other design patterns, which can be confusing. Let's clarify the two most commonly asked comparisons.

### ¶Strategy Pattern vs Bridge Pattern

Code-wise, both patterns "hold an interface reference and call methods through it"—they look almost identical. The difference lies in the problems they solve.

The Strategy Pattern deals with **variation along a single dimension**. For instance, "exporting a report" can be done in Markdown, HTML, or plain text—these are different ways of doing the same thing. The context (`ReportExporter`) itself doesn't need a class hierarchy.

The [Bridge Pattern](/en/algo/design-pattern/bridge/) deals with **two dimensions that vary independently**. For example, in the Bridge Pattern article: "message type (normal/urgent) × delivery channel (email/SMS/push notification)." Each dimension has its own class hierarchy, and they're composed together via a bridge to avoid an M × N class explosion.

In a nutshell: Strategy is about **picking one algorithm** , Bridge is about **separating two or more dimensions**.

### ¶Strategy Pattern vs State Pattern

These two patterns are structurally almost identical—both have a context holding an interface reference, and both support runtime switching. But their semantics are completely different.

In the Strategy Pattern, the **client** decides which strategy to use. Like in the game example above, it's the external game logic (the player using the "Provoke" skill) that decides to switch the guard's behavior. The strategies don't know about each other.

In the State Pattern, the **object itself** automatically switches behavior based on its internal state. For example, an order object transitions from "pending payment" to "paid" to "shipped"—the order flows through these states on its own based on events. States typically know about each other, because one state needs to know under what conditions it should transition to the next.

So the Strategy Pattern is about the client (the caller) choosing the algorithm, while the State Pattern is about the object itself automatically switching behavior as its state changes.

## ¶Summary

Key advantages of the Strategy Pattern:

  1. **Eliminates conditional branches** : Replaces if-else/switch-case with polymorphism, making code cleaner and easier to maintain.
  2. **Follows the Open-Closed Principle** : Adding a new strategy only requires a new class—no modifications to existing code.
  3. **Runtime swappable** : Dynamically replace algorithms at runtime via `setStrategy()`.


Main drawbacks of the Strategy Pattern:

  1. **More classes** : Each algorithm needs its own class, and the number of classes can balloon when you have many strategies.
  2. **Client awareness required** : The client must know what strategies are available in order to make the right choice.


All in all, when you spot a bunch of conditional branches in your code that select between different algorithms or behaviors, the Strategy Pattern is an excellent refactoring direction. It separates "what to do" from "how to do it," making your system more flexible and easier to extend.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
