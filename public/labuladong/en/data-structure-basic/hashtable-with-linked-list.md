# Use Linked List to Enhance Hash Table (LinkedHashMap)

> Source: https://labuladong.online/algo/en/data-structure-basic/hashtable-with-linked-list/
> Archived: labuladong.online

---

# Use Linked List to Enhance Hash Table (LinkedHashMap)

Prerequisites

Before reading this article, you should first learn:

  * [Hash Table Core Principles](</en/algo/data-structure-basic/hashmap-basic/>)

In the previous article [Hash Table Principles](</en/algo/data-structure-basic/hashmap-basic/>), we analyzed why you cannot rely on the traversal order of keys in a hash table—keys in a hash table are unordered.

But based on practical programming experience, you might have some questions.

For example, readers familiar with Java might know that the Java standard library provides `LinkedHashMap`, which can **traverse keys in their insertion order**. Here is a simple example:

```
import java.util.LinkedHashMap;

public class Main {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("a", 1);
        map.put("b", 2);
        map.put("c", 3);
        System.out.println(map.keySet()); // [a, b, c]

        map.put("y", 4);
        System.out.println(map.keySet()); // [a, b, c, y]

        map.put("d", 5);
        System.out.println(map.keySet()); // [a, b, c, y, d]
    }
}
``` 

No matter how many keys you insert, the `keySet` method always returns keys in insertion order, as if you are appending elements to the end of an array. How is this possible?

If you are familiar with Golang, you will notice an even more curious phenomenon. Consider this test code:

```
package main

import (
	"fmt"
)

func main() {
	// initialize the map
	myMap := map[string]int{
		"1":  1,
		"2": 2,
		"3":  3,
		"4": 4,
		"5":  5,
	}

	// define a function to iterate through the map
	printMapKeys := func(m map[string]int) {
		for key := range m {
			fmt.Print(key, " ")
		}
		fmt.Println()
	}

	// iterate through the map multiple times to observe the order of keys
	printMapKeys(myMap)
	printMapKeys(myMap)
	printMapKeys(myMap)
	printMapKeys(myMap)
}

// my output is as follows:
// 1 2 3 4 5
// 5 1 2 3 4
// 2 3 4 5 1
// 1 2 3 4 5
``` 

In other words, the traversal order is random every time. But according to [Hash Table Fundamentals](</en/algo/data-structure-basic/hashmap-basic/>), although hash table keys are unordered, if you don't modify the hash table, the traversal results should stay the same, right? How can Go's map return a different order every time? That's absurd!

Think about the reason yourself first. Here's the answer.

Click to reveal the answer

**Let's start with Go. The reason it's random every time is... it's intentional**.

This reason is honestly both amusing and frustrating. Go deliberately returns different traversal orders each time to prevent developers from relying on hash table traversal order. You could say they're being thoughtful—or you could see it as evidence that many developers don't understand hash table fundamentals.

Let's think further: how does it shuffle the order? Is it truly random?

Not really. Look closely—there's a pattern to this "randomness." Remember the [Circular Array](</en/algo/data-structure-basic/cycle-array/>) we discussed earlier?

```
| 1 2 3 4 5
5 | 1 2 3 4
2 3 4 5 | 1
| 1 2 3 4 5
``` 

See it? Without triggering resize operations, the traversal order is actually fixed. The difference is that it doesn't always start from the beginning of the underlying `table` array—it starts from a random position, then uses the circular array technique to traverse the entire `table` array. This ensures randomness across multiple traversals without sacrificing too much performance.

Now for Java's `LinkedHashMap`. **It maintains key insertion order by combining a standard hash table with a linked list, creating a new data structure: the hash-linked list (LinkedHashMap)**.

This data structure offers both O(1)O(1)O(1) efficiency for insertions, deletions, and lookups like a hash table, while preserving key insertion order like an array or linked list.

How does it work? I'll explain in detail below.

Upgrade to Pro to unlock all content

[Learn About Pro](</en/algo/intro/site-vip/?int_source=article-lock>)

Last updated: 03/13/2026, 12:17 PM
