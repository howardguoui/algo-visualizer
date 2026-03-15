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

```python
from abc import ABC, abstractmethod

# Observer interface: Bidder
class Bidder(ABC):
    @abstractmethod
    def update(self, item_name: str, current_price: int, leading_bidder: str):
        # item_name: auction item name, current_price: current
        # highest price, leading_bidder: current leading bidder
        pass

# Subject interface: Auction
class Auction(ABC):
    @abstractmethod
    def register(self, bidder: Bidder):
        pass

    @abstractmethod
    def unregister(self, bidder: Bidder):
        pass

    @abstractmethod
    def notify_bidders(self):
        pass
``` 

Next, implement the concrete auction (concrete subject). It manages the list of bidders and notifies everyone whenever the bid changes:

```python
class LiveAuction(Auction):
    def __init__(self, item_name: str, starting_price: int):
        self._bidders: list[Bidder] = []
        # auction item name
        self._item_name = item_name
        # current highest price
        self._current_price = starting_price
        # current leading bidder
        self._leading_bidder = "None"

    def register(self, bidder: Bidder):
        self._bidders.append(bidder)

    def unregister(self, bidder: Bidder):
        self._bidders.remove(bidder)

    def notify_bidders(self):
        for bidder in self._bidders:
            bidder.update(self._item_name, self._current_price, self._leading_bidder)

    # someone places a bid
    def place_bid(self, bidder_name: str, price: int):
        if price > self._current_price:
            self._current_price = price
            self._leading_bidder = bidder_name
            print(f"{bidder_name} bids {price}")
            # notify all bidders
            self.notify_bidders()
        else:
            print(f"{bidder_name} bids {price}, below current price, invalid")
``` 

Now let's implement two concrete observers. `OnlineBidder` is an online bidder that displays the latest bid in the console:

```python
class OnlineBidder(Bidder):
    def __init__(self, name: str):
        self._name = name

    def update(self, item_name: str, current_price: int, leading_bidder: str):
        print(f"  [{self._name} notified] {item_name} price: {current_price}, leader: {leading_bidder}")

    @property
    def name(self) -> str:
        return self._name
``` 

`BidRecorder` is a recorder that logs the history of every bid:

```python
class BidRecorder(Bidder):
    def __init__(self):
        self._history: list[str] = []

    def update(self, item_name: str, current_price: int, leading_bidder: str):
        record = f"{item_name}: {current_price} ({leading_bidder})"
        self._history.append(record)
        print(f"  [Recorder] recorded: {record}")

    def print_history(self):
        print("=== Bid History ===")
        for record in self._history:
            print(f"  {record}")
``` 

Here's the client code:

```python
auction = LiveAuction("Antique Vase", 1000)

alice = OnlineBidder("Alice")
bob = OnlineBidder("Bob")
recorder = BidRecorder()

# three observers register to the auction
auction.register(alice)
auction.register(bob)
auction.register(recorder)

# Alice bids, all observers get notified
auction.place_bid("Alice", 1500)
# Alice bids 1500
#   [Alice notified] Antique Vase price: 1500, leader: Alice
#   [Bob notified] Antique Vase price: 1500, leader: Alice
#   [Recorder] recorded: Antique Vase: 1500 (Alice)

# Bob leaves the auction
auction.unregister(bob)
print("Bob left the auction")

# Alice bids again, Bob no longer gets notified
auction.place_bid("Alice", 2000)
# Alice bids 2000
#   [Alice notified] Antique Vase price: 2000, leader: Alice
#   [Recorder] recorded: Antique Vase: 2000 (Alice)

recorder.print_history()
# === Bid History ===
#   Antique Vase: 1500 (Alice)
#   Antique Vase: 2000 (Alice)
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

```python
from enum import Enum
from abc import ABC, abstractmethod
from typing import Any

# Game event types
class GameEventType(Enum):
    MONSTER_KILLED = "MONSTER_KILLED"
    ITEM_COLLECTED = "ITEM_COLLECTED"
    LEVEL_COMPLETED = "LEVEL_COMPLETED"

# Game event data
class GameEvent:
    def __init__(self, event_type: GameEventType, data: dict[str, Any]):
        self._type = event_type
        self._data = data

    def get_type(self) -> GameEventType:
        return self._type

    def get_data(self, key: str) -> Any:
        return self._data.get(key)

