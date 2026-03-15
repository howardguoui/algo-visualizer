# 桥接模式

> Source: https://labuladong.online/zh/algo/design-pattern/bridge/
> Archived: labuladong.online — 算法笔记

---

# 桥接模式

在面向对象编程中，继承是一个强大的工具，但如果使用不当，会带来一个棘手的问题：**类爆炸** 。

就比如说，假设你要开发一个消息通知系统，需要支持不同的消息类型（普通消息、紧急消息）和不同的发送渠道（邮件、短信、App 推送）。

如果用继承来实现，你可能会这样设计：

```
Message (抽象基类)
├── NormalEmailMessage      (普通邮件消息)
├── NormalSmsMessage        (普通短信消息)
├── NormalPushMessage       (普通推送消息)
├── UrgentEmailMessage      (紧急邮件消息)
├── UrgentSmsMessage        (紧急短信消息)
└── UrgentPushMessage       (紧急推送消息)
``` 

2 种消息类型 × 3 种发送渠道 = 6 个类。

这还只是个简单的例子。如果产品经理说要加一种「定时消息」类型，再加一个「微信」渠道，你就需要 3 × 4 = 12 个类。每增加一个维度的选项，类的数量就会成倍增长，这就是所谓的「类爆炸」问题。

更麻烦的是，这些类之间会有大量重复代码。比如所有邮件相关的类都要写发邮件的逻辑，所有紧急消息相关的类都要写加 `[紧急]` 前缀的逻辑。

**桥接模式（Bridge Pattern）** 就是用来解决这个问题的。它的核心思想是：把这两个独立变化的维度拆开，让它们各自独立发展，然后通过**组合** 的方式把它们「桥接」起来。

## 桥接模式的核心思想

桥接模式的关键在于识别出系统中独立变化的多个维度，然后把它们分离成独立的类层次结构。

在消息通知的例子中，有两个独立变化的维度：

  1. **抽象维度** ：消息类型（普通消息、紧急消息）—— 决定消息「怎么处理」
  2. **实现维度** ：发送渠道（邮件、短信、推送）—— 决定消息「怎么发送」

桥接模式把这两个维度拆成两个独立的类层次：

```
抽象层（消息类型）              实现层（发送渠道）
Message ──────────────────→ MessageSender (接口)
├── NormalMessage            ├── EmailSender
└── UrgentMessage            ├── SmsSender
                             └── PushSender
``` 

抽象层持有一个实现层的引用，这个引用就是连接两个层次的「桥」。

现在只需要 2 + 3 = 5 个类，就能实现所有 6 种组合。如果要新增消息类型或发送渠道，只需要在对应的层次中添加新类，不会影响另一个层次。

## 代码实现

先来定义实现层，也就是消息发送渠道的接口和具体实现：

```
// 实现层接口：消息发送器
interface MessageSender {
    void send(String content);
}

// 具体实现：邮件发送器
class EmailSender implements MessageSender {
    @Override
    public void send(String content) {
        System.out.println("发送邮件: " + content);
    }
}

// 具体实现：短信发送器
class SmsSender implements MessageSender {
    @Override
    public void send(String content) {
        System.out.println("发送短信: " + content);
    }
}

// 具体实现：App 推送发送器
class PushSender implements MessageSender {
    @Override
    public void send(String content) {
        System.out.println("发送推送: " + content);
    }
}
``` 

然后定义抽象层，也就是消息类型：

```
// 抽象层：消息
abstract class Message {
    // 持有实现层的引用，这就是「桥」
    protected MessageSender sender;

    public Message(MessageSender sender) {
        this.sender = sender;
    }

    // 抽象方法，由子类实现具体的消息处理逻辑
    public abstract void send(String content);
}

// 精确抽象：普通消息
class NormalMessage extends Message {
    public NormalMessage(MessageSender sender) {
        super(sender);
    }

    @Override
    public void send(String content) {
        // 普通消息直接发送
        sender.send(content);
    }
}

// 精确抽象：紧急消息
class UrgentMessage extends Message {
    public UrgentMessage(MessageSender sender) {
        super(sender);
    }

    @Override
    public void send(String content) {
        // 紧急消息加上前缀
        sender.send("[紧急] " + content);
    }
}
``` 

