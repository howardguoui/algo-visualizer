# Key Points to Implement Linear Probing

> Source: https://labuladong.online/algo/en/data-structure-basic/linear-probing-key-point/
> Archived: labuladong.online

---

# Key Points to Implement Linear Probing

Prerequisite Knowledge

Before reading this article, you need to learn:

  * [Core Principles of Hash Tables](/en/algo/data-structure-basic/hashmap-basic/)


In the previous article [Core Principles of Hash Tables](/en/algo/data-structure-basic/hashmap-basic/), I introduced the core principles and key concepts of hash tables. It mentioned that there are mainly two methods to resolve hash collisions: chaining and linear probing (also known as open addressing):

![](/images/algo/ds-basic/hash-collision-en.jpeg)

Since linear probing is a bit more complex, this article will first explain several challenges in implementing linear probing, and the next article will provide the actual code implementation.

## ¶Simplified Scenario

The previously introduced chaining method is relatively straightforward, where each element in the `table` is a linked list, and when a hash collision occurs, you simply insert the element into the list.

Linear probing is more complex, primarily due to two challenges that involve various array operation techniques. Before clarifying these challenges, let's establish a simplified scenario:

Assume our hash table only supports `key` and `value` types as `int`, with a fixed `table.length` of `10`, and the `hash` function implemented as `hash(key) = key % 10`. This setup easily simulates hash collisions, such as both `hash(1)` and `hash(11)` resulting in 1.

The general logic of linear probing is as follows:

CC++GoJavaJavaScriptPython
    
    
    // The basic logic of linear probing, pseudocode implementation
    
    class MyLinearProbingHashMap {
        // Each element in the array stores a key-value pair
        private KVNode[] table = new KVNode[10];
    
        private int hash(int key) {
            return key % table.length;
        }
    
        public void put(int key, int value) {
            int index = hash(key);
            KVNode node = table[index];
            if (node == null) {
                table[index] = new KVNode(key, value);
            } else {
                // Logic of linear probing
                // Probe backwards until the key is found or an empty slot is found
                while (index < table.length && table[index] != null && table[index].key != key) {
                    index++;
                }
                table[index] = new KVNode(key, value);
            }
        }
    
        public int get(int key) {
            int index = hash(key);
            // Probe backwards until the key is found or an empty slot is found
            while (index < table.length && table[index] != null && table[index].key != key) {
                index++;
            }
            if (table[index] == null) {
                return -1;
            }
            return table[index].value;
        }
    
        public void remove(int key) {
            int index = hash(key);
            // Probe backwards until the key is found or an empty slot is found
            while (index < table.length && table[index] != null && table[index].key != key) {
                index++;
            }
            // Remove table[index]
            // ...
        }
    }

Based on this hypothetical scenario, let's examine the two challenges of linear probing.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
