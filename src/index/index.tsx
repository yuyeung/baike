/**
 * 应用入口
 * @author Jason
 */
import { renderApp } from '@common'
import reducers from '@index/reducers'
import routes from '@index/configs/routes'
import './style/index.less'

renderApp({ reducers, routes })
