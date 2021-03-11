const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: './bundle.js'
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true, //need this for react router to work
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
