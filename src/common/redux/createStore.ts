/**
 * 创建 Store
 * @author Jason
 */
import { createStore as newStore, applyMiddleware, compose, ReducersMapObject } from 'redux'
import { History } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger'
import rootReducers from './reducers'

export default function createStore (reducers: ReducersMapObject, history: History) {
  const middlewares = []

  // 路由中间件
  middlewares.push(routerMiddleware(history))

  // 开发环境引入日志
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  // 创建 store
  return newStore(
    rootReducers(reducers, history),
    compose(applyMiddleware(...middlewares))
  )
}
