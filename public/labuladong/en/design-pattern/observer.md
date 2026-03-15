# Design Pattern: Observer

> Source: https://labuladong.online/algo/en/design-pattern/observer/
> Archived: labuladong.online

---

# Design Pattern: Observer

In development, you'll often run into this scenario: when one object's state changes, multiple other objects need to be notified so they can react accordingly.

Think of an auction. Every time the auctioneer calls out a new price, all the bidders need to know the latest bid so they can decide whether to raise the price.

If every bidder kept pestering the auctioneer asking "What's the price now?", it'd be total chaos. The sensible approach is: bidders raise their paddle to join, and the auctioneer proactively announces each new bid to everyone who's raised their paddle.

The **Observer Pattern** follows exactly this idea: define a subscription mechanism so that when one object's state changes, all objects subscribed to it are automatically notified.

This is the first **behavioral** design pattern we're covering. The creational patterns we discussed earlier ([Singleton](</en/algo/design-pattern/singleton/>), [Factory Method](</en/algo/design-pattern/factory-method/>), [Abstract Factory](</en/algo/design-pattern/abstract-factory/>), etc.) focus on "how to create objects." Structural patterns ([Adapter](</en/algo/design-pattern/adapter/>), [Decorator](</en/algo/design-pattern/decorator/>), [Composite](</en/algo/design-pattern/composite/>), etc.) focus on "how to compose objects." Behavioral patterns, on the other hand, focus on "how objects communicate with each other."

The core roles in the Observer Pattern:

  * **Subject/Publisher** : Maintains a list of observers and provides methods to register (attach), unregister (detach), and notify them.
  * **Observer Interface** : Defines an `update` method that all observers must implement.
  * **Concrete Subject** : Holds the actual state. When the state changes, it calls `notify` to alert all observers.
  * **Concrete Observer** : Implements the `update` method and defines the specific behavior upon receiving a notification.

A couple of examples will make this crystal clear.

## Scenario 1: Online Auction System

An online auction system is a natural fit for the Observer Pattern: every time the auctioneer (publisher) announces a new bid, all participating bidders (observers) need to be notified. Bidders can join or drop out at any time, and the auctioneer doesn't need to care about who exactly is bidding.

First, let's define the observer interface and the publisher interface:

```java
// Observer interface: Bidder
interface Bidder {
    // itemName: auction item name, currentPrice: current
    // highest price, leadingBidder: current leading bidder
    void update(String itemName, int currentPrice, String leadingBidder);
}

// Subject interface: Auction
interface Auction {
    void register(Bidder bidder);
    void unregister(Bidder bidder);
    void notifyBidders();
}
``` 

Next, implement the concrete auction (concrete subject). It manages the list of bidders and notifies everyone whenever the bid changes:

```java
class LiveAuction implements Auction {
    private List<Bidder> bidders = new ArrayList<>();
    // auction item name
    private String itemName;
    // current highest price
    private int currentPrice;
    // current leading bidder
    private String leadingBidder;

    public LiveAuction(String itemName, int startingPrice) {
        this.itemName = itemName;
        this.currentPrice = startingPrice;
        this.leadingBidder = "None";
    }

    @Override
    public void register(Bidder bidder) {
        bidders.add(bidder);
    }

    @Override
    public void unregister(Bidder bidder) {
        bidders.remove(bidder);
    }

    @Override
    public void notifyBidders() {
        for (Bidder bidder : bidders) {
            bidder.update(itemName, currentPrice, leadingBidder);
        }
    }

    // someone places a bid
    public void placeBid(String bidderName, int price) {
        if (price > currentPrice) {
            this.currentPrice = price;
            this.leadingBidder = bidderName;
            System.out.println(bidderName + " bids " + price);
            // notify all bidders
            notifyBidders();
        } else {
            System.out.println(bidderName + " bids " + price + ", below current price, invalid");
        }
    }
}
``` 

Now let's implement two concrete observers. `OnlineBidder` is an online bidder that displays the latest bid in the console:

```java
class OnlineBidder implements Bidder {
    private String name;

    public OnlineBidder(String name) {
        this.name = name;
    }

    @Override
    public void update(String itemName, int currentPrice, String leadingBidder) {
        System.out.printf("  [%s notified] %s price: %d, leader: %s%n",
                name, itemName, currentPrice, leadingBidder);
    }

    public String getName() {
        return name;
    }
}
``` 

`BidRecorder` is a recorder that logs the history of every bid:

```java
class BidRecorder implements Bidder {
    private List<String> history = new ArrayList<>();

    @Override
    public void update(String itemName, int currentPrice, String leadingBidder) {
        String record = itemName + ": " + currentPrice + " (" + leadingBidder + ")";
        history.add(record);
        System.out.println("  [Recorder] recorded: " + record);
    }

    public void printHistory() {
        System.out.println("=== Bid History ===");
        for (String record : history) {
            System.out.println("  " + record);
        }
    }
}
``` 

