const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
    mode: 'development',
    stats: 'none',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{ exclude: /node_modules/, loader: "babel-loader" }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = [
    // Desktop
    merge(commonConfig, {
        target: 'electron-main',
        entry: { 
            main: path.resolve(__dirname, 'desktop/main.js') 
        },
        node: {
            __dirname: false
        }
    }),
    // Web
    merge(commonConfig, {
        target: 'electron-renderer',
        entry: {
            web: path.resolve(__dirname, 'web/index.js'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: require('html-webpack-template'),
                appMountId: 'root'
            })
        ]
    })
];
