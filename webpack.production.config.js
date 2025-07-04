var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './index.js' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }

         ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.production.html'
        }),
        new webpack.EnvironmentPlugin(['GOOGLE_API_KEY'])
    ]
};
