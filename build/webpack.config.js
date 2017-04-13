/**
 * Created by Administrator on 2017/3/13 0013.
 */

// ????plugins



var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;  //导致很慢
var proxyIp="http://172.23.171.2:8080"

module.exports = {
    entry: {
        login: './login.js',
        main: './main.js'
    },
    output: {
        filename: '[name].build.js', // '[name].[chunkhash].js'
        publicPath: "/dist/"
    },
    module: {

        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            use: ["babel-loader"],

        },
        {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        },
        { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader' },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">

                }
            }
        }

        ],

    },
    devServer: {
        contentBase: '../public/',
        compress: true,
        watchContentBase: true,
        port: 9090, //端口你可以自定义
        proxy:{
            "/oauth/*":'http://172.23.171.2:8080'
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //      filename: 'index.html',
        // })
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
    resolve: {
        extensions: [" ", ".js", ".vue"],
        alias: {
            'vue$': 'vue/dist/vue.common'
        }   
    },


}

