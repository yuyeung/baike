/**
 * 请求响应相关的一些类型定义
 * @author Jason
 */
import { AxiosResponse, AxiosError } from 'axios'

// 深大百科 Node 层统一的返回
export interface CommomResponse<T = any> {
  code: number
  message: string
  data?: T
}

// 统一的错误对象
// 对请求错误情况进行封装
// HTTP 状态码大于等于 300 和返回的 code 不为 0 都会直接抛出这个错误
export interface CommonError {
  // 错误码
  // 如果返回有 code 则是返回的 code
  // 如果返回没有 code 则是 HTTP 状态码
  code: number

  // 错误信息
  message: string

  // HTTP 状态码
  status: number

  // 原始响应
  // 如果返回的 HTTP 状态码 >= 400，则没有这个对象
  rawResponse?: AxiosResponse

  // 原始 axios 错误对象
  // 如果返回的 HTTP 状态码 < 400，则没有这个对象
  rawError?: AxiosError
}