Here's the client code:

```java
public class Main {
    public static void main(String[] args) {
        LiveAuction auction = new LiveAuction("Antique Vase", 1000);

        OnlineBidder alice = new OnlineBidder("Alice");
        OnlineBidder bob = new OnlineBidder("Bob");
        BidRecorder recorder = new BidRecorder();

        // three observers register to the auction
        auction.register(alice);
        auction.register(bob);
        auction.register(recorder);

        // Alice bids, all observers get notified
        auction.placeBid("Alice", 1500);
        // Alice bids 1500
        //   [Alice notified] Antique Vase price: 1500, leader: Alice
        //   [Bob notified] Antique Vase price: 1500, leader: Alice
        //   [Recorder] recorded: Antique Vase: 1500 (Alice)

        // Bob leaves the auction
        auction.unregister(bob);
        System.out.println("Bob left the auction");

        // Alice bids again, Bob no longer gets notified
        auction.placeBid("Alice", 2000);
        // Alice bids 2000
        //   [Alice notified] Antique Vase price: 2000, leader: Alice
        //   [Recorder] recorded: Antique Vase: 2000 (Alice)

        recorder.printHistory();
        // === Bid History ===
        //   Antique Vase: 1500 (Alice)
        //   Antique Vase: 2000 (Alice)
    }
}
``` 

This example clearly demonstrates the core operations of the Observer Pattern:

  * **register** : A bidder raises their paddle to join and registers as an observer.
  * **unregister** : A bidder drops out and is removed from the observer list. Once Bob drops out, he no longer receives notifications.
  * **notify** : Every time someone places a bid, the auctioneer automatically notifies all remaining bidders.

The publisher (the auction) doesn't care at all about who the observers are, how many there are, or what they do with the notification. `OnlineBidder` displays information on screen, `BidRecorder` quietly logs history—they each do their own thing without interfering with each other.

## Scenario 2: Game Achievement System

In game development, the Observer Pattern is practically a must-have. Imagine a player kills a monster—there's a lot that needs to happen:

The achievement system checks whether a new achievement was unlocked, the stats module updates the kill count, the UI pops up damage numbers, the sound system plays a kill sound effect...

If you crammed all this logic into the "kill monster" code, it'd become bloated and impossible to maintain. Every time you add a new feature (like a kill streak bonus), you'd have to modify the kill logic code, violating the Open-Closed Principle.

The Observer Pattern handles this much more elegantly: the player's actions serve as the publisher, and each subsystem acts as an observer, responding independently.

First, define the event types and the observer interface:

```java
// Game event types
enum GameEventType {
    MONSTER_KILLED, ITEM_COLLECTED, LEVEL_COMPLETED
}

// Game event data
class GameEvent {
    private final GameEventType type;
    private final Map<String, Object> data;

    public GameEvent(GameEventType type, Map<String, Object> data) {
        this.type = type;
        this.data = data;
    }

    public GameEventType getType() { return type; }
    public Object getData(String key) { return data.get(key); }
}

// Observer interface
interface GameEventListener {
    void onEvent(GameEvent event);
}
``` 

Then implement the publisher. Here we'll build an **Event Center** that allows subscription by event type, so observers can subscribe only to the events they care about:

```java
class EventCenter {
    // key is event type, value is list of observers subscribed to that type
    private Map<GameEventType, List<GameEventListener>> listeners = new HashMap<>();

    public void subscribe(GameEventType type, GameEventListener listener) {
        listeners.computeIfAbsent(type, k -> new ArrayList<>()).add(listener);
    }

    public void unsubscribe(GameEventType type, GameEventListener listener) {
        List<GameEventListener> list = listeners.get(type);
        if (list != null) {
            list.remove(listener);
        }
    }

    public void publish(GameEvent event) {
        List<GameEventListener> list = listeners.get(event.getType());
        if (list != null) {
            for (GameEventListener listener : list) {
                listener.onEvent(event);
            }
        }
    }
}
``` 

Notice the difference from the first example:

In the auction system, all observers receive every notification. Here, observers can **selectively subscribe by event type**. This is the more common way the Observer Pattern is used in practice.

Next, implement a few concrete observers:

