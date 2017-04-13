var webpackServer=require("webpack-dev-server");
var webpack=require('webpack');
var webpackConf=require('./webpack.config');
var compiler=webpack(webpackConf);
new webpackServer(compiler, {
        contentBase: '../public/html',
    watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
        watchContentBase:true,
        port:9090,
        publicPath: "/dist/",
          filename: "bundle.js",
}).listen(8080, "localhost", function() {
console.log('fuck')

});
