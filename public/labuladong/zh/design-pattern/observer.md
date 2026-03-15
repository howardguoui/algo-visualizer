# 观察者模式

> Source: https://labuladong.online/zh/algo/design-pattern/observer/
> Archived: labuladong.online — 算法笔记

---

# 观察者模式

在开发中，经常会遇到这样的场景：一个对象的状态发生变化时，需要通知其他多个对象做出相应的反应。

比如你在一个拍卖会上，拍卖师每次喊出新的价格，所有竞拍者都需要知道最新报价，然后决定是否继续加价。

如果让每个竞拍者不停地去问拍卖师「现在多少钱了？」，那场面就太混乱了。正常的做法是：竞拍者举牌表示参与，拍卖师每次报价时主动通知所有举牌的人。

**观察者模式（Observer Pattern）** 就是这个思路：定义一种订阅机制，当一个对象的状态发生变化时，所有订阅了它的对象都会自动收到通知。

这是我们介绍的第一个**行为型** 设计模式。前面讲的创建型模式（[单例](</zh/algo/design-pattern/singleton/>)、[工厂方法](</zh/algo/design-pattern/factory-method/>)、[抽象工厂](</zh/algo/design-pattern/abstract-factory/>) 等）关注「怎么创建对象」，结构型模式（[适配器](</zh/algo/design-pattern/adapter/>)、[装饰](</zh/algo/design-pattern/decorator/>)、[组合](</zh/algo/design-pattern/composite/>) 等）关注「怎么组合对象」，而行为型模式关注的是「对象之间怎么通信」。

观察者模式的核心角色：

  * **发布者（Subject/Publisher）** ：维护一个观察者列表，提供注册（attach）、注销（detach）和通知（notify）方法。
  * **观察者接口（Observer）** ：定义一个 `update` 方法，所有观察者都要实现它。
  * **具体发布者（Concrete Subject）** ：持有具体的状态，状态变化时调用 `notify` 通知所有观察者。
  * **具体观察者（Concrete Observer）** ：实现 `update` 方法，定义收到通知后的具体行为。

看两个例子就能直观地理解了。

## 场景一：在线拍卖系统

在线拍卖系统是观察者模式的天然场景：拍卖师（发布者）每次喊出新报价时，需要通知所有参与竞拍的人（观察者）。竞拍者可以随时举牌加入或放弃退出，拍卖师不需要关心具体有哪些人在竞拍。

先定义观察者接口和发布者接口：

```python
from abc import ABC, abstractmethod

# 观察者接口：竞拍者
class Bidder(ABC):
    @abstractmethod
    def update(self, item_name: str, current_price: int, leading_bidder: str):
        # item_name: 拍品名称, current_price: 当前最高价, leading_bidder: 当前最高出价者
        pass

# 发布者接口：拍卖
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

然后实现具体的拍卖会（具体发布者），它管理竞拍者列表，每次报价变化时通知所有人：

```python
class LiveAuction(Auction):
    def __init__(self, item_name: str, starting_price: int):
        self._bidders: list[Bidder] = []
        # 拍品名称
        self._item_name = item_name
        # 当前最高价
        self._current_price = starting_price
        # 当前最高出价者
        self._leading_bidder = "None"

    def register(self, bidder: Bidder):
        self._bidders.append(bidder)

    def unregister(self, bidder: Bidder):
        self._bidders.remove(bidder)

    def notify_bidders(self):
        for bidder in self._bidders:
            bidder.update(self._item_name, self._current_price, self._leading_bidder)

    # 有人出价
    def place_bid(self, bidder_name: str, price: int):
        if price > self._current_price:
            self._current_price = price
            self._leading_bidder = bidder_name
            print(f"{bidder_name} bids {price}")
            # 通知所有竞拍者
            self.notify_bidders()
        else:
            print(f"{bidder_name} bids {price}, below current price, invalid")
