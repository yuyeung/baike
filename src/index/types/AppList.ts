/**
 * 应用列表
 * @author Jason
 */
export interface App {
  key: string
  name: string
  open: boolean
  icon: string
  url: string
}

export interface Category {
  key: string
  name: string
  apps: App[]
}

export type AppList = Category[]
