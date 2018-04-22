const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        web: path.resolve(__dirname, 'web/index.js'),
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
});
