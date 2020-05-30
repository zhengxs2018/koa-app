import { Server } from 'net'
import { ok } from 'assert'

import config from 'config'

import Koa from 'koa'
import Router, { UrlOptionsQuery } from '@koa/router'

import { DependencyContainer, container as Container } from 'tsyringe'

import { App } from '../interfaces/app'
import { Framework, Context } from '../interfaces/framework'

import { merge } from '../lib/mixin'

import application from '../extend/application'
import context from '../extend/context'
import request from '../extend/request'
import response from '../extend/response'

export interface FrameworkOptions {
  container: DependencyContainer
}

export function createServer(options?: Partial<FrameworkOptions>): Framework {
  const server = new Koa<Koa.DefaultState, Context>()
  const container = options?.container ?? Container
  const apps: Map<string, App & { router: Router }> = new Map()

  server.keys = config.get('keys')
  server.proxy = config.get('proxy')

  function urlFor(name: string, params: any, options: UrlOptionsQuery): string {
    const [appName, routeName] = name.split('.')
    const app = apps.get(appName || '__ROOT__')

    ok(app, `App "${appName}" does not exist or is not registered`)
    return app.router.url(routeName, params, options)
  }

  merge(server, { container, apps, ...application })
  merge(server.context, { urlFor, ...context })
  merge(server.request, request)
  merge(server.response, response)

  server.use((ctx, next) => {
    const childContainer = container.createChildContainer()
    ctx.container = childContainer.registerInstance('ctx', ctx)
    return next()
  })

  return server as Framework
}

export function runServer(server: Framework) {
  server.listen(config.get('listen'), function onReady(this: Server) {
    const info = this.address()
    const port = typeof info === 'string' ? info.split(':')[1] : info?.port
    console.log(`Listen on http://127.0.0.1:${port}`)
  })
}
