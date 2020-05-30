import { ok } from 'assert'
import { isFunction } from 'util'
import { METHODS } from 'http'

import Router, { Middleware } from '@koa/router'

import { App } from '../interfaces/app'

import { getRoutes } from './decorators'

export function addRoutes(router: Router, app: App): boolean {
  const routes = getRoutes(app).concat(app.routes ?? [])

  for (let { name, methods, path, middleware, viewFunc, options } of routes) {
    if (typeof viewFunc === 'string') {
      viewFunc = (app[viewFunc as keyof App] as unknown) as Middleware
    }

    ok(isFunction(viewFunc), `viewFunc 不是一个函数`)

    router.register(
      <string>path,
      methods ?? METHODS,
      (middleware || []).concat(viewFunc.bind(app)),
      { name: <string>name, ...options }
    )
  }

  return routes.length > 0
}
