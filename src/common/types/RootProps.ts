/**
 * 基础组件参数
 * @author jasonelchen
 */
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RouterState } from 'connected-react-router'
import { UserStore } from '@common/reducers/user'
import { Action } from './Action'

/**
 * redux 里面的状态
 */
export interface ReduxState {
  router?: RouterState
  user?: UserStore
}

/**
 * 使用 redux 的公共参数
 */
export interface RootProps<K extends keyof ReduxState = keyof ReduxState> extends ReduxState {
  dispatch?: Dispatch<Action<ReduxState[K]>>
}

/**
 * 如果直接被挂载在 router 上
 * 还会有 RouteComponentProps 的参数
 * 也就是说，所有配置在 config/routes 里面的容器组件，都应该使用这个参数定义
 */
export interface ContainerProps extends RootProps, RouteComponentProps {}
