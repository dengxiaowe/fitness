/*
webpack 打包配置文件
author: dengxiaodeng    2021-06-13
*/

const path = require('path');
//引入html打包的插件 
const HtmlWebpackPlugin = require('html-webpack-plugin');

//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    //五大概念导出
    //入口
    entry: {
        //多页面应用 home模块
        home: './src/js/home.js',
        login:'./src/js/login.js'
    },
    //出口
    output: {
        //出口文件  放置的位置   必须是绝对路径
        // 出口文件的 文件名
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath:'./'
    },
    //loader解释器
    module: {
        rules: [
            //使用什么loader 对什么格式的文件 进行解释（翻译）
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },'css-loader'] },
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader'] },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                //可以通过url-loader 将图片压缩为 base64编码格式的图片
                //大图就不压缩  小图可以压缩
                options: {
                    name: '[hash].[ext]',  // 图片输出的名字为全hash
                    limit: 30 * 1024,  // 限制 小于30kb base64处理
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,    //配置html文件打包
                loader: 'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/, loader: 'file-loader',
                options: {
                    outputPath: 'fonts'   //输出的目录
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }
        ]
    },
    //plugins 插件
    plugins: [
        //配置html打包的插件
        new HtmlWebpackPlugin({
             //以哪个html文件作为打包的模板
            template: './src/page/home.html',
            filename: 'home.html',
            chunks:['home']
        }),

        new HtmlWebpackPlugin({
            //以哪个html文件作为打包的模板
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
    
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    //mode环境
    //development  本地开发环境
    //production  线上生成环境
    mode: "development",


    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8088,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}