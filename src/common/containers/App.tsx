/**
 * 公共入口容器
 * @author Jason
 */
import * as React from 'react'
import { Store } from 'redux'
import { History } from 'history'
import { Provider } from 'react-redux'
import { RouteConfig } from 'react-router-config'
import { ConnectedRouter } from 'connected-react-router'
import AuthContainer from '@common/containers/AuthContainer'

// 统一引入公共样式
import '@common/style/common.less'

interface AppProps {
  store: Store
  history: History
  routes: RouteConfig[]
  autoLogin: boolean
}

export default function App (props: AppProps) {
  const { store, routes, history, autoLogin } = props

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AuthContainer routes={routes} autoLogin={autoLogin} />
      </ConnectedRouter>
    </Provider>
  )
}
