/**
 * 百科应用列表
 * @author Jason
 */
import * as React from 'react'
import classNames from 'classnames'
import { ContainerProps } from '@common/types/RootProps'
import { apps } from '@index/configs/appList'
import { AppList } from '@index/types/AppList'

interface AppsContainerState {
  // 展示搜索框
  showSearchBar: boolean

  // 展示遮罩防止误触
  showMask: boolean

  // 搜索的输入
  keyword: string

  // 搜索出来的结果
  result: AppList
}

export default class AppsContainer extends React.Component<ContainerProps, AppsContainerState> {
  state: AppsContainerState = {
    showSearchBar: false,
    showMask: false,
    keyword: '',
    result: [],
  }

  handleShowSearchBar = () => {
    this.setState({ showSearchBar: true }, () => {
      // 设置焦点
      document.getElementById('search-input').focus()
    })
  }

  filterApps = () => {
    const { keyword } = this.state
    const result: AppList = []
    const keywordRegExp = new RegExp(keyword, 'ig')

    for (const category of apps) {
      // 如果类别的名称和 key 匹配上了，就选中这个类别
      if (keywordRegExp.test(category.name) || keywordRegExp.test(category.key)) {
        result.push(category)
        continue
      }

      // 循环 app 去检查
      for (const app of category.apps) {
        if (keywordRegExp.test(app.name) || keywordRegExp.test(app.key)) {
          const existCategoryIndex = _.findIndex(result, { key: category.key })

          if (existCategoryIndex !== -1) {
            result[existCategoryIndex].apps.push(app)
          } else {
            const _category = _.cloneDeep(category)
            _category.apps = [app]
            result.push(_category)
          }
        }
      }
    }

    this.setState({ result })
  }

  // 渲染空列表
  renderEmptyList = () => (
    <div className="empty-list">
      <img className="emotion" src="https://cdn.szuswzx.com/img/emotion-embarrassed.svg" alt="尴尬"/>
      <p className="message">嗷，没有找到相关的服务哦~</p>
    </div>
  )

  // 渲染应用树
  renderAppTree = (apps: AppList) => {
    return apps.length === 0
      ? this.renderEmptyList()
      : apps.map(category => (
        <div className="app-category" key={category.key}>
          <h2>{category.name}</h2>
          <div className="app-list">
            {category.apps.map(app => (
              <a href={app.open ? app.url : 'javascript:;'} className="app-item">
                {!app.open && <div className="not-open">暂未开放</div>}
                <div className="app-icon-bg">
                  <img src={app.icon} alt={app.name} className="app-icon"/>
                </div>
                <p className="app-name">{app.name}</p>
              </a>
            ))}
            {category.apps.length > 2 && <span className="placeholder" />}
          </div>
        </div>
      ))
  }

  render () {
    const { showSearchBar, showMask, keyword, result } = this.state

    return (
      <div className="index-page-container">
        <div className={classNames('header', { 'hide-logo': showSearchBar })}>
          <img className="logo" src="https://cdn.szuswzx.com/img/baike-logo.svg" alt="百科 LOGO"/>
          <div className={classNames('search-bar', { 'search-bar-actived': showSearchBar })}>
            <input
              type="text"
              id="search-input"
              className="search-bar-input"
              placeholder="你要找些什么呢？"
              value={keyword}
              onFocus={() => this.setState({ showMask: true })}
              onChange={e => this.setState({ keyword: e.target.value }, _.debounce(this.filterApps, 200))}
            />
            {
              keyword
                ? (
                  <img
                    className="search-bar-icon search-bar-icon-close"
                    src="https://cdn.szuswzx.com/img/icon-close.svg"
                    alt="搜索"
                    onClick={() => this.setState({ showSearchBar: false, showMask: false, keyword: '' }, () => this.filterApps())}
                  />
                )
                : (
                  <img
                    className="search-bar-icon"
                    src="https://cdn.szuswzx.com/img/icon-search.svg"
                    alt="搜索"
                    onClick={this.handleShowSearchBar}
                  />
                )
            }
          </div>
        </div>
        {showMask && <div className="input-mask" onClick={() => this.setState({ showMask: false, showSearchBar: !!keyword })} />}
        {keyword ? this.renderAppTree(result) : this.renderAppTree(apps)}
      </div>
    )
  }
}
