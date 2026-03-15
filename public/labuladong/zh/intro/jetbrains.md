# 配套 JetBrains 刷题插件

> Source: https://labuladong.online/zh/algo/intro/jetbrains/
> Archived: labuladong.online — 算法笔记

---

# 配套 JetBrains 刷题插件

插件和本站的关系

**插件中的题解和思路都是本站的文章和习题讲解，是辅助大家学习本站的配套工具，并不是必须安装的，请根据自身需求选择** 。

有些读者不喜欢在网页上刷题，认为在编辑器或 IDE 中刷题更方便编写和调试代码，所以我开发维护了各个平台的刷题插件满足这个需求，允许读者在插件中查看本站的题目讲解、可视化以及题单。

JetBrains 刷题插件可以在 JetBrains 的所有 IDE（比如 Intellij，Pycharm 等等）中刷 LeetCode/力扣，支持逐行 Debug 代码，可以直接查看本站的思路讲解、可视化面板，同时集成了 [速成目录](</zh/algo/intro/quick-learning-plan/>) 和 [初学者目录](</zh/algo/intro/beginner-learning-plan/>) 中的题目题单，方便复习：

![diagram](https://labuladong.online/images/algo/intro/jb_intro1.jpg)

本插件基于开源插件 [LeetCode Editor](<https://github.com/shuzijun/leetcode-editor/>) 开发，致敬开源作者 [@shuzijun](<https://github.com/shuzijun>)！

视频演示

经常有读者跟我反馈插件的使用问题，最后发现都是操作步骤不对，白白浪费了时间进行沟通。

所以我干脆录个视频，快速展示插件的主要功能，并亲自演示如何登录力扣开始刷题、如何配置本地调试环境、如何登录本站拉取本站会员思路解析以及题单。

更详细的配置方法、常见问题的解法等，还请参考下方的文档。

![Video Cover](https://labuladong.online/images/algo/vod/jetbrain.jpg)

## 安装方式

我的插件全名为「**LeetCode with labuladong** 」，在 JetBrains 系列 IDE 的插件商店中搜索关键词「labuladong」即可下载：

![diagram](https://labuladong.online/images/algo/intro/jb1.png)

如果无法搜索到插件，可能是网络的问题。可以在 JetBrains 插件网页端按照指示下载安装：

<https://plugins.jetbrains.com/plugin/19317-leetcode-with-labuladong>[](<https://plugins.jetbrains.com/plugin/19317-leetcode-with-labuladong>)

下面介绍一下本插件的基本的使用和本站配套的辅助刷题功能。

## 功能展示

登录成功后，就可以刷题了，代码编辑器右上角有悬浮图标，可以将代码提交到 力扣/LeetCode 进行测试/判题，和网页上的刷题体验类似；有本站题解或思路的题目会标记 ✨，点开带 ✨ 标记的题目详情页会显示「题解」和「思路」按钮，点击后会显示本站的解题思路：

![diagram](https://labuladong.online/images/algo/intro/jb-show.jpeg)

本站的所有功能，插件都支持，包括图片注释、算法可视化等：

![diagram](https://labuladong.online/images/algo/visualize_intro/jetbrain_example.jpg)

## 国际用户切换英文

插件的题解/思路/可视化面板的内容默认为中文。国际用户如果需要切换为英文，可以在插件的设置页面中将 Language 选项改为 English 即可。

## 登录 力扣/LeetCode

安装插件之后，侧边栏将出现插件图标，点击插件设置按钮，按下图进行设置：

![diagram](https://labuladong.online/images/algo/intro/set_jb_plugin.jpg)

1️⃣ 点击设置按钮，进入设置页面。

2️⃣ 选择登录的站点，可以是英文版 LeetCode 或中文版力扣。

3️⃣ 设置你希望使用的编程语言。

4️⃣ 设置题目代码文件的存储路径。

5️⃣ 设置完成后点击 OK 按钮。

6️⃣ 点击登录按钮。

点击登录按钮之后，会弹出一个对话框让你输入 cookie。如果你设置的登录站点为英文版 LeetCode，则输入 leetcode.com 的网站 cookie，如果设置的是登录中文版力扣，则输入 leetcode.cn 的网站 cookie：

![diagram](https://labuladong.online/images/algo/intro/jb_cookie.jpg)

中文力扣 leetcode.cn 的 cookie 的获取方法如下，浏览器打开中文力扣官网 [https://leetcode.cn，确保已经登录你的力扣账号，打开开发者工具（Chrome](<https://leetcode.cn%EF%BC%8C%E7%A1%AE%E4%BF%9D%E5%B7%B2%E7%BB%8F%E7%99%BB%E5%BD%95%E4%BD%A0%E7%9A%84%E5%8A%9B%E6%89%A3%E8%B4%A6%E5%8F%B7%EF%BC%8C%E6%89%93%E5%BC%80%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7%EF%BC%88Chrome>) 浏览器可以按 F12 打开），复制 cookie 的值：

![diagram](https://labuladong.online/images/algo/intro/copy-lc-cookie.jpg)

1️⃣ ~ 2️⃣ 打开中文力扣的官网 <https://leetcode.cn>[](<https://leetcode.cn>) 并**确保已经在网页端登录你的账号** 。

3️⃣ 打开开发者工具（Chrome 按 F12），点击 Network 选项卡。

4️⃣ ~ 6️⃣ 刷新页面，点击第一个请求，查看该请求的 Headers，其中有一个 Cookie 字段。

7️⃣ 全选整个 cookie 字符串，右键复制。

获取英文 LeetCode 的 cookie 方法是类似的，只需打开英文版 LeetCode 的官网 [https://leetcode.com，重复上面的操作即可，这里不再赘述。](<https://leetcode.com%EF%BC%8C%E9%87%8D%E5%A4%8D%E4%B8%8A%E9%9D%A2%E7%9A%84%E6%93%8D%E4%BD%9C%E5%8D%B3%E5%8F%AF%EF%BC%8C%E8%BF%99%E9%87%8C%E4%B8%8D%E5%86%8D%E8%B5%98%E8%BF%B0%E3%80%82>)

把 cookie 粘贴到插件并点击登录，应该就可以成功在插件中登录你的 力扣/LeetCode 账号，开始刷题了。

## 解锁本站思路/题单（可选）

提示

所有用户都可以免费使用插件的刷题功能和部分本站的题目的解题思路；购买 [本站会员](</zh/algo/intro/site-vip/>) 后，才能在插件中解锁本站的所有题解思路、算法可视化面板和题单。

若你已购买本站会员，请按照下面的步骤在插件中解锁本站的题解和思路。

### 步骤一、安装并启动插件

按照上面的介绍安装插件并登录你的 力扣/LeetCode 账号，确保插件的基本使用没有问题。

### 步骤二、获取本站 cookie

点击下面的复制按钮即可获取登录插件所需的 cookie：

...

### 步骤三、手动刷新数据

复制 cookie 后，按照下图所示的步骤操作：

![diagram](https://labuladong.online/images/algo/intro/jb-site-cookie.jpg)

1️⃣ 点击设置图标，进入设置页面。

2️⃣ 粘贴 cookie 到输入框中。

3️⃣ 点击 OK 按钮。

4️⃣ 点击 labuladong 网站图标，手动触发数据拉取。

插件会先拉取一些公开数据，最后会拉取本站会员专属题解数据。如果数据拉取很慢，请尝试关闭所有网络代理或更换网络。

最后应该有类似下面的输出：

![diagram](https://labuladong.online/images/algo/intro/jb-refresh-vip-success.jpg)

如果没有这个输出，说明网络有问题，可以尝试关闭系统代理或者更换网络。

### 步骤四、清除 IDE 文件缓存

如果显示数据拉取成功，应该就可以查看插件内所有的思路题解了。不过由于缓存的原因，你之前已经打开的题目可能还是显示未解锁，这是因为 IDE 的文件系统缓存没有刷新。

**请你先关闭所有打开的题目文件** ，然后在这里手动清除 IDE 的缓存并重启 IDE，应该就正常了：

![diagram](https://labuladong.online/images/algo/intro/jb-clean-file-cache.jpg)

## 本地调试算法代码（可选）

提示

这部分为可选内容，主要针对希望在本地打断点运行、调试代码的读者：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-java-debug.jpg)

如果不配置，就和力扣网页刷题的体验一样，代码会提交到力扣 API 进行测试/判题（IDE 可能会出现类型报错等问题，但不影响提交 API，可以忽略）：

![diagram](https://labuladong.online/images/algo/intro/jb-show.jpeg)

**本地调试功能依赖本地的开发环境，和插件无关** 。如果按本文档配置后依然报错，请根据报错自行排查。

每道题目的算法代码其实就是一个普通的代码文件，理论上可以在本地调试运行，但有几个问题：

1、力扣有一些内置的类型，比如 `ListNode, TreeNode`，而且题目的测试用例输入是数组形式，你需要自己实现这些结构，并对题目的输入数据进行转换。

2、需要针对不同编程语言的特性进行额外配置，才能让代码编辑器正确识别项目结构。否则可能出现无法在本地运行代码、无法使用自动补全等问题。

针对这些问题，我研发了一套解决方案，**你按照下面的步骤配置插件，就可以直接在本地运行力扣的题目代码了。目前支持 Java/C++/Python/Golang/JavaScript 几种编程语言** 。

### 步骤一、在 IDE 打开对应的文件夹

我把配置好的项目模板托管到了 Github 仓库，可以 clone 到本地：

```
git clone https://github.com/labuladong/lc-plugin-template.git

# 中国大陆的读者可以在 Gitee 下载：
git clone https://gitee.com/labuladong/lc-plugin-template.git
``` 

大家在使用的过程中如果遇到问题或者可以改进的点，欢迎提 PR 或者 Issue。

这个模板中有几种编程语言的文件夹：

  * Java 文件夹：`java-template`
  * C++ 文件夹：`cpp-template`
  * Python 文件夹：`python-template`
  * Golang 文件夹：`go-template`
  * JavaScript 文件夹：`js-template`

根据你使用的编程语言，**在 IDE 中打开对应的文件夹** 。

### 步骤二、对不同语言进行配置

点击齿轮图标打开插件的配置页面，有几个配置项需要根据你刷题使用的编程语言进行配置：

![diagram](https://labuladong.online/images/algo/plugin-debug/config-jb-local-debug.jpg)

  * `CodeType`：你是用的编程语言。
  * `FilePath`：代码文件的存储路径。
  * `Code Filename`：代码文件的名称。
  * `CodeTemplate`：代码模板，可以自动添加包名、`main` 函数等。

下面针对每种语言分别介绍，用 `/<your>/<path>/<to>/lc-plugin-template/` 代表 `lc-plugin-template` 文件夹克隆到本地的路径。

提示

Windows 电脑的路径分隔符是 `\` 而不是 `/`，`lc-plugin-template` 文件夹的路径类似这样：

```
C:\<your>\<path>\<to>\lc-plugin-template\
``` 

请根据实际情况进行修改。

Java

Jetbrains IDE：Intellij IDEA

CodeType：`Java`

FilePath：

```
/<your>/<path>/<to>/lc-plugin-template/java-template/src/main/java
``` 

CodeFilename：

```
$!velocityTool.camelCaseName(${question.titleSlug})
``` 

CodeTemplate：

```
package leetcode.editor.${question.endpointType};

import java.util.*;
import leetcode.editor.common.*;

public class $!velocityTool.camelCaseName(${question.titleSlug}) {

${question.codeWithIndent(4)}
    
    public static void main(String[] args) {
        Solution solution = new $!velocityTool.camelCaseName(${question.titleSlug})().new Solution();
        // put your test code here
        
    }
}
``` 

配置完成后，可以点开题目编写解法，然后在 `main` 函数中添加测试代码并打好断点，就可以调试 Java 算法了：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-java-debug.jpg)

C++

IDE：CLion

CodeType：`C++`

FilePath：

```
/<your>/<path>/<to>/lc-plugin-template/cpp-template
``` 

CodeFilename：

```
$!velocityTool.camelCaseName(${question.titleSlug})
``` 

CodeTemplate：

```
\#include <iostream>
\#include <vector>
\#include <string>
\#include "../common/ListNode.cpp"
\#include "../common/TreeNode.cpp"

using namespace std;

${question.code}

int main() {
    Solution solution;
    // your test code here
}
``` 

配置完成后，可以点开题目编写解法，然后在 main 函数中添加测试代码并打好断点，就可以调试算法了：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-cpp-debug.jpg)

经过我的测试，当打开新的题目创建新的 cpp 代码文件时，IDE 不会自动刷新 cmake，会导致新的代码文件无法编译，需要在这里手动刷新 cmake：

![reload-cmake](https://labuladong.online/images/algo/plugin-debug/reload-cmake.png)

每次打开一道新的题目都要点击这个按钮手动刷新，有点麻烦。我们可以为它设置一个快捷键简化这个流程。

在 Clion 的设置页面搜索关键词 `cmake.reload` 即可进行设置：

![reload-cmake-shortcut](https://labuladong.online/images/algo/plugin-debug/reload-cmake-shortcut.png)

我设置的快捷键是 `Ctrl + Cmd + I`，你可以根据自己的习惯设置一个快捷键。

这样，每次打开新的题目时，按一下快捷键就可以快速 reload cmake ，调试新加入的代码文件。

Python

Jetbrains IDE：Pycharm

CodeType：`Python3`

FilePath：

```
/<your>/<path>/<to>/lc-plugin-template/python-template
``` 

CodeFilename：

```
$!velocityTool.camelCaseName(${question.titleSlug})
``` 

CodeTemplate：

```
from typing import *
from leetcode.editor.common.node import *

${question.code}

if __name__ == '__main__':
    solution = Solution()
    # your test code here
``` 

配置完成后，可以点开题目编写解法，然后在 `main` 函数中添加测试代码并打好断点，就可以调试 Python 算法了：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-python-debug.jpg)

Golang

Jetbrains IDE：Goland

CodeType：`Go`

FilePath：

```
/<your>/<path>/<to>/lc-plugin-template/golang-template
``` 

CodeFilename：

```
${question.titleSlug}_test
``` 

CodeTemplate：

```
package leetcode_solutions

import "testing"

${question.code}

func Test$!velocityTool.camelCaseName(${question.titleSlug})(t *testing.T) {
	// your test code here
	
}
``` 

Golang 的每个 package 只能有一个 main 函数入口，所以我们通过 Golang 测试文件的机制绕过这个限制，让每道题目都可以单独运行调试。

完成上述配置后，可以点开题目编写解法，然后在 `TestXXX` 函数中添加测试代码并打好断点，就可以调试算法了：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-go-debug.jpg)

JavaScript

Jetbrains IDE：WebStorm

CodeType：`JavaScript`

FilePath：

```
/<your>/<path>/<to>/lc-plugin-template/javascript-template
``` 

CodeFilename：

```
$!velocityTool.camelCaseName(${question.titleSlug})
``` 

CodeTemplate：

```
import {ListNode} from "../common/listNode.js";
import {TreeNode} from "../common/treeNode.js";

${question.code}

// your test code here
``` 

配置完成后，可以点开题目编写解法，添加测试代码并打好断点，点击右上角的 Debug 按钮就可以调试算法了：

![diagram](https://labuladong.online/images/algo/plugin-debug/jb-js-debug.jpg)

## 更新方式

JetBrains 家的 IDE 会自动检测更新，有更新时会有提示。建议及时更新最新版，以获得最流畅的体验。

## 更新日志

详见 [Jetbrain 插件更新日志](</zh/algo/changelog/jetbrain/>)。

## 常见问题解决方法

### 如何本地调试代码

需要利用自定义代码模板的功能，请仔细参考上面使用指南的「本地调试代码」部分。

### 中文乱码？

对于比较新的 IDE 版本和操作系统来说，一般不会出现这个问题。如果出现了，可以参考 [这个帖子](<https://blog.csdn.net/m0_38039437/article/details/104502838>) 修改 IDE 的编码为 utf-8。

### 题目页面会突然变成空白？

你的 IDE 是否已经安装使用了很久？只有 IDE 重度使用者才会遇到这个 bug，原因很难排查，大概是 IDE 升级过程中的某些缓存/内部配置的问题导致的。一个最简单的解决办法是：去官网重新下载最新版 IDE，覆盖安装本地的 IDE（不用担心，并不会覆盖已有的配置），这样一来所有问题都消失了。

### 题目列表没有 ✨ 标记？

如果登录账号之后题目列表还没有出现 ✨ 标记，可以点击工具栏最右侧的网站 logo 图标手动刷新 labuladong 的题解数据：

![diagram](https://labuladong.online/images/algo/intro/jb3.png)

等待十几秒左右就会看到通知栏显示「手动刷新 labuldong 数据成功」，✨ 标记就会出现。

若还是没有反应，也没有报错，那么大概率是网络问题，请尝试关闭代理或更换网络，重新刷新数据。

### 有 ✨ 标记但是没有思路和题解按钮？

如果显示数据拉取成功，但是题目详情页没有「labuladong 题解」和「labuladong 思路」按钮，是因为 IDE 的文件系统缓存没有刷新。

你可以尝试手动清除 IDE 的缓存并重启 IDE：

![diagram](https://labuladong.online/images/algo/intro/jb-clean-file-cache.jpg)

### 代码不会自动补全/纠错？

代码补全和纠错是 IDE 的基础功能，和插件无关。如果没有代码补全和纠错功能，一般是因为你的 IDE 没有配置好，或者是你的代码文件无法被 IDE 识别。

比如对于 Go 语言来说，需要在代码文件的第一行加上 `package main` 才能被 Goland IDE 识别，你可以使用前面介绍的「本地调试代码」功能来自动添加这一行。

类似的，再比如 Java 文件，需要在一个 Java 项目中才能被 IDE 识别。你可以修改插件配置，把 `TempFilePath` 设置为你的项目路径，并设置 [Code Template](<https://github.com/shuzijun/leetcode-editor/blob/master/doc/CustomCode.md>) 自动添加 package 名称，这样代码文件就会被保存到项目中，IDE 就能识别并给出代码补全了。

### 没有代码提交按钮？

旧版本插件可能出现这个问题，请确认是否使用的是最新版插件。正常来说，鼠标移动到代码编辑区域，右上角就会出现提交、测试等功能按钮。

同时，在代码文件中点击右键，也会出现提交、测试等功能按钮。

## bug 反馈

可以在 GitHub 创建 Issue 反馈问题：

<https://github.com/labuladong/fucking-algorithm/issues/>[](<https://github.com/labuladong/fucking-algorithm/issues/>)
