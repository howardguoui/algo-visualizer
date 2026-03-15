# 策略模式

> Source: https://labuladong.online/zh/algo/design-pattern/strategy/
> Archived: labuladong.online — 算法笔记

---

# 策略模式

在开发中，你肯定写过这样的代码：一个函数里面一长串 if-else 或 switch-case，根据不同的类型执行不同的逻辑。

最初只有两三个分支，看起来还挺清爽。但随着需求增长，分支越来越多，每加一种新类型都要打开这个函数往里塞代码，改着改着就变成了几百行的「if-else 地狱」。

**策略模式（Strategy Pattern）** 就是专门治这个病的。它把每种算法/行为封装成独立的类，让它们可以互相替换，而使用它们的代码完全不需要知道具体用的是哪一种。

这是继 [观察者模式](</zh/algo/design-pattern/observer/>) 之后我们介绍的第二个行为型设计模式。观察者模式关注「一个对象变化时如何通知其他对象」，而策略模式关注的是「同一件事有多种做法时如何优雅地切换」。

## 场景一：报告导出器

假设你在开发一个数据分析工具，需要把报告导出为不同的格式。最直接的写法大概是这样：

```
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
            throw new IllegalArgumentException("不支持的格式: " + format);
        }
    }
}
``` 

目前只有三种格式，看起来还能接受。但想象一下，产品经理后续又要加 LaTeX 格式、JSON 格式、Confluence Wiki 格式……每次你都得打开这个类，在 if-else 里面再加一个分支。

这有两个问题：

  * 违反了开闭原则（对扩展开放，对修改关闭），每次新增格式都要修改已有代码，容易引入 bug。
  * 所有格式的导出逻辑挤在一个方法里，这个方法会越来越臃肿。

用策略模式来重构。首先把「格式化」这个会变化的行为抽象成一个接口：

```python
from abc import ABC, abstractmethod

# 策略接口：定义导出格式的通用行为
class ExportStrategy(ABC):
    @abstractmethod
    def export(self, title: str, content: str) -> str:
        pass
``` 

然后每种格式各写一个策略类：

```python
# Markdown 格式策略
class MarkdownExporter(ExportStrategy):
    def export(self, title: str, content: str) -> str:
        return f"# {title}\n\n{content}"

# HTML 格式策略
class HtmlExporter(ExportStrategy):
    def export(self, title: str, content: str) -> str:
        return f"<h1>{title}</h1>\n<p>{content}</p>"

# 纯文本格式策略
class PlainTextExporter(ExportStrategy):
    def export(self, title: str, content: str) -> str:
        return title.upper() + "\n" + "=" * len(title) + "\n" + content
``` 

最后修改 `ReportExporter`，让它不再关心具体的格式化逻辑，只需要持有一个策略对象并调用它：

```python
class ReportExporter:
    def __init__(self, strategy: ExportStrategy):
        self._strategy = strategy

    # 运行时可以切换策略
    def set_strategy(self, strategy: ExportStrategy):
        self._strategy = strategy

    def export(self, title: str, content: str) -> str:
        return self._strategy.export(title, content)
``` 

客户端使用起来很简洁：

```python
if __name__ == "__main__":
    exporter = ReportExporter(MarkdownExporter())
    print(exporter.export("Monthly Report", "Sales grew by 20% this month"))
    # # Monthly Report
    #
    # Sales grew by 20% this month

    # 需要 HTML 格式？换个策略就行
    exporter.set_strategy(HtmlExporter())
    print(exporter.export("Monthly Report", "Sales grew by 20% this month"))
    # <h1>Monthly Report</h1>
    # <p>Sales grew by 20% this month</p>
``` 

if-else 消失了。如果以后要加 LaTeX 格式，只需要新建一个 `LatexExporter` 实现 `ExportStrategy` 接口，完全不用动已有代码。每个策略类只负责自己的格式化逻辑，职责清晰，互不干扰。

这就是策略模式的核心思想：**把变化的部分（算法/行为）封装成独立的策略类，让它们可以互相替换，而上下文不需要知道具体策略的细节** 。

策略模式的核心角色：

  * **策略接口（Strategy）** ：定义所有策略的通用行为。上面的 `ExportStrategy`。
  * **具体策略（Concrete Strategy）** ：实现策略接口的具体算法。上面的 `MarkdownExporter`、`HtmlExporter`、`PlainTextExporter`。
  * **上下文（Context）** ：持有一个策略接口的引用，把具体工作委托给策略对象。上面的 `ReportExporter`。

## 场景二：游戏 NPC 行为

报告导出器展示了策略模式如何消除 if-else。接下来用一个更有趣的例子，展示策略模式的另一个能力：**运行时动态切换策略** 。

假设你在开发一个回合制对战游戏，NPC 有不同的行为模式：激进型总是全力进攻，防御型优先保护自己，狡猾型会根据战场局势做出判断。

定义策略接口和三种具体策略：

