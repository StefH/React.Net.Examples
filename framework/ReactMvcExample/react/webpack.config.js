const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        components: './app/expose-components.ts'
    },
    output: {
        filename: '[name].js',
        globalObject: 'this',
        path: path.resolve(__dirname, '../Scripts/dist'),
        publicPath: 'dist/'
    },
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime' // necessary when using multiple entrypoints on the same page
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                fluentui: {
                    test: /[\\/]node_modules[\\/]@fluentui[\\/]/,
                    name: 'fluentui',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: '**',
                    to: path.resolve(__dirname, '../../../core/ReactCoreMvcExample/wwwroot/js/dist'),
                    context: path.resolve(__dirname, '../Scripts/dist')
                }
            ],
            {
                copyUnmodified: false
            }
        )
    ]
};
