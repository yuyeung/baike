/**
 * 渲染应用
 * @author Jason
 */
import * as React from 'react'
import { render } from 'react-dom'
import { ReducersMapObject } from 'redux'
import { RouteConfig } from 'react-router-config'
import { createBrowserHistory } from 'history'
import createStore from './redux/createStore'
import App from './containers/App'

interface RenderAppProps {
  // 应用独自的 reducer
  reducers: ReducersMapObject

  // 应用独自的路由
  routes: RouteConfig[]

  // 是否默认进行授权登录
  // 不默认进行授权登录可以在之后手动调用登录模块登录
  autoLogin?: boolean
}

export default function renderApp (props: RenderAppProps) {
  const { reducers, routes, autoLogin = true } = props
  const rootElement = document.getElementById('app-root')
  const history = createBrowserHistory()
  const store = createStore(reducers, history)

  return render(
    <App store={store} routes={routes} history={history} autoLogin={autoLogin} />,
    rootElement
  )
}
