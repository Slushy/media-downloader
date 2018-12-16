const { DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    devtool: 'source-map',
    module: {
        rules: [{ exclude: /node_modules/, loader: "babel-loader" }]
    },
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, 'src/shared/')
        },
        extensions: ['.js', '.jsx']
    }
};

module.exports = [
    // Desktop
    merge(commonConfig, {
        target: 'electron-main',
        entry: {
            main: path.resolve(__dirname, 'src/desktop/main.js')
        },
        node: {
            __dirname: false
        },
        plugins: [
            new DefinePlugin({
                'process.env.FLUENTFFMPEG_COV': false
            })
        ]
    }),
    // Web
    merge(commonConfig, {
        target: 'electron-renderer',
        entry: {
            web: [
                path.resolve(__dirname, 'src/web/index.js'),
                path.resolve(__dirname, 'src/web/styles/main.scss')
            ]
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
            }]
        },
        plugins: [
            new ExtractTextPlugin("[name].css", {
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: require('html-webpack-template'),
                appMountId: 'root',
                title: "Media Downloader"
            })
        ]
    })
];
