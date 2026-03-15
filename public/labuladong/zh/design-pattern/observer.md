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

```java
// 观察者接口：竞拍者
interface Bidder {
    // itemName: 拍品名称, currentPrice: 当前最高价, leadingBidder: 当前最高出价者
    void update(String itemName, int currentPrice, String leadingBidder);
}

// 发布者接口：拍卖
interface Auction {
    void register(Bidder bidder);
    void unregister(Bidder bidder);
    void notifyBidders();
}
``` 

然后实现具体的拍卖会（具体发布者），它管理竞拍者列表，每次报价变化时通知所有人：

```java
class LiveAuction implements Auction {
    private List<Bidder> bidders = new ArrayList<>();
    // 拍品名称
    private String itemName;
    // 当前最高价
    private int currentPrice;
    // 当前最高出价者
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

    // 有人出价
    public void placeBid(String bidderName, int price) {
        if (price > currentPrice) {
            this.currentPrice = price;
            this.leadingBidder = bidderName;
            System.out.println(bidderName + " bids " + price);
            // 通知所有竞拍者
            notifyBidders();
        } else {
            System.out.println(bidderName + " bids " + price + ", below current price, invalid");
        }
    }
}
``` 

接下来实现两种具体观察者。`OnlineBidder` 是在线竞拍者，在控制台显示最新报价：

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

`BidRecorder` 是一个记录器，负责记录每次出价的历史：

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

看一下客户端代码：

```java
public class Main {
    public static void main(String[] args) {
        LiveAuction auction = new LiveAuction("Antique Vase", 1000);

        OnlineBidder alice = new OnlineBidder("Alice");
        OnlineBidder bob = new OnlineBidder("Bob");
        BidRecorder recorder = new BidRecorder();

        // 三个观察者注册到拍卖会
        auction.register(alice);
        auction.register(bob);
        auction.register(recorder);

        // Alice 出价，所有人收到通知
        auction.placeBid("Alice", 1500);
        // Alice bids 1500
        //   [Alice notified] Antique Vase price: 1500, leader: Alice
        //   [Bob notified] Antique Vase price: 1500, leader: Alice
        //   [Recorder] recorded: Antique Vase: 1500 (Alice)

        // Bob 不想玩了，退出拍卖
        auction.unregister(bob);
        System.out.println("Bob left the auction");

        // Alice 再次出价，Bob 不再收到通知
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

```java
// 游戏事件类型
enum GameEventType {
    MONSTER_KILLED, ITEM_COLLECTED, LEVEL_COMPLETED
}

// 游戏事件数据
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

// 观察者接口
interface GameEventListener {
    void onEvent(GameEvent event);
}
``` 

然后实现发布者，这里我们做一个**事件中心** ，允许按事件类型订阅，这样观察者可以只关心自己感兴趣的事件：

```java
class EventCenter {
    // key 是事件类型，value 是订阅了该类型的观察者列表
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

注意这和第一个例子的区别：

拍卖系统中所有观察者都会收到所有通知，而这里观察者可以**按事件类型** 选择性订阅。这是观察者模式在实际开发中更常见的用法。

接下来实现几个具体的观察者：

```java
// 成就系统：追踪击杀数，检查是否解锁成就
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

// 统计模块：记录各类事件的发生次数
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

// 音效系统：根据不同事件播放对应音效
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

最后看客户端如何使用：

```java
public class Main {
    public static void main(String[] args) {
        EventCenter eventCenter = new EventCenter();

        AchievementSystem achievements = new AchievementSystem();
        StatisticsTracker stats = new StatisticsTracker();
        SoundSystem sound = new SoundSystem();

        // 各模块按需订阅感兴趣的事件
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, achievements);
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, stats);
        eventCenter.subscribe(GameEventType.MONSTER_KILLED, sound);
        eventCenter.subscribe(GameEventType.ITEM_COLLECTED, stats);
        eventCenter.subscribe(GameEventType.ITEM_COLLECTED, sound);

        // 玩家击杀了一只史莱姆
        System.out.println("Player killed Slime:");
        eventCenter.publish(new GameEvent(
                GameEventType.MONSTER_KILLED,
                Map.of("monsterName", "Slime")
        ));
        //   [Achievement] Kill count: 1
        //   [Achievement] Unlocked: First Blood!
        //   [Stats] MONSTER_KILLED total: 1
        //   [Sound] Kill sound: Slime defeated!

        // 玩家捡到一个宝箱
        System.out.println("\nPlayer collected Treasure Chest:");
        eventCenter.publish(new GameEvent(
                GameEventType.ITEM_COLLECTED,
                Map.of("itemName", "Treasure Chest")
        ));
        //   [Stats] ITEM_COLLECTED total: 1
        //   [Sound] Pickup sound: Ding~
        // 注意：成就系统没有订阅 ITEM_COLLECTED，所以不会收到通知

        stats.printStats();
        // === Game Statistics ===
        //   MONSTER_KILLED: 1
        //   ITEM_COLLECTED: 1
    }
}
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
