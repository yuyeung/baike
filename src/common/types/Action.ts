/**
 * 通用的 Action 模板
 */
export interface Action<VALUE = any> {
  type: string,
  payload?: Partial<VALUE>
}
