/**
 * Created by Administrator on 2017/3/13 0013.
 */

// ????plugins


var path=require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin')
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;  //慢
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
            exclude: /node_modules/,
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
        { test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader' },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">

                },
                preserveWhitespace: false
            }
        }

        ],

    },
    devServer: {
        contentBase: '../public/',
        compress: true,
        watchContentBase: true,
        port: 9090, 
        proxy:{
            '/oauth/*':'http://172.23.171.2:8080',
          
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
        //简写扩展名
        extensions: [" ", ".js", ".vue"],
        //
        alias: {
            'vue$': 'vue/dist/vue.common',
            '@components':path.resolve('../public/src/components'),
            '@common':path.resolve('../public/src/common'),
        }    
    },


}


