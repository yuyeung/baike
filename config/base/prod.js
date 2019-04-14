// production config
const merge = require('webpack-merge')
const { resolve } = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const app = process.env.APP_NAME
const commonConfig = require('../common.config')
const common = require('./common')

module.exports = merge(common, {
    mode: 'production',
    entry: `./${app}`,
    output: {
        filename: 'js/main.[hash].js',
        publicPath: app === 'index' ? commonConfig.cdnPath : `${commonConfig.cdnPath}/${app}/`,
        path: resolve(__dirname, `../../dist/${app}`),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    safari10: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            resolve(__dirname, `../../dist/${app}`),
        ], { allowExternal: true }),
    ],
})
