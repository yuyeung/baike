/**
 * 应用配置中心
 * @author Jason
 */
const { resolve } = require('path')
const externals = require('./externals')

const SIMPLE_TEMPLATE = resolve(__dirname, './template/index.ejs')
const ANTD_TEMPLATE = resolve(__dirname, './template/index-antd.ejs')

module.exports = {
    index: {
        template: ANTD_TEMPLATE,
        externals,
    }
}