``` 

接下来实现两种具体观察者。`OnlineBidder` 是在线竞拍者，在控制台显示最新报价：

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

`BidRecorder` 是一个记录器，负责记录每次出价的历史：

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

看一下客户端代码：

```python
auction = LiveAuction("Antique Vase", 1000)

alice = OnlineBidder("Alice")
bob = OnlineBidder("Bob")
recorder = BidRecorder()

# 三个观察者注册到拍卖会
auction.register(alice)
auction.register(bob)
auction.register(recorder)

# Alice 出价，所有人收到通知
auction.place_bid("Alice", 1500)
# Alice bids 1500
#   [Alice notified] Antique Vase price: 1500, leader: Alice
#   [Bob notified] Antique Vase price: 1500, leader: Alice
#   [Recorder] recorded: Antique Vase: 1500 (Alice)

# Bob 不想玩了，退出拍卖
auction.unregister(bob)
print("Bob left the auction")

# Alice 再次出价，Bob 不再收到通知
auction.place_bid("Alice", 2000)
# Alice bids 2000
#   [Alice notified] Antique Vase price: 2000, leader: Alice
#   [Recorder] recorded: Antique Vase: 2000 (Alice)

recorder.print_history()
# === Bid History ===
#   Antique Vase: 1500 (Alice)
#   Antique Vase: 2000 (Alice)
``` 

这个例子清晰地展示了观察者模式的几个核心操作：

  * **register** ：竞拍者举牌加入，注册为观察者。
  * **unregister** ：竞拍者放弃退出，从观察者列表中移除。Bob 退出后就不再收到通知了。
  * **notify** ：每次有人出价，拍卖师自动通知所有还在场的竞拍者。

发布者（拍卖会）完全不关心观察者是谁、有多少个、收到通知后要干什么。`OnlineBidder` 在屏幕上显示信息，`BidRecorder` 默默记录历史，它们各自做各自的事情，互不影响。

## 场景二：游戏成就系统

在游戏开发中，观察者模式几乎是标配。想象一下，玩家击杀了一只怪物，需要做很多事情：

成就系统检查是否解锁了新成就、统计模块更新击杀数、UI 弹出伤害数字、音效系统播放击杀音效……

如果把这些逻辑全写在「击杀怪物」的代码里，那代码会变得臃肿且难以维护。每加一个新功能（比如连杀奖励），都要去修改击杀逻辑的代码，违反了开闭原则。

用观察者模式就优雅多了：玩家的行为作为发布者，各个子系统作为观察者，各自独立响应。

先定义事件类型和观察者接口：

```python
from enum import Enum
from abc import ABC, abstractmethod
from typing import Any

# 游戏事件类型
class GameEventType(Enum):
    MONSTER_KILLED = "MONSTER_KILLED"
    ITEM_COLLECTED = "ITEM_COLLECTED"
    LEVEL_COMPLETED = "LEVEL_COMPLETED"

# 游戏事件数据
class GameEvent:
    def __init__(self, event_type: GameEventType, data: dict[str, Any]):
        self._type = event_type
        self._data = data

    def get_type(self) -> GameEventType:
        return self._type

    def get_data(self, key: str) -> Any:
        return self._data.get(key)

# 观察者接口
class GameEventListener(ABC):
    @abstractmethod
    def on_event(self, event: GameEvent) -> None:
        pass
``` 

然后实现发布者，这里我们做一个**事件中心** ，允许按事件类型订阅，这样观察者可以只关心自己感兴趣的事件：

```python
class EventCenter:
    def __init__(self):
        # key 是事件类型，value 是订阅了该类型的观察者列表
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

注意这和第一个例子的区别：

拍卖系统中所有观察者都会收到所有通知，而这里观察者可以**按事件类型** 选择性订阅。这是观察者模式在实际开发中更常见的用法。

接下来实现几个具体的观察者：

```python
# 成就系统：追踪击杀数，检查是否解锁成就
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

# 统计模块：记录各类事件的发生次数
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

# 音效系统：根据不同事件播放对应音效
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

最后看客户端如何使用：

```python
event_center = EventCenter()

