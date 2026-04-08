const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        clean: true, // Очищает dist перед сборкой
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,  // Добавляем обработку изображений
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'  // Сохраняем в папку images
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', 
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'src/images',  // Откуда копировать
                    to: 'images',        // Куда копировать в dist
                    noErrorOnMissing: true  // Не выдавать ошибку если папки нет
                }
            ]
        })
    ]
};