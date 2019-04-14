const merge = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./common')

const app = process.env.APP_NAME
const common = require('../common.config')

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        `./${app}`,
    ],
    devServer: {
        host: common.host,
        port: common.port,
        hot: true,
        historyApiFallback: { disableDotRule: true, },
        stats: 'minimal',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
})