achievements = AchievementSystem()
stats = StatisticsTracker()
sound = SoundSystem()

# 各模块按需订阅感兴趣的事件
event_center.subscribe(GameEventType.MONSTER_KILLED, achievements)
event_center.subscribe(GameEventType.MONSTER_KILLED, stats)
event_center.subscribe(GameEventType.MONSTER_KILLED, sound)
event_center.subscribe(GameEventType.ITEM_COLLECTED, stats)
event_center.subscribe(GameEventType.ITEM_COLLECTED, sound)

# 玩家击杀了一只史莱姆
print("Player killed Slime:")
event_center.publish(GameEvent(
    GameEventType.MONSTER_KILLED,
    {"monsterName": "Slime"}
))
#   [Achievement] Kill count: 1
#   [Achievement] Unlocked: First Blood!
#   [Stats] MONSTER_KILLED total: 1
#   [Sound] Kill sound: Slime defeated!

# 玩家捡到一个宝箱
print("\nPlayer collected Treasure Chest:")
event_center.publish(GameEvent(
    GameEventType.ITEM_COLLECTED,
    {"itemName": "Treasure Chest"}
))
#   [Stats] ITEM_COLLECTED total: 1
#   [Sound] Pickup sound: Ding~
# 注意：成就系统没有订阅 ITEM_COLLECTED，所以不会收到通知

stats.print_stats()
# === Game Statistics ===
#   MONSTER_KILLED: 1
#   ITEM_COLLECTED: 1
``` 

这个例子体现了观察者模式在实际开发中的价值：

击杀怪物的代码只需要发布一个事件，完全不用知道有哪些模块在监听。如果以后要加一个「连杀奖励」模块，只需要写一个新的观察者类并订阅 `MONSTER_KILLED` 事件，不用改动任何已有代码。

## 观察者模式和发布-订阅模式

你可能听说过**发布-订阅模式（Pub-Sub）** ，它和观察者模式很像，但有一个关键区别。

观察者模式中，发布者直接持有观察者的引用，通知是同步的、直接的方法调用。就像拍卖师直接面对竞拍者喊价。

发布-订阅模式中，发布者和订阅者完全不知道彼此的存在，它们通过一个中间的**消息代理（Broker）** 进行通信。发布者把消息扔给 Broker，Broker 负责转发给订阅者。就像你在淘宝下单后，你并不直接联系快递员，而是平台把订单信息推送给物流系统。

简单来说，观察者模式适合**同一个应用内部** 的对象通信，而发布-订阅模式适合**跨系统、分布式** 的消息传递（如 RabbitMQ、Kafka）。

我们上面的游戏成就系统中的 `EventCenter`，其实已经有一点发布-订阅的影子了——它充当了一个简单的消息中介，让发布者和观察者不直接耦合。在实际开发中，两种模式的界限往往没那么清晰，不必过于纠结分类。

## 总结

观察者模式的主要优势：

  1. **松耦合** ：发布者和观察者通过接口通信，互不依赖具体实现。新增观察者不需要修改发布者的代码。
  2. **符合开闭原则** ：可以随时添加新的观察者，不影响已有的代码。
  3. **支持广播通信** ：一次状态变化，所有观察者都能自动收到通知。

观察者模式的主要缺点：

  1. **通知顺序不确定** ：观察者收到通知的顺序取决于注册顺序，但不应该依赖这个顺序。
  2. **可能引起连锁反应** ：如果观察者在收到通知后又触发了新的状态变化，可能导致循环调用。
  3. **内存泄漏风险** ：如果观察者注册后忘记注销，发布者会一直持有观察者的引用，可能导致对象无法被垃圾回收。

总的来说，当你需要在一个对象状态变化时自动通知多个其他对象，并且不希望它们之间产生紧密耦合时，观察者模式是一个非常实用的选择。

## 评论

请登录后查看/发表评论
