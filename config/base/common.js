// shared config (dev and prod)
const { resolve } = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

const apps = require('../apps.config')
const app = process.env.APP_NAME
const appConfig = apps[app]
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
        plugins: [
            new TsConfigPathsPlugin()
        ],
        alias: {
            '@styles': resolve(__dirname, 'src/styles/'),
        },
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: ['tslint-loader']
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.less$/,
                loaders: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
                    { loader: 'less-loader', options: { javascriptEnabled: true }, }
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
        ],
    },
    plugins: [
        new StyleLintPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: '../tsconfig.json'
        }),
        new HtmlWebpackPlugin({
            template: appConfig.template
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'main.css' : 'css/main.[hash].css',
            chunkFilename: devMode ? 'main-[id].css' : 'css/main-[id].[hash].css',
        })
    ],
    externals: appConfig.externals,
    performance: {
        hints: false,
    },
}
