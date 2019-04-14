/**
 * 鉴权服务
 * @author Jason
 */
import { get, post } from '../lib/http'
import { SessionResponse } from '@common/types/Passport'

/**
 * 检查登录态
 */
export function checkToken () {
  return get<{ status: string }>('/passport/tokens')
}

/**
 * 通过微信 Code 获取登录态
 * @param {string} code 微信登录的 code
 */
export function getSessionToken (code: string) {
  return get<SessionResponse>('/passport', { code })
}

/**
 * 通过微信 Code 和校园卡登录 ticket 进行注册
 * @param {string} code   微信登录的 code
 * @param {string} ticket 校园卡授权的 ticket
 */
export function registerUser (code: string, ticket: string) {
  return post<SessionResponse>('/passport', { code, ticket })
}
