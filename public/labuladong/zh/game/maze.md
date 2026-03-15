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

CC++GoJavaJavaScriptPython
    
    
    // 游戏面板仅支持提交 JavaScript 代码
    // 其他语言代码的作用是帮助大家理解算法逻辑
    
    // 假设 Position 类
    class Position {
        public int i, j;
        
        public Position(int i, int j) {
            this.i = i;
            this.j = j;
        }
    }
    
    // 假设 GameController 是一个接口
    interface GameController {
        Position getPosition();
        Position getTargetPosition();
        void setPosition(int i, int j);
        void setVisited(int i, int j, boolean visited);
        boolean isBlock(int i, int j);
        boolean isVisited(int i, int j);
    }
    
    public static void solveMaze(GameController gameController) {
        // 获取起始位置和目标位置
        Position startPos = gameController.getPosition();
        Position targetPos = gameController.getTargetPosition();
        
        // 四个方向：上、右、下、左
        int[][] directions = {
            {-1, 0},
            {0, 1},
            {1, 0},
            {0, -1}
        };
        
        // 外部变量存储是否找到路径
        boolean[] pathFound = {false};
        
        class MazeSolver {
            void dfs(int currentI, int currentJ) {
                // Base case: 如果已经找到路径，直接返回
                if (pathFound[0]) {
                    return;
                }
                
                // 检查是否到达目标位置
                if (currentI == targetPos.i && currentJ == targetPos.j) {
                    pathFound[0] = true;
                    return;
                }
                
                // 标记当前位置为已访问
                gameController.setVisited(currentI, currentJ, true);
                
                // 尝试四个方向
                for (int[] dir : directions) {
                    int nextI = currentI + dir[0];
                    int nextJ = currentJ + dir[1];
                    
                    // 如果下一个位置是墙或者已访问，跳过
                    if (gameController.isBlock(nextI, nextJ) || gameController.isVisited(nextI, nextJ)) {
                        continue;
                    }
    
                    // 移动到下一个位置
                    gameController.setPosition(nextI, nextJ);
                    
                    // 递归搜索
                    dfs(nextI, nextJ);
                    
                    // 递归搜索完成后，回退
                    gameController.setPosition(currentI, currentJ);
                }
            }
        }
        
        // 从起始位置开始DFS
        new MazeSolver().dfs(startPos.i, startPos.j);
    }

对于 BFS 解法，稍微有点小技巧，因为你要在 BFS 遍历的同时记录路径。

我们用一个 `parent` 数组记录每个位置的前驱节点，这样就可以从终点开始，反向回溯到起点，得到完整的路径。

参考解法如下：

CC++GoJavaJavaScriptPython
    
    
    // 游戏面板仅支持提交 JavaScript 代码
    // 其他语言代码的作用是帮助大家理解算法逻辑
    
    import java.util.*;
    
    // 假设 Position 类
    class Position {
        public int i, j;
        
        public Position(int i, int j) {
            this.i = i;
            this.j = j;
        }
    }
    
    // 假设 GameController 是一个接口
    interface GameController {
        Position getPosition();
        Position getTargetPosition();
        void setPosition(int i, int j);
        void setVisited(int i, int j, boolean visited);
        boolean isBlock(int i, int j);
        boolean isVisited(int i, int j);
    }
    
    // 重建路径并执行移动
    public static void reconstructAndExecutePath(GameController gameController, 
                                               Map<String, Position> parent, 
                                               Position startPos, Position targetPos) {
        // 从目标位置开始，通过父节点重建路径
        List<Position> path = new ArrayList<>();
        Position current = new Position(targetPos.i, targetPos.j);
        
        while (current != null) {
            path.add(current);
            String key = current.i + "," + current.j;
            Position p = parent.get(key);
            if (p != null && (p.i != -1 || p.j != -1)) {
                current = p;
            } else {
                current = null;
            }
        }
        
        // 反转路径
        Collections.reverse(path);
        
        // 执行路径移动（跳过起始位置）
        for (int i = 1; i < path.size(); i++) {
            gameController.setPosition(path.get(i).i, path.get(i).j);
        }
    }
    
    public static void solveMaze(GameController gameController) {
        // 获取起始位置和目标位置
        Position startPos = gameController.getPosition();
        Position targetPos = gameController.getTargetPosition();
        
        // 四个方向：上、右、下、左
        int[][] directions = {
            {-1, 0},
            {0, 1},
            {1, 0},
            {0, -1}
        };
        
        // 使用队列存储待访问的位置和路径
        Queue<Position> queue = new LinkedList<>();
        
        // 存储每个位置的前驱节点，用于重建路径
        Map<String, Position> parent = new HashMap<>();
        
        // 标记起始位置为已访问，并加入队列
        gameController.setVisited(startPos.i, startPos.j, true);
        queue.offer(new Position(startPos.i, startPos.j));
        parent.put(startPos.i + "," + startPos.j, new Position(-1, -1));
        
        // BFS 主循环
        while (!queue.isEmpty()) {
            Position current = queue.poll();
            
            // 检查是否到达目标位置
            if (current.i == targetPos.i && current.j == targetPos.j) {
                // 找到目标，重建并执行路径
                reconstructAndExecutePath(gameController, parent, startPos, targetPos);
                return;
            }
            
            // 探索四个方向
            for (int[] dir : directions) {
                int nextI = current.i + dir[0];
                int nextJ = current.j + dir[1];
                
                // 如果下一个位置是墙或者已访问，跳过
                if (gameController.isBlock(nextI, nextJ) || gameController.isVisited(nextI, nextJ)) {
                    continue;
                }
                
                // 标记为已访问并加入队列
                gameController.setVisited(nextI, nextJ, true);
                queue.offer(new Position(nextI, nextJ));
                parent.put(nextI + "," + nextJ, new Position(current.i, current.j));
            }
        }
    }

更新时间：2026/03/14 00:17

Loading comments...