# Observer interface
class GameEventListener(ABC):
    @abstractmethod
    def on_event(self, event: GameEvent) -> None:
        pass
``` 

Then implement the publisher. Here we'll build an **Event Center** that allows subscription by event type, so observers can subscribe only to the events they care about:

```python
class EventCenter:
    def __init__(self):
        # key is event type, value is list of observers subscribed to that type
        self._listeners: dict[GameEventType, list[GameEventListener]] = {}

    def subscribe(self, event_type: GameEventType, listener: GameEventListener) -> None:
        self._listeners.setdefault(event_type, []).append(listener)

    def unsubscribe(self, event_type: GameEventType, listener: GameEventListener) -> None:
        lst = self._listeners.get(event_type)
        if lst is not None:
            lst.remove(listener)

    def publish(self, event: GameEvent) -> None:
        lst = self._listeners.get(event.get_type())
        if lst is not None:
            for listener in lst:
                listener.on_event(event)
``` 

Notice the difference from the first example:

In the auction system, all observers receive every notification. Here, observers can **selectively subscribe by event type**. This is the more common way the Observer Pattern is used in practice.

Next, implement a few concrete observers:

```python
# Achievement system: track kill count, check if achievements unlocked
class AchievementSystem(GameEventListener):
    def __init__(self):
        self._kill_count = 0

    def on_event(self, event: GameEvent) -> None:
        if event.get_type() == GameEventType.MONSTER_KILLED:
            self._kill_count += 1
            print(f"  [Achievement] Kill count: {self._kill_count}")
            if self._kill_count == 1:
                print("  [Achievement] Unlocked: First Blood!")
            elif self._kill_count == 10:
                print("  [Achievement] Unlocked: Monster Hunter!")

# Statistics tracker: record occurrence count of each event type
class StatisticsTracker(GameEventListener):
    def __init__(self):
        self._stats: dict[GameEventType, int] = {}

    def on_event(self, event: GameEvent) -> None:
        event_type = event.get_type()
        self._stats[event_type] = self._stats.get(event_type, 0) + 1
        print(f"  [Stats] {event_type.value} total: {self._stats[event_type]}")

    def print_stats(self) -> None:
        print("=== Game Statistics ===")
        for event_type, count in self._stats.items():
            print(f"  {event_type.value}: {count}")

# Sound system: play corresponding sound effects based on event type
class SoundSystem(GameEventListener):
    def on_event(self, event: GameEvent) -> None:
        if event.get_type() == GameEventType.MONSTER_KILLED:
            monster = event.get_data("monsterName")
            print(f"  [Sound] Kill sound: {monster} defeated!")
        elif event.get_type() == GameEventType.ITEM_COLLECTED:
            print("  [Sound] Pickup sound: Ding~")
        elif event.get_type() == GameEventType.LEVEL_COMPLETED:
            print("  [Sound] Victory sound: Victory!")
``` 

Finally, here's how the client uses it:

```python
event_center = EventCenter()

achievements = AchievementSystem()
stats = StatisticsTracker()
sound = SoundSystem()

# Each module subscribes to events it cares about
event_center.subscribe(GameEventType.MONSTER_KILLED, achievements)
event_center.subscribe(GameEventType.MONSTER_KILLED, stats)
event_center.subscribe(GameEventType.MONSTER_KILLED, sound)
event_center.subscribe(GameEventType.ITEM_COLLECTED, stats)
event_center.subscribe(GameEventType.ITEM_COLLECTED, sound)

# Player killed a Slime
print("Player killed Slime:")
event_center.publish(GameEvent(
    GameEventType.MONSTER_KILLED,
    {"monsterName": "Slime"}
))
#   [Achievement] Kill count: 1
#   [Achievement] Unlocked: First Blood!
#   [Stats] MONSTER_KILLED total: 1
#   [Sound] Kill sound: Slime defeated!

# Player collected a Treasure Chest
print("\nPlayer collected Treasure Chest:")
event_center.publish(GameEvent(
    GameEventType.ITEM_COLLECTED,
    {"itemName": "Treasure Chest"}
))
#   [Stats] ITEM_COLLECTED total: 1
#   [Sound] Pickup sound: Ding~
# Note: AchievementSystem did not subscribe to ITEM_COLLECTED, so it won't be notified

stats.print_stats()
# === Game Statistics ===
#   MONSTER_KILLED: 1
#   ITEM_COLLECTED: 1
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

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
