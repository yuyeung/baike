import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'
import * as queryString from 'query-string'
import { message } from 'antd'
import tryCatch from '@common/lib/tryCatch'
import { apiHosts, TOKEN_STORAGE_KEY } from '@common/config'
import { RequestOptions, CommomResponse, CommonError } from '@common/types'

// 可以使用 URL 的参数来控制请求的 Host
const env = (queryString.parse(location.search).__env as string) || 'prod'

// create an axios instance
const service = axios.create({
  baseURL: apiHosts[env],
  timeout: 2000, // request timeout
})

/**
 * 处理响应
 * 1. 针对 code 不为 0，或者 http 状态码大于等于 400，一律算作失败
 * 2. 将响应的错误格式化为 `CommonError`
 */
service.interceptors.response.use((res: AxiosResponse<CommomResponse>) => {
  const { code, message } = res.data

  if (code !== 0) {
    return Promise.reject({
      code,
      message: typeof message === 'string' ? message.slice(0, 30) : message,
      status: 200,
      rawResponse: res,
      rawError: null
    } as CommonError)
  }

  return res
}, (err: AxiosError) => {
  const { status = -1, statusText = '网络连接错误' } = err.response || {}
  const { code = -1, message = statusText } = err.response && err.response.data || {}

  // 登录态失效
  if (status === 401) {
    // TODO: 微信内置浏览器可能不能直接刷新，需要在最后加一个时间戳参数
    // return window.location.reload()
  }

  return Promise.reject({
    code,
    message: typeof message === 'string' ? message.slice(0, 30) : message,
    status,
    rawResponse: null,
    rawError: err
  } as CommonError)
})

/**
 * 处理请求
 * 1. 处理请求期间的加载提示
 * 2. 判断请求是否需携带 token
 * 3. 返回元组 `[成功请求的数据, 失败请求的错误]`
 */
export async function request<ResData = any> (config: AxiosRequestConfig, options: RequestOptions = {}) {
  const { showLoding = false, withCredentials = true, raw = {} } = options

  // 弹出加载信息
  let hideLoading: () => void
  if (showLoding) {
    hideLoading = message.loading('加载中...', 0)
  }

  // 载入自定义配置
  config = { ...config, ...raw }

  // 带上 jwt token
  if (withCredentials) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
    }
  }

  // 请注意，这里直接返回 res.data.data
  // 也就是说，如果请求成功了，会直接返回 data 里面的数据
  return tryCatch<ResData, CommonError>(
      service.request<CommomResponse<ResData>>(config).then(res => res.data.data)
    )
    .finally(() => showLoding && hideLoading && hideLoading())
}

/**
 * 发送 GET 请求
 * @param {string} url 请求的 URL
 * @param {object} params 请求的 Query 参数
 * @param {RequestOptions} options 配置项
 */
export function get<Res = any, Req = any> (url: string, params?: Req, options?: RequestOptions) {
  return request<Res>({ method: 'get', url, params }, options)
}

/**
 * 发送 POST 请求
 * @param {string} url 请求的 URL
 * @param {object} data 请求的 Query 参数
 * @param {RequestOptions} options 配置项
 */
export function post<Res = any, Req = any> (url: string, data?: Req, options?: RequestOptions) {
  return request<Res>({ method: 'post', url, data }, options)
}

/**
 * 发送 PUT 请求
 * @param {string} url 请求的 URL
 * @param {object} data 请求的 Query 参数
 * @param {RequestOptions} options 配置项
 */
export function put<Res = any, Req = any> (url: string, data?: Req, options?: RequestOptions) {
  return request<Res>({ method: 'put', url, data }, options)
}

/**
 * 发送 PATCH 请求
 * @param {string} url 请求的 URL
 * @param {object} data 请求的 Query 参数
 * @param {RequestOptions} options 配置项
 */
export function patch<Res = any, Req = any> (url: string, data?: Req, options?: RequestOptions) {
  return request<Res>({ method: 'patch', url, data }, options)
}

/**
 * 发送 DELETE 请求
 * @param {string} url 请求的 URL
 * @param {object} data 请求的 Query 参数
 * @param {RequestOptions} options 配置项
 */
export function del<Res = any, Req = any> (url: string, data?: Req, options?: RequestOptions) {
  return request<Res>({ method: 'delete', url, data }, options)
}

// default 导出
export default {
  get,
  post,
  put,
  patch,
  del,
  delete: del
}