```java
// Achievement system: track kill count, check if achievements unlocked
class AchievementSystem implements GameEventListener {
    private int killCount = 0;

    @Override
    public void onEvent(GameEvent event) {
        if (event.getType() == GameEventType.MONSTER_KILLED) {
            killCount++;
            System.out.println("  [Achievement] Kill count: " + killCount);
            if (killCount == 1) {
                System.out.println("  [Achievement] Unlocked: First Blood!");
            } else if (killCount == 10) {
                System.out.println("  [Achievement] Unlocked: Monster Hunter!");
            }
        }
    }
}

// Statistics tracker: record occurrence count of each event type
class StatisticsTracker implements GameEventListener {
    private Map<GameEventType, Integer> stats = new HashMap<>();

    @Override
    public void onEvent(GameEvent event) {
        stats.merge(event.getType(), 1, Integer::sum);
        System.out.println("  [Stats] " + event.getType() + " total: " + stats.get(event.getType()));
    }

    public void printStats() {
        System.out.println("=== Game Statistics ===");
        stats.forEach((type, count) -> System.out.println("  " + type + ": " + count));
    }
}

// Sound system: play corresponding sound effects based on event type
class SoundSystem implements GameEventListener {
    @Override
    public void onEvent(GameEvent event) {
        switch (event.getType()) {
            case MONSTER_KILLED:
                String monster = (String) event.getData("monsterName");
                System.out.println("  [Sound] Kill sound: " + monster + " defeated!");
                break;
            case ITEM_COLLECTED:
                System.out.println("  [Sound] Pickup sound: Ding~");
                break;
            case LEVEL_COMPLETED:
                System.out.println("  [Sound] Victory sound: Victory!");
                break;
        }
    }
}
``` 

Finally, here's how the client uses it:

```java
public class Main {
    public static void main(String[] args) {
        EventCenter eventCenter = new EventCenter();

        AchievementSystem achievements = new AchievementSystem();
        StatisticsTracker stats = new StatisticsTracker();
        SoundSystem sound = new SoundSystem();

        // Each module subscribes to events it cares about
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, achievements);
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, stats);
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, sound);
        eventCenter.subscribe(GameEventType.ITEM_COLLECTED, stats);
        eventCenter.subscribe(GameEventType.ITEM_COLLECTED, sound);

        // Player killed a Slime
        System.out.println("Player killed Slime:");
        eventCenter.publish(new GameEvent(
                GameEventType.MONSTER_KILLED,
                Map.of("monsterName", "Slime")
        ));
        //   [Achievement] Kill count: 1
        //   [Achievement] Unlocked: First Blood!
        //   [Stats] MONSTER_KILLED total: 1
        //   [Sound] Kill sound: Slime defeated!

        // Player collected a Treasure Chest
        System.out.println("\nPlayer collected Treasure Chest:");
        eventCenter.publish(new GameEvent(
                GameEventType.ITEM_COLLECTED,
                Map.of("itemName", "Treasure Chest")
        ));
        //   [Stats] ITEM_COLLECTED total: 1
        //   [Sound] Pickup sound: Ding~
        // Note: AchievementSystem did not subscribe to ITEM_COLLECTED, so it won't be notified

        stats.printStats();
        // === Game Statistics ===
        //   MONSTER_KILLED: 1
        //   ITEM_COLLECTED: 1
    }
}
``` 

This example showcases the real-world value of the Observer Pattern:

The "kill monster" code only needs to publish an event—it doesn't need to know which modules are listening. If you later want to add a "kill streak bonus" module, just write a new observer class and subscribe it to the `MONSTER_KILLED` event. No existing code needs to change.

## Observer Pattern vs. Publish-Subscribe Pattern

You've probably heard of the **Publish-Subscribe Pattern (Pub-Sub)**. It looks a lot like the Observer Pattern, but there's one key difference.

In the Observer Pattern, the publisher directly holds references to its observers. Notifications are synchronous, direct method calls—like an auctioneer calling out prices face-to-face with the bidders.

In the Pub-Sub Pattern, publishers and subscribers are completely unaware of each other. They communicate through an intermediary **message broker**. The publisher tosses a message to the broker, and the broker handles forwarding it to subscribers. It's like placing an order on an e-commerce platform—you don't contact the delivery driver directly; the platform pushes the order info to the logistics system.

In short, the Observer Pattern is suited for communication between objects **within the same application** , while Pub-Sub is suited for **cross-system, distributed** messaging (think RabbitMQ, Kafka).

The `EventCenter` in our game achievement system above already has a hint of Pub-Sub flavor—it acts as a simple message intermediary, keeping publishers and observers from being directly coupled. In practice, the line between these two patterns is often blurry, so don't overthink the classification.

## Summary

Key advantages of the Observer Pattern:

  1. **Loose coupling** : Publishers and observers communicate through interfaces without depending on concrete implementations. Adding new observers doesn't require modifying the publisher's code.
  2. **Follows the Open-Closed Principle** : You can add new observers at any time without affecting existing code.
  3. **Supports broadcast communication** : A single state change automatically notifies all observers.

Key drawbacks of the Observer Pattern:

  1. **Notification order is undefined** : The order in which observers receive notifications depends on their registration order, but you shouldn't rely on this ordering.
  2. **Potential chain reactions** : If an observer triggers a new state change upon receiving a notification, it could lead to circular calls.
  3. **Memory leak risk** : If an observer registers but forgets to unregister, the publisher keeps holding a reference to it, potentially preventing the object from being garbage collected.

All in all, when you need to automatically notify multiple objects in response to a state change—without tightly coupling them together—the Observer Pattern is an excellent choice.

Last updated: 03/14/2026, 12:17 AM
