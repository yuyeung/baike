/**
 * 百科登录控件
 * @author Jason
 */
import { parse, stringify } from 'query-string'
import { appId, TOKEN_STORAGE_KEY } from '../config'
import * as authService from '../services/authService'

const SWZX_MID_SERVER = 'http://swzx.szu.edu.cn/baikenext'
const BAIKE_CALLBACK_URL = 'https://next.szuswzx.com/'

/**
 * 拉起登录
 */
export function login () {
  const query = parse(window.location.search)

  if (!query.code) {
    return jumpToWecaht()
  }

  // 取出 code
  const { code, state, ticket } = query
  const loginState = { uri: '/', type: 'login' }

  if (state) {
    try {
      const parsedState = parse(atob(state as string))
      loginState.uri = parsedState.uri as string
      loginState.type = parsedState.type as string
    } catch (e) {}
  }

  if (loginState.type === 'login') {
    return doLogin(code as string, loginState.uri)
  } else {
    return doRegister(code as string, ticket as string, loginState.uri)
  }
}

/**
 * 请求深大百科接口进行登录
 * @param {string} code 微信的 code
 * @param {string} uri  登录成功回调地址
 */
async function doLogin (code: string, uri: string) {
  const [res, err] = await authService.getSessionToken(code)

  if (err) {
    if (err.code === 1003) {
      return jumpToWecaht()
    } else if (err.code === 1001) {
      // 用户未注册
      return jumpToWecaht('register', uri)
    }
  }

  const { token } = res
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)

  // 如果不是当前的 URI，则跳转
  if (window.location.pathname !== uri) {
    window.location.href = uri
  } else {
    window.location.href = `${window.location.href}?${Date.now()}`
  }
}

/**
 * 请求深大百科接口进行用户注册
 * @param code   微信的 code
 * @param ticket 校园卡登录的 ticket
 * @param uri    登录成功回调地址
 */
async function doRegister (code: string, ticket: string, uri: string) {
  if (!ticket) {
    return jumpToCas(code, uri)
  }

  const [res, err] = await authService.registerUser(code ,ticket)

  if (err) {
    return console.log('登录错误', err)
  }

  const { token } = res
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)

  // 如果不是当前的 URI，则跳转
  if (window.location.pathname !== uri) {
    window.location.href = uri
  } else {
    window.location.href = `${window.location.href}?${Date.now()}`
  }
}

/**
 * 跳转到微信登录
 * @param {string} type 跳转类型，可以提供 login 或者 register
 * @param {string} uri  登录成功回调 URL
 */
export function jumpToWecaht (type: string = 'login', uri: string = window.location.pathname) {
  const jumpOptions = {
    appid: appId,
    redirect_uri: BAIKE_CALLBACK_URL,
    response_type: 'code',
    scope: type === 'login' ? 'snsapi_base' : 'snsapi_userinfo',
    state: btoa(stringify({ uri, type })),
  }
  const jumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?${stringify(jumpOptions)}#wechat_redirect`
  window.location.href = jumpUrl
}

/**
 * 跳转统一登录
 */
export function jumpToCas (code: string, uri: string) {
  const jumpOptions = {
    code,
    state: btoa(stringify({ uri, type: 'register' })),
  }
  const callBackUrl = `${SWZX_MID_SERVER}?${stringify(jumpOptions)}`
  const authService = `https://auth.szu.edu.cn/cas.aspx/login?service=${encodeURIComponent(callBackUrl)}`
  const jumpUrl = `https://authserver.szu.edu.cn/authserver/login?service=${encodeURIComponent(authService)}`
  window.location.href = jumpUrl
}

/**
 * 校验登录态是否有效
 */
export async function checkToken () {
  const [, err] = await authService.checkToken()
  if (err) return false
  return true
}
