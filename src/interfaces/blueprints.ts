import { App } from './app'

export interface Blueprint extends Partial<App> {
  // 蓝图名称
  name: string

  // url 前缀
  urlPrefix?: string

  // 静态资源路径
  staticPublicPath?: string
}

export interface BlueprintConstructor {
  new (): Blueprint
}
