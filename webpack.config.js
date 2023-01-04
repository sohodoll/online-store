const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'our project',
            template: 'src/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }],
        }),
        new NetlifyPlugin({
            redirects: [
                {
                    from: '/*',
                    to: '/index.html',
                    status: 200,
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
        historyApiFallback: true,
    },
};
