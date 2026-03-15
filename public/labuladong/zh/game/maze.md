# 【游戏】求解迷宫

> Source: https://labuladong.online/zh/algo/game/maze/
> Archived: labuladong.online — 算法笔记

---

# 【游戏】求解迷宫

这是经典的迷宫游戏，你可以使用键盘方向键或 UI 上的按钮控制角色移动，移动到右下角的终点即可通关。

迷宫游戏

思考题

猜猜不同风格的迷宫地图是如何生成的？如果让你来生成迷宫地图，应该使用什么算法？

游戏页面支持切换不同风格的迷宫地图，你可以切换不同的地图使用 DFS/BFS 算法求解，然后回放求解过程，就能直观地看出不同风格地图的特点了。

迷宫生成算法是非常有趣的话题，而且有一定的难度，我们会在下一个迷宫游戏中讲解。

用算法求解迷宫比较简单，从起点开始递归遍历上下左右四个方向，可以理解为遍历「四叉树」或者遍历一幅无向图，用 DFS 或 BFS 算法肯定可以解决。其中 BFS 算法找到的路径必然是最短路径，而 DFS 解法找到的路径不一定是最短路径。

首先贴一个 DFS 解法供大家参考：

```python
# 游戏面板仅支持提交 JavaScript 代码
# 其他语言代码的作用是帮助大家理解算法逻辑

def solve_maze(game_controller):
    # 获取起始位置和目标位置
    start_pos = game_controller.get_position()
    target_pos = game_controller.get_target_position()
    
    # 四个方向：上、右、下、左
    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    
    # 外部变量存储是否找到路径
    path_found = [False]
    
    def dfs(current_i, current_j):
        # Base case: 如果已经找到路径，直接返回
        if path_found[0]:
            return
        
        # 检查是否到达目标位置
        if current_i == target_pos['i'] and current_j == target_pos['j']:
            path_found[0] = True
            return
        
        # 标记当前位置为已访问
        game_controller.set_visited(current_i, current_j, True)
        
        # 尝试四个方向
        for direction in directions:
            next_i = current_i + direction[0]
            next_j = current_j + direction[1]
            
            # 如果下一个位置是墙或者已访问，跳过
            if game_controller.is_block(next_i, next_j) or game_controller.is_visited(next_i, next_j):
                continue

            # 移动到下一个位置
            game_controller.set_position(next_i, next_j)
            
            # 递归搜索
            dfs(next_i, next_j)
            
            # 递归搜索完成后，回退
            game_controller.set_position(current_i, current_j)
    
    # 从起始位置开始DFS
    dfs(start_pos['i'], start_pos['j'])
``` 

对于 BFS 解法，稍微有点小技巧，因为你要在 BFS 遍历的同时记录路径。

我们用一个 `parent` 数组记录每个位置的前驱节点，这样就可以从终点开始，反向回溯到起点，得到完整的路径。

参考解法如下：

```python
# 游戏面板仅支持提交 JavaScript 代码
# 其他语言代码的作用是帮助大家理解算法逻辑

from collections import deque

def solve_maze(game_controller):
    # 获取起始位置和目标位置
    start_pos = game_controller.get_position()
    target_pos = game_controller.get_target_position()
    
    # 四个方向：上、右、下、左
    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    
    # 使用队列存储待访问的位置和路径
    queue = deque()
    
    # 存储每个位置的前驱节点，用于重建路径
    parent = {}
    
    # 标记起始位置为已访问，并加入队列
    game_controller.set_visited(start_pos['i'], start_pos['j'], True)
    queue.append({'i': start_pos['i'], 'j': start_pos['j']})
    parent[f"{start_pos['i']},{start_pos['j']}"] = None
    
    # BFS 主循环
    while queue:
        current = queue.popleft()
        
        # 检查是否到达目标位置
        if current['i'] == target_pos['i'] and current['j'] == target_pos['j']:
            # 找到目标，重建并执行路径
            reconstruct_and_execute_path(game_controller, parent, start_pos, target_pos)
            return
        
        # 探索四个方向
        for direction in directions:
            next_i = current['i'] + direction[0]
            next_j = current['j'] + direction[1]
            
            # 如果下一个位置是墙或者已访问，跳过
            if game_controller.is_block(next_i, next_j) or game_controller.is_visited(next_i, next_j):
                continue
            
            # 标记为已访问并加入队列
            game_controller.set_visited(next_i, next_j, True)
            queue.append({'i': next_i, 'j': next_j})
            parent[f"{next_i},{next_j}"] = {'i': current['i'], 'j': current['j']}

# 重建路径并执行移动
def reconstruct_and_execute_path(game_controller, parent, start_pos, target_pos):
    # 从目标位置开始，通过父节点重建路径
    path = []
    current = {'i': target_pos['i'], 'j': target_pos['j']}
    
    while current is not None:
        path.append(current)
        key = f"{current['i']},{current['j']}"
        current = parent[key]
    
    # 反转路径
    path.reverse()
    
    # 执行路径移动（跳过起始位置）
    for i in range(1, len(path)):
        game_controller.set_position(path[i]['i'], path[i]['j'])
``` 

## 评论

请登录后查看/发表评论
