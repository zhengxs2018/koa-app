import Router from '@koa/router'
import mount from 'koa-mount'
import serve from 'koa-static'

import { Framework } from '../interfaces/framework'
import { Blueprint, BlueprintConstructor } from '../interfaces/blueprints'

import { registerApp } from './app'

export interface BlueprintOptions {
  urlPrefix: string
}

export function registerBlueprint(
  server: Framework,
  Blueprint: BlueprintConstructor | Blueprint,
  options?: Partial<BlueprintOptions>
): void {
  const app =
    typeof Blueprint === 'function'
      ? server.container.resolve(Blueprint)
      : Blueprint
  const urlPrefix = options?.urlPrefix ?? app.urlPrefix ?? `/${app.name}`

  // 添加静态资源
  if (app.staticFolder) {
    server.use(
      mount(app.staticPublicPath ?? urlPrefix, serve(app.staticFolder))
    )
  }

  registerApp(server, app, new Router({ prefix: urlPrefix }))
}
