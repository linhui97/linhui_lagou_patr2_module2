# 一、简答题
## 1、Webpack 的构建流程主要有哪些环境？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
### webpack 构建流程环境
- none 不开启任何优化选项
- development 以开发模式打包
    - 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
- production 以生产模式打包
    - 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.

### Webpack 打包过程 
- 设置打包模式(mode)
- 设置打包的入口(entry)
- 设置打包的出口(output)
- 用loader 将所有类型的文件转换为 webpack 能够处理的有效模块
- 引入打包所需要的插件

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
- loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。借助不同的loader就可以加载任何类型的资源。
- Plugin 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。
- loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。

# 二、编程题
## 1、使用 Webpack 实现 Vue 项目打包任务
- 项目文件路径：code/vue-app-base

- 项目用到的loader：
    - vue-loader 加载和转译 Vue 组件
    - babel-loader 加载 ES6+ 代码，然后使用 Babel 转译为 ES5 
    - style-loader 将模块的导出作为样式添加到 DOM 中
    - css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
    - less-loader 加载和转译 LESS 文件
    - vue-style-loader 匹配到 vue 文件中的样式并添加到 DOM 中
    - file-loader 将文件发送到输出文件夹，并返回（相对）URL
    - url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
    - eslint-loader 使用 ESLint 校验 js/vue 文件中的代码

- 项目用到的插件:
    - StyleLintPlugin 样式文件校验 
    - HtmlWebpackPlugin 简单创建 HTML 文件，用于服务器访问
    - CleanWebpackPlugin 自动清除输出目录
    - CopyWebpackPlugin 复制指定目录下文件
