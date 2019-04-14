/**
 * 修复全局模块引用问题
 */
import { LoDashStatic } from 'lodash'
// import { RavenStatic } from 'raven-js'

declare global {
    var _: LoDashStatic
    // var Raven: RavenStatic
}
