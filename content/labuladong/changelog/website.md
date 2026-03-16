# labuladong.online 更新日志

> Source: https://labuladong.online/zh/algo/changelog/website/
> Archived: labuladong.online — 算法笔记

---

# labuladong.online 更新日志

## ¶2025/10

  * 新增 [速成路线图 30 天打卡挑战](<https://labuladong.online/zh/checkin/>)。
  * 更新 [位图原理及实现](</zh/algo/data-structure-basic/bitmap/>) 和 [布隆过滤器原理及实现](</zh/algo/data-structure-basic/bloom-filter/>)。
  * 更新 [深入理解 OAuth 2.0 授权框架](</zh/algo/computer-science/oauth2-explained/>)，[OAuth 2.0 和 OIDC 认证](</zh/algo/computer-science/oidc/>) 和 [OAuth 2.0 与 PKCE](</zh/algo/computer-science/pkce/>)。
  * 更新 [深入理解数字证书和 CA](</zh/algo/computer-science/certificate-and-ca/>)。


## ¶2025/9

  * 网站更新 [设计模式章节](</zh/algo/design-pattern/factory-method/>)。
  * 更新 [霍夫曼编码简介](</zh/algo/data-structure-basic/huffman-tree/>) 和 [实现霍夫曼压缩器](</zh/algo/data-structure/huffman-tree-implementation/>)。
  * 更新 [非对称加密简介](</zh/algo/computer-science/encryption-intro/>) 和 [JWT 的原理与使用](</zh/algo/computer-science/how-jwt-works/>)。


## ¶2025/8

  * [速成目录](</zh/algo/intro/quick-learning-plan/>) 上线路线图。
  * 其他若干修复和优化。


## ¶2025/6

  * 更新大量算法游戏，参见 [算法游戏简介](</zh/algo/intro/game/>)。
  * 更新 [欧拉图和一笔画游戏](</zh/algo/data-structure-basic/eulerian-graph/>)，[Hierholzer 算法寻找欧拉路径](</zh/algo/data-structure/eulerian-graph-hierholzer/>) 以及 [欧拉路径经典习题](</zh/algo/problem-set/eulerian-path/>)。
  * 更新 [Floyd 算法详解](</zh/algo/data-structure/floyd/>)。


## ¶2025/5

  * 网站支持 GitHub/Google/微信 登录。
  * 更新若干图论算法，参见 [图论算法章节](</zh/algo/data-structure-basic/graph-basic/>)。


## ¶2025/4

  * 修复部分读者无法加载图标，导致不显示阅读历史的问题。
  * 添加 [动态规划算法习题集](</zh/algo/problem-set/dynamic-programming-i/>)。
  * 给 [动态规划核心框架](</zh/algo/essential-technique/dynamic-programming-framework/>) 添加视频讲解。
  * 添加 [华容道游戏](</zh/algo/game/huarong-road/>) 和 [连连看游戏](</zh/algo/game/connect-two/>)，实践 [BFS 算法](</zh/algo/essential-technique/bfs-framework/>)。


## ¶2025/3

重大更新

网站支持游戏引擎，可以编写算法玩游戏，给读者带来更有趣的学习体验。

第一个上线的游戏是 [实现贪吃蛇](</zh/algo/game/snake/>)，我还有很多有趣的设想，将逐步融入到网站中，大家敬请期待。

重大更新

线段树章节更新完毕，配套可视化讲解和习题，并提供统一的 `AllInOneSegmentTree` 代码实现，方便做题时直接调用。

由浅入深，循序渐进：

  * [线段树的核心原理及使用场景](</zh/algo/data-structure-basic/segment-tree-basic/>)
  * [基本线段树的实现](</zh/algo/data-structure/segment-tree-implement/>)
  * [优化：实现动态线段树](</zh/algo/data-structure/segment-tree-dynamic/>)
  * [优化：实现懒更新线段树](</zh/algo/data-structure/segment-tree-lazy-update/>)
  * [线段树经典习题](</zh/algo/problem-set/segment-tree/>)


重大更新

[vscode 插件](</zh/algo/intro/vscode/>) 和 [JetBrains 插件](</zh/algo/intro/jetbrains/>) 支持本地调试代码，详情见对应插件的使用文档。

## ¶2025/2

  * 根据读者使用插件的反馈，优化了配套插件的使用，并配套视频讲解。
  * 更新 [递归算法框架](</zh/algo/essential-technique/understand-recursion/>) 及视频讲解。
  * PC 网站右上角增加「专注模式」开关。开启专注模式后，将模糊侧边栏及顶栏，方便集中注意力，或者方便在公司学习。
  * 更新 [线段树原理及代码模板实现](</zh/algo/data-structure/segment-tree-implement/>)。
  * 优化 [速成目录](</zh/algo/intro/quick-learning-plan/>)，并配套视频讲解。
  * 给十大排序算法添加 [视频导读](</zh/algo/intro/sorting/>)。
  * 更新 [贪心算法核心框架](</zh/algo/essential-technique/greedy/>)，添加可视化面板辅助理解。
  * 更新 [分治算法核心框架](</zh/algo/essential-technique/divide-and-conquer/>)，添加可视化面板辅助理解。
  * 修复若干 bug。


重大更新

开始更新视频讲解，参见 [本站首页](</zh/algo/home/>)。

## ¶2024/12

  * 基于网站的新内容架构，重写 [BFS 算法核心框架](</zh/algo/essential-technique/bfs-framework/>)

  * 更新 [可视化面板速查表](<https://labuladong.online/zh/visualization/>)，方便读者查看关键算法的可视化。

  * 新增 [习题的练习/复习方法](</zh/algo/intro/how-to-practice/>)。

  * 添加图结构的可视化支持，详见 [可视化面板使用文档](</zh/algo/intro/visualize/>)。

  * 网站中的可视化面板添加更详细的引导，方便读者更好地通过可视化理解算法过程。示例如下：


下面的算法会寻找节点 `0` 到节点 `4` 的所有路径，你可以多次点击 `if (s === n - 1)` 这行代码，查看图的遍历以及递归树的生长过程：

复杂结构及递归

  * 优化 [拓展：最近公共祖先系列解题框架](</zh/algo/practice-in-action/lowest-common-ancestor-summary/>) 的内容，添加可视化面板辅助理解。
  * 优化 [数组双指针技巧汇总](</zh/algo/essential-technique/array-two-pointers-summary/>) 的可视化面板，添加颜色辅助理解。
  * 优化 [链表双指针技巧汇总](</zh/algo/essential-technique/linked-list-skills-summary/>) 的可视化面板，添加颜色辅助理解。
  * 优化所有动态规划递推解法的可视化，添加颜色辅助理解状态转移的过程，示例：


算法可视化

重大更新

应读者的要求，网站的阅读历史支持了跨设备同步。在任意设备上登录网站后，目录页和文中的链接都会显示  和  标明阅读进度。

重大更新

为满足广大读者的不同需求，本站新增 [速成版目录](</zh/algo/intro/quick-learning-plan/>)。插件也将对速成读者的需求进行优化，大家敬请期待。

## ¶2024/11

  * 解决评论区加载很慢的 bug。
  * 修复 [红黑树](</zh/algo/data-structure-basic/rbtree-basic/>) 部分情况下节点情况错误的 bug。
  * 修复 [双链表](</zh/algo/intro/visualize/>) 显示错误的 bug。
  * 大幅提升海外读者的访问速度，解决了有些情况下页面加载卡死的问题。
  * 精简 [回溯算法核心框架](</zh/algo/essential-technique/backtrack-framework/>)，将 N 皇后问题和数独问题整理到 [回溯算法实践：数独和 N 皇后问题](</zh/algo/practice-in-action/sudoku-nqueue/>)。
  * 优化可视化面板中内置数据结构的 API，详见 [可视化面板使用文档](</zh/algo/intro/visualize/>)。
  * 增加右上角搜索框能够显示的结果条数。
  * [可视化面板使用文档](</zh/algo/intro/visualize/>) 中添加每个数据结构的 API 文档。
  * 添加 [红黑树的完美平衡及可视化](</zh/algo/data-structure-basic/rbtree-basic/>)。


## ¶2024/10

重大升级

可视化面板支持颜色系统，同时支持通过注释关键词和页面调色板修改任意对象的颜色。

详见 [可视化面板的颜色系统](<../%E7%AE%80%E4%BB%8B/%E5%8F%AF%E8%A7%86%E5%8C%96%E7%AE%80%E4%BB%8B.md#color-system>)。

  * 修复可视化面板显示 `404 资源不存在` 的 bug。
  * 修复部分文章显示 `Fail to fetch data` 的 bug。


若你依然遇到上述问题，请尝试刷新页面，或清除浏览器缓存，即可修复。

  * 修复可视化面板不能显示排序算法的 bug。
  * 添加 [并查集 Union Find 核心原理](</zh/algo/data-structure-basic/union-find-basic/>) 和 [线段树核心原理](</zh/algo/data-structure-basic/segment-tree-basic/>)。
  * [Trie 树基础](</zh/algo/data-structure-basic/trie-map-basic/>) 添加可视化面板辅助理解。
  * 优化 [二叉堆](</zh/algo/data-structure-basic/binary-heap-implement/>) 的内容，改为使用索引 0 开始存储元素，并支持使用 `showArray` 方法同时展示底层数组和二叉树结构。
  * 更新 [堆排序算法](</zh/algo/data-structure-basic/heap-sort/>)。


重大提升

快速入门章节新增 [系列排序算法](</zh/algo/data-structure-basic/sort-basic/>) 的讲解，并配套可排序算法视化。

插入排序

  * 为 [回溯算法习题 I](</zh/algo/problem-set/backtrack-i/>)，[回溯算法习题 II](</zh/algo/problem-set/backtrack-ii/>)，[回溯算法习题 III](</zh/algo/problem-set/backtrack-iii/>) 的所有题目添加可视化面板。
  * 修复打卡日历样式错误的问题。


## ¶2024/9

  * 修复习题章节中的代码块缺少复制按钮的 bug。

  * 为 [BFS 习题章节 I](</zh/algo/problem-set/bfs/>)，[BFS 习题章节 II](</zh/algo/problem-set/bfs-ii/>) 中的所有解法代码添加可视化面板。

  * 修复某些章节的上一页、下一页会跳到主页的 bug。

  * 修复小鹅通会员权限迁移的 bug。

  * 修复某些情况下微信支付失败的 bug。

  * 优化了网站总是弹出语言切换选项的问题。

  * 修复部分多语言代码 tab 中缺少 JavaScript 代码的问题。

  * 将基础知识章节中的 C++ 代码进行验证，修复了一些错误。

  * 修复题目面板缺少力扣跳转链接的问题。

  * 修复了少部分题目缺少多语言解法代码的问题。

  * 全新的通知组件，优化若干已知问题。

  * 感谢大家的反馈，修复了个别文章中代码格式错乱、内容缺失的问题。

  * 对每篇文章添加「前置知识」，并在标题下方显示本文能够解决的题目数量。


感谢大家的反馈，修复了若干 bug：

  * 优化有时 GitHub 登录失败的问题。

  * 优化海外读者的网络访问速度。

  * 修复有些读者无法修改评论的问题。

  * 增加 [数学技巧相关习题](</zh/algo/problem-set/math-tricks/>) 和 [并查集相关习题](</zh/algo/problem-set/union-find/>)。


重大提升

  * 增加几十道习题。


重大提升

网站右上角的搜索栏支持按照题号、中英文题目名称、题目链接等信息直接搜索相关的文章。

## ¶2024/8

  * 文中每篇文章都添加了阅读进度标记，方便判断该文章是否已经学过。
  * 文章开头添加了前置知识点，方便读者更流畅地学习理解文章内容。


重大提升

  * 校准本站所有文章中的多语言代码片段，保证代码的准确性。
  * 网站搜索框支持直接搜索力扣题目名称、题号。


  * 修复习题部分可视化面板无法加载的 bug。


重大 bug 修复

修复可视化面板构建二叉树/多叉树时，节点不显示的问题。

重大提升

将网站主要语言全部统一为 Java。

重大提升

大幅提升习题中多语言解法的准确性。

## ¶2024/5

  * 优化阅读体验，更新代码样式。
  * 更新二叉堆、二叉树的基础知识，具体请看主站目录的「数据结构及排序精讲」章节。
  * 优化 [订单页面](<https://labuladong.online/algo/user/orders/>)，显示赠送老用户的网站会员订单及有效期。


bug 修复

修复了网站评论区点赞/点踩功能导致数量清零的 bug。

修复可视化面板功能按钮缺失的 bug。

  * 统一网站图标风格，若干其他细节优化。
  * 修复移动端登录成功后重定向到 404 页面的 bug。
  * 增加若干基础知识，优化若干内容。
  * 添加基础知识章节。


## ¶2024/2

  * 修复网站会员文章中部分链接依然指向旧版课程的 bug。

  * 修复了登录后也无法加载评论的 bug。

  * 修复了 GitHub 登录后无法进行评论的 bug。

  * 支持海外读者使用 GitHub 账户登录网站。

  * 支持文章的阅读历史。在侧边栏中，学完的文章会显示  标记，未学完文章会显示  标记，方便你了解自己的学习进度。

  * 支持读者修改和删除自己的评论。

  * 修复部分链接 404 的问题。

  * 支持微信内直接调起支付。


支持微信内一键登录

PC 端网站登录需要使用微信扫码，但如果想用手机端登录网站就麻烦了，还得把登录二维码截图到微信里才能扫码登录。

现在支持了手机端一键登录，只需要**在手机微信里点开网站** ，点击「登录」按钮，授权网站读取用户昵称，就可以直接登录网站了。

bug 修复

修复优化网站文章的 URL 生成算法导致站内搜索 404 的 bug。

支持海外 PayPal 支付

很多海外读者反馈，无法使用中国的微信支付宝支付。现在支持 PayPal 支付，方便海外读者购买课程。

注意中国用户不要用 PayPal 支付，因为 PayPal 不允许两个中国账户之间进行交易，会报错「为遵守国际法规，这笔交易已被拒绝」。

Breaking Change

优化网站文章的 URL 生成算法，避免目录结构变化导致的 URL 变化。

以前收藏的文章链接可能失效；如果某些页面跳转出现 404，可能是因为浏览器存在旧的缓存，请清除浏览器缓存再试。

  * 全面去除新网站、插件中指向小鹅通的过时链接。
  * 课程视频支持键盘控制：左右方向键快进快退，上下方向键调整音量，空格建暂停播放。
  * 其他若干小 bug 修复，若干体验优化。


Breaking Change

新网站 [labuladong.online](<https://labuladong.online/algo/>) 正式上线，全面优化使用体验。小鹅通课程全部迁往新网站，以前的付费读者可以迁移课程权限到新网站，迁移指南 [见这里](<https://labuladong.online/algo/user/orders/>)。基于新网站解锁插件中课程专属题解的方法，已经在课程的第一章进行了更新。

重大更新

新网站中的算法可视化面板添加「编辑」按钮，读者可以修改算法可视化面板的代码并执行，例子：

算法可视化

## ¶2024/1

重大 bug 修复

修复每次登录的用户 ID 都会变化的 bug。

重大 bug 修复

修复网站微信/支付宝支付成功后课程权限有延迟的 bug。

  * 修复课程/会员解锁状态显示错误的问题。
  * 修复编辑器若干 bug，如登录失败、代码无法执行等。


## ¶2023/12

  * 可视化在线编辑器上线：<https://labuladong.online/algo-visualize>[](<https://labuladong.online/algo-visualize>)
  * 优化网站中 力扣/LeetCode 题目的显示和跳转。
  * 修复课程中可视化面板无法全屏显示的 bug。
  * 添加部分可视化面板帮助理解。


## ¶2023/8

  * 全面优化可视化面板，修复若干 bug，大幅降低多余步骤。

  * 全面更新 [可视化面板使用指南](</zh/algo/intro/visualize/>)，添加情景教学实操部分。

  * 可视化面板中间添加可拖拽的分界线。

  * 可视化面板可高亮显示递归树上的递归路径。 ![](/images/algo/changelog/highlight-recur-tree.jpg)

  * 修复在网页上学习课程时，无法显示多语言代码和代码行内注释的 bug。

  * 根据会员用户的反馈，优化网站会员的提示信息，新增「遇到问题」按钮。

  * 添加了系列刷题插件的视频介绍。

  * 给算法可视化面板添加更显眼的样式。

  * 算法可视化面板功能升级，代码可直接点击，跳转对应的执行步骤：


![](/images/algo/animation/explain.jpg)

## ¶2023/7

  * 修复了会员解锁内容中多语言 tab 无法切换的问题。

  * 添加网站首页，点击左上角的 logo 即可返回查看。

  * 修复评论区主题和网站主题不一致的 bug。

  * 在第一章添加算法可视化功能的 [使用手册](</zh/algo/intro/visualize/>)。

  * 在可视化面板右上角添加两个按钮，支持复制算法可视化面板的 URL；支持刷新算法可视化面板（适用于动画加载失败时重新刷新面板）： ![](/images/algo/animation/explain.jpg)

  * 优化每篇文章最后的「相关文章」显示样式。 ![](/images/algo/changelog/related_article.jpg)

  * 添加网站以及各个插件的更新日志，方便大家了解更新情况。

  * 可视化功能升级，支持以树的视角可视化所有递归算法： ![](/images/algo/visualize_intro/permute.jpg)


## ¶2023/6

  * 修复算法可视化的 bug，添加 50 道题目的算法可视化。
  * 支持 [Chrome 插件](</zh/algo/intro/chrome/>) 和网站联动，在网页右上方显示插件连接状态。
  * 添加阅读历史功能，阅读完的文章会显示  标记，未读完的文章会显示  标记。
  * 新主题上线，全面优化使用体验。


更新时间：2026/03/14 00:17

Loading comments...
