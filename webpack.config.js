var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: './public/alchemy.js'
    },
    loaders: [
        {
            test: /\.json$/,
            loader: 'json'
        },
        // {
        //     test: /\.js$/,
        //     exclude: /(node_modules)/,
        //     loader: 'babel-loader',
        //     query: {
        //         presets: ['es2015']
        //     }
        // }
    ]
};