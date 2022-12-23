const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const sveltePreprocess = require('svelte-preprocess')
const CssMinimizer = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

const getWebpackConfig = env => {
    return {
        mode: 'development',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
        },
        devServer: {
            host: '0.0.0.0',
            static: {
                directory: path.resolve(__dirname, 'build')
            },
            historyApiFallback: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizer(),
                new HtmlMinimizerPlugin(),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                },
                {
                    test: /\.ts$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.svelte$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            preprocess: sveltePreprocess({}),
                            emitCss: true
                        }
                    }
                },
                {
                    test: /\.(jpg|png)$/,
                    use: { loader: 'url-loader' }
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/image2.png'
            }),
        ]
    }
}

module.exports = env => {
    return getWebpackConfig();
};

module.exports.getWebpackConfig = getWebpackConfig