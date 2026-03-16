# 用链表加强哈希表（LinkedHashMap）

> Source: https://labuladong.online/zh/algo/data-structure-basic/hashtable-with-linked-list/
> Archived: labuladong.online — 算法笔记

---

# 用链表加强哈希表（LinkedHashMap）

前置知识

阅读本文前，你需要先学习：

  * [哈希表核心原理](</zh/algo/data-structure-basic/hashmap-basic/>)


前文 [哈希表原理](</zh/algo/data-structure-basic/hashmap-basic/>) 从原理上分析了，不能依赖哈希表遍历 `key` 的顺序，即哈希表中的 `key` 是无序的。

但结合实际的编程经验，你可能会有些疑问。

比如熟悉 Java 的读者可能知道，Java 标准库提供的 `LinkedHashMap` 就可以**按照键的插入顺序来遍历** 。例如下面这段简单的代码：
    
    
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

无论你插入多少键，`keySet` 方法返回的所有键都是按照插入顺序排列，感觉就好像在向数组尾部追加元素一样。这怎么可能呢？

如果你熟悉 Golang，你会发现一个更神奇的现象。比如下面这段测试代码：
    
    
    package main
    
    import (
    	"fmt"
    )
    
    func main() {
    	// 初始化 map
    	myMap := map[string]int{
    		"1":  1,
    		"2": 2,
    		"3":  3,
    		"4": 4,
    		"5":  5,
    	}
    
    	// 定义遍历 map 的函数
    	printMapKeys := func(m map[string]int) {
    		for key := range m {
    			fmt.Print(key, " ")
    		}
    		fmt.Println()
    	}
    
    	// 多次遍历 map，观察键的顺序
    	printMapKeys(myMap)
    	printMapKeys(myMap)
    	printMapKeys(myMap)
    	printMapKeys(myMap)
    }
    
    // 我运行的结果如下：
    // 1 2 3 4 5
    // 5 1 2 3 4
    // 2 3 4 5 1
    // 1 2 3 4 5

也就是说，它每次遍历的顺序都是随机。但是按照前文 [哈希表原理](</zh/algo/data-structure-basic/hashmap-basic/>) 所说，虽然哈希表的键是无序的，但是没有对哈希表做任何操作，遍历得到的结果应该不会变才对，Golang 的 map 每次遍历的顺序咋都不一样？这也太离谱了吧？

你可以先自己思考下原因，下面我给出答案。

点击查看答案

**先说 Golang 吧，每次遍历都乱序的原因就是，它故意的** 。

这个原因属实是让人有些哭笑不得，Golang 为了防止开发者依赖哈希表的遍历顺序，所以每次遍历都故意返回不同的顺序，可谓用心良苦。也可以从侧面看出，确实不少开发者没了解过哈希表的基本原理。

我们不妨进一步想想，它是怎么打乱顺序的呢？真是随机打乱吗？

其实不是，你仔细看看，它这个乱序是有规律的。有没有想起前面讲过的 [环形数组](</zh/algo/data-structure-basic/cycle-array/>)？
    
    
    | 1 2 3 4 5
    5 | 1 2 3 4
    2 3 4 5 | 1
    | 1 2 3 4 5

看出来没有？如果不触发扩缩容的话，实际上它的遍历顺序应该也是固定的，只不过它不是每次都从底层 `table` 数组的头部开始，而是从一个随机的位置开始，然后利用环形数组技巧遍历整个 `table` 数组，这样就能保证多次遍历的结果具有随机性，同时又不至于为了随机性而牺牲太多性能。

再说 Java 的 `LinkedHashMap`，**它能让所有键按照插入顺序排列，是因为它把标准的哈希表和链表结合起来，组成了一种新的数据结构：哈希链表** 。

这种数据结构兼具了哈希表 O(1)O(1)O(1) 的增删查改效率，同时又可以像数组链表一样保持键的插入顺序。

它是怎么做的呢？下面我会具体讲解。

更新时间：2026/03/14 00:17

Loading comments...
