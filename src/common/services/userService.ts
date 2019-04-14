/**
 * 用户接口
 * @author Jason
 */
import { get } from '../lib/http'
import { UserInfo } from '@common/types/User'

/**
 * 拉去当前用户信息
 */
export function getCurrentUserInfo () {
  return get<UserInfo>('/users/me')
}
