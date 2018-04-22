const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    target: 'electron-main',
    entry: { 
        main: path.resolve(__dirname, 'desktop/main.js') 
    },
    node: {
        __dirname: false
    }
});
