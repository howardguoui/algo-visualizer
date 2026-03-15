# 剪视频剪出一个贪心算法

> Source: https://labuladong.online/zh/algo/frequency-interview/cut-video/
> Archived: labuladong.online — 算法笔记

---

# 剪视频剪出一个贪心算法

读完本文，你不仅学会了算法套路，还可以顺便解决如下题目：

LeetCode| 力扣| 难度  
---|---|---  
[1024\. Video Stitching](<https://leetcode.com/problems/video-stitching/>)| [1024\. 视频拼接](<https://leetcode.cn/problems/video-stitching/>)|   
  
前面发过几个视频，也算是对视频剪辑入了个门。像我这种非专业剪辑玩家，不做什么宏大特效电影镜头，只是做个视频教程，其实也没啥难度，只需要把视频剪流畅，所以用到最多的功能就是切割功能，然后删除和拼接视频片接。

没有剪过视频的读者可能不知道，在常用的剪辑软件中视频被切割成若干片段之后，每个片段都可以还原成原始视频。

就比如一个 10 秒的视频，在中间切一刀剪成两个 5 秒的视频，这两个五秒的视频各自都可以还原成 10 秒的原视频。就好像蚯蚓，把自己切成 4 段就能搓麻，把自己切成 11 段就可以凑一个足球队。

![diagram](https://labuladong.online/images/algo/cut-video/1.jpg)

剪视频时，每个视频片段都可以抽象成了一个个区间，时间就是区间的端点，这些区间有的相交，有的不相交……

假设剪辑软件不支持将视频片段还原成原视频，那么如果给我若干视频片段，我怎么将它们还原成原视频呢？
