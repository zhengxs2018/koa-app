import { METHODS } from 'http'
import { existsSync, statSync } from 'fs'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn<T extends object>(target: T, key: string): boolean {
  return hasOwnProperty.call(target, key)
}

export function isFile(filePath: string): boolean {
  return existsSync(filePath) && statSync(filePath).isFile()
}

export function isHttpMethod(method: string): boolean {
  return (
    typeof method === 'string' && METHODS.indexOf(method.toUpperCase()) > -1
  )
}
