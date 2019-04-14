/**
 * 请求相关的一些类型定义
 * @author Jason
 */
import { AxiosRequestConfig } from 'axios'

export interface RequestOptions {
  // 是否显示 loading 状态
  // 默认 false
  showLoding?: boolean

  // 是否带上 jwt token
  // 默认 true
  withCredentials?: boolean

  // 原始 axios 配置
  raw?: AxiosRequestConfig
}
