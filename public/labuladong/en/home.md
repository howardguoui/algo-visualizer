# Introduction

> Source: https://labuladong.online/algo/en/home/
> Archived: labuladong.online

---

# Introduction

If the full score is 100, no matter what your background is, this site can help you reach about 85 in the shortest time.

Because this site teaches a template-based, framework-based way of thinking, this “85” is stable and repeatable. It does not depend on luck. That means: for problems below 85 in difficulty, you can solve them step by step for sure. For problems above 85, you may need extra insight and luck.

What does “85” mean?

Here is a comparison. Suppose you majored in computer science in college, took required data structure and algorithm classes, and in your job you mainly use many development frameworks, and you have never practiced algorithm problems. Then your level is probably 30–40.

This is normal, because algorithms are a separate skill. It is not directly tied to coding experience. You need to spend time to practice it.

So don’t think 85 is low. This level is more than enough for written tests and interviews for most tech jobs, and also enough for common contests. If you want an even higher level, you can first use this site to reach 85. There is no conflict.

## How to Read

**If you have enough time and you are interested in algorithms** (for example, students who have not graduated), you can read in the order of the site directory. Learn step by step. The difficulty increases slowly. The site also has algorithm visuals, small games, and more. You can truly master data structures and algorithms and enjoy the process.

**If you are preparing for interviews/written tests and you are short on time** , you can follow the order in the [Fast-Track Roadmap](</en/algo/intro/quick-learning-plan/>). Focus on the common algorithm templates and Exercises. You can improve fast and pass algorithm tests.

## What’s on This Site

This site has text tutorials and video lessons. The content is mainly in three parts:

1️⃣ Data structure tutorials (about 10% of the whole site)

This part is mainly in the chapter [Data Structures and Sorting Deep Dive](</en/algo/intro/data-structure-basic/>). It explains sorting algorithms and the key ideas and code of classic data structures. It usually does not include algorithm problems. The goal is to help you understand data structures used at work, and special data structures often seen in algorithm problems, including when to use them. Later, you can directly apply them when solving problems.

2️⃣ Classic algorithm frameworks explained with examples (about 50% of the whole site)

For some classic frameworks and classic problems, I use a full article with specific examples to explain them in detail, so you can understand the ideas. Each article usually includes 2–5 example problems, and you can solve them while reading.

3️⃣ Exercise chapters to help you use the frameworks well (about 40% of the whole site)

In the directory, content marked with  belongs to the Exercise part. It usually comes right after the framework content. **All Exercises can be solved by directly using the framework.** The goal is to build muscle memory through lots of repetition, so you fully master one type of solution. Each practice article includes about 5–10 Exercises. After you master the framework, you can solve them quickly.

I care a lot about your learning experience. I keep updating and improving the site content. You can submit [bug reports](</en/algo/intro/bug-report/>).

## About the Author

