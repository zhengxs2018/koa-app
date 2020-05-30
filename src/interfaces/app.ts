import { Middleware } from 'koa'
import Router, { Middleware as RouterMiddleware } from '@koa/router'

import { Framework } from './framework'
import { Route } from './router'

export interface AppLifecycle {
  init(app: Framework): void
  configureRoutes(router: Router, app: Framework): boolean
}

export interface App extends Partial<AppLifecycle> {
  name?: string

  // 静态资源目录
  staticFolder?: string

  // 路由
  routes?: Route[]

  // 中间件
  middleware?: Array<Middleware | RouterMiddleware>
}

export interface AppConstructor {
  new (): App
}
