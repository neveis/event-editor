var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var env = process.env.NODE_ENV;

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: __dirname + '../dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                }
            },
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
                //less: ExtractTextPlugin.extract("vue-style!css!less-loader")
        }
    },
}