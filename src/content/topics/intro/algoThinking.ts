import { TopicContent } from '../types'

export const algoThinking: TopicContent = {
  id: 'intro-algo-thinking',
  title: {
    en: 'Algorithm Thinking Framework',
    zh: '算法思维框架',
  },
  description: {
    en: 'Master the fundamental framework that solves 80% of coding interview problems',
    zh: '掌握能解决80%编程面试题的核心思维框架',
  },
  timeEstimate: '45-60 minutes',
  contentType: 'content',
  hasVisualizer: false,
  content: {
    en: `## Why Algorithms Matter

Most developers approach LeetCode problems randomly, treating each as a unique puzzle. This is inefficient. In reality, **~80% of coding interview problems fall into 10-15 core patterns**. Once you recognize these patterns, the solution becomes mechanical.

## The Core Insight: Pattern Recognition

Algorithm thinking is not about memorizing solutions—it's about **pattern recognition and template application**. Every complex problem can be decomposed into:

1. **Problem Type Identification**: What fundamental category is this?
2. **Data Structure Selection**: Which structure serves this problem best?
3. **Technique Application**: Which algorithm template applies?
4. **Edge Case Handling**: What boundaries break the naive solution?

## The 10 Core Patterns

\`\`\`
1. Sliding Window      → Fixed/Variable size window problems
2. Two Pointers       → Converging, fast/slow, partition problems
3. Binary Search      → Sorted array problems, search space optimization
4. Dynamic Programming → Optimal substructure, overlapping subproblems
5. Graph Traversal    → BFS/DFS for connectivity, paths, cycles
6. Tree Recursion     → Divide-and-conquer, backtracking
7. Hash Map/Set       → Frequency, existence, grouping problems
8. Heap/Priority Queue → K largest/smallest, frequency problems
9. Monotonic Stack    → Next/previous element, span problems
10. Prefix/Suffix Sum → Range queries, subarray problems
\`\`\`

## Why Templates Matter

A template is a **reusable code structure** that solves a category of problems. Instead of solving 100 unique problems, you master 10 templates and apply them 100 times.

### Template Benefits:
- **Speed**: Write solution faster (interview time is limited)
- **Correctness**: Proven structure reduces bugs
- **Confidence**: You know what works before you code
- **Adaptability**: Small tweaks, big results

## The Three-Step Approach

### Step 1: Identify Pattern
Read the problem. Ask:
- Is this about finding something in an array? → Sliding Window, Binary Search, Two Pointers
- Is this about sequences? → Dynamic Programming
- Is this about relationships? → Graph, Tree, Union-Find
- Is this about frequencies? → Hash Map, Heap

### Step 2: Select Data Structure
- Need fast lookup? → Hash Map/Set
- Need sorted data? → Heap, BST
- Need sequence? → Array, Linked List
- Need relationships? → Graph

### Step 3: Apply Template
Pull the appropriate template, adjust variables, test edge cases.

## Example: From Random to Systematic

**Problem**: "Find two numbers in an array that sum to target"

**Random approach**:
- Try nested loops? (Brute force, O(n²))
- Hope it passes?

**Systematic approach**:
- Pattern: "Find pair with property" → Two Sum Pattern
- Data structure: Hash Map (for O(1) lookup)
- Template: One-pass hash store + lookup
- Result: O(n) solution, written in 2 minutes

## The Compounding Effect

Early investment in understanding templates pays massive dividends:
- First template: Takes 1 hour to deeply understand
- Second template: 40 minutes (you're faster)
- Tenth template: 15 minutes (patterns repeat)
- Real interview: 20 minutes to solve a medium problem (template + small tweaks)

## Building Your Mental Models

As you learn each pattern, build three things:

1. **Template Code**: The skeleton that solves this pattern
2. **Problem Recognition**: Signals that tell you which pattern applies
3. **Variant Handling**: Common twists and how templates adapt

This framework transforms algorithm problems from "magic tricks you memorize" to "systematic problems you solve with templates."`,

    zh: `## 为什么算法很重要

大多数开发者随机学习LeetCode题目，把每道题当作独立的难题。这样做效率很低。实际上，**~80%的编程面试题都归纳于10-15个核心模式**。一旦你认识这些模式，解题就变成了机械的应用。

## 核心洞察：模式识别

算法思维不是关于死记硬背解题方案——而是关于**模式识别和模板应用**。每个复杂问题都可以分解为：

1. **问题类型识别**：这是哪个基础类别？
2. **数据结构选择**：哪个结构最适合？
3. **技术应用**：应用哪个算法模板？
4. **边界处理**：哪些边界会破坏简单方案？

## 10个核心模式

\`\`\`
1. 滑动窗口        → 固定/可变窗口问题
2. 双指针         → 两端相向、快慢指针、分割问题
3. 二分查找       → 有序数组问题、搜索空间优化
4. 动态规划       → 最优子结构、重叠子问题
5. 图遍历         → BFS/DFS、连接性、路径、环检测
6. 树递归         → 分治、回溯
7. 哈希表/集合    → 频率、存在性、分组
8. 堆/优先队列    → K大/K小、频率问题
9. 单调栈         → 下一个/前一个元素、跨度问题
10. 前缀/后缀和   → 范围查询、子数组问题
\`\`\`

## 为什么模板很重要

模板是**可复用的代码结构**，解决一类问题。与其解决100个独立问题，不如掌握10个模板，并应用100次。

### 模板的好处：
- **速度**：快速编写解决方案（面试时间有限）
- **正确性**：成熟的结构减少错误
- **自信**：你知道什么可行，再动手编码
- **适应性**：小改动，大效果

## 三步法

### 第一步：识别模式
读题时问自己：
- 在数组中找东西？ → 滑动窗口、二分查找、双指针
- 关于序列？ → 动态规划
- 关于关系？ → 图、树、并查集
- 关于频率？ → 哈希表、堆

### 第二步：选择数据结构
- 需要快速查找？ → 哈希表/集合
- 需要有序数据？ → 堆、二叉搜索树
- 需要序列？ → 数组、链表
- 需要关系？ → 图

### 第三步：应用模板
取出合适的模板，调整变量，测试边界情况。

## 例子：从随意到系统

**问题**："在数组中找两个数，其和等于目标值"

**随意做法**：
- 用嵌套循环？(暴力，O(n²))
- 希望能通过？

**系统做法**：
- 模式："找具有某性质的对" → Two Sum模式
- 数据结构：哈希表（O(1)查找）
- 模板：一遍扫描存储+查找
- 结果：O(n)解决方案，2分钟内完成

## 复利效应

早期投资理解模板会产生巨大回报：
- 第一个模板：深入理解需要1小时
- 第二个模板：40分钟（你更快了）
- 第十个模板：15分钟（模式重复）
- 真实面试：20分钟解决中等难度题（模板+小调整）

## 构建心智模型

学习每个模式时，构建三样东西：

1. **模板代码**：解决此模式的框架
2. **问题识别**：告诉你应用哪个模式的信号
3. **变体处理**：常见变化及模板如何适应

这个框架把算法题从"你死记硬背的魔法技巧"转变为"你用模板系统地解决的问题"。`,
  },
  leetcode: [],
}
