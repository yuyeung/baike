/**
 * 注册用户 reducer
 * @author Jason
 */
import { Action, UserInfo } from '@common/types'
import { USER_LOGIN } from '@common/actions'

export interface UserStore {
  login: boolean
  userInfo?: UserInfo
}

export default (state: UserStore = { login: false }, action: Action<UserStore>) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
