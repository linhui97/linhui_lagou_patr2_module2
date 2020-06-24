const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    mode: 'none',  //设置打包模式
    entry: path.join(__dirname, './src/main.js'),  //指定输入
    output: {  //指定输出
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
    },
    stats: {  //配置获取某部分 bundle 的信息
        children: false  // 添加 children 信息
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // 配置哪些引入路径按照模块方式查找
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: ['xlink:href', 'href'],
                    }
                }
            },
            {   // 它会应用到普通的 `.js` 文件，以及 `.vue` 文件中的 `<script>` 块
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (  //排除文件
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                  )
            },
            
            {   // 它会应用到普通的 `.css` 文件，以及 `.vue` 文件中的 `<style>` 块
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {   //加载和转译 LESS 文件
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    "css-loader",
                    "less-loader"
                ]
            },
            {   //url加载器
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    // 超出 10KB 文件单独提取存放
                    // 小于 10KB 文件转换为 Data URLs 嵌入代码中
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,  //10KB
                        esModule: false
                    }
                }
            },
            {   //使用 ESLint 校验 js/vue 文件中的代码
                enforce: 'pre',  //强制提前执行
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({  //用于生成 index.html 
            title: 'vue-app-base',
            template: './public/index.html',
            inject: "body", // 所有javascript资源将被放置在body元素的底部
            chunks: ["main"] // 只添加main.js/main.css
        }),
        new StyleLintPlugin({  //样式校验
            files: ['**/*.{vue,html,css,less}'],
        })
    ]
}