注意 `Message` 类中的 `sender` 成员变量，它就是连接抽象层和实现层的「桥」。通过这个桥，抽象层可以调用实现层的方法，而不需要知道具体是哪个实现。

客户端代码可以自由组合：

```
public class Main {
    public static void main(String[] args) {
        // 普通消息 + 邮件
        Message normalEmail = new NormalMessage(new EmailSender());
        normalEmail.send("你的订单已发货");
        // 输出: 发送邮件: 你的订单已发货

        // 紧急消息 + 短信
        Message urgentSms = new UrgentMessage(new SmsSender());
        urgentSms.send("服务器宕机了！");
        // 输出: 发送短信: [紧急] 服务器宕机了！

        // 紧急消息 + 推送
        Message urgentPush = new UrgentMessage(new PushSender());
        urgentPush.send("检测到异常登录");
        // 输出: 发送推送: [紧急] 检测到异常登录
    }
}
``` 

桥接模式主要包含以下几个核心角色：

  * **抽象（Abstraction）** ：定义抽象层的接口，持有一个实现层的引用。在上面的例子中，就是 `Message` 类。
  * **精确抽象（Refined Abstraction）** ：扩展抽象层，实现具体的业务逻辑。在上面的例子中，就是 `NormalMessage` 和 `UrgentMessage` 类。
  * **实现（Implementor）** ：定义实现层的接口。在上面的例子中，就是 `MessageSender` 接口。
  * **具体实现（Concrete Implementor）** ：实现实现层接口的具体类。在上面的例子中，就是 `EmailSender`、`SmsSender`、`PushSender` 类。

## 扩展性演示

现在产品经理说要加一种「定时消息」类型，只需要在抽象层加一个类：

```
// 新增：定时消息
class ScheduledMessage extends Message {
    private String scheduledTime;

    public ScheduledMessage(MessageSender sender, String scheduledTime) {
        super(sender);
        this.scheduledTime = scheduledTime;
    }

    @Override
    public void send(String content) {
        sender.send("[定时 " + scheduledTime + "] " + content);
    }
}
``` 

要加一个「微信」渠道，只需要在实现层加一个类：

```
// 新增：微信发送器
class WechatSender implements MessageSender {
    @Override
    public void send(String content) {
        System.out.println("发送微信: " + content);
    }
}
``` 

新增的类可以和已有的类自由组合，完全不需要修改已有代码：

```
// 定时消息 + 微信
Message scheduledWechat = new ScheduledMessage(new WechatSender(), "2024-01-01 10:00");
scheduledWechat.send("新年快乐！");
// 输出: 发送微信: [定时 2024-01-01 10:00] 新年快乐！
``` 

## 与其他模式的区别

桥接模式和 [适配器模式](</zh/algo/design-pattern/adapter/>)、[装饰模式](</zh/algo/design-pattern/decorator/>) 都涉及到「包装」另一个对象，但它们的目的不同：

**适配器模式** ：解决接口不兼容的问题。你有一个现成的类，但它的接口和你需要的不一样，适配器在中间做转换。适配器通常是事后补救，在系统设计完成后才引入。

**装饰模式** ：在不改变接口的前提下，给对象动态添加功能。装饰器和被装饰对象实现相同的接口，可以层层嵌套。

**桥接模式** ：在系统设计之初就识别出多个独立变化的维度，将它们分离成独立的类层次。桥接模式是一种预防性的设计，避免类爆炸问题。

一个简单的记忆方法：适配器是「转换接口」，装饰器是「增强功能」，桥接是「分离维度」。

## 总结

桥接模式的主要优势：

  1. **避免类爆炸** ：将 M × N 个类减少为 M + N 个类。
  2. **符合开闭原则** ：可以独立地扩展抽象层和实现层，互不影响。
  3. **符合单一职责原则** ：抽象层关注高层逻辑，实现层关注底层操作。

桥接模式的主要缺点：

**增加了系统的理解难度** ：需要识别出哪些是独立变化的维度，对设计能力要求较高。如果系统中只有一个变化维度，使用桥接模式反而会过度设计。

总的来说，当你发现一个类需要在多个维度上进行扩展，并且这些维度是独立变化的，桥接模式是一个很好的选择。它体现了「组合优于继承」的设计原则，让系统更加灵活、可扩展。
