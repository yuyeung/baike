/**
 * 登录相关接口的类型定义
 * @author Jason
 */
export interface SessionResponse {
  token: string,
  userinfo: {
    openId: string,
    nickname: string,
    avatar: string,
    studentNo: string,
    studentName: string,
    icAccount: number,
  }
}
