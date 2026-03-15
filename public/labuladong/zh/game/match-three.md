# 【游戏】消消乐游戏

> Source: https://labuladong.online/zh/algo/game/match-three/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】消消乐游戏

在消消乐游戏中，玩家可以交换方块，当三个或三个以上相同的方块连在同一行或同一列时，它们就会被消除，然后上方方块会下坠填补空缺。

在本站配套的消消乐游戏中，请你实现 `applyGravity` 函数，完成这个方块下坠的逻辑。要求原地修改 `board` 数组，并避免直接在数组中间插入/删除元素。

消消乐游戏

## 讲解

这道题本质上是考察 [数组双指针技巧汇总](</zh/algo/essential-technique/array-two-pointers-summary/>) 中的 `moveZeroes` 解法，使用快慢指针技巧将每一列方块的元素 0 移动到顶部。

参考解法如下：

```java
// 游戏面板仅支持提交 JavaScript 代码
// 其他语言代码的作用是帮助大家理解算法逻辑

class Solution {
    public void applyGravity(int[][] board) {
        if (board == null || board.length == 0) {
            return;
        }
        
        int rows = board.length;
        int cols = board[0].length;
        
        // 遍历每一列
        for (int col = 0; col < cols; col++) {
            // 初始化快慢指针
            int slow = rows - 1;
            int fast = rows - 1;
            
            while (fast >= 0) {
                if (board[fast][col] != 0) {
                    // 将非 0 元素移动到慢指针位置
                    board[slow][col] = board[fast][col];
                    slow--;
                }
                fast--;
            }
            
            // 将剩余的顶部位置填充为 0
            for (int i = 0; i <= slow; i++) {
                board[i][col] = 0;
            }
        }
    }
}
```
