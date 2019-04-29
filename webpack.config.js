const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './newsapi.js',
    mode: 'production',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    } ,
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ]
};

