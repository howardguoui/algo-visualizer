# 配套 vscode/cursor 刷题插件

> Source: https://labuladong.online/zh/algo/intro/vscode/
> Archived: labuladong.online — 算法笔记

---

# 配套 vscode/cursor 刷题插件

插件和本站的关系

**插件中的题解和思路都是本站的文章和习题讲解，是辅助大家学习本站的配套工具，并不是必须安装的，请根据自身需求选择** 。

有些读者不喜欢在网页上刷题，认为在编辑器或 IDE 中刷题更方便编写和调试代码，所以我开发维护了各个平台的刷题插件满足这个需求，允许读者在插件中查看本站的题目讲解、可视化以及题单。

vscode 插件可以让大家在 **vscode 或 Cursor** 中刷 LeetCode/力扣，支持逐行调试代码，可以直接查看本站的思路讲解、可视化面板，同时集成了 [速成目录](</zh/algo/intro/quick-learning-plan/>) 和 [初学者目录](</zh/algo/intro/beginner-learning-plan/>) 中的题目题单，方便复习：

![diagram](https://labuladong.online/images/algo/intro/vs_intro1.jpg)

本插件是我基于以下两款开源 vscode 插件修改而来：

<https://github.com/LeetCode-OpenSource/vscode-leetcode>[](<https://github.com/LeetCode-OpenSource/vscode-leetcode>)

<https://github.com/ccagml/leetcode-extension>[](<https://github.com/ccagml/leetcode-extension>)

这两款插件各有各的优点和缺陷，我尽可能地取长补短，把它们的优势集合起来，并额外添加了一些好用的功能，下面简单介绍一下。

视频演示

经常有读者跟我反馈插件的使用问题，最后发现都是操作步骤不对，白白浪费了时间进行沟通。

所以我干脆录个视频，快速展示插件的主要功能，并亲自演示如何登录力扣开始刷题、如何配置本地调试环境、如何登录本站拉取本站会员思路解析以及题单。

更详细的配置方法、常见问题的解法等，还请参考下方的文档。

![Video Cover](https://labuladong.online/images/algo/vod/vscode.jpg)

## 安装方法

在 vscode 的插件市场中搜索关键词「labuladong」即可搜到插件，点击安装即可：

![diagram](https://labuladong.online/images/algo/intro/vs1.jpg)

如果搜不到，可以从 vscode 插件商店的网页安装：

<https://marketplace.visualstudio.com/items?itemName=labuladong.leetcode-helper>[](<https://marketplace.visualstudio.com/items?itemName=labuladong.leetcode-helper>)

## 功能展示

本插件同时支持登录中文版 leetcode.cn 和英文版 leetcode.com 刷题。

题目列表中带有 ✨ 标记的都是本站讲解过的题目，点开后可以查看简短的思路，或者跳转到网站查看详细讲解：

![diagram](https://labuladong.online/images/algo/intro/vs-show.jpg)

本站的所有功能，插件也都支持，包括图片注释、算法可视化等：

![diagram](https://labuladong.online/images/algo/visualize_intro/vscode_example.jpg)

## 登录力扣/LeetCode

### 选择登录平台

打开 vscode 的指令输入框（Mac 快捷键 `Cmd + Shift + P`，Windows 快捷键 `Ctrl + Shift + P`），输入关键词 `LeetCode sign in`，可以选择登录 leetcode.cn 或 leetcode.com：

![diagram](https://labuladong.online/images/algo/intro/vscode_login.jpg)

### 复制 cURL 命令登录

接下来按照提示输入 力扣/LeetCode 的 cURL 命令，即可完成登录。

获取 cURL 命令的方法如下：

![diagram](https://labuladong.online/images/algo/intro/copy-curl.jpg)

1️⃣ 打开官网 <https://leetcode.cn/problemset/>[](<https://leetcode.cn/problemset/>)（国际版为 <https://leetcode.com/problemset/>[](<https://leetcode.com/problemset/>)），并**确保已经在网页端登录你的账号** 。

2️⃣ 打开浏览器开发者工具（Chrome/Edge 按 F12），然后点击 Network 选项卡。

3️⃣ ~ 4️⃣ 刷新页面，选中第一个网络请求，鼠标右键选择 `Copy` -> `Copy as cURL`。对于 Windows 的 Chrome 浏览器，可能需要点击 `Copy` -> `Copy as cURL (bash)`。

登录报错？

若出现登录报错，大概率是浏览器给你的 cURL 命令有问题。可以查看你复制的 cURL 命令，应该类似下面这样，包含 `csrftoken=xxx` 和 `LEETCODE_SESSION=xxx` 这两部分值：

```
curl 'https://leetcode.cn/problemset/' \
  -H 'Cookie: ... ; csrftoken=xxx; LEETCODE_SESSION=xxx'; ... \
  -H 'Pragma: no-cache' \
  -H 'Sec-Fetch-Dest: document' \
...
``` 

也可以尝试把复制出来的 cURL 命令粘贴到终端中执行，看看是否正常。

非主流的浏览器会有各种奇怪的问题，建议使用 Chrome/Edge 浏览器进行操作。

## 解锁本站思路/题单（可选）

提示

所有用户都可以免费使用插件的刷题功能和部分本站的题目的解题思路；购买 [本站会员](</zh/algo/intro/site-vip/>) 后，才能在插件中解锁本站的所有题解思路、算法可视化面板和题单。

若你已购买本站会员，请按照下面的步骤在插件中解锁本站的题解和思路。

### 步骤一、安装并启动插件

按照上面介绍的方法安装插件并登录你的 力扣/LeetCode 账号，确保插件的基本使用没有问题。

注意，安装插件后，vscode 的侧边栏会新增一个力扣图标，你需要先点击这个图标让插件完成加载，然后再进行下面的操作。否则可能会出现命令执行失败的问题。

### 步骤二、登录 labuladong.online

在 vscode 中按下 `F1` 键，vscode 会弹出一个命令弹窗，输入关键词 `labuladong`，可以看到一个 `Sign in labuladong.online` 的选项：

![diagram](https://labuladong.online/images/algo/intro/vscode-login-site.jpg)

点击这个选项会弹出一个输入框，复制下面的 cookie 字段粘贴进输入框：

请登录获取 token

最后回车确定，稍等几秒钟之后应该会有弹窗显示网站会员数据拉取成功：

![diagram](https://labuladong.online/images/algo/intro/vscode-vip-refresh-success.jpg)

接下来，你就可以在 vscode 中查看所有本站的题解思路和题单了。

## 本地调试算法代码（可选）

提示

这部分为可选内容，主要针对希望在本地打断点运行、调试代码的读者：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-java-debug.jpg)

如果不配置，就和力扣网页刷题的体验一样，代码会提交到力扣 API 进行测试/判题（vscode 可能会出现类型报错等问题，但不影响提交 API，可以忽略）：

![diagram](https://labuladong.online/images/algo/intro/vs-show.jpg)

每道题目的算法代码其实就是一个普通的代码文件，理论上可以在本地调试运行，但有几个问题：

1、力扣有一些内置的类型，比如 `ListNode, TreeNode`，而且题目的测试用例输入是数组形式，你需要自己实现这些结构，并对题目的输入数据进行转换。

2、需要针对不同编程语言的特性进行额外配置，才能让代码编辑器正确识别项目结构。否则可能出现无法在本地运行代码、无法使用自动补全等问题。

针对这些问题，我研发了一套解决方案，**你按照下面的步骤配置插件，就可以直接在本地运行力扣的题目代码了。目前支持 Java/C++/Python/Golang/JavaScript 几种编程语言** 。

### 步骤一、clone 代码模板

我把配置好的项目模板托管到了 Github 仓库，可以 clone 到本地：

```
git clone https://github.com/labuladong/lc-plugin-template.git

# 中国大陆的读者可以在 Gitee 下载：
git clone https://gitee.com/labuladong/lc-plugin-template.git
``` 

大家在使用的过程中如果遇到问题或者可以改进的点，欢迎提 PR 或者 Issue。

### 步骤二、输入模板本地路径

在 vscode 的命令输入框（Mac 快捷键 `Cmd + Shift + P`，Windows 快捷键 `Ctrl + Shift + P`）中输入关键词 `leetcode setup debug`，找到自动配置模板的命令按回车。

插件会要求你输入代码模板本地路径，即刚才 clone 的代码模板本地路径，比如 `/Users/yourname/lc-plugin-template`，然后按回车。

插件会根据你当前配置的刷题编程语言创建相关的调试配置，最终弹出成功配置的提示：

![diagram](https://labuladong.online/images/algo/intro/vscode-setup-debug.jpg)

请你选择「在新窗口打开」，即可在新的 vscode 窗口中打开代码模板文件夹，然后直接打开一道力扣题目，即可看到生成的代码文件中已经按照模板自动配置好了包名、类名、方法名等。

在 vscode 的设置页面搜索关键词 `labuladong custom code template`，可以看到插件为各个语言自动预设的代码模板，你可以根据自己的需求进行修改。

### 步骤三、配置本地调试环境

提示

**本地调试功能依赖本地的开发环境，和刷题插件无关** 。

刷题插件仅负责提供项目结构和代码文件，代码调试功能由你本地的开发环境提供。如果按本文档配置后依然报错，请根据报错自行排查。

下面针对不同语言进行介绍。

Java 配置方法

打开力扣题目编写算法代码，打好断点，并在 `main` 函数中写好测试用例，最后点击 `main` 函数上方的 `Debug` 按钮即可逐行调试代码了：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-java-debug.jpg)

如果你的 `main` 函数上没有出现 `Debug` 按钮，可能是没有安装 [Extension Pack for Java](<https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack>)，请安装后重试。

Python 配置方法

配置完成后，打开力扣题目编写算法代码，打好断点，并编写好测试输入。注意文件右上角有个运行的图标，下拉选项中有 `Debug Python File` 选项，点击后即可逐行调试代码了：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-python-debug.jpg)

如果看不到 `Debug Python File` 选项，可能是没有安装 [Python Debugger](<https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy>) 插件，请安装后重试。

C++ 配置方法

打开力扣题目编写算法代码，打好断点，并编写好测试输入。注意侧边栏有个 `CMake` 图标，点开后选择题目文件对应的编译目标，右键选择 `Debug`，即可逐行调试代码了：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-cpp-debug.jpg)

如果你没有看到 `Debug` 图标，可能是没有安装 [C/C++ Extension Pack](<https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack>) 插件，请安装后重试。

C++ 项目环境配置比较麻烦，如果运行代码报错，请尝试排查：

1、你的 C++ 环境至少应该为 C++ 17 标准，过于老旧的 C++ 环境会缺少一些标准库类型，比如 `nullopt`。

2、你的编译器加载的是不是 `cpp-template` 文件夹中的 `CMakeLists.txt` 文件，加载错了无法运行代码。

Golang 配置方法

Golang 的一个 package 内不能有多个可运行的 main 函数，不过我们可以利用 Golang 测试文件的机制来绕过这个限制。

打开力扣题目编写算法代码，打好断点，并编写好测试输入。可以看到这个 `TestXXX` 函数上方出现一个 `debug test` 按钮，点击后即可逐行调试代码了：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-go-debug.jpg)

如果你没有看到 `debug test` 按钮，可能是没有安装 [Go for Visual Studio Code](<https://marketplace.visualstudio.com/items?itemName=golang.Go>) 插件，请安装后重试。

JavaScript 配置方法

打开力扣题目编写算法代码，打好断点，并编写好测试输入。侧边栏有一个 `Run and Debug` 按钮，点击后即可逐行调试代码了：

![diagram](https://labuladong.online/images/algo/plugin-debug/vscode-js-debug.jpg)

## 常用配置

在 vscode 的设置页面中搜索关键词 `labuladong-leetcode`，可以看到插件相关的所有配置，可以根据自己的需求进行修改。

### 设置刷题编程语言

在设置页面输入关键词 `labuladong default language` 可以看到设置刷题的编程语言的选项。

### 在注释中显示题目

如果你希望在注释中显示题目（比如在公司刷题），可以在设置页面输入关键词 `labuladong custom code template` 调整代码模板。

变量 `${question.content}` 就是英文题目内容，`${question.translatedContent}` 就是中文题目内容。**把这些变量插入到多行注释中即可在注释中显示题目** 。

比如你用 Java 刷题，就可以在代码模板中添加如下内容：

```
/**
${question.content}
*/
``` 

### 切换中英文

插件的题解/思路/可视化面板的内容默认为中文，可以在 vscode 的设置页面中搜索配置关键词 `labuladongLanguage` 切换为英文。

### 显示力扣的 plus 题目

在设置页面输入关键词 `labuladong show locked` 可以设置是否显示力扣的 plus 题目。

## 更新方式

默认情况下，vscode 会自动检测和更新插件。

## 更新日志

详见 [vscode 插件更新日志](</zh/algo/changelog/vscode/>)。

## 常见问题解决方法

### 报错 `command xxx not found`？

报错 `command xxx not found` 说明插件还没有加载。请你点击 vscode 侧边栏的力扣图标，让插件启动并加载。

### 无法登录力扣/LeetCode？

请确保按照上面的操作方法复制 cURL 进行登录；确保你没有选错登录平台；确保你在网页上已经登录了力扣/LeetCode 账号。

如果显示 `login...`，一直不显示登录成功，大概率是网络问题，请尝试关闭所有网络代理，或更换网络。

### 没有 ✨ 标记和题解/思路按钮？

如果没有看到题解/思路按钮，大概率是因为插件数据拉取失败了，你可以手动触发数据拉取，步骤如下：

1、按下快捷键 `F1`，会弹出 vscode 插件命令输入框。

2、在输入框输入 `labuladong`，就会查到一个 `Refresh labuladong.onlin data` 的命令。

3、点击这个命令，即可手动触发数据拉取。拉取完成后，题目列表中应该就会出现 ✨ 标记，对应题目就出现题解/思路按钮了。

如果操作后没有弹窗显示，或者拉取数据很慢，请尝试关闭所有网络代理或更换网络。

### 手动刷新数据没有反应？

一般都是网络问题，请尝试关闭所有网络代理或更换网络。

### 设置代码文件的名字和路径？

插件支持按照不同的编程语言设置对应的代码文件的存储名称。

在 vscode 的设置页面中搜索配置关键词 `labuladong-leetcode filepath`，可以看到一个 `Edit in setting.json` 选项，点击后可以把你需要的配置写入 `settings.json` 文件中。

比如可以如下设置 python3 的代码文件的命名规范：

```
"labuladong-leetcode.filePath": {
    "python3": {
        "filename": "${id}.${cn_name}.${ext}"
    },

    // ...
}
``` 

可用的变量有：

题号| 题目英文名| 题目中文名| 扩展名| 当前时间日期| 驼峰名称| 下划线名称| 短横线名称  
---|---|---|---|---|---|---|---  
`${id}`| `${name}`| `${cn_name}`| `${ext}`| `${yyyymmdd}`| `${camelCaseName}`| `${snake_case_name}`| `${kebab-case-name}`  
  
## Bug 反馈

可以在 GitHub 创建 Issue 反馈问题：

<https://github.com/labuladong/fucking-algorithm/issues/>[](<https://github.com/labuladong/fucking-algorithm/issues/>)

## 评论

请登录后查看/发表评论
