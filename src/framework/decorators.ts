import { METHODS } from 'http'

import { Middleware } from 'koa'
import { LayerOptions } from '@koa/router'

import { Route } from '../interfaces/router'

export const DESIGN_ROUTES: symbol = Symbol.for('design:routes')

export type RouteDecorator<T> = (
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void

export interface RouteDecoratorWrapped<T> {
  (
    path: string | RegExp,
    middleware?: Middleware[],
    opts?: LayerOptions
  ): RouteDecorator<T>
}

export interface RouteDecoratorWrapped<T> {
  (
    name: string,
    path: string | RegExp,
    middleware?: Middleware[],
    opts?: LayerOptions
  ): RouteDecorator<T>
}

/* HTTP METHOD: GET */
export const Get = createRouteFactory(['GET'])

/* HTTP METHOD: POST */
export const Post = createRouteFactory(['POST'])

/* HTTP METHOD: PUT */
export const Put = createRouteFactory(['PUT'])

/* HTTP METHOD: DELETE */
export const Options = createRouteFactory(['OPTIONS'])

/* HTTP METHOD: DELETE */
export const Delete = createRouteFactory(['delete'])

/* ALL HTTP METHOD */
export const All = createRouteFactory(METHODS)

export function getRoutes<T>(target: T): Route[] {
  return Reflect.getMetadata(DESIGN_ROUTES, target) || []
}

export function createRouteFactory<T>(
  methods: typeof METHODS
): RouteDecoratorWrapped<T> {
  return function (): RouteDecorator<T> {
    const config: Partial<Omit<Route, 'viewFunc'>> = { methods }
    const path = arguments[1]
    if (
      typeof path === 'string' ||
      path instanceof RegExp ||
      Array.isArray(path)
    ) {
      config.name = arguments[0]
      config.path = <string>path
      config.middleware = arguments[2] || []
      config.options = arguments[3] || {}
    } else {
      config.path = arguments[0]
      config.middleware = arguments[1] || []
      config.options = arguments[2] || {}
    }

    return function (target, propertyKey) {
      const routes: any[] = Reflect.getMetadata(DESIGN_ROUTES, target) || []
      routes.push(Object.assign(config, { viewFunc: propertyKey }))
      Reflect.defineMetadata(DESIGN_ROUTES, routes, target)
    }
  }
}
