/**
 * 路由注册
 * @author Jason
 */
import { RouteConfig } from 'react-router-config'

// 入口容器
import AppsContainer from '@index/containers/AppsContainer'

const routes: Array<RouteConfig> = [
  { // 应用列表
    path: '/',
    exact: true,
    component: AppsContainer
  },
]

export default routes
