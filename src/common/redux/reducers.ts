/**
 * 创建 Store
 * @author Jason
 */
import { combineReducers, ReducersMapObject } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import commonReducers from '../reducers'

export default function reducers (reducers: ReducersMapObject, history: History) {
  return combineReducers({
    ...commonReducers,
    ...reducers,
    router: connectRouter(history)
  })
}
