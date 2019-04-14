#!/usr/bin/env node
/**
 * 构建工具
 * @author jasonelchen
 */
const path = require('path')
const execa = require('execa')
const pkg = require('../package.json')
const program = require('commander')
const startTime = Date.now()

const cwd = path.resolve(__dirname, '../')

program.version('0.1.0')

program
    .command('dev <app>')
    .description('本地开发监听')
    .action(function (app = 'index') {
        const env = { NODE_ENV: 'development', APP_NAME: app, IS_ANALYZER: false }
        console.log('\n'
        + '=======================================\n'
        + '        Baike FE Builder\n'
        + '\n'
        + `- Version: v${pkg.version}\n`
        + `- Build App: ${app}\n`
        + `- Build Mode: development\n`
        + '=======================================\n'
        + '\n')

        execa(
            'webpack-dev-server',
            ['--config', 'config/base/dev.js'],
            { cwd, env, buffer: false, stdio: 'inherit' }
        )
    })

program
    .command('build <app>')
    .description('构建生产环境版本')
    .option('-d, --deploy', '构建完成部署 CDN', true)
    .action(function (app = 'index', cmd) {
        const env = { NODE_ENV: 'production', APP_NAME: app, IS_ANALYZER: false }
        console.log('\n'
        + '=======================================\n'
        + '        Baike FE Builder\n'
        + '\n'
        + `- Version: v${pkg.version}\n`
        + `- Build App: ${app}\n`
        + `- Build Mode: production\n`
        + '=======================================\n'
        + '\n')

        execa(
            'webpack',
            ['-p', '--config', 'config/base/prod.js'],
            { cwd, env, buffer: false, stdio: 'inherit' }
        ).then(res => {
            const endTime = Date.now()
            console.log(`\n构建成功，耗时：${((endTime - startTime) / 1000).toFixed(2)}s`)
        })
    })

program
    .command('analyzer <app>')
    .description('分析生产环境包')
    .action(function (app = 'index') {
        const env = { NODE_ENV: 'production', APP_NAME: app, IS_ANALYZER: true }
        execa(
            'webpack',
            ['--profile', '--config', 'config/base/prod.js'],
            { cwd, env, buffer: false, stdio: 'inherit' }
        )
    })

program.parse(process.argv)
