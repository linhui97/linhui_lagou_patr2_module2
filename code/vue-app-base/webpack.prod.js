const common = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),  //自动清除输出目录插件
        new CopyWebpackPlugin({  //复制目录下文件，开发完成后最后的打包再使用
            patterns: [
                'public',
                'src/assets'
            ]
        })
    ]
})