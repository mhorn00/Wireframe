var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
require('style-loader');
require('css-loader');

const loaders = {
    css: {
        loader: 'css-loader'
    },
    postcss: {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                autoprefixer({
                    browsers: ['last 2 versions']
                })
            ]
        }
    },
    sass: {
        loader: 'sass-loader',
        options: {
            indentedSyntax: true,
            includePaths: [path.resolve(__dirname, './src/app')]
        }
    }
}


module.exports = {
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 8000
    },
    context: __dirname,
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    devtool: "sourceMap",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
                }),
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
}