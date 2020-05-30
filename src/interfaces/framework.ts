import Koa from 'koa'
import Router, { UrlOptionsQuery } from '@koa/router'

import { DependencyContainer } from 'tsyringe'

import context from '../extend/context'

import { App } from './app'

export interface FrameworkContext extends Koa.Context {
  container: DependencyContainer
  urlFor(name: string, params?: any, options?: UrlOptionsQuery): string
}

export interface Framework extends Koa<{}, Context> {
  apps: Map<string, App & { router: Router }>
  container: DependencyContainer
}

export type Context = FrameworkContext & typeof context
