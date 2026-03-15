# 【游戏】实现数独作弊器

> Source: https://labuladong.online/zh/algo/game/sudoku/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】实现数独作弊器

按照要求实现 `solveSudoku` 方法，完成一个可运行的数独作弊器，通过暴力穷举一键解决任何数独问题。

完成代码后请点击「提交」按钮，让算法完成数独题目。完成后，可以点击「回放」按钮，查看算法暴力穷举的过程。

数独游戏演示

这道题比较简单，可以直接套用 [回溯算法实践：数独和 N 皇后问题](</zh/algo/practice-in-action/sudoku-nqueue/>) 的解法。参考代码如下：

```python
# 游戏面板仅支持提交 JavaScript 代码
# 其他语言代码的作用是帮助大家理解算法逻辑

def solve_sudoku(board_handler):
    # 标记是否已经找到可行解
    found = [False]

    def backtrack(index):
        if found[0]:
            # 已经找到一个可行解，立即结束
            return

        m, n = 9, 9
        i, j = index // n, index % n
        if index == m * n:
            # 找到一个可行解，触发 base case
            found[0] = True
            return

        if board_handler.get(i, j) is not None and not board_handler.is_editable(i, j):
            # 如果有预设数字，不用我们穷举
            backtrack(index + 1)
            return

        for c in range(1, 10):
            # 剪枝：如果遇到不合法的数字，就跳过
            if not is_valid(i, j, c):
                continue

            # 做选择
            board_handler.set(i, j, c)

            backtrack(index + 1)
            if found[0]:
                # 如果找到一个可行解，立即结束
                # 不要撤销选择，否则值会被重置
                return

            # 撤销选择
            board_handler.set(i, j, None)

    def is_valid(r, c, num):
        # 判断行是否存在重复
        for i in range(9):
            if board_handler.get(r, i) == num:
                return False
        
        # 判断列是否存在重复
        for i in range(9):
            if board_handler.get(i, c) == num:
                return False
        
        # 判断 3 x 3 方框是否存在重复
        box_row = (r // 3) * 3
        box_col = (c // 3) * 3
        for i in range(3):
            for j in range(3):
                if board_handler.get(box_row + i, box_col + j) == num:
                    return False
        
        return True

    backtrack(0)
``` 

## 评论

请登录后查看/发表评论
