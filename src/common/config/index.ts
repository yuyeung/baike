/**
 * 公共配置
 * @author Jason
 */

// 不同环境的 host 配置
export const apiHosts = {
  local: 'http://127.0.0.1:7001/',
  dev: 'https://dev.api.szuswzx.com/',
  pre: 'https://pre.api.szuswzx.com/',
  prod: 'https://api.szuswzx.com/',
}

// 微信公众号相关配置
export const appId = 'wx36a4c7de498c0009'

// token 存放的 localstorage key
export const TOKEN_STORAGE_KEY = '__baikeToken__'
