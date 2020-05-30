import Router from '@koa/router'
import serve from 'koa-static'

import { DependencyContainer } from 'tsyringe'

import { App, AppConstructor } from '../interfaces/app'
import { Framework } from '../interfaces/framework'

import { createServer } from './server'
import { addRoutes } from './router'

export interface FrameworkOptions {
  container: DependencyContainer
}

export function createApp(
  App: App | AppConstructor,
  options?: Partial<FrameworkOptions>
): Framework {
  const server = createServer(options)
  const app = typeof App === 'function' ? server.container.resolve(App) : App

  if (app.staticFolder) {
    server.use(serve(app.staticFolder))
  }

  registerApp(server, app, new Router())

  return server
}

export function registerApp(server: Framework, app: App, router: Router): void {
  if (typeof app.init === 'function') {
    app.init(server)
  }

  // 添加蓝图中间件
  if (Array.isArray(app.middleware)) {
    router.use(...app.middleware)
  }

  // 配置路由
  if (typeof app.configureRoutes === 'function') {
    if (app.configureRoutes(router, server)) {
      server.use(router.routes())
      server.use(router.allowedMethods())
    }
  } else {
    if (addRoutes(router, app)) {
      server.use(router.routes())
      server.use(router.allowedMethods())
    }
  }

  server.apps.set(app.name || '__ROOT__', Object.assign(app, { router }))
}
