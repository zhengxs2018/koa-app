import { METHODS } from 'http'

import { Middleware as RouterMiddleware, LayerOptions } from '@koa/router'

export interface Route<StateT = any, CustomT = any> {
  name?: string
  path: string | string[] | Array<string | RegExp>
  methods?: typeof METHODS
  middleware: Array<RouterMiddleware<StateT, CustomT>>
  viewFunc: string | RouterMiddleware<StateT, CustomT>
  options?: Omit<LayerOptions, 'name'>
}