```python
from abc import ABC, abstractmethod

# 战斗策略接口
class BattleStrategy(ABC):
    @abstractmethod
    def decide_action(self, my_hp: int, enemy_hp: int) -> str:
        pass

# 激进型：不管不顾，全力输出
class AggressiveStrategy(BattleStrategy):
    def decide_action(self, my_hp: int, enemy_hp: int) -> str:
        return "Full attack! Deal 30 damage"

# 防御型：以防御为主
class DefensiveStrategy(BattleStrategy):
    def decide_action(self, my_hp: int, enemy_hp: int) -> str:
        return "Raise shield, reduce 50% incoming damage"

# 狡猾型：看情况行事
class CunningStrategy(BattleStrategy):
    def decide_action(self, my_hp: int, enemy_hp: int) -> str:
        if enemy_hp < 30:
            return "Enemy is weak, go for the kill! Deal 40 damage"
        return "Probe cautiously, deal 10 damage"
``` 

然后定义游戏角色（上下文），它持有一个策略引用：

```python
class GameCharacter:
    def __init__(self, name: str, hp: int, strategy: BattleStrategy):
        self.name = name
        self.hp = hp
        self._strategy = strategy

    def set_strategy(self, strategy: BattleStrategy):
        self._strategy = strategy

    def take_turn(self, enemy_hp: int):
        action = self._strategy.decide_action(self.hp, enemy_hp)
        print(f"{self.name}: {action}")
``` 

看客户端如何使用：

```python
if __name__ == "__main__":
    # 游戏设计师给不同 NPC 分配不同的行为策略
    warrior = GameCharacter("Warrior", 100, AggressiveStrategy())
    guardian = GameCharacter("Guardian", 120, DefensiveStrategy())
    assassin = GameCharacter("Assassin", 80, CunningStrategy())

    # 各自按照自己的策略行动
    warrior.take_turn(80)
    # Warrior: Full attack! Deal 30 damage

    guardian.take_turn(80)
    # Guardian: Raise shield, reduce 50% incoming damage

    assassin.take_turn(100)
    # Assassin: Probe cautiously, deal 10 damage

    assassin.take_turn(25)
    # Assassin: Enemy is weak, go for the kill! Deal 40 damage

    # 玩家对守卫使用了「激怒」技能，迫使守卫切换为激进模式
    print("\nPlayer used 'Enrage' on Guardian!")
    guardian.set_strategy(AggressiveStrategy())
    guardian.take_turn(80)
    # Guardian: Full attack! Deal 30 damage
``` 

这个例子的关键在于最后几行：玩家使用「激怒」技能后，守卫的行为从防御型切换为了激进型。`GameCharacter` 完全不关心当前用的是什么策略，只管调用 `strategy.decideAction()` 就行。

以后要加一种新的行为模式（比如「治疗型」），只需要新建一个策略类实现 `BattleStrategy` 接口，不用改动 `GameCharacter` 或任何已有策略的代码。

## 与其他模式的区别

策略模式和好几个设计模式在代码结构上很相似，容易混淆。这里厘清两个最常被问到的。

### 策略模式 vs 桥接模式

从代码上看，两者都是「持有一个接口引用，通过接口调用方法」，长得几乎一样。区别在于它们解决的问题不同。

策略模式处理的是**一个维度的变化** 。比如「导出报告」这件事，可以用 Markdown、HTML、纯文本，这些是同一件事的不同做法。上下文（`ReportExporter`）本身不需要子类层次。

[桥接模式](</zh/algo/design-pattern/bridge/>) 处理的是**两个维度的独立变化** 。比如桥接模式那篇文章中的「消息类型（普通/紧急）× 发送渠道（邮件/短信/推送）」，两个维度各有各的类层次，通过组合桥接起来，避免 M × N 的类爆炸。

一句话：策略是**选一个算法** ，桥接是**分离两个或多个维度** 。

### 策略模式 vs 状态模式

这两个模式在结构上几乎一模一样，都是上下文持有一个接口引用，都支持运行时切换。但语义完全不同。

策略模式中，**客户端** 决定使用哪个策略。就像上面的游戏例子，是外部的游戏逻辑（玩家使用「激怒」技能）决定切换守卫的行为。各个策略之间互不知道对方的存在。

状态模式中，**对象自己** 根据内部状态自动切换行为。比如一个订单对象，从「待支付」变为「已支付」再变为「已发货」，这是订单根据事件自己流转的。状态之间通常互相知道彼此，因为一个状态需要知道在什么条件下转到下一个状态。

所以策略模式是客户端（调用方）选算法，状态模式是内部（对象自己）根据状态的变化自动切换行为。

## 总结

策略模式的主要优势：

  1. **消除条件分支** ：用多态替代 if-else/switch-case，代码更清晰、更易维护。
  2. **符合开闭原则** ：新增策略只需添加新类，不用修改已有代码。
  3. **运行时可切换** ：通过 `setStrategy()` 在运行时动态替换算法。

策略模式的主要缺点：

  1. **类数量增加** ：每种算法都需要一个单独的类，策略很多时类的数量会膨胀。
  2. **客户端需要了解策略** ：客户端必须知道有哪些策略可选，才能做出正确的选择。

总的来说，当你发现代码中出现了大量条件分支来选择不同的算法或行为时，策略模式是一个非常好的重构方向。它把「做什么」和「怎么做」分离开来，让系统更灵活、更易扩展。

## 评论

请登录后查看/发表评论
