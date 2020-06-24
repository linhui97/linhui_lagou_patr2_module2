const webpack = require('webpack')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    mode: 'development',
    // 配置开发过程中的辅助工具
    devtool: 'source-map',
    devServer: {  //配置开发服务器
        historyApiFallback: true, // 不跳转
        hot: true,  //模块热替换
        inline: true, // 实时刷新
        contentBase: './public',  //额外为开发服务器指定查找资源目录
    },
    plugins: [

    ]
})