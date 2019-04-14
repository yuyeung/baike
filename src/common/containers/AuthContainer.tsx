/**
 * 对用户登录进行拦截
 * @author Jason
 */
import * as React from 'react'
import { RouteConfig, renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { login } from '@common/lib'
import { RootProps } from '@common/types/RootProps'
import { getCurrentUserInfo } from '@common/services/userService'
import { USER_LOGIN } from '@common/actions'
import '../style/auth.less'

interface AuthContainerProps extends RootProps {
  routes: RouteConfig[]
  autoLogin: boolean
}

interface AuthContainerState {
  // 登录中
  loging: boolean
}

class AuthContainer extends React.Component<AuthContainerProps, AuthContainerState> {
  state: AuthContainerState = {
    loging: true
  }

  componentDidMount () {
    this.getUserInfo()
  }

  /**
   * 拉去用户信息
   * 1. 如果没有登录态，则自动走登录流程
   * 2. 如果有登录态，则拉去到用户信息，存储到 reudx 里面
   */
  getUserInfo = async () => {
    const { autoLogin } = this.props
    const [userInfo, err] = await getCurrentUserInfo()

    if (err) {
      if (err.code === 401) {
        if (autoLogin) {
          return login()
        }
        return this.setState({ loging: false })
      }

      return console.log('登录态获取失败')
    }

    this.props.dispatch({
      type: USER_LOGIN,
      payload: { login: true, userInfo }
    })
    this.setState({ loging: false })
  }

  renderLogingPage () {
    return (
      <div className="auth-container">
        <div className="loging-card">
          <div className="loading-icon-container">
            <img className="loading-icon" src="https://cdn.szuswzx.com/img/icon-loading.svg" alt="loading-icon"/>
          </div>
          <span className="message">登录中，请稍候...</span>
        </div>
      </div>
    )
  }

  render () {
    const { loging } = this.state
    const { routes } = this.props

    return loging
      ? this.renderLogingPage()
      : renderRoutes(routes)
  }
}

export default connect(state => state)(AuthContainer)