I am labuladong, the author of the repo [fucking-algorithm](<https://github.com/labuladong/fucking-algorithm>). I first promoted the "framework thinking" way to solve problems. The repo has been on GitHub Trending many times, and now has 125k stars.

My personal style is to focus on small but high-quality content, not “everything for everyone”. **So this site only targets the algorithm practice scenario. It is direct and efficient, helping you fully master algorithms in the shortest time.**

[Getting Pro](</en/algo/intro/site-vip/>) is the only paid item. You can unlock all content and all supporting tools on the site, and enjoy the smoothest learning experience.

## Useful Features

### Quick Mastery Roadmap

This site provides a [Quick Mastery Study Plan](</en/algo/intro/quick-learning-plan/>) with an interactive roadmap. Click any node to see the related articles and problem sets, making it easy to track your progress.

Quick Mastery Roadmap

### AI Tutor

Every page on the site comes with an [AI Tutor](</en/algo/intro/ai-assistant/>) (bottom-right corner) that can answer your questions based on this site's teaching approach, guide you through algorithm templates, and significantly boost your learning efficiency.

### Algorithm Visualizations

**On this site and in all companion plugins, every solution comes with an algorithm visualization panel below the code** , letting you watch the algorithm execute step by step and helping you understand the underlying logic.

Take this algorithm for [finding the start of a linked list cycle](</en/algo/essential-technique/linked-list-skills-summary/>). Click `if (fast == slow) break` multiple times to watch the fast and slow pointers chase each other until they meet. Then click `while (slow != fast)` multiple times to see both pointers advance in sync until they meet at the cycle's starting point:

Example 1: Color System and Interactions

The visualization panel has enhanced support for complex data structures and recursive algorithms. Here's a [DFS traversal on a graph](</en/algo/data-structure-basic/graph-traverse-basic/>) that finds all paths from node `0` to node `4`. Click `if (s === n - 1)` multiple times to watch the graph traversal unfold and the recursion tree grow:

Example 2: Complex Structures and Recursion

The visualization panel can render data structures in different forms to help you understand them better.

For instance, below the array is displayed as a bar chart to illustrate [insertion sort](</en/algo/data-structure-basic/insertion-sort/>) in action. Click `if (nums[i] < nums[i - 1])` multiple times to watch the sorting process:

Example 3: Sorting Algorithms

The visualization panel dramatically lowers the barrier to understanding complex algorithms and supports all data structures and algorithms—these are just a few examples. You can explore more classic algorithm visualizations on the [Algorithm Visualization Gallery](<https://labuladong.online/en/visualization/>).

### Learn by Playing Games

The visualization panel already lets you watch algorithms in action, but grinding problems can get a bit boring. I wanted to create something that connects algorithms to real life, showcasing just how cool they can be—and hopefully getting you genuinely excited about them.

My idea: combine algorithms with games. We've always used our hands to play games—but what if we could use algorithms to play them instead?

So I've designed a series of classic mini-games where the algorithm components are abstracted out. Given a game scenario, you write the algorithm and let the game engine execute it, ultimately producing a working game or completing a task that would be nearly impossible by hand.

This way, you not only get a strong sense of accomplishment, but more importantly, you see how algorithms apply to real-world scenarios and develop a deeper understanding of them.

For example, here's a Snake game. Your job is to write the movement and food-eating logic to make the game run. It might look complicated if you haven't seen it before, but it's actually quite simple—all you need is [basic linked list operations](</en/algo/game/snake/>):

Snake Game Demo

Check out more fun mini-games at [Algorithm Games Overview](</en/algo/intro/game/>).

### All Major Programming Languages Supported

**This site and all companion plugins** provide solution code in Java, C++, Python, Golang, JavaScript, and all other commonly used languages, covering as many readers' needs as possible.

All code in every language has been personally verified and debugged by me to ensure correctness and consistency.

Both the site and all companion plugins support code image annotations. More complex code blocks include lightbulb icons—hover over them to see explanatory images:

```python
class Solution:
    def detectCycle(self, head: ListNode):
        fast, slow = head, head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                break
        
        # the above code is similar to the hasCycle function
        if not fast or not fast.next:
            # if fast encounters a null pointer, it means there is no cycle
            return None
        
        # reset the pointer to the head node
        slow = head 
        # both fast and slow pointers move forward in sync, the
        # intersection point is the start of the cycle
        while slow != fast:
            fast = fast.next
            slow = slow.next
        return slow
``` 

### Other Useful Features

**Reading history**. In the sidebar and throughout all articles, unread articles are marked with , articles you've started but haven't finished show , and completed articles display , making it easy to track your progress. Reading history syncs automatically across all your devices.

**Focus mode**. When browsing on desktop, there's a "Focus Mode" toggle in the top-right corner. Turning it on blurs the sidebar and top bar so you can concentrate—handy if you're studying at work.

**Site-wide search**. The search bar in the top-right corner supports full-site search. You can also enter a LeetCode problem name, number, or link to jump directly to the corresponding explanation.

### Companion Plugins for Practice

To accommodate different readers' preferences, I've developed and maintained companion plugins that let you solve problems right in your favorite code editor ~~perfect for slacking off at work~~.

**The plugins integrate the[Beginner's Guide](</en/algo/intro/beginner-learning-plan/>) and [Quick Mastery Guide](</en/algo/intro/quick-learning-plan/>), support local code debugging, and provide easy access to this site's explanations, visualization panels, image annotations, and other useful features**.

The plugins aren't required, but I'd recommend installing the Chrome extension at minimum. As you read through this site, you'll likely jump to LeetCode frequently to practice, and the Chrome extension can give you a hand there. The VS Code and JetBrains plugins are optional based on your workflow.

For installation and usage instructions, see [Chrome Extension](</en/algo/intro/chrome/>), [VS Code Plugin](</en/algo/intro/vscode/>), and [JetBrains Plugin](</en/algo/intro/jetbrains/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
