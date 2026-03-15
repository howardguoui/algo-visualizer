# 【游戏】实现数独作弊器

> Source: https://labuladong.online/zh/algo/game/sudoku/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】实现数独作弊器

按照要求实现 `solveSudoku` 方法，完成一个可运行的数独作弊器，通过暴力穷举一键解决任何数独问题。

完成代码后请点击「提交」按钮，让算法完成数独题目。完成后，可以点击「回放」按钮，查看算法暴力穷举的过程。

数独游戏演示

这道题比较简单，可以直接套用 [回溯算法实践：数独和 N 皇后问题](</zh/algo/practice-in-action/sudoku-nqueue/>) 的解法。参考代码如下：

```java
// 游戏面板仅支持提交 JavaScript 代码
// 其他语言代码的作用是帮助大家理解算法逻辑

// 假设 BoardHandler 是一个接口
interface BoardHandler {
    Integer get(int i, int j);
    void set(int i, int j, Integer value);
    boolean isEditable(int i, int j);
}

public static void solveSudoku(BoardHandler boardHandler) {
    // 标记是否已经找到可行解
    boolean[] found = {false};

    class Solver {
        void backtrack(int index) {
            if (found[0]) {
                // 已经找到一个可行解，立即结束
                return;
            }

            int m = 9, n = 9;
            int i = index / n, j = index % n;
            if (index == m * n) {
                // 找到一个可行解，触发 base case
                found[0] = true;
                return;
            }

            if (boardHandler.get(i, j) != null && !boardHandler.isEditable(i, j)) {
                // 如果有预设数字，不用我们穷举
                backtrack(index + 1);
                return;
            }

            for (int c = 1; c <= 9; c++) {
                // 剪枝：如果遇到不合法的数字，就跳过
                if (!isValid(i, j, c)) {
                    continue;
                }

                // 做选择
                boardHandler.set(i, j, c);

                backtrack(index + 1);
                if (found[0]) {
                    // 如果找到一个可行解，立即结束
                    // 不要撤销选择，否则值会被重置
                    return;
                }

                // 撤销选择
                boardHandler.set(i, j, null);
            }
        }

        boolean isValid(int r, int c, int num) {
            // 判断行是否存在重复
            for (int i = 0; i < 9; i++) {
                if (Objects.equals(boardHandler.get(r, i), num)) return false;
            }
            
            // 判断列是否存在重复
            for (int i = 0; i < 9; i++) {
                if (Objects.equals(boardHandler.get(i, c), num)) return false;
            }
            
            // 判断 3 x 3 方框是否存在重复
            int boxRow = (r / 3) * 3;
            int boxCol = (c / 3) * 3;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (Objects.equals(boardHandler.get(boxRow + i, boxCol + j), num)) {
                        return false;
                    }
                }
            }
            
            return true;
        }
    }

    new Solver().backtrack(0);
}
```
