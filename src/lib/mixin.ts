import { hasOwn } from './utils'

export function merge<T extends object, U extends object>(
  target: T,
  source: U,
  redefine?: boolean
): T & U {
  if (!target) {
    throw new TypeError('argument target is required')
  }

  if (!source) {
    throw new TypeError('argument source is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  for (const name of Object.getOwnPropertyNames(source)) {
    if (!redefine && hasOwn<T>(target, name)) {
      continue
    }

    const descriptor = Object.getOwnPropertyDescriptor(source, name)
    Object.defineProperty(target, name, descriptor as PropertyDescriptor)
  }

  return target as T & U
}
